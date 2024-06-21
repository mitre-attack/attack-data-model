from enum import Enum
from attrs import define


class StixSpecVersionEnum(str, Enum):
    V2_1 = "2.1"
    V2_0 = "2.0"


@define
class StixSpecVersion:
    value: StixSpecVersionEnum

    def __str__(self):
        return self.value.value


# Custom converter for StixSpecVersion
def stix_spec_version_to_str(spec_version: StixSpecVersion) -> str:
    return str(spec_version)


def str_to_stix_spec_version(value: str) -> StixSpecVersion:
    return StixSpecVersion(StixSpecVersionEnum(value))


# Register custom converters
from ..converter import attack_converter

attack_converter.register_unstructure_hook(StixSpecVersion, stix_spec_version_to_str)
attack_converter.register_structure_hook(
    StixSpecVersion, lambda d, _: str_to_stix_spec_version(d)
)
