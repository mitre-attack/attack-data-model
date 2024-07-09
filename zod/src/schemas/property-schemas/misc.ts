import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';

//==============================================================================
// ExternalReference schema
//==============================================================================

export const ExternalReferenceSchema = z.object({
  source_name: z.string({
    required_error: "Source name is required.",
    invalid_type_error: "Source name must be a string."
  }),
  description: z.string({
    invalid_type_error: "Description must be a string."
  }).optional(),
  url: z.string({
    invalid_type_error: "URL must be a string."
  }).url({
    message: "Invalid URL format. Please provide a valid URL."
  }).optional(),
  external_id: z.string({
    invalid_type_error: "External ID must be a string."
  }).optional()
});

export type ExternalReference = z.infer<typeof ExternalReferenceSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const StixCreatedByRefSchema = StixIdentifierSchema.brand("StixCreatedByRef");

export type StixCreatedByRef = z.infer<typeof StixCreatedByRefSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================

export const GranularMarkingSchema = z.object({
  marking_ref: StixIdentifierSchema,
  selectors: z.array(z.string())
});

export type GranularMarking = z.infer<typeof GranularMarkingSchema>;

//==============================================================================
// Extension schema
//==============================================================================

export const ExtensionSchema = z.object({
  extension_type: z.string(),
  extension_properties: z.record(z.unknown())
});

export type Extension = z.infer<typeof ExtensionSchema>;

//==============================================================================
// Extensions schema
//==============================================================================

export const ExtensionsSchema = z.record(
  z.union([ExtensionSchema, z.record(z.unknown())])
).optional();

export type Extensions = z.infer<typeof ExtensionsSchema>;