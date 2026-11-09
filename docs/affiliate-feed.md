# Integracja prawdziwych ofert afiliacyjnych

Ten dokument opisuje docelowy kontrakt danych dla katalogu Łowca Okazji. Obecny katalog w `app.js` pozostaje demonstracyjny i nie wolno prezentować go jako aktualnych promocji.

## Rekomendowany przepływ danych

1. Wydawca uzyskuje akceptację w programie partnerskim i dostęp do feedu/API konkretnego reklamodawcy.
2. Feed pobiera proces po stronie serwera lub zaufanej automatyzacji. Klucze API i tokeny nie mogą trafić do publicznego JavaScriptu ani repozytorium.
3. Proces normalizuje dane do wspólnego formatu JSON.
4. Publikowany plik danych zawiera wyłącznie produkty, których źródło i warunki użycia pozwalają na publikację.
5. Frontend pobiera publiczny JSON, sprawdza pola i renderuje karty. Nie może samodzielnie pobierać chronionego feedu ani ujawniać sekretów.

## Wspólny format produktu

| Pole | Typ | Znaczenie |
| --- | --- | --- |
| `id` | string | Stabilny identyfikator produktu |
| `name` | string | Nazwa produktu |
| `category` | string | Kategoria katalogu |
| `price` | number | Aktualna cena liczbowa w PLN |
| `currency` | string | Kod waluty, np. PLN |
| `image` | string | Adres HTTPS obrazu, jeśli feed go udostępnia |
| `productUrl` | string | Docelowy link afiliacyjny HTTPS |
| `merchant` | string | Nazwa reklamodawcy/sklepu |
| `source` | string | Nazwa sieci lub źródła feedu |
| `updatedAt` | string | Czas aktualizacji ISO 8601 |
| `availability` | string | Status dostępności, jeśli jest dostępny w feedzie |

Cena przekreślona i procent obniżki mogą być wyświetlane tylko wtedy, gdy źródło dostarcza wiarygodną cenę odniesienia i pozwala na takie wykorzystanie. Nie należy wyliczać fikcyjnych rabatów.

## Zasady bezpieczeństwa i jakości

- Nigdy nie umieszczać kluczy API, tokenów ani prywatnych URL-i feedów w plikach frontendu.
- Akceptować tylko poprawne adresy HTTPS dla obrazów i linków zakupowych.
- Nie renderować niezaufanych opisów przez `innerHTML`; tekst z feedu powinien być wstawiany jako tekst.
- Walidować typy, zakresy cen, walutę, identyfikatory i daty aktualizacji.
- Odrzucać rekordy bez nazwy, ceny, sklepu lub dozwolonego linku docelowego.
- Zapisywać czas ostatniej aktualizacji i nie prezentować przeterminowanych cen jako aktualnych.
- Oznaczać linki afiliacyjne w sposób zrozumiały dla użytkownika; stosować atrybuty `rel="sponsored nofollow"` tam, gdzie linki są afiliacyjne.
- Przed wdrożeniem sprawdzić regulamin konkretnego programu, zakres licencji do zdjęć/opisów oraz zasady cache'owania feedu.

## Pierwszy kandydat: Ceneo

Dokumentacja API: https://partnerzyapi.ceneo.pl/

Regulamin Programu Partnerskiego wskazuje, że dostęp do API wymaga złożenia wniosku w panelu i otrzymania klucza. Nie zakładamy, że sam fakt rejestracji daje automatyczny dostęp do API.

## Alternatywa: Awin

Dokumentacja feedów: https://help.awin.com/developers/docs/product-feed-publisher-guide-intro

Dostęp do feedów zależy od uprawnień wydawcy i aktywnych relacji z reklamodawcami. Feed należy pobierać zgodnie z instrukcją Awin, z uwzględnieniem czasu aktualizacji i limitów.

## Status

- [x] Frontend katalogu demonstracyjnego.
- [x] Wyszukiwanie, kategorie, sortowanie i ulubione.
- [x] Jasne oznaczenie danych demonstracyjnych.
- [ ] Akceptacja wydawcy w sieci afiliacyjnej.
- [ ] Dostęp do konkretnego feedu/API (wymaga zatwierdzenia konta i sekretów w GitHub).
- [x] Bezpieczny proces pobierania i normalizacji danych przygotowany w skryptach Ceneo/Awin.
- [x] Harmonogram GitHub Actions co 6 godzin.
- [x] Frontend odczytuje wygenerowany katalog JSON.
- [ ] Weryfikacja linków, cen, aktualizacji i oznaczeń afiliacyjnych.
- [ ] Uruchomienie prawdziwego katalogu.
