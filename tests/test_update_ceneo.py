import importlib.util
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "update_ceneo.py"
SPEC = importlib.util.spec_from_file_location("update_ceneo", MODULE_PATH)
ceneo = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ceneo)


class CeneoImporterTests(unittest.TestCase):
    def test_reads_odata_v2_results(self):
        self.assertEqual(ceneo.rows_from({"d": {"results": [{"Id": 1}]}}), [{"Id": 1}])

    def test_reads_odata_v4_value(self):
        self.assertEqual(ceneo.rows_from({"value": [{"Id": 2}]}), [{"Id": 2}])

    def test_parses_polish_decimal(self):
        self.assertEqual(ceneo.parse_price("1 299,99"), 1299.99)

    def test_rejects_invalid_price(self):
        self.assertIsNone(ceneo.parse_price("brak ceny"))
        self.assertIsNone(ceneo.parse_price("0"))

    def test_adds_partner_id_as_fragment(self):
        result = ceneo.affiliate_url("http://www.ceneo.pl/12345", "987")
        self.assertEqual(result, "https://www.ceneo.pl/12345#pid=987")

    def test_rejects_external_product_url(self):
        self.assertEqual(ceneo.affiliate_url("https://example.com/product", "987"), "")

    def test_image_url_must_be_https_and_ceneo_hosted(self):
        self.assertEqual(ceneo.safe_ceneo_image_url("https://img.ceneo.pl/photo.jpg"), "https://img.ceneo.pl/photo.jpg")
        self.assertEqual(ceneo.safe_ceneo_image_url("http://img.ceneo.pl/photo.jpg"), "")
        self.assertEqual(ceneo.safe_ceneo_image_url("https://ceneo.pl.evil.test/photo.jpg"), "")
        self.assertEqual(ceneo.safe_ceneo_image_url("https://img.ceneo.pl@evil.test/photo.jpg"), "")


if __name__ == "__main__":
    unittest.main()
