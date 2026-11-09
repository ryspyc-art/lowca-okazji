import importlib.util
import io
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "update_awin.py"
SPEC = importlib.util.spec_from_file_location("update_awin", MODULE_PATH)
awin = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(awin)


class AwinImporterTests(unittest.TestCase):
    def test_reads_common_feed_column_names(self):
        self.assertEqual(awin.first({"product_name": "Laptop", "price": "99"}, "product_name"), "Laptop")

    def test_maps_electronics_category(self):
        self.assertEqual(awin.category_for("computer accessories"), "Elektronika")

    def test_maps_sport_category(self):
        self.assertEqual(awin.category_for("trekking backpack"), "Sport")

    def test_url_requires_exact_allowlisted_https_host(self):
        hosts = {"feed.example"}
        self.assertEqual(awin.validated_https_url("https://feed.example/catalog.csv", hosts), "https://feed.example/catalog.csv")
        self.assertEqual(awin.validated_https_url("https://feed.example.evil.test/catalog.csv", hosts), "")
        self.assertEqual(awin.validated_https_url("https://feed.example@evil.test/catalog.csv", hosts), "")
        self.assertEqual(awin.validated_https_url("http://feed.example/catalog.csv", hosts), "")
        self.assertEqual(awin.validated_https_url("https://feed.example:8443/catalog.csv", hosts), "")

    def test_imports_valid_pln_feed_and_writes_catalog(self):
        csv_data = (
            "product_name,search_price,currency,aw_deep_link,merchant_name,aw_product_id\n"
            "Laptop testowy,2499.99,PLN,https://shop.example/laptop,Sklep Test,123\n"
        )

        class FakeResponse:
            def __enter__(self):
                return self
            def __exit__(self, *args):
                return False
            def read(self, *args):
                return csv_data.encode("utf-8")

        class FakeOpener:
            def open(self, request, timeout):
                return FakeResponse()

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "products.json"
            env = {
                "AWIN_FEED_URL": "https://feed.example/catalog.csv",
                "AWIN_FEED_ALLOWED_HOSTS": "feed.example",
                "AWIN_ALLOWED_PRODUCT_HOSTS": "shop.example",
                "AWIN_ALLOWED_IMAGE_HOSTS": "images.example",
            }
            with patch.object(awin, "OUT", output), patch.dict(os.environ, env), \
                 patch.object(awin.urllib.request, "build_opener", return_value=FakeOpener()):
                self.assertEqual(awin.main(), 0)

            import json
            payload = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(payload["count"], 1)
            self.assertEqual(payload["items"][0]["name"], "Laptop testowy")
            self.assertEqual(payload["items"][0]["price"], 2499.99)
            self.assertEqual(payload["items"][0]["source"], "Awin")

    def test_product_link_from_unapproved_host_is_skipped(self):
        csv_data = (
            "product_name,search_price,currency,aw_deep_link,merchant_name,aw_product_id\n"
            "Podejrzany produkt,10,PLN,https://evil.example/item,Sklep Test,123\n"
        )

        class FakeResponse:
            def __enter__(self):
                return self
            def __exit__(self, *args):
                return False
            def read(self, *args):
                return csv_data.encode("utf-8")

        class FakeOpener:
            def open(self, request, timeout):
                return FakeResponse()

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "products.json"
            env = {
                "AWIN_FEED_URL": "https://feed.example/catalog.csv",
                "AWIN_FEED_ALLOWED_HOSTS": "feed.example",
                "AWIN_ALLOWED_PRODUCT_HOSTS": "shop.example",
            }
            with patch.object(awin, "OUT", output), patch.dict(os.environ, env), \
                 patch.object(awin.urllib.request, "build_opener", return_value=FakeOpener()):
                with self.assertRaises(RuntimeError):
                    awin.main()
            self.assertFalse(output.exists())


if __name__ == "__main__":
    unittest.main()
