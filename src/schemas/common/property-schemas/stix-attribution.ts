import { z } from 'zod/v4';
import { createStixIdValidator, stixIdentifierSchema } from './stix-id.js';

/**
 * Schema for validating object marking references (`object_marking_refs`).
 *
 * An array of STIX identifiers that reference marking-definition objects. These markings
 * provide data classification and handling instructions for the object.
 *
 * @example
 * ```typescript
 * objectMarkingRefsSchema.parse([
 *   'marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9'
 * ]); // Valid
 * objectMarkingRefsSchema.parse(['identity--12345']); // Invalid - must be marking-definition
 * ```
 */
export const objectMarkingRefsSchema = z
  .array(
    stixIdentifierSchema.startsWith(
      'marking-definition--',
      'Identifier must start with "marking-definition--"',
    ),
  )
  .meta({ description: 'The list of marking-definition objects to be applied to this object.' });

// TODO add JSDoc
export type ObjectMarkingRefs = z.infer<typeof objectMarkingRefsSchema>;

/**
 * Schema for validating created-by references (`created_by_ref`).
 *
 * A STIX identifier referencing an identity object that describes the entity that
 * created this object. If omitted, the source of the information is undefined.
 * Object creators may omit this to remain anonymous.
 *
 * @example
 * ```typescript
 * stixCreatedByRefSchema.parse('identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5'); // Valid
 * stixCreatedByRefSchema.parse('malware--12345'); // Invalid - must be identity type
 * ```
 */
export const stixCreatedByRefSchema = createStixIdValidator('identity').meta({
  description:
    'The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.',
});

/**
 * Type representing a validated created-by reference.
 */
export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;
