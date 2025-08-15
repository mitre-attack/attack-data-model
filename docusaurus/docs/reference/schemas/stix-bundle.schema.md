# STIX Bundle Schema

## StixBundle

_Object containing the following properties:_

| Property | Description | Type |
| :------- |:----------- | :--- |
| **`id`** (\*) |        | `any` |
| **`type`** (\*)|       | `'bundle'` |
| **`objects`** (\*) |   | [AttackObjects](#attackobjects) |

_(\*) Required._

## AttackObjects

_Array of at least 1 [Asset](../reference/schemas/sdo/asset.schema) | [Campaign](../reference/schemas/sdo/campaign.schema) | [Collection](../reference/schemas/sdo/collection.schema) | [DataComponent](../reference/schemas/sdo/data-component.schema) | [DataSource](../reference/schemas/sdo/data-source.schema) | [Group](../reference/schemas/sdo/group.schema) | [Identity](../reference/schemas/sdo/identity.schema) | [Malware](../reference/schemas/sdo/malware.schema) | [Matrix](../reference/schemas/sdo/matrix.schema) | [Mitigation](../reference/schemas/sdo/mitigation.schema) | [Tactic](../reference/schemas/sdo/tactic.schema) | [Technique](../reference/schemas/sdo/technique.schema) | [Tool](../reference/schemas/sdo/tool.schema) | [MarkingDefinition](../reference/schemas/smo/marking-definition.schema) | [Relationship](../reference/schemas/sro/relationship.schema) objects._
