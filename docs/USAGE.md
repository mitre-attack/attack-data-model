# ATT&CK Data Model TypeScript API Documentation

## Introduction

The ATT&CK Data Model (ADM) TypeScript API provides a structured and type-safe way to interact with MITRE ATT&CK® datasets. It leverages Zod schemas, TypeScript types, and ES6 classes to create an object-oriented interface for navigating the ATT&CK data model. This library is designed to parse, validate, and serialize STIX 2.1 formatted content, making it easy to work with ATT&CK-related data programmatically.

### Features

- **Type-Safe Data Parsing**: Validates STIX 2.1 data using Zod schemas, ensuring compliance with the ATT&CK Data Model.
- **Object-Oriented Interface**: Provides ES6 class wrappers for ATT&CK objects, enabling intuitive interaction and relationship navigation.
- **Relationship Mapping**: Automatically processes relationships between objects, allowing easy traversal of the ATT&CK data model.
- **Flexible Content Origins**: Supports loading data from various content origins, including the official MITRE ATT&CK GitHub repository, local files, URLs, and TAXII 2.1 servers (some content origins are under development).

## Installation

For installation from the npm registry, please refer to the [Installation](../README.md#installation) section.

## Module Format Support

The ATT&CK Data Model is built using [tsup](https://github.com/egoist/tsup), which compiles the TypeScript code to both ESM (ECMAScript Modules) and CJS (CommonJS) formats. This dual-format approach allows the library to be used in various JavaScript environments:

- **ESM**: Modern environments that support ES modules (Node.js with `"type": "module"` in package.json, or modern bundlers like Webpack, Rollup, etc.)
- **CJS**: Traditional Node.js applications and environments that use CommonJS modules (Node.js with `"type": "commonjs"` in package.json)

### ESM Usage Example

```javascript
// In a package with "type": "module" in package.json
import { AttackDataModel } from '@mitre-attack/attack-data-model';

// Create an instance with a UUID and an empty array of attack objects
const uuid = "my-unique-id";
const attackObjects = [];
const attackDataModel = new AttackDataModel(uuid, attackObjects);

console.log('AttackDataModel instance created with UUID:', attackDataModel.getUuid());
```

### CommonJS Usage Example

```javascript
// In a package with "type": "commonjs" in package.json
const { AttackDataModel } = require('@mitre-attack/attack-data-model');

// Create an instance with a UUID and an empty array of attack objects
const uuid = "my-unique-id";
const attackObjects = [];
const attackDataModel = new AttackDataModel(uuid, attackObjects);

console.log('AttackDataModel instance created with UUID:', attackDataModel.getUuid());
```

## Package Structure

Understanding the package structure will help you locate and use various components of the API effectively.

### Directory Structure

When installed, the library has the following directory structure:

```
@mitre-attack/attack-data-model/dist
├── classes
│   ├── common
│   ├── sdo
│   ├── smo
│   └── sro
├── content-origins
├── errors
└── schemas
    ├── common
    ├── sdo
    ├── smo
    └── sro
```

Each sub-package serves a specific purpose:

- **`schemas`**: Contains Zod schemas and TypeScript types for ATT&CK objects.
  - **`sdo`**: STIX Domain Objects (e.g., Techniques, Campaigns).
  - **`smo`**: STIX Meta Objects.
  - **`sro`**: STIX Relationship Objects.
  - **`common`**: Common property schemas and Open Vocabulary schemas.
- **`classes`**: Contains ES6 class wrappers for ATT&CK objects, providing methods for relationship navigation and data manipulation.
  - **`common`**: Base classes and shared components.
  - **`sdo`**, **`smo`**, **`sro`**: Class implementations corresponding to the schemas.
- **`content-origins`**: Modules for loading ATT&CK data from various content origins.
- **`errors`**: Custom error classes used throughout the library.

### Hierarchical Structure

The library is designed with a hierarchical structure. Every directory exports its modules through an `index.ts` file, creating a clear and organized namespace. The top-level `index.ts` file exports all components, allowing for straightforward imports:

```typescript
export * from './api/index.js';
export * from './errors/index.js';
export * from './schemas/index.js';
export * from './main.js';
```

## Using the Schemas

The library provides Zod schemas for all ATT&CK object types, enabling validation and type inference of STIX 2.1 data.

### Accessing Schemas

Schemas and their associated TypeScript types are available under the `schemas` directory. You can import them directly from the package root:

```typescript
import { campaignSchema } from '@mitre-attack/attack-data-model';
import type { Campaign } from '@mitre-attack/attack-data-model';
```

Many of the ATT&CK schemas use Zod refinements. We leverage refinements to execute advanced validation checks (e.g., validating that the first reference in `external_references` contains a valid ATT&CK ID).

Unfortunately, in current versions of Zod, if a schema is modified with one of the object methods (`pick`, `omit`, `extend`), the refinements will be discarded.

For example, let's say you wish to augment ATT&CK campaigns with your own custom fields:

```typescript
import { campaignSchema } from '@mitre-attack/attack-data-model';
const myCustomCampaignSchema = campaignSchema.extend({ /* additional fields */ });
```

`myCustomCampaignSchema` would not be valid, as it is missing the refinements that were originally present in `campaignSchema`.

You can still use the original refinements in your custom schemas, it will just take an extra step. Each ATT&CK refinement is decoupled so they can be used modularly. They are exported as factory functions in the `refinements` sub-package:

```typescript
// Import the original schema, and the refinements you want to use
import { campaignSchema, createFirstAliasRefinement, createCitationsRefinement } from '@mitre-attack/attack-data-model';

// Apply a single refinement that combines the imported refinements
const myCustomCampaignSchema = campaignSchema
  .extend({ /* additional fields */ })
  .check((ctx) => {
    createFirstAliasRefinement()(ctx);
    createCitationsRefinement()(ctx);
  });
```

You will have to look in the original schema file, in this case [/src/schemas/sdo/campaign.schema.ts](/src/schemas/sdo/campaign.schema.ts) to see which refinements, if any, should be applied to the ATT&CK schema that you wish to extend.

This [GitHub issue](https://github.com/colinhacks/zod/issues/4874) and [pull request](https://github.com/colinhacks/zod/pull/4865) describe the behavior and an upcoming `safeExtend` method that will allow you to extend the ATT&CK schemas without having to reapply the refinements.

### Validating Data

Use the schemas to validate raw STIX 2.1 JSON data:

```typescript
import { tacticSchema } from '@mitre-attack/attack-data-model';

const rawTacticData = {
  id: "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
  type: "x-mitre-tactic",
  name: "Execution",
  description: "The adversary is trying to run malicious code.",
  x_mitre_shortname: "execution",
  // ... other required fields
};

try {
  const parsedTactic = tacticSchema.parse(rawTacticData);
  console.log("Tactic parsed successfully:", parsedTactic.name);
} catch (error) {
  console.error("Validation error:", error);
}
```

### TypeScript Types

The schemas also export TypeScript types, allowing for type-safe code:

```typescript
import type { Tactic } from '@mitre-attack/attack-data-model';

const tactic: Tactic = {
  // ... tactic data conforming to the schema
};
```

### Schema Hierarchy

Schemas are organized hierarchically:

- **Base Schemas**: Common properties defined by STIX 2.1 are in `stixBaseObjectSchema`.
- **ATT&CK Base Schema**: Extends the STIX base schema with ATT&CK-specific properties in `attackBaseObjectSchema`.
- **Object-Specific Schemas**: Extend the ATT&CK base schema to define specific ATT&CK objects (e.g., `techniqueSchema`, `campaignSchema`).

This hierarchy allows for clear separation between STIX and ATT&CK properties and facilitates schema inheritance.

## Using the Classes

In addition to schemas, the library provides ES6 class implementations (`Impl` classes) that offer methods for relationship navigation and data manipulation.

### AttackDataModel Class

The `AttackDataModel` class is the main entry point for interacting with the ATT&CK data model. It contains properties for each ATT&CK object type:

```typescript
import { AttackDataModel } from '@mitre-attack/attack-data-model';

const attackDataModel = new AttackDataModel();

console.log(attackDataModel.techniques); // Access techniques
console.log(attackDataModel.campaigns);  // Access campaigns
// ... and so on for other object types
```

### Initializing with Data

To use the `AttackDataModel`, you need to load it with data from a content origin:

```typescript
import { registerContentOrigin, loadDataModel, ContentOriginRegistration } from '@mitre-attack/attack-data-model';

(async () => {
  const contentOrigin = new ContentOriginRegistration({
    source: 'mitre',
    domain: 'enterprise-attack',
    version: '15.1',
    parsingMode: 'relaxed',
  });

  const uuid = await registerContentOrigin(contentOrigin);
  const attackDataModel = loadDataModel(uuid);

  // Now you can interact with the data model
})();
```

### Relationship Mapping

Each class implementation provides methods to navigate relationships. For example, `CampaignImpl` provides methods to get related techniques, software, and groups.

#### Example: CampaignImpl

```typescript
const campaign = attackDataModel.campaigns[0];

// Access schema-defined properties
console.log(`Campaign Name: ${campaign.name}`);

// Use class methods to navigate relationships
const techniques = campaign.getTechniques();
const software = campaign.getSoftware();
const attributedGroup = campaign.getAttributedTo();

console.log(`Techniques used in campaign: ${techniques.map(t => t.name).join(', ')}`);
console.log(`Software used in campaign: ${software.map(s => s.name).join(', ')}`);
console.log(`Attributed to group: ${attributedGroup?.name}`);
```

### Class Implementations

Each ATT&CK object type has a corresponding class implementation:

- **`TechniqueImpl`**: Represents a Technique object.
  - Methods:
    - `getSubtechniques()`: Retrieves sub-techniques.
    - `getParentTechnique()`: Retrieves the parent technique.
    - `getTactics()`: Retrieves associated tactics.
- **`CampaignImpl`**: Represents a Campaign object.
  - Methods:
    - `getTechniques()`: Retrieves techniques used.
    - `getSoftware()`: Retrieves software used.
    - `getAttributedTo()`: Retrieves the group attributed to the campaign.
- **`GroupImpl`**: Represents a Group (Intrusion Set) object.
  - Methods:
    - `getAssociatedSoftware()`: Retrieves software used by the group.
    - `getAssociatedCampaigns()`: Retrieves campaigns associated with the group.
- **... and more.**

### Type Casting and Interfaces

The `Impl` classes implement the corresponding TypeScript interfaces derived from the schemas. This means you can use them for type casting and get both the properties defined in the schema and the methods defined in the class.

```typescript
import type { Campaign } from '@mitre-attack/attack-data-model';
import { CampaignImpl } from '@mitre-attack/attack-data-model';

const campaign: CampaignImpl = attackDataModel.campaigns[0];

// Access schema-defined properties
console.log(campaign.name);

// Use class methods
const techniques = campaign.getTechniques();
```

## Content Origins

The library supports loading data from various content origins through the `ContentOriginRegistration` class.

### Supported Content Origins

- **`mitre`**: Official MITRE ATT&CK STIX 2.1 GitHub repository.
- **`file`**: (Coming soon) Local JSON files containing STIX 2.1 bundles.
- **`url`**: (Coming soon) URLs serving STIX 2.1 content.
- **`taxii`**: (Coming soon) TAXII 2.1 servers.

### Loading Data from the ATT&CK GitHub Repository

```typescript
import { registerContentOrigin, loadDataModel, ContentOriginRegistration } from '@mitre-attack/attack-data-model';

(async () => {
  const contentOrigin = new ContentOriginRegistration({
    source: 'mitre',
    domain: 'enterprise-attack',
    version: '15.1',
    parsingMode: 'relaxed',
  });

  const uuid = await registerContentOrigin(contentOrigin);
  const attackDataModel = loadDataModel(uuid);

  // Access ATT&CK objects
  const techniques = attackDataModel.techniques;
})();
```

### Parsing Modes

- **Strict Mode**: Data must pass all validation checks to be ingested. If any objects fail validation, the registration is aborted.
- **Relaxed Mode**: Invalid objects are logged, but the library attempts to load the dataset anyway. Use with caution, as this may cause unexpected errors during usage.

## Examples

### Accessing Techniques and Related Tactics

```typescript
const techniques = attackDataModel.techniques;

techniques.forEach((technique) => {
  console.log(`Technique: ${technique.name}`);
  const tactics = technique.getTactics();
  tactics.forEach((tactic) => {
    console.log(`  Associated Tactic: ${tactic.name}`);
  });
});
```

### Working with Software and Groups

```typescript
const malwareList = attackDataModel.malware;

malwareList.forEach((malware) => {
  console.log(`Malware: ${malware.name}`);
  const associatedGroups = malware.getAssociatedGroups();
  associatedGroups.forEach((group) => {
    console.log(`  Used by Group: ${group.name}`);
  });
});
```

### Validating and Parsing a Technique

```typescript
import { techniqueSchema } from '@mitre-attack/attack-data-model';

const rawTechniqueData = {
  id: "attack-pattern--1234abcd-5678-efgh-ijkl-9876mnopqrst",
  type: "attack-pattern",
  name: "Example Technique",
  description: "An example technique for demonstration purposes.",
  // ... other required fields
};

try {
  const technique = techniqueSchema.parse(rawTechniqueData);
  console.log("Technique parsed successfully:", technique.name);
} catch (error) {
  console.error("Validation error:", error);
}
```

### Handling Invalid Data

```typescript
import { techniqueSchema } from '@mitre-attack/attack-data-model';
import { z } from 'zod';

const invalidTechniqueData = {
  // Missing required fields
  id: "attack-pattern--1234abcd-5678-efgh-ijkl-9876mnopqrst",
  type: "attack-pattern",
};

try {
  techniqueSchema.parse(invalidTechniqueData);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
```

## Advanced Usage

### Custom Content Origins

You can create custom content origins by extending the `ContentOriginRegistration` class or by providing your own data loading logic.

```typescript
import { DataSource } from '@mitre-attack/attack-data-model';

class CustomContentOrigin extends ContentOriginRegistration {
  // Implement custom data loading logic
}

const customContentOrigin = new CustomContentOrigin({
  source: 'custom',
  // ... other options
});

// Register and load as before
```

### Extending Classes

You can extend the provided class implementations to add custom methods or properties.

```typescript
import { TechniqueImpl } from '@mitre-attack/attack-data-model';

class CustomTechnique extends TechniqueImpl {
  customMethod() {
    // Implement custom logic
  }
}

const techniques = attackDataModel.techniques.map(
  (technique) => new CustomTechnique(technique)
);

techniques.forEach((technique) => {
  technique.customMethod();
});
```

## Reference

### Classes

#### `AttackDataModel`

- **Properties**:
  - `techniques`: `TechniqueImpl[]`
  - `campaigns`: `CampaignImpl[]`
  - `mitigations`: `MitigationImpl[]`
  - `groups`: `GroupImpl[]`
  - `malware`: `MalwareImpl[]`
  - `tools`: `ToolImpl[]`
  - `tactics`: `TacticImpl[]`
  - `relationships`: `RelationshipImpl[]`
  - ... other object types.

#### `TechniqueImpl`

- **Methods**:
  - `getSubtechniques()`: Retrieves sub-techniques.
  - `getParentTechnique()`: Retrieves the parent technique.
  - `getTactics()`: Retrieves associated tactics.
  - `getMitigations()`: Retrieves mitigations for the technique.
  - `getGroups()`: Retrieves groups that use the technique.

#### `CampaignImpl`

- **Methods**:
  - `getTechniques()`: Retrieves techniques used in the campaign.
  - `getSoftware()`: Retrieves software used in the campaign.
  - `getAttributedTo()`: Retrieves the group attributed to the campaign.

#### `GroupImpl`

- **Methods**:
  - `getAssociatedSoftware()`: Retrieves software used by the group.
  - `getAssociatedCampaigns()`: Retrieves campaigns associated with the group.
  - `getTechniques()`: Retrieves techniques used by the group.

#### ... Other Classes

Similar methods and properties are available for other object types, following the same pattern.

### Schemas

- **`attackBaseObjectSchema`**
  - Extends `stixDomainObjectSchema`.
  - Common ATT&CK properties like `x_mitre_attack_spec_version`, `x_mitre_version`, `name`, etc.

- **`stixDomainObjectSchema`**
  - Base schema for STIX Domain Objects.
  - Properties like `id`, `type`, `spec_version`, `created`, `modified`, etc.

- **`common`**
  - Contains schemas for common properties and Open Vocabulary schemas.
  - Properties like `description`, `aliases`, `external_references`, etc.

## Contributing

We welcome contributions! Please see our [`CONTRIBUTING.md`](CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the Apache 2.0 License.

## Notice

© 2020-2025 The MITRE Corporation.

This project makes use of ATT&CK®.

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)

---

**Note**: For additional usage examples and more detailed information, please refer to the [examples](../examples/) folder in the repository.