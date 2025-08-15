# Schema Design Principles

**Validation philosophy, refinement patterns, and extensibility choices**

The schema layer is the foundation that enables both runtime validation and compile-time type safety in the ATT&CK Data Model. The design of these schemas reflects careful consideration of competing concerns: STIX compliance, ATT&CK domain rules, TypeScript integration, extensibility, and performance. This explanation explores the principles that guide schema design decisions.

## Core Design Philosophy

### Validation as Documentation

**Principle**: Schemas serve as executable documentation of ATT&CK requirements.

Rather than maintaining separate documentation about data format requirements, the schemas encode these requirements directly. This ensures that documentation stays synchronized with implementation and provides immediate feedback when requirements change.

```typescript
// Schema encodes the requirement that techniques must have ATT&CK IDs
const techniqueSchema = z.object({
    external_references: z.array(externalReferenceSchema).min(1)
}).superRefine((data, ctx) => {
    const firstRef = data.external_references[0];
    if (firstRef.source_name !== 'mitre-attack' || !firstRef.external_id) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'First external reference must contain ATT&CK ID'
        });
    }
});
```

This approach means that anyone using the schemas automatically understands ATT&CK requirements through validation feedback, rather than needing to consult separate documentation.

### Type Inference Over Type Declaration

**Principle**: TypeScript types are inferred from schemas, not declared separately.

This prevents the common problem of types becoming out of sync with runtime validation:

```typescript
// ✅ Single source of truth - types inferred from schema
const techniqueSchema = z.object({
    name: z.string(),
    x_mitre_platforms: z.array(z.string()).optional()
});
type Technique = z.infer<typeof techniqueSchema>;

// ❌ Avoided - separate type declarations that can drift
interface Technique {
    name: string;
    x_mitre_platforms?: string[];
}
const techniqueSchema = z.object(/* ... */);
```

**Benefits**:

- Impossible for types to become inconsistent with validation
- Schema changes automatically propagate to TypeScript types
- Refactoring tools work across both validation and type layers

**Trade-offs**:

- More complex TypeScript types that reflect schema structure
- Limited ability to create "prettier" type declarations
- Schema design is constrained by TypeScript type inference capabilities

## Schema Architecture Patterns

### Hierarchical Schema Composition

ATT&CK schemas are built through composition rather than inheritance, reflecting the layered nature of STIX + ATT&CK requirements:

```typescript
// Base STIX requirements
const stixDomainObjectSchema = z.object({
    type: z.string(),
    spec_version: z.literal('2.1'),
    id: stixIdentifierSchema,
    created: stixTimestampSchema,
    modified: stixTimestampSchema
});

// ATT&CK-specific additions
const attackBaseObjectSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    x_mitre_attack_spec_version: z.string(),
    x_mitre_version: z.string(),
    x_mitre_domains: z.array(z.enum(['enterprise-attack', 'mobile-attack', 'ics-attack'])),
    external_references: z.array(externalReferenceSchema).min(1)
});

// Object-specific requirements
const techniqueSchema = stixDomainObjectSchema
    .merge(attackBaseObjectSchema)
    .extend({
        type: z.literal('attack-pattern'),
        kill_chain_phases: z.array(killChainPhaseSchema),
        x_mitre_platforms: z.array(z.string()).optional(),
        x_mitre_is_subtechnique: z.boolean().optional()
    });
```

**Design Rationale**:

- **Composition over inheritance** enables flexible schema reuse
- **Layer separation** makes it clear which requirements come from which standards
- **Merge vs extend** choice depends on whether properties can conflict

### Refinement Pattern for Complex Validation

Simple property validation isn't sufficient for ATT&CK's business rules. The refinement pattern handles cross-property and contextual validation:

```typescript
const techniqueWithRefinements = techniqueSchema
    .superRefine(createAttackIdRefinement())
    .superRefine(createTacticRefinement())
    .superRefine(createSubtechniqueRefinement());

// Refinements are factory functions for reusability
function createAttackIdRefinement() {
    return (data: any, ctx: z.RefinementCtx) => {
        const firstRef = data.external_references?.[0];
        if (!firstRef || firstRef.source_name !== 'mitre-attack') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'First external reference must be ATT&CK ID',
                path: ['external_references', 0]
            });
        }

        // Validate ATT&CK ID format
        const attackId = firstRef.external_id;
        if (attackId && !isValidAttackId(attackId, data.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Invalid ATT&CK ID format: ${attackId}`,
                path: ['external_references', 0, 'external_id']
            });
        }
    };
}
```

**Why Factory Functions**:

- **Reusability** across multiple schemas
- **Testability** in isolation from schemas
- **Composability** - refinements can be mixed and matched
- **Extensibility** - users can add their own refinements

## Extensibility Architecture

### The Refinement Challenge

Zod's extension methods (`extend`, `merge`, `pick`, `omit`) discard refinements, creating a challenge for extensibility:

```typescript
// ❌ This loses refinements
const extendedTechnique = techniqueSchema.extend({
    x_custom_field: z.string()
});

// ✅ This preserves refinements
const extendedTechnique = techniqueSchema
    .extend({ x_custom_field: z.string() })
    .superRefine(createAttackIdRefinement())  // Must reapply manually
    .superRefine(createTacticRefinement());
```

**Design Response**:

1. **Export refinement factories** so users can reapply them
2. **Document which refinements** each schema uses
3. **Provide extension helpers** that automate refinement reapplication

```typescript
// Helper function for common extension pattern
export function extendAttackSchema<T extends z.ZodRawShape, U>(
    baseSchema: z.ZodObject<T>,
    extensions: U,
    refinements: Array<(data: any, ctx: z.RefinementCtx) => void>
) {
    let extended = baseSchema.extend(extensions);
    for (const refinement of refinements) {
        extended = extended.superRefine(refinement);
    }
    return extended;
}

// Usage
const customTechnique = extendAttackSchema(
    techniqueSchema,
    { x_org_threat_level: z.enum(['low', 'medium', 'high']) },
    [createAttackIdRefinement(), createTacticRefinement()]
);
```

### Custom Property Conventions

STIX custom property naming conventions are enforced through schema design:

```typescript
// Custom properties must use x_ prefix
const customPropertySchema = z.record(
    z.string().regex(/^x_[a-z0-9_]+$/),  // Enforce naming convention
    z.unknown()                          // Allow any value type
);

const extensibleObjectSchema = baseSchema.and(customPropertySchema);
```

**Benefits**:

- **Standards compliance** is automatically enforced
- **Namespace conflicts** are prevented
- **Tool interoperability** is preserved

**Limitations**:

- **Naming restrictions** may feel constraining
- **TypeScript integration** is more complex with dynamic properties
- **Validation messages** may be unclear for naming violations

## Validation Philosophy

### Strict vs Relaxed Modes

The schema design supports two validation philosophies through parsing modes:

#### Strict Mode Philosophy

**"Data integrity is paramount - invalid data must be rejected completely"**

```typescript
// Strict mode - all objects must validate
const result = techniqueSchema.parse(data);  // Throws on any error
```

**Use cases**:

- Production applications requiring data quality guarantees
- Integration with systems that can't handle partial data
- Testing and validation scenarios

#### Relaxed Mode Philosophy

**"Partial data is better than no data - log errors but continue processing"**

```typescript
// Relaxed mode - continue with valid objects
const result = techniqueSchema.safeParse(data);
if (!result.success) {
    console.warn('Validation warnings:', result.error.errors);
    return null;  // Skip invalid objects but continue processing
}
return result.data;
```

**Use cases**:

- Research and development environments
- Integration with data sources that may have minor quality issues
- Gradual data migration scenarios

### Error Message Design

Schema error messages are designed for developer clarity rather than end-user consumption:

```typescript
// Good error message design
ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Technique must specify at least one platform in x_mitre_platforms',
    path: ['x_mitre_platforms']
});

// Poor error message design
ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Invalid',  // Too vague
    path: []             // No specific location
});
```

**Design principles**:

- **Specific location** - use path arrays to pinpoint issues
- **Actionable guidance** - explain what needs to be fixed
- **Context awareness** - reference ATT&CK concepts, not just schema structure
- **Technical accuracy** - precise terminology for developers

## Performance Considerations

### Schema Compilation Strategy

Schemas are designed to compile once and reuse many times:

```typescript
// ✅ Compile schema once
const compiledSchema = techniqueSchema;

// ✅ Reuse for multiple validations
data.forEach(item => compiledSchema.parse(item));

// ❌ Don't recompile schemas
data.forEach(item => z.object({/* ... */}).parse(item));
```

**Optimization strategies**:

- **Schema caching** to avoid recompilation
- **Partial compilation** for frequently-used sub-schemas
- **Lazy loading** for rarely-used validation rules

### Memory vs Speed Tradeoffs

Schema design balances memory usage against validation speed:

```typescript
// Memory-efficient but slower - shared schema instances
const baseSchema = z.object({/* large schema */});
const schema1 = baseSchema.extend({/* additions */});
const schema2 = baseSchema.extend({/* different additions */});

// Faster but memory-intensive - separate compiled schemas
const schema1 = z.object({/* complete schema */});
const schema2 = z.object({/* complete schema with duplicated parts */});
```

The library chooses **memory efficiency over raw speed** because:

- ATT&CK datasets are large but validation happens infrequently
- Schema compilation time is amortized across many validations
- Memory usage affects application scalability more than validation speed

## Testing Strategy for Schemas

### Positive and Negative Test Cases

Each schema includes comprehensive test coverage:

```typescript
describe('techniqueSchema', () => {
    it('accepts valid technique objects', () => {
        const validTechnique = {
            type: 'attack-pattern',
            id: 'attack-pattern--12345678-1234-1234-1234-123456789012',
            spec_version: '2.1',
            created: '2023-01-01T00:00:00.000Z',
            modified: '2023-01-01T00:00:00.000Z',
            name: 'Process Injection',
            description: 'Adversaries may inject code...',
            external_references: [{
                source_name: 'mitre-attack',
                external_id: 'T1055',
                url: 'https://attack.mitre.org/techniques/T1055'
            }],
            x_mitre_attack_spec_version: '3.3.0',
            x_mitre_version: '1.0'
        };

        expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
    });

    it('rejects techniques without ATT&CK IDs', () => {
        const invalidTechnique = {
            // Valid STIX structure but missing ATT&CK ID
            type: 'attack-pattern',
            id: 'attack-pattern--12345678-1234-1234-1234-123456789012',
            // ... other required fields
            external_references: [{
                source_name: 'other-source',  // Not mitre-attack
                external_id: 'OTHER-001'
            }]
        };

        expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
    });
});
```

### Real-World Data Testing

Schemas are tested against actual ATT&CK releases:

```typescript
// Test against production ATT&CK data
describe('schema compatibility', () => {
    it('validates current ATT&CK enterprise data', async () => {
        const enterpriseData = await loadAttackData('enterprise-attack', '15.1');

        enterpriseData.objects.forEach(obj => {
            if (obj.type === 'attack-pattern') {
                expect(() => techniqueSchema.parse(obj)).not.toThrow();
            }
        });
    });
});
```

This ensures schemas remain compatible with real ATT&CK data evolution.

## Future Evolution Patterns

### Schema Versioning Strategy

Schemas evolve alongside ATT&CK specifications:

```typescript
// Version-aware schema selection
const getSchemaForVersion = (attackVersion: string) => {
    if (attackVersion >= '3.3.0') {
        return techniqueSchemaV3_3;
    } else if (attackVersion >= '3.0.0') {
        return techniqueSchemaV3_0;
    } else {
        return legacyTechniqueSchema;
    }
};
```

**Migration strategy**:

- **Backward compatibility** for older ATT&CK versions
- **Gradual deprecation** of obsolete schema features
- **Clear migration paths** between schema versions

### Extension Point Evolution

Schema extension mechanisms evolve to support new use cases:

```typescript
// Current extension pattern
const extended = baseSchema.extend(customFields).superRefine(customRefinement);

// Future extension pattern (conceptual)
const extended = baseSchema.withExtensions({
    fields: customFields,
    refinements: [customRefinement],
    metadata: { version: '2.0', namespace: 'org' }
});
```

## Living with Schema Complexity

### When Schemas Feel Too Complex

The ATT&CK Data Model schemas can feel overwhelming because they encode the full complexity of STIX + ATT&CK requirements. This complexity is **intentional and necessary**:

- **STIX compliance** requires numerous fields and validation rules
- **ATT&CK domain rules** add additional constraints beyond STIX
- **Type safety** demands precise specification of all possibilities
- **Extensibility** needs mechanisms that maintain standards compliance

### Simplification Strategies

When working with the schemas feels too complex, consider:

1. **Use higher-level APIs** - Implementation classes abstract schema complexity
2. **Focus on your use case** - You don't need to understand all schema features
3. **Start simple** - Begin with basic objects and add complexity gradually
4. **Leverage validation feedback** - Let schema errors guide you to correct usage

## The Schema Design Philosophy in Practice

The schema design reflects a philosophical commitment to:

1. **Correctness over convenience** - Better to be precise than easy
2. **Standards compliance over optimization** - STIX compatibility is non-negotiable
3. **Type safety over flexibility** - Catch errors at compile time when possible
4. **Documentation through code** - Schemas serve as executable specifications
5. **Future-proofing over current simplicity** - Design for evolution and extension

Understanding these philosophical commitments helps you work effectively with the schema layer and contribute to its continued development.

---

**Next**: Explore how these schema design decisions create **[Performance vs Flexibility Trade-offs](./trade-offs)** in the overall library architecture.
