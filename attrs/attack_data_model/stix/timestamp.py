import re
from datetime import datetime
from attr import define, field


# Define the regex pattern for STIX timestamps
timestamp_pattern = re.compile(
    r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$"
)

def validate_stix_timestamp(instance, attribute, value):
    if not timestamp_pattern.match(value):
        raise ValueError(f"{value} is not a valid STIX timestamp")

@define
class StixTimestamp:

    value: datetime = field(
        validator=validate_stix_timestamp,
        metadata={'description': 'A valid STIX timestamp in RFC3339 format with a Z timezone'}
    )

    def __str__(self):
        return self.value.isoformat() + 'Z'


# Converter instance for structuring and unstructuring
from ..converter import attack_converter

# Register hooks for structuring and unstructuring
attack_converter.register_structure_hook(datetime, lambda d, _: datetime.strptime(d, "%Y-%m-%dT%H:%M:%S.%fZ" if '.' in d else "%Y-%m-%dT%H:%M:%SZ"))
attack_converter.register_unstructure_hook(datetime, lambda dt: dt.isoformat() + 'Z')