import { z } from 'zod/v4';
import { stixIdentifierSchema, createStixIdValidator } from './stix-identifier.js';
import {
  attackIdPatterns,
  stixTypeToAttackIdMapping,
  type StixTypesWithAttackIds,
} from './attack-id.js';

//==============================================================================
// ExternalReference schema
//==============================================================================

// a singular external reference
export const externalReferenceSchema = z.object({
  source_name: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Source name is required' : 'Source name must be a string',
  }),

  description: z
    .string({
      error: 'Description must be a string',
    })
    .optional(),

  url: z
    .url({
      error: (issue) =>
        issue.input === undefined
          ? 'URL is required'
          : 'Invalid URL format. Please provide a valid URL',
    })
    .optional(),

  external_id: z
    .string({
      error: 'External ID must be a string',
    })
    .optional(),
});

// a list of external references
export const externalReferencesSchema = z
  .array(externalReferenceSchema)
  .min(1, "At least one external reference is required when 'external_references' is defined")
  .meta({
    description: 'A list of external references which refers to non-STIX information',
  });

// a factory function to generate specialized external references schemas for each ATT&CK object type
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
          const format = stixTypeToAttackIdMapping[stixType];
          return attackIdPatterns[format].test(refs[0].external_id);
        },
        {
          message: `The first external_reference must match the ATT&CK ID format ${getFormatExample(stixType)}.`,
          path: [0, 'external_id'],
        },
      )
      .describe('A list of external references with the first containing a valid ATT&CK ID')
  );
};

// Helper to get format example for error messages
function getFormatExample(stixType: StixTypesWithAttackIds): string {
  switch (stixType) {
    case 'x-mitre-tactic':
      return 'TA####';
    case 'attack-pattern':
      return 'T#### or T####.###';
    case 'intrusion-set':
      return 'G####';
    case 'malware':
    case 'tool':
      return 'S####';
    case 'course-of-action':
      return 'M####';
    case 'x-mitre-data-source':
      return 'DS####';
    case 'x-mitre-asset':
      return 'A####';
    case 'campaign':
      return 'C####';
    default:
      return ''; // Satisfy TypeScript
  }
}

export type ExternalReference = z.infer<typeof externalReferenceSchema>;
export type ExternalReferences = z.infer<typeof externalReferencesSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const stixCreatedByRefSchema = createStixIdValidator('identity').meta({
  description:
    'The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.',
});

export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================

export const granularMarkingSchema = z.object({
  marking_ref: stixIdentifierSchema,
  selectors: z.array(z.string()),
});

export type GranularMarking = z.infer<typeof granularMarkingSchema>;
