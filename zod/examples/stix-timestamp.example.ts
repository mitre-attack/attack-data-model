import { ZodError } from "zod";
import { StixTimestamp, StixTimestampSchema } from "../src/schemas/common/stix-timestamp";


// Usage example
const parsedTimestamp: StixTimestamp = StixTimestampSchema.parse("2023-06-21T15:30:00Z");

console.log(parsedTimestamp);
// 2023-06-21T15:30:00Z


try {
    const parsedTimestampBad: StixTimestamp = StixTimestampSchema.parse("2023-06-21T15:30:00"); // <-- removed the 'Z'
    console.log(parsedTimestampBad);
} catch (error) {
    console.log((error as ZodError).flatten().formErrors[0])
    // Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.
}

