from attrs import define, field
from cattr import Converter
from typing import List, Dict, Union, Optional

from ..converter import attack_converter

from .identifier import StixIdentifier
from .type import StixType
from .spec_version import StixSpecVersion
from .timestamp import StixTimestamp
from .misc import StixCreatedByRef, StixBoolean, ExternalReference, Extension, GranularMarking


def validate_confidence(instance, attribute, value):
    if value is not None and not (0 < value < 100):
        raise ValueError(f"{value} is not a valid confidence level. Must be between 1 and 99 inclusive.")
    

@define
class StixObjectMixin:

    _converter: Converter = field(init=False, default=attack_converter, repr=False)

    id: StixIdentifier = field(
        metadata={'description': 'The unique identifier for the STIX object'}
    )
    type: StixType = field(
        metadata={'description': 'The type of the STIX object'}
    )
    spec_version: StixSpecVersion = field(
        metadata={'description': 'The specification version of the STIX object'}
    )
    created: StixTimestamp = field(
        metadata={'description': 'The created property represents the time at which the first version of this object was created'}
    )
    modified: StixTimestamp = field(
        metadata={'description': 'The modified property represents the time that this particular version of the object was modified'}
    )
    created_by_ref: Optional[StixCreatedByRef] = field(
        default=None,
        metadata={'description': 'Reference to the creator of the STIX object'}
    )
    labels: Optional[List[str]] = field(
        default=None,
        metadata={'description': 'The labels property specifies a set of terms used to describe this object'}
    )
    revoked: Optional[StixBoolean] = field(
        default=None,
        metadata={'description': 'Indicates whether the object has been revoked'}
    )
    confidence: Optional[int] = field(
        default=None,
        validator=validate_confidence,
        metadata={'description': 'Identifies the confidence that the creator has in the correctness of their data'}
    )
    lang: Optional[str] = field(
        default=None,
        metadata={'description': 'Identifies the language of the text content in this object'}
    )
    external_references: Optional[List[ExternalReference]] = field(
        default=None,
        metadata={'description': 'A list of external references which refers to non-STIX information'}
    )
    object_marking_refs: Optional[List[StixIdentifier]] = field(
        default=None,
        metadata={'description': 'The list of marking-definition objects to be applied to this object'}
    )
    granular_markings: Optional[List[GranularMarking]] = field(
        default=None,
        metadata={'description': 'The set of granular markings that apply to this object'}
    )
    extensions: Optional[Dict[str, Union[Extension, dict]]] = field(
        default=None,
        metadata={'description': 'Specifies any extensions of the object, as a dictionary'}
    )

    def to_json(self) -> Dict:
        return self._converter.unstructure(self)