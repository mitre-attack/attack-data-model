from typing import Annotated
from pydantic import Field, StringConstraints


# Define a custom type for the STIX type that matches the specified pattern and length constraints
StixType = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        to_upper=False,
        pattern=r"^([a-z][a-z0-9]*)+(-[a-z0-9]+)*\-?$",
        min_length=3,
        max_length=250,
    ),
]
