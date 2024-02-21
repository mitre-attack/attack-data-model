from typing import Dict, Any
from pydantic import BaseModel, root_validator
import re


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


class STIXCustomProperties(BaseModel):
    __root__: Dict[str, Any]

    @root_validator(pre=True)
    def validate_custom_properties(cls, values):
        errors = []
        for name, value in values.get("__root__", {}).items():
            if not STIXCustomPropertiesValidator.validate_property_name(name):
                errors.append(f"Property name '{name}' does not match allowed patterns.")
            if not STIXCustomPropertiesValidator.validate_property_value(value):
                errors.append(f"Property '{name}' has an invalid type or empty list.")
        if errors:
            raise ValueError(" ; ".join(errors))
        return values
