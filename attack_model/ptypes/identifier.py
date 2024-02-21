from typing import Annotated
from pydantic import StringConstraints


"""_summary_
Represents identifiers across the CTI specifications.
The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.
"""
StixIdentifier = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        to_upper=False,
        pattern=r"^[a-z][a-z0-9-]+[a-z0-9]--[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$",
    ),
    "Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.",
]
