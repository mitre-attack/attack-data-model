import { z } from 'zod';

// Helper function to convert STIX timestamp string to Date object
function stixTimestampStrToDate(value: string): Date {
    const pattern = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?Z$/;
    if (!pattern.test(value)) {
        throw new Error(`Invalid timestamp format: ${value}`);
    }
    return new Date(value);
}

// Helper function to convert Date object to STIX timestamp string
function dateToStixTimestampStr(value: Date): string {
    return value.toISOString().slice(0, -5) + 'Z';
}

// Define the Zod schema for StixTimestamp
export const StixTimestampSchema = z.union([
    z.date(),
    z.string().refine(
        (val) => {
            try {
                stixTimestampStrToDate(val);
                return true;
            } catch {
                return false;
            }
        },
        {
            message: "Invalid STIX timestamp format",
        }
    )])
    .transform((val) => {
        if (val instanceof Date) {
            return val;
        }
        return stixTimestampStrToDate(val);
    })
    .transform((val) => ({
        value: val,
        toString: () => dateToStixTimestampStr(val),
    }))
    .describe("Represents timestamps across the CTI specifications. The format is an RFC3339 timestamp, with a required timezone specification of 'Z'.",);

// Define the TypeScript type for StixTimestamp
export type StixTimestamp = z.infer<typeof StixTimestampSchema>;