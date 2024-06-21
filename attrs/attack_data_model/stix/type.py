from attrs import define
from enum import Enum


class StixTypeEnum(str, Enum):
    ATTACK_PATTERN = "attack-pattern"
    CAMPAIGN = "campaign"
    COURSE_OF_ACTION = "course-of-action"
    IDENTITY = "identity"
    INDICATOR = "indicator"
    INTRUSION_SET = "intrusion-set"
    MALWARE = "malware"
    OBSERVED_DATA = "observed-data"
    REPORT = "report"
    THREAT_ACTOR = "threat-actor"
    TOOL = "tool"
    VULNERABILITY = "vulnerability"
    MARKING_DEF = "marking-definition"


@define
class StixType:
    value: StixTypeEnum

    def __str__(self):
        return self.value.value


# Custom converter for StixType
def stix_type_to_str(stix_type: StixType) -> str:
    return str(stix_type)


def str_to_stix_type(value: str) -> StixType:
    return StixType(StixTypeEnum(value))


# Register custom converters
from ..converter import attack_converter

attack_converter.register_unstructure_hook(StixType, stix_type_to_str)
attack_converter.register_structure_hook(StixType, lambda d, _: str_to_stix_type(d))
