import json
import pytest
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel, ValidationError
from attack_model.models.common.timestamp import STIXTimestamp


class TestModel(BaseModel):
    timestamp: STIXTimestamp


def test_stix_timestamp():
    # Test case 1: Valid timestamp
    valid_timestamp = "2023-03-17T13:37:42.596Z"
    model = TestModel(timestamp=valid_timestamp)
    assert isinstance(model.timestamp, datetime)

    # Verify that the timestamp fields are correctly serialized back to their string format
    assert json.loads(model.model_dump_json(include="timestamp"))["timestamp"] == "2023-03-17T13:37:42.596Z"

    # Test case 2: Invalid timestamp format
    invalid_timestamp = "2023-03-17"
    with pytest.raises(ValidationError) as exc_info:
        TestModel(timestamp=invalid_timestamp)
    assert "Invalid timestamp format" in str(exc_info.value)

    # Test case 3: Timestamp in the future
    future_timestamp = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat(timespec="milliseconds") + "Z"
    with pytest.raises(ValidationError) as exc_info:
        TestModel(timestamp=future_timestamp)
    assert "Invalid timestamp format" in str(exc_info.value)
