from attrs import define
from typing import Optional, List

from .identifier import StixIdentifier


@define
class ExternalReference:
    source_name: str
    description: Optional[str] = None
    url: Optional[str] = None
    external_id: Optional[str] = None


# Define StixCreatedByRef as a wrapper around StixIdentifier
class StixCreatedByRef(StixIdentifier):
    pass


@define
class StixBoolean:
    value: bool


@define
class GranularMarking:
    marking_ref: StixIdentifier
    selectors: List[str]


@define
class Extension:
    pass  # Define fields as necessary