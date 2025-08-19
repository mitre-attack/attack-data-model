import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# API Reference

<WorkInProgressNotice />

**Complete documentation for all ATT&CK Data Model classes and functions**

The ATT&CK Data Model provides a comprehensive TypeScript API for working with MITRE ATT&CK data. This reference section documents all public classes, methods, and functions available in the library.

## Core API Components

### [AttackDataModel Class](./attack-data-model)

The main data model class that provides access to all ATT&CK objects and their relationships.

**Key Features:**

- Access to techniques, tactics, groups, campaigns, and other ATT&CK objects
- Automatic relationship mapping between objects
- Type-safe collections with full TypeScript support
- Memory-efficient caching and indexing

### [Data Source Management](./data-sources)

Functions and classes for registering and managing ATT&CK data sources.

**Key Features:**

- Support for official ATT&CK repository, local files, and URLs
- Configurable parsing modes (strict/relaxed)
- Data source validation and caching
- Version management and compatibility checking

### [Utility Functions](./utilities)

Helper functions for common operations and data processing tasks.

**Key Features:**

- Data validation and transformation utilities
- Relationship traversal helpers
- Error handling and logging utilities
- Performance optimization helpers

## Object Type Categories

### STIX Domain Objects (SDO)

**Techniques and Tactics:**

- `TechniqueImpl` - Individual ATT&CK techniques
- `TacticImpl` - ATT&CK tactics and kill chain phases

**Threat Actors and Campaigns:**

- `GroupImpl` - Threat actor groups and APTs
- `CampaignImpl` - Threat campaigns and operations

**Software and Tools:**

- `MalwareImpl` - Malicious software used by threat actors
- `ToolImpl` - Tools and utilities used in attacks

**Detection and Mitigation:**

- `MitigationImpl` - Defensive measures and countermeasures
- `DataSourceImpl` - Detection data sources
- `DataComponentImpl` - Specific detection methods

**Infrastructure and Assets:**

- `AssetImpl` - Systems and infrastructure components
- `IdentityImpl` - Organizations and identity information
- `MatrixImpl` - ATT&CK framework matrices

### STIX Relationship Objects (SRO)

**Relationships:**

- `RelationshipImpl` - Links between ATT&CK objects

### STIX Meta Objects (SMO)

**Metadata:**

- `MarkingDefinitionImpl` - Data marking and classification

## Common Usage Patterns

### Loading Data Models

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

// Register a data source
const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1'
});

const uuid = await registerDataSource(dataSource);
const attackDataModel = loadDataModel(uuid);
```

### Accessing ATT&CK Objects

```typescript
// Get all techniques
const techniques = attackDataModel.techniques;

// Get all tactics
const tactics = attackDataModel.tactics;

// Get all groups
const groups = attackDataModel.groups;
```

### Relationship Navigation

```typescript
// Get techniques used by a group
const group = attackDataModel.groups[0];
const techniquesUsed = group.getTechniques();

// Get tactics for a technique
const technique = attackDataModel.techniques[0];
const tactics = technique.getTactics();

// Get mitigations for a technique
const mitigations = technique.getMitigations();
```

### Schema Validation

```typescript
import { techniqueSchema } from '@mitre-attack/attack-data-model';

try {
    const validTechnique = techniqueSchema.parse(rawTechniqueData);
    console.log('Validation successful:', validTechnique.name);
} catch (error) {
    console.error('Validation failed:', error);
}
```

## Error Handling

All API functions and methods use consistent error handling patterns:

**Validation Errors:** Zod validation errors with detailed field-level information
**Data Source Errors:** Network, file system, or data format errors
**Relationship Errors:** Missing or invalid relationship references

See the [Error Reference](../errors) for complete error code documentation.

## Performance Considerations

**Memory Usage:** The library loads entire datasets into memory for optimal query performance
**Initialization Time:** Initial data loading and relationship mapping takes time proportional to dataset size
**Query Performance:** Object access and relationship traversal are optimized for speed after initialization

## TypeScript Integration

The library is designed for optimal TypeScript experience:

**Full Type Safety:** All objects, properties, and methods are fully typed
**IDE Support:** Auto-completion, inline documentation, and error detection
**Generic Support:** Type parameters for custom extensions and filtering

## Next Steps

- Browse the [Schema Reference](../schemas/) for detailed field documentation
- Check the [Configuration Reference](../configuration) for setup options
- See [How-to Guides](../../how-to-guides/) for practical implementation examples
