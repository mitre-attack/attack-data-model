from typing import Annotated
from uuid import UUID

from pydantic import Field, ValidationInfo


# Valid suffixes for ATT&CK recognition
ATTACK_ID_SUFFIXES = [
    "attack-pattern",
    "campaign",
    "course-of-action",
    "identity",
    "intrusion-set",
    "malware",
    "marking-definition",
    "note",
    "relationship",
    "tool",
    "x-mitre-asset",
    "x-mitre-collection",
    "x-mitre-data-source",
    "x-mitre-data-component",
    "x-mitre-matrix",
    "x-mitre-tactic",
]


class _StixIdentifierCls(str):
    """
    Custom field representing a STIX identifier.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value, field: ValidationInfo):
        parts = value.split("--")
        if len(parts) != 2:
            raise ValueError("ID must contain a valid ATT&CK prefix and a UUIDv4")
        prefix, uuid_str = parts
        if prefix not in ATTACK_ID_SUFFIXES:
            raise ValueError(f"Invalid ATT&CK type prefix: {prefix}")
        try:
            UUID(uuid_str, version=4)
        except ValueError:
            raise ValueError(f"Invalid UUIDv4 format: {uuid_str}")
        return value


StixIdentifier = Annotated[
    _StixIdentifierCls, Field(description="The id property universally and uniquely identifies this object.")
]

__all__ = ["StixIdentifier"]
