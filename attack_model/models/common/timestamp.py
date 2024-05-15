import re
from typing import Annotated, Any
from datetime import datetime
from pydantic import GetJsonSchemaHandler, ValidationInfo, PlainSerializer
from typing import Annotated, Any, Callable
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import CoreSchema, core_schema

class _STIXTimestamp(datetime):
    """
    Custom field representing a timestamp following the RFC3339 format with a required timezone specification of 'Z'.

    This class inherits from the built-in datetime class and provides additional functionality for handling STIX timestamps.
    """

    def __new__(cls, value: Any):
        """
        Create a new instance of the _Timestamp class.

        Args:
            value (Any): The value to create the _Timestamp instance from. Can be a datetime object or a string.

        Returns:
            _Timestamp: A new instance of the _Timestamp class.

        Raises:
            ValueError: If the input value is a string and does not match the expected STIX timestamp format.
            TypeError: If the input value is not a datetime object or a string.
        """
        if isinstance(value, datetime):
            # If the input value is a datetime object, create a new _Timestamp instance using its attributes
            return super().__new__(
                cls,
                value.year,
                value.month,
                value.day,
                value.hour,
                value.minute,
                value.second,
                value.microsecond,
                value.tzinfo,
            )

        if isinstance(value, str):
            # If the input value is a string, validate it against the STIX timestamp format
            pattern = r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$"
            if not re.match(pattern, value):
                raise ValueError(f"Invalid timestamp format: {value}")

            # Convert the valid STIX timestamp string to a datetime object
            return cls.stix_timestamp_str_to_datetime(value)

        raise TypeError(f"Invalid type for STIXTimestamp: {type(value)}")

    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        _source_type: Any,
        _handler: Callable[[Any], core_schema.CoreSchema],
    ) -> core_schema.CoreSchema:

        def validate_from_str(input_value: str) -> datetime:
            return _STIXTimestamp.stix_timestamp_str_to_datetime(input_value)

        return core_schema.union_schema(
            [
                # check if it's an instance first before doing any further work
                core_schema.is_instance_schema(datetime),
                core_schema.no_info_plain_validator_function(validate_from_str),
            ],
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def __get_pydantic_json_schema__(cls, _core_schema: CoreSchema, handler: GetJsonSchemaHandler) -> JsonSchemaValue:
        return handler(core_schema.str_schema())

    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        _source_type: Any,
        _handler: Callable[[Any], core_schema.CoreSchema],
    ) -> core_schema.CoreSchema:

        def validate_from_str(input_value: str) -> datetime:
            return _STIXTimestamp.stix_timestamp_str_to_datetime(input_value)

        return core_schema.union_schema(
            [
                # check if it's an instance first before doing any further work
                core_schema.is_instance_schema(datetime),
                core_schema.no_info_plain_validator_function(validate_from_str),
            ],
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def __json_encoder__(self):
        return self.datetime_to_stix_timestamp_str(self)

    # @classmethod
    # def __get_validators__(cls):
    #     """
    #     Get the validator functions for the _STIXTimestamp class.

    #     This method is used by Pydantic to retrieve the validator functions for the _STIXTimestamp class.

    #     Yields:
    #         function: The validator function for the _STIXTimestamp class.
    #     """
    #     yield cls.validate

    @classmethod
    def validate(cls, value, field: ValidationInfo = None):
        """
        Validate the input value against the STIX timestamp format.

        Args:
            value (Any): The value to validate.
            field (ValidationInfo, optional): Additional validation information provided by Pydantic. Defaults to None.

        Returns:
            datetime: The validated value as a datetime object.

        Raises:
            ValueError: If the input value does not match the expected STIX timestamp format.
        """
        if isinstance(value, datetime):
            # If the input value is already a datetime object, return it as is
            return value

        # Validate the input value against the STIX timestamp format using a regular expression
        pattern = r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$"
        if not re.match(pattern, value):
            raise ValueError(f"Invalid timestamp format: {value}")

        # Convert the valid STIX timestamp string to a datetime object
        return cls.stix_timestamp_str_to_datetime(value)

    @classmethod
    def stix_timestamp_str_to_datetime(cls, value: str) -> datetime:
        """
        Convert a STIX timestamp string to a datetime object.

        Args:
            value (str): The STIX timestamp string to convert.

        Returns:
            datetime: The converted datetime object.
        """
        # Explanation of datetime_format:
        #   %Y for the four-digit year,
        #   %m for the two-digit month,
        #   %d for the two-digit day,
        #   %H for the two-digit hour (24-hour clock),
        #   %M for the two-digit minute,
        #   %S for the two-digit second,
        #   .%f for the fractional second (microseconds),
        #   %z for the timezone offset in the form of +HHMM or -HHMM.
        datetime_format = "%Y-%m-%dT%H:%M:%S.%f%z"

        # To handle the 'Z' for UTC directly with strptime, we may need to replace 'Z' with '+0000'
        # since strptime does not recognize 'Z' directly as UTC.
        # Valid STIX timestamp strings always end with 'Z'.
        datetime_str = value.replace("Z", "+0000")

        # Convert the STIX timestamp string to a datetime object using the specified format
        return datetime.strptime(datetime_str, datetime_format)

    @classmethod
    def datetime_to_stix_timestamp_str(cls, value: datetime) -> str:
        """
        Convert a datetime object to a STIX timestamp string.

        Args:
            value (datetime): The datetime object to convert.

        Returns:
            str: The converted STIX timestamp string.
        """
        # Convert the datetime object to a STIX timestamp string using the specified format
        return value.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


STIXTimestamp = Annotated[
    _STIXTimestamp,
    "Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.",
    # PlainSerializer determines the shape of the output data when the model is dumped/exported to JSON
    PlainSerializer(lambda x: _STIXTimestamp.datetime_to_stix_timestamp_str(x), return_type=str),
]
