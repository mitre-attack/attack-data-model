import { z } from "zod";
import { SDOSchema, SDO } from "./sdo.schema";
import { StixTypeSchema } from "./property-schemas/stix-type";


// Custom error messages
const SoftwareError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "HERE IS AN EXAMPLE CUSTOM ERROR MESSAGE. YOU CAN RAISE THEM IN THE SCHEMA BELOW",
    },
};

// Software Schema
export const SoftwareSchema = SDOSchema.extend({
    // NOTE add additional fields to an object schema with the .extend method. You can use .extend to overwrite fields! Be careful with this power!
    
    type: z.literal(StixTypeSchema.enum.tool, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.tool}`
    })
    
    // TODO fill in the rest of the properties
    // NOTE specify error message types wherever possible!
});

export type Software = z.infer<typeof SoftwareSchema>;