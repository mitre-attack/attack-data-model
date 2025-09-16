import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Architecture and Design Trade-offs

<WorkInProgressNotice />

**Understanding the key decisions and compromises in the ATT&CK Data Model**

Software architecture involves countless trade-offs where optimizing for one goal requires sacrificing another.
The ATT&CK Data Model makes deliberate architectural choices that prioritize certain benefits while accepting specific costs.
Understanding these trade-offs helps users make informed decisions about when and how to use the library, and explains why certain features work the way they do.

## Performance vs. Flexibility

### Choice: Type-Safe Schemas with Runtime Validation

**Benefits:**

- Compile-time error detection prevents many bugs before deployment
- IDE support with auto-completion and inline documentation
- Runtime validation ensures data quality and standards compliance
- Clear error messages help developers debug invalid data quickly

**Costs:**

- Schema validation adds processing overhead during data loading
- Zod schemas increase bundle size compared to simple type annotations
- Complex nested validation can be slower than basic JSON parsing
- Memory usage is higher due to maintaining both raw and validated data

**When This Helps:** Applications requiring high data quality, strong type safety, or integration with TypeScript tooling.

**When This Hurts:** High-performance scenarios processing massive datasets where validation overhead is significant.

### Alternative Approaches Considered

**JSON Schema + Type Generation:**

- Would reduce runtime overhead but lose type-level validation
- Harder to maintain consistency between schemas and TypeScript types
- Less developer-friendly error messages

**Plain TypeScript Types:**

- Minimal runtime overhead but no data validation
- Risk of runtime errors from invalid data
- Difficult to ensure STIX 2.1 compliance

## Memory Usage vs. Query Performance

### Choice: Relationship Pre-computation and Caching

**Benefits:**

- Fast relationship traversal without expensive join operations
- Intuitive API methods like `technique.getTactics()` and `group.getCampaigns()`
- Consistent performance regardless of dataset size
- Enables complex relationship queries without graph database overhead

**Costs:**

- Higher memory usage due to storing relationship indexes
- Longer initial loading time as relationships are computed
- Memory usage grows quadratically with highly connected datasets
- Relationship updates require index rebuilding

**When This Helps:** Interactive applications requiring fast relationship navigation, dashboards, or analysis tools.

**When This Hurts:** Memory-constrained environments, serverless functions with size limits, or applications only needing simple object access.

### Alternative Approaches Considered

**On-Demand Relationship Resolution:**

- Lower memory usage but much slower relationship queries
- Would require complex caching to maintain reasonable performance
- API inconsistency where some operations are fast and others slow

**External Graph Database:**

- Better performance for complex queries but significant infrastructure overhead
- Would require additional deployment complexity
- Loss of type safety in graph traversal operations

## Standards Compliance vs. Extensibility

### Choice: STIX 2.1 Foundation with ATT&CK Extensions

**Benefits:**

- Full compatibility with existing STIX 2.1 tooling and datasets
- Standards-compliant approach enables ecosystem interoperability
- ATT&CK-specific validations ensure domain model accuracy
- Clear extension points for custom fields and validation rules

**Costs:**

- STIX complexity adds learning curve for ATT&CK-only users
- Standards compliance limits certain API design choices
- Verbose object structures due to STIX requirements
- Extension points require careful design to maintain compliance

**When This Helps:** Organizations with existing STIX infrastructure, tools requiring interoperability, or complex threat intelligence workflows.

**When This Hurts:** Simple applications only needing basic ATT&CK data access, or scenarios where STIX overhead isn't justified.

### Alternative Approaches Considered

**ATT&CK-Native Data Model:**

- Simpler API and smaller learning curve
- Better performance due to optimized data structures
- Loss of standards compliance and interoperability
- Custom tooling required for data exchange

**Generic JSON Objects:**

- Maximum flexibility and minimal constraints
- Loss of type safety, validation, and relationship navigation
- Increased development burden on applications

## Synchronous vs. Asynchronous API Design

### Choice: Synchronous Primary API with Async Registration

**Benefits:**

- Simple, intuitive API for data access operations
- No async complexity for common use cases like `model.techniques`
- Predictable performance characteristics for queries
- Easy integration with existing synchronous code

**Costs:**

- Initial data registration must be async (network/file operations)
- Cannot easily support streaming or progressive data loading
- Memory must hold entire dataset during synchronous operations
- Less suitable for reactive or event-driven architectures

**When This Helps:** Traditional application architectures, data analysis scripts, or scenarios requiring predictable synchronous data access.

**When This Hurts:** Event-driven systems, applications requiring progressive data loading, or memory-constrained streaming scenarios.

## Multi-Domain vs. Single-Domain Optimization

### Choice: Unified API Supporting Enterprise, Mobile, and ICS

**Benefits:**

- Single library handles all ATT&CK domains uniformly
- Consistent API across different domain types
- Easy cross-domain analysis and comparison
- Simplified dependency management for multi-domain applications

**Costs:**

- Larger bundle size even for single-domain usage
- Schema complexity must handle domain-specific variations
- Memory overhead for unused domain capabilities
- Potential performance impact from domain abstraction layer

**When This Helps:** Comprehensive threat analysis, research across multiple domains, or organizations using multiple ATT&CK domains.

**When This Hurts:** Specialized applications focused on single domain, mobile applications with size constraints, or embedded systems.

## Error Handling Philosophy

### Choice: Strict Validation with Relaxed Mode Option

**Benefits:**

- Default strict mode ensures data quality and early error detection
- Relaxed mode provides fallback for handling imperfect real-world data
- Clear error messages help developers identify and fix data issues
- Configurable behavior allows different use case optimization

**Costs:**

- Strict mode may reject usable data due to minor validation issues
- Error handling complexity increases application development burden
- Relaxed mode can lead to subtle bugs from incomplete data processing
- Debugging can be difficult when validation rules are complex

**When This Helps:** Production applications requiring data quality assurance, development environments where early error detection is valuable.

**When This Hurts:** Research scenarios with experimental data, rapid prototyping, or integration with legacy systems producing imperfect data.

## Development and Maintenance Implications

### Backward Compatibility vs. Evolution

We decided to make use of Semantic Versioning with Major Version Breaking Changes

**Benefits:** Clear compatibility promises and smooth upgrade paths for minor/patch versions.

**Costs:** Major version upgrades can require significant application changes, slowing adoption of new features.

## Guidance for Different Use Cases

### High-Performance Scenarios

- Consider simpler data access patterns to minimize validation overhead
- Use relaxed parsing mode if data quality requirements permit
- Profile memory usage and consider single-domain usage if appropriate

### Memory-Constrained Environments

- Evaluate whether relationship pre-computation benefits justify memory costs
- Consider processing data in smaller batches if possible
- Monitor memory usage patterns and optimize based on actual usage

### Standards-Compliant Integrations

- Leverage STIX 2.1 compliance for interoperability benefits
- Use extension points carefully to maintain standards compliance
- Design custom validations to complement rather than replace STIX requirements

### Rapid Development and Prototyping

- Use relaxed parsing mode to handle imperfect data gracefully
- Focus on synchronous API patterns for simpler control flow
- Consider single-domain optimization if working with specific domains

Understanding these trade-offs helps you make informed decisions about whether the ATT&CK Data Model's approach aligns with your specific requirements and constraints.

---
