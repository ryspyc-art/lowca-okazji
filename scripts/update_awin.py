#!/usr/bin/env python3
"""Optional Awin CSV importer with explicit HTTPS host allowlists.

All allowlists contain comma-separated exact hostnames, not URL prefixes.
Feed access is disabled unless AWIN_FEED_ALLOWED_HOSTS is configured.
Product links and image URLs are independently restricted.
"""
import csv
import hashlib
import io
import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

OUT = Path("products.json")
MAX_FEED_BYTES = 25 * 1024 * 1024


def first(row, *keys):
    lowered = {str(k).strip().lower(): v for k, v in row.items() if k}
    for key in keys:
        value = lowered.get(key.lower())
        if value and str(value).strip():
            return str(value).strip()
    return ""


def category_for(value):
    n = value.lower()
    if any(x in n for x in ("electronics", "computer", "phone", "audio", "elektron", "komputer", "telefon")):
        return "Elektronika"
    if any(x in n for x in ("sport", "outdoor", "trekking", "fitness")):
        return "Sport"
    if any(x in n for x in ("fashion", "clothing", "apparel", "moda", "odzież")):
        return "Moda"
    return "Dom"


def allowed_hosts(variable):
    return {
        item.strip().lower().rstrip(".")
        for item in os.environ.get(variable, "").split(",")
        if item.strip()
    }


def validated_https_url(value, hosts):
    """Return a normalized HTTPS URL only for an explicitly allowed exact host."""
    try:
        parsed = urllib.parse.urlsplit(str(value).strip())
        host = (parsed.hostname or "").encode("idna").decode("ascii").lower().rstrip(".")
        if parsed.scheme.lower() != "https" or not host or host not in hosts:
            return ""
        if parsed.username is not None or parsed.password is not None:
            return ""
        if parsed.port not in (None, 443):
            return ""
        if not parsed.path.startswith("/"):
            return ""
        return urllib.parse.urlunsplit(("https", host, parsed.path, parsed.query, ""))
    except (TypeError, ValueError, UnicodeError):
        return ""


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    """Reject redirects so an approved feed host cannot redirect to an untrusted host."""
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise RuntimeError("Feed Awin zwrócił przekierowanie; wymagany jest bezpośredni adres HTTPS.")


def fetch_feed(url):
    opener = urllib.request.build_opener(NoRedirectHandler())
    req = urllib.request.Request(url, headers={"User-Agent": "CenolotFeed/1.0"})
    with opener.open(req, timeout=90) as response:
        raw = response.read(MAX_FEED_BYTES + 1)
    if len(raw) > MAX_FEED_BYTES:
        raise RuntimeError("Feed Awin przekracza limit 25 MB.")
    return raw


def main():
    feed_url = os.environ.get("AWIN_FEED_URL", "").strip()
    if not feed_url:
        print("Brak AWIN_FEED_URL — pomijam feed Awin.")
        return 0

    feed_url = validated_https_url(feed_url, allowed_hosts("AWIN_FEED_ALLOWED_HOSTS"))
    if not feed_url:
        raise RuntimeError("Adres feedu Awin nie przeszedł walidacji. Ustaw AWIN_FEED_ALLOWED_HOSTS z dokładną nazwą hosta feedu.")

    product_hosts = allowed_hosts("AWIN_ALLOWED_PRODUCT_HOSTS")
    image_hosts = allowed_hosts("AWIN_ALLOWED_IMAGE_HOSTS")
    if not product_hosts:
        raise RuntimeError("Brak AWIN_ALLOWED_PRODUCT_HOSTS — import produktów jest zablokowany.")

    raw = fetch_feed(feed_url)
    text = raw.decode("utf-8-sig", errors="replace")
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
    except csv.Error:
        dialect = csv.excel
    reader = csv.DictReader(io.StringIO(text), dialect=dialect)

    existing = {}
    if OUT.exists():
        try:
            payload = json.loads(OUT.read_text(encoding="utf-8"))
            cutoff = datetime.now(timezone.utc) - timedelta(hours=72)
            for item in payload.get("items", []):
                try:
                    updated = datetime.fromisoformat(str(item.get("updatedAt", "")).replace("Z", "+00:00"))
                    if updated.tzinfo is None:
                        updated = updated.replace(tzinfo=timezone.utc)
                    if updated >= cutoff:
                        if item.get("source") == "Awin":
                            safe_existing_url = validated_https_url(item.get("productUrl", ""), allowed_hosts("AWIN_ALLOWED_PRODUCT_HOSTS"))
                            if not safe_existing_url:
                                continue
                            item["productUrl"] = safe_existing_url
                            image_hosts = allowed_hosts("AWIN_ALLOWED_IMAGE_HOSTS")
                            item["image"] = validated_https_url(item.get("image", ""), image_hosts) if image_hosts else ""
                        existing[str(item.get("id"))] = item
                except (TypeError, ValueError):
                    continue
        except (ValueError, AttributeError, OSError):
            pass

    added = 0
    now = datetime.now(timezone.utc).isoformat()
    for row in reader:
        name = first(row, "product_name", "productname", "name", "title")
        price_raw = first(row, "search_price", "price", "product_price", "rrp_price")
        currency = first(row, "currency", "currency_code").upper()
        raw_url = first(row, "aw_deep_link", "product_url", "producturl", "url")
        url = validated_https_url(raw_url, product_hosts)
        merchant = first(row, "merchant_name", "advertiser_name", "merchant", "advertiser")
        raw_image = first(row, "merchant_image_url", "image_url", "image", "aw_image_url")
        image = validated_https_url(raw_image, image_hosts) if image_hosts else ""
        category_raw = first(row, "merchant_category", "category_name", "category", "category_name_path")
        product_id = first(row, "aw_product_id", "product_id", "id", "ean")
        try:
            price = float(price_raw.replace("PLN", "").replace(" ", "").replace(",", "."))
        except ValueError:
            continue
        if not name or price <= 0 or currency != "PLN" or not url or not merchant:
            continue
        if not product_id:
            product_id = hashlib.sha256((merchant + "|" + name + "|" + url).encode("utf-8")).hexdigest()[:20]
        key = "awin-" + product_id
        existing[key] = {
            "id": key,
            "name": name,
            "category": category_for(category_raw + " " + name),
            "price": round(price, 2),
            "currency": "PLN",
            "image": image,
            "productUrl": url,
            "merchant": merchant,
            "source": "Awin",
            "updatedAt": now,
            "availability": first(row, "stock_status", "availability") or "Sprawdź u sprzedawcy",
        }
        added += 1

    if not added and not existing:
        raise RuntimeError("Feed Awin nie zawiera poprawnych ofert. Nie tworzę pustego katalogu.")
    output = {
        "source": " + ".join(sorted({item.get("source", "Partner") for item in existing.values()})),
        "fetchedAt": now,
        "count": len(existing),
        "items": list(existing.values()),
    }
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Feed Awin: dodano/zaktualizowano {added} produktów; łącznie {len(existing)}.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print("Błąd importu feedu Awin (" + type(exc).__name__ + "). Sprawdź dostęp, konfigurację allowlisty, format CSV i uprawnienia feedu.", file=sys.stderr)
        raise SystemExit(1)
