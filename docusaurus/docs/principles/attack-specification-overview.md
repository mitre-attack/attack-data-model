import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# ATT&CK Specification Overview

<WorkInProgressNotice />

**Understanding the structure and purpose of the ATT&CK specification**

The ATT&CK specification defines the formal structure, semantics, and constraints that govern how MITRE ATT&CK data is represented, validated, and consumed. Understanding the specification's design philosophy and architecture is crucial for working effectively with ATT&CK data and building robust applications that leverage the ATT&CK framework.

## What is the ATT&CK Specification?

The ATT&CK specification is a codified expression of the concepts outlined in the [MITRE ATT&CK Philosophy Paper](https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf), which is in turn built atop the [STIX 2.1 specification](https://oasis-open.github.io/cti-documentation/resources#stix-21-specification). Rather than creating a completely new data format, the specification extends STIX 2.1 with ATT&CK-specific object types, properties, and validation rules.

### The Specification Hierarchy

```
STIX 2.1 Specification (OASIS Standard)
    │
    ├── Base STIX objects and properties
    ├── Standard relationship patterns
    ├── Extension mechanisms
    │
    └── ATT&CK Specification Extensions
        │
        ├── Custom object types (x-mitre-*)
        ├── Custom properties (x_mitre_*)
        ├── Custom relationship types
        └── ATT&CK business rules and validation
```

**Key insight**: The ATT&CK specification is not a replacement for STIX—it's a disciplined extension that maintains full STIX compliance while adding the semantic richness needed to represent adversary tactics, techniques, and procedures.

## Design Philosophy

### Standards-First Approach

The specification prioritizes standards compliance over custom optimization.
This design choice reflects several strategic decisions:

#### Interoperability Over Convenience

By extending rather than replacing STIX, ATT&CK data can be processed by existing STIX-compliant tools and workflows.

#### Long-term Sustainability Over Short-term Simplicity

Standards provide governance, stability, and community support that proprietary formats cannot match. The specification accepts some complexity in exchange for long-term viability.

#### Community Ecosystem Over Isolated Solutions

STIX compliance enables ATT&CK data to integrate naturally with threat intelligence platforms, security orchestration systems, and analyst tools that already support STIX.

### Semantic Richness Through Extensions

ATT&CK concepts require more specificity than generic STIX objects provide. The specification achieves this through disciplined extensions:

#### Custom Object Types

Objects like `x-mitre-tactic`, `x-mitre-matrix`, and `x-mitre-data-source` represent ATT&CK concepts that don't map cleanly to existing STIX types.

#### Custom Properties

Properties like `x_mitre_platforms`, `x_mitre_is_subtechnique`, and `x_mitre_attack_spec_version` add domain-specific metadata to standard STIX objects.

#### Custom Relationships

Relationship types like `subtechnique-of`, `detects`, and `mitigates` capture ATT&CK-specific associations between objects.

## Architectural Implications

### Object Identity Strategy

The specification employs a dual-identity approach that balances STIX requirements with ATT&CK usability:

#### Primary Identifiers (STIX IDs)

Every object has a globally unique STIX ID (e.g., `attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298`) that ensures referential integrity across systems.

#### Human-Readable Identifiers (ATT&CK IDs)

Most objects also have human-readable ATT&CK IDs (e.g., `T1055`) stored as external references for documentation and communication.

**Design rationale**: This dual approach supports both machine processing (via STIX IDs) and human comprehension (via ATT&CK IDs) without compromising either use case.

### Relationship Architecture

The specification models relationships as explicit STIX relationship objects rather than embedded references:

```json
// ❌ Embedded reference approach
{
    "type": "attack-pattern",
    "tactics": ["TA0001", "TA0002"]
}

// ✅ STIX relationship approach
{
    "type": "relationship",
    "relationship_type": "uses",
    "source_ref": "attack-pattern--12345...",
    "target_ref": "x-mitre-tactic--67890..."
}
```

**Benefits**:

- Relationships can carry their own metadata (descriptions, relationship type)
- Bidirectional navigation is naturally supported
- Relationship evolution doesn't require object schema changes

### Extension Mechanisms

The specification defines three primary extension patterns:

#### 1. Custom Object Types

```json
{
    "type": "x-mitre-tactic",
    "id": "x-mitre-tactic--78b23412-0651-46d7-a540-170a1ce8bd5a",
    "x_mitre_shortname": "execution"
}
```

Custom types follow the STIX Domain Object pattern but represent concepts unique to ATT&CK.

#### 2. Custom Properties on Standard Objects

```json
{
    "type": "attack-pattern",
    "id": "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
    "x_mitre_platforms": ["Windows", "Linux"],
    "x_mitre_is_subtechnique": false
}
```

Standard STIX objects are extended with ATT&CK-specific properties using the `x_mitre_` namespace.

#### 3. Custom Relationship Types

```json
{
    "type": "relationship",
    "relationship_type": "subtechnique-of",
    "source_ref": "attack-pattern-- <sub-technique-id>",
    "target_ref": "attack-pattern-- <parent-technique-id>"
}
```

New relationship types capture ATT&CK-specific associations not covered by standard STIX relationships.

## Validation Philosophy

### Layered Validation Strategy

The specification implements validation through multiple layers:

#### 1. STIX Base Compliance

All objects must conform to STIX 2.1 structural requirements (required fields, data types, etc.).

#### 2. ATT&CK Extension Validation

Custom properties and objects must conform to ATT&CK-specific schemas and constraints.

#### 3. ATT&CK Business Rules

Domain-specific rules enforce requirements like ATT&CK ID formats, tactic associations, and relationship constraints.

#### 4. Cross-Object Validation

References between objects must be valid and consistent (e.g., subtechnique parents must exist).

### Strict vs. Relaxed Modes

The specification supports two validation philosophies:

#### Strict Mode

**Philosophy**: "Data integrity is paramount—invalid data must be rejected completely"

- All objects must pass all validation layers
- Processing aborts on any validation failure
- Appropriate for production systems requiring data quality guarantees

#### Relaxed Mode

**Philosophy**: "Partial data is better than no data—log errors but continue processing"

- Invalid objects are logged but not rejected
- Processing continues with valid objects only
- Appropriate for research environments and data migration scenarios

## Evolution Patterns

### Version Management Strategy

The specification uses three distinct versioning dimensions:

#### STIX Version (`spec_version`)

Tracks compliance with STIX specification versions (managed by OASIS).

#### ATT&CK Specification Version (`x_mitre_attack_spec_version`)

Tracks compatibility with ATT&CK specification extensions (managed by MITRE).

#### Object Version (`x_mitre_version`)

Tracks semantic changes to individual object content (managed by MITRE).

**Design rationale**: This multi-dimensional approach allows independent evolution of STIX standards, ATT&CK specification features, and individual object content.

### Backward Compatibility Strategy

The specification maintains backward compatibility through:

#### Additive Changes

New fields and object types are added without removing existing ones.

#### Deprecation Warnings

Obsolete features are marked deprecated before removal, providing migration time.

#### Version-Aware Processing

Consuming applications can adapt behavior based on specification version.

#### Legacy Support

Deprecated features remain functional until formal removal in major version updates.

## Working with the Specification

### Understanding Specification Documents

The specification exists in multiple forms:

#### Formal Schema Definitions

Zod schemas in the ATT&CK Data Model library provide executable validation rules.

#### Reference Documentation

Auto-generated schema documentation describes object structures and constraints.

#### Philosophy Documents

MITRE ATT&CK papers explain the conceptual foundations behind specification decisions.

#### Implementation Examples

Working code examples demonstrate specification usage patterns.

### Common Specification Misconceptions

#### "ATT&CK is just JSON files"

**Reality**: ATT&CK is a structured specification with validation rules, semantic constraints, and evolution patterns.

#### "Custom properties break STIX compliance"

**Reality**: ATT&CK uses STIX-defined extension mechanisms to maintain full standards compliance. We currently use the STIX 2.0 compliant method of extending STIX, but plan to fully use STIX 2.1's extension definitions in the future.

#### "ATT&CK IDs are primary identifiers"

**Reality**: STIX IDs are primary identifiers; ATT&CK IDs are human-readable aliases stored as external references.

#### "The specification is static"

**Reality**: The specification evolves continuously with new object types, properties, and validation rules.

---
