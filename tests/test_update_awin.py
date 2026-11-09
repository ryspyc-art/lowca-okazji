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

    def test_imports_valid_pln_feed_and_writes_catalog(self):
        csv_data = (
            "product_name,search_price,currency,aw_deep_link,merchant_name,aw_product_id\n"
            "Laptop testowy,2499.99,PLN,https://shop.example/laptop,Sklep Test,123\n"
        )

        class FakeResponse:
            headers = {}
            def __enter__(self):
                return self
            def __exit__(self, *args):
                return False
            def read(self):
                return csv_data.encode("utf-8")

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "products.json"
            with patch.object(awin, "OUT", output), \
                 patch.dict(os.environ, {"AWIN_FEED_URL": "https://feed.example/catalog.csv"}), \
                 patch.object(awin.urllib.request, "urlopen", return_value=FakeResponse()):
                self.assertEqual(awin.main(), 0)

            import json
            payload = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(payload["count"], 1)
            self.assertEqual(payload["items"][0]["name"], "Laptop testowy")
            self.assertEqual(payload["items"][0]["price"], 2499.99)
            self.assertEqual(payload["items"][0]["source"], "Awin")


if __name__ == "__main__":
    unittest.main()
