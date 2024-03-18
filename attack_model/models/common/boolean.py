from pydantic import ValidationInfo


class STIXBoolean(str):
    """
    Custom field type representing a boolean value stored as a lowercase string in ATT&CK/STIX objects.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value, field: ValidationInfo):
        if value not in ["true", "false"]:
            raise ValueError('STIXBoolean must be "true" or "false"')
        return value == "true"
