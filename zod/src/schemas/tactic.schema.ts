import { z } from "zod";
import { SDOSchema } from "./sdo.schema";
import { StixTypeSchema } from "./property-schemas/stix-type";


// Tactic Schema
export const TacticSchema = SDOSchema.extend({
    // NOTE add additional fields to an object schema with the .extend method. You can use .extend to overwrite fields! Be careful with this power!
    type: z.literal(StixTypeSchema.enum["x-mitre-tactic"], {
        message: `'type' property must be equal to ${StixTypeSchema.enum["x-mitre-tactic"]}`
    })
    // TODO fill in the rest of the properties
    // NOTE specify error message types wherever possible!
});

export type Tactic = z.infer<typeof TacticSchema>;