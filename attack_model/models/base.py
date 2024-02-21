from datetime import datetime
from typing import Annotated, List, Optional
from pydantic import BaseModel, Field, ConfigDict

# from types.type import StixType
from ..ptypes import StixIdentifier, StixTimestamp, StixType, StixSpecVersion
from .external_reference import ExternalReference


# Define a base class for common STIX 2.1 and ATT&CK properties
class STIXObject(BaseModel):

    model_config = ConfigDict(strict=True)

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
        "2.2", description="The version of the STIX specification used to represent this object."
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

    # object_marking_refs: Optional[List[str]]
    # granular_markings: Optional[List[dict]]
    # extensions: Optional[dict]


#### TEST
import json

schema = STIXObject.schema()

schema_json = json.dumps(schema, indent=4)

print(schema_json)
