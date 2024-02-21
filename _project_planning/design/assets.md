# Assets

An Asset is a new ATT&CK object type. It is primarily intended to support the ICS domain at this time.

An Asset is a custom STIX object, with a `type` of "x-mitre-asset".

## Properties

### Standard STIX Properties

| name                | type                 |
|---------------------|----------------------|
| id                  | string               |
| type                | string               |
| spec_version        | string               |
| created             | datetime             |
| modified            | datetime             |
| created_by_ref      | string               |
| revoked             | boolean              |
| external_references | [external_ref]       |
| object_marking_refs | [object_marking_ref] |
| name                | string               |
| description         | string               |

### Extended ATT&CK Properties

| name                        | type             |
|-----------------------------|------------------|
| x_mitre_sectors             | string[]           |
| x_mitre_related_assets      | [related_assets] |
| x_mitre_platforms           | [string]         |
| x_mitre_deprecated          | boolean          |
| x_mitre_version             | string           |
| x_mitre_attack_spec_version | string           |
| x_mitre_contributors        | [string]         |

### Extended Subtypes

The related_assets subtype is an object with the properties:

| name                    | type     |
|-------------------------|----------|
| `name`                  | string   |
| `related_asset_sectors` | string[] |
| `description`           | string   |

### Data Design Notes

- ATT&CK ID will be in the format Axxxx
- `x_mitre_sector` will only allow a value from a predefined list (part of the allowed values configuration in Workbench)
- The related_assets subtype fills a similar role to aliases (in groups and campaigns), but can’t use the same aliases/external_references design because of the need to store sector and description properties. The description may include text as well as citations.
- `x_mitre_platforms` would change if platforms become full objects

## Relationships

The system will support relationships between Techniques (attack-pattern) and Assets (x-mitre-asset).
- The `relationship_type` is "targets"
- The `source_ref` is the technique
- The `target_ref` is the asset

Therefore, the relationship describes a technique which _targets_ the asset.
