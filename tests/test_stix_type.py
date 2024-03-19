import pytest
from pydantic import BaseModel, ValidationError
from attack_model.models.common.type import STIXType


class TestType(BaseModel):
    type_field: STIXType


def test_stix_type():
    # Test case 1: Valid STIX type
    m1 = TestType(type_field="attack-pattern")
    assert m1.model_dump_json() == '{"type_field":"attack-pattern"}'

    # Test case 2: Attempting to assign an invalid STIX type
    with pytest.raises(ValidationError) as exc_info:
        m1.type_field = "not-a-type"
    assert "Invalid STIX type" in str(exc_info.value)

    # Test case 3: Ensure the original value remains unchanged
    assert m1.model_dump_json() == '{"type_field":"attack-pattern"}'

    # Test case 4: Attempt to create a model instance with an invalid STIX type
    with pytest.raises(ValidationError) as exc_info:
        TestType(type_field="not-a-type")
    assert "Invalid STIX type" in str(exc_info.value)

    # Test case 5: Test additional constraints - minimum length
    with pytest.raises(ValidationError) as exc_info:
        TestType(type_field="ab")
    assert "STIX type must have a minimum length of 3" in str(exc_info.value)

    # Test case 6: Test additional constraints - maximum length
    long_type = "a" * 251
    with pytest.raises(ValidationError) as exc_info:
        TestType(type_field=long_type)
    assert "STIX type must have a maximum length of 250" in str(exc_info.value)

    # Test case 7: Test additional constraints - pattern matching
    with pytest.raises(ValidationError) as exc_info:
        TestType(type_field="invalid_type")
    assert "STIX type must match the pattern" in str(exc_info.value)
