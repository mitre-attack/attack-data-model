import { z } from 'zod';
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { StixType, stixTypeSchema } from '../common/stix-type';
import { descriptionSchema, xMitrePlatformsSchema, attackDomainSchema, createStixIdentifierSchema, xMitreModifiedByRefSchema, xMitreDomainsSchema, xMitreContributorsSchema, externalReferencesSchema } from '../common';

// Initializes the custom ZodErrorMap
import '../../errors'; 

// read only type reference
const TECHNIQUE_TYPE: StixType = stixTypeSchema.enum['attack-pattern'];


/////////////////////////////////////
//
// MITRE Network Requirements (x_mitre_network_requirements)
//
/////////////////////////////////////

const xMitreNetworkRequirementsSchema = z
    .boolean()
    .describe(""); // TODO enter a description

export type XMitreNetworkRequirements = z.infer<typeof xMitreNetworkRequirementsSchema>;


/////////////////////////////////////
//
// MITRE Effective Permissions (x_mitre_effective_permissions)
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
// MITRE Impact type (x_mitre_impact_type)
//
/////////////////////////////////////

const supportedMitreImpactTypes = [
    'Availability',
    'Integrity'
] as const;

const xMitreImpactTypeSchema = z
    .array(
        z.enum(supportedMitreImpactTypes), {
        invalid_type_error: "x_mitre_impact_type must be an array of strings."
    })
    .describe("Denotes if the technique can be used for integrity or availability attacks.")

export type XMitreImpactType = z.infer<typeof xMitreImpactTypeSchema>;


/////////////////////////////////////
//
// MITRE System Requirements (x_mitre_system_requirements)
//
/////////////////////////////////////

export const xMitreSystemRequirementsSchema = z
    .array(z.string(), {
        invalid_type_error: "x_mitre_system_requirements must be an array of strings."
    })
    .describe("Additional information on requirements the adversary needs to meet or about the state of the system (software, patch level, etc.) that may be required for the technique to work.")

export type XMitreSystemRequirements = z.infer<typeof xMitreSystemRequirementsSchema>;


/////////////////////////////////////
//
// MITRE Remote Support (x_mitre_remote_support)
//
/////////////////////////////////////

export const xMitreRemoteSupportSchema = z
    .boolean()
    .describe("If true, the technique can be used to execute something on a remote system.")

export type XMitreRemoteSupport = z.infer<typeof xMitreRemoteSupportSchema>;


/////////////////////////////////////
//
// MITRE Permissions Required (x_mitre_permissions_required)
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
// MITRE Data Sources (x_mitre_data_sources)
//
/////////////////////////////////////

// a singular data source
type DataSourceString = `${string}: ${string}`;

export const xMitreDataSourceSchema = z
    .custom<DataSourceString>(
        (value): value is DataSourceString => {
            if (typeof value !== 'string') return false;
            const parts = value.split(':');
            return parts.length === 2 && parts[0].trim() !== '' && parts[1].trim() !== '';
        },
        {
            message: "Each entry must conform to the pattern '<Data Source Name>: <Data Component Name>'",
        }
    )
    .describe("A single data source in the format 'Data Source Name: Data Component Name'.");

// list of data sources
export const xMitreDataSourcesSchema = z
    .array(xMitreDataSourceSchema, {
        invalid_type_error: "x_mitre_data_sources must be an array of strings."
    })
    .describe("Sources of information that may be used to identify the action or result of the action being performed.");

export type XMitreDataSource = z.infer<typeof xMitreDataSourceSchema>;
export type XMitreDataSources = z.infer<typeof xMitreDataSourcesSchema>;


/////////////////////////////////////
//
// MITRE Is Subtechnique (x_mitre_is_subtechnique)
//
/////////////////////////////////////

export const xMitreIsSubtechniqueSchema = z
    .boolean({
        invalid_type_error: "x_mitre_is_subtechnique must be a boolean."
    })
    .describe("If true, this attack-pattern is a sub-technique.")

export type XMitreIsSubtechnique = z.infer<typeof xMitreIsSubtechniqueSchema>;


/////////////////////////////////////
//
// Kill Chain Phases (kill_chain_phases)
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
// MITRE Tactic Type (x_mitre_tactic_type)
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
// MITRE Defense Bypassed (x_mitre_defense_bypassed)
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
// MITRE Detection (x_mitre_detection)
//
/////////////////////////////////////

export const xMitreDetectionSchema = z
    .string({
        invalid_type_error: "x_mitre_detection must be a string."
    })
    .describe("Strategies for identifying if a technique has been used by an adversary.")

export type XMitreDetection = z.infer<typeof xMitreDetectionSchema>;


/////////////////////////////////////
//
// MITRE Technique
//
/////////////////////////////////////

export const techniqueSchema = attackBaseObjectSchema.extend({

    id: createStixIdentifierSchema(TECHNIQUE_TYPE),

    type: z.literal(TECHNIQUE_TYPE),

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema,

    kill_chain_phases: z
        .array(killChainPhaseSchema)
        .optional(),

    description: descriptionSchema
        .optional(),

    x_mitre_platforms: xMitrePlatformsSchema
        .optional(),

    x_mitre_detection: xMitreDetectionSchema
        .optional(),

    x_mitre_is_subtechnique: xMitreIsSubtechniqueSchema,

    x_mitre_data_sources: xMitreDataSourcesSchema
        .optional(),
    
    x_mitre_defense_bypassed: xMitreDefenseBypassesSchema
        .optional(),

    x_mitre_contributors: xMitreContributorsSchema
        .optional(),

    x_mitre_permissions_required: xMitrePermissionsRequiredSchema
        .optional(),

    x_mitre_remote_support: xMitreRemoteSupportSchema
        .optional(),

    x_mitre_system_requirements: xMitreSystemRequirementsSchema
        .optional(),

    x_mitre_impact_type: xMitreImpactTypeSchema
        .optional(),

    x_mitre_effective_permissions: xMitreEffectivePermissionsSchema
        .optional(),
    
    x_mitre_network_requirements: xMitreNetworkRequirementsSchema
        .optional(),

    x_mitre_tactic_type: xMitreTacticTypeSchema
        .optional(),
    
    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema
        .optional()

})
    .required({
        created: true,
        external_references: true,
        id: true,
        modified: true,
        name: true,
        spec_version: true,
        type: true,
        x_mitre_attack_spec_version: true,
        x_mitre_domains: true,
        x_mitre_is_subtechnique: true,
        x_mitre_version: true
    })
    .superRefine((schema, ctx) => {

        // Destructure relevant properties from the schema
        const {
            external_references,
            kill_chain_phases,
            x_mitre_domains,
            x_mitre_permissions_required,
            x_mitre_effective_permissions,
            x_mitre_system_requirements,
            x_mitre_defense_bypassed,
            x_mitre_remote_support,
            x_mitre_impact_type,
            x_mitre_is_subtechnique,
            x_mitre_tactic_type,
            x_mitre_data_sources
        } = schema;

        // Helper variables for domain checks
        const inEnterpriseDomain = x_mitre_domains.includes(attackDomainSchema.enum['enterprise-attack']);
        const inMobileDomain = x_mitre_domains.includes(attackDomainSchema.enum['mobile-attack']);

        //==============================================================================
        // Validate external references
        //==============================================================================

        // Verify that first external reference is an ATT&CK ID
        const attackIdEntry = external_references[0];
        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_references entry.",
                path: ['external_references', 0, 'external_id']
            });
        } else {
            // Check if the ATT&CK ID format is correct based on whether it's a sub-technique
            const idRegex = x_mitre_is_subtechnique ? /^T\d{4}\.\d{3}$/ : /^T\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format ${x_mitre_is_subtechnique ? "T####.###" : "T####"}.`,
                    path: ['external_references', 0, 'external_id']
                });
            }
        }

        //==============================================================================
        // Validate Enterprise-only properties
        //==============================================================================

        // Extract tactics from kill_chain_phases
        const tactics = kill_chain_phases?.map(tactic => tactic.phase_name) || [];

        /**
         * Validates that the specified property is only valid if the
         * technique is associated with the specified tactic and belongs to the enterprise
         * domain.
         * 
         * @param fieldName The property key that will be evaluated
         * @param value The property value that will be evaluated
         * @param requiredTactic The name of the tactic required for the property to be valid
         */
        function validateEnterpriseOnlyField(
            fieldName: string,
            value: any,
            requiredTactic: string | null = null
        ) {
            if (value !== undefined) {
                if (!inEnterpriseDomain) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${fieldName} is only supported in the 'enterprise-attack' domain.`,
                        path: [fieldName]
                    });
                } else if (requiredTactic && kill_chain_phases !== undefined && !tactics.includes(requiredTactic)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${fieldName} is only supported in the ${requiredTactic} tactic.`,
                        path: [fieldName]
                    });
                }
            }
        }

        // Validate enterprise-only fields
        validateEnterpriseOnlyField('x_mitre_system_requirements', x_mitre_system_requirements);
        validateEnterpriseOnlyField('x_mitre_permissions_required', x_mitre_permissions_required, 'privilege-escalation');
        validateEnterpriseOnlyField('x_mitre_effective_permissions', x_mitre_effective_permissions, 'privilege-escalation');
        validateEnterpriseOnlyField('x_mitre_defense_bypassed', x_mitre_defense_bypassed, 'defense-evasion');
        validateEnterpriseOnlyField('x_mitre_remote_support', x_mitre_remote_support, 'execution');
        validateEnterpriseOnlyField('x_mitre_impact_type', x_mitre_impact_type, 'impact');

        //==============================================================================
        // Validate Mobile-only properties
        //==============================================================================

        if (x_mitre_tactic_type?.length && !inMobileDomain) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "x_mitre_tactic_type is only supported in the 'mobile-attack' domain.",
            })
        }

        if (x_mitre_data_sources && inMobileDomain) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "x_mitre_data_sources is not supported in the 'mobile-attack' domain.",
            });
        }
    });


export type Technique = z.infer<typeof techniqueSchema>;