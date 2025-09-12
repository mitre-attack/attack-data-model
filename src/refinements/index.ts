import { attackIdExamples, attackIdPatterns } from '@/schemas/common/attack-id.js';
import {
  attackDomainSchema,
  type Aliases,
  type AttackObject,
  type ExternalReferences,
  type KillChainPhase,
  type StixBundle,
  type Technique,
  type XMitreDataSources,
  type XMitreDefenseBypasses,
  type XMitreDomains,
  type XMitreEffectivePermissions,
  type XMitreFirstSeenCitation,
  type XMitreImpactType,
  type XMitreIsSubtechnique,
  type XMitreLastSeenCitation,
  type XMitrePermissionsRequired,
  type XMitreRemoteSupport,
  type XMitreSystemRequirements,
  type XMitreTacticType,
} from '@/schemas/index.js';
import { z } from 'zod/v4';

/**
 * Creates a refinement for validating that the first alias matches the object's name
 *
 * @returns A refinement callback function for alias validation
 *
 * @remarks
 * This function is used to validate that when aliases are present, the first
 * alias must match the object's name.
 *
 * @example
 * ```typescript
 * const validateFirstAlias = createFirstAliasRefinement();
 * const schema = baseSchema.superRefine(validateFirstAlias);
 * ```
 */
export function createFirstAliasRefinement() {
  return (ctx: z.core.ParsePayload<{ aliases?: Aliases; name: string }>): void => {
    if (ctx.value.aliases && ctx.value.aliases.length > 0) {
      if (ctx.value.aliases[0] !== ctx.value.name) {
        ctx.issues.push({
          code: 'custom',
          message: "The first alias must match the object's name.",
          path: ['aliases'],
          input: ctx.value.aliases,
        });
      }
    }
  };
}

/**
 * Creates a refinement function for validating that the first x_mitre_alias matches the object's name
 *
 * @returns A refinement function for x_mitre_alias validation
 *
 * @remarks
 * This function validates that when x_mitre_aliases are present, the first
 * alias must match the object's name.
 *
 * @example
 * ```typescript
 * const validateFirstXMitreAlias = createFirstXMitreAliasRefinement();
 * const schema = extensibleSchema.superRefine(validateFirstXMitreAlias);
 * ```
 */
export function createFirstXMitreAliasRefinement() {
  return (ctx: z.core.ParsePayload<{ x_mitre_aliases?: string[]; name: string }>): void => {
    if (ctx.value.x_mitre_aliases && ctx.value.x_mitre_aliases.length > 0) {
      if (ctx.value.x_mitre_aliases[0] !== ctx.value.name) {
        ctx.issues.push({
          code: 'custom',
          message: "The first alias must match the object's name.",
          path: ['x_mitre_aliases'],
          input: ctx.value.x_mitre_aliases,
        });
      }
    }
  };
}

/**
 * Creates a refinement for validating citation formats and references
 *
 * @returns A refinement callback function for citation validation
 *
 * @remarks
 * This function validates that citation strings follow the correct format
 * and that all cited sources exist in the external_references.
 *
 * @example
 * ```typescript
 * const validateCitations = createCitationsRefinement();
 * const schema = baseSchema.superRefine(validateCitations);
 * ```
 */
export function createCitationsRefinement() {
  return (
    ctx: z.core.ParsePayload<{
      external_references: ExternalReferences;
      x_mitre_first_seen_citation?: XMitreFirstSeenCitation;
      x_mitre_last_seen_citation?: XMitreLastSeenCitation;
    }>,
  ): void => {
    const { external_references, x_mitre_first_seen_citation, x_mitre_last_seen_citation } =
      ctx.value;

    // Helper function to extract citation names from a citation string
    const extractCitationNames = (citations: string): string[] => {
      const matches = citations.match(/\(Citation: ([^)]+)\)/g);
      return matches ? matches.map((match) => match.slice(10, -1).trim()) : [];
    };

    // Helper function to validate multiple citations
    const validateCitationString = (citations: string, path: string[]) => {
      const citationNames = extractCitationNames(citations);

      citationNames.forEach((citationName, index) => {
        const citationExists = external_references.some((ref) => ref.source_name === citationName);

        if (!citationExists) {
          ctx.issues.push({
            code: 'custom',
            message: `Citation ${citationName} not found in external_references.`,
            path: [...path, index],
            input: citationName,
          });
        }
      });

      // Validate the format of the entire citation string
      if (!citations.match(/^(\(Citation: [^)]+\))+$/)) {
        ctx.issues.push({
          code: 'custom',
          message:
            "Citations must be in the format '(Citation: Name1)(Citation: Name2)...' without any separators.",
          path: path,
          input: citations,
        });
      }
    };

    // Validate x_mitre_first_seen_citation
    if (x_mitre_first_seen_citation) {
      validateCitationString(x_mitre_first_seen_citation, ['x_mitre_first_seen_citation']);
    }

    // Validate x_mitre_last_seen_citation
    if (x_mitre_last_seen_citation) {
      validateCitationString(x_mitre_last_seen_citation, ['x_mitre_last_seen_citation']);
    }
  };
}

/**
 * Creates a refinement function for validating that the first object in a STIX bundle
 * is of type 'x-mitre-collection'
 *
 * @returns A refinement function for STIX bundle validation
 *
 * @remarks
 * This function validates that the first object in the 'objects' array of a STIX bundle
 * is of type 'x-mitre-collection', which is required for ATT&CK bundles.
 *
 * @example
 * ```typescript
 * const validateFirstBundleObject = createFirstBundleObjectRefinement();
 * const schema = extensibleStixBundleSchema.superRefine(validateFirstBundleObject);
 * ```
 */
export function createFirstBundleObjectRefinement() {
  return (ctx: z.core.ParsePayload<StixBundle>): void => {
    // Verify that the first object in the bundle is the 'x-mitre-collection' object
    if ((ctx.value.objects as AttackObject[]).length > 0) {
      const firstObject = (ctx.value.objects as AttackObject[])[0];

      if (firstObject.type !== 'x-mitre-collection') {
        ctx.issues.push({
          code: 'custom',
          message: "The first object in the 'objects' array must be of type 'x-mitre-collection'",
          path: ['objects', 0, 'type'],
          input: firstObject.type,
        });
      }
    }
  };
}

/**
 * Creates a refinement function for validating ATT&CK ID in external references
 *
 * @returns A refinement function for ATT&CK ID validation
 */
export function createAttackIdInExternalReferencesRefinement() {
  return (
    ctx: z.core.ParsePayload<
      | Technique
      | {
          external_references: ExternalReferences;
          x_mitre_is_subtechnique: XMitreIsSubtechnique;
        }
    >,
  ): void => {
    // Check if external_references exists and has at least one entry
    if (
      !ctx.value.external_references ||
      !Array.isArray(ctx.value.external_references) ||
      ctx.value.external_references.length === 0
    ) {
      ctx.issues.push({
        code: 'custom',
        message: 'At least one external reference with an ATT&CK ID is required.',
        path: ['external_references'],
        input: ctx.value.external_references,
      });
      return;
    }

    // Verify that first external reference exists and has the expected structure
    const attackIdEntry = ctx.value.external_references[0];
    if (!attackIdEntry || typeof attackIdEntry !== 'object') {
      ctx.issues.push({
        code: 'custom',
        message: 'First external reference must be a valid object.',
        path: ['external_references', 0],
        input: attackIdEntry,
      });
      return;
    }

    // Check if external_id exists
    if (!attackIdEntry.external_id || typeof attackIdEntry.external_id !== 'string') {
      ctx.issues.push({
        code: 'custom',
        message: 'ATT&CK ID must be defined in the first external_references entry.',
        path: ['external_references', 0, 'external_id'],
        input: attackIdEntry.external_id,
      });
      return;
    }

    // Validate ATT&CK ID format based on whether it's a sub-technique
    const idPattern = ctx.value.x_mitre_is_subtechnique
      ? attackIdPatterns.subtechnique
      : attackIdPatterns.technique;

    // Use the exact error message format expected by the test
    const message = ctx.value.x_mitre_is_subtechnique
      ? `The first external_reference must match the ATT&CK ID format ${attackIdExamples.subtechnique}.`
      : `The first external_reference must match the ATT&CK ID format ${attackIdExamples.technique}.`;

    if (!idPattern.test(attackIdEntry.external_id)) {
      ctx.issues.push({
        code: 'custom',
        message,
        path: ['external_references', 0, 'external_id'],
        input: attackIdEntry.external_id,
      });
    }

    // Also verify source_name is 'mitre-attack'
    if (!attackIdEntry.source_name || attackIdEntry.source_name !== 'mitre-attack') {
      ctx.issues.push({
        code: 'custom',
        message: 'The first external_reference must have source_name set to "mitre-attack".',
        path: ['external_references', 0, 'source_name'],
        input: attackIdEntry.source_name,
      });
    }
  };
}

/**
 * Creates a refinement function for validating enterprise-only properties of techniques
 *
 * @returns A refinement function for enterprise-only property validation
 */
export function createEnterpriseOnlyPropertiesRefinement() {
  return (
    ctx: z.core.ParsePayload<
      | Technique
      | {
          x_mitre_domains: XMitreDomains;
          kill_chain_phases?: KillChainPhase[];
          x_mitre_permissions_required?: XMitrePermissionsRequired;
          x_mitre_effective_permissions?: XMitreEffectivePermissions;
          x_mitre_system_requirements?: XMitreSystemRequirements;
          x_mitre_defense_bypassed?: XMitreDefenseBypasses;
          x_mitre_remote_support?: XMitreRemoteSupport;
          x_mitre_impact_type?: XMitreImpactType;
          x_mitre_data_sources?: XMitreDataSources;
        }
    >,
  ): void => {
    // Helper variables for domain checks
    const inEnterpriseDomain = ctx.value.x_mitre_domains.includes(
      attackDomainSchema.enum['enterprise-attack'],
    );

    // Extract tactics from kill_chain_phases
    const tactics = ctx.value.kill_chain_phases?.map((tactic) => tactic.phase_name) || [];

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
      value: boolean | string[] | undefined,
      requiredTactic: string | null = null,
    ) {
      if (value !== undefined) {
        if (!inEnterpriseDomain) {
          ctx.issues.push({
            code: 'custom',
            message: `${fieldName} is only supported in the 'enterprise-attack' domain.`,
            path: [fieldName],
            input: value,
          });
        } else if (
          requiredTactic &&
          ctx.value.kill_chain_phases !== undefined &&
          !tactics.includes(requiredTactic)
        ) {
          ctx.issues.push({
            code: 'custom',
            message: `${fieldName} is only supported in the ${requiredTactic} tactic.`,
            path: [fieldName],
            input: value,
          });
        }
      }
    }

    // Validate enterprise-only fields
    validateEnterpriseOnlyField(
      'x_mitre_system_requirements',
      ctx.value.x_mitre_system_requirements,
    );
    validateEnterpriseOnlyField(
      'x_mitre_permissions_required',
      ctx.value.x_mitre_permissions_required,
      'privilege-escalation',
    );
    validateEnterpriseOnlyField(
      'x_mitre_effective_permissions',
      ctx.value.x_mitre_effective_permissions,
      'privilege-escalation',
    );
    validateEnterpriseOnlyField(
      'x_mitre_defense_bypassed',
      ctx.value.x_mitre_defense_bypassed,
      'defense-evasion',
    );
    validateEnterpriseOnlyField(
      'x_mitre_remote_support',
      ctx.value.x_mitre_remote_support,
      'execution',
    );
    validateEnterpriseOnlyField('x_mitre_impact_type', ctx.value.x_mitre_impact_type, 'impact');

    // Mobile-specific data sources check
    if (
      ctx.value.x_mitre_data_sources &&
      inEnterpriseDomain &&
      ctx.value.x_mitre_domains.includes(attackDomainSchema.enum['mobile-attack'])
    ) {
      ctx.issues.push({
        code: 'custom',
        message: "x_mitre_data_sources is not supported in the 'mobile-attack' domain.",
        path: ['x_mitre_data_sources'],
        input: ctx.value.x_mitre_data_sources,
      });
    }
  };
}

/**
 * Creates a refinement function for validating mobile-only properties of techniques
 *
 * @returns A refinement function for mobile-only property validation
 */
export function createMobileOnlyPropertiesRefinement() {
  return (
    ctx: z.core.ParsePayload<
      | Technique
      | {
          x_mitre_domains: XMitreDomains;
          x_mitre_tactic_type?: XMitreTacticType;
          x_mitre_data_sources?: XMitreDataSources;
        }
    >,
  ): void => {
    // Helper variables for domain checks
    const inMobileDomain = ctx.value.x_mitre_domains.includes(
      attackDomainSchema.enum['mobile-attack'],
    );

    // Validate Mobile-only properties
    if (ctx.value.x_mitre_tactic_type?.length && !inMobileDomain) {
      ctx.issues.push({
        code: 'custom',
        message: "x_mitre_tactic_type is only supported in the 'mobile-attack' domain.",
        path: ['x_mitre_tactic_type'],
        input: ctx.value.x_mitre_tactic_type,
      });
    }

    if (ctx.value.x_mitre_data_sources && inMobileDomain) {
      ctx.issues.push({
        code: 'custom',
        message: "x_mitre_data_sources is not supported in the 'mobile-attack' domain.",
        path: ['x_mitre_data_sources'],
        input: ctx.value.x_mitre_data_sources,
      });
    }
  };
}
