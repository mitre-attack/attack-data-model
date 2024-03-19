import json
import pytest
from pydantic import BaseModel, ValidationError
from attack_model.models.common.boolean import STIXBoolean


class TestModel(BaseModel):
    boolean_field: STIXBoolean


def test_stix_boolean():
    # Test case 1: Valid boolean values
    valid_true = TestModel(boolean_field="true")
    assert valid_true.boolean_field is True
    assert json.loads(valid_true.model_dump_json(include="boolean_field"))["boolean_field"] == "true"

    valid_false = TestModel(boolean_field="false")
    assert valid_false.boolean_field is False
    assert json.loads(valid_false.model_dump_json(include="boolean_field"))["boolean_field"] == "false"

    # Test case 2: Invalid boolean values
    invalid_values = ["True", "False", "t", "f", "1", "0", 1, 0]
    for invalid_value in invalid_values:
        with pytest.raises(ValidationError) as exc_info:
            TestModel(boolean_field=invalid_value)
        assert 'STIXBoolean must be "true" or "false"' in str(exc_info.value)

    # Test case 3: Serialization of boolean values
    true_model = TestModel(boolean_field=True)
    assert json.loads(true_model.model_dump_json(include="boolean_field"))["boolean_field"] == "true"

    false_model = TestModel(boolean_field=False)
    assert json.loads(false_model.model_dump_json(include="boolean_field"))["boolean_field"] == "false"
