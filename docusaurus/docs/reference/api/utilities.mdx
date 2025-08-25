import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Utility Functions

<WorkInProgressNotice />

**Helper functions and data manipulation tools**

The ATT&CK Data Model provides various utility functions for common data manipulation, validation, and analysis tasks. These functions complement the main classes and provide convenient ways to work with ATT&CK data.

## Data Source Utilities

### isDataSourceCached()

Check if a data source is currently cached in memory.

```typescript
function isDataSourceCached(uuid: string): boolean
```

**Parameters**:

- `uuid` - Data source UUID from registration

**Returns**: `true` if cached, `false` otherwise

**Example**:

```typescript
import { isDataSourceCached } from '@mitre-attack/attack-data-model';

if (isDataSourceCached(uuid)) {
    console.log('Data source is cached - loading will be fast');
} else {
    console.log('Data source will be loaded from storage');
}
```

### clearDataSourceCache()

Remove a specific data source from the cache.

```typescript
function clearDataSourceCache(uuid: string): boolean
```

**Parameters**:

- `uuid` - Data source UUID to remove from cache

**Returns**: `true` if cache was cleared, `false` if UUID not found

**Example**:

```typescript
import { clearDataSourceCache } from '@mitre-attack/attack-data-model';

const cleared = clearDataSourceCache(uuid);
if (cleared) {
    console.log('Cache cleared - next load will refresh data');
}
```

### clearAllDataSourceCaches()

Remove all data sources from the cache.

```typescript
function clearAllDataSourceCaches(): number
```

**Returns**: Number of data sources that were cached

**Example**:

```typescript
import { clearAllDataSourceCaches } from '@mitre-attack/attack-data-model';

const clearedCount = clearAllDataSourceCaches();
console.log(`Cleared ${clearedCount} cached data sources`);
```

## Object Identification Utilities

### isValidStixId()

Validate STIX ID format compliance.

```typescript
function isValidStixId(id: string): boolean
```

**Parameters**:

- `id` - String to validate as STIX ID

**Returns**: `true` if valid STIX ID format, `false` otherwise

**Valid STIX ID Format**: `{type}--{UUID}` where UUID is version 4

**Example**:

```typescript
import { isValidStixId } from '@mitre-attack/attack-data-model';

console.log(isValidStixId('attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298')); // true
console.log(isValidStixId('invalid-id')); // false
console.log(isValidStixId('attack-pattern--not-a-uuid')); // false
```

### isValidAttackId()

Validate ATT&CK ID format for specific object types.

```typescript
function isValidAttackId(id: string, objectType?: string): boolean
```

**Parameters**:

- `id` - String to validate as ATT&CK ID
- `objectType` - Optional STIX object type for specific validation

**Returns**: `true` if valid ATT&CK ID format, `false` otherwise

**Supported Formats by Object Type**:

| Object Type | ATT&CK ID Format | Example |
|-------------|------------------|---------|
| `attack-pattern` | `T\d{4}(\.\d{3})?` | `T1055`, `T1055.001` |
| `x-mitre-tactic` | `TA\d{4}` | `TA0001` |
| `intrusion-set` | `G\d{4}` | `G0006` |
| `malware` | `S\d{4}` | `S0001` |
| `tool` | `S\d{4}` | `S0002` |
| `campaign` | `C\d{4}` | `C0001` |
| `course-of-action` | `M\d{4}` | `M1001` |

**Example**:

```typescript
import { isValidAttackId } from '@mitre-attack/attack-data-model';

// Generic validation
console.log(isValidAttackId('T1055')); // true
console.log(isValidAttackId('G0006')); // true
console.log(isValidAttackId('invalid')); // false

// Type-specific validation
console.log(isValidAttackId('T1055.001', 'attack-pattern')); // true
console.log(isValidAttackId('G0006', 'attack-pattern')); // false
console.log(isValidAttackId('TA0001', 'x-mitre-tactic')); // true
```

### extractAttackId()

Extract ATT&CK ID from an object's external references.

```typescript
function extractAttackId(obj: AttackObject): string | null
```

**Parameters**:

- `obj` - ATT&CK object with external references

**Returns**: ATT&CK ID if found, `null` otherwise

**Example**:

```typescript
import { extractAttackId } from '@mitre-attack/attack-data-model';

const technique = attackDataModel.techniques[0];
const attackId = extractAttackId(technique);
console.log(`Technique ID: ${attackId}`); // "T1055"
```

### extractStixType()

Extract the STIX object type from a STIX ID.

```typescript
function extractStixType(stixId: string): string | null
```

**Parameters**:

- `stixId` - Valid STIX ID

**Returns**: Object type if valid, `null` otherwise

**Example**:

```typescript
import { extractStixType } from '@mitre-attack/attack-data-model';

const type = extractStixType('attack-pattern--12345678-1234-1234-1234-123456789012');
console.log(type); // "attack-pattern"

const invalidType = extractStixType('invalid-id');
console.log(invalidType); // null
```

## Data Analysis Utilities

### getObjectCounts()

Get counts of all object types in a data model.

```typescript
function getObjectCounts(dataModel: AttackDataModel): Record<string, number>
```

**Parameters**:

- `dataModel` - AttackDataModel instance

**Returns**: Object with counts by STIX object type

**Example**:

```typescript
import { getObjectCounts } from '@mitre-attack/attack-data-model';

const counts = getObjectCounts(attackDataModel);
console.log(counts);
// {
//   "attack-pattern": 196,
//   "x-mitre-tactic": 14,
//   "intrusion-set": 142,
//   "malware": 89,
//   "tool": 76,
//   "relationship": 2341
// }
```

### findBrokenRelationships()

Identify relationships that reference non-existent objects.

```typescript
function findBrokenRelationships(dataModel: AttackDataModel): BrokenRelationship[]
```

**Returns**: Array of broken relationship information

**BrokenRelationship Interface**:

```typescript
interface BrokenRelationship {
    relationshipId: string;
    relationshipType: string;
    sourceId: string;
    targetId: string;
    missingReference: 'source' | 'target';
    description?: string;
}
```

**Example**:

```typescript
import { findBrokenRelationships } from '@mitre-attack/attack-data-model';

const broken = findBrokenRelationships(attackDataModel);
if (broken.length > 0) {
    console.log(`Found ${broken.length} broken relationships:`);
    broken.forEach(rel => {
        console.log(`- ${rel.relationshipType} missing ${rel.missingReference}`);
    });
} else {
    console.log('All relationships are valid');
}
```

### getRelationshipCounts()

Count relationships by type.

```typescript
function getRelationshipCounts(dataModel: AttackDataModel): Record<string, number>
```

**Parameters**:

- `dataModel` - AttackDataModel instance

**Returns**: Object with counts by relationship type

**Example**:

```typescript
import { getRelationshipCounts } from '@mitre-attack/attack-data-model';

const relCounts = getRelationshipCounts(attackDataModel);
console.log(relCounts);
// {
//   "uses": 1824,
//   "mitigates": 389,
//   "subtechnique-of": 198,
//   "attributed-to": 67,
//   "detects": 156
// }
```

## Filtering and Search Utilities

### filterByPlatform()

Filter techniques by platform.

```typescript
function filterByPlatform(
    techniques: TechniqueImpl[],
    platform: string | string[]
): TechniqueImpl[]
```

**Parameters**:

- `techniques` - Array of techniques to filter
- `platform` - Platform name(s) to match

**Returns**: Filtered array of techniques

**Example**:

```typescript
import { filterByPlatform } from '@mitre-attack/attack-data-model';

const windowsTechniques = filterByPlatform(
    attackDataModel.techniques,
    'Windows'
);

const multiPlatform = filterByPlatform(
    attackDataModel.techniques,
    ['Windows', 'Linux']
);

console.log(`Windows techniques: ${windowsTechniques.length}`);
console.log(`Multi-platform techniques: ${multiPlatform.length}`);
```

### filterByTactic()

Filter techniques by associated tactic.

```typescript
function filterByTactic(
    techniques: TechniqueImpl[],
    tacticShortname: string | string[]
): TechniqueImpl[]
```

**Parameters**:

- `techniques` - Array of techniques to filter
- `tacticShortname` - Tactic shortname(s) to match

**Returns**: Filtered array of techniques

**Example**:

```typescript
import { filterByTactic } from '@mitre-attack/attack-data-model';

const credAccessTechniques = filterByTactic(
    attackDataModel.techniques,
    'credential-access'
);

const multiTactic = filterByTactic(
    attackDataModel.techniques,
    ['initial-access', 'execution']
);

console.log(`Credential Access techniques: ${credAccessTechniques.length}`);
```

### searchByName()

Search objects by name with fuzzy matching.

```typescript
function searchByName<T extends { name: string }>(
    objects: T[],
    searchTerm: string,
    options?: SearchOptions
): T[]
```

**SearchOptions Interface**:

```typescript
interface SearchOptions {
    caseSensitive?: boolean;
    fuzzyMatch?: boolean;
    maxResults?: number;
}
```

**Parameters**:

- `objects` - Array of objects to search
- `searchTerm` - Text to search for
- `options` - Search configuration

**Returns**: Array of matching objects

**Example**:

```typescript
import { searchByName } from '@mitre-attack/attack-data-model';

// Case-insensitive exact match
const credentialTechniques = searchByName(
    attackDataModel.techniques,
    'credential',
    { caseSensitive: false, maxResults: 10 }
);

// Fuzzy matching
const processMatches = searchByName(
    attackDataModel.techniques,
    'proces',
    { fuzzyMatch: true, maxResults: 5 }
);

console.log(`Found ${credentialTechniques.length} credential techniques`);
```

## Validation Utilities

### validateBundle()

Validate a STIX bundle structure.

```typescript
function validateBundle(bundle: unknown): ValidationResult
```

**ValidationResult Interface**:

```typescript
interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: string[];
    objectCounts: Record<string, number>;
}
```

**Parameters**:

- `bundle` - Bundle data to validate

**Returns**: Validation result with details

**Example**:

```typescript
import { validateBundle } from '@mitre-attack/attack-data-model';
import fs from 'fs';

const bundleData = JSON.parse(fs.readFileSync('bundle.json', 'utf8'));
const result = validateBundle(bundleData);

if (result.isValid) {
    console.log('✅ Bundle is valid');
    console.log('Object counts:', result.objectCounts);
} else {
    console.log('❌ Bundle validation failed');
    result.errors.forEach(error => {
        console.log(`- ${error.message}`);
    });
}
```

### validateRelationshipIntegrity()

Check that all relationships reference valid objects.

```typescript
function validateRelationshipIntegrity(dataModel: AttackDataModel): IntegrityResult
```

**IntegrityResult Interface**:

```typescript
interface IntegrityResult {
    isValid: boolean;
    brokenRelationships: BrokenRelationship[];
    orphanedObjects: string[];
    totalRelationships: number;
}
```

**Example**:

```typescript
import { validateRelationshipIntegrity } from '@mitre-attack/attack-data-model';

const integrity = validateRelationshipIntegrity(attackDataModel);

console.log(`Total relationships: ${integrity.totalRelationships}`);
console.log(`Broken relationships: ${integrity.brokenRelationships.length}`);
console.log(`Orphaned objects: ${integrity.orphanedObjects.length}`);

if (integrity.isValid) {
    console.log('✅ All relationships are valid');
} else {
    console.log('❌ Found integrity issues');
}
```

## Export Utilities

### exportToJson()

Export data model to JSON format.

```typescript
function exportToJson(
    dataModel: AttackDataModel,
    options?: ExportOptions
): string
```

**ExportOptions Interface**:

```typescript
interface ExportOptions {
    pretty?: boolean;
    includeRelationships?: boolean;
    objectTypes?: string[];
    minify?: boolean;
}
```

**Example**:

```typescript
import { exportToJson } from '@mitre-attack/attack-data-model';

// Pretty-printed with all data
const fullExport = exportToJson(attackDataModel, {
    pretty: true,
    includeRelationships: true
});

// Minified with only techniques
const techniquesOnly = exportToJson(attackDataModel, {
    minify: true,
    objectTypes: ['attack-pattern']
});

fs.writeFileSync('full-export.json', fullExport);
fs.writeFileSync('techniques.json', techniquesOnly);
```

### exportToCsv()

Export specific object collections to CSV format.

```typescript
function exportToCsv(
    objects: AttackObject[],
    fields?: string[]
): string
```

**Parameters**:

- `objects` - Array of objects to export
- `fields` - Specific fields to include (optional)

**Returns**: CSV-formatted string

**Example**:

```typescript
import { exportToCsv } from '@mitre-attack/attack-data-model';

// Export all technique fields
const techniquesCsv = exportToCsv(attackDataModel.techniques);

// Export specific fields only
const basicTechniquesCsv = exportToCsv(
    attackDataModel.techniques,
    ['name', 'external_references', 'x_mitre_platforms']
);

fs.writeFileSync('techniques.csv', techniquesCsv);
fs.writeFileSync('techniques-basic.csv', basicTechniquesCsv);
```

---
