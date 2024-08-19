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
// MITRE Defense Bypassed
//
/////////////////////////////////////

const SupportedMitreDefenseBypasses = [
    'Signature-based detection',
    'Multi-Factor Authentication',
    'Network Intrusion Detection System',
    'Application Control',
    'Host forensic analysis',
    'Exploit Prevention',
    'Signature-based Detection',
    'Data Execution Prevention',
    'Heuristic Detection',
    'File system access controls',
    'File Monitoring',
    'Digital Certificate Validation',
    'Logon Credentials',
    'Firewall',
    'Host Forensic Analysis',
    'Static File Analysis',
    'Heuristic detection',
    'Notarization',
    'System access controls',
    'Binary Analysis',
    'Web Content Filters',
    'Network intrusion detection system',
    'Host intrusion prevention systems',
    'Application control',
    'Defensive network service scanning',
    'User Mode Signature Validation',
    'Encryption',
    'Log Analysis',
    'Autoruns Analysis',
    'Anti Virus',
    'Gatekeeper',
    'Anti-virus',
    'Log analysis',
    'Process whitelisting',
    'Host Intrusion Prevention Systems',
    'Windows User Account Control',
    'System Access Controls',
    'Application whitelisting',
    'Whitelisting by file name or path',
    'File monitoring'
] as const;

export const MitreDefenseBypassesSchema = z
    .array(z.enum(SupportedMitreDefenseBypasses))
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        { message: "Mitre defense bypasses must be unique (no duplicates allowed)." }
    )
    .describe("List of defensive tools, methodologies, or processes the technique can bypass.");

export type MitreDefenseBypasses = z.infer<typeof MitreDefenseBypassesSchema>;


/////////////////////////////////////
//
// MITRE Tactic Type
//
/////////////////////////////////////

const SupportedMitreTacticTypes = [
    "Post-Adversary Device Access",
    "Pre-Adversary Device Access",
    "Without Adversary Device Access"
] as const;

export const MitreTacticTypeSchema = z
    .array(z.enum(SupportedMitreTacticTypes), {
        invalid_type_error: 'x_mitre_tactic_type must be an array of strings.',
        message: 'x_mitre_tactic_type may only contain values from the following list: ' + SupportedMitreTacticTypes.join(', ')
    })
    .describe('"Post-Adversary Device Access", "Pre-Adversary Device Access", or "Without Adversary Device Access".')

export type MitreTacticType = z.infer<typeof MitreTacticTypeSchema>;



/////////////////////////////////////
//
// MITRE Effective Permissions
//
/////////////////////////////////////

const SupportedMitreEffectivePermissions = [
    'Administrator',
    'SYSTEM',
    'User',
    'root'
] as const;

// TODO How do we address/verify "Enterprise domain in the Privilege Escalation tactic"?
export const MitreEffectivePermissionsSchema = z
    .array(z.enum(SupportedMitreEffectivePermissions), {
        invalid_type_error: 'x_mitre_effective_permissions must be an array of strings.',
        message: 'x_mitre_effective_permissions may only contain values from the following list: ' + SupportedMitreEffectivePermissions.join(', ')
    })
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        { message: "Effective permissions must be unique (no duplicates allowed)." }
    )
    .describe('The level of permissions the adversary will attain by performing the technique.');


/////////////////////////////////////
//
// MITRE Permissions Required
//
/////////////////////////////////////

const SupportedMitrePermissionsRequired = [
    'Remote Desktop Users',
    'SYSTEM',
    'Administrator',
    'root',
    'User'
] as const;

export const MitrePermissionsRequiredSchema = z
    .array(
        z.enum(SupportedMitrePermissionsRequired),
        {
            invalid_type_error: "x_mitre_permissions_required must be an array of strings.",
            message: "x_mitre_permissions_required may only contain values from the following list: " + SupportedMitrePermissionsRequired.join(', ')
        }
    )
    .min(1)
    .describe("The lowest level of permissions the adversary is required to be operating within to perform the technique on a system.");

export type MitrePermissionsRequired = z.infer<typeof MitrePermissionsRequiredSchema>;


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
    .array(
        z.enum(SupportedPlatforms),
        {
            invalid_type_error: "x_mitre_platforms must be an array of strings.",
            message: "x_mitre_platforms may only contain values from the following list: " + SupportedPlatforms.join(', ')
        }
    )
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        {
            message: "Platforms must be unique (no duplicates allowed)."
        }
    )
    .describe("List of platforms that apply to the object.");

export type Platforms = z.infer<typeof PlatformsSchema>;


/////////////////////////////////////
//
// MITRE Data Sources (x_mitre_data_sources)
//
/////////////////////////////////////

// a singular data source
export const MitreDataSourceSchema = z
    .string()
    .refine(
        (value) => {
            const parts = value.split(':');
            return parts.length === 2 && parts[0].trim() !== '' && parts[1].trim() !== '';
        },
        {
            message: "Each entry must conform to the pattern '<Data Source Name>: <Data Component Name>'",
        }
    )
    .describe("People and organizations who have contributed to the object.");

// list of data sources
export const MitreDataSourcesSchema = z
    .array(MitreDataSourceSchema, {
        invalid_type_error: "x_mitre_data_sources must be an array of strings."
    })
    .describe("Data sources that are used to perform the technique.");

export type MitreDataSource = z.infer<typeof MitreDataSourceSchema>;
export type MitreDataSources = z.infer<typeof MitreDataSourcesSchema>;


/////////////////////////////////////
//
// Kill Chain Phase
//
/////////////////////////////////////

export const KillChainNameSchema = z.enum([
    "mitre-attack",
    "mitre-mobile-attack",
    "mitre-ics-attack"
]);
  
export type KillChainName = z.infer<typeof KillChainNameSchema>;
  
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

    kill_chain_name: KillChainNameSchema
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