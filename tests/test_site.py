from html.parser import HTMLParser
from pathlib import Path
import re
import unittest
import json

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.meta = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs)
        if tag == "meta":
            self.meta.append(attrs)


class SiteIntegrityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.parser = SiteParser()
        cls.parser.feed(cls.html)
        cls.app = (ROOT / "app.js").read_text(encoding="utf-8")

    def test_no_duplicate_ids(self):
        self.assertEqual(len(self.parser.ids), len(set(self.parser.ids)))

    def test_main_interaction_targets_exist(self):
        required = {"main-content", "searchInput", "productGrid", "favoritesToggle",
                    "favoritesCount", "resultCount", "emptyState", "copyPromoText",
                    "shareFeedback", "year"}
        self.assertTrue(required.issubset(set(self.parser.ids)))

    def test_comparison_navigation_points_to_comparison_hub(self):
        self.assertIn('href="#aktualne-porownania">Porównania</a>', self.html)
        self.assertIn('id="aktualne-porownania"', self.html)

    def test_custom_domain_configuration_is_consistent(self):
        self.assertEqual((ROOT / "CNAME").read_text(encoding="utf-8").strip(), "tanievo.pl")
        self.assertIn('href="https://tanievo.pl/"', self.html)
        self.assertIn("https://tanievo.pl/sitemap.xml", (ROOT / "robots.txt").read_text(encoding="utf-8"))

    def test_store_comparison_page_and_komputronik_disclosure(self):
        page = (ROOT / "porownanie-sklepow.html").read_text(encoding="utf-8")
        for term in ("Komputronik", "Acer Nitro V 16S", "Gigabyte A18",
                     "Morele", "OleOle", "afiliacyjnymi Tanievo",
                     "zwykłymi odnośnikami"):
            with self.subTest(term=term):
                self.assertIn(term, page)
        self.assertIn('href="porownanie-sklepow.html"', self.html)

    def test_comparison_engine_has_model_ids_direct_links_and_sorting(self):
        page = (ROOT / "porownywarka.html").read_text(encoding="utf-8")
        script = (ROOT / "porownywarka.js").read_text(encoding="utf-8")
        data = json.loads((ROOT / "porownania.json").read_text(encoding="utf-8"))
        self.assertIn('href="porownywarka.html"', self.html)
        self.assertIn('id="comparisonSort"', page)
        self.assertIn('modelCode', json.dumps(data))
        self.assertIn('ean', json.dumps(data))
        self.assertIn('shipping', json.dumps(data))
        self.assertIn('availability', json.dumps(data))
        self.assertIn('checkedAt', json.dumps(data))
        self.assertIn('offer.url', script)
        self.assertIn('at - bt', script)
        self.assertIn('allowedHosts', script)
        for product in data["products"]:
            self.assertTrue(product.get("modelCode"))
            self.assertTrue(product.get("ean"))
            self.assertGreaterEqual(len(product.get("offers", [])), 2)
            for offer in product["offers"]:
                self.assertTrue(offer.get("url", "").startswith("https://"))
                self.assertTrue(offer.get("checkedAt"))
                self.assertIsInstance(offer.get("price"), (int, float))

    def test_product_images_have_verified_sources_and_fallback(self):
        self.assertIn("verifiedProductImages", self.app)
        self.assertIn("cdn.newtime.ua/upload/2025-09/navushniki-apple-airpods-pro-3_2400.webp", self.app)
        self.assertIn("Samsung Galaxy Buds3 Pro", self.app)
        self.assertIn('grid.addEventListener("error"', self.app)
        self.assertIn("product-image-fallback", self.app)
        self.assertIn(".product-image{", (ROOT / "style.css").read_text(encoding="utf-8"))

    def test_has_search_engine_metadata(self):
        names = {item.get("name") for item in self.parser.meta}
        properties = {item.get("property") for item in self.parser.meta}
        self.assertIn("description", names)
        self.assertIn("robots", names)
        self.assertIn("og:title", properties)

    def test_affiliate_and_search_links_use_shared_ceneo_tracking(self):
        exact_airpods_url = "https://www.ceneo.pl/199946527#cid=52090&crid=818403&pid=31443"
        self.assertIn('productUrl:"' + exact_airpods_url + '"', self.app)
        self.assertIn('const AIRPODS_5_CENEO_URL = "' + exact_airpods_url + '";', self.app)
        self.assertIn('const CENEO_TRACKING = "cid=52090&crid=818403&pid=31443";', self.app)
        self.assertIn('url.hash = CENEO_TRACKING;', self.app)
        self.assertIn('getCeneoUrl(product)', self.app)
        self.assertIn('getAmazonUrl(product)', self.app)
        self.assertIn('rel="nofollow noopener noreferrer"', self.app)
        self.assertIn('rel="sponsored nofollow noopener noreferrer"', self.app)
        offers = json.loads((ROOT / "amazon-offers.json").read_text(encoding="utf-8"))
        from urllib.parse import urlparse, parse_qs
        for offer in offers["offers"]:
            if offer.get("linkType") == "comparison":
                for key in ("productUrl", "ceneoUrl"):
                    if offer.get(key, "").startswith("https://www.ceneo.pl/"):
                        self.assertEqual(urlparse(offer[key]).fragment, "cid=52090&crid=818403&pid=31443")
            else:
                parsed = urlparse(offer["productUrl"])
                self.assertEqual(parsed.scheme, "https")
                self.assertEqual(parsed.hostname, "www.amazon.pl")
                self.assertEqual(parse_qs(parsed.query).get("tag"), ["tanievo-21"])

    def test_ceneo_search_links_receive_shared_tracking_without_changing_search_paths(self):
        self.assertIn('const CENEO_TRACKING = "cid=52090&crid=818403&pid=31443";', self.app)
        self.assertIn('function withCeneoTracking(candidate)', self.app)
        self.assertIn('url.hash = CENEO_TRACKING;', self.app)
        self.assertIn('product.linkType = "search";', self.app)
        self.assertIn('if (!product.productUrl && product.linkType !== "paused")', self.app)

    def test_comparison_renderer_escapes_catalog_text(self):
        script = (ROOT / "porownywarka.js").read_text(encoding="utf-8")
        self.assertIn("const escapeHTML", script)
        self.assertIn("escapeHTML(product.name)", script)
        self.assertIn("escapeHTML(offer.store)", script)

    def test_price_sources_and_check_dates_are_rendered(self):
        self.assertIn("product.priceSource", self.app)
        self.assertIn("product.priceCheckedAt", self.app)
        self.assertIn("Cena orientacyjna", self.app)

    def test_discovery_catalog_is_not_mislabeled_as_affiliate(self):
        discovery_ids = re.findall(r'\["tanievo-(\d{3})"', self.app)
        self.assertEqual(len(discovery_ids), 40)
        self.assertEqual(discovery_ids[0], "011")
        self.assertEqual(discovery_ids[-1], "050")
        self.assertIn('linkType:"search"', self.app)

    def test_live_catalog_loader_is_wired_but_api_is_not_enabled(self):
        self.assertEqual(len(re.findall(r"(?m)^loadLiveCatalog\(\);$", self.app)), 1)
        self.assertIn('CENEO_API_PUBLICATION_APPROVED', (ROOT / "scripts" / "update_ceneo.py").read_text(encoding="utf-8"))

    def test_privacy_policy_is_linked(self):
        self.assertIn("polityka-prywatnosci.html", self.html)
        self.assertTrue((ROOT / "polityka-prywatnosci.html").is_file())

    def test_all_public_pages_have_content_security_policy(self):
        pages = sorted(path.name for path in ROOT.glob("*.html"))
        for filename in pages:
            with self.subTest(page=filename):
                content = (ROOT / filename).read_text(encoding="utf-8")
                self.assertIn('http-equiv="Content-Security-Policy"', content)
                self.assertIn("object-src 'none'", content)
                self.assertIn('name="referrer"', content)

    def test_external_new_tab_links_use_noopener(self):
        for filename in sorted(path.name for path in ROOT.glob("*.html")):
            parser = SiteParser()
            parser.feed((ROOT / filename).read_text(encoding="utf-8"))
            for link in parser.links:
                if link.get("target") == "_blank":
                    with self.subTest(page=filename, href=link.get("href")):
                        rel = set(link.get("rel", "").split())
                        self.assertIn("noopener", rel)
                        self.assertIn("noreferrer", rel) if link.get("href", "").startswith("http") else None


if __name__ == "__main__":
    unittest.main()
