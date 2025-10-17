import { z } from 'zod/v4';

export const stixTimestampSchema = z.iso
  .datetime({
    error:
      "Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.",
  }) // Validates RFC 3339 format
  .refine((val) => val.endsWith('Z'), {
    message: "STIX timestamps must use 'Z' timezone specification",
  })
  .meta({
    description:
      "Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.",
  });

export type StixTimestamp = z.infer<typeof stixTimestampSchema>;

//==============================================================================
//
// Branded Timestamps
//
//==============================================================================

export const stixCreatedTimestampSchema = stixTimestampSchema.brand<'StixCreatedTimestamp'>();
export type StixCreatedTimestamp = z.infer<typeof stixCreatedTimestampSchema>;

export const stixModifiedTimestampSchema = stixTimestampSchema.brand<'StixModifiedTimestamp'>();
export type StixModifiedTimestamp = z.infer<typeof stixModifiedTimestampSchema>;
