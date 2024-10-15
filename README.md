# ATT&CK Data Model (ADM)

The ATT&CK Data Model (ADM) is a TypeScript library that provides a structured way to interact with MITRE ATT&CK datasets. It uses Zod schemas, TypeScript types, and ES6 classes to create a type-safe, object-oriented interface for navigating the ATT&CK data model. This library is designed to parse, validate, and serialize STIX 2.1 formatted content, making it easy to work with ATT&CK-related data in a programmatic and intuitive way.

### Features

- **Type-Safe Data Parsing**: ADM validates STIX 2.1 bundles using Zod schemas, ensuring data model compliance and type safety.
- **Easy Relationship Navigation**: Each object instance contains pointers to related objects, simplifying the process of navigating between techniques, tactics, and other ATT&CK elements.
- **Supports Multiple Data Sources**: Load ATT&CK datasets from different sources, including GitHub, local files, URLs, and TAXII 2.1 servers (more data sources in development).
  
### Supported Data Sources

- **`attack`**: Load ATT&CK data from the official MITRE ATT&CK STIX 2.1 GitHub repository. This serves as the source of truth for MITRE ATT&CK content.
- **`file`**: (Coming soon) Load ATT&CK data from a local JSON file containing a STIX 2.1 bundle.
- **`url`**: (Coming soon) Load ATT&CK data from a URL endpoint serving STIX 2.1 content.
- **`taxii`**: (Coming soon) Load ATT&CK data from a TAXII 2.1 server.

### Getting Started

The ADM library works with STIX 2.1 bundles. All data you wish to load must be formatted according to the STIX 2.1 specification. Once a dataset is registered, the content is parsed and serialized into TypeScript classes that enable easy interaction with the data, including automatic relationship mapping.

#### Installation

To install ADM in your project, run:

```bash
npm install attack-data-model
```

1. Set up a scoped registry for GitHub packages:

```
npm config set @mitre-attack:registry https://npm.pkg.github.com
```

2. Now, when you run the install command, npm will use the GitHub registry for `@mitre-attack` scoped packages and the default npmjs.org registry for other packages:

```
npm install @mitre-attack/attack-data-model@1.0.0-rc.0
```

This setup should allow npm to resolve `@mitre-attack/attack-data-model` from the GitHub Package Registry while fetching other dependencies like `axios` from the default npmjs.org registry.

If you still encounter issues, you might need to explicitly add the npmjs.org registry for non-scoped packages:

```
npm config set registry https://registry.npmjs.org/
```

These configurations will be saved in your npm config file (usually located at `~/.npmrc`), so you only need to set them once.

If you want to verify your current configuration, you can use:

```
npm config list
```

#### Example Usage

Here’s an example script that demonstrates how to use the ADM library to load ATT&CK data from the official MITRE ATT&CK GitHub repository:

```ts
// test.ts
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

### How It Works

1. **Data Registration**: Datasets are registered via `registerDataSource`. You specify the source of the data (e.g., `attack`, `file`, `url`, `taxii`) and provide any necessary options (such as `domain` and `version` for ATT&CK datasets).
2. **Parsing and Validation**: Once the data is loaded, it is parsed by Zod schemas, ensuring that the data conforms to the expected STIX 2.1 specification.
3. **Serialization**: Valid objects are converted into TypeScript class instances, allowing for type-safe interaction and relationship navigation.
4. **Relationship Mapping**: The library automatically processes all "relationship" objects in the dataset, creating links between techniques, tactics, groups, and other ATT&CK objects.

### Parsing Modes

- **Strict Mode**: Data must pass all validation checks to be ingested. If any objects are rejected, the registration is aborted.
- **Relaxed Mode**: Invalid objects are logged, but the library will ignore parsing errors and attempt to load the dataset anyway. This mode may cause unexpected downstream usage errors because parsing errors indicate that the ingest data is not fully aligned with the Zod schemas. Since the TypeScript API is built on these schemas, there could be incompatibilities between what the API expects and how the data behaves. Use with caution.

### Contributing

If you would like to contribute to this repository, please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

### License

This project is licensed under the Apache 2.0 License.
