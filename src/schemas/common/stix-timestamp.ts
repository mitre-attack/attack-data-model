import { z } from 'zod/v4';

// RFC3339 regex pattern with required 'Z' timezone
const RFC3339_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)Z$/;

// Custom error messages
const StixTimestampError = {
  InvalidFormat: {
    code: 'custom',
    message:
      "Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.",
  },
};

// Helper function to validate RFC3339 timestamp
const isValidRFC3339 = (timestamp: string): boolean => {
  if (!RFC3339_REGEX.test(timestamp)) return false;
  const date = new Date(timestamp);
  return !isNaN(date.getTime());
};

type _StixTimestamp =
  `${number}-${number}-${number}T${number}:${number}:${number}${'' | `.${number}`}Z`;

export const stixTimestampSchema = z
  .custom<_StixTimestamp>(
    (val): val is _StixTimestamp => {
      if (val instanceof Date) {
        return isValidRFC3339(val.toISOString());
      }
      if (typeof val === 'string') {
        return isValidRFC3339(val);
      }
      return false;
    },
    {
      message: StixTimestampError.InvalidFormat.message,
    },
  )
  .meta({
    description:
      "Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.",
  });

export type StixTimestamp = z.infer<typeof stixTimestampSchema>;

/////////////////////////////////////
//
// Branded Timestamps
//
/////////////////////////////////////

export const stixCreatedTimestampSchema = stixTimestampSchema.brand('StixCreatedTimestamp');
export type StixCreatedTimestamp = z.infer<typeof stixCreatedTimestampSchema>;

export const stixModifiedTimestampSchema = stixTimestampSchema.brand('StixModifiedTimestamp');
export type StixModifiedTimestamp = z.infer<typeof stixModifiedTimestampSchema>;
