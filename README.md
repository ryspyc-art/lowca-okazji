# Łowca Okazji

Responsywna, statyczna strona publikowana przez GitHub Pages.

## Co działa
- wyszukiwanie nazw produktów i kategorii,
- filtrowanie kategorii i sortowanie katalogu,
- zapisywanie ulubionych produktów w pamięci lokalnej przeglądarki,
- filtrowanie zapisanych pozycji,
- responsywny układ na telefonach i komputerach,
- wyraźne oznaczenie katalogu demonstracyjnego i statusu integracji Ceneo.

## Pliki
- `index.html` — struktura strony, treści i metadane SEO,
- `style.css` — wygląd i układ responsywny,
- `app.js` — wyszukiwanie, filtrowanie, sortowanie i ulubione,
- `site.js` — wspólne drobne funkcje stron informacyjnych,
- `robots.txt` i `sitemap.xml` — podstawowa konfiguracja indeksowania,
- `favicon.svg` — ikona strony,
- `o-afiliacji.html` — wyjaśnienie działania linków partnerskich,
- `polityka-prywatnosci.html` — informacja o localStorage, hostingu i aktualnym zakresie przetwarzania danych,
- `dla-partnerow.html` — opis projektu, standardów prezentacji ofert i planowanych integracji dla partnerów,
- `poradnik-jak-kupowac.html` — poradnik zakupowy wspierający ruch z wyszukiwarki,
- `scripts/update_ceneo.py` — importer ofert Ceneo po uzyskaniu klucza API,
- `scripts/update_awin.py` — importer feedu CSV Awin z walidacją hostów i blokadą przekierowań,
- `.github/workflows/update-ceneo.yml` — ręczny workflow aktualizacji (obecnie zablokowany do czasu pisemnego potwierdzenia Ceneo),
- `products.json` — plik katalogu tworzony przez ręcznie uruchamiany workflow po zatwierdzeniu integracji; obecnie nie jest publikowany.

## Ważne informacje
Główny katalog produktów zawiera przykładowe dane demonstracyjne. Ceny, sklepy i rabaty w tych kartach nie są aktualnymi ofertami. Strona nie publikuje obecnie aktywnych linków zakupowych ani cen. Prototyp integracji Ceneo pozostaje wyłączony do czasu otrzymania klucza API i pisemnego potwierdzenia dozwolonego sposobu prezentacji danych.

Przed zakupem użytkownik powinien sprawdzić aktualną cenę, dostępność i warunki bezpośrednio w sklepie. Linki afiliacyjne są oznaczone, a kliknięcie lub zakup może przynieść wydawcy prowizję.

## Kolejne kroki przed pełnym uruchomieniem serwisu
1. Uzyskać i utrzymać akceptację wydawcy w programie partnerskim Ceneo.
2. Uzyskać pisemne potwierdzenie Ceneo dotyczące wykorzystania API, prezentacji danych i linkowania.
3. Dopiero po potwierdzeniu zasad skonfigurować klucz API jako sekret GitHub Actions.
4. Uzupełnić zweryfikowane dane administratora i kontakt w polityce prywatności przed uruchomieniem funkcji komercyjnych.
5. Dla ewentualnego feedu Awin skonfigurować osobne sekrety/zmienne `AWIN_FEED_URL`, `AWIN_FEED_ALLOWED_HOSTS`, `AWIN_ALLOWED_PRODUCT_HOSTS` oraz opcjonalnie `AWIN_ALLOWED_IMAGE_HOSTS`. Listy hostów muszą zawierać dokładne nazwy domen rozdzielone przecinkami; bez nich importer odmawia pobrania lub publikacji ofert.
6. Testować działanie strony na telefonach i komputerach.
7. Dodać i zweryfikować stronę w Google Search Console po potwierdzeniu własności witryny.

Szczegółowa instrukcja konfiguracji sekretów, Ceneo, Awin, Google i promocji znajduje się w [docs/uruchomienie-integracji.md](docs/uruchomienie-integracji.md).

Nie należy przedstawiać danych demonstracyjnych jako rzeczywistych promocji.
