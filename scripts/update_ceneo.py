#!/usr/bin/env python3
"""Fetch approved Ceneo affiliate API products and write a public JSON catalog.

Required environment:
  CENEO_API_KEY       API key issued by Ceneo (GitHub Actions secret)
  CENEO_PARTNER_ID    Partner ID from Ceneo account settings (GitHub Actions secret)
Optional:
  CENEO_SEARCH_TERMS  comma-separated terms; defaults to a small electronics set
"""
import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

BASE = "https://partnerzyapi.ceneo.pl"
SERVICE = "PartnerServiceV2.svc"  # Ceneo recommends the V2 OData endpoint.
OUT = Path("products.json")
TIMEOUT = 35


def request(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
        return response.read(), response.headers


def get_token(api_key):
    url = BASE + "/AuthorizationService.svc/GetToken?grantType='client_credentials'"
    body, headers = request(url, {"Authorization": "Basic " + api_key, "Accept": "application/json"})
    token = headers.get("access_token") or headers.get("Access-Token")
    if not token:
        try:
            payload = json.loads(body.decode("utf-8"))
            token = payload.get("access_token") or payload.get("accessToken")
        except (ValueError, UnicodeDecodeError, AttributeError):
            pass
    if not token:
        raise RuntimeError("Ceneo nie zwróciło tokenu access_token. Sprawdź klucz API i uprawnienia.")
    return token


def rows_from(payload):
    if isinstance(payload, list):
        return payload
    if not isinstance(payload, dict):
        return []
    for key in ("value", "results", "Results"):
        if isinstance(payload.get(key), list):
            return payload[key]
    d = payload.get("d")
    if isinstance(d, list):
        return d
    if isinstance(d, dict):
        for key in ("results", "Results", "value"):
            if isinstance(d.get(key), list):
                return d[key]
    return []


def get(item, *names):
    if not isinstance(item, dict):
        return None
    lowered = {str(k).lower(): v for k, v in item.items()}
    for name in names:
        value = lowered.get(name.lower())
        if value is not None:
            return value
    return None


def parse_price(value):
    if value is None or isinstance(value, bool):
        return None
    try:
        normalized = str(value).strip().replace("\u00a0", "").replace(" ", "").replace(",", ".")
        price = float(normalized)
        return price if price > 0 else None
    except (TypeError, ValueError):
        return None


def affiliate_url(value, partner_id):
    """Only accept Ceneo product URLs and set the documented #pid fragment."""
    try:
        parsed = urllib.parse.urlsplit(str(value).strip())
        host = (parsed.hostname or "").lower()
        if parsed.scheme not in ("http", "https") or not (host == "ceneo.pl" or host.endswith(".ceneo.pl")):
            return ""
        if parsed.username is not None or parsed.password is not None:
            return ""
        if parsed.port not in (None, 80, 443):
            return ""
        return urllib.parse.urlunsplit((
            "https", host, parsed.path, parsed.query,
            "pid=" + urllib.parse.quote(partner_id, safe="")
        ))
    except (TypeError, ValueError):
        return ""


def safe_ceneo_image_url(value):
    """Accept HTTPS image URLs only from Ceneo-controlled hostnames."""
    try:
        parsed = urllib.parse.urlsplit(str(value).strip())
        host = (parsed.hostname or "").lower()
        if parsed.scheme != "https" or not (host == "ceneo.pl" or host.endswith(".ceneo.pl")):
            return ""
        if parsed.username or parsed.password or parsed.port not in (None, 443):
            return ""
        return urllib.parse.urlunsplit(("https", host, parsed.path, parsed.query, ""))
    except (TypeError, ValueError):
        return ""


def category_for(name):
    n = name.lower()
    if any(x in n for x in ("laptop", "komputer", "monitor", "procesor", "karta graficzna", "ram", "ssd", "smartfon", "telefon", "tablet", "słuchawk", "mysz", "klawiatur", "router")):
        return "Elektronika"
    if any(x in n for x in ("buty", "plecak", "rower", "sport", "trekking", "turystycz")):
        return "Sport"
    if any(x in n for x in ("kurtka", "bluza", "spodnie", "koszul", "sukien")):
        return "Moda"
    return "Dom"


def main():
    if os.environ.get("CENEO_API_PUBLICATION_APPROVED", "").strip() != "YES":
        print("Integracja Ceneo jest wstrzymana do czasu pisemnego potwierdzenia zasad publikacji i wykorzystania danych. Nie pobieram ani nie publikuję danych.")
        return 0

    api_key = os.environ.get("CENEO_API_KEY", "").strip()
    partner_id = os.environ.get("CENEO_PARTNER_ID", "").strip()
    if not api_key or not partner_id:
        print("Brak CENEO_API_KEY lub CENEO_PARTNER_ID. Nie pobieram danych; nie publikuję fikcyjnych ofert.", file=sys.stderr)
        return 0

    terms = [x.strip() for x in os.environ.get(
        "CENEO_SEARCH_TERMS",
        "smartfon,laptop,karta graficzna,słuchawki,monitor,smartwatch"
    ).split(",") if x.strip()]
    token = get_token(api_key)
    headers = {"Authorization": "Bearer " + token, "Accept": "application/json"}
    products = {}
    if OUT.exists():
        try:
            previous = json.loads(OUT.read_text(encoding="utf-8"))
            cutoff = datetime.now(timezone.utc) - timedelta(hours=72)
            for item in previous.get("items", []):
                if item.get("source") == "Ceneo":
                    continue
                try:
                    updated = datetime.fromisoformat(str(item.get("updatedAt", "")).replace("Z", "+00:00"))
                    if updated.tzinfo is None:
                        updated = updated.replace(tzinfo=timezone.utc)
                    if updated >= cutoff:
                        products[str(item.get("id"))] = item
                except (TypeError, ValueError):
                    continue
        except (ValueError, AttributeError, OSError):
            pass

    for term in terms:
        query = urllib.parse.urlencode({
            "searchText": "'" + term.replace("'", "''") + "'",
            "pageSize": "30",
            "pageIndex": "1",
            "$format": "json",
        })
        url = BASE + "/" + SERVICE + "/GetProducts?" + query
        body, _ = request(url, headers)
        payload = json.loads(body.decode("utf-8-sig"))
        for row in rows_from(payload):
            name = str(get(row, "Name") or "").strip()
            price = parse_price(get(row, "LowestPrice", "Price"))
            product_url = affiliate_url(get(row, "Url", "ProductUrl"), partner_id)
            raw_image = str(get(row, "MediumThumbnailUrl", "ThumbnailUrl", "ImageUrl") or "").strip()
            image = safe_ceneo_image_url(raw_image)
            if not name or price is None or not product_url:
                continue
            product_id = str(get(row, "Id") or (name + "|" + str(price)))
            products[product_id] = {
                "id": "ceneo-" + product_id,
                "name": name,
                "category": category_for(name),
                "price": round(price, 2),
                "currency": "PLN",
                "image": image,
                "productUrl": product_url,
                "merchant": "Ceneo — porównanie ofert",
                "source": "Ceneo",
                "updatedAt": datetime.now(timezone.utc).isoformat(),
                "availability": "Sprawdź u sprzedawcy",
            }

    if not products:
        raise RuntimeError("API odpowiedziało, ale nie znaleziono poprawnych produktów. Nie nadpisuję katalogu.")

    output = {
        "source": "Ceneo",
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "count": len(products),
        "items": list(products.values()),
    }
    OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Zapisano {len(products)} produktów do {OUT}.")


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print("Błąd aktualizacji katalogu Ceneo: " + str(exc), file=sys.stderr)
        raise SystemExit(1)
