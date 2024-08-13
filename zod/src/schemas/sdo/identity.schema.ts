import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { createStixIdentifierSchema, StixIdentifierSchema } from "../common/stix-identifier";

import '../../errors';


/**
 * Determine all possible values that can exist on identity_class
 */
export const IdentityClassOV = z.enum([
    "individual",
    "group",
    "system",
    "organization",
    "class",
    "unspecified"
]);

export const sectorsList = z.enum([
    "agriculture",
    "aerospace",
    "automotive",
    "communications",
    "construction",
    "defence",
    "education",
    "energy",
    "entertainment",
    "financial-services",
    "government-national",
    "government-regional",
    "government-local",
    "government-public-services",
    "healthcare",
    "hospitality-leisure",
    "infrastructure",
    "insurance",
    "manufacturing",
    "mining",
    "non-profit",
    "pharmaceuticals",
    "retail",
    "technology",
    "telecommunications",
    "transportation",
    "utilities"
])

/**
 * Identity Schema
 */
export const IdentitySchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.identity),

    type: z.literal(StixTypeSchema.enum.identity),

    object_marking_refs: ObjectMarkingRefsSchema,

    identity_class: IdentityClassOV
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
            sectorsList,
        )
        .describe("The list of industry sectors that this Identity belongs to. This is an open vocabulary and values SHOULD come from the industry-sector-ov vocabulary.")
        .optional(),
    
    contact_information: z
        .string()
        .describe("The contact information (e-mail, phone number, etc.) for this Identity.")
        .optional()
});

// Define the type for Identity
export type Identity = z.infer<typeof IdentitySchema>;