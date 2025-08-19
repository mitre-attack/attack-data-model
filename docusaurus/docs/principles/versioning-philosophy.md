import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Versioning Philosophy

<WorkInProgressNotice />

**Understanding ATT&CK's multi-dimensional versioning approach**

ATT&CK employs a sophisticated three-dimensional versioning system that tracks changes across different scopes and timeframes. This approach often confuses users who expect simple sequential versioning, but the complexity serves important purposes: enabling independent evolution of standards, specifications, and content while maintaining compatibility across the ecosystem. Understanding this versioning philosophy is crucial for building robust applications and managing long-term compatibility.

## The Versioning Challenge

### Multiple Evolution Axes

ATT&CK data evolves along several independent dimensions, each with different change frequencies, compatibility implications, and governance models:

#### Standards Evolution (STIX 2.1)

- **Scope**: Core STIX specification changes
- **Frequency**: Infrequent (years between major versions)
- **Governance**: OASIS standards organization
- **Impact**: Affects all STIX-compliant tools and data

#### Specification Evolution (ATT&CK Extensions)

- **Scope**: ATT&CK-specific schema and validation rules
- **Frequency**: Moderate (months to years)
- **Governance**: MITRE ATT&CK team
- **Impact**: Affects ATT&CK data structure and processing logic

#### Content Evolution (Individual Objects)

- **Scope**: Individual technique descriptions, relationships, metadata
- **Frequency**: Frequent (weekly to monthly)
- **Governance**: ATT&CK content curators
- **Impact**: Affects analytical accuracy and completeness

### The Impossibility of Single-Dimension Versioning

A single version number cannot adequately express changes across these different dimensions:

**Sequential numbering** (1.0, 2.0, 3.0):

- ✅ Simple to understand
- ❌ Cannot distinguish between breaking specification changes and minor content updates
- ❌ Forces synchronized releases across independent change streams

**Date-based versioning** (2023.01, 2023.02):

- ✅ Clear temporal ordering
- ❌ No semantic information about change impact
- ❌ Doesn't indicate compatibility implications

**Semantic versioning** (MAJOR.MINOR.PATCH):

- ✅ Expresses compatibility impact
- ❌ Assumes single change stream
- ❌ Difficult to coordinate across independent governance models

**Solution**: Use multiple version dimensions, each optimized for tracking changes in its specific domain.

## The Three Version Dimensions

### 1. STIX Version (`spec_version`)

**Format**: `"2.1"`
**Scope**: STIX specification compliance
**Managed by**: OASIS standards organization

#### Purpose and Characteristics

**Standards tracking**: Indicates which version of the STIX specification the object conforms to.

**Parser compatibility**: Enables STIX parsers to determine processing capabilities and requirements.

**Ecosystem coordination**: Provides a standard reference point for tool compatibility across the threat intelligence ecosystem.

**Example usage**:

```json
{
    "spec_version": "2.1",
    "type": "attack-pattern",
    "id": "attack-pattern--12345..."
}
```

#### Evolution Patterns

**Rare changes**: STIX versions change infrequently (every few years) through formal standardization processes.

**Breaking changes**: Major STIX version updates may introduce incompatible changes requiring parser updates.

**Backward compatibility**: STIX generally maintains compatibility within major versions (2.0 → 2.1 was largely additive).

#### When STIX Version Changes

**Parser updates required**: Applications must update STIX processing logic for new specification versions.

**Validation changes**: Schema validation rules may require updates for new STIX features.

**Ecosystem coordination**: Tool updates typically occur gradually across the threat intelligence ecosystem.

### 2. ATT&CK Specification Version (`x_mitre_attack_spec_version`)

**Format**: `"3.3.0"` (semantic versioning)
**Scope**: ATT&CK specification extensions and structure
**Managed by**: MITRE ATT&CK team

#### Purpose and Characteristics

**Specification compatibility**: Tracks changes to ATT&CK's extensions of STIX (custom object types, properties, validation rules).

**Breaking change communication**: Major version increments indicate incompatible changes that may require application updates.

**Feature availability**: Indicates which ATT&CK features and object types are available in the data.

**Example usage**:

```json
{
    "x_mitre_attack_spec_version": "3.3.0",
    "type": "x-mitre-detection-strategy",
    "x_mitre_analytics": ["analytic-id-1", "analytic-id-2"]
}
```

#### Version Semantics

**Major versions (3.0.0 → 4.0.0)**:

- Introduce breaking changes to object schemas or validation rules
- May remove deprecated features or object types
- Require application updates for compatibility

**Minor versions (3.2.0 → 3.3.0)**:

- Add new object types or properties in backward-compatible ways
- Introduce new features that don't break existing processing
- Applications continue working but may miss new capabilities

**Patch versions (3.3.0 → 3.3.1)**:

- Fix bugs in validation rules or schema definitions
- Clarify ambiguous specification language
- Should not affect application compatibility

#### Recent Specification Evolution

**Version 3.3.0 changes**:

- Introduced Detection Strategy framework (analytics, log sources)
- Deprecated legacy data source detection relationships
- Added campaign temporal tracking properties
- Enhanced asset relationship modeling

**Version 4.0.0 (planned)**:

- Will remove deprecated data source `detects` relationships
- May introduce additional breaking changes to object schemas

### 3. Object Version (`x_mitre_version`)

**Format**: `"1.2"` (major.minor)
**Scope**: Individual object content and metadata
**Managed by**: ATT&CK content curators

#### Purpose and Characteristics

**Content tracking**: Indicates when object content (description, metadata, relationships) has been meaningfully updated.

**Change detection**: Enables applications to identify when objects have been modified since last processing.

**Analytical currency**: Helps analysts understand the recency and evolution of threat intelligence.

**Example usage**:

```json
{
    "x_mitre_version": "1.3",
    "name": "Process Injection",
    "description": "Updated with new detection guidance...",
    "modified": "2023-06-15T10:30:00.000Z"
}
```

#### Version Semantics

**Major increments (1.0 → 2.0)**:

- Substantial content changes that affect analytical interpretation
- New relationships, significantly updated descriptions, or revised metadata
- May indicate changes in understanding of adversary behavior

**Minor increments (1.2 → 1.3)**:

- Incremental content improvements, clarifications, or additions
- Editorial improvements, additional examples, or minor metadata updates
- Generally preserve existing analytical conclusions

#### Object Version Lifecycle

```shell
Creation → 1.0 → 1.1 → 1.2 → 2.0 → 2.1 → 3.0...
           │     │     │     │     │     │
           │     │     │     │     │     └─ Major content revision
           │     │     │     │     └─ Minor improvement
           │     │     │     └─ Major analytical update
           │     │     └─ Minor content addition
           │     └─ First content improvement
           └─ Initial creation
```

## Version Relationship Patterns

### Independent Evolution

The three version dimensions evolve independently, creating complex interaction patterns:

```json
// Object may have different version update frequencies
{
    "spec_version": "2.1",                    // Unchanged for years
    "x_mitre_attack_spec_version": "3.3.0",   // Updated every few months
    "x_mitre_version": "2.4",                 // Updated frequently
    "modified": "2023-08-15T14:20:00.000Z"
}
```

### Compatibility Matrix

Different version combinations create compatibility requirements:

| STIX Version | ATT&CK Spec Version | Compatibility Notes |
|--------------|---------------------|---------------------|
| 2.1 | 3.0.0-3.2.x | Legacy data source model |
| 2.1 | 3.3.0+ | Detection strategy model introduced |
| 2.1 | 4.0.0+ | Legacy data sources removed |

### Version-Aware Processing

Applications should adapt behavior based on specification versions:

```typescript
function processDetectionData(technique: Technique) {
    const specVersion = technique.x_mitre_attack_spec_version;

    if (semver.gte(specVersion, '3.3.0')) {
        // Use new detection strategy relationships
        return technique.getDetectionStrategies();
    } else {
        // Fall back to legacy data component relationships
        return technique.getDetectedBy(); // Deprecated but still functional
    }
}
```

## Versioning Trade-offs and Benefits

### Benefits of Multi-Dimensional Versioning

#### Independent Evolution

Different aspects of ATT&CK can evolve at their natural pace without forcing artificial synchronization:

- **Content updates** can happen frequently as new research emerges
- **Specification changes** can follow careful design and review cycles
- **Standards evolution** can proceed through formal governance processes

#### Precise Compatibility Signaling

Applications can make informed decisions about feature support and compatibility:

```typescript
// Precise compatibility checking
if (semver.gte(object.x_mitre_attack_spec_version, '3.3.0')) {
    // Safe to use detection strategy features
} else {
    // Must use legacy detection patterns
}
```

#### Ecosystem Stability

Different components of the ATT&CK ecosystem can update independently without breaking other components.

### Costs of Multi-Dimensional Versioning

#### Complexity Burden

Developers must understand and track multiple version dimensions, each with different semantics and update patterns.

#### Compatibility Matrix Management

The combination of version dimensions creates a complex compatibility matrix that's difficult to test comprehensively.

#### Migration Path Complexity

Upgrading applications may require consideration of multiple version dimensions and their interactions.

## Version Management Strategies

### For Application Developers

#### Version Compatibility Checking

```typescript
interface VersionRequirements {
    minStixVersion?: string;
    minAttackSpecVersion?: string;
    maxAttackSpecVersion?: string;
}

function validateCompatibility(
    object: AttackObject,
    requirements: VersionRequirements
): boolean {
    if (requirements.minAttackSpecVersion &&
        semver.lt(object.x_mitre_attack_spec_version, requirements.minAttackSpecVersion)) {
        return false;
    }

    if (requirements.maxAttackSpecVersion &&
        semver.gt(object.x_mitre_attack_spec_version, requirements.maxAttackSpecVersion)) {
        return false;
    }

    return true;
}
```

#### Feature Detection over Version Checking

```typescript
// ✅ Better: Feature detection
function supportsDetectionStrategies(technique: Technique): boolean {
    return typeof technique.getDetectionStrategies === 'function';
}

// ❌ Fragile: Version checking
function supportsDetectionStrategies(technique: Technique): boolean {
    return semver.gte(technique.x_mitre_attack_spec_version, '3.3.0');
}
```

### For Data Consumers

#### Change Detection Workflows

```typescript
// Track object versions to detect updates
interface ObjectVersionCache {
    stixId: string;
    lastSeenVersion: string;
    lastProcessed: Date;
}

function detectUpdatedObjects(
    cache: ObjectVersionCache[],
    newData: AttackObject[]
): AttackObject[] {
    return newData.filter(obj => {
        const cached = cache.find(c => c.stixId === obj.id);
        return !cached || cached.lastSeenVersion !== obj.x_mitre_version;
    });
}
```

### For Tool Integrators

#### Graceful Degradation Patterns

```typescript
// Support multiple specification versions gracefully
class AttackProcessor {
    processDetection(technique: Technique) {
        // Try modern detection strategy approach
        const strategies = this.tryGetDetectionStrategies(technique);
        if (strategies.length > 0) {
            return this.processDetectionStrategies(strategies);
        }

        // Fall back to legacy data component approach
        const dataComponents = this.tryGetDataComponents(technique);
        if (dataComponents.length > 0) {
            return this.processDataComponents(dataComponents);
        }

        // Fall back to basic detection text
        return this.processDetectionText(technique.x_mitre_detection);
    }
}
```

## Version Evolution Patterns

### Predictable Change Cycles

#### Content Updates (Object Versions)

- **Frequency**: Weekly to monthly
- **Scope**: Individual object improvements
- **Impact**: Usually additive, may refine analytical conclusions

#### Specification Updates (ATT&CK Spec Version)

- **Frequency**: Every 3-6 months
- **Scope**: New object types, properties, or validation rules
- **Impact**: May require application updates for full feature support

#### Standards Updates (STIX Version)

- **Frequency**: Every 1-3 years
- **Scope**: Core STIX specification changes
- **Impact**: May require parser and validation logic updates

### Migration Planning

#### Specification Version Upgrades

1. **Review changes**: Understand new features and breaking changes
2. **Test compatibility**: Verify existing code works with new specification
3. **Implement new features**: Add support for new object types or properties
4. **Update validation**: Modify schema validation for new requirements
5. **Plan rollback**: Maintain ability to process older specification versions

#### Handling Breaking Changes

```typescript
// Support multiple specification versions during transitions
class VersionAwareProcessor {
    processObject(obj: AttackObject) {
        switch (obj.x_mitre_attack_spec_version) {
            case '3.2.x':
                return this.processLegacyFormat(obj);
            case '3.3.x':
                return this.processCurrentFormat(obj);
            case '4.0.x':
                return this.processFutureFormat(obj);
            default:
                throw new UnsupportedVersionError(obj.x_mitre_attack_spec_version);
        }
    }
}
```

## Common Versioning Mistakes

### 1. Ignoring Specification Versions

**❌ Problematic**:

```typescript
// Assuming all objects support modern features
const strategies = technique.getDetectionStrategies();
```

**✅ Correct**:

```typescript
// Check specification version before using new features
if (semver.gte(technique.x_mitre_attack_spec_version, '3.3.0')) {
    const strategies = technique.getDetectionStrategies();
}
```

### 2. Confusing Version Semantics

**❌ Problematic**:

```typescript
// Using object version to determine feature availability
if (technique.x_mitre_version >= '2.0') {
    // Object version doesn't indicate feature availability
}
```

**✅ Correct**:

```typescript
// Use specification version for feature detection
if (semver.gte(technique.x_mitre_attack_spec_version, '3.3.0')) {
    // Specification version indicates feature availability
}
```

### 3. Hard-coding Version Requirements

**❌ Problematic**:

```typescript
// Brittle version checking
const REQUIRED_SPEC_VERSION = '3.3.0';
if (obj.x_mitre_attack_spec_version !== REQUIRED_SPEC_VERSION) {
    throw new Error('Unsupported version');
}
```

**✅ Better**:

```typescript
// Flexible version range checking
const MIN_SPEC_VERSION = '3.3.0';
if (semver.lt(obj.x_mitre_attack_spec_version, MIN_SPEC_VERSION)) {
    throw new Error(`Requires spec version ${MIN_SPEC_VERSION} or higher`);
}
```

---

## The Philosophy in Practice

ATT&CK's multi-dimensional versioning reflects the reality that complex systems evolve along multiple independent axes. Rather than forcing artificial synchronization that would slow all evolution to the pace of the slowest component, the framework provides precise tracking for each type of change:

- **STIX versions** track standards compliance
- **ATT&CK specification versions** track feature availability
- **Object versions** track content evolution

Understanding this philosophy helps you build robust applications that can handle version complexity gracefully and evolve alongside the ATT&CK framework.

**Next**: Return to the **[Explanation Overview](./)** to explore other aspects of ATT&CK Data Model architecture and design decisions.
