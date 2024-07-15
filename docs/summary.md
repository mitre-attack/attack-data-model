# Required vs Optional

This table presents a detailed analysis of properties across various STIX Domain Object (SDO) types found within the MITRE ATT&CK dataset. 

For each property, the table indicates whether it is "Required" or "Optional" for each object type, based on its presence across all instances of that type within the dataset. 

Note that this is reflective of the STIX 2.1 specification and [corresponding dataset](https://github.com/mitre-attack/attack-stix-data). The [STIX 2.0 dataset](https://github.com/mitre/cti) differs in subtle ways.

* A property is marked as "Required" if it is **present in every instance** of a specific object type, signifying its essential role for that type of object. 
* Conversely, a property is marked as "Optional" if it **appears in some but not all instances**, indicating that while it may provide valuable information, it is not mandatory for the object's definition or understanding.

| Property                      | attack-pattern       | campaign         | course-of-action   | identity       | intrusion-set      | malware            | tool             | x-mitre-asset    | x-mitre-collection | x-mitre-data-source | x-mitre-data-component | x-mitre-matrix | x-mitre-tactic   |
| :---------------------------- | :------------------- | :--------------- | :----------------- | :------------- | :----------------- | :----------------- | :--------------- | :--------------- | :----------------- | :------------------ | :--------------------- | :------------- | :--------------- |
| type                          | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| id                            | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| spec_version                  | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| x_mitre_attack_spec_version   | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| name                          | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| x_mitre_version               | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| description                   | Optional (1048/1062) | Required (37/37) | Required (385/385) |                | Optional (192/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| created_by_ref                | Optional (1046/1062) | Required (37/37) | Required (385/385) |                | Optional (192/195) | Optional (735/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| created                       | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| modified                      | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| object_marking_refs           | Optional (1047/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Optional (192/195) | Required (736/736) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| x_mitre_platforms             | Optional (1047/1062) |                  |                    |                |                    | Optional (687/736) | Optional (69/88) | Required (14/14) |                    | Optional (59/61)    |                        |                |                  |
| x_mitre_domains               | Required (1062/1062) | Required (37/37) | Required (385/385) | Required (3/3) | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) |                    | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| external_references           | Required (1062/1062) | Required (37/37) | Required (385/385) |                | Required (195/195) | Required (736/736) | Required (88/88) | Required (14/14) |                    | Required (61/61)    |                        | Required (4/4) | Required (40/40) |
| kill_chain_phases             | Optional (1048/1062) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_detection             | Optional (1023/1062) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_is_subtechnique       | Required (1062/1062) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_modified_by_ref       | Optional (1047/1062) | Required (37/37) | Required (385/385) |                | Optional (192/195) | Required (736/736) | Required (88/88) | Required (14/14) |                    | Required (61/61)    | Required (161/161)     | Required (4/4) | Required (40/40) |
| x_mitre_data_sources          | Optional (668/1062)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_defense_bypassed      | Optional (145/1062)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_contributors          | Optional (480/1062)  | Optional (8/37)  |                    |                | Optional (98/195)  | Optional (150/736) | Optional (24/88) |                  |                    | Optional (46/61)    |                        |                |                  |
| x_mitre_deprecated            | Optional (702/1062)  | Required (37/37) | Optional (308/385) |                | Optional (144/195) | Optional (390/736) | Optional (57/88) | Required (14/14) |                    | Optional (25/61)    | Optional (37/161)      | Optional (2/4) | Optional (9/40)  |
| x_mitre_permissions_required  | Optional (273/1062)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_remote_support        | Optional (38/1062)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| revoked                       | Optional (823/1062)  | Required (37/37) | Optional (66/385)  |                | Optional (147/195) | Optional (382/736) | Optional (56/88) | Required (14/14) |                    | Optional (25/61)    | Optional (35/161)      | Optional (2/4) | Optional (9/40)  |
| x_mitre_system_requirements   | Optional (56/1062)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_impact_type           | Optional (32/1062)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_effective_permissions | Optional (37/1062)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_network_requirements  | Optional (4/1062)    |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_tactic_type           | Optional (164/1062)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| aliases                       |                      | Required (37/37) |                    |                | Optional (192/195) |                    |                  |                  |                    |                     |                        |                |                  |
| first_seen                    |                      | Required (37/37) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| last_seen                     |                      | Required (37/37) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_first_seen_citation   |                      | Required (37/37) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_last_seen_citation    |                      | Required (37/37) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| labels                        |                      |                  | Optional (46/385)  |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_old_attack_id         |                      |                  | Optional (1/385)   |                |                    | Optional (1/736)   |                  |                  |                    |                     |                        |                |                  |
| identity_class                |                      |                  |                    | Required (3/3) |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_aliases               |                      |                  |                    |                |                    | Optional (698/736) | Optional (77/88) |                  |                    |                     |                        |                |                  |
| is_family                     |                      |                  |                    |                |                    | Required (736/736) |                  |                  |                    |                     |                        |                |                  |
| x_mitre_sectors               |                      |                  |                    |                |                    |                    |                  | Optional (12/14) |                    |                     |                        |                |                  |
| x_mitre_related_assets        |                      |                  |                    |                |                    |                    |                  | Optional (10/14) |                    |                     |                        |                |                  |
| x_mitre_contents              |                      |                  |                    |                |                    |                    |                  |                  | Required (3/3)     |                     |                        |                |                  |
| x_mitre_collection_layers     |                      |                  |                    |                |                    |                    |                  |                  |                    | Required (61/61)    |                        |                |                  |
| x_mitre_data_source_ref       |                      |                  |                    |                |                    |                    |                  |                  |                    |                     | Required (161/161)     |                |                  |
| tactic_refs                   |                      |                  |                    |                |                    |                    |                  |                  |                    |                     |                        | Required (4/4) |                  |
| x_mitre_shortname             |                      |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                | Required (40/40) |



## Per Object Type

JSON objects for each object type, including each property with the following criteria:

* Mark as "Required" if property present on every instance
* Mark as "Optional" if property is present on some but not all instances

### attack-pattern
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Optional",
  "created_by_ref": "Optional",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Optional",
  "x_mitre_platforms": "Optional",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "kill_chain_phases": "Optional",
  "x_mitre_detection": "Optional",
  "x_mitre_is_subtechnique": "Required",
  "x_mitre_modified_by_ref": "Optional",
  "x_mitre_data_sources": "Optional",
  "x_mitre_defense_bypassed": "Optional",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Optional",
  "x_mitre_permissions_required": "Optional",
  "x_mitre_remote_support": "Optional",
  "revoked": "Optional",
  "x_mitre_system_requirements": "Optional",
  "x_mitre_impact_type": "Optional",
  "x_mitre_effective_permissions": "Optional",
  "x_mitre_network_requirements": "Optional",
  "x_mitre_tactic_type": "Optional"
}
```

### campaign
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Required",
  "revoked": "Required",
  "aliases": "Required",
  "first_seen": "Required",
  "last_seen": "Required",
  "x_mitre_first_seen_citation": "Required",
  "x_mitre_last_seen_citation": "Required"
}
```

### course-of-action
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "labels": "Optional",
  "x_mitre_old_attack_id": "Optional"
}
```

### identity
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "identity_class": "Required"
}
```

### intrusion-set
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Optional",
  "created_by_ref": "Optional",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Optional",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Optional",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "aliases": "Optional"
}
```

### malware
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Optional",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_platforms": "Optional",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "x_mitre_aliases": "Optional",
  "is_family": "Required",
  "x_mitre_old_attack_id": "Optional"
}
```

### tool
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_platforms": "Optional",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "x_mitre_aliases": "Optional"
}
```

### x-mitre-asset
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_platforms": "Required",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_deprecated": "Required",
  "revoked": "Required",
  "x_mitre_sectors": "Optional",
  "x_mitre_related_assets": "Optional"
}
```

### x-mitre-collection
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_contents": "Required"
}
```

### x-mitre-data-source
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_platforms": "Optional",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_contributors": "Optional",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "x_mitre_collection_layers": "Required"
}
```

### x-mitre-data-component
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "x_mitre_data_source_ref": "Required"
}
```

### x-mitre-matrix
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "tactic_refs": "Required"
}
```

### x-mitre-tactic
```json
{
  "type": "Required",
  "id": "Required",
  "spec_version": "Required",
  "x_mitre_attack_spec_version": "Required",
  "name": "Required",
  "x_mitre_version": "Required",
  "description": "Required",
  "created_by_ref": "Required",
  "created": "Required",
  "modified": "Required",
  "object_marking_refs": "Required",
  "x_mitre_domains": "Required",
  "external_references": "Required",
  "x_mitre_modified_by_ref": "Required",
  "x_mitre_deprecated": "Optional",
  "revoked": "Optional",
  "x_mitre_shortname": "Required"
}
```