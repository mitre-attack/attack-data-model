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
    type: z.literal(StixTypeSchema.enum.identity, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.identity}`
    }),

    id: z.string().refine(
        id => {
            const parsedId = new StixIdentifierImpl(id);
            return parsedId.type === "identity"
        },
        { message: "The 'id' property must be of type 'identity'" }
    ),

    object_marking_refs: z
    .array(StixIdentifierSchema)
    .describe("The list of marking-definition objects to be applied to this object."),
        
    identity_class: z.string()
    .describe("The type of entity that this Identity describes, e.g., an individual or organization.")
});

// Define the type for Identity
export type Identity = z.infer<typeof IdentitySchema>;