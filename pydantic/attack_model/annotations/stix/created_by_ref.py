from typing import Annotated, Optional

from pydantic import Field

from ..identifier import StixIdentifier


StixCreatedByRef = Annotated[
    Optional[StixIdentifier],
    Field(default=None, description="The ID of the Source object that describes who created this object."),
]

__all__ = [StixCreatedByRef]
