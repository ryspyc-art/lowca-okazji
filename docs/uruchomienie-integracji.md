# Uruchomienie prawdziwych ofert i promocji

## 1. Ceneo — wymagany dostęp wydawcy

Ceneo udostępnia API partnerom programu afiliacyjnego. Samo posiadanie strony nie oznacza automatycznego przyznania klucza API.

1. Zarejestruj lub zaloguj konto w [Programie Partnerskim Ceneo](https://pp.ceneo.pl/).
2. W panelu administracyjnym złóż wniosek o dostęp do API i poczekaj na przyznanie klucza.
3. Odczytaj Partner ID w ustawieniach konta.
4. W repozytorium GitHub otwórz Settings → Secrets and variables → Actions → New repository secret.
5. Dodaj:
   - `CENEO_API_KEY` — przyznany klucz API,
   - `CENEO_PARTNER_ID` — Partner ID z panelu.
6. Opcjonalnie w zakładce Variables dodaj `CENEO_SEARCH_TERMS`, np. `smartfon,laptop,karta graficzna,słuchawki,monitor`.

Importer korzysta z OAuth 2.0 client_credentials, pobiera token i wywołuje PartnerService GetProducts. Do adresu produktu dopisuje Partner ID zgodnie z dokumentacją Ceneo. Nie umieszczaj klucza API w publicznych plikach strony.

Dokumentacja:
- https://partnerzyapi.ceneo.pl/
- https://partnerzyapi.ceneo.pl/Help/Service?name=PartnerService

## 2. Awin — opcjonalny drugi feed

1. Zarejestruj się jako wydawca Awin i uzyskaj akceptację reklamodawców, których produkty chcesz promować.
2. W panelu Awin otwórz Toolbox → Create-a-Feed.
3. Wybierz polski feed, reklamodawców i potrzebne pola. Wygeneruj adres pobierania CSV.
4. W GitHub → Settings → Secrets and variables → Actions dodaj sekret `AWIN_FEED_URL` z pełnym adresem feedu.
5. Nie publikuj tego adresu w kodzie ani w wiadomościach — zawiera klucz dostępu do feedu.

Importer Awin przyjmuje rekordy z ceną w PLN, nazwą reklamodawcy i bezpiecznym linkiem HTTPS. Rekordy z inną lub niepodaną walutą są pomijane, aby nie wyświetlać błędnych cen.

Dokumentacja Awin:
- https://success.awin.com/articles/en_US/Knowledge/How-can-I-access-a-Product-Feed
- https://help.awin.com/developers/docs/awins-apis-overview

## 3. Komputronik

Program partnerski Komputronik (Polecaj-Ka) wymaga rejestracji i weryfikacji konta. Linki afiliacyjne generuje się w panelu programu. Obecne linki partnerskie w serwisie pozostają aktywnymi odnośnikami przekazanymi do projektu.

Nie znaleźliśmy publicznej dokumentacji feedu/API Komputronik dla wydawców. Dlatego nie próbujemy pobierać cen przez nieautoryzowane scrapowanie. Jeśli panel udostępni feed produktowy lub Komputronik przekaże oficjalną specyfikację integracji, można dodać go jako kolejny importer.

Oficjalny program:
- https://www.komputronik.pl/lp/komputronik-afiliacja/
- Kontakt: afiliacja@komputronik.pl

## 4. Automatyczne aktualizacje

Workflow `.github/workflows/update-ceneo.yml`:
- uruchamia się co 6 godzin,
- można go uruchomić ręcznie w GitHub → Actions → Aktualizacja ofert partnerskich → Run workflow,
- uruchamia importery Ceneo i Awin, jeśli są skonfigurowane sekrety,
- zapisuje zmieniony `products.json` do repozytorium,
- nie umieszcza kluczy API w przeglądarce.

Po pojawieniu się `products.json` frontend automatycznie pobiera dane. Jeśli nie ma poprawnego feedu, pozostaje katalog demonstracyjny — nie publikuje fikcyjnych cen.

## 5. Google — indeksowanie

1. Otwórz [Google Search Console](https://search.google.com/search-console/).
2. Dodaj usługę typu „Prefiks adresu URL”: `https://ryspyc-art.github.io/lowca-okazji/`.
3. Zweryfikuj własność jedną z metod udostępnionych przez Google. Jeśli wybierzesz znacznik HTML, przekaż jego wartość, aby można było dodać go do strony. Jeśli Google wymaga pliku weryfikacyjnego, pobierz plik i dodaj go do głównego katalogu repozytorium.
4. Po weryfikacji prześlij mapę witryny: `https://ryspyc-art.github.io/lowca-okazji/sitemap.xml`.
5. Sprawdzaj raport indeksowania i błędy. Przesłanie mapy nie gwarantuje indeksacji.

## 6. Facebook i grupy zakupowe

Na stronie jest już sekcja udostępniania:
- przycisk otwierający udostępnianie na Facebooku,
- przycisk kopiujący gotowy, uczciwy tekst do grup zakupowych.

Nie publikujemy automatycznie postów w grupach ani nie wysyłamy spamu. Przed publikacją należy sprawdzić regulamin konkretnej grupy i jasno oznaczyć linki partnerskie.

## 7. Status

- [x] Importer Ceneo przygotowany.
- [x] Importer Awin CSV przygotowany.
- [x] Harmonogram GitHub Actions co 6 godzin.
- [x] Frontend pobiera `products.json`, gdy katalog istnieje.
- [x] Sekcja udostępniania Facebook / tekst do grup.
- [ ] Otrzymanie klucza API Ceneo i Partner ID.
- [ ] Uzyskanie feedu Awin od zaakceptowanych reklamodawców.
- [ ] Weryfikacja właściciela w Google Search Console.
- [ ] Oficjalny feed/API Komputronik, jeśli zostanie udostępniony wydawcy.
