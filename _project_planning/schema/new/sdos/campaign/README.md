# Campaigns

A Campaign in ATT&CK is defined as a [campaign](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_pcpvfz4ik6d6) object.

Campaigns extend the generic SDO format with the following fields:

| Field                         | Type   | Description                                                                                                                                                                                                |
| :---------------------------- | :----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_first_seen_citation` | string | One to many citations for when the Campaign was first reported in the form “(Citation: \<citation name>)” where \<citation name> can be found as one of the source_name of one of the external_references. |
| `x_mitre_last_seen_citation`  | string | One to many citations for when the Campaign was last reported in the form “(Citation: \<citation name>)” where \<citation name> can be found as one of the source_name of one of the external_references.  |

## Non-null properties for object type 'campaign'

| Property Name               | Campaign Schema<sup>1</sup> | ATT&CK Core Schema<sup>2</sup> | STIX 2.1 Schema<sup>3</sup> | Required in ATT&CK |
| --------------------------- | --------------------------- | ------------------------------ | --------------------------- | ------------------ |
| aliases                     | --                          | --                             | Required                    | Yes (28/28)        |
| created                     | --                          | Required                       | Required                    | Yes (28/28)        |
| created_by_ref              | --                          | --                             | Required                    | Yes (28/28)        |
| description                 | --                          | --                             | Required                    | Yes (28/28)        |
| external_references         | --                          | --                             | Required                    | Yes (28/28)        |
| first_seen                  | --                          | --                             | Required                    | Yes (28/28)        |
| id                          | --                          | Required                       | Required                    | Yes (28/28)        |
| last_seen                   | --                          | --                             | Required                    | Yes (28/28)        |
| modified                    | --                          | Required                       | Required                    | Yes (28/28)        |
| name                        | --                          | Required                       | Required                    | Yes (28/28)        |
| object_marking_refs         | --                          | --                             | Required                    | Yes (28/28)        |
| revoked                     | --                          | --                             | Optional                    | Yes (28/28)        |
| spec_version                | --                          | Required                       | Required                    | Yes (28/28)        |
| type                        | --                          | Required                       | Required                    | Yes (28/28)        |
| x_mitre_attack_spec_version | --                          | Required                       | --                          | Yes (28/28)        |
| x_mitre_contributors        | Optional                    | --                             | --                          | Optional (6/28)    |
| x_mitre_deprecated          | --                          | Required                       | --                          | Yes (28/28)        |
| x_mitre_domains             | --                          | --                             | --                          | Yes (28/28)        |
| x_mitre_first_seen_citation | Required                    | --                             | --                          | Yes (28/28)        |
| x_mitre_last_seen_citation  | Required                    | --                             | --                          | Yes (28/28)        |
| x_mitre_modified_by_ref     | --                          | --                             | --                          | Yes (28/28)        |
| x_mitre_version             | --                          | Required                       | --                          | Yes (28/28)        |

* <sup>1</sup>: Refers to the specific [Campaign schema](campaign.json) within this repository's ATT&CK data model.
* <sup>2</sup>: Indicates the foundational ATT&CK Base Object schema ([core.json](../../common/core.json)), also within this repository.
* <sup>3</sup>: Directs to the STIX 2.1 base schema as maintained by OASIS, providing the overarching structure for cybersecurity threat intelligence.

