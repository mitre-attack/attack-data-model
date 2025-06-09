import { z } from 'zod';
import { stixTypeSchema, type StixType, stixTypeToTypeName } from './stix-type.js';

// Define the STIX Identifier type
type StixIdentifier = `${StixType}--${string}`;

/**
 * Helper function to validate UUID
 * Validates that the string is a valid UUIDv4
 */
const isValidUuid = (uuid: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
};

/**
 * Helper function to create descriptive error messages for STIX ID validation failures
 */
const createStixIdError = (id: string, errorType: 'format' | 'type' | 'uuid'): z.ZodIssue => {
  // Extract the STIX type from the ID if possible
  const parts = id.split('--');
  const stixType = parts.length > 0 ? parts[0] : '';

  // Get a readable type name if available
  const typeName =
    stixType in stixTypeToTypeName ? stixTypeToTypeName[stixType as StixType] : 'STIX';

  let message: string;

  switch (errorType) {
    case 'format':
      message = `Invalid STIX Identifier for ${typeName} object: must comply with format 'type--UUIDv4'`;
      break;
    case 'type':
      message = `Invalid STIX Identifier for ${typeName} object: contains invalid STIX type '${stixType}'`;
      break;
    case 'uuid':
      message = `Invalid STIX Identifier for ${typeName} object: contains invalid UUIDv4 format`;
      break;
  }

  return {
    code: z.ZodIssueCode.custom,
    message,
    path: ['id'],
  };
};

// Base STIX Identifier Schema
export const stixIdentifierSchema = z
  .string()
  .refine(
    (val): val is StixIdentifier => {
      if (typeof val !== 'string') return false;

      // Check basic format
      if (!val.includes('--')) return false;

      const [type, uuid] = val.split('--');

      // Validate STIX type
      const isValidType = stixTypeSchema.safeParse(type).success;

      // Validate UUID
      const isValidUuidValue = isValidUuid(uuid);

      return isValidType && isValidUuidValue;
    },
    (val) => {
      // If it's not a string, return general format error
      if (typeof val !== 'string') {
        return createStixIdError(String(val), 'format');
      }

      // Check if it has the basic format with --
      if (!val.includes('--')) {
        return createStixIdError(val, 'format');
      }

      const [type, uuid] = val.split('--');

      // Check STIX type validity
      if (!stixTypeSchema.safeParse(type).success) {
        return createStixIdError(val, 'type');
      }

      // Check UUID validity
      if (!isValidUuid(uuid)) {
        return createStixIdError(val, 'uuid');
      }

      // This shouldn't be reached, but just in case
      return createStixIdError(val, 'format');
    },
  )
  .describe(
    'Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.',
  );

// Type-specific STIX Identifier Schema
export function createStixIdValidator<T extends StixType>(expectedType: T) {
  type TypeSpecificStixIdentifier = `${T}--${string}`;

  const typeName = stixTypeToTypeName[expectedType] || expectedType;

  return stixIdentifierSchema.refine(
    (val): val is TypeSpecificStixIdentifier => val.startsWith(`${expectedType}--`),
    {
      message: `Invalid STIX Identifier for ${typeName}: must start with '${expectedType}--'`,
      path: ['id'],
    },
  );
}

// Export types
export type { StixIdentifier };
export type TypeSpecificStixIdentifier<T extends StixType> = `${T}--${string}`;

/**
 * Usage examples:
 * Create a schema for a specific StixType:
 *  const tacticIdSchema = createStixTypeIdentifierSchema('x-mitre-tactic');
 *
 * Create a type for a specific StixType:
 *  type TacticId = z.infer<typeof tacticIdSchema>; // Will be "x-mitre-tactic--${string}"
 * or
 *  type TacticId = TypeSpecificStixIdentifier<'x-mitre-tactic'>; // Will be "x-mitre-tactic--${string}"</s>
 */
