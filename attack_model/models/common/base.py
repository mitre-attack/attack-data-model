from typing import Annotated, Dict, List, Optional, get_type_hints
from pydantic import BaseModel, Field, ConfigDict, root_validator

from ...ptypes import StixIdentifier, StixTimestamp, StixType, StixSpecVersion

from .external_reference import ExternalReference
from .granular_marking import GranularMarking
# from .extension import StixExtension # TODO extensions are not working yet, need to figure out how to use RootModel


# Define a base class for common STIX 2.1 and ATT&CK properties
class STIXObject(BaseModel):

    model_config = ConfigDict(strict=True, extra="allow")

    id: StixIdentifier = Field(..., description="The id property universally and uniquely identifies this object.")

    type: StixType = Field(
        ...,
        description="The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).",
    )

    created: StixTimestamp = Field(
        ...,
        description="The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond.",
    )

    modified: StixTimestamp = Field(
        ...,
        description="The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond.",
    )

    spec_version: StixSpecVersion = Field(
        "2.1", description="The version of the STIX specification used to represent this object."
    )

    created_by_ref: StixIdentifier = Field(
        ..., description="The ID of the Source object that describes who created this object."
    )

    revoked: Optional[bool] = Field(
        ..., description="The revoked property indicates whether the object has been revoked."
    )

    labels: Optional[List[str]] = Field(
        ..., description="The labels property specifies a set of terms used to describe this object."
    )

    confidence: Annotated[
        Optional[int],
        Field(
            ge=0, le=100, description="Identifies the confidence that the creator has in the correctness of their data."
        ),
    ] = None

    lang: Annotated[
        Optional[str], Field(..., description="Identifies the lanuage of the text content in this object.")
    ] = None

    external_references: List[ExternalReference] = Field(
        ..., min_items=1, description="A list of external references which refers to non-STIX information."
    )

    object_marking_refs: List[StixIdentifier] = Field(
        ..., description="The list of marking-definition objects to be applied to this object."
    )

    granular_markings: List[GranularMarking] = Field(
        default_factory=list,  # Use default_factory for mutable defaults
        description="The set of granular markings that apply to this object.",
        min_items=1,
    )

    # TODO extensions are not working yet, need to figure out how to use RootModel
    # extensions: Dict[str, StixExtension] = Field(
    #     default_factory=dict, description="Specifies any extensions of the object, as a dictionary."
    # )

    # TODO This needs further discussion. I think the STIXCustomPropertiesValidator would break/invalidate our objects.
    # Predefined STIX properties...
    # @root_validator(pre=True)
    # def validate_custom_properties(cls, values):
    #     errors = []
    #     predefined_fields = set(get_type_hints(cls).keys())
    #     for field_name, field_value in values.items():
    #         if field_name not in predefined_fields:
    #             if not STIXCustomPropertiesValidator.validate_property_name(field_name):
    #                 errors.append(f"Invalid custom property name '{field_name}'.")
    #             if not STIXCustomPropertiesValidator.validate_property_value(field_value):
    #                 errors.append(f"Invalid value for custom property '{field_name}'.")
    #     if errors:
    #         raise ValueError(" ; ".join(errors))
    #     return values
