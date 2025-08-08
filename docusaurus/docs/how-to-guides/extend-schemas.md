# How to Extend Schemas with Custom Fields

**Add your own properties to ATT&CK objects while preserving validation**

When building applications with the ATT&CK Data Model, you may need to add custom fields to ATT&CK objects for your specific use case. This guide shows you how to extend the provided schemas while maintaining all existing validation rules.

## Problem

You want to:

- Add custom fields to ATT&CK objects (techniques, groups, etc.)
- Preserve all existing ATT&CK validation rules and refinements
- Use the extended schemas in your application
- Maintain type safety with TypeScript

## Solution Overview

Extend ATT&CK schemas using Zod's extension methods while manually reapplying the original refinements that would otherwise be lost.

## Step 1: Understanding Schema Refinements

ATT&CK schemas use Zod refinements for advanced validation. When you extend a schema, these refinements are discarded:

```typescript
import { campaignSchema } from '@mitre-attack/attack-data-model';

// ❌ This loses the original refinements
const extendedCampaign = campaignSchema.extend({
    customField: z.string()
});

// ✅ This preserves refinements (we'll show how below)
```

First, check which refinements a schema uses by examining its source file or the exported refinement functions.

## Step 2: Extending Campaigns with Custom Fields

Let's extend the campaign schema with custom tracking fields:

```typescript
import { 
    campaignSchema, 
    createFirstAliasRefinement, 
    createCitationsRefinement 
} from '@mitre-attack/attack-data-model';
import { z } from 'zod';

// Define your custom fields
const customCampaignFields = z.object({
    x_custom_severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    x_custom_industry_targets: z.array(z.string()).optional(),
    x_custom_confidence_score: z.number().min(0).max(100).optional(),
    x_custom_tracking_id: z.string().optional()
});

// Extend the schema with custom fields
const extendedCampaignSchema = campaignSchema
    .extend(customCampaignFields.shape)
    .superRefine((data, ctx) => {
        // Reapply the original refinements
        createFirstAliasRefinement()(data, ctx);
        createCitationsRefinement()(data, ctx);
        
        // Add custom validation rules
        if (data.x_custom_confidence_score !== undefined && 
            data.x_custom_confidence_score > 50 && 
            !data.x_custom_severity) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "High confidence campaigns must specify severity",
                path: ['x_custom_severity']
            });
        }
    });

// Create TypeScript type from extended schema
type ExtendedCampaign = z.infer<typeof extendedCampaignSchema>;
```

## Step 3: Extending Techniques with Metadata

Extend technique schemas for custom threat intelligence:

```typescript
import { 
    techniqueSchema, 
    createTacticRefinement,
    createAttackIdRefinement,
    createCitationsRefinement 
} from '@mitre-attack/attack-data-model';

const customTechniqueFields = z.object({
    x_custom_detection_difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    x_custom_business_impact: z.number().min(1).max(5).optional(),
    x_custom_last_seen: z.string().datetime().optional(),
    x_custom_tags: z.array(z.string()).optional(),
    x_custom_iocs: z.array(z.object({
        type: z.enum(['hash', 'ip', 'domain', 'file_path']),
        value: z.string(),
        confidence: z.number().min(0).max(100)
    })).optional()
});

const extendedTechniqueSchema = techniqueSchema
    .extend(customTechniqueFields.shape)
    .superRefine((data, ctx) => {
        // Reapply original refinements
        createTacticRefinement()(data, ctx);
        createAttackIdRefinement()(data, ctx);
        createCitationsRefinement()(data, ctx);
        
        // Custom validation: ensure IoCs have valid formats
        if (data.x_custom_iocs) {
            data.x_custom_iocs.forEach((ioc, index) => {
                if (ioc.type === 'ip' && !isValidIP(ioc.value)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Invalid IP address format",
                        path: ['x_custom_iocs', index, 'value']
                    });
                }
            });
        }
    });

type ExtendedTechnique = z.infer<typeof extendedTechniqueSchema>;

// Helper validation function
function isValidIP(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
```

## Step 4: Creating a Schema Extension Factory

Build a reusable factory for extending any ATT&CK schema:

```typescript
interface SchemaExtensionConfig<T> {
    customFields: z.ZodRawShape;
    refinements: Array<(data: any, ctx: z.RefinementCtx) => void>;
    customValidation?: (data: T, ctx: z.RefinementCtx) => void;
}

function extendAttackSchema<T extends z.ZodRawShape, U>(
    baseSchema: z.ZodObject<T>,
    config: SchemaExtensionConfig<U>
) {
    return baseSchema
        .extend(config.customFields)
        .superRefine((data, ctx) => {
            // Apply original refinements
            config.refinements.forEach(refinement => {
                refinement(data, ctx);
            });
            
            // Apply custom validation if provided
            if (config.customValidation) {
                config.customValidation(data as U, ctx);
            }
        });
}

// Usage examples
const extendedGroupSchema = extendAttackSchema(groupSchema, {
    customFields: {
        x_custom_threat_level: z.enum(['nation-state', 'criminal', 'hacktivist']).optional(),
        x_custom_active_since: z.string().datetime().optional()
    },
    refinements: [
        createFirstAliasRefinement(),
        createCitationsRefinement()
    ],
    customValidation: (data, ctx) => {
        if (data.x_custom_threat_level === 'nation-state' && 
            !data.x_custom_active_since) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Nation-state groups must have active_since date",
                path: ['x_custom_active_since']
            });
        }
    }
});
```

## Step 5: Working with Extended Schemas

Use your extended schemas in applications:

```typescript
// Validate data with extended schema
function validateExtendedCampaign(data: unknown): ExtendedCampaign {
    try {
        return extendedCampaignSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation errors:');
            error.errors.forEach(err => {
                console.error(`${err.path.join('.')}: ${err.message}`);
            });
        }
        throw error;
    }
}

// Example usage with custom data
const customCampaignData = {
    // Standard ATT&CK fields
    type: "campaign",
    spec_version: "2.1",
    id: "campaign--12345678-1234-1234-1234-123456789012",
    created: "2023-01-01T00:00:00.000Z",
    modified: "2023-01-01T00:00:00.000Z",
    name: "Custom Campaign",
    description: "A campaign with custom fields",
    x_mitre_attack_spec_version: "3.3.0",
    x_mitre_version: "1.0",
    
    // Your custom fields
    x_custom_severity: "high",
    x_custom_industry_targets: ["finance", "healthcare"],
    x_custom_confidence_score: 85,
    x_custom_tracking_id: "TRACK-2023-001"
};

const validatedCampaign = validateExtendedCampaign(customCampaignData);
console.log(validatedCampaign.x_custom_severity); // TypeScript knows this exists!
```

## Step 6: Creating Custom Implementation Classes

Extend the implementation classes to work with your custom fields:

```typescript
import { CampaignImpl } from '@mitre-attack/attack-data-model';

class ExtendedCampaignImpl extends CampaignImpl {
    // Custom methods for your extended fields
    getSeverityLevel(): string {
        return (this as any).x_custom_severity || 'unknown';
    }
    
    getIndustryTargets(): string[] {
        return (this as any).x_custom_industry_targets || [];
    }
    
    isHighConfidence(): boolean {
        const score = (this as any).x_custom_confidence_score;
        return score !== undefined && score >= 80;
    }
    
    // Custom business logic
    calculateRiskScore(): number {
        const severityWeight = {
            'low': 1,
            'medium': 2,
            'high': 3,
            'critical': 4
        };
        
        const severity = this.getSeverityLevel();
        const confidence = (this as any).x_custom_confidence_score || 0;
        
        return (severityWeight[severity] || 0) * (confidence / 100);
    }
}

// Factory function to create extended instances
function createExtendedCampaign(data: ExtendedCampaign): ExtendedCampaignImpl {
    return new ExtendedCampaignImpl(data);
}
```

## Step 7: Integrating with Data Sources

Load custom data with extended schemas:

```typescript
import { DataSource } from '@mitre-attack/attack-data-model';

class ExtendedDataProcessor {
    async processCustomBundle(filePath: string) {
        // Load the bundle with standard data source
        const dataSource = new DataSource({
            source: 'file',
            file: filePath,
            parsingMode: 'relaxed' // Allow custom fields
        });
        
        const uuid = await registerDataSource(dataSource);
        const attackDataModel = loadDataModel(uuid);
        
        // Process campaigns with extended validation
        const extendedCampaigns = attackDataModel.campaigns.map(campaign => {
            try {
                // Validate against extended schema
                const validatedData = extendedCampaignSchema.parse(campaign);
                return createExtendedCampaign(validatedData);
            } catch (error) {
                console.warn(`Campaign ${campaign.name} failed extended validation:`, error);
                return null;
            }
        }).filter(Boolean) as ExtendedCampaignImpl[];
        
        return extendedCampaigns;
    }
}
```

## Step 8: Schema Composition for Complex Extensions

Combine multiple extensions for comprehensive customization:

```typescript
// Base threat intelligence fields
const threatIntelFields = z.object({
    x_custom_confidence: z.number().min(0).max(100),
    x_custom_source: z.string(),
    x_custom_last_updated: z.string().datetime()
});

// Organization-specific fields
const orgSpecificFields = z.object({
    x_org_priority: z.enum(['p1', 'p2', 'p3', 'p4']),
    x_org_assigned_analyst: z.string().optional(),
    x_org_notes: z.array(z.object({
        timestamp: z.string().datetime(),
        author: z.string(),
        content: z.string()
    })).optional()
});

// Compose multiple extensions
const fullyExtendedTechniqueSchema = techniqueSchema
    .extend({
        ...threatIntelFields.shape,
        ...orgSpecificFields.shape,
        ...customTechniqueFields.shape
    })
    .superRefine((data, ctx) => {
        // Apply all refinements and validations
        createTacticRefinement()(data, ctx);
        createAttackIdRefinement()(data, ctx);
        createCitationsRefinement()(data, ctx);
        
        // Cross-field validation
        if (data.x_org_priority === 'p1' && !data.x_org_assigned_analyst) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "P1 techniques must have assigned analyst",
                path: ['x_org_assigned_analyst']
            });
        }
    });

type FullyExtendedTechnique = z.infer<typeof fullyExtendedTechniqueSchema>;
```

## Common Pitfalls

### Forgetting Refinements

Always check the original schema file to see which refinements to reapply:

```typescript
// Look in the source schema file for patterns like:
// .superRefine(createSomeRefinement())
// .check(someValidationFunction)
```

### Invalid Custom Field Names

Follow STIX custom property naming conventions:

```typescript
// ✅ Correct - use your namespace prefix
x_myorg_custom_field: z.string()

// ❌ Incorrect - generic x_custom may conflict
x_custom_field: z.string()
```

### Type Safety Issues

Ensure TypeScript integration works correctly:

```typescript
// Create proper type exports
export type ExtendedCampaign = z.infer<typeof extendedCampaignSchema>;
export const extendedCampaignSchema = /* your schema */;

// Use type assertions carefully in implementation classes
class ExtendedImpl extends BaseImpl {
    getCustomField(): string {
        return (this as ExtendedCampaign).x_custom_field || '';
    }
}
```

## Testing Extended Schemas

Create comprehensive tests for your extensions:

```typescript
import { describe, it, expect } from 'vitest';

describe('Extended Campaign Schema', () => {
    it('should validate campaigns with custom fields', () => {
        const validCampaign = {
            // ... standard fields
            x_custom_severity: 'high',
            x_custom_confidence_score: 90
        };
        
        expect(() => extendedCampaignSchema.parse(validCampaign)).not.toThrow();
    });
    
    it('should enforce custom validation rules', () => {
        const invalidCampaign = {
            // ... standard fields
            x_custom_confidence_score: 95 // High confidence without severity
        };
        
        expect(() => extendedCampaignSchema.parse(invalidCampaign)).toThrow();
    });
});
```

---

## Next Steps

- **Validation**: Learn how to [validate custom bundles](./validate-bundles) with your extended schemas
- **Error Handling**: Implement [robust error handling](./error-handling) for validation failures
- **Reference**: Explore the [complete schema API](../reference/schemas/)

Your extended schemas now preserve all ATT&CK validation while supporting your custom use cases!
