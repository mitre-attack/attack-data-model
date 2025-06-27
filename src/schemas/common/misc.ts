import { z } from 'zod/v4';
import { stixIdentifierSchema, createStixIdValidator } from './stix-identifier.js';

//==============================================================================
// ExternalReference schema
//==============================================================================

// a singular external reference
export const externalReferenceSchema = z.object({
  source_name: z.string({
    error: (issue) => issue.input === undefined
      ? 'Source name is required'
      : 'Source name must be a string'
  }),

  description: z.string({
    error: 'Description must be a string'
  }).optional(),

  url: z
    .url({
      error: (issue) => issue.input === undefined
        ? 'URL is required'
        : 'Invalid URL format. Please provide a valid URL'
    })
    .optional(),

  external_id: z.string({
    error: 'External ID must be a string'
  }).optional(),
});

// a list of external references
export const externalReferencesSchema = z
  .array(externalReferenceSchema)
  .min(1, "At least one external reference is required when 'external_references' is defined")
  .meta({
    description: 'A list of external references which refers to non-STIX information'
  });

export type ExternalReference = z.infer<typeof externalReferenceSchema>;
export type ExternalReferences = z.infer<typeof externalReferencesSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const stixCreatedByRefSchema = createStixIdValidator('identity').meta(
  { description: 'The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.',}
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
