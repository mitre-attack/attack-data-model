# Compatibility

**Understanding version relationships and compatibility across the ATT&CK ecosystem**

The ATT&CK Data Model operates within a complex ecosystem of interconnected version dependencies. Understanding these relationships helps you make informed decisions about version selection, upgrade timing, and compatibility management for your applications.

## The Compatibility Challenge

ATT&CK's ecosystem involves multiple independent components that evolve at different rates:

- **ATT&CK Data Model Library** (`@mitre-attack/attack-data-model`) - This TypeScript library
- **ATT&CK Specification** - Defines object schemas and validation rules
- **STIX Specification** - Core STIX standard that ATT&CK extends
- **ATT&CK Dataset Releases** - The actual threat intelligence data from MITRE

Each component has its own versioning scheme and release cycle, creating a compatibility matrix that must be carefully managed.

## Supported Versions Compatibility Matrix

| ADM Version | ATT&CK Specification | STIX Version | Supported ATT&CK Releases |
|-------------|---------------------|--------------|---------------------------|
| 1.x, 2.x, 3.x | 3.2.0 | 2.1 | ≥15.x, ≤17.x |
| 4.x | 3.3.0 | 2.1 | ≥15.x, ≤18.x |
| 5.x *(future)* | 4.0.0 | 2.1 | ≥18.x |

*Note: Other versions may work but are not officially supported or tested.*

## Understanding Version Dependencies

### ATT&CK Specification Evolution

**Version 3.3.0 introduced significant changes:**

- **New Object Types**: Detection Strategies, Analytics, and Log Sources
- **Deprecations**: Legacy Data Source detection relationships
- **Enhanced Features**: Campaign temporal tracking and asset relationship modeling

**Version 4.0.0 (planned)** will include breaking changes:

- Removal of deprecated data source `detects` relationships
- Potential schema changes affecting validation logic

### Compatibility Implications

#### Using Older ATT&CK Releases

- May lack properties or objects expected by newer ADM versions
- Can cause validation errors or incomplete data mapping
- Generally safe for read-only analytical workflows

#### Using Newer ATT&CK Releases

- May introduce objects or properties not recognized by older ADM versions
- Risk of parsing failures or missing data
- Requires ADM updates for full feature support

#### Specification Mismatches

- Different specification versions may have incompatible validation rules
- Object schemas may differ, affecting data integrity
- Relationship types and constraints may change

## Practical Compatibility Strategies

### Development Environment Management

```typescript
// Check compatibility at runtime
function validateCompatibility(attackDataModel: AttackDataModel) {
    const specVersion = attackDataModel.getSpecificationVersion();
    const supportedVersions = ['3.2.0', '3.3.0'];

    if (!supportedVersions.includes(specVersion)) {
        console.warn(`Specification version ${specVersion} may not be fully supported`);
    }
}
```

### Version Pinning for Stability

```typescript
// Pin specific versions for predictable behavior
const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    version: '15.1', // Pin to tested version
    parsingMode: 'strict'
});
```

### Graceful Degradation

```typescript
// Handle version differences gracefully
function getDetectionData(technique: Technique) {
    // Try modern detection strategy approach (3.3.0+)
    if (technique.getDetectionStrategies) {
        const strategies = technique.getDetectionStrategies();
        if (strategies.length > 0) {
            return strategies;
        }
    }

    // Fall back to legacy data component approach
    if (technique.getDetectedBy) {
        return technique.getDetectedBy();
    }

    // Final fallback to detection text
    return [{ description: technique.x_mitre_detection || 'No detection information available' }];
}
```

## Version Migration Planning

### Planning Specification Upgrades

1. **Assessment Phase**
   - Review changelog for breaking changes
   - Identify affected code paths in your application
   - Plan testing strategy for new features

2. **Testing Phase**
   - Test with representative data samples
   - Validate existing functionality continues working
   - Verify new features work as expected

3. **Rollout Phase**
   - Implement gradual rollout with monitoring
   - Maintain rollback capability
   - Update documentation and training materials

### Handling Breaking Changes

Breaking changes typically involve:

- **Object Schema Changes**: New required fields or validation rules
- **Relationship Changes**: Modified relationship types or constraints
- **Deprecated Features**: Removal of legacy object types or properties

**Migration Strategy**:

```typescript
class VersionAwareProcessor {
    processObjects(objects: AttackObject[]) {
        return objects.map(obj => {
            switch (this.getSpecVersion(obj)) {
                case '3.2.0':
                    return this.processLegacyObject(obj);
                case '3.3.0':
                    return this.processCurrentObject(obj);
                default:
                    return this.processWithFallback(obj);
            }
        });
    }
}
```

## Compatibility Best Practices

### For Application Developers

1. **Version Awareness**: Always check specification versions before using new features
2. **Feature Detection**: Use capability detection over version checking when possible
3. **Flexible Parsing**: Use `relaxed` mode in production to handle data variations
4. **Comprehensive Testing**: Test with multiple ATT&CK dataset versions
5. **Documentation**: Document version requirements clearly for users

### For Data Consumers

1. **Stay Current**: Regularly update to supported ADM versions
2. **Monitor Changes**: Subscribe to release notes for breaking change notifications
3. **Test Early**: Test with pre-release versions when available
4. **Validate Data**: Implement data quality checks for version compatibility
5. **Plan Migrations**: Schedule regular upgrade cycles aligned with ATT&CK releases

### For Integration Teams

1. **Environment Isolation**: Use different versions in development vs production
2. **Automated Testing**: Include compatibility tests in CI/CD pipelines
3. **Monitoring**: Track compatibility issues in production deployments
4. **Rollback Plans**: Maintain ability to downgrade if issues arise
5. **Team Communication**: Share compatibility requirements across teams

## Common Compatibility Issues

### Schema Validation Failures

**Problem**: Objects fail validation with newer specification versions

**Solution**:

- Update to compatible ADM version
- Use `relaxed` parsing mode temporarily
- Review and update custom validation logic

### Missing Object Properties

**Problem**: Expected properties don't exist in older datasets

**Solution**:

```typescript
// Defensive property access
const detectsBy = technique.x_mitre_data_sources ||
                 technique.getDataComponents?.() ||
                 [];
```

### Deprecated Feature Usage

**Problem**: Application uses deprecated object types or relationships

**Solution**:

- Migrate to replacement features
- Implement feature detection
- Plan phased migration strategy

## Future Compatibility Planning

### Anticipated Changes

- **STIX 2.2 Adoption**: May require major ADM version update
- **ATT&CK Specification 4.0**: Will remove legacy detection relationships
- **New Object Types**: Regular introduction of new ATT&CK object types
- **Performance Improvements**: Schema optimizations may affect validation

### Staying Prepared

1. **Follow Development**: Monitor ADM and ATT&CK development channels
2. **Participate in Community**: Engage with other users facing similar challenges
3. **Contribute Back**: Share compatibility issues and solutions with the community
4. **Plan Resources**: Budget time and resources for regular compatibility updates

---

Understanding compatibility relationships helps you build robust applications that can evolve alongside the ATT&CK ecosystem. By planning for version changes and implementing defensive coding practices, you can maintain stable functionality while taking advantage of new capabilities as they become available.

**Related Topics**:

- [Versioning Philosophy](./versioning-philosophy) - Deep dive into ATT&CK's multi-dimensional versioning
- [Configuration Reference](../reference/configuration) - All supported configuration options
- [Error Handling Guide](../how-to-guides/error-handling) - Handle compatibility and parsing errors
