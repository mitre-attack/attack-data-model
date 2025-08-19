import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# How to Validate Custom STIX Bundles

<WorkInProgressNotice />

**Ensure your custom ATT&CK data meets specification requirements**

When working with custom STIX 2.1 bundles containing ATT&CK data, you need to validate that they conform to both the STIX specification and ATT&CK schema requirements. This guide shows you how to implement comprehensive validation for your custom data.

## Problem

You have custom STIX 2.1 bundles containing ATT&CK objects and need to:

- Verify they meet STIX 2.1 specification requirements
- Ensure ATT&CK-specific validation rules are satisfied
- Handle validation errors appropriately
- Integrate validation into your data processing pipeline

## Solution Overview

Use the ATT&CK Data Model's validation system with proper error handling to validate custom bundles before processing them.

## Step 1: Basic Bundle Validation

Create a validation function for STIX bundles:

```typescript
import {
    registerDataSource,
    loadDataModel,
    DataSource,
    stixBundleSchema
} from '@mitre-attack/attack-data-model';
import { z } from 'zod';
import fs from 'fs';

async function validateCustomBundle(filePath: string): Promise<boolean> {
    try {
        // Read the bundle file
        const bundleContent = fs.readFileSync(filePath, 'utf8');
        const bundleData = JSON.parse(bundleContent);

        // Basic STIX bundle validation
        const validatedBundle = stixBundleSchema.parse(bundleData);

        console.log('✅ Bundle structure is valid');
        console.log(`📦 Bundle contains ${validatedBundle.objects.length} objects`);

        return true;

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Bundle validation failed:');
            error.errors.forEach(err => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
        } else {
            console.error('❌ Error reading bundle:', error);
        }
        return false;
    }
}
```

## Step 2: ATT&CK Object Validation

Validate individual ATT&CK objects within the bundle:

```typescript
import {
    techniqueSchema,
    tacticSchema,
    groupSchema,
    malwareSchema,
    toolSchema,
    campaignSchema
} from '@mitre-attack/attack-data-model';

interface ValidationResult {
    isValid: boolean;
    errors: string[];
    objectCounts: { [key: string]: number };
}

function validateAttackObjects(bundle: any): ValidationResult {
    const result: ValidationResult = {
        isValid: true,
        errors: [],
        objectCounts: {}
    };

    // Schema mapping for ATT&CK objects
    const schemaMap: { [key: string]: z.ZodSchema } = {
        'attack-pattern': techniqueSchema,
        'x-mitre-tactic': tacticSchema,
        'intrusion-set': groupSchema,
        'malware': malwareSchema,
        'tool': toolSchema,
        'campaign': campaignSchema
    };

    bundle.objects.forEach((obj: any, index: number) => {
        const objType = obj.type;

        // Count objects by type
        result.objectCounts[objType] = (result.objectCounts[objType] || 0) + 1;

        // Validate ATT&CK objects
        if (schemaMap[objType]) {
            try {
                schemaMap[objType].parse(obj);
            } catch (error) {
                result.isValid = false;
                if (error instanceof z.ZodError) {
                    error.errors.forEach(err => {
                        result.errors.push(
                            `Object ${index} (${objType}): ${err.path.join('.')}: ${err.message}`
                        );
                    });
                }
            }
        }
    });

    return result;
}
```

## Step 3: Comprehensive Bundle Validator

Combine validation steps into a comprehensive validator:

```typescript
async function comprehensiveValidation(filePath: string): Promise<void> {
    console.log(`🔍 Validating bundle: ${filePath}\n`);

    try {
        // Step 1: Read and parse
        const bundleContent = fs.readFileSync(filePath, 'utf8');
        const bundleData = JSON.parse(bundleContent);

        // Step 2: Validate bundle structure
        console.log('📋 Validating STIX bundle structure...');
        const validatedBundle = stixBundleSchema.parse(bundleData);
        console.log('✅ Bundle structure is valid\n');

        // Step 3: Validate ATT&CK objects
        console.log('🎯 Validating ATT&CK objects...');
        const objectValidation = validateAttackObjects(validatedBundle);

        // Display object counts
        console.log('📊 Object counts:');
        Object.entries(objectValidation.objectCounts).forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });
        console.log('');

        // Display validation results
        if (objectValidation.isValid) {
            console.log('✅ All ATT&CK objects are valid');
        } else {
            console.log('❌ ATT&CK object validation failed:');
            objectValidation.errors.forEach(error => {
                console.log(`  - ${error}`);
            });
        }

        // Step 4: Test loading with Data Model
        console.log('\n🔄 Testing bundle loading...');
        const dataSource = new DataSource({
            source: 'file',
            file: filePath,
            parsingMode: 'strict' // Use strict mode for validation
        });

        const uuid = await registerDataSource(dataSource);
        if (uuid) {
            const attackDataModel = loadDataModel(uuid);
            console.log('✅ Bundle loads successfully in ATT&CK Data Model');
            console.log(`📈 Loaded ${attackDataModel.techniques.length} techniques`);
            console.log(`📈 Loaded ${attackDataModel.tactics.length} tactics`);
        }

    } catch (error) {
        console.error('❌ Validation failed:', error);

        if (error instanceof z.ZodError) {
            console.error('\n📝 Detailed errors:');
            error.errors.forEach(err => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
        }
    }
}
```

## Step 4: Batch Validation

Validate multiple bundles at once:

```typescript
async function validateMultipleBundles(bundlePaths: string[]): Promise<void> {
    console.log(`🔄 Validating ${bundlePaths.length} bundles...\n`);

    const results = await Promise.allSettled(
        bundlePaths.map(async (path) => {
            try {
                await comprehensiveValidation(path);
                return { path, success: true };
            } catch (error) {
                return { path, success: false, error };
            }
        })
    );

    // Summary
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log('\n📊 Validation Summary:');
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);

    if (failed > 0) {
        console.log('\n❌ Failed bundles:');
        results.forEach(result => {
            if (result.status === 'fulfilled' && !result.value.success) {
                console.log(`  - ${result.value.path}`);
            }
        });
    }
}
```

## Step 5: Integration into Your Pipeline

Create a reusable validation utility:

```typescript
export interface BundleValidationOptions {
    strictMode?: boolean;
    validateRelationships?: boolean;
    allowedObjectTypes?: string[];
}

export class BundleValidator {
    private options: BundleValidationOptions;

    constructor(options: BundleValidationOptions = {}) {
        this.options = {
            strictMode: true,
            validateRelationships: true,
            ...options
        };
    }

    async validate(filePath: string): Promise<ValidationResult> {
        try {
            // Implementation combining all validation steps
            const bundleContent = fs.readFileSync(filePath, 'utf8');
            const bundleData = JSON.parse(bundleContent);

            // Validate with appropriate settings
            const bundleValidation = stixBundleSchema.parse(bundleData);
            const objectValidation = validateAttackObjects(bundleValidation);

            if (this.options.validateRelationships) {
                // Test loading to validate relationships
                const dataSource = new DataSource({
                    source: 'file',
                    file: filePath,
                    parsingMode: this.options.strictMode ? 'strict' : 'relaxed'
                });

                await registerDataSource(dataSource);
            }

            return {
                isValid: objectValidation.isValid,
                errors: objectValidation.errors,
                objectCounts: objectValidation.objectCounts
            };

        } catch (error) {
            return {
                isValid: false,
                errors: [`Validation failed: ${error}`],
                objectCounts: {}
            };
        }
    }
}

// Usage example
const validator = new BundleValidator({
    strictMode: true,
    validateRelationships: true
});

const result = await validator.validate('my-custom-bundle.json');
if (!result.isValid) {
    console.error('Validation failed:', result.errors);
}
```

## Common Validation Issues

### Missing Required Fields

```typescript
// ❌ Invalid technique - missing required fields
{
    "type": "attack-pattern",
    "id": "attack-pattern--12345678-1234-1234-1234-123456789012",
    "name": "My Custom Technique"
    // Missing: spec_version, created, modified, description, etc.
}

// ✅ Valid technique with all required fields
{
    "type": "attack-pattern",
    "id": "attack-pattern--12345678-1234-1234-1234-123456789012",
    "spec_version": "2.1",
    "created": "2023-01-01T00:00:00.000Z",
    "modified": "2023-01-01T00:00:00.000Z",
    "name": "My Custom Technique",
    "description": "Description of the technique",
    "x_mitre_attack_spec_version": "3.3.0",
    "x_mitre_version": "1.0"
}
```

### Invalid ATT&CK IDs

```typescript
// Validate ATT&CK ID format
function validateAttackId(id: string, objectType: string): boolean {
    const patterns: { [key: string]: RegExp } = {
        'attack-pattern': /^T\d{4}(\.\d{3})?$/, // T1234 or T1234.001
        'x-mitre-tactic': /^TA\d{4}$/,          // TA0001
        'intrusion-set': /^G\d{4}$/,            // G0001
        'malware': /^S\d{4}$/,                  // S0001
        'tool': /^S\d{4}$/                      // S0001
    };

    const pattern = patterns[objectType];
    return pattern ? pattern.test(id) : true;
}
```

## Performance Considerations

For large bundles, implement streaming validation:

```typescript
import { Transform } from 'stream';
import { parse } from 'stream-json';
import StreamValues from 'stream-json/streamers/StreamValues';

async function validateLargeBundle(filePath: string): Promise<void> {
    const pipeline = fs.createReadStream(filePath)
        .pipe(parse())
        .pipe(StreamValues.withParser())
        .pipe(new Transform({
            objectMode: true,
            transform(chunk, encoding, callback) {
                try {
                    // Validate individual objects
                    const obj = chunk.value;
                    // Perform validation on obj
                    callback(null, chunk);
                } catch (error) {
                    callback(error);
                }
            }
        }));

    return new Promise((resolve, reject) => {
        pipeline.on('end', resolve);
        pipeline.on('error', reject);
    });
}
```

## Integration with CI/CD

Add validation to your build pipeline:

```bash
#!/bin/bash
# validate-bundles.sh

echo "Validating ATT&CK bundles..."

for bundle in data/*.json; do
    echo "Validating $bundle..."
    npx tsx validate-bundle.ts "$bundle"

    if [ $? -ne 0 ]; then
        echo "❌ Validation failed for $bundle"
        exit 1
    fi
done

echo "✅ All bundles validated successfully"
```

---

## Next Steps

- **Error Handling**: Learn [how to handle parsing errors gracefully](./error-handling)
- **Schema Extension**: See [how to extend schemas with custom fields](./extend-schemas)
- **Reference**: Check the [complete API documentation](../reference/)

Your custom STIX bundles should now validate correctly and load reliably in the ATT&CK Data Model!
