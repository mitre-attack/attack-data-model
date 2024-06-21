import { z } from 'zod';
import { StixTypeSchema } from './stix-type';

export const StixIdentifierSchema = z
    .string()

    // Add a description property to the resulting schema. Useful for documenting a field, for example in a JSON Schema.
    .describe("Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.")

    // TODO decide whether this regex is necessary. Currently it is redundant. The transform and refine pipelines do all of the same checks in a richer more verbose way.
    // .regex(/^[a-z-]+--[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

    .transform((val, ctx) => {
        const parts = val.split('--');
        if (parts.length !== 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid STIX identifier format: must contain exactly one '--'",
            });
            return z.NEVER;
        }
        return {
            type: parts[0],
            uuid: parts[1]
        };
    })
    // Perform validation
    .refine(
        (val) => {
            // Validate val.type against StixTypeSchema
            const isValidType = StixTypeSchema.safeParse(val.type).success;

            // Validate val.uuid against string().uuid()
            const isValidUuid = z.string().uuid().safeParse(val.uuid).success;

            return isValidType && isValidUuid;
        },
        {
            message: "Invalid STIX identifier: type must be a valid STIX type and UUID must be a valid v4 UUID",
        }
    )
    // Attach a toString method to the output object to enable deserialization back to its original raw string format
    .transform((val) => ({
        ...val,
        toString: () => `${val.type}--${val.uuid}`
    }));


// Define types using Zod inference
export type StixIdentifier = z.infer<typeof StixIdentifierSchema>;

