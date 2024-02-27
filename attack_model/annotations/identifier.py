from typing import Annotated
from pydantic import AfterValidator, Field, Strict, StringConstraints, UUID4
from uuid import UUID

"""_summary_
Represents identifiers across the CTI specifications.
The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.
"""
StixIdentifierAnnotation = (
    UUID4
    | Annotated[
        str,
        AfterValidator(lambda x: UUID(x, version=4)),
        "Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.",
    ]
)

# EXAMPLE:
# my_uuid: UUID4 | Annotated[str, AfterValidator(lambda x: uuid.UUID(x, version=4))]
# my_uuid: Annotated[UUID4, Strict(False)]

"""_summary_
Represents identifiers across the CTI specifications.
The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.
"""
StixIdenfifierLax = Annotated[
    UUID4,
    Strict(False),
    "Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.",
]
