from html.parser import HTMLParser
from pathlib import Path
import unittest

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

    def test_no_duplicate_ids(self):
        self.assertEqual(len(self.parser.ids), len(set(self.parser.ids)))

    def test_main_interaction_targets_exist(self):
        required = {"main-content", "searchInput", "productGrid", "favoritesToggle",
                    "favoritesCount", "resultCount", "emptyState", "copyPromoText",
                    "shareFeedback", "year"}
        self.assertTrue(required.issubset(set(self.parser.ids)))

    def test_has_search_engine_metadata(self):
        names = {item.get("name") for item in self.parser.meta}
        properties = {item.get("property") for item in self.parser.meta}
        self.assertIn("description", names)
        self.assertIn("robots", names)
        self.assertIn("og:title", properties)

    def test_affiliate_links_are_disclosed_and_tagged(self):
        affiliate_links = [
            link for link in self.parser.links
            if "komputronik.pl" in link.get("href", "")
        ]
        for link in affiliate_links:
            rel = set(link.get("rel", "").split())
            self.assertTrue({"sponsored", "nofollow"}.issubset(rel))

    def test_privacy_policy_is_linked(self):
        self.assertIn("polityka-prywatnosci.html", self.html)
        self.assertTrue((ROOT / "polityka-prywatnosci.html").is_file())

    def test_all_public_pages_have_content_security_policy(self):
        pages = ["index.html", "dla-partnerow.html", "o-afiliacji.html",
                 "poradnik-jak-kupowac.html", "polityka-prywatnosci.html"]
        for filename in pages:
            with self.subTest(page=filename):
                content = (ROOT / filename).read_text(encoding="utf-8")
                self.assertIn('http-equiv="Content-Security-Policy"', content)
                self.assertIn("object-src 'none'", content)
                self.assertIn('name="referrer"', content)

    def test_external_new_tab_links_use_noopener(self):
        for filename in ["index.html", "dla-partnerow.html", "o-afiliacji.html",
                         "poradnik-jak-kupowac.html", "polityka-prywatnosci.html"]:
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
