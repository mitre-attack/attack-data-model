import re
from enum import Enum
from typing import Dict, List, Union, Any
from pydantic import RootModel, Field, constr, root_validator


class STIXCustomPropertiesValidator:
    @staticmethod
    def validate_property_name(name: str) -> bool:
        # Validate property name against the specified patterns
        if (
            re.match(r"^[a-z][a-z0-9_]{0,245}_bin$", name)
            or re.match(r"^[a-z][a-z0-9_]{0,245}_hex$", name)
            or re.match(r"^([a-z][a-z0-9_]{2,249})|id$", name)
        ):
            return True
        return False

    @staticmethod
    def validate_property_value(value: Any) -> bool:
        # Check if the value type is one of the allowed types
        if isinstance(value, (list, str, int, bool, float, dict)) and (not isinstance(value, list) or len(value) > 0):
            return True
        return False


class STIXCustomProperties(RootModel[Dict[str, Any]]):

    root: Dict[str, Any]

    # NOTE the approach below is the old Pydantix 1.x approach (before RootModel was introduced)

    # __root__: Dict[str, Any]

    # @root_validator(pre=True)
    # def validate_custom_properties(cls, values):
    #     errors = []
    #     for name, value in values.get("__root__", {}).items():
    #         if not STIXCustomPropertiesValidator.validate_property_name(name):
    #             errors.append(f"Property name '{name}' does not match allowed patterns.")
    #         if not STIXCustomPropertiesValidator.validate_property_value(value):
    #             errors.append(f"Property '{name}' has an invalid type or empty list.")
    #     if errors:
    #         raise ValueError(" ; ".join(errors))
    #     return values


# Define the enumeration for extension types
class ExtensionTypeEnum(str, Enum):
    new_sdo = "new-sdo"
    new_sco = "new-sco"
    new_sro = "new-sro"
    property_extension = "property-extension"
    toplevel_property_extension = "toplevel-property-extension"


# Define a base model for an individual extension
class StixExtension(RootModel[Dict[str, Union[str, int, bool, float, Dict, List]]]):

    # NOTE this will not work in a RootModel class. root is the only property allowed.
    extension_type: ExtensionTypeEnum = Field(..., description="The type of extension.")

    # Placeholder for dynamic custom properties
    root: Dict[str, Union[str, int, bool, float, Dict, List]]

    # NOTE the approach below is the old Pydantix 1.x approach (before RootModel was introduced)
    # __root__: Dict[str, Union[str, int, bool, float, Dict, List]] = {}

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
