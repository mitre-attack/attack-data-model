import { z } from "zod";
import { stixTypeSchema } from "../common/stix-type";
import { objectMarkingRefsSchema, xMitreDomainsSchema } from "../common/common-properties";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { createStixIdentifierSchema } from "../common/stix-identifier";
import { identityClassOpenVocabulary, industrySectorOpenVocabulary } from "../common/open-vocabulary";

// TODO migrate to loading this in a globally scoped module
import '../../errors';


export const identitySchema = attackBaseObjectSchema.extend({

    id: createStixIdentifierSchema(stixTypeSchema.enum.identity),

    type: z.literal(stixTypeSchema.enum.identity),

    object_marking_refs: objectMarkingRefsSchema,

    identity_class: identityClassOpenVocabulary
        .describe("The type of entity that this Identity describes, e.g., an individual or organization. This is an open vocabulary and the values SHOULD come from the identity-class-ov vocabulary."),

    description: z
        .string()
        .describe("A description of the object.")
        .optional(),
    
    roles: z
        .array(
            z.string(),
            {
                invalid_type_error: "Roles must be an array of strings."
            }
        )
        .describe("The list of roles that this Identity performs.")
        .optional(),
    
    sectors: z
        .array(
            industrySectorOpenVocabulary,
        )
        .describe("The list of industry sectors that this Identity belongs to. This is an open vocabulary and values SHOULD come from the industry-sector-ov vocabulary.")
        .optional(),
    
    contact_information: z
        .string()
        .describe("The contact information (e-mail, phone number, etc.) for this Identity.")
        .optional(),

    x_mitre_domains: xMitreDomainsSchema,
});

// Define the type for Identity
export type Identity = z.infer<typeof identitySchema>;