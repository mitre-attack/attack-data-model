# Define the StixSpecVersion using the Literal type
from typing import Annotated, Literal
from pydantic import BaseModel, Field


class StixSpecVersionModel(BaseModel):
    spec_version: Annotated[
        Literal["2.0", "2.1"], Field(description="Specifies the STIX Specification Version.", examples=["2.0", "2.1"])
    ]
