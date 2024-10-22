# STIX Bundle Schema

## StixBundle

_Object containing the following properties:_

| Property | Description | Type |
| :------- |:----------- | :--- |
| **`id`** (\*) |        | `any` |
| **`type`** (\*)|       | `'bundle'` |
| **`spec_version`** (\*) | The version of the STIX specification used to represent this object. The value of this property MUST be 2.1 for STIX Objects defined according to this specification. If objects are found where this property is not present, the implicit value for all STIX Objects other than SCOs is 2.0. Since SCOs are now top-level objects in STIX 2.1, the default value for SCOs is 2.1. | `'2.0' \| '2.1'` |
| **`objects`** (\*) |   | [AttackObjects](#attackobjects) |

_(\*) Required._

## AttackObjects

_Array of at least 1 [Asset](/docs/sdo/asset.schema) | [Campaign](/docs/sdo/campaign.schema) | [Collection](/docs/sdo/collection.schema) | [DataComponent](/docs/sdo/data-component.schema) | [DataSource](/docs/sdo/data-source.schema) | [Group](/docs/sdo/group.schema) | [Identity](/docs/sdo/identity.schema) | [Malware](/docs/sdo/malware.schema) | [Matrix](/docs/sdo/matrix.schema) | [Mitigation](/docs/sdo/mitigation.schema) | [Tactic](/docs/sdo/tactic.schema) | [Technique](/docs/sdo/technique.schema) | [Tool](/docs/sdo/tool.schema) | [MarkingDefinition](/docs/smo/marking-definition.schema) | [Relationship](/docs/sro/relationship.schema) objects._
