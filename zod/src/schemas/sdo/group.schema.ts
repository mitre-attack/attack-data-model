import { z } from "zod";
import { AttackCoreSDOSchema, AttackDomains } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema, MitreContributorsSchema, StixTimestampSchema } from "../common";
import { AttackMotivationOpenVocabulary, AttackResourceLevelOpenVocabulary } from "../common/open-vocabulary";


// Group Schema
export const GroupSchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum["intrusion-set"]),
    
    type: z.literal(StixTypeSchema.enum["intrusion-set"]),

    // Not used in ATT&CK Group but defined in STIX
    description: z
        .string()
        .optional()
        .describe(
            "A description that provides more details and context about the Intrusion Set, potentially including its purpose and its key characteristics."
    ),

    x_mitre_domains: z
        .array(AttackDomains)
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_contributors: MitreContributorsSchema.optional(),

    x_mitre_deprecated: z
        .boolean()
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    aliases: z
        .array(z.string())
        .optional()
        .describe("Alternative names used to identify this Intrusion Set."),

    // Not used in ATT&CK Group but defined in STIX
    first_seen: StixTimestampSchema
        .optional()
        .describe("The time that this Intrusion Set was first seen."),

    // Not used in ATT&CK Group but defined in STIX
    last_seen: StixTimestampSchema
        .optional()
        .describe("The time that this Intrusion Set was last seen."),

    // Not used in ATT&CK Group but defined in STIX
    goals: z
        .array(z.string())
        .optional()
        .describe("The high-level goals of this Intrusion Set, namely, what are they trying to do."),

    // Not used in ATT&CK Group but defined in STIX
    resource_level: AttackResourceLevelOpenVocabulary
        .optional()
        .describe("This property specifies the organizational level at which this Intrusion Set typically works, which in turn determines the resources available to this Intrusion Set for use in an attack."),

    primary_motivation: AttackMotivationOpenVocabulary
        .optional()
        .describe("The primary reason, motivation, or purpose behind this Intrusion Set."),

    secondary_motivations: z
        .array(AttackMotivationOpenVocabulary)
        .optional()
        .describe("The secondary reasons, motivations, or purposes behind this Intrusion Set."),
});

// Define the type for SchemaName
export type Group = z.infer<typeof GroupSchema>;
