import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# ATT&CK Data Model Documentation

<WorkInProgressNotice />

*A TypeScript library for working with MITRE ATT&CK data using STIX 2.1 bundles*

Welcome to the documentation for the ATT&CK Data Model library.
This documentation aims to provide you with exactly the right type of information for your needs, whether you are a beginner or a seasoned pro.

## Quick Start

```bash
# Install the library
npm install @mitre-attack/attack-data-model

# Import and use
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';
```

## What is the ATT&CK Data Model?

The ATT&CK Data Model (ADM) is a TypeScript library that strives to be:

- **Type-Safe**: Full TypeScript support with compile-time validation
- **STIX 2.1 Compliant**: Standards-compliant
- **Relationship Navigation**: Intuitive methods for exploring connections
- **Multiple Data Sources**: Official repository, local files, URLs, TAXII

## Zod Schema Foundation

The ATT&CK Data Model leverages **[Zod](https://zod.dev/)**, a TypeScript-first schema validation library, to ensure data integrity and enable powerful developer experiences:

### Key Benefits

- **Data Validation**: Parse and validate ATT&CK data as strongly-typed TypeScript objects
- **Error Prevention**: Catch data inconsistencies at compile-time and runtime
- **Maintainability**: Single source of truth for data structures reduces maintenance overhead

### Schema-Driven Development

```typescript
import { techniqueSchema } from '@mitre-attack/attack-data-model';

// Automatic validation and type inference
const technique = techniqueSchema.parse(rawAttackData);
console.log(technique.name); // TypeScript knows this is a string
```

## Known Compliance Status

**Current State**: The ATT&CK knowledge base does not fully conform to all defined schemas due to evolving data quality standards.

**Our Approach**:

- **Continuous Improvement**: Known discrepancies are actively tracked and addressed
- **Flexibility**: Library supports both `strict` and `relaxed` parsing modes
- **Transparency**: Validation errors are clearly documented and reported

**For Users**: Use `relaxed` mode for production workflows while we work toward full schema compliance.

## Current Version Information

- **Library Version**: Latest release from npm
- **ATT&CK Specification**: 3.3.0
- **STIX Version**: 2.1
- **Node.js**: 20.0.0+
- **TypeScript**: 4.5.0+

## Community and Support

- **Browse these docs** for comprehensive guidance on the ATT&CK Data Model library
- **[Report issues](https://github.com/mitre-attack/attack-data-model/issues)** on GitHub
- **[Contact](https://attack.mitre.org/resources/engage-with-attack/contact/)** the MITRE ATT&CK team for questions about ATT&CK itself

---

Ready to get started? Check out the links in the sidebar to dive right in!
