import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { DescriptionSchema, PlatformsSchema, MitreContributorsSchema, StixCreatedByRefSchema, StixIdentifierSchema, ExternalReferenceSchema, AttackDomains, StixTypeSchema, StixType, createStixIdentifierSchema } from '../common';

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 

// Software Schema
export const SoftwareSchema = AttackCoreSDOSchema.extend({

    description: DescriptionSchema,

    external_references: z
        .array(ExternalReferenceSchema)
        .describe("A list of external references which refers to non-STIX information."),

    object_marking_refs: z
        .array(StixIdentifierSchema)
        .describe("The list of marking-definition objects to be applied to this object."),

    x_mitre_platforms: PlatformsSchema,

    x_mitre_contributors: MitreContributorsSchema,

    x_mitre_aliases: z
        .array(
            z.string(),
            {
                invalid_type_error: "Aliases must be an array of strings."
            }
        )
        .describe("List of aliases for the given software.")
        .optional(),
    
    x_mitre_deprecated: z.boolean()
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
    
    x_mitre_domains: z
        .array(AttackDomains)
        .default([AttackDomains.Values['enterprise-attack']])
        .describe("The technology domains to which the ATT&CK object belongs.")
});

// Define the type for Software
export type Software = z.infer<typeof SoftwareSchema>;