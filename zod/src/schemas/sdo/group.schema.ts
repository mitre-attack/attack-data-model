import { z } from "zod";
import {
    AttackCoreSDOSchema,
    AttackDomains,
} from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import {
    MitreContributorsSchema,
    StixIdentifierSchema,
    StixTimestampSchema,
} from "../common";


// Group Schema
export const GroupSchema = AttackCoreSDOSchema.extend({

    type: z.literal(StixTypeSchema.enum["intrusion-set"]),

    description: z
        .string()
        .optional()
        .describe(
            "A description that provides more details and context about the Intrusion Set, potentially including its purpose and its key characteristics."
    ),

    x_mitre_domains: z
        .array(AttackDomains)
        .default([AttackDomains.Values["enterprise-attack"]])
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.")
        .optional(),

    x_mitre_contributors: MitreContributorsSchema,

    x_mitre_deprecated: z
        .boolean()
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    aliases: z
        .array(z.string())
        .optional()
        .describe("Alternative names used to identify this Intrusion Set."),


    first_seen: StixTimestampSchema
        .optional()
        .describe("The time that this Intrusion Set was first seen."),

    last_seen: StixTimestampSchema
        .optional()
        .describe("The time that this Intrusion Set was last seen."),

    goals: z
        .array(z.string())
        .optional()
        .describe("The high-level goals of this Intrusion Set, namely, what are they trying to do."),

    resource_level: z
        .string() // TODO The value for this property SHOULD come from the attack-resource-level-ov open vocabulary.
        .optional()
        .describe("This property specifies the organizational level at which this Intrusion Set typically works, which in turn determines the resources available to this Intrusion Set for use in an attack."),

    primary_motivation: z
        .string() // TODO The value for this property SHOULD come from the attack-motivation-ov open vocabulary.
        .optional()
        .describe("The primary reason, motivation, or purpose behind this Intrusion Set."),

    secondary_motivations: z
        .array(z.string()) // TODO The values for this property SHOULD come from the attack-motivation-ov open vocabulary.
        .optional()
        .describe("The secondary reasons, motivations, or purposes behind this Intrusion Set."),
});

// Define the type for SchemaName
export type Group = z.infer<typeof GroupSchema>;
