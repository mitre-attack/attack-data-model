import { z } from 'zod/v4';
import { stixTypeSchema, type StixType, stixTypeToTypeName } from './stix-type.js';

// Define the STIX Identifier type
type StixIdentifier = `${StixType}--${string}`;

// Base STIX Identifier Schema
export const stixIdentifierSchema = z
  .string()
  .refine((val) => val.includes('--') && val.split('--').length === 2, {
    error: (issue) => ({
      code: 'custom' as const,
      message: "Invalid STIX Identifier: must comply with format 'type--UUIDv4'",
      input: issue.input,
      path: [],
    }),
  })
  .refine(
    (val) => {
      const [type] = val.split('--');
      return stixTypeSchema.safeParse(type).success;
    },
    {
      error: (issue) => {
        const val = issue.input as string;
        const [type] = val.split('--');
        const typeName = type in stixTypeToTypeName ? stixTypeToTypeName[type as StixType] : 'STIX';

        return {
          code: 'custom' as const,
          message: `Invalid STIX Identifier for ${typeName} object: contains invalid STIX type '${type}'`,
          input: issue.input,
          path: [],
        };
      },
    },
  )
  .refine(
    (val) => {
      const [, uuid] = val.split('--');
      return z.uuid().safeParse(uuid).success;
    },
    {
      error: (issue) => {
        const val = issue.input as string;
        const [type] = val.split('--');
        const typeName = type in stixTypeToTypeName ? stixTypeToTypeName[type as StixType] : 'STIX';

        return {
          code: 'custom' as const,
          message: `Invalid STIX Identifier for ${typeName} object: contains invalid UUIDv4 format`,
          input: issue.input,
          path: [],
        };
      },
    },
  )
  // .transform((val): StixIdentifier => val as StixIdentifier) // TODO consider removing this; it blocks from chaining on additional checks downstream like ``stixIdentifierSchema.startsWith('f00bar--')``
  .meta({
    description:
      'Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.',
  });

// Type-specific STIX Identifier Schema
export function createStixIdValidator<T extends StixType>(expectedType: T) {
  return stixIdentifierSchema.refine(
    (val): val is `${T}--${string}` => val.startsWith(`${expectedType}--`),
    {
      error: () => ({
        code: 'custom' as const,
        message: `Invalid STIX Identifier: must start with '${expectedType}--'`,
        input: expectedType,
        path: [],
      }),
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
