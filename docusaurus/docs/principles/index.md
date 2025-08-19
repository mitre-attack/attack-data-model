import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';
import { DocTypeCard } from '@site/src/components/DocTypeIndicator';

# Guiding Principles

<WorkInProgressNotice />

**Understanding-oriented content about design decisions and architecture**

This section explores the "why" behind the ATT&CK Data Model - the design decisions, architectural choices, and trade-offs that shape the library. These explanations provide context and rationale rather than instructions, helping you understand the deeper principles that guide the project.

## Dive Deeper

### Foundational Context

<div className="row">
  <div className="col col--6">
    <DocTypeCard
        type='principles'
        title='Why the ATT&CK Data Model Exists'
        description='The problem context, solution approach, and value proposition'
        href='./why-adm-exists'
    />
  </div>
  <div className="col col--6">
    <DocTypeCard
        type='principles'
        title='STIX 2.1 as the Foundation'
        description='Why STIX was chosen and how it shapes the architecture'
        href='./stix-foundation'
    />
  </div>
</div>

### ATT&CK Specification Understanding

- **[ATT&CK Specification Overview](./attack-specification-overview)** - Understanding the structure and purpose of the ATT&CK specification
- **[Object Design Rationale](./object-design-rationale)** - Why ATT&CK objects are structured the way they are
- **[Versioning Philosophy](./versioning-philosophy)** - Understanding ATT&CK's multi-dimensional versioning approach

### Technical Architecture

- **[Schema Design Principles](./schema-design)** - Validation philosophy, refinement patterns, and extensibility choices

### Miscellaneous

- **[Compatibility](./compatibility)** - Compatibility matrix of versions of ATT&CK, the data model, and the library
- **[Architecture & Design Trade-offs](./trade-offs)** - Reasons why architecture decisions were made

## Core Principles

The ATT&CK Data Model is built on several key principles that influence all design decisions:

### STIX 2.1 Compliance First

- **Principle**: Maintain strict compatibility with STIX 2.1 specification
- **Implication**: All ATT&CK objects are valid STIX objects first, ATT&CK objects second
- **Trade-off**: Sometimes requires more complex APIs to maintain standard compliance

**Example**: Using STIX relationship objects instead of embedded references, even though embedded references might be more convenient for some use cases.

### Type Safety Without Performance Cost

- **Principle**: Provide strong TypeScript types while maintaining runtime performance
- **Implication**: Heavy use of Zod schemas for both validation and type inference
- **Trade-off**: Larger bundle size in exchange for compile-time safety and runtime validation

**Example**: Every ATT&CK object has both a Zod schema (for validation) and TypeScript interface (for typing), even though this creates some duplication.

### Relationship-First Navigation

- **Principle**: ATT&CK's value comes from object relationships, so navigation must be intuitive
- **Implication**: Implementation classes provide relationship methods that abstract STIX relationship complexity
- **Trade-off**: Memory overhead for relationship indexing in exchange for fast navigation

**Example**: `technique.getTactics()` abstracts the underlying STIX relationships and provides immediate access to related objects.

### Extensibility Through Standards

- **Principle**: Support customization without breaking compatibility
- **Implication**: Extensions follow STIX custom property conventions
- **Trade-off**: More verbose extension syntax but guaranteed interoperability

**Example**: Custom fields use `x_custom_` prefixes and require manual refinement reapplication, following STIX best practices.

## Architectural Themes

### Layered Architecture

The library uses a three-layer architecture:

1. **Schema Layer** - Zod schemas for validation and type inference
2. **Class Layer** - Implementation classes with relationship navigation
3. **Data Access Layer** - Data sources and loading mechanisms

Each layer serves distinct purposes and can be used independently or together.

### Immutable Data Model

- **Decision**: ATT&CK objects are immutable after loading
- **Rationale**: Prevents accidental modification of shared threat intelligence data
- **Implication**: Any modifications require creating new objects or data models

### Lazy Relationship Resolution

- **Decision**: Relationships are resolved on-demand rather than eagerly
- **Rationale**: Better memory usage and faster initial loading
- **Implication**: First access to relationships may be slightly slower than subsequent accesses

## Design Evolution

### Historical Context

The ATT&CK Data Model evolved through several design phases:

1. **Simple JSON Processing** - Direct JSON manipulation without validation
2. **Schema-First Design** - Introduction of Zod validation schemas
3. **Relationship Navigation** - Addition of implementation classes with navigation methods
4. **Multi-Source Support** - Extensible data source architecture
5. **Type Safety** - Full TypeScript integration with proper type inference

Each evolution maintained backward compatibility while addressing real-world usage patterns.

### Current Design State

The current architecture reflects lessons learned from:

- **Enterprise deployments** requiring strict validation
- **Research applications** needing flexible data exploration
- **Integration scenarios** demanding standards compliance
- **Performance requirements** in high-throughput systems

## Understanding Through Examples

### Why Zod Instead of JSON Schema?

- **Context**: Need for runtime validation and TypeScript integration
- **Decision**: Use Zod for schema definition
- **Alternatives Considered**: JSON Schema, Joi, Yup

**Rationale**:

- Zod provides TypeScript type inference automatically
- Runtime validation matches compile-time types exactly
- Schema definitions are more maintainable in TypeScript
- Better error messages for developers

**Trade-offs**:

- Zod is less universally known than JSON Schema
- Schemas are tied to TypeScript ecosystem
- Larger runtime bundle due to Zod dependency

### Why Implementation Classes Instead of Plain Objects?

- **Context**: Need for relationship navigation without breaking STIX compliance
- **Decision**: Create implementation classes that extend plain objects with methods
- **Alternatives Considered**: Plain objects with utility functions, custom object shapes

**Rationale**:

- Object-oriented navigation is more intuitive (`technique.getTactics()`)
- Encapsulation keeps relationship logic organized
- TypeScript provides better IntelliSense for methods
- Classes can be extended by library users

**Trade-offs**:

- Increased memory usage due to method inheritance
- More complex object construction process
- Learning curve for users expecting plain JSON objects

## Discussion and Feedback

These explanations reflect the current understanding and rationale behind design decisions.
If you have questions about specific choices or suggestions for different approaches:

- **Open a GitHub Discussion** for architectural questions
- **Create an Issue** for specific design concerns
- **Join the community** to discuss alternative approaches

---

**Ready to dive deeper?** Start with **[Why the ATT&CK Data Model Exists](./why-adm-exists)** to understand the foundational context that shapes everything else.
