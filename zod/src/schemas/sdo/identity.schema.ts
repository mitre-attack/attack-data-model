import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { StixIdentifierImpl } from "../../classes/stix-identifier.cls";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixIdentifierSchema } from "../common/stix-identifier";

// Custom error messages
const IdentityError = {
    InvalidVersion: {
        code: z.ZodIssueCode.custom,
        message: "Identity version must be a valid semantic version string",
    },
    // Add more custom error messages as needed
};

// Identity Schema
export const IdentitySchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.identity),

    object_marking_refs: z
    .array(StixIdentifierSchema)
    .describe("The list of marking-definition objects to be applied to this object."),
        
    identity_class: z.string()
    .describe("The type of entity that this Identity describes, e.g., an individual or organization.")
});

// Define the type for Identity
export type Identity = z.infer<typeof IdentitySchema>;