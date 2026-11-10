# Podłączenie Tanievo.pl do GitHub Pages

## Aktualny stan repozytorium — 10.11.2026

- Plik `CNAME` zawiera domenę `tanievo.pl`.
- Canonical, Open Graph, `robots.txt` i `sitemap.xml` wskazują adres `https://tanievo.pl/`.
- Ostatni build i deploy GitHub Pages zakończyły się sukcesem.
- Nie potwierdzono niezależnie propagacji DNS, ustawienia Custom domain w GitHub Pages ani gotowości certyfikatu HTTPS. Nie należy uznawać tych elementów za sprawdzone wyłącznie na podstawie pliku CNAME.

## Docelowa konfiguracja

Repozytorium: `ryspyc-art/lowca-okazji`  
Domena główna: `tanievo.pl`  
Wariant WWW: `www.tanievo.pl`

### Rekordy DNS dla domeny głównej

W strefie DNS OVH dla hosta `@` powinny być ustawione cztery rekordy A:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Opcjonalne rekordy AAAA dla IPv6:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

### Wariant WWW

Rekord:

- Typ: CNAME
- Host: `www`
- Wartość: `ryspyc-art.github.io`

Nie dodawaj wildcard DNS. Usuń sprzeczne rekordy dla tych samych hostów.

## Kontrola końcowa

1. W GitHub otwórz repozytorium → Settings → Pages.
2. Sprawdź, czy pole Custom domain zawiera `tanievo.pl`.
3. W OVH sprawdź rekordy A dla domeny głównej i CNAME dla `www`.
4. Poczekaj na propagację DNS.
5. Wróć do Settings → Pages i sprawdź status domeny oraz certyfikatu.
6. Włącz Enforce HTTPS dopiero wtedy, gdy GitHub udostępni gotowy certyfikat.
7. Sprawdź ręcznie oba adresy: `https://tanievo.pl` i `https://www.tanievo.pl`; oba powinny prowadzić do jednej wersji kanonicznej.
8. Sprawdź stronę główną, poradniki, politykę prywatności, `robots.txt` i `sitemap.xml`.
9. Po potwierdzeniu własności dodaj domenę do Google Search Console i zweryfikuj ją rekordem DNS TXT.

## Ważne

Adresy IP i zasady konfiguracji należy porównać z aktualną dokumentacją GitHub Pages przed zmianą rekordów. Nie zmieniaj DNS na podstawie samego przykładu — najpierw sprawdź aktualną strefę OVH i ustawienia Custom domain w GitHub Pages.