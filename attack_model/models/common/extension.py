from enum import Enum
from typing import Dict, List, Union
from pydantic import BaseModel, Field, constr, root_validator

from .custom_properties import STIXCustomPropertiesValidator


# Define the enumeration for extension types
class ExtensionTypeEnum(str, Enum):
    new_sdo = "new-sdo"
    new_sco = "new-sco"
    new_sro = "new-sro"
    property_extension = "property-extension"
    toplevel_property_extension = "toplevel-property-extension"


# Define a base model for an individual extension
class StixExtension(BaseModel):
    extension_type: ExtensionTypeEnum = Field(..., description="The type of extension.")

    # Placeholder for dynamic custom properties
    __root__: Dict[str, Union[str, int, bool, float, Dict, List]] = {}

    @root_validator(pre=True)
    def validate_custom_properties(cls, values):
        # This method now also includes validation for predefined properties if necessary
        custom_properties = values.get("__root__", {})
        errors = []
        for name, value in custom_properties.items():
            if not STIXCustomPropertiesValidator.validate_property_name(name):
                errors.append(f"Invalid property name '{name}'. Must match defined patterns.")
            if not STIXCustomPropertiesValidator.validate_property_value(value):
                errors.append(f"Invalid value for property '{name}'. Must be non-empty and match allowed types.")

        if errors:
            raise ValueError(" ; ".join(errors))

        return values


# Alias for extension-definition pattern
ExtensionDefinitionID = constr(
    regex=r"^extension-definition--[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
)
