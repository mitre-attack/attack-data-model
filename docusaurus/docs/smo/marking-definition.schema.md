# Marking definition Schema

## BaseMarkingDefinition

_Object containing the following properties:_

| Property                   | Type                                  |
| :------------------------- | :------------------------------------ |
| **`type`** (\*)            | `'marking-definition'`                |
| **`spec_version`** (\*)    | `'2.1'`                               |
| **`id`** (\*)              | `string` (_uuid_)                     |
| **`created`** (\*)         | `string` (_ISO 8601_)                 |
| **`definition_type`** (\*) | `'tlp'`                               |
| **`name`** (\*)            | `string`                              |
| **`definition`** (\*)      | [TlpMarkingObject](#tlpmarkingobject) |

_(\*) Required._

## MarkingDefinition

_Object containing the following properties:_

| Property                               | Description                                                                                                                                                                                                                                                                                                                                             | Type                                                                                         |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------- |
| **`id`** (\*)                          |                                                                                                                                                                                                                                                                                                                                                         | `any`                                                                                        |
| **`type`** (\*)                        |                                                                                                                                                                                                                                                                                                                                                         | `'marking-definition'`                                                                       |
| `name`                                 | The name of the object.                                                                                                                                                                                                                                                                                                                                 | `string` (_min length: 1_)                                                                   |
| **`spec_version`** (\*)                | The version of the STIX specification used to represent this object.                                                                                                                                                                                                                                                                                    | `'2.0' \| '2.1'`                                                                             |
| **`created`** (\*)                     | The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond.                                                                                                                                                                                          | `any`                                                                                        |
| **`created_by_ref`** (\*)              | The ID of the Source object that describes who created this object.                                                                                                                                                                                                                                                                                     | `any`                                                                                        |
| **`definition_type`** (\*)             | The definition_type property identifies the type of Marking Definition.                                                                                                                                                                                                                                                                                 | `'statement' \| 'tlp'`                                                                       |
| **`definition`** (\*)                  | The definition property contains the marking object itself (e.g., the TLP marking as defined in section 7.2.1.4, the Statement marking as defined in section 7.2.1.3). Any new marking definitions SHOULD be specified using the extension facility described in section 7.3. If the extensions property is not present, this property MUST be present. | [TlpMarkingObject](#tlpmarkingobject) _or_ [StatementMarkingObject](#statementmarkingobject) |
| **`x_mitre_domains`** (\*)             | The technology domains to which the ATT&CK object belongs.                                                                                                                                                                                                                                                                                              | `Array<'enterprise-attack' \| 'mobile-attack' \| 'ics-attack'>` (_min: 1_)                   |
| **`x_mitre_attack_spec_version`** (\*) | The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.                                                                     | `string`                                                                                     |

_(\*) Required._

## StatementMarkingObject

_Object containing the following properties:_

| Property             | Description                                                                                           | Type     |
| :------------------- | :---------------------------------------------------------------------------------------------------- | :------- |
| **`statement`** (\*) | A Statement (e.g., copyright, terms of use) applied to the content marked by this marking definition. | `string` |

_(\*) Required._

## TlpAmber

_Object containing the following properties:_

| Property                   | Type                                                         |
| :------------------------- | :----------------------------------------------------------- |
| **`type`** (\*)            | `'marking-definition'`                                       |
| **`spec_version`** (\*)    | `'2.1'`                                                      |
| **`id`** (\*)              | `'marking-definition--f88d31f6-486f-44da-b317-01333bde0b82'` |
| **`created`** (\*)         | `string` (_ISO 8601_)                                        |
| **`definition_type`** (\*) | `'tlp'`                                                      |
| **`name`** (\*)            | `'TLP:AMBER'`                                                |
| **`definition`** (\*)      | _Object with properties:_<ul><li>`tlp`: `'amber'`</li></ul>  |

_(\*) Required._

## TlpGreen

_Object containing the following properties:_

| Property                   | Type                                                         |
| :------------------------- | :----------------------------------------------------------- |
| **`type`** (\*)            | `'marking-definition'`                                       |
| **`spec_version`** (\*)    | `'2.1'`                                                      |
| **`id`** (\*)              | `'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da'` |
| **`created`** (\*)         | `string` (_ISO 8601_)                                        |
| **`definition_type`** (\*) | `'tlp'`                                                      |
| **`name`** (\*)            | `'TLP:GREEN'`                                                |
| **`definition`** (\*)      | _Object with properties:_<ul><li>`tlp`: `'green'`</li></ul>  |

_(\*) Required._

## TlpMarkingDefinition

_Union of the following possible types:_

- [TlpWhite](#tlpwhite)
- [TlpGreen](#tlpgreen)
- [TlpAmber](#tlpamber)
- [TlpRed](#tlpred)

## TlpMarkingObject

_Object containing the following properties:_

| Property       | Description                                                                                       | Type     |
| :------------- | :------------------------------------------------------------------------------------------------ | :------- |
| **`tlp`** (\*) | The TLP level [TLP] of the content marked by this marking definition, as defined in this section. | `string` |

_(\*) Required._

## TlpRed

_Object containing the following properties:_

| Property                   | Type                                                         |
| :------------------------- | :----------------------------------------------------------- |
| **`type`** (\*)            | `'marking-definition'`                                       |
| **`spec_version`** (\*)    | `'2.1'`                                                      |
| **`id`** (\*)              | `'marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed'` |
| **`created`** (\*)         | `string` (_ISO 8601_)                                        |
| **`definition_type`** (\*) | `'tlp'`                                                      |
| **`name`** (\*)            | `'TLP:RED'`                                                  |
| **`definition`** (\*)      | _Object with properties:_<ul><li>`tlp`: `'red'`</li></ul>    |

_(\*) Required._

## TlpWhite

_Object containing the following properties:_

| Property                   | Type                                                         |
| :------------------------- | :----------------------------------------------------------- |
| **`type`** (\*)            | `'marking-definition'`                                       |
| **`spec_version`** (\*)    | `'2.1'`                                                      |
| **`id`** (\*)              | `'marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9'` |
| **`created`** (\*)         | `string` (_ISO 8601_)                                        |
| **`definition_type`** (\*) | `'tlp'`                                                      |
| **`name`** (\*)            | `'TLP:WHITE'`                                                |
| **`definition`** (\*)      | _Object with properties:_<ul><li>`tlp`: `'white'`</li></ul>  |

_(\*) Required._
