from pydantic import BaseModel, ValidationError
from attack_model.models.common.timestamp import STIXTimestamp

# Valid STIX timestamp string
valid_timestamp = "2023-05-19T10:30:00.123Z"

# Example 1: Creating a STIXTimestamp instance
try:
    stix_timestamp = STIXTimestamp(valid_timestamp)
    print(f"STIXTimestamp instance created: {stix_timestamp}")
    print(f"Instance type: {type(stix_timestamp)}")
except ValueError as err:
    print(f"Error creating STIXTimestamp instance: {err}")


# Example 2: Using STIXTimestamp in a Pydantic model
class Foo(BaseModel, validate_assignment = True):
    bar: STIXTimestamp


try:
    foo = Foo(bar=valid_timestamp)
    print(f"\nFoo instance: {foo}")
    print(f"bar attribute: {foo.bar}")
    print(f"Serialized output: {foo.model_dump()}")
except ValidationError as err:
    print(f"Error creating Foo instance: {err}")

# Example 3: Assigning an invalid timestamp string
try:
    foo.bar = "not-a-timestamp"
except ValidationError as err:
    print(f"\nError assigning invalid timestamp: {err}")

# Example 4: Assigning a timestamp string with incorrect format
try:
    foo.bar = "2024-01-01"
except ValidationError as err:
    print(f"\nError assigning timestamp with incorrect format: {err}")


from pydantic import BaseModel, Field
from attack_model.models.common.timestamp import STIXTimestamp

class Foo(BaseModel, validate_assignment=True):
    bar: STIXTimestamp = Field(
        ...,
        title="Timestamp",
        description="A timestamp in the STIX format (RFC3339 with 'Z' timezone)",
        example="2023-05-19T10:30:00.123Z",
    )