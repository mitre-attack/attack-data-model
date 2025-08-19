import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Error Reference

<WorkInProgressNotice />

**Complete error codes, types, and resolution strategies**

This reference documents all error types that can occur when using the ATT&CK Data Model library, along with their meanings, common causes, and recommended solutions.

## Error Categories

### Data Source Errors

Errors related to data source configuration, registration, and loading.

#### DataSourceError

**Type**: `DataSourceError`
**Thrown by**: `registerDataSource()`, data source validation

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `DS001` | `"Invalid data source type: {type}"` | Unsupported source type | Use 'attack', 'file', 'url', or 'taxii' |
| `DS002` | `"Missing required option: {option}"` | Required configuration missing | Provide required option for source type |
| `DS003` | `"Data source registration failed"` | General registration failure | Check configuration and network connectivity |
| `DS004` | `"Data source not found: {uuid}"` | Invalid UUID in loadDataModel() | Use valid UUID from registerDataSource() |
| `DS005` | `"Data source already registered: {uuid}"` | Duplicate registration attempt | Use existing UUID or clear cache first |

**Example**:

```typescript
// ❌ Throws DS001 - Invalid data source type
const dataSource = new DataSource({ source: 'invalid' });

// ❌ Throws DS002 - Missing required domain
const dataSource = new DataSource({ source: 'attack' });

// ✅ Correct configuration
const dataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack'
});
```

#### NetworkError

**Type**: `NetworkError`
**Thrown by**: URL and attack source loading

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `NET001` | `"Network request failed: {url}"` | Network connectivity issues | Check internet connection |
| `NET002` | `"Request timeout: {url}"` | Request exceeded timeout | Increase timeout or check server status |
| `NET003` | `"Authentication failed: {url}"` | Invalid credentials | Verify authentication details |
| `NET004` | `"Resource not found: {url}"` | 404 or invalid URL | Verify URL exists and is accessible |
| `NET005` | `"Server error: {status} {url}"` | Server-side error (5xx) | Check server status or try again later |

**Example**:

```typescript
try {
    const dataSource = new DataSource({
        source: 'url',
        url: 'https://invalid-url.example/data.json',
        timeout: 5000
    });
    await registerDataSource(dataSource);
} catch (error) {
    if (error.code === 'NET002') {
        // Increase timeout and retry
        dataSource.timeout = 30000;
    }
}
```

#### FileSystemError

**Type**: `FileSystemError`
**Thrown by**: File source loading

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `FS001` | `"File not found: {path}"` | File doesn't exist | Verify file path is correct |
| `FS002` | `"Permission denied: {path}"` | Insufficient file permissions | Check file permissions |
| `FS003` | `"File is not readable: {path}"` | File exists but can't be read | Ensure file is readable |
| `FS004` | `"Invalid file format: {path}"` | File is not valid JSON | Verify file contains valid JSON |

### Validation Errors

Errors from schema validation and data parsing.

#### ValidationError

**Type**: `ValidationError` (extends `ZodError`)
**Thrown by**: Schema parsing, object validation

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `VAL001` | `"Required field missing: {field}"` | Required property not provided | Add missing field to object |
| `VAL002` | `"Invalid field type: {field}"` | Wrong data type for field | Use correct type (string, number, array, etc.) |
| `VAL003` | `"Invalid field value: {field}"` | Value doesn't match constraints | Check field constraints and valid values |
| `VAL004` | `"Invalid STIX ID format: {id}"` | Malformed STIX identifier | Use format: `{type}--{uuid}` |
| `VAL005` | `"Invalid ATT&CK ID format: {id}"` | Malformed ATT&CK identifier | Follow ATT&CK ID patterns (T1234, G0001, etc.) |
| `VAL006` | `"Schema refinement failed: {details}"` | Custom validation rule failed | Check object meets all requirements |

**Common Validation Issues**:

```typescript
// ❌ VAL001 - Missing required field
{
    "type": "attack-pattern",
    "id": "attack-pattern--12345...",
    // Missing: name, description, created, modified, etc.
}

// ❌ VAL002 - Invalid field type
{
    "type": "attack-pattern",
    "name": 123, // Should be string
    "x_mitre_platforms": "Windows" // Should be array
}

// ❌ VAL004 - Invalid STIX ID
{
    "id": "not-a-valid-stix-id"
}

// ✅ Valid object
{
    "type": "attack-pattern",
    "id": "attack-pattern--12345678-1234-1234-1234-123456789012",
    "spec_version": "2.1",
    "created": "2023-01-01T00:00:00.000Z",
    "modified": "2023-01-01T00:00:00.000Z",
    "name": "Process Injection",
    "description": "Adversaries may inject code...",
    "x_mitre_attack_spec_version": "3.3.0",
    "x_mitre_version": "1.0"
}
```

#### BundleValidationError

**Type**: `BundleValidationError`
**Thrown by**: STIX bundle validation

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `BUN001` | `"Invalid bundle structure"` | Not a valid STIX bundle | Ensure `type: "bundle"` and objects array |
| `BUN002` | `"Bundle contains no objects"` | Empty objects array | Add STIX objects to bundle |
| `BUN003` | `"Duplicate object IDs in bundle"` | Same ID used multiple times | Ensure all object IDs are unique |
| `BUN004` | `"Invalid bundle ID format"` | Malformed bundle identifier | Use format: `bundle--{uuid}` |

### Relationship Errors

Errors from relationship processing and navigation.

#### RelationshipError

**Type**: `RelationshipError`
**Thrown by**: Relationship processing, navigation methods

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `REL001` | `"Invalid relationship type: {type}"` | Unknown relationship type | Use valid STIX relationship types |
| `REL002` | `"Source object not found: {id}"` | Relationship source doesn't exist | Ensure source object is in dataset |
| `REL003` | `"Target object not found: {id}"` | Relationship target doesn't exist | Ensure target object is in dataset |
| `REL004` | `"Circular relationship detected"` | Self-referencing relationship chain | Fix relationship structure |
| `REL005` | `"Invalid relationship direction"` | Wrong source/target for relationship type | Check relationship type requirements |

**Example**:

```typescript
// ❌ REL001 - Invalid relationship type
{
    "type": "relationship",
    "relationship_type": "invalid-relationship",
    "source_ref": "attack-pattern--...",
    "target_ref": "x-mitre-tactic--..."
}

// ✅ Valid relationship
{
    "type": "relationship",
    "relationship_type": "uses",
    "source_ref": "intrusion-set--...",
    "target_ref": "attack-pattern--..."
}
```

### Parsing Errors

Errors from data parsing and processing.

#### ParsingError

**Type**: `ParsingError`
**Thrown by**: Data parsing, format processing

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `PAR001` | `"Invalid JSON format"` | Malformed JSON data | Fix JSON syntax errors |
| `PAR002` | `"Unsupported data format"` | Non-JSON or unknown format | Use valid STIX JSON format |
| `PAR003` | `"Data too large to process"` | Bundle exceeds size limits | Split into smaller bundles or increase limits |
| `PAR004` | `"Encoding error: {encoding}"` | Unsupported character encoding | Use UTF-8 encoding |

### Configuration Errors

Errors from library configuration and setup.

#### ConfigurationError

**Type**: `ConfigurationError`
**Thrown by**: Library initialization, configuration validation

| Error Code | Message Pattern | Cause | Solution |
|------------|-----------------|-------|----------|
| `CFG001` | `"Invalid configuration: {details}"` | Configuration object invalid | Check configuration structure |
| `CFG002` | `"Conflicting options: {options}"` | Mutually exclusive options set | Use only one of the conflicting options |
| `CFG003` | `"Environment not supported: {env}"` | Unsupported runtime environment | Use supported Node.js version |
| `CFG004` | `"Missing dependency: {dependency}"` | Required dependency not installed | Install missing dependencies |

## Error Handling Patterns

### Basic Error Handling

```typescript
try {
    const dataSource = new DataSource({ source: 'attack', domain: 'enterprise-attack' });
    const uuid = await registerDataSource(dataSource);
    const attackDataModel = loadDataModel(uuid);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation failed:', error.errors);
    } else if (error instanceof NetworkError) {
        console.error('Network issue:', error.message);
    } else if (error instanceof FileSystemError) {
        console.error('File system error:', error.message);
    } else {
        console.error('Unknown error:', error);
    }
}
```

### Specific Error Code Handling

```typescript
try {
    // ... data loading code
} catch (error) {
    switch (error.code) {
        case 'NET002': // Request timeout
            console.log('Request timed out, retrying with longer timeout...');
            // Implement retry logic
            break;

        case 'VAL001': // Missing required field
            console.error('Data validation failed - required field missing');
            // Log specific validation errors
            break;

        case 'REL002': // Relationship target not found
            console.warn('Relationship integrity issue - continuing in relaxed mode');
            // Use relaxed parsing mode
            break;

        default:
            console.error('Unhandled error:', error);
    }
}
```

### Comprehensive Error Handler

```typescript
class AttackErrorHandler {
    static handle(error: unknown): {
        severity: 'fatal' | 'warning' | 'info';
        message: string;
        solution: string;
    } {
        if (error instanceof ValidationError) {
            return {
                severity: 'fatal',
                message: `Validation failed: ${error.errors.length} errors`,
                solution: 'Fix validation errors or use relaxed parsing mode'
            };
        }

        if (error instanceof NetworkError) {
            return {
                severity: error.code === 'NET002' ? 'warning' : 'fatal',
                message: `Network error: ${error.message}`,
                solution: 'Check connectivity and retry with backoff'
            };
        }

        if (error instanceof RelationshipError) {
            return {
                severity: 'warning',
                message: `Relationship issue: ${error.message}`,
                solution: 'Use relaxed mode or fix relationship integrity'
            };
        }

        return {
            severity: 'fatal',
            message: `Unknown error: ${error}`,
            solution: 'Check error details and library documentation'
        };
    }
}

// Usage
try {
    // ... ATT&CK data operations
} catch (error) {
    const errorInfo = AttackErrorHandler.handle(error);
    console.log(`[${errorInfo.severity.toUpperCase()}] ${errorInfo.message}`);
    console.log(`Solution: ${errorInfo.solution}`);
}
```

## Debugging Tips

### Enable Detailed Logging

```typescript
// Set environment variable for verbose logging
process.env.ATTACK_DEBUG = 'true';

// Or enable programmatically
import { setDebugMode } from '@mitre-attack/attack-data-model';
setDebugMode(true);
```

### Validate Data Before Processing

```typescript
import { validateBundle } from '@mitre-attack/attack-data-model';

// Validate bundle structure before registration
const result = validateBundle(bundleData);
if (!result.isValid) {
    console.error('Bundle validation failed:');
    result.errors.forEach(error => console.error(`- ${error.message}`));
} else {
    // Safe to proceed with registration
}
```

### Check Data Source Status

```typescript
import { getDataSourceStatus } from '@mitre-attack/attack-data-model';

const status = getDataSourceStatus(uuid);
console.log(`Data source status: ${status.state}`);
console.log(`Last updated: ${status.lastUpdated}`);
console.log(`Object counts:`, status.objectCounts);
```

## Recovery Strategies

### Network Failures

1. **Implement exponential backoff retry**
2. **Use cached data if available**
3. **Fall back to local data sources**
4. **Increase timeout values for slow connections**

### Validation Failures

1. **Use relaxed parsing mode for development**
2. **Fix specific validation errors identified**
3. **Update data to match current schema requirements**
4. **Use partial data loading if some objects are valid**

### Relationship Issues

1. **Use relaxed mode to ignore broken relationships**
2. **Validate relationship integrity before processing**
3. **Remove orphaned relationships from datasets**
4. **Update data sources to fix reference issues**

---

## See Also

- **[Configuration Reference](./configuration)** - Complete configuration options
- **[How-to Guide: Error Handling](../how-to-guides/error-handling)** - Practical error handling strategies
- **[Validation Guide](../how-to-guides/validate-bundles)** - Data validation techniques
