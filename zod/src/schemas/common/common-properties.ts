import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';
import { StixTimestampSchema } from './stix-timestamp';


/////////////////////////////////////
//
// Version
//
/////////////////////////////////////

export const VersionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof VersionSchema>;


/////////////////////////////////////
//
// Name
//
/////////////////////////////////////

export const NameSchema = z.string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof NameSchema>;


/////////////////////////////////////
//
// Description
//
/////////////////////////////////////

export const DescriptionSchema = z.string()
    .describe("A description of the object.");

export type Description = z.infer<typeof DescriptionSchema>;


/////////////////////////////////////
//
// MITRE Platforms
//
/////////////////////////////////////

const SupportedPlatforms = [
    'Field Controller/RTU/PLC/IED',
    'Network',
    'Data Historian',
    'Google Workspace',
    'Office 365',
    'Containers',
    'Azure AD',
    'Engineering Workstation',
    'Control Server',
    'Human-Machine Interface',
    'Windows',
    'Linux',
    'IaaS',
    'None',
    'iOS',
    'PRE',
    'SaaS',
    'Input/Output Server',
    'macOS',
    'Android',
    'Safety Instrumented System/Protection Relay',
    'Embedded'
] as const;

export const PlatformsSchema = z
    .array(z.enum(SupportedPlatforms))
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        { message: "Platforms must be unique (no duplicates allowed)." }
    )
    .describe("List of platforms that apply to the object.");

// Type inference
export type Platforms = z.infer<typeof PlatformsSchema>;


/////////////////////////////////////
//
// MITRE Contributors
//
/////////////////////////////////////

export const MitreContributorsSchema = z
    .array(z.string(), {
        invalid_type_error: "Contributors must be an array of strings."
    })
    .describe("People and organizations who have contributed to the object.")

export type MitreContributors = z.infer<typeof MitreContributorsSchema>;


/////////////////////////////////////
//
// Kill Chain Phase
//
/////////////////////////////////////

export const KillChainNames = z.enum([
    "mitre-attack",
    "mitre-mobile-attack",
    "mitre-ics-attack"
]);
  
export type KillChainName = z.infer<typeof KillChainNames>;
  
export const KillChainPhaseSchema = z.object({
    phase_name: z
        .string({
            required_error: "Phase name is required.",
            invalid_type_error: "Phase name must be a string."
        })
        .describe("The name of the phase in the kill chain. The value of this property SHOULD be all lowercase and SHOULD use hyphens instead of spaces or underscores as word separators.")
        .refine(
            (value) => {
                // Check if the value is all lowercase
                const isLowercase = value === value.toLowerCase();

                // Check if the value uses hyphens instead of spaces or underscores
                const usesHyphens = !value.includes(' ') && !value.includes('_');

                return isLowercase && usesHyphens;
            },
            {
                message: "Phase name should be all lowercase and use hyphens instead of spaces or underscores."
            }
        ),

    kill_chain_name: KillChainNames
})
    .strict();
  
export type KillChainPhase = z.infer<typeof KillChainPhaseSchema>;


/////////////////////////////////////
//
// Object Marking Reference
//
/////////////////////////////////////

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


/////////////////////////////////////
//
// Object Version Reference
//
/////////////////////////////////////

export const ObjectVersionReferenceSchema = z.object({
    object_ref: StixIdentifierSchema
        .refine(val => val !== undefined, {
            message: "'object_ref' is required."
        })
        .describe("The ID of the referenced object."),
    object_modified: StixTimestampSchema
        .brand("StixModifiedTimestamp")
        .refine(val => val !== undefined, {
            message: "'object_modified' is required."
        })
        .describe("The modified time of the referenced object. It MUST be an exact match for the modified time of the STIX object being referenced.")
});