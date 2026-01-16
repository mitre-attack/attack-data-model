import { z } from 'zod/v4';
import {
  attackDomainSchema,
  attackIdExamples,
  attackIdPatterns,
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
} from '../schemas/index.js';

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
 * const schema = baseSchema.superRefine(validateFirstXMitreAlias);
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
 * const schema = stixBundleSchema.superRefine(validateFirstBundleObject);
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
 * Creates a refinement function for validating that objects in an array have no duplicates
 * based on specified keys
 *
 * @param arrayPath - The path to the array property in the context value (e.g., ['objects']). Use [] for direct array validation.
 * @param keys - The keys to use for duplicate detection (e.g., ['id'] or ['source_name', 'external_id']). Use [] for primitive arrays.
 * @param errorMessage - Optional custom error message template. Use {keys} for key values, {value} for primitives, and {index} for position
 * @returns A refinement function for duplicate validation
 *
 * @remarks
 * This function validates that objects in an array are unique based on one or more key fields.
 * It creates a composite key from the specified fields and checks for duplicates.
 *
 * **Supports three validation modes:**
 * 1. Object arrays with single key: `keys = ['id']`
 * 2. Object arrays with composite keys: `keys = ['source_name', 'external_id']`
 * 3. Primitive arrays: `keys = []` (validates the values themselves)
 *
 * @example
 * ```typescript
 * // Single key validation
 * const validateUniqueIds = validateNoDuplicates(['objects'], ['id']);
 * const schema = baseSchema.check(validateUniqueIds);
 *
 * // Composite key validation
 * const validateUniqueRefs = validateNoDuplicates(
 *   ['external_references'],
 *   ['source_name', 'external_id'],
 *   'Duplicate reference found with source_name="{source_name}" and external_id="{external_id}"'
 * );
 *
 * // Primitive array validation (e.g., array of strings)
 * const validateUniqueStrings = validateNoDuplicates(
 *   [],
 *   [],
 *   'Duplicate value "{value}" found'
 * );
 * ```
 */
export function validateNoDuplicates(arrayPath: string[], keys: string[], errorMessage?: string) {
  return (ctx: z.core.ParsePayload<unknown>): void => {
    // Navigate to the array using the path
    let arr: unknown = ctx.value;
    for (const pathSegment of arrayPath) {
      if (arr && typeof arr === 'object') {
        arr = (arr as Record<string, unknown>)[pathSegment];
      } else {
        return;
      }
    }

    // If array doesn't exist or is not an array, skip validation
    if (!Array.isArray(arr)) {
      return;
    }

    const seen = new Map<string, number>();

    arr.forEach((item, index) => {
      // Create composite key from specified keys
      // If keys array is empty, treat each item as a primitive value
      const keyValues =
        keys.length === 0
          ? [String(item)]
          : keys.map((key) => {
              const value = item?.[key];
              return value !== undefined ? String(value) : '';
            });
      const compositeKey = keyValues.join('||');

      if (seen.has(compositeKey)) {
        // Build key-value pairs for error message
        const keyValuePairs = keys.reduce(
          (acc, key, i) => {
            acc[key] = keyValues[i];
            return acc;
          },
          {} as Record<string, string>,
        );

        // Generate error message
        let message = errorMessage;
        if (!message) {
          if (keys.length === 0) {
            // Primitive array (no keys)
            message = `Duplicate value "${keyValues[0]}" found at index ${index}. Previously seen at index ${seen.get(compositeKey)}.`;
          } else if (keys.length === 1) {
            message = `Duplicate object with ${keys[0]}="${keyValues[0]}" found at index ${index}. Previously seen at index ${seen.get(compositeKey)}.`;
          } else {
            const keyPairs = keys.map((key, i) => `${key}="${keyValues[i]}"`).join(', ');
            message = `Duplicate object with ${keyPairs} found at index ${index}. Previously seen at index ${seen.get(compositeKey)}.`;
          }
        } else {
          // Replace placeholders in custom message
          message = message.replace(/\{(\w+)\}/g, (match, key) => {
            if (key === 'index') return String(index);
            if (key === 'value' && keys.length === 0) return keyValues[0];
            return keyValuePairs[key] ?? match;
          });
        }

        ctx.issues.push({
          code: 'custom',
          message,
          path: keys.length === 0 ? [...arrayPath, index] : [...arrayPath, index, ...keys],
          input: keys.length === 0 ? item : keys.length === 1 ? item?.[keys[0]] : keyValuePairs,
        });
      } else {
        seen.set(compositeKey, index);
      }
    });
  };
}

/**
 * Creates a refinement function for validating that all objects in a STIX bundle have unique IDs
 *
 * @deprecated Use `validateNoDuplicates(['objects'], ['id'])` instead for more flexibility
 * @returns A refinement function for unique object ID validation
 *
 * @remarks
 * This function validates that each object in the bundle's 'objects' array has a unique 'id' property.
 * Duplicate IDs violate STIX specifications and can cause data integrity issues.
 *
 * **Note:** This function is deprecated in favor of the more generic `validateNoDuplicates` function,
 * which can validate uniqueness on any combination of keys, not just 'id'.
 *
 * @example
 * ```typescript
 * // Old way (deprecated)
 * const validateUniqueObjects = createUniqueObjectsOnlyRefinement();
 * const schema = stixBundleSchema.check(validateUniqueObjects);
 *
 * // New way (recommended)
 * const schema = stixBundleSchema.check(validateNoDuplicates(['objects'], ['id']));
 * ```
 */
export function createUniqueObjectsOnlyRefinement() {
  return (ctx: z.core.ParsePayload<StixBundle>): void => {
    const seen = new Set<string>();
    ctx.value.objects.forEach((item, index) => {
      const id = (item as AttackObject).id;
      if (seen.has(id)) {
        ctx.issues.push({
          code: 'custom',
          message: `Duplicate object with id "${id}" found. Each object in the bundle must have a unique id.`,
          path: ['objects', index, 'id'],
          input: id,
        });
      } else {
        seen.add(id);
      }
    });
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
