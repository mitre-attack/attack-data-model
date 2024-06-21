import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';

//==============================================================================
// ExternalReference schema
//==============================================================================

export const ExternalReferenceSchema = z.object({
  source_name: z.string(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  external_id: z.string().optional()
}).transform(obj => ({
  ...obj,
  toString: function() {
      return JSON.stringify(obj);
  }
}));

export type ExternalReference = z.infer<typeof ExternalReferenceSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const StixCreatedByRefSchema = StixIdentifierSchema.brand("StixCreatedByRef");

export type StixCreatedByRef = z.infer<typeof StixCreatedByRefSchema>;

//==============================================================================
// StixBoolean schema 
// TODO REMOVE — NOT NECESSARY
//==============================================================================

// const StixBooleanSchema = z.object({
//   value: z.boolean()
// });

// type StixBoolean = z.infer<typeof StixBooleanSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================

export const GranularMarkingSchema = z.object({
  marking_ref: StixIdentifierSchema,
  selectors: z.array(z.string())
}).transform(obj => ({
  ...obj,
  toJSON: function() {
      return { ...this };
  }
}));

export type GranularMarking = z.infer<typeof GranularMarkingSchema>;

//==============================================================================
// Extension schema (placeholder, as it's empty in the original)
//==============================================================================

export const ExtensionSchema = z.object({
  // Define fields as necessary
}).transform(obj => ({
  ...obj,
  toJSON: function() {
      return { ...this };
  }
}));

export type Extension = z.infer<typeof ExtensionSchema>;

export const ExtensionsSchema = z.record(
  z.union(
    [
      ExtensionSchema, z.record(z.unknown())
    ])
)
  .optional();

export type Extensions = z.infer<typeof ExtensionsSchema>;