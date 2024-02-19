# Campaigns

A Campaign in ATT&CK is defined as a [campaign](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_pcpvfz4ik6d6) object.

Campaigns extend the generic SDO format with the following fields:

| Field                         | Type   | Description                                                                                                                                                                                                |
| :---------------------------- | :----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_first_seen_citation` | string | One to many citations for when the Campaign was first reported in the form “(Citation: \<citation name>)” where \<citation name> can be found as one of the source_name of one of the external_references. |
| `x_mitre_last_seen_citation`  | string | One to many citations for when the Campaign was last reported in the form “(Citation: \<citation name>)” where \<citation name> can be found as one of the source_name of one of the external_references.  |

## Non-null properties for object type 'campaign'

| Property Name               | STIX 2.1 Defined | STIX 2.1 Requirement Status | ATT&CK Defined | ATT&CK Requirement Status |
| --------------------------- | ---------------- | --------------------------- | -------------- | ------------------------- |
| aliases                     | Yes              | Optional                    | No             | N/A                       |
| created                     | Yes              | Required                    | No             | N/A                       |
| created_by_ref              | Yes              | Optional                    | No             | N/A                       |
| description                 | Yes              | Optional                    | No             | N/A                       |
| external_references         | Yes              | Optional                    | No             | N/A                       |
| first_seen                  | Yes              | Optional                    | No             | N/A                       |
| id                          | Yes              | Required                    | No             | N/A                       |
| last_seen                   | Yes              | Optional                    | No             | N/A                       |
| modified                    | Yes              | Required                    | No             | N/A                       |
| name                        | Yes              | Required                    | No             | N/A                       |
| object_marking_refs         | Yes              | Optional                    | No             | N/A                       |
| revoked                     | Yes              | Optional                    | No             | N/A                       |
| spec_version                | Yes              | Required                    | No             | N/A                       |
| type                        | Yes              | Required                    | No             | N/A                       |
| x_mitre_attack_spec_version | No               | N/A                         | Yes            | Required                  |
| x_mitre_deprecated          | No               | N/A                         | Yes            | Optional                  |
| x_mitre_domains             | No               | N/A                         | Yes            | Optional                  |
| x_mitre_first_seen_citation | No               | N/A                         | Yes            | Required                  |
| x_mitre_last_seen_citation  | No               | N/A                         | Yes            | Required                  |
| x_mitre_modified_by_ref     | No               | N/A                         | Yes            | Optional                  |
| x_mitre_version             | No               | N/A                         | Yes            | Required                  |
