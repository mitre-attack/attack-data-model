from datetime import datetime, timezone
from typing import Annotated, List, Optional
from pydantic import Field, field_validator, model_validator

from .common.base import AttackObject
from .common.identifier import STIXIdentifier
from .common.external_reference import ExternalReference
from .common.timestamp import STIXTimestamp
from .common.boolean import STIXBoolean
from ..annotations.citation import Citation


class AttackCampaign(AttackObject):

    # Required fields
    _required = [
        "created_by_ref",
        "revoked",
        "external_references",
        "object_marking_refs",
        "description",
        "aliases",
        "first_seen",
        "last_seen",
        "x_mitre_first_seen_citation",
        "x_mitre_last_seen_citation",
        "x_mitre_modified_by_ref",
        "x_mitre_deprecated",
        "x_mitre_domains",
    ]

    ############## REQUIRED PROPERTIES ##############

    created_by_ref: Annotated[
        STIXIdentifier,
        Field(description="The ID of the Source object that describes who created this object."),
    ]

    revoked: Annotated[
        STIXBoolean,
        Field(description="The revoked property indicates whether the object has been revoked."),
    ]

    external_references: Annotated[
        List[ExternalReference],
        Field(min_length=1, description="A list of external references which refers to non-STIX information."),
    ]

    object_marking_refs: Annotated[
        List[STIXIdentifier],
        Field(description="The list of marking-definition objects to be applied to this object."),
    ]

    description: Annotated[str, Field(description="A detailed description of the campaign.")]

    aliases: Annotated[List[str], Field(description="Aliases for the campaign.")]

    first_seen: Annotated[STIXTimestamp, Field(description="The date the campaign was first seen.")]

    last_seen: Annotated[STIXTimestamp, Field(description="The date the campaign was last seen.")]

    x_mitre_first_seen_citation: Citation

    x_mitre_last_seen_citation: Citation

    x_mitre_modified_by_ref: Annotated[
        STIXIdentifier, Field(description="Reference to the entity that last modified the campaign.")
    ]

    x_mitre_deprecated: Annotated[STIXBoolean, Field(description="Indicates if the campaign is deprecated.")]

    x_mitre_domains: Annotated[
        List[str], Field(description="The domains that the campaign pertains to within the ATT&CK framework.")
    ]

    ############## OPTIONAL PROPERTIES ##############

    x_mitre_contributors: Annotated[
        Optional[List[str]], Field(default=None, description="Contributors to the campaign.")
    ]

    ############## VALIDATORS ##############

    # TODO Consider using `FutureDate` instead. See: https://docs.pydantic.dev/2.0/usage/types/datetime/
    @field_validator("first_seen", "last_seen", mode="after")
    @classmethod
    def validate_first_last_seen(cls, value):
        # first_seen_dt = STIXTimestamp.stix_timestamp_str_to_datetime(value)
        # if first_seen_dt > datetime.now(timezone.utc):
        if value > datetime.now(timezone.utc):
            raise ValueError("first_seen and last_seen cannot be in the future.")
        return value

    @field_validator("x_mitre_domains")
    @classmethod
    def validate_x_mitre_domains(cls, value):
        allowed_domains = ["enterprise-attack", "mobile-attack", "ics-attack"]
        if not all(domain in allowed_domains for domain in value):
            raise ValueError(f"x_mitre_domains must be one of: {', '.join(allowed_domains)}")
        return value

    @model_validator(mode="after")
    @classmethod
    def validate_first_before_last(cls, values):
        fs = getattr(values, "first_seen", None)
        ls = getattr(values, "last_seen", None)

        if fs is None or ls is None:
            raise ValueError("first_seen and last_seen are required.")

        if fs > ls:
            raise ValueError("first_seen cannot be after last_seen.")

        return values
