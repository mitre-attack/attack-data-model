# ATT&CK Data Model TypeScript API Documentation

## Introduction

The ATT&CK Data Model (ADM) TypeScript API provides a structured and type-safe way to interact with MITRE ATT&CK® datasets. It leverages Zod schemas, TypeScript types, and ES6 classes to create an object-oriented interface for navigating the ATT&CK data model. This library is designed to parse, validate, and serialize STIX 2.1 formatted content, making it easy to work with ATT&CK-related data programmatically.

### Features

- **Type-Safe Data Parsing**: Validates STIX 2.1 data using Zod schemas, ensuring compliance with the ATT&CK Data Model.
- **Object-Oriented Interface**: Provides ES6 class wrappers for ATT&CK objects, enabling intuitive interaction and relationship navigation.
- **Relationship Mapping**: Automatically processes relationships between objects, allowing easy traversal of the ATT&CK data model.
- **Flexible Data Sources**: Supports loading data from various sources, including the official MITRE ATT&CK GitHub repository, local files, URLs, and TAXII 2.1 servers (some data sources are under development).

## Installation

For installation instructions, please refer to the [Installation](../README.md#installation) section in the `README.md` file.

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
├── data-sources
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
- **`data-sources`**: Modules for loading ATT&CK data from various sources.
- **`errors`**: Custom error classes used throughout the library.

### Hierarchical Structure

The library is designed with a hierarchical structure. Every directory exports its modules through an `index.ts` file, creating a clear and organized namespace. The top-level `index.ts` file exports all components, allowing for straightforward imports:

```typescript
export * from './classes/index.js';
export * from './data-sources/index.js';
export * from './errors/index.js';
export * from './schemas/index.js';
export * from './main.js';
```

## Using the Schemas

The library provides Zod schemas for all ATT&CK object types, enabling validation and type inference of STIX 2.1 data.

### Accessing Schemas

Schemas are available under the `schemas` directory. You can import them directly from the package root:

```typescript
import { tacticSchema } from '@mitre-attack/attack-data-model';
```

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

To use the `AttackDataModel`, you need to load it with data from a data source:

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

(async () => {
  const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1',
    parsingMode: 'relaxed',
  });

  const uuid = await registerDataSource(dataSource);
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

## Data Sources

The library supports loading data from various sources through the `DataSource` class.

### Supported Data Sources

- **`attack`**: Official MITRE ATT&CK STIX 2.1 GitHub repository.
- **`file`**: (Coming soon) Local JSON files containing STIX 2.1 bundles.
- **`url`**: (Coming soon) URLs serving STIX 2.1 content.
- **`taxii`**: (Coming soon) TAXII 2.1 servers.

### Loading Data from the ATT&CK GitHub Repository

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

(async () => {
  const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1',
    parsingMode: 'relaxed',
  });

  const uuid = await registerDataSource(dataSource);
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

### Custom Data Sources

You can create custom data sources by extending the `DataSource` class or by providing your own data loading logic.

```typescript
import { DataSource } from '@mitre-attack/attack-data-model';

class CustomDataSource extends DataSource {
  // Implement custom data loading logic
}

const customDataSource = new CustomDataSource({
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

© 2020-2024 The MITRE Corporation.

This project makes use of ATT&CK®.

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)

---

**Note**: For additional usage examples and more detailed information, please refer to the [examples](../examples/) folder in the repository.