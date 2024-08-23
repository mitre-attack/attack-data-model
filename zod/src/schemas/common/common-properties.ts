import { z } from 'zod';
import { StixIdentifier, stixIdentifierSchema } from './stix-identifier';
import { stixTimestampSchema } from './stix-timestamp';


/////////////////////////////////////
//
// Version
//
/////////////////////////////////////

export const versionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof versionSchema>;


/////////////////////////////////////
//
// Name
//
/////////////////////////////////////

export const nameSchema = z
    .string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof nameSchema>;


/////////////////////////////////////
//
// Description
//
/////////////////////////////////////

export const descriptionSchema = z
    .string()
    .describe("A description of the object.");

export type Description = z.infer<typeof descriptionSchema>;


/////////////////////////////////////
//
// MITRE Domains
//
/////////////////////////////////////

export const attackDomainSchema = z.enum([
    "enterprise-attack",
    "mobile-attack",
    "ics-attack"
]);

export const xMitreDomainsSchema = z
    .array(z.string())
    .min(1, {
        message: "At least one MITRE ATT&CK domain must be specified."
    })
    .refine(
        (domains) => domains.every((domain) => attackDomainSchema.safeParse(domain).success),
        (val) => ({
            message: `Invalid MITRE ATT&CK domain(s): ${val.filter(domain => !attackDomainSchema.safeParse(domain).success).join(", ")}. Allowed values are: ${attackDomainSchema.options.join(", ")}.`
        })
    )
    .transform((domains) => domains as z.infer<typeof attackDomainSchema>[])
    .describe("The technology domains to which the ATT&CK object belongs.");

export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;


/////////////////////////////////////
//
// MITRE Deprecated
//
/////////////////////////////////////

export const xMitreDeprecatedSchema = z
    .boolean({
        invalid_type_error: "x_mitre_deprecated must be a boolean."
    })
    .describe("Indicates whether the object has been deprecated.")

export type XMitreDeprecated = z.infer<typeof xMitreDeprecatedSchema>;


/////////////////////////////////////
//
// MITRE Shortname
//
/////////////////////////////////////

const supportedMitreShortNames = [
    'credential-access',
    'execution',
    'impact',
    'persistence',
    'privilege-escalation',
    'lateral-movement',
    'defense-evasion',
    'exfiltration',
    'discovery',
    'collection',
    'resource-development',
    'reconnaissance',
    'command-and-control',
    'initial-access',
    'inhibit-response-function',
    'privilege-escalation',
    'lateral-movement',
    'discovery',
    'initial-access',
    'impact',
    'persistence',
    'execution',
    'command-and-control',
    'collection',
    'evasion',
    'impair-process-control',
    'initial-access',
    'exfiltration',
    'persistence',
    'privilege-escalation',
    'command-and-control',
    'execution',
    'impact',
    'credential-access',
    'collection',
    'lateral-movement',
    'defense-evasion',
    'network-effects',
    'discovery',
    'remote-service-effects'
] as const;

export const xMitreShortNameSchema = z
    .enum(supportedMitreShortNames)
    .describe("The x_mitre_shortname of the tactic is used for mapping techniques into the tactic. It corresponds to kill_chain_phases.phase_name of the techniques in the tactic.");

export type XMitreShortName = z.infer<typeof xMitreShortNameSchema>;


/////////////////////////////////////
//
// MITRE Defense Bypassed
//
/////////////////////////////////////

const supportedMitreDefenseBypasses = [
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

export const xMitreDefenseBypassesSchema = z
    .array(z.enum(supportedMitreDefenseBypasses))
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        { message: "Mitre defense bypasses must be unique (no duplicates allowed)." }
    )
    .describe("List of defensive tools, methodologies, or processes the technique can bypass.");

export type XMitreDefenseBypasses = z.infer<typeof xMitreDefenseBypassesSchema>;


/////////////////////////////////////
//
// MITRE Tactic Type
//
/////////////////////////////////////

const supportedMitreTacticTypes = [
    "Post-Adversary Device Access",
    "Pre-Adversary Device Access", // TODO only used with PRE-ATT&CK
    "Without Adversary Device Access"
] as const;

export const xMitreTacticTypeSchema = z
    .array(z.enum(supportedMitreTacticTypes), {
        invalid_type_error: 'x_mitre_tactic_type must be an array of strings.',
        message: 'x_mitre_tactic_type may only contain values from the following list: ' + supportedMitreTacticTypes.join(', ')
    })
    .describe('"Post-Adversary Device Access", "Pre-Adversary Device Access", or "Without Adversary Device Access".')

export type XMitreTacticType = z.infer<typeof xMitreTacticTypeSchema>;



/////////////////////////////////////
//
// MITRE Effective Permissions
//
/////////////////////////////////////

const supportedMitreEffectivePermissions = [
    'Administrator',
    'SYSTEM',
    'User',
    'root'
] as const;

export const xMitreEffectivePermissionsSchema = z
    .array(z.enum(supportedMitreEffectivePermissions), {
        invalid_type_error: 'x_mitre_effective_permissions must be an array of strings.',
        message: 'x_mitre_effective_permissions may only contain values from the following list: ' + supportedMitreEffectivePermissions.join(', ')
    })
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        { message: "Effective permissions must be unique (no duplicates allowed)." }
    )
    .describe('The level of permissions the adversary will attain by performing the technique.');

export type XMitreEffectivePermissions = z.infer<typeof xMitreEffectivePermissionsSchema>;


/////////////////////////////////////
//
// MITRE Permissions Required
//
/////////////////////////////////////

const supportedMitrePermissionsRequired = [
    'Remote Desktop Users',
    'SYSTEM',
    'Administrator',
    'root',
    'User'
] as const;

export const xMitrePermissionsRequiredSchema = z
    .array(
        z.enum(supportedMitrePermissionsRequired),
        {
            invalid_type_error: "x_mitre_permissions_required must be an array of strings.",
            message: "x_mitre_permissions_required may only contain values from the following list: " + supportedMitrePermissionsRequired.join(', ')
        }
    )
    .min(1)
    .describe("The lowest level of permissions the adversary is required to be operating within to perform the technique on a system.");

export type XMitrePermissionsRequired = z.infer<typeof xMitrePermissionsRequiredSchema>;


/////////////////////////////////////
//
// MITRE Platforms
//
/////////////////////////////////////

const supportedMitrePlatforms = [
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

export const xMitrePlatformsSchema = z
    .array(
        z.enum(supportedMitrePlatforms),
        {
            invalid_type_error: "x_mitre_platforms must be an array of strings.",
            message: "x_mitre_platforms may only contain values from the following list: " + supportedMitrePlatforms.join(', ')
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

export type XMitrePlatforms = z.infer<typeof xMitrePlatformsSchema>;


/////////////////////////////////////
//
// MITRE Data Sources (x_mitre_data_sources)
//
/////////////////////////////////////

// a singular data source
export const xMitreDataSourceSchema = z
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
export const xMitreDataSourcesSchema = z
    .array(xMitreDataSourceSchema, {
        invalid_type_error: "x_mitre_data_sources must be an array of strings."
    })
    .describe("Data sources that are used to perform the technique.");

export type XMitreDataSource = z.infer<typeof xMitreDataSourceSchema>;
export type XMitreDataSources = z.infer<typeof xMitreDataSourcesSchema>;


/////////////////////////////////////
//
// Kill Chain Phase
//
/////////////////////////////////////

export const killChainNameSchema = z.enum([
    "mitre-attack",
    "mitre-mobile-attack",
    "mitre-ics-attack"
]);

export const killChainPhaseSchema = z.object({
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

    kill_chain_name: killChainNameSchema
})
    .strict();

export type KillChainName = z.infer<typeof killChainNameSchema>;
export type KillChainPhase = z.infer<typeof killChainPhaseSchema>;


/////////////////////////////////////
//
// Object Marking Reference
//
/////////////////////////////////////

export const objectMarkingRefsSchema = z
    .array(stixIdentifierSchema)
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

export type ObjectMarkingRefs = z.infer<typeof objectMarkingRefsSchema>;


/////////////////////////////////////
//
// Object Version Reference
//
/////////////////////////////////////

export const objectVersionReferenceSchema = z.object({
    object_ref: stixIdentifierSchema
        .refine(val => val !== undefined, {
            message: "'object_ref' is required."
        })
        .describe("The ID of the referenced object."),
    object_modified: stixTimestampSchema
        .brand("StixModifiedTimestamp")
        .refine(val => val !== undefined, {
            message: "'object_modified' is required."
        })
        .describe("The modified time of the referenced object. It MUST be an exact match for the modified time of the STIX object being referenced.")
});

export type ObjectVersionReference = z.infer<typeof objectVersionReferenceSchema>;


/////////////////////////////////////
//
// MITRE Modified By Ref (x_mitre_modified_by_ref)
//
/////////////////////////////////////

export const xMitreIdentity: StixIdentifier = "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as const;

export const xMitreModifiedByRefSchema = stixIdentifierSchema
    .refine(val => val == xMitreIdentity)
    .describe("The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.");
