import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema, StixTimestampSchema, MitreContributorsSchema, StixCreatedByRefSchema, StixIdentifierSchema, ExternalReferenceSchema, AttackDomains, ObjectMarkingRefsSchema } from "../common";

// Custom error messages
const CampaignSchemaError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "Invalid format for Campaign schema",
    },
    InvalidType: {
        code: z.ZodIssueCode.custom,
        message: `'type' property must be equal to ${StixTypeSchema.enum.campaign}`
    },
    InvalidFirstSeenCitation: {
        code: z.ZodIssueCode.custom,
        message: "First seen citation is required and must be a non-empty string",
    },
    InvalidLastSeenCitation: {
        code: z.ZodIssueCode.custom,
        message: "Last seen citation is required and must be a non-empty string",
    },
};

// {
//   DONE "type": "Required",
//   DONE "id": "Required",
//   DONE "spec_version": "Required",
//   DONE "x_mitre_attack_spec_version": "Required",
//   DONE "name": "Required",
//   DONE "x_mitre_version": "Required",
//   DONE "description": "Required",
//   DONE "created_by_ref": "Required",
//   DONE "created": "Required",
//   DONE "modified": "Required",
//   DONE "object_marking_refs": "Required",
//   DONE "x_mitre_domains": "Required",
//   DONE "external_references": "Required",
//   DONE "x_mitre_modified_by_ref": "Required",
//   DONE "x_mitre_contributors": "Optional",
//   DONE "x_mitre_deprecated": "Required",
//   DONE "revoked": "Required",
//   DONE "aliases": "Required",
//   DONE "first_seen": "Required",
//   DONE "last_seen": "Required",
//   DONE "x_mitre_first_seen_citation": "Required",
//   DONE "x_mitre_last_seen_citation": "Required"
// }


// ATT&CK Campaign Schema
export const AttackCampaignSchema = AttackCoreSDOSchema.extend({

    type: z.literal(StixTypeSchema.enum.campaign, CampaignSchemaError.InvalidType),

    description: z
        .string({
            message: "description must be a non-empty string"
        })
        .min(1)
        .describe("A description that provides more details and context about the Campaign."),

    created_by_ref: StixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object."),

    object_marking_refs: ObjectMarkingRefsSchema,

    x_mitre_domains: z
        .array(AttackDomains)
        .default([AttackDomains.Values['enterprise-attack']])
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),

    external_references: z
        .array(ExternalReferenceSchema)
        .describe("A list of external references which refers to non-STIX information."),

    x_mitre_contributors: MitreContributorsSchema.optional(),

    x_mitre_deprecated: z.boolean()
        .describe("Indicates whether the object has been deprecated."),

    revoked: z
        .boolean()
        .describe("The revoked property indicates whether the object has been revoked."),

    aliases: z.array(z.string()).default([]).describe("Alternative names used to identify this Campaign."),

    first_seen: StixTimestampSchema
        .describe("The time that this Campaign was first seen."),

    last_seen: StixTimestampSchema
        .describe("The time that this Campaign was last seen."),

    x_mitre_first_seen_citation: z.string().min(1, CampaignSchemaError.InvalidFirstSeenCitation)
        .describe("The citation for the first_seen property."),

    x_mitre_last_seen_citation: z.string().min(1, CampaignSchemaError.InvalidLastSeenCitation)
        .describe("The citation for the last_seen property."),
});

// Define the type for AttackCampaign
export type AttackCampaign = z.infer<typeof AttackCampaignSchema>;