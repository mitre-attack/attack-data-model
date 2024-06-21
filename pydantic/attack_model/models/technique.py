from datetime import datetime, timezone
from typing import Annotated, List, Optional
from pydantic import Field, field_validator, model_validator

from .common._attack_base import AttackBaseModel, AttackDomains
from ..annotations.identifier import _StixIdentifierCls
from .common.external_reference import ExternalReference
from .common.timestamp import STIXTimestamp
from ..annotations.stix_boolean import STIXBoolean
from .common.kill_chain import KillChainPhase
from ..annotations.citation import Citation


class AttackTechnique(AttackBaseModel):

    # Required fields
    # Commented out means it is Optional
    _required = [
        "type",
        "id",
        "spec_version",
        "x_mitre_attack_spec_version",
        "name",
        "x_mitre_version",
        # "description",
        # "created_by_ref",
        "created",
        "modified",
        # "object_marking_refs",
        "x_mitre_platforms",
        "x_mitre_domains",
        "external_references",
        # "kill_chain_phases",
        "x_mitre_detection",
        "x_mitre_is_subtechnique",
        # "x_mitre_modified_by_ref",
        # "x_mitre_data_sources",
        # "x_mitre_defense_bypassed",
        # "x_mitre_contributors",
        # "x_mitre_deprecated",
        # "x_mitre_permissions_required",
        # "x_mitre_remote_support",
        # "revoked",
        # "x_mitre_system_requirements",
        # "x_mitre_impact_type",
        # "x_mitre_effective_permissions",
        # "x_mitre_network_requirements",
        # "x_mitre_tactic_type",
    ]

    ############## REQUIRED PROPERTIES ##############
    # "type"                        : defined in STIXObject
    # "id"                          : defined in STIXObject
    # "spec_version"                : defined in STIXObject
    # "x_mitre_attack_spec_version" : defined in AttackObject
    # "name"                        : defined in AttackObject
    # "x_mitre_version"             : defined in AttackObject
    # "created"                     : defined in STIXObject
    # "modified"                    : defined in STIXObject
    # external_references           : defined in STIXObject

    x_mitre_platforms: Annotated[
        List[str],
        Field(default=None, description="Strategies for identifying if a technique has been used by an adversary."),
    ]

    x_mitre_detection: Annotated[
        List[str], Field(description="Strategies for identifying if a technique has been used by an adversary.")
    ]
    x_mitre_is_subtechnique: Annotated[
        bool, Field(default=False, description="If true, this 'attack-pattern' is a sub-technique.")
    ]

    ############## OPTIONAL PROPERTIES ##############

    description: Annotated[
        str,
        Field(default=None, description="A description to contextualize the purpose and nature of the ATT&CK object."),
    ]

    kill_chain_phases: Annotated[
        KillChainPhase, Field(default=None, description="The kill-chain-phase represents a phase in a kill chain.")
    ]

    x_mitre_modified_by_ref: Annotated[
        str,
        Field(
            default=None,
            description="The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.",
        ),
    ]

    x_mitre_data_sources: Annotated[
        List[str],
        Field(
            default=None,
            description="Sources of information that may be used to identify the action or result of the action being performed.",
        ),
    ]

    x_mitre_defense_bypassed: Annotated[
        List[str],
        Field(
            default=None, description="List of defensive tools methodologies, or processes the technique can bypass."
        ),
    ]

    # x_mitre_contributors            : TODO define
    # x_mitre_deprecated              : TODO define
    # x_mitre_permissions_required    : TODO define
    # x_mitre_remote_support          : TODO define
    # x_mitre_system_requirements     : TODO define
    # x_mitre_impact_type             : TODO define
    # x_mitre_effective_permissions   : TODO define
    # x_mitre_network_requirements    : TODO define
    # x_mitre_tactic_type             : TODO define

    ############## VALIDATORS #######################

    @model_validator()
    @classmethod
    def validate_x_mitre_data_sources(cls, values):
        x_mitre_data_sources = getattr(values, "x_mitre_data_sources", None)
        x_mitre_domains = getattr(values, "x_mitre_domains", None)
        if x_mitre_data_sources is not None and AttackDomains.MOBILE in x_mitre_domains:
            raise ValueError("Only applies to Enterprise and ICS domains")
