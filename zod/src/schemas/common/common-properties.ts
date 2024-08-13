import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';

export const VersionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof VersionSchema>;

// Add more common property schemas here as needed
// For example:

export const NameSchema = z.string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof NameSchema>;

export const DescriptionSchema = z.string()
    .describe("A description of the object.");

export type Description = z.infer<typeof DescriptionSchema>;

export const PlatformsSchema = z
    .array(z.string(), {
        invalid_type_error: "Platforms must be an array of strings."
    })
    .describe("List of platforms that apply to the object.")

export type Platforms = z.infer<typeof PlatformsSchema>;

export const MitreContributorsSchema = z
    .array(z.string(), {
        invalid_type_error: "Contributors must be an array of strings."
    })
    .describe("People and organizations who have contributed to the object.")

export type MitreContributors = z.infer<typeof MitreContributorsSchema>;

export const KillChainNames = z.enum([
    "mitre-attack",
    "mitre-mobile-attack",
    "mitre-ics-attack"
]);
  
export type KillChainName = z.infer<typeof KillChainNames>;
  
export const KillChainPhaseSchema = z.object({
    phase_name: z.string({
        required_error: "Phase name is required.",
        invalid_type_error: "Phase name must be a string."
    }),
    kill_chain_name: z.string(KillChainNames)
});
  
export type KillChainPhase = z.infer<typeof KillChainPhaseSchema>;

export const ObjectMarkingRefsSchema = z
    .array(StixIdentifierSchema)
    .superRefine((val, ctx) => {
        val.forEach((identifier, index) => {
            if (!identifier.startsWith('marking-definition--')) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `All identifiers must start with 'marking-definition--'. Invalid identifier at index ${index}.`,
                    path: [index],
                });
            }
        });
    })
    .describe("The list of marking-definition objects to be applied to this object.");

// ... other common properties ...