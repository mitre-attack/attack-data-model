from datetime import datetime
from typing import List
import unittest

from attack_model.models.common._attack_base import AttackBaseModel


class TestAttackBaseObject(unittest.TestCase):
    def setUp(self):
        self.base_object = AttackBaseModel()

    def test_parse_datetime(self):
        # Test parsing a string to a datetime object
        value_str = "2022-01-01T12:00:00Z"
        expected_datetime = datetime(2022, 1, 1, 12, 0, 0)
        parsed_datetime = self.base_object.parse_datetime(value_str)
        self.assertEqual(parsed_datetime, expected_datetime)

        # Test parsing a datetime object
        value_datetime = datetime(2022, 1, 1, 12, 0, 0)
        parsed_datetime = self.base_object.parse_datetime(value_datetime)
        self.assertEqual(parsed_datetime, value_datetime)

    def test_parse_str_to_bool(self):
        # Test converting "true" string to True
        value_str = "true"
        expected_bool = True
        parsed_bool = self.base_object.parse_str_to_bool(value_str)
        self.assertEqual(parsed_bool, expected_bool)

        # Test converting "false" string to False
        value_str = "false"
        expected_bool = False
        parsed_bool = self.base_object.parse_str_to_bool(value_str)
        self.assertEqual(parsed_bool, expected_bool)

    def test_parse_identifier(self):
        # Test validating and transforming an identifier string
        value_str = "example_identifier"
        expected_identifier = "example_identifier"
        parsed_identifier = self.base_object.parse_identifier(value_str)
        self.assertEqual(parsed_identifier, expected_identifier)

    def test_validate_datetime(self):
        # Test validating a valid datetime object
        value_datetime = datetime(2022, 1, 1, 12, 0, 0)
        self.assertTrue(self.base_object.validate_datetime(value_datetime))

        # Test validating an invalid datetime object
        value_datetime = datetime(2022, 13, 1, 12, 0, 0)  # Invalid month (13)
        self.assertFalse(self.base_object.validate_datetime(value_datetime))

    def test_validate_identifier(self):
        # Test validating a valid identifier
        value_identifier = "example_identifier"
        self.assertTrue(self.base_object.validate_identifier(value_identifier))

        # Test validating an invalid identifier
        value_identifier = "invalid_identifier!"
        self.assertFalse(self.base_object.validate_identifier(value_identifier))

    def test_validate_external_references(self):
        # Test validating external references with required structures
        values = [
            {"source_name": "Example Source", "external_id": "123"},
            {"source_name": "Another Source", "external_id": "456"},
        ]
        self.assertTrue(self.base_object.validate_external_references(values))

        # Test validating external references with missing required fields
        values = [
            {"source_name": "Example Source", "external_id": "123"},
            {"external_id": "456"},  # Missing "source_name" field
        ]
        self.assertFalse(self.base_object.validate_external_references(values))


if __name__ == "__main__":
    unittest.main()
