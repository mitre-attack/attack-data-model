import z from 'zod';
import {
  type StixTypesWithAttackIds,
  attackIdPatterns,
  getAttackIdExample,
  stixTypeToAttackIdMapping,
} from './attack-id.js';
import { nonEmptyRequiredString } from './generics.js';

/**
 * Schema for validating a single external reference object.
 *
 * External references link STIX objects to external information sources such as
 * reports, websites, or databases. For ATT&CK objects, the first external reference
 * typically contains the ATT&CK ID.
 *
 * @example
 * ```typescript
 * externalReferenceSchema.parse({
 *   source_name: 'mitre-attack',
 *   external_id: 'T1059',
 *   url: 'https://attack.mitre.org/techniques/T1059'
 * }); // Valid
 *
 * externalReferenceSchema.parse({
 *   source_name: 'ACME Research',
 *   description: 'Analysis of APT activity',
 *   url: 'https://example.com/report'
 * }); // Valid - external_id is optional
 * ```
 */
export const externalReferenceSchema = z.object({
  source_name: nonEmptyRequiredString,
  description: nonEmptyRequiredString.optional(),
  url: z
    .url({
      error: (issue) =>
        issue.input === null
          ? 'URL cannot be null'
          : 'Invalid URL format. Please provide a valid URL',
    })
    .optional(),

  external_id: nonEmptyRequiredString.optional(),
});

/**
 * Type representing a single external reference.
 */
export type ExternalReference = z.infer<typeof externalReferenceSchema>;

/**
 * Schema for validating a list of external references.
 *
 * An array of external reference objects that link to non-STIX information sources.
 * When present, at least one external reference must be provided.
 *
 * @example
 * ```typescript
 * externalReferencesSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'T1059' },
 *   { source_name: 'Research Paper', url: 'https://example.com/paper.pdf' }
 * ]); // Valid
 *
 * externalReferencesSchema.parse([]); // Invalid - at least one required
 * ```
 */
export const externalReferencesSchema = z
  .array(externalReferenceSchema)
  .min(1)
  .meta({ description: 'A list of external references which refers to non-STIX information' });

/**
 * Type representing a list of external references.
 */
export type ExternalReferences = z.infer<typeof externalReferencesSchema>;

/**
 * Creates a specialized schema for validating ATT&CK external references.
 *
 * This factory function generates schemas that validate external reference arrays for
 * ATT&CK objects. The schema ensures that:
 * 1. At least one external reference is present
 * 2. The first external reference contains an `external_id` field
 * 3. The `external_id` matches the appropriate ATT&CK ID format for the STIX type
 *
 * @param stixType - The STIX type to create the schema for
 * @returns A Zod schema configured to validate ATT&CK external references for the given type
 *
 * @example
 * ```typescript
 * const techniqueRefsSchema = createAttackExternalReferencesSchema('attack-pattern');
 * techniqueRefsSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'T1059' }
 * ]); // Valid
 *
 * const tacticRefsSchema = createAttackExternalReferencesSchema('x-mitre-tactic');
 * tacticRefsSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'TA0001' }
 * ]); // Valid
 * ```
 */
export const createAttackExternalReferencesSchema = (stixType: StixTypesWithAttackIds) => {
  return (
    z
      .array(externalReferenceSchema)
      .min(1, 'At least one external reference is required')

      // First check: Verify external_id exists
      .refine((refs) => !!refs[0]?.external_id, {
        message: 'ATT&CK ID must be defined in the first external_references entry.',
        path: [0, 'external_id'],
      })

      // Second check: Verify format is correct (only runs if first check passes)
      .refine(
        (refs) => {
          // Skip validation if external_id doesn't exist (caught by first refine)
          if (!refs[0]?.external_id) return true;

          // Get expected format and validate
          const attackIdType = stixTypeToAttackIdMapping[stixType];
          if (attackIdType === 'technique') {
            // Fallback to subtechnique if technique fails
            return (
              attackIdPatterns['technique'].test(refs[0].external_id) ||
              attackIdPatterns['subtechnique'].test(refs[0].external_id)
            );
          }
          return attackIdPatterns[attackIdType].test(refs[0].external_id);
        },
        {
          message: `The first external_reference must match the ATT&CK ID format ${getAttackIdExample(stixType)}.`,
          path: [0, 'external_id'],
        },
      )
      .meta({
        description: 'A list of external references with the first containing a valid ATT&CK ID',
      })
  );
};
