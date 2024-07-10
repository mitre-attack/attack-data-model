import { z } from 'zod';
import { Z } from 'zod-class';
import { StixTypeSchema } from '../../schemas/common/stix-type';

// Helper function to validate UUID
const isValidUuid = (uuid: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
};

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

export class StixIdentifierSchema extends Z.class({
    value: z.string().refine(
        (val) => {
            const [type, uuid] = val.split('--');
            return StixTypeSchema.safeParse(type).success && isValidUuid(uuid);
        },
        (val) => {
            const [type, uuid] = val.split('--');
            if (!StixTypeSchema.safeParse(type).success) {
                return StixIdentifierError.InvalidType;
            }
            if (!isValidUuid(uuid)) {
                return StixIdentifierError.InvalidUuid;
            }
            return StixIdentifierError.InvalidFormat;
        }
    ).describe("Represents identifiers across the CTI specifications. The format consists of the name of the top-level object being identified, followed by two dashes (--), followed by a UUIDv4.")
}) {
    get type(): z.infer<typeof StixTypeSchema> {
        return this.value.split('--')[0] as z.infer<typeof StixTypeSchema>;
    }

    get uuid(): string {
        return this.value.split('--')[1];
    }

    toString(): string {
        return this.value;
    }
}

// Type inference
export type StixIdentifier = z.infer<typeof StixIdentifierSchema>;