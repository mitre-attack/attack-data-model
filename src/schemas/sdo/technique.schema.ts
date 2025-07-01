import { z } from 'zod/v4';
import {
  attackBaseDomainObjectSchema,
  descriptionSchema,
  xMitrePlatformsSchema,
  createStixIdValidator,
  createStixTypeValidator,
  xMitreModifiedByRefSchema,
  xMitreDomainsSchema,
  xMitreContributorsSchema,
  killChainPhaseSchema,
  createAttackExternalReferencesSchema,
} from '../common/index.js';
import { logSourceSchema } from './log-source.schema.js';
import {
  createAttackIdInExternalReferencesRefinement,
  createEnterpriseOnlyPropertiesRefinement,
  createMobileOnlyPropertiesRefinement,
} from '@/refinements/index.js';

/////////////////////////////////////
//
// MITRE Network Requirements (x_mitre_network_requirements)
//
/////////////////////////////////////

const xMitreNetworkRequirementsSchema = z.boolean().describe(''); // TODO enter a description

export type XMitreNetworkRequirements = z.infer<typeof xMitreNetworkRequirementsSchema>;

/////////////////////////////////////
//
// MITRE Effective Permissions (x_mitre_effective_permissions)
//
/////////////////////////////////////

const supportedMitreEffectivePermissions = ['Administrator', 'SYSTEM', 'User', 'root'] as const;

export const xMitreEffectivePermissionsSchema = z
  .array(
    z.enum(supportedMitreEffectivePermissions, {
      error: () =>
        `Effective permission must be one of: ${supportedMitreEffectivePermissions.join(', ')}`,
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'x_mitre_effective_permissions must be an array of strings'
          : 'Invalid effective permissions array',
    },
  )
  .nonempty('At least one effective permission is required')
  .refine((items) => new Set(items).size === items.length, {
    message: 'Effective permissions must be unique (no duplicates allowed)',
  })
  .meta({
    description: 'The level of permissions the adversary will attain by performing the technique',
  });

export type XMitreEffectivePermissions = z.infer<typeof xMitreEffectivePermissionsSchema>;

/////////////////////////////////////
//
// MITRE Impact type (x_mitre_impact_type)
//
/////////////////////////////////////

const supportedMitreImpactTypes = ['Availability', 'Integrity'] as const;

const xMitreImpactTypeSchema = z
  .array(
    z.enum(supportedMitreImpactTypes, {
      error: () => `Impact type must be one of: ${supportedMitreImpactTypes.join(', ')}`,
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'x_mitre_impact_type must be an array of strings'
          : 'Invalid impact type array',
    },
  )
  .meta({
    description: 'Denotes if the technique can be used for integrity or availability attacks',
  });

export type XMitreImpactType = z.infer<typeof xMitreImpactTypeSchema>;

/////////////////////////////////////
//
// MITRE System Requirements (x_mitre_system_requirements)
//
/////////////////////////////////////

export const xMitreSystemRequirementsSchema = z
  .array(z.string(), {
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_system_requirements must be an array of strings'
        : 'Invalid system requirements array',
  })
  .meta({
    description:
      'Additional information on requirements the adversary needs to meet or about the state of the system (software, patch level, etc.) that may be required for the technique to work',
  });

export type XMitreSystemRequirements = z.infer<typeof xMitreSystemRequirementsSchema>;

/////////////////////////////////////
//
// MITRE Remote Support (x_mitre_remote_support)
//
/////////////////////////////////////

export const xMitreRemoteSupportSchema = z.boolean().meta({
  description: 'If true, the technique can be used to execute something on a remote system.',
});

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
  'User',
] as const;

export const xMitrePermissionsRequiredSchema = z
  .array(
    z.enum(supportedMitrePermissionsRequired, {
      error: () =>
        'x_mitre_permissions_required may only contain values from the following list: ' +
        supportedMitrePermissionsRequired.join(', '),
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'x_mitre_permissions_required must be an array of strings'
          : 'Invalid x_mitre_permissions_required array',
    },
  )
  .nonempty('At least one x_mitre_permissions_required value is required')
  .meta({
    description:
      'The lowest level of permissions the adversary is required to be operating within to perform the technique on a system.',
  });

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
    },
  )
  .meta({
    description: "A single data source in the format 'Data Source Name: Data Component Name'",
  });

// list of data sources
export const xMitreDataSourcesSchema = z
  .array(xMitreDataSourceSchema, {
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_data_sources must be an array of strings'
        : 'Invalid data sources array',
  })
  .meta({
    description:
      'Sources of information that may be used to identify the action or result of the action being performed',
  });

export type XMitreDataSource = z.infer<typeof xMitreDataSourceSchema>;
export type XMitreDataSources = z.infer<typeof xMitreDataSourcesSchema>;

/////////////////////////////////////
//
// MITRE Is Subtechnique (x_mitre_is_subtechnique)
//
/////////////////////////////////////

export const xMitreIsSubtechniqueSchema = z
  .boolean({
    error: 'x_mitre_is_subtechnique must be a boolean',
  })
  .meta({
    description: 'If true, this attack-pattern is a sub-technique',
  });

export type XMitreIsSubtechnique = z.infer<typeof xMitreIsSubtechniqueSchema>;

/////////////////////////////////////
//
// MITRE Tactic Type (x_mitre_tactic_type)
//
/////////////////////////////////////

const supportedMitreTacticTypes = [
  'Post-Adversary Device Access',
  'Pre-Adversary Device Access', // TODO only used with PRE-ATT&CK
  'Without Adversary Device Access',
] as const;

export const xMitreTacticTypeSchema = z
  .array(
    z.enum(supportedMitreTacticTypes, {
      error: () => `Tactic type must be one of: ${supportedMitreTacticTypes.join(', ')}`,
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'x_mitre_tactic_type must be an array of strings'
          : 'Invalid tactic type array',
    },
  )
  .meta({
    description:
      '"Post-Adversary Device Access", "Pre-Adversary Device Access", or "Without Adversary Device Access"',
  });

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
  'File monitoring',
] as const;

export const xMitreDefenseBypassesSchema = z
  .array(z.enum(supportedMitreDefenseBypasses))
  .min(1)
  .refine((items) => new Set(items).size === items.length, {
    message: 'Mitre defense bypasses must be unique (no duplicates allowed).',
  })
  .meta({
    description: 'List of defensive tools, methodologies, or processes the technique can bypass.',
  });

export type XMitreDefenseBypasses = z.infer<typeof xMitreDefenseBypassesSchema>;

/////////////////////////////////////
//
// MITRE Detection (x_mitre_detection)
//
/////////////////////////////////////

export const xMitreDetectionSchema = z
  .string({
    error: 'x_mitre_detection must be a string.',
  })
  .meta({
    description: 'Strategies for identifying if a technique has been used by an adversary.',
  });

export type XMitreDetection = z.infer<typeof xMitreDetectionSchema>;

/////////////////////////////////////
//
// MITRE Technique
//
/////////////////////////////////////

export const extensibleTechniqueSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('attack-pattern'),

    type: createStixTypeValidator('attack-pattern'),

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('attack-pattern'),

    kill_chain_phases: z.array(killChainPhaseSchema).optional(),

    description: descriptionSchema.optional(),

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_detection: xMitreDetectionSchema.optional(),

    x_mitre_is_subtechnique: xMitreIsSubtechniqueSchema,

    x_mitre_data_sources: z.array(xMitreDataSourcesSchema).optional(), // TODO remove in attack spec 4.0.0 / adm release 5.x

    x_mitre_log_sources: z.array(logSourceSchema).optional(),

    x_mitre_defense_bypassed: xMitreDefenseBypassesSchema.optional(),

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_permissions_required: xMitrePermissionsRequiredSchema.optional(),

    x_mitre_remote_support: xMitreRemoteSupportSchema.optional(),

    x_mitre_system_requirements: xMitreSystemRequirementsSchema.optional(),

    x_mitre_impact_type: xMitreImpactTypeSchema.optional(),

    x_mitre_effective_permissions: xMitreEffectivePermissionsSchema.optional(),

    x_mitre_network_requirements: xMitreNetworkRequirementsSchema.optional(),

    x_mitre_tactic_type: xMitreTacticTypeSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .strict();

// Apply the refinements for techniques
export const techniqueSchema = extensibleTechniqueSchema.check((ctx) => {
  // Validates that the first external reference is a valid ATT&CK ID
  createAttackIdInExternalReferencesRefinement()(ctx);
  // Validates that the technique only contains properties permissible by the target tactic in Enterprise
  createEnterpriseOnlyPropertiesRefinement()(ctx);
  // Validates that the technique only contains properties permissible in Mobile (if the technique belongs to Mobile)
  createMobileOnlyPropertiesRefinement()(ctx);
});

export type Technique = z.infer<typeof extensibleTechniqueSchema>;
