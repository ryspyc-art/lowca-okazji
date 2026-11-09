# Podłączenie Tanievo.pl do GitHub Pages

## Przed rozpoczęciem
Domena Tanievo.pl musi być zarejestrowana i aktywna na koncie właściciela. Nie dodawaj rekordów DNS ani pliku CNAME, dopóki domena nie jest zarejestrowana. Najpierw dodaje się domenę w ustawieniach GitHub Pages, a następnie ustawia DNS u rejestratora.

## Docelowa konfiguracja
Repozytorium: ryspyc-art/lowca-okazji  
Konto GitHub Pages: ryspyc-art.github.io  
Domena główna: tanievo.pl  
Wariant WWW: www.tanievo.pl

### Rekordy DNS dla domeny głównej
Dodaj cztery rekordy A:
- Host: @ | Wartość: 185.199.108.153
- Host: @ | Wartość: 185.199.109.153
- Host: @ | Wartość: 185.199.110.153
- Host: @ | Wartość: 185.199.111.153

Opcjonalne rekordy AAAA dla IPv6:
- Host: @ | Wartość: 2606:50c0:8000::153
- Host: @ | Wartość: 2606:50c0:8001::153
- Host: @ | Wartość: 2606:50c0:8002::153
- Host: @ | Wartość: 2606:50c0:8003::153

### Wariant WWW
Dodaj rekord:
- Typ: CNAME
- Host: www
- Wartość: ryspyc-art.github.io

Nie dodawaj wildcard DNS. Usuń sprzeczne rekordy A/AAAA/CNAME dla tych samych hostów, jeśli występują.

## Kolejność wdrożenia
1. Zarejestruj tanievo.pl u wybranego rejestratora.
2. W GitHub otwórz repozytorium Settings → Pages i wpisz tanievo.pl w polu Custom domain.
3. Po zapisaniu sprawdź, czy w repozytorium pojawił się plik CNAME (przy publikacji z gałęzi).
4. W panelu rejestratora ustaw rekordy DNS podane wyżej.
5. Poczekaj na propagację DNS — może potrwać do 24 godzin.
6. Wróć do Settings → Pages i włącz Enforce HTTPS, gdy certyfikat będzie gotowy.
7. Sprawdź oba adresy: tanievo.pl oraz www.tanievo.pl.
8. Zaktualizuj canonical, Open Graph, sitemap.xml, robots.txt i linki promocyjne z adresu GitHub Pages na https://tanievo.pl/.

## Kontrola po wdrożeniu
- Oba adresy działają i kierują do jednej wersji kanonicznej.
- HTTPS działa bez ostrzeżeń.
- Strona główna, poradniki, polityka prywatności i sekcja partnerów zwracają poprawne strony.
- Sitemap: https://tanievo.pl/sitemap.xml.
- Google Search Console potwierdza własność domeny przez DNS TXT.

## Uwaga
Adresy IP i kolejność konfiguracji wynikają z dokumentacji GitHub Pages. Nie ustawiaj domeny w DNS przed dodaniem jej do repozytorium GitHub Pages — GitHub wskazuje to jako zabezpieczenie przed przejęciem domeny/subdomeny.