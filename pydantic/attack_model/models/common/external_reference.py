from typing import Annotated, Optional
from pydantic import BaseModel, Field, HttpUrl, model_validator


class ExternalReference(BaseModel):
    """
    Model representing an external reference.
    """

    source_name: Annotated[str, Field(description="The source within which the external-reference is defined")]

    url: Annotated[Optional[HttpUrl], Field(default=None, description="A URL reference to an external resource.")]

    external_id: Annotated[
        Optional[str], Field(default=None, description="An identifier for the external reference content.")
    ]

    description: Annotated[Optional[str], Field(default=None, description="A human-readable description")]

    @model_validator(mode="after")
    def validate_mitre_attack_reference(self):
        if self.source_name == "mitre-attack":
            if not self.url:
                raise ValueError("URL is required when source_name is 'mitre-attack'")
            if not self.external_id:
                raise ValueError("external_id is required when source_name is 'mitre-attack'")
            if not str(self.url).startswith("https://attack.mitre.org/"):
                raise ValueError("URL must start with 'https://attack.mitre.org/' when source_name is 'mitre-attack'")
            if not str(self.external_id).startswith(("T", "S", "G", "M", "C")):
                raise ValueError("external_id must be a valid ATT&CK ID when source_name is 'mitre-attack'")
        return self
