import { z } from 'zod/v4';
import { type StixIdentifier, stixIdentifierSchema } from './stix-identifier.js';

/////////////////////////////////////
//
// Version
// (version)
//
/////////////////////////////////////

export const versionSchema = z
  .string()
  .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
  .default('2.1')
  .meta({
    description:
      "Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
  });

export type Version = z.infer<typeof versionSchema>;

/////////////////////////////////////
//
// Name
// (name)
//
/////////////////////////////////////

export const nameSchema = z
  .string()
  .min(1, 'Name must not be empty')
  .describe('The name of the object.');

export type Name = z.infer<typeof nameSchema>;

/////////////////////////////////////
//
// Description
// (description)
//
/////////////////////////////////////

export const descriptionSchema = z.string().describe('A description of the object.');

export type Description = z.infer<typeof descriptionSchema>;

/////////////////////////////////////
//
// Aliases
// (aliases)
//
/////////////////////////////////////

export const aliasesSchema = z
  .array(z.string(), { error: 'Aliases must be an array of strings.' })
  .meta({
    description:
      "Alternative names used to identify this object. The first alias must match the object's name.",
  });

export type Aliases = z.infer<typeof aliasesSchema>;

/////////////////////////////////////
//
// MITRE Version
// (x_mitre_version)
//
/////////////////////////////////////

export const xMitreVersionSchema = z
  .string()
  .regex(/^(\d{1,2})\.(\d{1,2})$/, "Version must be in format 'M.N' where M and N are 0-99")
  .meta({
    description:
      "Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
  });

export type XMitreVersion = z.infer<typeof xMitreVersionSchema>;

/////////////////////////////////////
//
// MITRE ATT&CK Spec Version
// (x_mitre_attack_spec_version)
//
/////////////////////////////////////

const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export const xMitreAttackSpecVersionSchema = z
  .string()
  .regex(semverRegex, 'Must be valid semantic version (MAJOR.MINOR.PATCH)')
  .meta({
    description:
      'The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.',
  });

export type XMitreAttackSpecVersion = z.infer<typeof xMitreAttackSpecVersionSchema>;

/////////////////////////////////////
//
// MITRE Old ATT&CK ID
// (x_mitre_old_attack_id)
//
/////////////////////////////////////

// e.g., "MOB-M1008", "MOB-S0012"
type MitreOldAttackId = `MOB-${'M' | 'S'}${number}`;

const oldAttackIdRegex = /^MOB-(M|S)\d{4}$/;

export const xMitreOldAttackIdSchema = z
  .string()
  .refine(
    (value): value is MitreOldAttackId => {
      return oldAttackIdRegex.test(value);
    },
    {
      message:
        "Must be in the format 'MOB-X0000' where X is either 'M' or 'S', followed by exactly four digits",
    },
  )
  .meta({ description: 'Old ATT&CK IDs that may have been associated with this object' });

export type XMitreOldAttackId = z.infer<typeof xMitreOldAttackIdSchema>;

/////////////////////////////////////
//
// MITRE Domains
// (x_mitre_domains)
//
/////////////////////////////////////

export const attackDomainSchema = z.enum(['enterprise-attack', 'mobile-attack', 'ics-attack']);

export type AttackDomain = z.infer<typeof attackDomainSchema>;

export const xMitreDomainsSchema = z
  .array(attackDomainSchema)
  .min(1, {
    message: 'At least one MITRE ATT&CK domain must be specified.',
  })
  .meta({ description: 'The technology domains to which the ATT&CK object belongs.' });

export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;

/////////////////////////////////////
//
// MITRE Deprecated
// (x_mitre_deprecated)
//
/////////////////////////////////////

export const xMitreDeprecatedSchema = z
  .boolean({
    error: 'x_mitre_deprecated must be a boolean.',
  })
  .meta({ description: 'Indicates whether the object has been deprecated.' });

export type XMitreDeprecated = z.infer<typeof xMitreDeprecatedSchema>;

/////////////////////////////////////
//
// MITRE Platforms
// (x_mitre_platforms)
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
  'Embedded',
] as const;

export const xMitrePlatformsSchema = z
  .array(
    z.enum(supportedMitrePlatforms, {
      error: () => `Platform must be one of: ${supportedMitrePlatforms.join(', ')}`,
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'x_mitre_platforms must be an array of strings'
          : 'Invalid platforms array',
    },
  )
  .min(1, 'At least one platform is required')
  .refine((items) => new Set(items).size === items.length, {
    message: 'Platforms must be unique (no duplicates allowed).',
  })
  .meta({ description: 'List of platforms that apply to the object.' });

export type XMitrePlatforms = z.infer<typeof xMitrePlatformsSchema>;

/////////////////////////////////////
//
// Object Marking Reference
// (object_marking_refs)
//
/////////////////////////////////////

export const objectMarkingRefsSchema = z
  .array(
    stixIdentifierSchema.startsWith(
      'marking-definition--',
      'Identifier must start with "marking-definition--"',
    ),
  )
  .meta({
    description: 'The list of marking-definition objects to be applied to this object.',
  });

/////////////////////////////////////
//
// MITRE Contributors
// (x_mitre_contributors)
//
/////////////////////////////////////

export const xMitreContributorsSchema = z.array(z.string()).meta({
  description:
    'People and organizations who have contributed to the object. Not found on relationship objects.',
});

export type XMitreContributors = z.infer<typeof xMitreContributorsSchema>;

/////////////////////////////////////
//
// MITRE Modified By Ref
// (x_mitre_modified_by_ref)
//
/////////////////////////////////////

const xMitreIdentity: StixIdentifier = 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5' as const;

export const xMitreIdentitySchema = z.literal(xMitreIdentity);

export const xMitreModifiedByRefSchema = xMitreIdentitySchema.meta({
  description:
    'The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.',
});

export type XMitreModifiedByRef = z.infer<typeof xMitreModifiedByRefSchema>;

/////////////////////////////////////
//
// Kill Chain Phases (kill_chain_phases)
//
/////////////////////////////////////

export const killChainNameSchema = z.enum([
  'mitre-attack',
  'mitre-mobile-attack',
  'mitre-ics-attack',
]);

export const killChainPhaseSchema = z
  .object({
    phase_name: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Phase name is required' : 'Phase name must be a string',
      })
      .refine(
        (value) => {
          // Check if the value is all lowercase
          const isLowercase = value === value.toLowerCase();

          // Check if the value uses hyphens instead of spaces or underscores
          const usesHyphens = !value.includes(' ') && !value.includes('_');

          return isLowercase && usesHyphens;
        },
        {
          message:
            'Phase name should be all lowercase and use hyphens instead of spaces or underscores.',
        },
      )
      .meta({
        description:
          'The name of the phase in the kill chain. The value of this property SHOULD be all lowercase and SHOULD use hyphens instead of spaces or underscores as word separators.',
      }),

    kill_chain_name: killChainNameSchema,
  })
  .strict();

export type KillChainName = z.infer<typeof killChainNameSchema>;
export type KillChainPhase = z.infer<typeof killChainPhaseSchema>;
