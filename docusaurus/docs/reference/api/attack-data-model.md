# AttackDataModel

**Main class containing all ATT&CK objects with automatic relationship mapping**

The `AttackDataModel` class is the central data structure that holds all ATT&CK objects and provides access to them through typed properties. It automatically processes relationships between objects and provides convenient access methods.

## Constructor

```typescript
new AttackDataModel(uuid: string, attackObjects: AttackObject[])
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | `string` | Unique identifier for this data model instance |
| `attackObjects` | `AttackObject[]` | Array of validated ATT&CK objects to populate the model |

### Example

```typescript
import { AttackDataModel } from '@mitre-attack/attack-data-model';

// Usually created internally by loadDataModel()
const attackDataModel = new AttackDataModel(uuid, validatedObjects);
```

## Properties

### Object Collections

All ATT&CK objects are organized into typed arrays accessible as properties:

| Property | Type | Description |
|----------|------|-------------|
| `techniques` | `TechniqueImpl[]` | All techniques and sub-techniques |
| `tactics` | `TacticImpl[]` | All tactics (adversary goals) |
| `groups` | `GroupImpl[]` | All threat actor groups |
| `campaigns` | `CampaignImpl[]` | All attack campaigns |
| `malware` | `MalwareImpl[]` | All malware software |
| `tools` | `ToolImpl[]` | All legitimate tools used maliciously |
| `mitigations` | `MitigationImpl[]` | All defensive measures |
| `relationships` | `RelationshipImpl[]` | All relationships between objects |
| `matrices` | `MatrixImpl[]` | All ATT&CK matrices |
| `dataSources` | `DataSourceImpl[]` | All data sources *(deprecated)* |
| `dataComponents` | `DataComponentImpl[]` | All data components *(deprecated)* |
| `assets` | `AssetImpl[]` | All targeted assets |
| `detectionStrategies` | `DetectionStrategyImpl[]` | All detection strategies |
| `analytics` | `AnalyticImpl[]` | All analytics |
| `logSources` | `LogSourceImpl[]` | All log sources |

### Example Access

```typescript
const attackDataModel = loadDataModel(uuid);

// Access techniques
console.log(`Loaded ${attackDataModel.techniques.length} techniques`);

// Access tactics
const initialAccess = attackDataModel.tactics.find(t =>
    t.x_mitre_shortname === 'initial-access'
);

// Access groups
const apt1 = attackDataModel.groups.find(g =>
    g.external_references[0].external_id === 'G0006'
);
```

## Methods

### getUuid()

Returns the unique identifier for this data model instance.

```typescript
getUuid(): string
```

**Returns**: The UUID assigned during data source registration.

**Example**:

```typescript
const modelId = attackDataModel.getUuid();
console.log(`Model ID: ${modelId}`);
```

### getObjectById()

Retrieves any ATT&CK object by its STIX ID.

```typescript
getObjectById(id: string): AttackObject | undefined
```

**Parameters**:

- `id` - STIX identifier (e.g., `"attack-pattern--12345678-..."`)

**Returns**: The object with matching STIX ID, or `undefined` if not found.

**Example**:

```typescript
const technique = attackDataModel.getObjectById(
    'attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298'
);

if (technique) {
    console.log(`Found: ${technique.name}`);
}
```

### getObjectByAttackId()

Retrieves any ATT&CK object by its ATT&CK ID.

```typescript
getObjectByAttackId(attackId: string): AttackObject | undefined
```

**Parameters**:

- `attackId` - ATT&CK identifier (e.g., `"T1055"`, `"G0006"`, `"S0001"`)

**Returns**: The object with matching ATT&CK ID, or `undefined` if not found.

**Example**:

```typescript
const technique = attackDataModel.getObjectByAttackId('T1055');
const group = attackDataModel.getObjectByAttackId('G0006');
const software = attackDataModel.getObjectByAttackId('S0001');

if (technique) {
    console.log(`T1055: ${technique.name}`);
}
```

### getAllObjects()

Returns all objects in the data model as a flat array.

```typescript
getAllObjects(): AttackObject[]
```

**Returns**: Array containing all objects from all collections.

**Example**:

```typescript
const allObjects = attackDataModel.getAllObjects();
console.log(`Total objects: ${allObjects.length}`);

// Count by type
const counts = allObjects.reduce((acc, obj) => {
    acc[obj.type] = (acc[obj.type] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

console.log('Object counts:', counts);
```

## Relationship Processing

The `AttackDataModel` automatically processes all relationship objects during construction to enable convenient navigation between related objects.

### Automatic Relationship Mapping

When the data model is created, it:

1. **Indexes all relationships** by source and target IDs
2. **Creates bidirectional mappings** where appropriate
3. **Populates navigation methods** on implementation classes
4. **Validates relationship integrity** in strict mode

### Relationship Types Processed

| Relationship | Description | Navigation Methods |
|--------------|-------------|-------------------|
| `uses` | Groups/Software → Techniques | `getTechniques()`, `getSoftware()` |
| `mitigates` | Mitigations → Techniques | `getMitigations()`, `getTechniques()` |
| `subtechnique-of` | Sub-techniques → Parent | `getSubtechniques()`, `getParentTechnique()` |
| `attributed-to` | Campaigns → Groups | `getAttributedTo()`, `getAssociatedCampaigns()` |
| `targets` | Techniques → Assets | `getTargets()`, `getTargetingTechniques()` |

### Example: Relationship Navigation

```typescript
// Start with a technique
const technique = attackDataModel.techniques.find(t =>
    t.external_references[0].external_id === 'T1055'
);

if (technique) {
    // Navigate to related objects
    const tactics = technique.getTactics();
    const mitigations = technique.getMitigations();
    const subtechniques = technique.getSubtechniques();

    console.log(`${technique.name} is used for ${tactics.length} tactics`);
    console.log(`${mitigations.length} mitigations available`);
    console.log(`${subtechniques.length} sub-techniques defined`);
}
```

## Data Integrity

### Validation

The `AttackDataModel` ensures data integrity through:

- **Schema validation** of all input objects
- **Relationship validation** between objects
- **ID uniqueness** checking
- **Reference integrity** validation

### Error Handling

In strict parsing mode, the following issues cause errors:

- Missing required properties
- Invalid STIX ID formats
- Broken relationship references
- Duplicate object IDs

In relaxed mode, these issues generate warnings but don't prevent data loading.

## Performance Considerations

### Memory Usage

The `AttackDataModel` maintains all objects in memory for fast access. Typical memory usage:

- **Enterprise ATT&CK**: ~50-100 MB
- **Mobile ATT&CK**: ~20-30 MB
- **ICS ATT&CK**: ~10-20 MB

### Access Patterns

For optimal performance:

```typescript
// ✅ Efficient - direct property access
const techniques = attackDataModel.techniques;

// ✅ Efficient - use built-in navigation
const tactics = technique.getTactics();

// ❌ Less efficient - repeated searches
const technique = attackDataModel.getAllObjects().find(/* ... */);
```

## Thread Safety

The `AttackDataModel` is **read-only** after construction and safe for concurrent access across multiple threads or async operations.

## Integration Patterns

### Caching Data Models

```typescript
const modelCache = new Map<string, AttackDataModel>();

function getCachedModel(uuid: string): AttackDataModel {
    if (!modelCache.has(uuid)) {
        const model = loadDataModel(uuid);
        modelCache.set(uuid, model);
    }
    return modelCache.get(uuid)!;
}
```

### Filtering and Searching

```typescript
// Find techniques by platform
const windowsTechniques = attackDataModel.techniques.filter(t =>
    t.x_mitre_platforms?.includes('Windows')
);

// Search by name
const credentialTechniques = attackDataModel.techniques.filter(t =>
    t.name.toLowerCase().includes('credential')
);

// Complex filtering
const highValueTargets = attackDataModel.techniques.filter(t => {
    const tactics = t.getTactics();
    return tactics.some(tactic =>
        tactic.x_mitre_shortname === 'credential-access'
    ) && t.x_mitre_platforms?.includes('Windows');
});
```

---

## See Also

- **[DataSource](./data-sources)** - Data source configuration and loading
- **[Implementation Classes](../schemas/sdo/)** - Individual object class documentation
- **[Relationships](../schemas/sro/relationship.schema)** - Relationship type specifications
