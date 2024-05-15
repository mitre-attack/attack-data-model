from datetime import datetime, timezone
from typing import Annotated, List, Optional
from pydantic import Field, field_validator, model_validator

from .common.base import AttackObject
from .common.identifier import STIXIdentifier
from .common.external_reference import ExternalReference
from .common.timestamp import STIXTimestamp
from .common.boolean import STIXBoolean
from ..annotations.citation import Citation


class __TEMPLATE__(AttackObject):
    """
    Template for creating ATT&CK objects. This class extends the AttackObject class
    with specific fields and validations required for ATT&CK object types.
    
    Developers should use this class as a starting point for defining specific ATT&CK
    object types and ensure all required fields and validations are properly implemented.
    """

    # Required fields
    _required = [
        # "type",
        # "id",
        # "spec_version",
        # "created",
        # "modified",
        # "created_by_ref",
        # "object_marking_refs",
        # "revoked",
        # "labels",
        # "x_mitre_attack_spec_version",
        # "name",
        # "x_mitre_version",
        # "x_mitre_platforms",
        # "x_mitre_domains",
        # "external_references",
        # "x_mitre_detection",
        # "x_mitre_is_subtechnique",
        # "description",
        # "kill_chain_phases",
        # "x_mitre_modified_by_ref",
        # "x_mitre_data_sources",
        # "x_mitre_defense_bypassed",
        # "x_mitre_contributors",
        # "x_mitre_deprecated",
        # "x_mitre_permissions_required",
        # "x_mitre_remote_support",
        # "x_mitre_system_requirements",
        # "x_mitre_impact_type",
        # "x_mitre_effective_permissions",
        # "x_mitre_network_requirements",
        # "x_mitre_tactic_type",
        # "aliases",
        # "first_seen",
        # "last_seen",
        # "x_mitre_first_seen_citation",
        # "x_mitre_last_seen_citation",
        # "x_mitre_old_attack_id",
        # "identity_class",
        # "x_mitre_aliases",
        # "is_family",
        # "x_mitre_sectors",
        # "x_mitre_related_assets",
        # "x_mitre_contents",
        # "x_mitre_collection_layers",
        # "x_mitre_data_source_ref",
        # "x_mitre_refs",
        # "x_mitre_shortname",
    ]

    ############## README delete when done ##########
    # The following properties are already defined in a parent class;
    # either in STIXObject or AttackObject. This means that you do
    # not need to define them here!

    # type                        : defined in STIXObject
    # id                          : defined in STIXObject
    # spec_version                : defined in STIXObject
    # created                     : defined in STIXObject
    # modified                    : defined in STIXObject
    # created_by_ref              : defined in STIXObject
    # object_marking_refs         : defined in STIXObject
    # revoked                     : defined in STIXObject
    # labels                      : defined in STIXObject
    # x_mitre_attack_spec_version : defined in AttackObject
    # name                        : defined in AttackObject
    # x_mitre_version             : defined in AttackObject

    ############## REQUIRED PROPERTIES ##############

    ############## OPTIONAL PROPERTIES ##############

    ########### EXCLUDED PROPERTIES #################
    # x_mitre_platforms               : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_domains                 : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # external_references             : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_detection               : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_is_subtechnique         : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # description                     : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # kill_chain_phases               : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_modified_by_ref         : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_data_sources            : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_defense_bypassed        : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_contributors            : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_deprecated              : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_permissions_required    : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_remote_support          : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_system_requirements     : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_impact_type             : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_effective_permissions   : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_network_requirements    : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_tactic_type             : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # aliases                         : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # first_seen                      : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # last_seen                       : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_first_seen_citation     : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_last_seen_citation      : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_old_attack_id           : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # identity_class                  : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_aliases                 : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # is_family                       : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_sectors                 : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_related_assets          : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_contents                : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_collection_layers       : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_data_source_ref         : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_refs                    : TODO delete this line or move it to the REQUIRED or OPTIONAL section above
    # x_mitre_shortname               : TODO delete this line or move it to the REQUIRED or OPTIONAL section above

    ############## VALIDATORS #######################

    # NOTE The model validator can hook into the entire object. `values` thus contains all properties defined on the object.
    @model_validator(mode="after")
    @classmethod
    def example_validate_propertyname(cls, values):
        property = getattr(values, "propertyname", None)
        # TODO validate `property`
        return values

    # NOTE The field validator can hook into a specific property . `value` thus contains the value asociated with x_mitre_domains
    @field_validator("x_mitre_domains")
    @classmethod
    def example_validate_x_mitre_domains(cls, value):
        allowed_domains = ["enterprise-attack", "mobile-attack", "ics-attack"]
        if not all(domain in allowed_domains for domain in value):
            raise ValueError(f"x_mitre_domains must be one of: {', '.join(allowed_domains)}")
        return value
