# Łowca Okazji

Responsywna, statyczna strona publikowana przez GitHub Pages.

## Co działa
- wyszukiwanie nazw produktów i kategorii,
- filtrowanie kategorii i sortowanie katalogu,
- zapisywanie ulubionych produktów w pamięci lokalnej przeglądarki,
- filtrowanie zapisanych pozycji,
- responsywny układ na telefonach i komputerach,
- wybrane sekcje z linkami partnerskimi Komputronik.

## Pliki
- `index.html` — struktura strony, treści i metadane SEO,
- `style.css` — wygląd i układ responsywny,
- `app.js` — wyszukiwanie, filtrowanie, sortowanie i ulubione,
- `robots.txt` i `sitemap.xml` — podstawowa konfiguracja indeksowania,
- `favicon.svg` — ikona strony,
- `o-afiliacji.html` — wyjaśnienie działania linków partnerskich,
- `dla-partnerow.html` — opis projektu, standardów prezentacji ofert i planowanych integracji dla partnerów,
- `poradnik-jak-kupowac.html` — poradnik zakupowy wspierający ruch z wyszukiwarki,
- `scripts/update_ceneo.py` — importer ofert Ceneo po uzyskaniu klucza API,
- `scripts/update_awin.py` — importer feedu CSV Awin,
- `.github/workflows/update-ceneo.yml` — harmonogram aktualizacji co 6 godzin,
- `products.json` — plik generowany automatycznie po skonfigurowaniu feedu.

## Ważne informacje
Główny katalog produktów zawiera przykładowe dane demonstracyjne. Ceny, sklepy i rabaty w tych kartach nie są aktualnymi ofertami. Wybrane banery i sekcje partnerskie prowadzą natomiast do Komputronika przez linki afiliacyjne.

Przed zakupem użytkownik powinien sprawdzić aktualną cenę, dostępność i warunki bezpośrednio w sklepie. Linki afiliacyjne są oznaczone, a kliknięcie lub zakup może przynieść wydawcy prowizję.

## Kolejne kroki przed pełnym uruchomieniem serwisu
1. Uzyskać i utrzymać akceptację wydawcy w programach partnerskich.
2. Dodać legalne źródło aktualnych danych produktowych (API, feed lub dozwolone linki).
3. Zweryfikować każdy link afiliacyjny i jego identyfikator śledzący.
4. Rozbudować oznaczenia reklamowe oraz przygotować politykę prywatności i wymagane informacje o danych/plikach cookies, jeśli zostaną wdrożone narzędzia śledzące.
5. Testować działanie strony na telefonach i komputerach.
6. Dodać i zweryfikować stronę w Google Search Console po potwierdzeniu własności witryny.

Szczegółowa instrukcja konfiguracji sekretów, Ceneo, Awin, Google i promocji znajduje się w [docs/uruchomienie-integracji.md](docs/uruchomienie-integracji.md).

Nie należy przedstawiać danych demonstracyjnych jako rzeczywistych promocji.
