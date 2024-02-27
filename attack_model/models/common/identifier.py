from pydantic import BaseModel, validator
from uuid import UUID


# Define a list of valid suffixes for ATT&CK recognition
VALID_SUFFIXES = [
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


def validate_stix_id(v: str):
    parts = v.split("--")
    if len(parts) != 2:
        raise ValueError("ID must contain a valid ATT&CK prefix and a UUIDv4")
    prefix, uuid_str = parts
    if prefix not in VALID_SUFFIXES:
        raise ValueError(f"Invalid ATT&CK type prefix: {prefix}")
    try:
        UUID(uuid_str, version=4)
    except ValueError:
        raise ValueError(f"Invalid UUIDv4 format: {uuid_str}")
    return v


class StixIdentifierModel(BaseModel):
    id: str  # Keep it as a string to validate the full format including the prefix

    @validator("id")
    def validate_id(cls, v):
        return validate_stix_id(v)
