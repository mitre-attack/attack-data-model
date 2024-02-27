from typing import Annotated
from pydantic import Field, StringConstraints

Citation = Annotated[
    str,
    Field(
        pattern=r"^\(Citation: .+\)$",
        # pattern=r"^\\(Citation: .+\\)$",
        description="One to many citations in the form “(Citation: <citation name>)”.",
    ),
]
