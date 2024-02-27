from typing import Annotated
from pydantic import BaseModel, Field, validator


class StixTypeModel(BaseModel):
    type: Annotated[
        str,
        Field(
            description="Represents the type of STIX Object (SDO, Relationship Object, etc).",
            pattern=r"^([a-z][a-z0-9]*)+(-[a-z0-9]+)*\-?$",
            min_length=3,
            max_length=250,
        ),
    ]

    @validator("type")
    def check_stix_type(cls, v):
        # TODO Do we want to add custom validation logic for the 'type' field?
        return v
