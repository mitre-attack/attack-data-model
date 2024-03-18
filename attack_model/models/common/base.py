from typing import Annotated
from pydantic import Field, validator

from .core import STIXObject


class AttackObject(STIXObject):
    """
    Model representing an ATT&CK object, which extends the base STIXObject with ATT&CK-specific fields.
    """

    name: Annotated[str, Field(description="The name of the ATT&CK object.")]
    x_mitre_attack_spec_version: Annotated[
        str,
        Field(
            default="2.0.0",
            pattern=r"^\d+\.\d+\.\d+$",
            description="The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.",
        ),
    ]
    x_mitre_version: Annotated[
        str,
        Field(
            default="2.1",
            pattern=r"^\d+\.\d+$",
            description="Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
        ),
    ]

    @validator("external_references")
    def validate_mitre_attack_reference(cls, v):
        if not any(ref.source_name == "mitre-attack" for ref in v):
            raise ValueError("At least one external reference with source_name 'mitre-attack' is required")
        return v
