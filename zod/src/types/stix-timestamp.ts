import { z } from "zod";
import { AbstractStixObject } from "../objects/stix-object";


/**
 * Custom error messages for STIX Timestamp validation
 */
const StixTimestampError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'",
    }
};

/**
 * STIX Timestamp class
 */
class TrustedStixTimestamp extends AbstractStixObject {
    private value: Date;

    constructor(value: Date) {
        super();
        this.value = value;
    }

    toString(): string {
        return this.value.toISOString().slice(0, -5) + 'Z';
    }

    toDate(): Date {
        return new Date(this.value);
    }
}

/**
 * Schema for STIX Timestamps
 * @description Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.
 */
export const StixTimestampSchema = z.union([
    z.date(),
    z.string()
])
    .describe("Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.")
    .transform((val, ctx) => {
        let dateValue: Date;

        if (val instanceof Date) {
            dateValue = val;
        } else {
            const pattern = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$/;
            if (!pattern.test(val)) {
                ctx.addIssue(StixTimestampError.InvalidFormat);
                return z.NEVER;
            }
            dateValue = new Date(val);
            if (isNaN(dateValue.getTime())) {
                ctx.addIssue(StixTimestampError.InvalidFormat);
                return z.NEVER;
            }
        }

        return new TrustedStixTimestamp(dateValue);
    });

// Define the TypeScript type for StixTimestamp
export type StixTimestamp = z.infer<typeof StixTimestampSchema>;