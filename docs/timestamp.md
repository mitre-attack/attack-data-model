# Handling Timestamps in STIX 2.1 Objects

The STIX 2.1 specification defines certain fields that require timestamps, such as the `created` field in STIX objects. These timestamp fields must adhere to specific formatting and precision requirements as defined by the STIX 2.1 `core.json` schema and further refined by the `timestamp.json` schema.

## Core Schema Definition

The `core.json` schema specifies the `created` property as follows:

```json
"created": {
  "description": "The created property represents the time at which the first version of this object was created. The timestamp value MUST be precise to the nearest millisecond.",
  "allOf": [
    {
      "$ref": "../common/timestamp.json"
    },
    {
      "title": "timestamp_millis",
      "pattern": "T\\d{2}:\\d{2}:\\d{2}\\.\\d{3,}Z$"
    }
  ]
}
```

## Timestamp Schema Definition

The referenced `timestamp.json` schema provides a base definition for timestamps across the CTI specifications:

```json
{
  "$id": "http://raw.githubusercontent.com/oasis-open/cti-stix2-json-schemas/stix2.1/schemas/common/timestamp.json",
  "$schema": "http://json-schema.org/draft/2020-12/schema#",
  "title": "timestamp",
  "description": "Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.",
  "type": "string",
  "pattern": "^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\\.[0-9]+)?Z$"
}
```

## Combined Constraints

The `created` field in STIX objects must satisfy both the general format of an RFC3339 timestamp (as defined in `timestamp.json`) and the additional requirement for millisecond precision (as specified in `core.json` under `allOf`). This means a valid timestamp must:
- Be in RFC3339 format.
- Include a required timezone specification of 'Z'.
- Be precise to the nearest millisecond.

### Implementation Example in Python

To implement these constraints in Python, particularly when using Pydantic for data validation, the `StixTimestamp` type is defined:

```python
from typing import Annotated
from pydantic import BaseModel, StringConstraints

StixTimestamp = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        to_upper=False,
        pattern=r"^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)\.\d{3,}Z$",
    ),
]
```

This definition ensures that any `StixTimestamp` string not only follows the RFC3339 format but also includes millisecond precision, adhering to the combined requirements dictated by the STIX 2.1 schemas.

## Conclusion

When modeling STIX 2.1 objects in software, it is crucial to enforce both the format and precision requirements for timestamp fields to ensure compliance with the specification. This document outlines how to combine the constraints from both the `core.json` and `timestamp.json` schemas to validate timestamp fields accurately.