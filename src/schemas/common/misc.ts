import { z } from 'zod';
import { stixIdentifierSchema, createStixIdValidator } from './stix-identifier.js';
import {
  attackIdPatterns,
  stixTypeToAttackIdMapping,
  type StixTypesWithAttackIds,
} from './attack-id.js';

//==============================================================================
// ExternalReference schema
//==============================================================================

// a singlular external reference
export const externalReferenceSchema = z.object({
  source_name: z.string({
    required_error: 'Source name is required.',
    invalid_type_error: 'Source name must be a string.',
  }),

  description: z.string({ invalid_type_error: 'Description must be a string.' }).optional(),

  url: z
    .string({ invalid_type_error: 'URL must be a string.' })
    .url({ message: 'Invalid URL format. Please provide a valid URL.' })
    .optional(),

  external_id: z.string({ invalid_type_error: 'External ID must be a string.' }).optional(),
});

// a list of external reference
export const externalReferencesSchema = z
  .array(externalReferenceSchema)
  .min(1, "At least one external reference is required when 'external_references' is defined.")
  .describe('A list of external references which refers to non-STIX information.');

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

export const stixCreatedByRefSchema = createStixIdValidator('identity').describe(
  'The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.',
);

export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================

export const granularMarkingSchema = z.object({
  marking_ref: stixIdentifierSchema,
  selectors: z.array(z.string()),
});

export type GranularMarking = z.infer<typeof granularMarkingSchema>;

//==============================================================================
// Extension schema
//==============================================================================

export const extensionSchema = z.object({
  extension_type: z.string(),
  extension_properties: z.record(z.unknown()),
});

export type Extension = z.infer<typeof extensionSchema>;

//==============================================================================
// Extensions schema
//==============================================================================

export const extensionsSchema = z
  .record(z.union([extensionSchema, z.record(z.unknown())]))
  .describe('Specifies any extensions of the object, as a dictionary.');

export type Extensions = z.infer<typeof extensionsSchema>;
