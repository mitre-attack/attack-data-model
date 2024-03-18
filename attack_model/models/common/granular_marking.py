from typing import List, Optional, Annotated
from pydantic import BaseModel, Field
from pydantic.types import StringConstraints

# Define SelectorPattern using StringConstraints for the pattern validation
SelectorPattern = Annotated[str, StringConstraints(pattern=r"^([a-z0-9_-]{3,249}(\.(\[\d+\]|[a-z0-9_-]{1,250}))*|id)$")]

# Define MarkingRef using StringConstraints specifically for marking-definition pattern
MarkingRef = Annotated[str, StringConstraints(pattern=r"^marking-definition--")]


class GranularMarking(BaseModel):

    selectors: Annotated[
        List[SelectorPattern],
        Field(min_length=1, description="A list of selectors for content contained within the STIX object."),
    ]

    lang: Annotated[Optional[str], Field(description="Identifies the language of the text identified by this marking.")]

    marking_ref: Annotated[
        MarkingRef,
        Field(
            description="The marking_ref property specifies the ID of the marking-definition object that describes the marking."
        ),
    ]
