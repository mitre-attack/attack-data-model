import { z } from 'zod/v4';
import {
  attackIdPatterns,
  getAttackIdExample,
  stixTypeToAttackIdMapping,
  type StixTypesWithAttackIds,
} from './attack-id.js';
import { nonEmptyRequiredString, stixListOf } from './generic.js';
import {
  createStixIdValidator,
  stixIdentifierSchema,
  type StixIdentifier,
} from './stix-identifier.js';
import type { StixType } from './stix-type.js';

/**
 * Schema for validating object names.
 *
 * A non-empty, trimmed string representing the name of a STIX or ATT&CK object.
 *
 * @example
 * ```typescript
 * nameSchema.parse("Attack Pattern"); // "Attack Pattern"
 * nameSchema.parse(""); // throws error
 * ```
 */
export const nameSchema = nonEmptyRequiredString.meta({ description: 'The name of the object.' });

/**
 * Type representing a validated object name.
 */
export type Name = z.infer<typeof nameSchema>;

/**
 * Schema for validating object descriptions.
 *
 * A non-empty, trimmed string providing descriptive information about a STIX or ATT&CK object.
 *
 * @example
 * ```typescript
 * descriptionSchema.parse("This technique describes..."); // "This technique describes..."
 * descriptionSchema.parse("   "); // throws error
 * ```
 */
export const descriptionSchema = nonEmptyRequiredString.meta({
  description: 'A description of the object.',
});

/**
 * Type representing a validated object description.
 */
export type Description = z.infer<typeof descriptionSchema>;

/**
 * Schema for validating object aliases.
 *
 * An array of alternative names used to identify an object. According to ATT&CK conventions,
 * the first alias in the array must match the object's name property.
 *
 * @example
 * ```typescript
 * aliasesSchema.parse(["APT28", "Fancy Bear", "Sofacy"]); // Valid
 * aliasesSchema.parse([]); // throws error - at least one alias required
 * ```
 */
export const aliasesSchema = z
  .array(nonEmptyRequiredString, { error: 'Aliases must be an array of strings.' })
  .meta({
    description:
      "Alternative names used to identify this object. The first alias must match the object's name.",
  });

/**
 * Type representing a list of object aliases.
 */
export type Aliases = z.infer<typeof aliasesSchema>;

/**
 * Schema for validating MITRE object versions (`x_mitre_version`).
 *
 * Validates version strings in 'major.minor' format where both components are integers
 * between 0 and 99. This follows semantic versioning principles but excludes the patch number.
 * The version is incremented by ATT&CK when object content is updated.
 *
 * Note: This property does not apply to relationship objects.
 *
 * @example
 * ```typescript
 * xMitreVersionSchema.parse("1.0"); // "1.0"
 * xMitreVersionSchema.parse("12.5"); // "12.5"
 * xMitreVersionSchema.parse("1.0.0"); // throws error - no patch version allowed
 * xMitreVersionSchema.parse("100.0"); // throws error - major > 99
 * ```
 */
export const xMitreVersionSchema = nonEmptyRequiredString
  .regex(/^(\d{1,2})\.(\d{1,2})$/, "Version must be in format 'M.N' where M and N are 0-99")
  .meta({
    description:
      "Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
  });

/**
 * Type representing a validated MITRE version string.
 */
export type XMitreVersion = z.infer<typeof xMitreVersionSchema>;

/**
 * Regular expression for validating semantic version strings (MAJOR.MINOR.PATCH).
 */
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/**
 * Schema for validating ATT&CK spec versions (`x_mitre_attack_spec_version`).
 *
 * Validates semantic version strings in 'MAJOR.MINOR.PATCH' format. This field helps
 * consuming software determine if the data format is supported. If not present on an
 * object, the spec version is assumed to be 2.0.0.
 *
 * Refer to the ATT&CK CHANGELOG for all supported versions.
 *
 * @example
 * ```typescript
 * xMitreAttackSpecVersionSchema.parse("3.0.0"); // "3.0.0"
 * xMitreAttackSpecVersionSchema.parse("2.1.0"); // "2.1.0"
 * xMitreAttackSpecVersionSchema.parse("1.0"); // throws error - must include patch version
 * ```
 */
export const xMitreAttackSpecVersionSchema = nonEmptyRequiredString
  .regex(semverRegex, 'Must be valid semantic version (MAJOR.MINOR.PATCH)')
  .meta({
    description:
      'The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.',
  });

/**
 * Type representing a validated ATT&CK spec version string.
 */
export type XMitreAttackSpecVersion = z.infer<typeof xMitreAttackSpecVersionSchema>;

/**
 * Type representing old mobile ATT&CK IDs.
 *
 * These IDs follow the format MOB-X#### where X is either 'M' (mitigation) or 'S' (software).
 *
 * @example "MOB-M1008", "MOB-S0012"
 */
type MitreOldAttackId = `MOB-${'M' | 'S'}${number}`;

/**
 * Regular expression for validating old mobile ATT&CK ID format.
 */
const oldAttackIdRegex = /^MOB-(M|S)\d{4}$/;

/**
 * Creates a type-specific schema for validating old mobile ATT&CK IDs (`x_mitre_old_attack_id`).
 *
 * This factory function generates schemas that validate old mobile ATT&CK IDs based on
 * the STIX type. Software types (malware, tool) use MOB-S####, while mitigations
 * (course-of-action) use MOB-M####.
 *
 * @param stixType - The STIX type to create the schema for (malware, tool, or course-of-action)
 * @returns A Zod schema configured for the appropriate old ATT&CK ID format
 *
 * @example
 * ```typescript
 * const softwareOldIdSchema = createOldMitreAttackIdSchema('malware');
 * softwareOldIdSchema.parse("MOB-S0012"); // Valid
 * softwareOldIdSchema.parse("MOB-M1008"); // Invalid - wrong prefix for software
 *
 * const mitigationOldIdSchema = createOldMitreAttackIdSchema('course-of-action');
 * mitigationOldIdSchema.parse("MOB-M1008"); // Valid
 * ```
 */
export function createOldMitreAttackIdSchema(
  stixType: Extract<StixType, 'malware' | 'tool' | 'course-of-action'>,
) {
  const baseSchema = nonEmptyRequiredString.meta({
    description: 'Old ATT&CK IDs that may have been associated with this object',
  });

  switch (stixType) {
    case 'malware':
    case 'tool':
      // Software types use MOB-S####
      return baseSchema.refine(
        (value): value is MitreOldAttackId => {
          return /^MOB-S\d{4}$/.test(value);
        },
        {
          message: `x_mitre_old_attack_id for ${stixType} need to be in the format MOB-S####`,
        },
      );
    case 'course-of-action':
      // Mitigations use MOB-M####
      return baseSchema.refine(
        (value): value is MitreOldAttackId => {
          return /^MOB-M\d{4}$/.test(value);
        },
        {
          message: `x_mitre_old_attack_id for ${stixType} need to be in the format MOB-M####`,
        },
      );
    default:
      // This should never be reached due to the type constraint, but TypeScript wants it
      throw new Error(`Unsupported STIX type: ${stixType}`);
  }
}

/**
 * Generic schema for validating old mobile ATT&CK IDs (`x_mitre_old_attack_id`).
 *
 * Validates IDs in the format MOB-X#### where X is either 'M' or 'S', followed by
 * exactly four digits. For type-specific validation, use `createOldMitreAttackIdSchema()`.
 *
 * @example
 * ```typescript
 * xMitreOldAttackIdSchema.parse("MOB-M1008"); // Valid
 * xMitreOldAttackIdSchema.parse("MOB-S0012"); // Valid
 * xMitreOldAttackIdSchema.parse("MOB-T1234"); // Invalid - wrong prefix
 * ```
 */
export const xMitreOldAttackIdSchema = nonEmptyRequiredString
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

/**
 * Type representing a validated old mobile ATT&CK ID.
 */
export type XMitreOldAttackId = z.infer<typeof xMitreOldAttackIdSchema>;

/**
 * Schema for validating individual ATT&CK domain values.
 *
 * ATT&CK domains represent different technology environments covered by the framework.
 *
 * @example
 * ```typescript
 * attackDomainSchema.parse('enterprise-attack'); // Valid
 * attackDomainSchema.parse('mobile-attack'); // Valid
 * attackDomainSchema.parse('cloud-attack'); // Invalid - not a valid domain
 * ```
 */
export const attackDomainSchema = z.enum(['enterprise-attack', 'mobile-attack', 'ics-attack']);

/**
 * Type representing a single ATT&CK domain.
 */
export type AttackDomain = z.infer<typeof attackDomainSchema>;

/**
 * Schema for validating ATT&CK domains (`x_mitre_domains`).
 *
 * An array of technology domains to which the ATT&CK object belongs. At least one
 * domain must be specified.
 *
 * @example
 * ```typescript
 * xMitreDomainsSchema.parse(['enterprise-attack']); // Valid
 * xMitreDomainsSchema.parse(['enterprise-attack', 'mobile-attack']); // Valid
 * xMitreDomainsSchema.parse([]); // Invalid - at least one domain required
 * ```
 */
export const xMitreDomainsSchema = z
  .array(attackDomainSchema)
  .min(1, {
    message: 'At least one MITRE ATT&CK domain must be specified.',
  })
  .meta({ description: 'The technology domains to which the ATT&CK object belongs.' });

/**
 * Type representing a list of ATT&CK domains.
 */
export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;

/**
 * Schema for validating object deprecation status (`x_mitre_deprecated`).
 *
 * A boolean flag indicating whether an ATT&CK object has been deprecated and should
 * no longer be used in new analyses or implementations.
 *
 * @example
 * ```typescript
 * xMitreDeprecatedSchema.parse(true); // Valid
 * xMitreDeprecatedSchema.parse(false); // Valid
 * xMitreDeprecatedSchema.parse("true"); // Invalid - must be boolean
 * ```
 */
export const xMitreDeprecatedSchema = z
  .boolean({
    error: 'x_mitre_deprecated must be a boolean.',
  })
  .meta({ description: 'Indicates whether the object has been deprecated.' });

/**
 * Type representing an object's deprecation status.
 */
export type XMitreDeprecated = z.infer<typeof xMitreDeprecatedSchema>;

/**
 * List of all supported ATT&CK platforms.
 *
 * These platforms represent the different technology environments and operating systems
 * that ATT&CK techniques and other objects can apply to.
 */
const supportedMitrePlatforms = [
  'Field Controller/RTU/PLC/IED',
  'Network Devices',
  'Data Historian',
  'Google Workspace',
  'Office Suite',
  'ESXi',
  'Identity Provider',
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

/**
 * Schema for validating a single platform value.
 *
 * Validates that a platform string is one of the supported ATT&CK platforms.
 *
 * @example
 * ```typescript
 * xMitrePlatformSchema.parse('Windows'); // Valid
 * xMitrePlatformSchema.parse('Linux'); // Valid
 * xMitrePlatformSchema.parse('FreeBSD'); // Invalid - not a supported platform
 * ```
 */
export const xMitrePlatformSchema = z.enum(supportedMitrePlatforms, {
  error: () => `Platform must be one of: ${supportedMitrePlatforms.join(', ')}`,
});

/**
 * Type representing a single validated platform.
 */
export type XMitrePlatform = z.infer<typeof xMitrePlatformSchema>;

/**
 * Schema for validating platform lists (`x_mitre_platforms`).
 *
 * An array of platforms that apply to the ATT&CK object. Must contain at least one
 * platform, and all platforms must be unique (no duplicates).
 *
 * @example
 * ```typescript
 * xMitrePlatformsSchema.parse(['Windows', 'Linux']); // Valid
 * xMitrePlatformsSchema.parse(['Windows']); // Valid
 * xMitrePlatformsSchema.parse([]); // Invalid - at least one required
 * xMitrePlatformsSchema.parse(['Windows', 'Windows']); // Invalid - duplicates not allowed
 * ```
 */
export const xMitrePlatformsSchema = z
  .array(xMitrePlatformSchema, {
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_platforms must be an array of strings'
        : 'Invalid platforms array',
  })
  .min(1, 'At least one platform is required')
  .refine((items) => new Set(items).size === items.length, {
    message: 'Platforms must be unique (no duplicates allowed).',
  })
  .meta({ description: 'List of platforms that apply to the object.' });

/**
 * Type representing a list of validated platforms.
 */
export type XMitrePlatforms = z.infer<typeof xMitrePlatformsSchema>;

/**
 * Schema for validating object marking references (`object_marking_refs`).
 *
 * An array of STIX identifiers that reference marking-definition objects. These markings
 * provide data classification and handling instructions for the object.
 *
 * @example
 * ```typescript
 * objectMarkingRefsSchema.parse([
 *   'marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9'
 * ]); // Valid
 * objectMarkingRefsSchema.parse(['identity--12345']); // Invalid - must be marking-definition
 * ```
 */
export const objectMarkingRefsSchema = z
  .array(
    stixIdentifierSchema.startsWith(
      'marking-definition--',
      'Identifier must start with "marking-definition--"',
    ),
  )
  .min(1)
  .meta({
    description: 'The list of marking-definition objects to be applied to this object.',
  });

/**
 * Schema for validating contributors (`x_mitre_contributors`).
 *
 * An array of names representing people and organizations who have contributed to the
 * ATT&CK object. This property is not found on relationship objects.
 *
 * @example
 * ```typescript
 * xMitreContributorsSchema.parse(['John Doe', 'Acme Security']); // Valid
 * xMitreContributorsSchema.parse([]); // Invalid - at least one contributor required when present
 * ```
 */
export const xMitreContributorsSchema = z
  .array(nonEmptyRequiredString)
  .meta({
    description:
      'People and organizations who have contributed to the object. Not found on objects of type `relationship`.',
  })
  .min(1);

/**
 * Type representing a list of contributors.
 */
export type XMitreContributors = z.infer<typeof xMitreContributorsSchema>;

/**
 * The official STIX identifier for the MITRE Corporation identity object.
 *
 * This constant represents MITRE's identity in the STIX ecosystem and is used to
 * attribute objects to the MITRE organization.
 */
export const xMitreIdentity: StixIdentifier =
  'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5' as const;

/**
 * Schema for validating the MITRE identity identifier.
 *
 * Ensures that the value exactly matches MITRE's official STIX identity.
 */
export const xMitreIdentitySchema = z.literal(xMitreIdentity);

/**
 * Schema for validating modified-by references (`x_mitre_modified_by_ref`).
 *
 * The STIX ID of the MITRE identity object, used to track the identity of the MITRE
 * organization which created the current version of the object. Previous versions may
 * have been created by other individuals or organizations.
 *
 * @example
 * ```typescript
 * xMitreModifiedByRefSchema.parse('identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5'); // Valid
 * xMitreModifiedByRefSchema.parse('identity--other'); // Invalid - must be MITRE identity
 * ```
 */
export const xMitreModifiedByRefSchema = xMitreIdentitySchema.meta({
  description:
    'The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.',
});

/**
 * Type representing a validated MITRE modified-by reference.
 */
export type XMitreModifiedByRef = z.infer<typeof xMitreModifiedByRefSchema>;

/**
 * Schema for validating kill chain names.
 *
 * Kill chain names identify which ATT&CK framework variant the phase belongs to.
 *
 * @example
 * ```typescript
 * killChainNameSchema.parse('mitre-attack'); // Valid - Enterprise ATT&CK
 * killChainNameSchema.parse('mitre-mobile-attack'); // Valid - Mobile ATT&CK
 * killChainNameSchema.parse('lockheed-martin'); // Invalid - not an ATT&CK kill chain
 * ```
 */
export const killChainNameSchema = z.enum([
  'mitre-attack',
  'mitre-mobile-attack',
  'mitre-ics-attack',
]);

/**
 * Schema for validating kill chain phase objects.
 *
 * Represents a specific phase within an ATT&CK kill chain (e.g., "initial-access",
 * "execution"). Phase names should be all lowercase and use hyphens as word separators.
 *
 * @example
 * ```typescript
 * killChainPhaseSchema.parse({
 *   kill_chain_name: 'mitre-attack',
 *   phase_name: 'initial-access'
 * }); // Valid
 *
 * killChainPhaseSchema.parse({
 *   kill_chain_name: 'mitre-attack',
 *   phase_name: 'Initial Access'
 * }); // Invalid - should be lowercase with hyphens
 * ```
 */
export const killChainPhaseSchema = z
  .object({
    phase_name: nonEmptyRequiredString
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

/**
 * Type representing a kill chain name.
 */
export type KillChainName = z.infer<typeof killChainNameSchema>;

/**
 * Type representing a kill chain phase object.
 */
export type KillChainPhase = z.infer<typeof killChainPhaseSchema>;

/**
 * Schema for validating a single external reference object.
 *
 * External references link STIX objects to external information sources such as
 * reports, websites, or databases. For ATT&CK objects, the first external reference
 * typically contains the ATT&CK ID.
 *
 * @example
 * ```typescript
 * externalReferenceSchema.parse({
 *   source_name: 'mitre-attack',
 *   external_id: 'T1059',
 *   url: 'https://attack.mitre.org/techniques/T1059'
 * }); // Valid
 *
 * externalReferenceSchema.parse({
 *   source_name: 'ACME Research',
 *   description: 'Analysis of APT activity',
 *   url: 'https://example.com/report'
 * }); // Valid - external_id is optional
 * ```
 */
export const externalReferenceSchema = z.object({
  source_name: nonEmptyRequiredString,
  description: nonEmptyRequiredString.optional(),
  url: z
    .url({
      error: (issue) =>
        issue.input === null
          ? 'URL cannot be null'
          : 'Invalid URL format. Please provide a valid URL',
    })
    .optional(),

  external_id: nonEmptyRequiredString.optional(),
});

/**
 * Type representing a single external reference.
 */
export type ExternalReference = z.infer<typeof externalReferenceSchema>;

/**
 * Schema for validating a list of external references.
 *
 * An array of external reference objects that link to non-STIX information sources.
 * When present, at least one external reference must be provided.
 *
 * @example
 * ```typescript
 * externalReferencesSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'T1059' },
 *   { source_name: 'Research Paper', url: 'https://example.com/paper.pdf' }
 * ]); // Valid
 *
 * externalReferencesSchema.parse([]); // Invalid - at least one required
 * ```
 */
export const externalReferencesSchema = z
  .array(externalReferenceSchema)
  .min(1, "At least one external reference is required when 'external_references' is defined")
  .meta({
    description: 'A list of external references which refers to non-STIX information',
  });

/**
 * Type representing a list of external references.
 */
export type ExternalReferences = z.infer<typeof externalReferencesSchema>;

/**
 * Creates a specialized schema for validating ATT&CK external references.
 *
 * This factory function generates schemas that validate external reference arrays for
 * ATT&CK objects. The schema ensures that:
 * 1. At least one external reference is present
 * 2. The first external reference contains an `external_id` field
 * 3. The `external_id` matches the appropriate ATT&CK ID format for the STIX type
 *
 * @param stixType - The STIX type to create the schema for
 * @returns A Zod schema configured to validate ATT&CK external references for the given type
 *
 * @example
 * ```typescript
 * const techniqueRefsSchema = createAttackExternalReferencesSchema('attack-pattern');
 * techniqueRefsSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'T1059' }
 * ]); // Valid
 *
 * const tacticRefsSchema = createAttackExternalReferencesSchema('x-mitre-tactic');
 * tacticRefsSchema.parse([
 *   { source_name: 'mitre-attack', external_id: 'TA0001' }
 * ]); // Valid
 * ```
 */
export const createAttackExternalReferencesSchema = (stixType: StixTypesWithAttackIds) => {
  return (
    z
      .array(externalReferenceSchema)
      .min(1, 'At least one external reference is required')

      // First check: Verify external_id exists
      .refine((refs) => !!refs[0]?.external_id, {
        message: 'ATT&CK ID must be defined in the first external_references entry.',
        path: [0, 'external_id'],
      })

      // Second check: Verify format is correct (only runs if first check passes)
      .refine(
        (refs) => {
          // Skip validation if external_id doesn't exist (caught by first refine)
          if (!refs[0]?.external_id) return true;

          // Get expected format and validate
          const attackIdType = stixTypeToAttackIdMapping[stixType];
          if (attackIdType === 'technique') {
            // Fallback to subtechnique if technique fails
            return (
              attackIdPatterns['technique'].test(refs[0].external_id) ||
              attackIdPatterns['subtechnique'].test(refs[0].external_id)
            );
          }
          return attackIdPatterns[attackIdType].test(refs[0].external_id);
        },
        {
          message: `The first external_reference must match the ATT&CK ID format ${getAttackIdExample(stixType)}.`,
          path: [0, 'external_id'],
        },
      )
      .meta({
        description: 'A list of external references with the first containing a valid ATT&CK ID',
      })
  );
};

/**
 * Schema for validating created-by references (`created_by_ref`).
 *
 * A STIX identifier referencing an identity object that describes the entity that
 * created this object. If omitted, the source of the information is undefined.
 * Object creators may omit this to remain anonymous.
 *
 * @example
 * ```typescript
 * stixCreatedByRefSchema.parse('identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5'); // Valid
 * stixCreatedByRefSchema.parse('malware--12345'); // Invalid - must be identity type
 * ```
 */
export const stixCreatedByRefSchema = createStixIdValidator('identity').meta({
  description:
    'The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.',
});

/**
 * Type representing a validated created-by reference.
 */
export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;

/**
 * Schema for validating granular marking objects.
 *
 * Granular markings allow applying different data markings to specific portions of
 * an object, providing fine-grained control over data classification and handling.
 *
 * @example
 * ```typescript
 * granularMarkingSchema.parse({
 *   marking_ref: 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da',
 *   selectors: ['description', 'x_mitre_detection']
 * }); // Valid
 * ```
 */
export const granularMarkingSchema = z.object({
  marking_ref: stixIdentifierSchema,
  selectors: stixListOf,
});

/**
 * Type representing a granular marking object.
 */
export type GranularMarking = z.infer<typeof granularMarkingSchema>;
