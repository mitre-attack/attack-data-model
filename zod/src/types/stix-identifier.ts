import { z } from 'zod';
import { StixTypeSchema } from './stix-type';
import { AbstractStixObject, GenericStixObject } from '../objects/stix-object';


/**
 * Custom error messages for STIX Identifier validation
 */
export const StixIdentifierError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: STIX Identifier must comply with expected format: /^[a-z-]+--[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
    },
    InvalidUuid: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: STIX Identifier must contain a valid UUIDv4 string",
    },
    InvalidType: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX Identifier: STIX Identifier must contain a valid STIX type",
    }
};

/**
 * STIX Identifier class
 */
class TrustedStixIdentifier extends AbstractStixObject {
    readonly type: string;
    readonly uuid: string;

    constructor(type: string, uuid: string) {
        super();
        this.type = type;
        this.uuid = uuid;
    }

    toString(): string {
        return `${this.type}--${this.uuid}`;
    }
}

/**
 * Schema for STIX Identifiers
 * @description Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.
 */
export const StixIdentifierSchema = z
    .string()
    .describe("Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.")
    .transform((val, ctx) => {
        const isValidFormat = z
            .string()
            .regex(/^[a-z-]+--[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
            .safeParse(val)
            .success;

        if (!isValidFormat) {
            ctx.addIssue(StixIdentifierError.InvalidFormat);
            return z.NEVER;
        }

        const [type, uuid] = val.split('--');

        const isValidType = StixTypeSchema.safeParse(type).success;
        if (!isValidType) {
            ctx.addIssue(StixIdentifierError.InvalidType);
            return z.NEVER;
        }

        const isValidUuid = z.string().uuid().safeParse(uuid).success;
        if (!isValidUuid) {
            ctx.addIssue(StixIdentifierError.InvalidUuid);
            return z.NEVER;
        }

        return new TrustedStixIdentifier(type, uuid);
    });

// Define type using Zod inference
export type StixIdentifierType = z.infer<typeof StixIdentifierSchema>;