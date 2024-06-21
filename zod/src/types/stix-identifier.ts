import { z } from 'zod';
import { StixTypeSchema } from './stix-type';


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
}

export const StixIdentifierSchema = z
    .string()

    // Add a description property to the resulting schema. Useful for documenting a field, for example in a JSON Schema.
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

        const parts = val.split('--');
        const type = parts[0];
        const uuid = parts[1];

        // Validate val.type against StixTypeSchema
        const isValidType = StixTypeSchema.safeParse(type).success;

        if (!isValidType) {
            ctx.addIssue(StixIdentifierError.InvalidType);
            return z.NEVER;
        }

        // Validate val.uuid against string().uuid()
        const isValidUuid = z.string().uuid().safeParse(uuid).success;

        if (!isValidUuid) {
            ctx.addIssue(StixIdentifierError.InvalidUuid);
            return z.NEVER;
        }

        const stringRepresentation = `${type}--${uuid}`;

        return {
            type,
            uuid,

            /**
             * This is a standard JavaScript method that's called when an object needs to be represented as a string.
             * It's commonly used in string concatenation and when explicitly calling .toString() on an object.
             */
            toString: () => stringRepresentation,

            /**
             * This is a more advanced feature introduced in ES6.
             * It's called when an object needs to be converted to a primitive value (string, number, or boolean).
             * It gives you more control over how the object is converted in different contexts.
             */
            [Symbol.toPrimitive](hint: string): string | null {
                if (hint === 'string' || hint === 'default') {
                    return stringRepresentation;
                }
                return null;
            }
        };

    });


// Define types using Zod inference
export type StixIdentifier = z.infer<typeof StixIdentifierSchema>;

