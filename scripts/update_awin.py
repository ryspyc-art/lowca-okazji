#!/usr/bin/env python3
"""Optional Awin CSV product-feed importer. Feed URL must be stored as a GitHub secret."""
import csv
import hashlib
import io
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

OUT = Path("products.json")


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


def main():
    feed_url = os.environ.get("AWIN_FEED_URL", "").strip()
    if not feed_url:
        print("Brak AWIN_FEED_URL — pomijam feed Awin.")
        return 0
    if not feed_url.startswith("https://"):
        raise RuntimeError("Adres feedu Awin musi zaczynać się od https://")

    req = urllib.request.Request(feed_url, headers={"User-Agent": "LowcaOkazjiFeed/1.0"})
    with urllib.request.urlopen(req, timeout=90) as response:
        raw = response.read()
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
            for item in payload.get("items", []):
                existing[str(item.get("id"))] = item
        except (ValueError, AttributeError):
            pass

    added = 0
    now = datetime.now(timezone.utc).isoformat()
    for row in reader:
        name = first(row, "product_name", "productname", "name", "title")
        price_raw = first(row, "search_price", "price", "product_price", "rrp_price")
        currency = first(row, "currency", "currency_code").upper()
        url = first(row, "aw_deep_link", "product_url", "producturl", "url")
        merchant = first(row, "merchant_name", "advertiser_name", "merchant", "advertiser")
        image = first(row, "merchant_image_url", "image_url", "image", "aw_image_url")
        category_raw = first(row, "merchant_category", "category_name", "category", "category_name_path")
        product_id = first(row, "aw_product_id", "product_id", "id", "ean")
        try:
            price = float(price_raw.replace("PLN", "").replace(" ", "").replace(",", "."))
        except ValueError:
            continue
        if not name or price <= 0 or currency != "PLN" or not url.startswith("https://") or not merchant:
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
            "image": image if image.startswith("https://") else "",
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
        print("Błąd importu feedu Awin (" + type(exc).__name__ + "). Sprawdź dostęp, format CSV i uprawnienia feedu.", file=sys.stderr)
        raise SystemExit(1)
