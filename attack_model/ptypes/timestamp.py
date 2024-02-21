from typing import Annotated
from pydantic import StringConstraints

# Represents timestamps across the CTI specifications.
# The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.
StixTimestamp = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        to_upper=False,
        # Ensure the pattern matches the combined requirement:
        # RFC3339 with millisecond precision and 'Z' timezone.
        pattern=r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)\.\d{3,}Z$",
    )
]
