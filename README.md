# MITRE ATT&CK® Data Model

The ATT&CK Data Model (ADM) is a TypeScript library that provides a structured way to interact with MITRE ATT&CK datasets. It uses Zod schemas, TypeScript types, and ES6 classes to create a type-safe, object-oriented interface for navigating the ATT&CK data model. This library is designed to parse, validate, and serialize STIX 2.1 formatted content, making it easy to work with ATT&CK-related data in a programmatic and intuitive way.

You can browse the ATT&CK schemas in a user-friendly interface at:

https://mitre-attack.github.io/attack-data-model/. 

This site is dynamically generated from the contents of the `@latest` distribution channel / `main` branch. Please note that we do not currently maintain separate documentation for previous releases.

## Features

- **Type-Safe Data Parsing**: ADM validates STIX 2.1 bundles using Zod schemas, ensuring data model compliance and type safety.
- **Easy Relationship Navigation**: Each object instance contains pointers to related objects, simplifying the process of navigating between techniques, tactics, and other ATT&CK elements.
- **Supports Multiple Data Sources**: Load ATT&CK datasets from different sources, including GitHub, local files, URLs, and TAXII 2.1 servers (more data sources in development).
- Parsing, validation, and serialization of ATT&CK data
- ES6 classes for object-oriented data manipulation

## Supported Data Sources

- **`attack`**: Load ATT&CK data from the official MITRE ATT&CK STIX 2.1 GitHub repository. This serves as the source of truth for MITRE ATT&CK content.
- **`file`**: Load ATT&CK data from a local JSON file containing a STIX 2.1 bundle.
- **`url`**: Load ATT&CK data from a URL endpoint serving STIX 2.1 content.
- **`taxii`**: (Coming soon) Load ATT&CK data from a TAXII 2.1 server.

## Installation

### Pre-requisites

To use the ATT&CK Data Model in your TypeScript project, you must first do two setup steps.

1. Create a GitHub Personal Access Token with the `read:packages` scope. Full details can be found in this [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages). The critical detail from that page is the following:

> To authenticate by adding your personal access token (classic) to your ~/.npmrc file, edit the ~/.npmrc file for your project to include the following line, replacing TOKEN with your personal access token. Create a new ~/.npmrc file if one doesn't exist.
>
> ```//npm.pkg.github.com/:_authToken=TOKEN```

2. Second, set up a scoped registry for GitHub packages:

```bash
npm config set @mitre-attack:registry https://npm.pkg.github.com
```

If you encounter issues, you might need to explicitly add the npmjs.org registry for non-scoped packages:

```bash
npm config set registry https://registry.npmjs.org/
```

To verify your current configuration:

```bash
npm config list
```

### Install

Now you can install the package:

```bash
npm install @mitre-attack/attack-data-model
```

## ATT&CK Specification

The ADM is built upon the MITRE ATT&CK® Specification, which formally defines the structure, properties, and relationships of ATT&CK objects. The ATT&CK Specification serves as the authoritative source for how ATT&CK data should be represented and interacted with.

The ADM provides a codified expression of the ATT&CK Specification using Zod schemas and TypeScript types. By implementing the specification in code, the ADM ensures that all data parsed and manipulated through the library adheres to the defined standards of the ATT&CK data model. This includes strict validation of object structures, types, and required properties, providing developers with confidence in the integrity and consistency of the data they work with.

While the ATT&CK Specification defines the data model itself, the ADM includes additional software engineering elements such as utility functions, classes, and methods to facilitate easier interaction with ATT&CK data. As such, the ADM is subject to its own development lifecycle and versioning, independent of the ATT&CK Specification.

The version of the ATT&CK Specification that the ADM is based on is indicated in the [ATTACK_SPEC_VERSION](./ATTACK_SPEC_VERSION) file located in the repository. This file contains a single line specifying the semantic version of the ATT&CK Specification that the current ADM release is pinned to.

It's important to note that the ADM's versioning may not directly align with the versioning of the ATT&CK Specification. The ADM follows its own semantic versioning release cadence to accommodate ongoing software engineering changes, enhancements, and fixes that may occur more frequently than updates to the ATT&CK Specification itself.

By maintaining separate versioning, the ADM can evolve as a software library while remaining aligned with the underlying ATT&CK data model defined by the specification. This approach ensures that developers have access to the latest features and improvements in the ADM without being constrained by the update schedule of the ATT&CK Specification.

## Documentation

For detailed API documentation and usage examples, please refer to the [ATT&CK Data Model TypeScript API Documentation](docs/USAGE.md).

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

Our [COMPATIBILITY.md](./docs/COMPATIBILITY.md) document tracks the compatibility between versions of the ATT&CK Data Model (ADM) TypeScript API (`@mitre-attack/attack-data-model`) and versions of the MITRE ATT&CK® dataset (`mitre-attack/attack-stix-data`).

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the Apache 2.0 License.

## Notice 

Copyright 2020-2025 The MITRE Corporation.

This project makes use of ATT&CK®

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)