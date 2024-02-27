from datetime import datetime
from typing import Annotated, List, Optional
from pydantic import BaseModel, Field, ConfigDict, validator, UUID4

from .granular_marking import GranularMarking

from .identifier import StixIdentifierModel
from .type import StixTypeModel
from .spec_version import StixSpecVersionModel
from .x_mitre_attack_spec_version import AttackSpecVersionModel
from .x_mitre_version import MitreVersionModel


class CommonProperties(
    StixIdentifierModel, StixTypeModel, StixSpecVersionModel, AttackSpecVersionModel, MitreVersionModel, BaseModel
):
    model_config = ConfigDict(
        debug=True,
        strict=True,
        extra="allow",
        # Custom JSON encoder for datetime objects to match the JavaScript toISOString() output
        json_encoders={datetime: lambda dt: dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"},
        arbitrary_types_allowed=True,
    )

    # Directly define common properties with appropriate metadata

    name: Annotated[str, Field(description="The name of the ATT&CK object.")]

    created: Annotated[
        datetime,
        Field(
            default_factory=datetime.utcnow,
            description="The created property represents the time at which the first version of this object was created.",
        ),
    ]

    modified: Annotated[
        datetime,
        Field(
            default_factory=datetime.utcnow,
            description="The modified property represents the time that this particular version of the object was modified.",
        ),
    ]

    # Custom validator to ensure datetime is in the correct format (if needed)
    # Though primarily, we rely on serialization to handle the format

    @validator("created", "modified", pre=True)
    def check_datetime_format(cls, v):
        # Verifies that all timestamp properties are valid Python datetime objects
        if isinstance(v, datetime):
            return v
        raise ValueError("Invalid datetime format")


# Define a base class for common STIX 2.1 and ATT&CK properties
class AttackBaseObject(CommonProperties, BaseModel):

    labels: Annotated[
        Optional[List[str]],
        Field(default=None, description="The labels property specifies a set of terms used to describe this object."),
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

    granular_markings: Annotated[
        Optional[List[GranularMarking]],
        Field(
            default=None,
            description="The set of granular markings that apply to this object.",
            min_items=1,
        ),
    ]
