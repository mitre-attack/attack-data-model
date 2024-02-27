from typing import Annotated, Optional
from pydantic import BaseModel, Field, HttpUrl, root_validator


class ExternalReference(BaseModel):

    source_name: Annotated[str, Field(description="The source within which the external-reference is defined")]

    description: Annotated[Optional[str], Field(default=None, description="A human readable description")]

    external_id: Annotated[
        Optional[str], Field(default=None, description="An identifier for the external reference content.")
    ]

    url: Annotated[Optional[HttpUrl], Field(default=None, description="A URL reference to an external resource.")]

    @root_validator(pre=True)
    def check_external_reference(cls, values):
        source_name = values.get("source_name")
        external_id = values.get("external_id")
        description = values.get("description")
        url = values.get("url")

        # Implementing the conditional logic based on source_name and external_id patterns
        if source_name in ["mitre-attack"]:
            if not external_id:
                raise ValueError(f"{source_name.upper()} references must include an 'external_id'.")
        else:
            # For other sources, at least one of external_id, description, or url must be provided
            if not any([external_id, description, url]):
                raise ValueError("Non-CVE/CAPEC references must include an 'external_id', 'description', or 'url'.")

        # Additional pattern checks can be implemented as needed
        return values
