# ATT&CK Data Model Overview

**A comprehensive TypeScript library for MITRE ATT&CK data**

This page provides a high-level overview of the ATT&CK Data Model library architecture, its core concepts, and how all the pieces fit together.

## What is the ATT&CK Data Model?

The ATT&CK Data Model (ADM) is a TypeScript library that provides type-safe, programmatic access to MITRE ATT&CK datasets. It bridges the gap between raw STIX 2.1 data and developer-friendly TypeScript objects.

### Core Value Proposition

- **🔒 Type Safety**: Full TypeScript support prevents runtime errors
- **✅ STIX 2.1 Compliance**: Maintains standards compliance while adding usability
- **🔗 Relationship Navigation**: Intuitive methods for exploring ATT&CK connections
- **📊 Multi-Domain Support**: Works with Enterprise, Mobile, and ICS domains
- **🚀 Performance Optimized**: Designed for both memory efficiency and query speed

## Architecture Overview

```
┌─────────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Data Sources      │    │   Validation     │    │   Object Model      │
│                     │    │                  │    │                     │
│ • GitHub Repository │───▶│ • Zod Schemas    │───▶│ • ES6 Classes       │
│ • Local Files       │    │ • STIX 2.1 Spec  │    │ • Type Definitions  │
│ • Custom URLs       │    │ • ATT&CK Rules   │    │ • Relationship APIs │
│ • TAXII Servers     │    │                  │    │                     │
└─────────────────────┘    └──────────────────┘    └─────────────────────┘
                                    │
                           ┌──────────────────┐
                           │  AttackDataModel │
                           │                  │
                           │ • Central Hub    │
                           │ • Collections    │
                           │ • Relationships  │
                           └──────────────────┘
```

## Core Components

### 1. Data Sources (`src/data-sources/`)

Handles loading ATT&CK data from various sources:

- **attack**: Official MITRE ATT&CK GitHub repository
- **file**: Local JSON files containing STIX 2.1 bundles
- **url**: Remote URLs serving STIX 2.1 content
- **taxii**: TAXII 2.1 servers (planned)

### 2. Validation Layer (`src/schemas/`)

Ensures data integrity through Zod schemas:

- **STIX 2.1 Base**: Foundation schemas following STIX specification
- **ATT&CK Extensions**: Custom fields and relationships specific to ATT&CK
- **Refinements**: Advanced validation rules for ATT&CK-specific constraints

### 3. Object Model (`src/classes/`)

Provides developer-friendly interfaces:

- **Implementation Classes**: ES6 classes for each ATT&CK object type
- **Relationship Methods**: Navigate connections between objects intuitively
- **Type Safety**: Full TypeScript support with compile-time checking

### 4. AttackDataModel (`src/classes/attack-data-model.ts`)

Central hub containing all ATT&CK objects with automatic relationship mapping.

## Object Type Hierarchy

### STIX Domain Objects (SDOs)

Core ATT&CK concepts represented as STIX objects:

| ATT&CK Concept | STIX Type | Custom? | Description |
|----------------|-----------|---------|-------------|
| **Technique** | `attack-pattern` | No | Methods adversaries use to achieve goals |
| **Tactic** | `x-mitre-tactic` | Yes | Adversary tactical objectives |
| **Group** | `intrusion-set` | No | Adversary organizations |
| **Software** | `malware`/`tool` | No | Adversary tools and malware |
| **Mitigation** | `course-of-action` | No | Defensive countermeasures |
| **Campaign** | `campaign` | No | Sets of adversary activities |
| **Data Source** | `x-mitre-data-source` | Yes | Detection data categories |
| **Matrix** | `x-mitre-matrix` | Yes | Organizational structure |

### STIX Relationship Objects (SROs)

Connections between ATT&CK objects:

- **uses**: Groups/campaigns/software using techniques
- **mitigates**: Mitigations addressing techniques
- **subtechnique-of**: Sub-technique to parent relationships
- **detects**: Data components detecting techniques

## Data Flow

### Registration Process

```typescript
// 1. Create data source configuration
const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1'
});

// 2. Register and validate data
const uuid = await registerDataSource(dataSource);

// 3. Load typed data model
const attackDataModel = loadDataModel(uuid);
```

### Validation Pipeline

1. **Raw STIX Data**: JSON from data source
2. **Schema Validation**: Zod schemas ensure STIX compliance
3. **Refinement Checks**: ATT&CK-specific validation rules
4. **Object Creation**: Conversion to TypeScript classes
5. **Relationship Mapping**: Automatic linking between objects

### Relationship Navigation

```typescript
const technique = attackDataModel.techniques[0];

// Navigate relationships using intuitive methods
const tactics = technique.getTactics();        // Associated tactics
const groups = technique.getGroups();          // Groups using this technique
const mitigations = technique.getMitigations(); // Available mitigations
const parent = technique.getParentTechnique();  // Parent (if sub-technique)
```

## Multi-Domain Support

The library supports all three ATT&CK domains:

### Enterprise Domain (`enterprise-attack`)

- Traditional IT environments
- Most comprehensive technique coverage
- Extensive group and software attribution

### Mobile Domain (`mobile-attack`)

- Mobile device threats
- Platform-specific techniques
- App store and mobile-specific tactics

### ICS Domain (`ics-attack`)

- Industrial Control Systems
- Operational Technology focus
- Critical infrastructure contexts

## Extensibility

### Custom Fields

Extend ATT&CK objects with custom properties while maintaining compliance:

```typescript
const customTechniqueSchema = techniqueSchema.extend({
    custom_severity: z.number().optional(),
    custom_tags: z.array(z.string()).optional()
});
```

### Custom Refinements

Apply additional validation rules:

```typescript
const refinedSchema = customTechniqueSchema.check((data) => {
    // Custom validation logic
    return data.custom_severity <= 10;
});
```

## Performance Characteristics

### Memory Usage

- **Efficient Object Storage**: Optimized class instances
- **Lazy Relationship Loading**: Relationships computed on demand
- **Configurable Caching**: Balance memory vs. performance

### Query Performance

- **Direct Property Access**: No query parsing overhead
- **Pre-computed Relationships**: Fast navigation between objects
- **TypeScript Optimization**: Compile-time optimizations

## Standards Compliance

### STIX 2.1 Foundation

- Full compliance with STIX 2.1 specification
- Support for all STIX Domain and Relationship Objects
- Extensible through STIX custom properties pattern

### ATT&CK Specification

- Implements ATT&CK Specification 3.3.0
- Support for all ATT&CK object types and relationships
- Backwards compatibility with previous versions

## Integration Patterns

### Application Integration

- Import as npm package
- TypeScript-first development experience
- Works with any JavaScript framework

### Data Pipeline Integration

- Stream processing support
- Batch analysis capabilities
- Export to various formats

### Security Tool Integration

- SIEM integration patterns
- Threat hunting query generation
- Detection rule development

---

**Ready to dive deeper?** Explore our comprehensive documentation:

- **[Tutorials](./tutorials/)** - Learn by building
- **[How-to Guides](./how-to-guides/)** - Solve specific problems
- **[Reference](./reference/)** - Complete API documentation
- **[Explanation](./explanation/)** - Understand the design
