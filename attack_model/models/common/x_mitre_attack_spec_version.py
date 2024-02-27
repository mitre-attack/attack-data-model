from pydantic import BaseModel, Field, ValidationError, constr
from typing import Annotated


class AttackSpecVersionModel(BaseModel):
    x_mitre_attack_spec_version: Annotated[
        str,
        Field(
            default="2.0.0",
            pattern=r"^\d+\.\d+\.\d+$",
            description="The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.",
        ),
    ]
