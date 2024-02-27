from datetime import datetime
from typing import Annotated, List, Optional
from pydantic import Field, root_validator, validator

from ..annotations.citation import Citation
from .common.base import AttackBaseObject
from .common.identifier import validate_stix_id
from .common.external_reference import ExternalReference


class AttackCampaign(AttackBaseObject):
    # Inherited properties from AttackBaseObject and its superclasses are not redefined here.

    ############## REQUIRED PROPERTIES ##############

    created_by_ref: Annotated[
        str,
        Field(description="The ID of the Source object that describes who created this object."),
    ]

    revoked: Annotated[
        bool,
        Field(description="The revoked property indicates whether the object has been revoked."),
    ]

    external_references: Annotated[
        List[ExternalReference],
        Field(min_items=1, description="A list of external references which refers to non-STIX information."),
    ]

    object_marking_refs: Annotated[
        List[str],
        Field(description="The list of marking-definition objects to be applied to this object."),
    ]

    description: Annotated[str, Field(description="A detailed description of the campaign.")]

    aliases: Annotated[List[str], Field(description="Aliases for the campaign.")]

    first_seen: Annotated[datetime, Field(description="The date the campaign was first seen.")]

    last_seen: Annotated[datetime, Field(description="The date the campaign was last seen.")]

    x_mitre_first_seen_citation: Citation

    x_mitre_last_seen_citation: Citation

    x_mitre_modified_by_ref: Annotated[
        str, Field(description="Reference to the entity that last modified the campaign.")
    ]

    x_mitre_deprecated: Annotated[bool, Field(description="Indicates if the campaign is deprecated.")]

    x_mitre_domains: Annotated[
        List[str], Field(description="The domains that the campaign pertains to within the ATT&CK framework.")
    ]

    ############## OPTIONAL PROPERTIES ##############

    # Optional properties remain as initially defined, using Optional[] where necessary.
    x_mitre_contributors: Annotated[
        Optional[List[str]], Field(default=None, description="Contributors to the campaign.")
    ]

    ############## VALIDATION METHODS ##############

    @validator("created_by_ref")
    def validate_created_by_ref(cls, v):
        # Reuse StixIdentifierModel's validation logic
        # Validate the single UUID string
        return validate_stix_id(v)

    @validator("object_marking_refs", each_item=True)
    def validate_object_marking_refs(cls, v):
        # Reuse StixIdentifierModel's validation logic
        # Validate each UUID string in the list
        return validate_stix_id(v)

    @root_validator(pre=True)
    def validate_external_references(cls, values):
        external_references = values.get("external_references", [])
        if not external_references:
            raise ValueError("At least one external reference is required.")

        # Check the first item for external_id
        if "external_id" not in external_references[0]:
            raise ValueError("The first external reference must include an 'external_id'.")

        return values

    @validator("created", "modified", "first_seen", "last_seen", pre=True)
    def parse_datetime(cls, value):
        if isinstance(value, str):
            return datetime.fromisoformat(value.rstrip("Z"))
        return value

    @validator("x_mitre_deprecated", "revoked", pre=True)
    def parse_str_to_bool(cls, v):
        if isinstance(v, bool):
            return v  # Return the value if it's already a bool
        if isinstance(v, str):
            if v.lower() == "true":
                return True
            elif v.lower() == "false":
                return False
        raise ValueError("Input should be a valid boolean")  # Raise an error for invalid inputs
