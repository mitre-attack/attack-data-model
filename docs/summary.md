# Required vs Optional

This table presents a detailed analysis of properties across various STIX Domain Object (SDO) types found within the MITRE ATT&CK dataset. 

For each property, the table indicates whether it is "Required" or "Optional" for each object type, based on its presence across all instances of that type within the dataset. 

* A property is marked as "Required" if it is **present in every instance** of a specific object type, signifying its essential role for that type of object. 
* Conversely, a property is marked as "Optional" if it **appears in some but not all instances**, indicating that while it may provide valuable information, it is not mandatory for the object's definition or understanding.

| Property                      | attack-pattern       | campaign         | course-of-action   | identity       | intrusion-set      | malware            | tool             | x-mitre-asset    | x-mitre-collection | x-mitre-data-source | x-mitre-data-component | x-mitre-matrix | x-mitre-tactic   |
| :---------------------------- | :------------------- | :--------------- | :----------------- | :------------- | :----------------- | :----------------- | :--------------- | :--------------- | :----------------- | :------------------ | :--------------------- | :------------- | :--------------- |
| type                          | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| id                            | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| spec_version                  | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| x_mitre_attack_spec_version   | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| name                          | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| x_mitre_version               | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| description                   | Optional (1029/1043) | Required (28/28) | Required (384/384) |                | Optional (179/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| created_by_ref                | Optional (1027/1043) | Required (28/28) | Required (384/384) |                | Optional (179/182) | Optional (701/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| created                       | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| modified                      | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| object_marking_refs           | Optional (1028/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Optional (179/182) | Required (702/702) | Required (88/88) | Required (14/14) | Required (3/3)     | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| x_mitre_platforms             | Optional (1029/1043) |                  |                    |                |                    | Optional (652/702) | Optional (69/88) | Required (14/14) |                    | Optional (59/61)    |                        |                |                  |
| x_mitre_domains               | Required (1043/1043) | Required (28/28) | Required (384/384) | Required (3/3) | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) |                    | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| external_references           | Required (1043/1043) | Required (28/28) | Required (384/384) |                | Required (182/182) | Required (702/702) | Required (88/88) | Required (14/14) |                    | Required (61/61)    |                        | Required (4/4) | Required (40/40) |
| kill_chain_phases             | Optional (1029/1043) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_detection             | Optional (1003/1043) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_is_subtechnique       | Required (1043/1043) |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_modified_by_ref       | Optional (1028/1043) | Required (28/28) | Required (384/384) |                | Optional (179/182) | Required (702/702) | Required (88/88) | Required (14/14) |                    | Required (61/61)    | Required (160/160)     | Required (4/4) | Required (40/40) |
| x_mitre_data_sources          | Optional (655/1043)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_defense_bypassed      | Optional (145/1043)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_contributors          | Optional (466/1043)  | Optional (6/28)  |                    |                | Optional (93/182)  | Optional (146/702) | Optional (24/88) |                  |                    | Optional (46/61)    |                        |                |                  |
| x_mitre_deprecated            | Optional (645/1043)  | Required (28/28) | Optional (305/384) |                | Optional (111/182) | Optional (282/702) | Optional (56/88) | Required (14/14) |                    | Optional (25/61)    | Optional (36/160)      | Optional (2/4) | Optional (9/40)  |
| x_mitre_permissions_required  | Optional (287/1043)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_remote_support        | Optional (36/1043)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| revoked                       | Optional (766/1043)  | Required (28/28) | Optional (63/384)  |                | Optional (114/182) | Optional (274/702) | Optional (55/88) | Required (14/14) |                    | Optional (25/61)    | Optional (34/160)      | Optional (2/4) | Optional (9/40)  |
| x_mitre_system_requirements   | Optional (61/1043)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_impact_type           | Optional (32/1043)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_effective_permissions | Optional (37/1043)   |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_network_requirements  | Optional (4/1043)    |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_tactic_type           | Optional (163/1043)  |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| aliases                       |                      | Required (28/28) |                    |                | Optional (179/182) |                    |                  |                  |                    |                     |                        |                |                  |
| first_seen                    |                      | Required (28/28) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| last_seen                     |                      | Required (28/28) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_first_seen_citation   |                      | Required (28/28) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_last_seen_citation    |                      | Required (28/28) |                    |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| labels                        |                      |                  | Optional (46/384)  |                |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_old_attack_id         |                      |                  | Optional (1/384)   |                |                    | Optional (1/702)   |                  |                  |                    |                     |                        |                |                  |
| identity_class                |                      |                  |                    | Required (3/3) |                    |                    |                  |                  |                    |                     |                        |                |                  |
| x_mitre_aliases               |                      |                  |                    |                |                    | Optional (661/702) | Optional (77/88) |                  |                    |                     |                        |                |                  |
| is_family                     |                      |                  |                    |                |                    | Required (702/702) |                  |                  |                    |                     |                        |                |                  |
| x_mitre_sectors               |                      |                  |                    |                |                    |                    |                  | Optional (12/14) |                    |                     |                        |                |                  |
| x_mitre_related_assets        |                      |                  |                    |                |                    |                    |                  | Optional (10/14) |                    |                     |                        |                |                  |
| x_mitre_contents              |                      |                  |                    |                |                    |                    |                  |                  | Required (3/3)     |                     |                        |                |                  |
| x_mitre_collection_layers     |                      |                  |                    |                |                    |                    |                  |                  |                    | Required (61/61)    |                        |                |                  |
| x_mitre_data_source_ref       |                      |                  |                    |                |                    |                    |                  |                  |                    |                     | Required (160/160)     |                |                  |
| tactic_refs                   |                      |                  |                    |                |                    |                    |                  |                  |                    |                     |                        | Required (4/4) |                  |
| x_mitre_shortname             |                      |                  |                    |                |                    |                    |                  |                  |                    |                     |                        |                | Required (40/40) |



## Per Object Type

JSON objects for each object type, including each property with the following criteria:

* Mark as "Required" if property present on every instance, e.g., (40/40)
* Mark as "Optional" if property `gt` 0 `lt` max, e.g. (20/40)
* Exclude properties with a count of zero, e.g., (0/40)

### attack-pattern
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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

```
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

