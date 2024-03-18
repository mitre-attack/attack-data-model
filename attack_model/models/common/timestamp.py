import re
from typing import Annotated
from datetime import datetime
from pydantic import ValidationInfo, PlainSerializer


class _Timestamp(datetime):
    """
    Custom field representing a timestamp following the RFC3339 format with a required timezone specification of 'Z'.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value, field: ValidationInfo = None):
        if isinstance(value, datetime):
            return value

        pattern = r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$"
        if not re.match(pattern, value):
            raise ValueError(f"Invalid timestamp format: {value}")

        return cls.stix_timestamp_str_to_datetime(value)

    @classmethod
    def stix_timestamp_str_to_datetime(cls, value: str) -> datetime:
        """
        Explanation of datetime_format:
            %Y for the four-digit year,
            %m for the two-digit month,
            %d for the two-digit day,
            %H for the two-digit hour (24-hour clock),
            %M for the two-digit minute,
            %S for the two-digit second,
            .%f for the fractional second (microseconds),
            %z for the timezone offset in the form of +HHMM or -HHMM.
        """
        datetime_format = "%Y-%m-%dT%H:%M:%S.%f%z"

        # To handle the 'Z' for UTC directly with strptime, we may need to replace 'Z' with '+0000' since strptime does not recognize 'Z' directly as UTC.
        # Valid STIX timestamp strings always end with 'Z'.
        datetime_str = value.replace("Z", "+0000")

        return datetime.strptime(datetime_str, datetime_format)

    @classmethod
    def datetime_to_stix_timestamp_str(cls, value: datetime) -> str:
        return value.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


STIXTimestamp = Annotated[
    _Timestamp,
    # PlainSerializer determines the shape of the output data when the model is dumped/exported to JSON
    PlainSerializer(lambda x: _Timestamp.datetime_to_stix_timestamp_str(x), return_type=str),
]


# TESTING:
#
# >>> d1 = "2023-09-27T20:12:54.984Z"
# >>> datetime_format = "%Y-%m-%dT%H:%M:%S.%f%z"
# >>> datetime_str = d1.replace('Z', '+0000')
# >>>
# >>> from datetime import datetime
# >>>
# >>> d1_datetime = datetime.strptime(datetime_str, datetime_format)
# >>> d1_datetime
# datetime.datetime(2023, 9, 27, 20, 12, 54, 984000, tzinfo=datetime.timezone.utc)
# >>>
# >>>
# >>> d1_back_to_str = d1_datetime.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
# >>> d1_back_to_str
# '2023-09-27T20:12:54.984Z'
# >>> d1_back_to_str == d1
# True
