import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema, StixTimestampSchema, MitreContributorsSchema, StixCreatedByRefSchema, StixIdentifierSchema, ExternalReferenceSchema, AttackDomains, ObjectMarkingRefsSchema, DescriptionSchema } from "../common";

import '../../errors';

// ATT&CK Campaign Schema
export const AttackCampaignSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum.campaign, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.campaign}`
    }),

    description: DescriptionSchema
        .describe("A description that provides more details and context about the Campaign."),

    created_by_ref: StixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object.")
        .optional(),

    x_mitre_domains: z
        .array(AttackDomains)
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),

    x_mitre_contributors: MitreContributorsSchema
        .optional(),

    x_mitre_deprecated: z
        .boolean({
            invalid_type_error: "x_mitre_deprecated must be a boolean."
        })
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    aliases: z
        .array(z.string())
        .default([])
        .describe("Alternative names used to identify this campaign. The first alias must match the object's name."),

    first_seen: StixTimestampSchema
        .describe("The time that this Campaign was first seen."),

    last_seen: StixTimestampSchema
        .describe("The time that this Campaign was last seen."),

    x_mitre_first_seen_citation: z.string()
        .min(1)
        .describe("The citation for the first_seen property."),

    x_mitre_last_seen_citation: z.string()
        .min(1)
        .describe("The citation for the last_seen property."),
})
.required({
    first_seen: true,
    last_seen: true,
    x_mitre_first_seen_citation: true,
    x_mitre_last_seen_citation: true,
})
.refine(schema => {
    // The object's name MUST be listed as the first alias in the aliases field
    if (schema.aliases && schema.aliases.length > 0) {
        return schema.aliases[0] === schema.name;
    }
    return true;
}, {
    message: "The first alias must match the object's name",
    path: ['aliases']
})
.superRefine(({external_references}, ctx) => {
    // ATT&CK ID format
    if (!external_references?.length) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one external_reference must be specified."
        });
    } else {
        let attackIdEntry = external_references[0];
        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_reference entry.",
            });
        } else {
            let idRegex = /C\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format "C####"}.`
                });
            }
        }
    }
})

// Define the type for AttackCampaign
export type AttackCampaign = z.infer<typeof AttackCampaignSchema>;