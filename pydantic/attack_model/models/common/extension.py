from typing import Annotated
from pydantic import BaseModel, Field, model_validator


class ExtensionType(str):
    """
    Custom field representing the type of extension.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value):
        extension_types = ["new-sdo", "new-sco", "new-sro", "property-extension", "toplevel-property-extension"]
        if value not in extension_types:
            raise ValueError(f"Invalid extension type: {value}")
        return value


class Extension(BaseModel):
    """
    Model representing an extension.
    """

    extension_type: Annotated[ExtensionType, Field(description="The type of extension.", required=True)]
    properties: Annotated[dict, Field(description="The properties of the extension.")]

    @model_validator(mode="before")
    def check_min_properties(cls, values: dict) -> dict:
        """
        Root validator to check if the extension has at least one property.
        """
        if len(values) < 1:
            raise ValueError("Extension must have at least one property")
        return values
