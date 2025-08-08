# Reference

**Complete technical specifications and API documentation**

This section provides comprehensive reference material for the ATT&CK Data Model library. All classes, methods, schemas, and configuration options are documented here with precise technical details.

## API Documentation

### Core Classes

- **[AttackDataModel](./api/attack-data-model)** - Main data model containing all ATT&CK objects
- **[DataSource](./api/data-sources)** - Data source configuration and registration
- **[Utility Functions](./api/utilities)** - Helper functions and data manipulation tools

### Implementation Classes (SDO)

All STIX Domain Object implementations with relationship navigation methods:

| Class | ATT&CK Object | Key Methods |
|-------|---------------|-------------|
| `TechniqueImpl` | Techniques | `getTactics()`, `getSubtechniques()`, `getParentTechnique()`, `getMitigations()` |
| `TacticImpl` | Tactics | `getTechniques()` |
| `GroupImpl` | Groups/Intrusion Sets | `getTechniques()`, `getAssociatedSoftware()`, `getAssociatedCampaigns()` |
| `CampaignImpl` | Campaigns | `getTechniques()`, `getSoftware()`, `getAttributedTo()` |
| `MalwareImpl` | Malware | `getTechniques()`, `getAssociatedGroups()` |
| `ToolImpl` | Tools | `getTechniques()`, `getAssociatedGroups()` |
| `MitigationImpl` | Mitigations | `getTechniques()` |

## Schema Documentation

### STIX Domain Objects (SDO)

Auto-generated documentation for all ATT&CK object schemas:

- **[Techniques](./schemas/sdo/technique.schema)** - Attack patterns including sub-techniques
- **[Tactics](./schemas/sdo/tactic.schema)** - Adversary tactical goals
- **[Groups](./schemas/sdo/group.schema)** - Threat actor groups and intrusion sets
- **[Malware](./schemas/sdo/malware.schema)** - Malicious software
- **[Tools](./schemas/sdo/tool.schema)** - Legitimate software used by adversaries
- **[Campaigns](./schemas/sdo/campaign.schema)** - Coordinated attack campaigns
- **[Mitigations](./schemas/sdo/mitigation.schema)** - Defensive measures and controls

### STIX Relationship Objects (SRO)

- **[Relationships](./schemas/sro/relationship.schema)** - All relationship types and their constraints

### STIX Meta Objects (SMO)

- **[Marking Definitions](./schemas/smo/marking-definition.schema)** - Data marking and sharing constraints

### Additional Object Types

- **[Data Sources](./schemas/sdo/data-source.schema)** - Detection data categories
- **[Data Components](./schemas/sdo/data-component.schema)** - Specific detection data types
- **[Analytics](./schemas/sdo/analytic.schema)** - Detection analytics and rules
- **[Assets](./schemas/sdo/asset.schema)** - Infrastructure and system assets

## Configuration Reference

### Data Source Options

Complete configuration parameters for all data source types:

| Source Type | Configuration | Description |
|-------------|---------------|-------------|
| `attack` | `domain`, `version` | Official MITRE ATT&CK repository |
| `file` | `file`, `parsingMode` | Local STIX bundle files |
| `url` | `url`, `parsingMode` | Remote STIX bundle URLs |
| `taxii` | `server`, `collection`, `credentials` | TAXII 2.1 servers *(coming soon)* |

**[View complete configuration reference →](./configuration)**

## Error Reference

### Error Types and Handling

Comprehensive error codes, meanings, and resolution strategies:

| Error Type | Description | Common Causes |
|------------|-------------|---------------|
| `ValidationError` | Schema validation failures | Invalid STIX data, missing required fields |
| `DataSourceError` | Data source access issues | Network failures, file not found, authentication |
| `RelationshipError` | Broken object relationships | Missing target objects, invalid references |
| `ParsingError` | Data parsing failures | Malformed JSON, unsupported formats |

**[View complete error reference →](./errors)**

## Type Definitions

### TypeScript Interfaces

All exported TypeScript types and interfaces:

```typescript
// Core types
import type {
    AttackDataModel,
    DataSource,
    DataSourceOptions,
    ParsingMode
} from '@mitre-attack/attack-data-model';

// Schema types
import type {
    Technique,
    Tactic,
    Group,
    Campaign,
    Malware,
    Tool,
    Mitigation,
    Relationship
} from '@mitre-attack/attack-data-model';

// Implementation class types
import type {
    TechniqueImpl,
    TacticImpl,
    GroupImpl,
    CampaignImpl,
    MalwareImpl,
    ToolImpl,
    MitigationImpl
} from '@mitre-attack/attack-data-model';
```

## Version Compatibility

### ATT&CK Specification Versions

- **Current**: 3.3.0
- **Supported**: 3.0.0+
- **Deprecated**: 2.x (legacy support only)

### Library Versions

- **Node.js**: 20.0.0+
- **TypeScript**: 4.5.0+
- **Zod**: 3.20.0+

**[View complete compatibility matrix →](../explanation/compatibility)**

## Quick Reference

### Essential Imports

```typescript
// Main entry points
import { registerDataSource, loadDataModel } from '@mitre-attack/attack-data-model';

// Classes
import { DataSource, AttackDataModel } from '@mitre-attack/attack-data-model';

// Schemas
import { techniqueSchema, tacticSchema } from '@mitre-attack/attack-data-model';

// Types
import type { Technique, Tactic } from '@mitre-attack/attack-data-model';
```

### Common Patterns

```typescript
// Load ATT&CK data
const dataSource = new DataSource({ source: 'attack', domain: 'enterprise-attack' });
const uuid = await registerDataSource(dataSource);
const attackDataModel = loadDataModel(uuid);

// Validate data
const validTechnique = techniqueSchema.parse(techniqueData);

// Navigate relationships
const tactics = technique.getTactics();
const subtechniques = technique.getSubtechniques();
```

## Reference Usage

This reference documentation follows these principles:

- **Complete**: Every public API method and property is documented
- **Precise**: Exact parameter types, return values, and constraints
- **Systematic**: Consistent organization and formatting
- **Current**: Auto-generated from source code when possible

**Looking for something specific?** Use the search functionality or check the relevant section above.

---

**Need more context?** Visit the [Explanation](../explanation/) section for design rationale and architectural details.
