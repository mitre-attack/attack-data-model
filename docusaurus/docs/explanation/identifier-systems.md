# Identifier Systems

**Understanding ATT&CK's multiple identification schemes and their purposes**

ATT&CK employs three distinct identifier systems, each serving different purposes and use cases. This multi-layered approach often confuses newcomers who expect a single, simple identifier scheme. Understanding why multiple identifiers exist, how they interact, and when to use each type is crucial for effective ATT&CK data processing and integration.

## The Identification Challenge

### Competing Requirements

ATT&CK must serve multiple audiences with conflicting identification needs:

#### Human Communication

Security analysts need memorable, meaningful identifiers for documentation, reports, and discussions:

- "We observed T1055 (Process Injection) being used by APT1"
- "Our detection rules cover techniques T1055.001 through T1055.012"

#### Machine Processing

Applications need globally unique, collision-resistant identifiers for reliable data processing:

- Database primary keys and foreign key relationships
- Cross-system references and data synchronization
- Programmatic lookups and relationship traversal

#### Standards Compliance

STIX 2.1 requires specific identifier formats and uniqueness guarantees:

- UUID-based identifiers for global uniqueness
- Namespace prefixes for object type identification
- Referential integrity across STIX bundles

### The Impossibility of One Perfect Identifier

No single identifier scheme can satisfy all these requirements simultaneously:

- **Human-readable IDs** (like "T1055") are meaningful but not globally unique
- **Globally unique IDs** (like UUIDs) are collision-resistant but not memorable
- **Sequential integers** are simple but create coordination problems across systems
- **Hash-based IDs** are deterministic but not human-interpretable

**Solution**: Use multiple complementary identifier systems, each optimized for specific use cases.

## The Three Identifier Systems

### 1. STIX IDs: The Primary Identity System

**Format**: `{object-type}--{uuid}`
**Example**: `attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298`

#### Purpose and Characteristics

**Primary identifiers**: Every ATT&CK object has exactly one STIX ID that serves as its canonical identity.

**Global uniqueness**: UUIDs ensure no identifier collisions across all ATT&CK datasets, organizations, and time periods.

**Standards compliance**: Required by STIX 2.1 specification for referential integrity and cross-system compatibility.

**Referential integrity**: All object references in relationships use STIX IDs:

```json
{
    "type": "relationship",
    "relationship_type": "subtechnique-of",
    "source_ref": "attack-pattern--sub-technique-stix-id",
    "target_ref": "attack-pattern--parent-technique-stix-id"
}
```

#### When to Use STIX IDs

**✅ Recommended for**:

- Programmatic object lookups and storage
- Database primary keys and foreign keys
- API endpoints and data synchronization
- Internal application logic and caching

**❌ Not recommended for**:

- User interfaces and human communication
- Documentation and report writing
- Manual analysis and investigation workflows

#### Working with STIX IDs

```typescript
// ✅ Correct usage - programmatic lookup
const technique = attackDataModel.getTechniqueById(
    "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298"
);

// ❌ Avoid - hard to read and maintain
const displayName = "Technique attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298";
```

### 2. ATT&CK IDs: The Human-Readable System  

**Format**: Varies by object type
**Examples**: `T1055`, `G0006`, `M1038`, `TA0002`

#### Format Patterns by Object Type

| Object Type | Format | Example | Description |
|-------------|--------|---------|-------------|
| Technique | `Txxxx` | `T1055` | Four-digit numeric sequence |
| Sub-technique | `Txxxx.yyy` | `T1055.001` | Parent technique + sub-technique suffix |
| Tactic | `TAxxxx` | `TA0002` | "TA" prefix + four-digit number |
| Group | `Gxxxx` | `G0006` | "G" prefix + four-digit number |
| Software | `Sxxxx` | `S0154` | "S" prefix + four-digit number |
| Mitigation | `Mxxxx` | `M1038` | "M" prefix + four-digit number |
| Data Source | `DSxxxx` | `DS0017` | "DS" prefix + four-digit number |
| Data Component | `DCxxxx` | `DC0024` | "DC" prefix + four-digit number |

#### Storage as External References

ATT&CK IDs are stored in the first external reference, not as primary properties:

```json
{
    "id": "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
    "external_references": [
        {
            "source_name": "mitre-attack",
            "external_id": "T1055",
            "url": "https://attack.mitre.org/techniques/T1055"
        }
    ]
}
```

**Design rationale**: This approach maintains STIX compliance while preserving human-readable identifiers as metadata.

#### Uniqueness Limitations

**Important**: ATT&CK IDs are not guaranteed to be globally unique.

**Historical collisions**: Legacy mitigations (pre-v5, July 2019) may share ATT&CK IDs with techniques due to deprecated 1:1 relationships.

**Matrix sharing**: Matrices within the same domain use identical ATT&CK IDs (e.g., both Enterprise matrices use "enterprise-attack").

**Filtering strategy**:

```typescript
// Filter out deprecated objects to avoid ID collisions
const currentTechniques = techniques.filter(t => 
    !t.revoked && !t.x_mitre_deprecated
);
```

#### When to Use ATT&CK IDs

**✅ Recommended for**:

- User interfaces and documentation
- Reports and human communication
- Manual analysis workflows
- External tool integration where human readability matters

**❌ Not recommended for**:

- Database primary keys (use STIX IDs)
- Programmatic object references (use STIX IDs)
- Critical system integration where uniqueness is required

### 3. External Reference IDs: The Integration System

**Format**: Varies by external framework
**Examples**: `NIST-Mobile-ID`, `CAPEC-123`

#### Purpose and Usage

External reference IDs link ATT&CK objects to concepts in other security frameworks and standards.

**Common external frameworks**:

- **NIST Mobile Threat Catalogue**: Found on Mobile domain techniques
- **CAPEC (Common Attack Pattern Enumeration and Classification)**: Found on Enterprise techniques
- **CVE references**: Found on software objects for specific vulnerabilities

#### Storage Pattern

Multiple external references can exist beyond the primary ATT&CK ID:

```json
{
    "external_references": [
        {
            "source_name": "mitre-attack",
            "external_id": "T1055",
            "url": "https://attack.mitre.org/techniques/T1055"
        },
        {
            "source_name": "capec", 
            "external_id": "CAPEC-640",
            "url": "https://capec.mitre.org/data/definitions/640.html"
        }
    ]
}
```

#### When to Use External Reference IDs

**✅ Recommended for**:

- Cross-framework mapping and correlation
- Integration with other security standards
- Research that spans multiple threat intelligence frameworks
- Compliance reporting that requires framework cross-references

## Identifier Resolution Patterns

### Lookup by ATT&CK ID

The most common query pattern involves finding objects by human-readable ATT&CK ID:

```typescript
// Manual approach - searching external references
const technique = attackDataModel.techniques.find(t => 
    t.external_references?.[0]?.external_id === "T1055" &&
    t.external_references?.[0]?.source_name === "mitre-attack"
);

// Library approach - optimized lookup
const technique = attackDataModel.getTechniqueByAttackId("T1055");
```

**Performance consideration**: ATT&CK ID lookups require searching external references arrays, which is less efficient than STIX ID lookups. Libraries typically build indexes to optimize this pattern.

### Bidirectional Conversion

Applications often need to convert between identifier types:

```typescript
// ATT&CK ID → STIX ID
const stixId = attackDataModel.getStixIdFromAttackId("T1055");

// STIX ID → ATT&CK ID  
const attackId = attackDataModel.getAttackIdFromStixId(
    "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298"
);

// Object → Both IDs
const technique = attackDataModel.getTechniqueByAttackId("T1055");
console.log(`STIX ID: ${technique.id}`);
console.log(`ATT&CK ID: ${technique.getAttackId()}`);
```

### Relationship Reference Resolution

Relationships use STIX IDs, but applications may need to display ATT&CK IDs:

```json
{
    "type": "relationship",
    "relationship_type": "uses",
    "source_ref": "intrusion-set--stix-id-for-apt1", 
    "target_ref": "attack-pattern--stix-id-for-t1055"
}
```

```typescript
// Display relationship with human-readable IDs
const relationship = /* ... */;
const group = attackDataModel.getGroupById(relationship.source_ref);
const technique = attackDataModel.getTechniqueById(relationship.target_ref);

console.log(`${group.getAttackId()} uses ${technique.getAttackId()}`);
// Output: "G0006 uses T1055"
```

## Identifier Evolution and Management

### ID Assignment Process

#### STIX IDs

- **Generated**: Automatically created using UUID generation algorithms
- **Immutable**: Never change once assigned, even when object content is updated
- **Globally coordinated**: UUID algorithms ensure uniqueness without central coordination

#### ATT&CK IDs  

- **Curated**: Manually assigned by MITRE ATT&CK team following semantic patterns
- **Mostly stable**: Generally preserved across object updates, but may change in exceptional circumstances
- **Centrally coordinated**: MITRE maintains the canonical assignment registry

### Version Management Impact

Identifier behavior during object evolution:

#### Content Updates

```json
{
    "id": "attack-pattern--unchanged-stix-id",
    "external_references": [
        {
            "external_id": "T1055", // ATT&CK ID typically unchanged
            "source_name": "mitre-attack"
        }
    ],
    "x_mitre_version": "2.0", // Version increments
    "modified": "2023-06-15T10:30:00.000Z" // Timestamp updates
}
```

#### Object Replacement (Revocation)

When objects are substantially restructured, they may be revoked and replaced:

```json
// Old object
{
    "id": "attack-pattern--old-stix-id",
    "revoked": true
}

// Replacement relationship
{
    "type": "relationship",
    "relationship_type": "revoked-by",
    "source_ref": "attack-pattern--old-stix-id",
    "target_ref": "attack-pattern--new-stix-id"
}
```

**Impact**: Both STIX and ATT&CK IDs may change during revocation, requiring applications to follow replacement chains.

## Common Identifier Mistakes

### 1. Using ATT&CK IDs as Primary Keys

**❌ Problematic**:

```typescript
// ATT&CK IDs are not guaranteed unique
const techniqueCache = new Map<string, Technique>();
technique.forEach(t => {
    techniqueCache.set(t.getAttackId(), t); // May overwrite due to collisions
});
```

**✅ Correct**:

```typescript
// Use STIX IDs for reliable uniqueness
const techniqueCache = new Map<string, Technique>();
techniques.forEach(t => {
    techniqueCache.set(t.id, t); // STIX IDs are guaranteed unique
});
```

### 2. Hard-coding STIX IDs

**❌ Problematic**:

```typescript
// STIX IDs are not meaningful to humans
if (technique.id === "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298") {
    // This is unreadable and unmaintainable
}
```

**✅ Correct**:

```typescript
// Use ATT&CK IDs for human-readable logic
if (technique.getAttackId() === "T1055") {
    // Clear intent and maintainable
}
```

### 3. Assuming ATT&CK ID Stability

**❌ Problematic**:

```typescript
// Assuming ATT&CK IDs never change
const savedAttackId = "T1055";
// Later... (may fail if ID was reassigned)
const technique = getTechniqueByAttackId(savedAttackId);
```

**✅ Better**:

```typescript
// Store STIX IDs for long-term reliability  
const savedStixId = technique.id;
// Later... (guaranteed to work unless object is revoked)
const technique = getTechniqueById(savedStixId);
```

### 4. Ignoring External Reference Structure

**❌ Problematic**:

```typescript
// Assuming ATT&CK ID is always first external reference
const attackId = technique.external_references[0].external_id;
```

**✅ Correct**:

```typescript
// Properly validate external reference structure
const attackRef = technique.external_references?.find(ref =>
    ref.source_name === "mitre-attack" && ref.external_id
);
const attackId = attackRef?.external_id;
```

## Best Practices for Identifier Management

### 1. Use the Right Identifier for the Task

**Storage and processing**: Use STIX IDs
**User interfaces and communication**: Use ATT&CK IDs  
**Cross-framework integration**: Use external reference IDs

### 2. Build Lookup Indexes

```typescript
class AttackDataModel {
    private stixToAttackId = new Map<string, string>();
    private attackIdToStix = new Map<string, string>();
    
    constructor(techniques: Technique[]) {
        techniques.forEach(technique => {
            const attackId = this.extractAttackId(technique);
            if (attackId) {
                this.stixToAttackId.set(technique.id, attackId);
                this.attackIdToStix.set(attackId, technique.id);
            }
        });
    }
    
    getTechniqueByAttackId(attackId: string): Technique | undefined {
        const stixId = this.attackIdToStix.get(attackId);
        return stixId ? this.getTechniqueById(stixId) : undefined;
    }
}
```

### 3. Handle Identifier Edge Cases

```typescript
function safeGetAttackId(object: AttackObject): string | undefined {
    // Handle objects without ATT&CK IDs (like relationships)
    const attackRef = object.external_references?.find(ref =>
        ref.source_name === "mitre-attack" && ref.external_id
    );
    
    return attackRef?.external_id;
}
```

### 4. Plan for Identifier Evolution

```typescript
// Design APIs that can adapt to identifier changes
interface TechniqueReference {
    stixId: string;           // Primary, stable identifier
    attackId?: string;        // Secondary, may change
    lastValidated: Date;      // Track when reference was verified
}
```

---

## The Multi-Identifier Philosophy

ATT&CK's multiple identifier systems reflect the reality that different use cases have fundamentally different requirements. Rather than forcing a compromise that serves no use case well, the framework provides specialized identifiers optimized for specific scenarios:

- **STIX IDs** for reliable machine processing
- **ATT&CK IDs** for effective human communication  
- **External reference IDs** for framework integration

Understanding when and how to use each identifier system is essential for building robust, maintainable ATT&CK applications that serve both human and machine users effectively.

**Next**: Explore the rationale behind **[Versioning Philosophy](./versioning-philosophy)** and how ATT&CK manages evolution across multiple dimensions.
