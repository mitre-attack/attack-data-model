### Assets

An Asset in ATT&CK is defined by an `x-mitre-asset` object. As a custom STIX type they follow only the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

Assets extend the generic SDO format with the following fields:

| Field                    | Type            | Description                                                                                                                                                                                                                                                            |
| :----------------------- | :-------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_sectors`        | string[]        | List of industry sector(s) an asset may be commonly observed in.                                                                                                                                                                                                       |
| `x_mitre_related_assets` | related_asset[] | Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition. |


## Compatibility Matrix

The following table summarizes the non-null properties present in the 'x-mitre-asset' object type across all instances, as specified in ATT&CK version 14.1:

| Property Name               | Asset Schema<sup>1</sup> | ATT&CK Core Schema<sup>>2</sup> | STIX 2.1 Schema<sup>3</sup> |
| --------------------------- | ------------------------ | ------------------------------- | --------------------------- |
| created                     | --                       | Required                        | Required                    |
| created_by_ref              | --                       | --                              | Optional                    |
| description                 | --                       | --                              | Optional                    |
| external_references         | --                       | --                              | Optional                    |
| id                          | --                       | Required                        | Required                    |
| modified                    | --                       | Required                        | Required                    |
| name                        | --                       | Required                        | --                          |
| object_marking_refs         | --                       | --                              | Optional                    |
| revoked                     | --                       | --                              | Optional                    |
| spec_version                | --                       | Required                        | Required                    |
| type                        | --                       | Required                        | Required                    |
| x_mitre_attack_spec_version | --                       | Required                        | --                          |
| x_mitre_deprecated          | --                       | Required                        | --                          |
| x_mitre_domains             | --                       | --                              | --                          |
| x_mitre_modified_by_ref     | --                       | --                              | --                          |
| x_mitre_platforms           | --                       | --                              | --                          |
| x_mitre_version             | --                       | Required                        | --                          |
| x_mitre_sectors             | Required                 | --                              | --                          |
| x_mitre_related_assets      | Required                 | --                              | --                          |

* $^1$: Refers to the specific [Assets schema](asset.json) within this repository's ATT&CK data model.
* $^2$: Indicates the foundational ATT&CK Base Object schema ([core.json](../../common/core.json)), also within this repository.
* $^3$: Directs to the STIX 2.1 base schema as maintained by OASIS, providing the overarching structure for cybersecurity threat intelligence.