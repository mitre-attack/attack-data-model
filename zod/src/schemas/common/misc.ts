import { z } from 'zod';
import { stixIdentifierSchema } from './stix-identifier';

//==============================================================================
// ExternalReference schema
//==============================================================================

export const externalReferenceSchema = z.object({

  source_name: z
    .string({
      required_error: "Source name is required.",
      invalid_type_error: "Source name must be a string."
    }),

  description: z
    .string({ invalid_type_error: "Description must be a string." })
    .optional(),

  url: z
    .string({ invalid_type_error: "URL must be a string." })
    .url({ message: "Invalid URL format. Please provide a valid URL." })
    .optional(),

  external_id: z
    .string({ invalid_type_error: "External ID must be a string." })
    .optional()
});

export type ExternalReference = z.infer<typeof externalReferenceSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const stixCreatedByRefSchema = stixIdentifierSchema.brand("StixCreatedByRef");

export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================

export const granularMarkingSchema = z.object({
  marking_ref: stixIdentifierSchema,
  selectors: z.array(z.string())
});

export type GranularMarking = z.infer<typeof granularMarkingSchema>;

//==============================================================================
// Extension schema
//==============================================================================

export const extensionSchema = z.object({
  extension_type: z.string(),
  extension_properties: z.record(z.unknown())
});

export type Extension = z.infer<typeof extensionSchema>;

//==============================================================================
// Extensions schema
//==============================================================================

export const extensionsSchema = z.record(
  z.union(
    [
      extensionSchema,
      z.record(z.unknown())
    ]
  )
)
  .describe("Specifies any extensions of the object, as a dictionary.")

export type Extensions = z.infer<typeof extensionsSchema>;