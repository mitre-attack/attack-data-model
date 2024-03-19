from pydantic import ValidationInfo
from typing import Annotated
from pydantic.functional_serializers import PlainSerializer


class _STIXBoolean(int):
    """
    Custom field type representing a boolean value stored as a lowercase string in ATT&CK/STIX objects.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value, field: ValidationInfo = None):
        if isinstance(value, bool):
            return int(value)

        if value not in ["true", "false"]:
            raise ValueError('STIXBoolean must be "true" or "false"')
        return value == "true"

    @classmethod
    def bool_to_stix_boolean_str(cls, value: bool) -> str:
        return str(value).lower()


STIXBoolean = Annotated[
    _STIXBoolean,
    PlainSerializer(lambda x: _STIXBoolean.bool_to_stix_boolean_str(bool(x)), return_type=str),
]
