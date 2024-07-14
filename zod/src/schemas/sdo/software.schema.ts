import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { DescriptionSchema, PlatformsSchema, MitreContributorsSchema,StixCreatedByRefSchema } from '../common';

// Custom error messages
const SoftwareError = {
    InvalidVersion: {
        code: z.ZodIssueCode.custom,
        message: "Software version must be a valid semantic version string",
    },
    // Add more custom error messages as needed
};

// Software Schema
export const SoftwareSchema = AttackCoreSDOSchema.extend({
    description: DescriptionSchema,

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
        
    labels: z
        .array(
            z.string(),
            {
                invalid_type_error: "Labels must be an array of strings."
            }
        )
        .describe("The kind(s) of software(s) being described")
        .optional()
});

// Define the type for Software
export type Software = z.infer<typeof SoftwareSchema>;

//creted by ref
//is family
//x_mitre_old_attack_id