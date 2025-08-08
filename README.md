# MITRE ATT&CK® Data Model

**A TypeScript library for working with MITRE ATT&CK® data using STIX 2.1**

The ATT&CK Data Model (ADM) provides a type-safe, object-oriented interface for working with MITRE ATT&CK datasets.
Built on STIX 2.1 compliance, it uses Zod schemas and TypeScript types to ensure data integrity while providing intuitive relationship navigation between ATT&CK objects.

## Key Features

- **Type-Safe**: Full TypeScript support with compile-time validation
- **STIX 2.1 Compliant**: Standards-compliant
- **Relationship Navigation**: Intuitive methods for exploring connections
- **Multiple Data Sources**: Official repository, local files, URLs, TAXII

## Quick Start

```bash
npm install @mitre-attack/attack-data-model
```

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1'
});

const uuid = await registerDataSource(dataSource);
const attackDataModel = loadDataModel(uuid);

// Navigate relationships intuitively
const technique = attackDataModel.techniques[0];
const tactics = technique.getTactics();
const mitigations = technique.getMitigations();
```

## Documentation

For detailed API documentation and usage examples, please refer to the [documentation](https://mitre-attack.github.io/attack-data-model/)

- [Tutorials](https://mitre-attack.github.io/attack-data-model/tutorials/) - Learn by doing with step-by-step guides
- [How-to Guides](https://mitre-attack.github.io/attack-data-model/how-to-guides/) - Solve specific problems quickly
- [Reference](https://mitre-attack.github.io/attack-data-model/reference/) - Complete API and configuration documentation
- [Explanation](https://mitre-attack.github.io/attack-data-model/explanation/) - Understand design decisions and architecture

## Basic Usage

### Loading the ADM

Here's an example script that demonstrates how to use the ADM library to load ATT&CK data from the official MITRE ATT&CK GitHub repository:

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

(async () => {

    // Instantiating a DataSource object will validate that the data source is accessible and readable
    const dataSource = new DataSource({
        source: 'attack', // Built-in index to retrieve ATT&CK content from the official MITRE ATT&CK STIX 2.1 GitHub repository
        domain: 'enterprise-attack',
        version: '15.1', // Omitting 'version' will default to the latest version available in the repository
        parsingMode: 'relaxed' // 'strict' or 'relaxed' - 'relaxed' mode will attempt to parse and serialize data even if it contains errors or warnings
    });

    try {
        // Register the data source and retrieve the unique ID
        const uuid = await registerDataSource(dataSource);
        if (uuid) {
            // Load the dataset using the unique ID
            const attackEnterpriseLatest = loadDataModel(uuid);

            // Access ATT&CK objects by type using object properties
            const techniques = attackEnterpriseLatest.techniques;
            const tactics = attackEnterpriseLatest.tactics;

            const technique = techniques[0];

            // Type hinting is supported for all object properties
            if (technique.x_mitre_is_subtechnique) {

                // Access related objects with helpful getter methods
                console.log(technique.getParentTechnique());
            }
        }
    } catch (error) {
        console.error(error);
    }
})();
```

### Parsing and Validating a Tactic

```typescript
import { tacticSchema } from "@mitre-attack/attack-data-model";

const validTactic = {
  id: "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
  type: "x-mitre-tactic",
  name: "Execution",
  description: "The adversary is trying to run malicious code.",
  x_mitre_shortname: "execution",
  // ... other required fields
};

try {
  const parsedTactic = tacticSchema.parse(validTactic);
  console.log("Tactic parsed successfully:", parsedTactic.name);
} catch (error) {
  console.error("Validation error:", error);
}
```

### Handling Invalid Data

```typescript
import { tacticSchema } from "@mitre-attack/attack-data-model";
import { z } from "zod";

const invalidTactic = {
  // Missing required fields
  id: "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
  type: "x-mitre-tactic",
};

try {
  tacticSchema.parse(invalidTactic);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
```

For more detailed examples, please refer to the [examples](./examples/README.md) folder in the repository.

## How It Works

1. **Data Registration**: Datasets are registered via `registerDataSource`. You specify the source of the data (e.g., `attack`, `file`, `url`, `taxii`) and provide any necessary options (such as `domain` and `version` for ATT&CK datasets). This function returns a unique identifier for the registered data source.
2. **Data Loading**: The `loadDataModel` function is used to load registered data models by their unique identifier.
3. **Parsing and Validation**: Once the data is loaded, it is parsed by Zod schemas, ensuring that the data conforms to the expected STIX 2.1 specification.
4. **Serialization**: Valid objects are converted into TypeScript class instances, allowing for type-safe interaction and relationship navigation.
5. **Relationship Mapping**: The library automatically processes all "relationship" objects in the dataset, creating links between techniques, tactics, groups, and other ATT&CK objects.

## Parsing Modes

- **Strict Mode**: Data must pass all validation checks to be ingested. If any objects are rejected, the registration is aborted.
- **Relaxed Mode**: Invalid objects are logged, but the library will ignore parsing errors and attempt to load the dataset anyway. Use with caution, as this may cause unexpected downstream usage errors.

## Compatibility Matrix

Our [Compatibility documentation](https://mitre-attack.github.io/attack-data-model/explanation/versioning-philosophy) tracks the compatibility between versions of the ATT&CK Data Model (ADM) TypeScript API (`@mitre-attack/attack-data-model`) and versions of the MITRE ATT&CK® dataset (`mitre-attack/attack-stix-data`).

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the Apache 2.0 License.

## Notice

Copyright 2020-2025 The MITRE Corporation.

This project makes use of ATT&CK®

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)