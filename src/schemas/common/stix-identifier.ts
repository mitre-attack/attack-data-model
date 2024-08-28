import { z } from 'zod';
import { stixTypeSchema, StixType } from './stix-type';

// Define the STIX Identifier type
type StixIdentifier = `${StixType}--${string}`;

// Custom error messages
const StixIdentifierError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: must comply with format 'type--UUIDv4'",
    },
    InvalidType: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: must contain a valid STIX type",
    },
    InvalidUuid: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: must contain a valid UUIDv4",
    },
};

// Helper function to validate UUID
const isValidUuid = (uuid: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
};

// Base STIX Identifier Schema
export const stixIdentifierSchema = z.custom<StixIdentifier>(
    (val): val is StixIdentifier => {
        if (typeof val !== 'string') return false;
        const [type, uuid] = val.split('--');
        return stixTypeSchema.safeParse(type).success && isValidUuid(uuid);
    },
    {
        message: "Invalid STIX Identifier",
    }
).refine(
    (val) => {
        const [type, uuid] = val.split('--');
        return stixTypeSchema.safeParse(type).success && isValidUuid(uuid);
    },
    (val) => {
        const [type, uuid] = val.split('--');
        if (!stixTypeSchema.safeParse(type).success) {
            return StixIdentifierError.InvalidType;
        }
        if (!isValidUuid(uuid)) {
            return StixIdentifierError.InvalidUuid;
        }
        return StixIdentifierError.InvalidFormat;
    }
).describe("Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.");

// Type-specific STIX Identifier Schema
export function createStixIdentifierSchema<T extends StixType>(expectedType: T) {
    type TypeSpecificStixIdentifier = `${T}--${string}`;

    return stixIdentifierSchema.refine(
        (val): val is TypeSpecificStixIdentifier => val.startsWith(`${expectedType}--`),
        {
            message: `Invalid STIX Identifier: must start with '${expectedType}--'`,
            path: ['id'],
        }
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
