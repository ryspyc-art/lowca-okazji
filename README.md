# Tanievo.pl

Responsywna, statyczna strona publikowana przez GitHub Pages.

## Co działa
- wyszukiwanie nazw produktów i kategorii,
- filtrowanie kategorii i sortowanie katalogu,
- zapisywanie ulubionych produktów w pamięci lokalnej przeglądarki,
- filtrowanie zapisanych pozycji,
- responsywny układ na telefonach i komputerach,
- katalog 10 wybranych produktów z 9 aktywnymi linkami partnerskimi oraz 1 linkiem oczekującym na weryfikację,
- oznaczenie linków partnerskich i brak własnych, niezweryfikowanych cen.

## Pliki
- `index.html` — struktura strony, treści i metadane SEO,
- `style.css` — wygląd i układ responsywny,
- `app.js` — katalog wybranych produktów, linki partnerskie, wyszukiwanie, filtrowanie i ulubione,
- `site.js` — wspólne drobne funkcje stron informacyjnych,
- `robots.txt` i `sitemap.xml` — podstawowa konfiguracja indeksowania,
- `favicon.svg` — ikona strony,
- `o-afiliacji.html` — wyjaśnienie działania linków partnerskich,
- `polityka-prywatnosci.html` — informacja o localStorage, hostingu i aktualnym zakresie przetwarzania danych,
- `dla-partnerow.html` — opis projektu, standardów prezentacji ofert i planowanych integracji dla partnerów,
- `poradnik-jak-kupowac.html` — poradnik zakupowy wspierający ruch z wyszukiwarki,
- `poradnik-porownywanie-cen.html` — poradnik porównywania cen,
- `poradnik-weryfikacja-sprzedawcy.html` — poradnik weryfikacji sklepu,
- `poradnik-koszt-dostawy.html` — poradnik liczenia całkowitego kosztu,
- `poradnik-zwroty-reklamacje.html` — poradnik praw konsumenta,
- `poradnik-promocje-pulapki.html` — poradnik rozpoznawania pozornych promocji,
- `docs/PLAN_PROMOCJI.md` — plan rozwoju ruchu organicznego i treści promocyjne,
- `docs/DOMAIN_SETUP.md` — procedura podłączenia Tanievo.pl do GitHub Pages,
- `scripts/update_ceneo.py` — importer ofert Ceneo po uzyskaniu klucza API,
- `scripts/update_awin.py` — importer feedu CSV Awin z walidacją hostów i blokadą przekierowań,
- `.github/workflows/update-ceneo.yml` — ręczny workflow aktualizacji (obecnie zablokowany do czasu pisemnego potwierdzenia Ceneo),
- `products.json` — plik katalogu tworzony przez ręcznie uruchamiany workflow po zatwierdzeniu integracji; obecnie nie jest publikowany.

## Ważne informacje
Katalog zawiera wybrane produkty z linkami partnerskimi. Nie publikuje własnych cen ani stanów magazynowych; aktualne warunki należy sprawdzić na stronie partnera. Link Diablo Chairs pozostaje wyłączony do czasu potwierdzenia, że zastosowany format poprawnie śledzi prowizję. Prototyp automatycznej integracji API Ceneo pozostaje wyłączony do czasu otrzymania klucza API i pisemnego potwierdzenia zasad wykorzystania danych.

Przed zakupem użytkownik powinien sprawdzić aktualną cenę, dostępność i warunki bezpośrednio w sklepie. Linki afiliacyjne są oznaczone, a kliknięcie lub zakup może przynieść wydawcy prowizję.

## Kolejne kroki przed pełnym uruchomieniem serwisu
1. Uzyskać i utrzymać akceptację wydawcy w programie partnerskim Ceneo.
2. Uzyskać pisemne potwierdzenie Ceneo dotyczące wykorzystania API, prezentacji danych i linkowania.
3. Dla standardowych kreacji używać wyłącznie pełnych adresów wygenerowanych w Panelu Partnera; nie modyfikować parametrów śledzących.\n4. Dopiero po potwierdzeniu zasad skonfigurować klucz API jako sekret GitHub Actions.
4. Uzupełnić zweryfikowane dane administratora i kontakt w polityce prywatności przed uruchomieniem funkcji komercyjnych.
6. Dla ewentualnego feedu Awin skonfigurować osobne sekrety/zmienne `AWIN_FEED_URL`, `AWIN_FEED_ALLOWED_HOSTS`, `AWIN_ALLOWED_PRODUCT_HOSTS` oraz opcjonalnie `AWIN_ALLOWED_IMAGE_HOSTS`. Listy hostów muszą zawierać dokładne nazwy domen rozdzielone przecinkami; bez nich importer odmawia pobrania lub publikacji ofert.
7. Testować działanie strony na telefonach i komputerach.
8. Dodać i zweryfikować stronę w Google Search Console po potwierdzeniu własności witryny.

Szczegółowa instrukcja konfiguracji sekretów, Ceneo, Awin, Google i promocji znajduje się w [docs/uruchomienie-integracji.md](docs/uruchomienie-integracji.md).

Nie należy przedstawiać danych demonstracyjnych jako rzeczywistych promocji.


## Rebranding Tanievo.pl
Marka serwisu to Tanievo.pl. Do czasu rejestracji domeny i konfiguracji DNS witryna pozostaje dostępna pod dotychczasowym adresem GitHub Pages. Nie ustawiaj domeny tanievo.pl jako canonical ani nie zmieniaj DNS przed jej rejestracją i potwierdzeniem własności.
