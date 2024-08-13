import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { ObjectMarkingRefsSchema } from "../common/common-properties";
import { AttackCoreSDOSchema, AttackDomains } from "../common/core-attack-sdo.schema";
import { createStixIdentifierSchema, StixIdentifierSchema } from "../common/stix-identifier";
import { IdentityClassOpenVocabulary, SectorsListOpenVocabulary } from "../common/open-vocabulary";

// TODO migrate to loading this in a globally scoped module
import '../../errors';


export const IdentitySchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.identity),

    type: z.literal(StixTypeSchema.enum.identity),

    object_marking_refs: ObjectMarkingRefsSchema,

    identity_class: IdentityClassOpenVocabulary
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
            SectorsListOpenVocabulary,
        )
        .describe("The list of industry sectors that this Identity belongs to. This is an open vocabulary and values SHOULD come from the industry-sector-ov vocabulary.")
        .optional(),
    
    contact_information: z
        .string()
        .describe("The contact information (e-mail, phone number, etc.) for this Identity.")
        .optional(),

    x_mitre_domains: z
        .array(AttackDomains)
        .describe("The technology domains to which the ATT&CK object belongs."),
});

// Define the type for Identity
export type Identity = z.infer<typeof IdentitySchema>;