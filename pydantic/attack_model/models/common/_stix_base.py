from pydantic import BaseModel, Field, field_validator, model_validator
from typing import List, Literal, Optional, Union, Dict, Type, Annotated
import re

from ...annotations.identifier import StixIdentifier
from ...annotations.stix.timestamp import STIXTimestamp
from ...annotations.stix.type import StixType
from ...annotations.stix.spec_version import StixSpecVersion
from ...annotations.stix.boolean import STIXBoolean
from ...annotations.stix.created_by_ref import StixCreatedByRef

from .external_reference import ExternalReference
from .granular_marking import GranularMarking
from .extension import Extension


class StixBaseModel(BaseModel):
    """
    Model representing a STIX object, which is the base class for all STIX Domain Objects and STIX Relationship Objects.
    """

    id: StixIdentifier
    type: StixType
    spec_version: StixSpecVersion
    created_by_ref: StixCreatedByRef

    labels: Annotated[
        Optional[List[str]],
        Field(default=None, description="The labels property specifies a set of terms used to describe this object."),
    ]
    created: Annotated[
        STIXTimestamp,
        Field(
            description="The created property represents the time at which the first version of this object was created."
        ),
    ]
    modified: Annotated[
        STIXTimestamp,
        Field(
            description="The modified property represents the time that this particular version of the object was modified."
        ),
    ]
    revoked: Annotated[
        Optional[STIXBoolean], Field(default=None, description="Indicates whether the object has been revoked.")
    ]
    confidence: Annotated[
        Optional[int],
        Field(
            default=None,
            ge=0,
            le=100,
            description="Identifies the confidence that the creator has in the correctness of their data.",
        ),
    ]
    lang: Annotated[
        Optional[str], Field(default=None, description="Identifies the language of the text content in this object.")
    ]
    external_references: Annotated[
        Optional[List[ExternalReference]],
        Field(default=None, description="A list of external references which refers to non-STIX information."),
    ]
    object_marking_refs: Annotated[
        Optional[List[StixIdentifier]],
        Field(default=None, description="The list of marking-definition objects to be applied to this object."),
    ]
    granular_markings: Annotated[
        Optional[List[GranularMarking]],
        Field(default=None, description="The set of granular markings that apply to this object.", min_length=1),
    ]
    extensions: Annotated[
        Optional[Dict[str, Union[Extension, dict]]],
        Field(default=None, description="Specifies any extensions of the object, as a dictionary."),
    ]

    # Required fields
    _required = ["type", "spec_version", "id", "created", "modified"]

    @field_validator("type")
    def validate_type(cls, value):
        return StixType.validate(value)

    @field_validator("type")
    def type_not_allowed(cls: Type["StixBaseModel"], value: str) -> str:
        """
        Validator to ensure the 'action' type is not allowed.

        Args:
            cls (Type['STIXObject']): The class being validated.
            value (str): The value of the 'type' field.

        Returns:
            str: The validated value of the 'type' field.

        Raises:
            ValueError: If the 'type' value is 'action'.
        """
        if value == "action":
            raise ValueError('The type "action" is not allowed')
        return value

    @model_validator(mode="after")
    def check_extensions(self) -> dict:
        """
        Validator to check the structure of the 'extensions' field.

        Args:
            cls (Type['STIXObject']): The class being validated.
            values (dict): The input values being validated.

        Returns:
            dict: The validated values.

        Raises:
            ValueError: If an extension key is invalid.
        """
        if self.extensions:
            for ext_key, ext_value in self.extensions.items():
                if (
                    ext_key
                    == "extension-definition--[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}"
                ):
                    Extension(**ext_value)
                else:
                    ext_pattern = r"^([a-z][a-z0-9]*)+(-[a-z0-9]+)*\-ext$"
                    if not re.match(ext_pattern, ext_key):
                        raise ValueError(f"Invalid extension key: {ext_key}")
        return self

    @model_validator(mode="after")
    def check_prohibited_fields(self) -> dict:
        """
        Validator to check for prohibited fields.

        Args:
            cls (Type['STIXObject']): The class being validated.
            values (dict): The input values being validated.

        Returns:
            dict: The validated values.

        Raises:
            ValueError: If a prohibited field is present.
        """
        prohibited_fields = ["severity", "action", "username", "phone_numbers"]
        for field in prohibited_fields:
            if field in self:
                raise ValueError(f'The field "{field}" is not allowed')
        return self
