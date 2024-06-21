import re
from attrs import define, field
from uuid import uuid4

from .type import StixTypeEnum


# Define the regex pattern for STIX identifiers
stix_pattern = re.compile(
    r"^[a-z][a-z0-9-]+[a-z0-9]--[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
)


def validate_stix_identifier(instance, attribute, value):
    if not stix_pattern.match(value):
        raise ValueError(f"{value} is not a valid STIX identifier")

    _prefix, _uuid = value.split("--", 1)

    if _prefix not in StixTypeEnum._value2member_map_:
        raise ValueError(f"{_prefix} is not a supported STIX identifier prefix")

    try:
        # uuid.UUID(_uuid, version=4)
        uuid4(_uuid)
    except ValueError:
        raise ValueError(f"{_uuid} is not a valid UUID")


@define
class StixIdentifier:
    value: str = field(
        validator=validate_stix_identifier,
        metadata={"description": "A valid STIX identifier"},
    )
    prefix: str = field(
        init=False, metadata={"description": "The prefix of the STIX identifier"}
    )
    uuid: str = field(
        init=False, metadata={"description": "The UUID of the STIX identifier"}
    )

    def __attrs_post_init__(self):
        self.prefix, self.uuid = self.value.split("--", 1)

    def __str__(self):
        return self.value


# Custom converter for StixIdentifier
def stix_identifier_to_str(stix_identifier: StixIdentifier) -> str:
    return stix_identifier.value


def str_to_stix_identifier(value: str) -> StixIdentifier:
    return StixIdentifier(value)


# Rregister custom converters
from ..converter import attack_converter

attack_converter.register_unstructure_hook(StixIdentifier, stix_identifier_to_str)
attack_converter.register_structure_hook(
    StixIdentifier, lambda d, _: str_to_stix_identifier(d)
)
