# MITRE ATT&CK® Data Model

The ATT&CK Data Model (ADM) is a TypeScript library that provides a structured way to interact with MITRE ATT&CK datasets. It uses Zod schemas, TypeScript types, and ES6 classes to create a type-safe, object-oriented interface for navigating the ATT&CK data model. This library is designed to parse, validate, and serialize STIX 2.1 formatted content, making it easy to work with ATT&CK-related data in a programmatic and intuitive way.

## Features

- **Type-Safe Data Parsing**: ADM validates STIX 2.1 bundles using Zod schemas, ensuring data model compliance and type safety.
- **Easy Relationship Navigation**: Each object instance contains pointers to related objects, simplifying the process of navigating between techniques, tactics, and other ATT&CK elements.
- **Supports Multiple Data Sources**: Load ATT&CK datasets from different sources, including GitHub, local files, URLs, and TAXII 2.1 servers (more data sources in development).
- Parsing, validation, and serialization of ATT&CK data
- ES6 classes for object-oriented data manipulation

## Supported Data Sources

- **`attack`**: Load ATT&CK data from the official MITRE ATT&CK STIX 2.1 GitHub repository. This serves as the source of truth for MITRE ATT&CK content.
- **`file`**: (Coming soon) Load ATT&CK data from a local JSON file containing a STIX 2.1 bundle.
- **`url`**: (Coming soon) Load ATT&CK data from a URL endpoint serving STIX 2.1 content.
- **`taxii`**: (Coming soon) Load ATT&CK data from a TAXII 2.1 server.

## Installation

To use ADM in your TypeScript project, you must first set up a scoped registry for GitHub packages:

```bash
npm config set @mitre-attack:registry https://npm.pkg.github.com
```

Then, install the package:

```bash
npm install @mitre-attack/attack-data-model@1.0.0-rc.0
```

If you encounter issues, you might need to explicitly add the npmjs.org registry for non-scoped packages:

```bash
npm config set registry https://registry.npmjs.org/
```

To verify your current configuration:

```bash
npm config list
```

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

For more detailed examples, please refer to the [examples](./examples/) folder in the repository.

## How It Works

1. **Data Registration**: Datasets are registered via `registerDataSource`. You specify the source of the data (e.g., `attack`, `file`, `url`, `taxii`) and provide any necessary options (such as `domain` and `version` for ATT&CK datasets). This function returns a unique identifier for the registered data source.
2. **Data Loading**: The `loadDataModel` function is used to load registered data models by their unique identifier.
3. **Parsing and Validation**: Once the data is loaded, it is parsed by Zod schemas, ensuring that the data conforms to the expected STIX 2.1 specification.
4. **Serialization**: Valid objects are converted into TypeScript class instances, allowing for type-safe interaction and relationship navigation.
5. **Relationship Mapping**: The library automatically processes all "relationship" objects in the dataset, creating links between techniques, tactics, groups, and other ATT&CK objects.

## Parsing Modes

- **Strict Mode**: Data must pass all validation checks to be ingested. If any objects are rejected, the registration is aborted.
- **Relaxed Mode**: Invalid objects are logged, but the library will ignore parsing errors and attempt to load the dataset anyway. Use with caution, as this may cause unexpected downstream usage errors.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the Apache 2.0 License.

## Notice 

Copyright 2020-2024 The MITRE Corporation.

This project makes use of ATT&CK®

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)