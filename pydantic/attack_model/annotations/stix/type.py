from enum import Enum
import re

from typing import Annotated
from typing_extensions import TypeAliasType

from pydantic import Field, ValidationInfo, AfterValidator
from pydantic_core import core_schema
from pydantic.json_schema import JsonSchemaValue


class _StixTypeCls(str, Enum):
    """
    Enumeration of supported STIX types in ATT&CK.
    """
    ATTACK_PATTERN = "attack-pattern"
    MALWARE = "malware"
    COURSE_OF_ACTION = "course-of-action"
    INTRUSION_SET = "intrusion-set"
    X_MITRE_DATA_COMPONENT = "x-mitre-data-component"
    TOOL = "tool"
    X_MITRE_DATA_SOURCE = "x-mitre-data-source"
    X_MITRE_TACTIC = "x-mitre-tactic"
    CAMPAIGN = "campaign"
    X_MITRE_ASSET = "x-mitre-asset"
    X_MITRE_MATRIX = "x-mitre-matrix"
    X_MITRE_COLLECTION = "x-mitre-collection"
    IDENTITY = "identity"

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: str, field: ValidationInfo = None) -> "_StixTypeAnnotation":
        """
        Validate the input value against the enumeration and additional constraints.

        Args:
            value (str): The value to validate.
            field (ValidationInfo, optional): Additional field validation information. Defaults to None.

        Returns:
            STIXType: The validated STIX type.

        Raises:
            ValueError: If the input value is not a valid STIX type or fails the additional constraints.
        """
        try:
            stix_type = cls(value)
        except ValueError:
            raise ValueError(f"Invalid STIX type: {value}")

        if len(value) < 3:
            raise ValueError(f"STIX type must have a minimum length of 3: {value}")

        if len(value) > 250:
            raise ValueError(f"STIX type must have a maximum length of 250: {value}")

        pattern = r"^([a-z][a-z0-9]*)+(-[a-z0-9]+)*\-?$"
        if not re.match(pattern, value):
            raise ValueError(f"STIX type must match the pattern '{pattern}': {value}")

        return stix_type

    @classmethod
    def __get_pydantic_json_schema__(cls, schema: core_schema.CoreSchema, handler) -> JsonSchemaValue:
        json_schema = handler(schema)
        json_schema["enum"] = [e.value for e in cls]
        return json_schema

    def __set__(self, instance, value):
        self.validate(value)
        instance.__dict__[self.name] = value


_StixTypeAnnotation = TypeAliasType(
    "STIXType", Annotated[str, "some description", AfterValidator(lambda x: x in _StixTypeCls.__members__.values())]
)

StixType = Annotated[
    _StixTypeAnnotation,
    Field(
        description="The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).",
    ),
]

__all__ = ["StixType"]
