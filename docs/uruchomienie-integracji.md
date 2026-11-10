# Tanievo.pl — przygotowanie integracji Ceneo

## Aktualny status

- Strona działa jako katalog demonstracyjny.
- Karty przykładowe nie pokazują cen, rabatów ani dostępności.
- W pliku `app.js` 10 kart produktów ma skonfigurowane odnośniki do kart produktów w Ceneo z identyfikatorami partnera. Sam zapis parametrów `crid` i `pid` nie potwierdza naliczania prowizji; raportowanie wymaga weryfikacji w Panelu Partnera.
- Ceneo odmówiło obecnie dostępu do niestandardowego API i zaleciło rozwój własnych treści oraz korzystanie ze standardowych kreacji z panelu.
- Standardowe kreacje (linki tekstowe, banery, rotatory i wyszukiwarka) wymagają kodu wygenerowanego na aktywnym koncie Partnera. W katalogu znajduje się 10 odnośników do kart produktów z parametrami partnera; ich skuteczność trzeba sprawdzić w panelu.
- Importer i workflow pozostają zablokowane do czasu pisemnego potwierdzenia zasad wykorzystania danych przez Ceneo.

## Co wynika z regulaminu Ceneo

1. **Art. XIII ust. 2:** dostęp do API wymaga osobnego wniosku i pozytywnej decyzji Ceneo; dopiero wtedy wydawany jest klucz.
2. **Art. XIII ust. 4:** dane pobrane przez API można wykorzystywać wyłącznie w celu promowania serwisu Ceneo.pl, zgodnie z regulaminem.
3. **Art. XIII ust. 7:** partner nie jest uprawniony do modyfikowania treści zwracanych przez metody API.
4. **Art. V ust. 1 lit. a pkt vi:** regulamin ogranicza publikowanie treści dotyczących ofert w konkretnych sklepach oraz linków do nich, jeżeli nie powstały w ramach współpracy z Ceneo.
5. **Art. XIII ust. 8:** w razie zablokowania dostępu trzeba niezwłocznie usunąć dane pobrane przez API.

Dlatego przed uruchomieniem porównywarki trzeba uzyskać od Ceneo pisemną odpowiedź, czy i w jakiej formie dozwolone są: prezentacja ofert na stronie, sortowanie i filtrowanie, przechowywanie kopii danych, aktualizacja katalogu oraz przekierowania do sklepów. Nie zakładamy, że sam klucz API oznacza zgodę na wszystkie te funkcje.

## Co już przygotowano technicznie

- Strona główna z wyszukiwaniem, kategoriami i listą ulubionych.
- Katalog demonstracyjny bez fikcyjnych cen i rabatów.
- Strona „Dla partnerów” z opisem projektu i statusem integracji.
- Strona wyjaśniająca zasady linków afiliacyjnych.
- Polityka prywatności dla obecnej wersji demonstracyjnej; wymaga uzupełnienia danych administratora i kontaktu przed uruchomieniem komercyjnym.
- Podstawowe metadane SEO, robots.txt i sitemap.xml.
- Prototyp importera Ceneo w repozytorium.
- Workflow GitHub Actions do ręcznego uruchamiania po zatwierdzeniu zasad.

## Blokada bezpieczeństwa integracji

Importer wymaga sekretu GitHub Actions:

- `CENEO_API_KEY` — klucz wydany przez Ceneo,
- `CENEO_PARTNER_ID` — identyfikator partnera,
- `CENEO_API_PUBLICATION_APPROVED` — wartość `YES` wyłącznie po otrzymaniu pisemnego potwierdzenia Ceneo.

**Nie ustawiaj `CENEO_API_PUBLICATION_APPROVED=YES` przed wyjaśnieniem zasad z Ceneo.** Klucza API nie wolno umieszczać w kodzie strony ani w publicznym JavaScript.

## Ograniczenia feedu Awin

Importer Awin nie jest obecnie uruchamiany przez workflow Ceneo. Jeżeli zostanie użyty w osobnym, zatwierdzonym procesie, wymaga jawnych list dozwolonych hostów:
- `AWIN_FEED_ALLOWED_HOSTS` — dokładny host serwera feedu,
- `AWIN_ALLOWED_PRODUCT_HOSTS` — dokładne hosty stron produktów,
- `AWIN_ALLOWED_IMAGE_HOSTS` — opcjonalne dokładne hosty obrazów.

Adresy muszą korzystać z HTTPS, nie mogą zawierać danych logowania ani niestandardowych portów. Przekierowania feedu są odrzucane. Bez skonfigurowanej allowlisty importer nie pobiera lub nie publikuje ofert.

## Kolejne kroki

1. Rozwinąć własne poradniki i uzyskać stabilny ruch organiczny.
2. Zalogować się do Panelu Partnera Ceneo, sprawdzić status konta i w zakładce „Twoje strony” dodać lub zweryfikować `https://tanievo.pl/`. Ceneo wymaga zgłoszenia wszystkich powierzchni, na których publikowane są kreacje. Instrukcja: https://pp.ceneo.pl/najczesciej-zadawane-pytania.
3. Utrzymywać w katalogu wyłącznie pełne adresy wygenerowane w Panelu Partnera, bez ręcznej zmiany `crid` i `pid`.
4. Zweryfikować kliknięcia i raportowanie prowizji w panelu Ceneo; sama obecność parametrów w adresie nie potwierdza jeszcze naliczania prowizji.
5. Uzupełnić dane administratora i dokumenty wymagane przed uruchomieniem funkcji komercyjnych.
6. Po zebraniu rzeczywistych statystyk i opisaniu sposobu kierowania ruchu do Ceneo przygotować ponowny, merytoryczny wniosek o API.
7. Dopiero po pisemnej zgodzie skonfigurować sekrety GitHub i przetestować integrację.

## Ważne

Nie pobieramy cen przez scrapowanie stron sklepów. Nie publikujemy danych demonstracyjnych jako rzeczywistych ofert. Nie uruchamiamy feedów innych sieci na powierzchni zgłoszonej do Ceneo bez uprzedniego wyjaśnienia zgodności z regulaminem.
