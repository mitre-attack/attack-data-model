from typing import Annotated, Literal
from pydantic import Field

StixSpecVersion = Annotated[
    Literal["2.0", "2.1"],
    Field(
        default="2.1",
        description="The version of the STIX specification used to represent this object.",
        examples=["2.0", "2.1"],
    ),
]

__all__ = ["StixSpecVersion"]
