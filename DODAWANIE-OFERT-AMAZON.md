# Dodawanie ofert Amazon PartnerNet — Tanievo

## Szybki proces
1. W Amazon PartnerNet otwórz generator linków i wybierz konkretny produkt.
2. Skopiuj pełny link partnerski (nie sam adres produktu). Link musi zawierać parametr `tag=tanievo-21`.
3. Wklej link w rozmowie z asystentem. Możesz wkleić kilka linków naraz.
4. Dopisz nazwę produktu i cenę widoczną w Amazon albo dołącz zrzut ekranu.
5. Oferta zostanie sprawdzona i dopisana do `amazon-offers.json`. Po wdrożeniu strony karta pojawi się automatycznie.

## Zasady walidacji
- Akceptujemy wyłącznie HTTPS i domenę `www.amazon.pl`.
- Wymagany jest parametr `tag=tanievo-21`.
- ASIN w ścieżce `/dp/ASIN` musi zgadzać się z polem `asin`.
- Cena jest informacyjna i wymaga okresowej ręcznej aktualizacji, dopóki nie ma dostępu do oficjalnego API.
- Nie kopiujemy automatycznie zdjęć, opisów ani cen z Amazon. Po uzyskaniu dostępu do Creators API można rozszerzyć integrację zgodnie z warunkami programu.
- Nie publikujemy linku, jeśli nie da się potwierdzić produktu lub identyfikatora partnerskiego.

## Schemat nowej oferty
```json
{
  "id": "tanievo-059",
  "name": "Nazwa produktu",
  "category": "Elektronika",
  "merchant": "Amazon",
  "price": 0,
  "currency": "PLN",
  "productUrl": "WKLEJ_PELNY_LINK_PARTNERSKI",
  "linkType": "affiliate",
  "asin": "ASIN",
  "priceCheckedAt": "RRRR-MM-DD",
  "image": "",
  "availability": "Sprawdź u sprzedawcy"
}
```

## Ważne
Katalog jest ładowany z pliku `amazon-offers.json`. Nie edytuj ręcznie `app.js`, aby dodawać kolejne oferty. Każdy nowy link przechodzi walidację tagu i ASIN przed wyświetleniem na stronie.
