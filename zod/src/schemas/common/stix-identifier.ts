import { z } from 'zod';
import { stixTypeSchema, StixType } from './stix-type';

// Define the STIX Identifier type
type _StixIdentifier = `${StixType}--${string}`;

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

// Refactored StixIdentifierSchema
export const stixIdentifierSchema = z.custom<_StixIdentifier>(
    (val): val is _StixIdentifier => {
        if (typeof val !== 'string') return false;

        const [type, uuid] = val.split('--');

        if (!type || !uuid) return false;

        const isValidType = stixTypeSchema.safeParse(type).success;
        if (!isValidType) return false;

        return isValidUuid(uuid);
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

export const createStixIdentifierSchema = (expectedType: StixType) =>
    stixIdentifierSchema.refine(
        (val) => val.split('--')[0] === expectedType,
        (val) => ({
            message: `The 'id' property must be of type '${expectedType}', but got '${val.split('--')[0]}'`,
            path: ['id'],
        })
    );

// Type inference
export type StixIdentifier = z.infer<typeof stixIdentifierSchema>;