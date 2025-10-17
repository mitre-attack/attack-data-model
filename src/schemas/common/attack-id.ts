import { z } from 'zod/v4';
import type { StixType } from './stix-type.js';

/**
 * Comprehensive ATT&CK ID configuration map.
 * This single source of truth defines all ATT&CK ID types, their patterns, messages, and STIX type mappings.
 *
 * To add a new ATT&CK ID type:
 * 1. Add an entry to this map with the pattern, message, example, and stixTypes
 * 2. That's it! All other functionality will automatically work.
 */
const attackIdConfig = {
  tactic: {
    pattern: /^TA\d{4}$/,
    message: 'Must match ATT&CK Tactic ID format (TA####)',
    example: 'TA####',
    stixTypes: ['x-mitre-tactic'] as const,
  },
  technique: {
    pattern: /^T\d{4}$/,
    message: 'Must match ATT&CK Technique ID format (T####)',
    example: 'T####',
    stixTypes: ['attack-pattern'] as const, // Note: attack-pattern can be technique or subtechnique
  },
  subtechnique: {
    pattern: /^T\d{4}\.\d{3}$/,
    message: 'Must match ATT&CK Sub-technique ID format (T####.###)',
    example: 'T####.###',
    stixTypes: ['attack-pattern'] as const, // Note: attack-pattern can be technique or subtechnique
  },
  group: {
    pattern: /^G\d{4}$/,
    message: 'Must match ATT&CK Group ID format (G####)',
    example: 'G####',
    stixTypes: ['intrusion-set'] as const,
  },
  software: {
    pattern: /^S\d{4}$/,
    message: 'Must match ATT&CK Software ID format (S####)',
    example: 'S####',
    stixTypes: ['malware', 'tool'] as const,
  },
  mitigation: {
    pattern: /^M\d{4}$/,
    message: 'Must match ATT&CK Mitigation ID format (M####)',
    example: 'M####',
    stixTypes: ['course-of-action'] as const,
  },
  asset: {
    pattern: /^A\d{4}$/,
    message: 'Must match ATT&CK Asset ID format (A####)',
    example: 'A####',
    stixTypes: ['x-mitre-asset'] as const,
  },
  'data-source': {
    pattern: /^DS\d{4}$/,
    message: 'Must match ATT&CK Data Source ID format (DS####)',
    example: 'DS####',
    stixTypes: ['x-mitre-data-source'] as const,
  },
  campaign: {
    pattern: /^C\d{4}$/,
    message: 'Must match ATT&CK Campaign ID format (C####)',
    example: 'C####',
    stixTypes: ['campaign'] as const,
  },
  'data-component': {
    pattern: /^DC\d{4}$/,
    message: 'Must match ATT&CK Data Component Source ID format (DC####)',
    example: 'DC####',
    stixTypes: ['x-mitre-data-component'] as const,
  },
  'detection-strategy': {
    pattern: /^DET\d{4}$/,
    message: 'Must match ATT&CK Detection Strategy Source ID format (DET####)',
    example: 'DET####',
    stixTypes: ['x-mitre-detection-strategy'] as const,
  },
  analytic: {
    pattern: /^AN\d{4}$/,
    message: 'Must match ATT&CK Analytic Source ID format (AN####)',
    example: 'AN####',
    stixTypes: ['x-mitre-analytic'] as const,
  },
} as const;

/**
 * Union type of all valid ATT&CK ID type keys.
 *
 * @example
 * ```typescript
 * const idType: AttackIdType = 'technique'; // Valid
 * const idType: AttackIdType = 'tactic'; // Valid
 * const idType: AttackIdType = 'invalid'; // Type error
 * ```
 */
export type AttackIdType = keyof typeof attackIdConfig;

/**
 * Union type of all STIX types that have associated ATT&CK IDs.
 *
 * This extracts only the STIX types that appear in the attackIdConfig mapping,
 * excluding STIX types that don't have ATT&CK IDs (e.g., marking-definition, identity, etc.).
 *
 * @example
 * ```typescript
 * const stixType: StixTypesWithAttackIds = 'attack-pattern'; // Valid
 * const stixType: StixTypesWithAttackIds = 'x-mitre-tactic'; // Valid
 * const stixType: StixTypesWithAttackIds = 'marking-definition'; // Type error - no ATT&CK ID
 * ```
 */
export type StixTypesWithAttackIds = Extract<
  StixType,
  (typeof attackIdConfig)[AttackIdType]['stixTypes'][number]
>;

/**
 * Reverse mapping from STIX type to ATT&CK ID type.
 *
 * This allows looking up which ATT&CK ID format corresponds to a given STIX type.
 * Note that 'attack-pattern' defaults to 'technique', but subtechniques are handled
 * contextually where needed.
 *
 * @example
 * ```typescript
 * stixTypeToAttackIdMapping['x-mitre-tactic']; // 'tactic'
 * stixTypeToAttackIdMapping['malware']; // 'software'
 * stixTypeToAttackIdMapping['attack-pattern']; // 'technique'
 * ```
 */
export const stixTypeToAttackIdMapping: Record<StixTypesWithAttackIds, AttackIdType> = {
  'x-mitre-tactic': 'tactic',
  'attack-pattern': 'technique', // Default to technique; subtechnique handling is done contextually
  'intrusion-set': 'group',
  malware: 'software',
  tool: 'software',
  'course-of-action': 'mitigation',
  'x-mitre-asset': 'asset',
  'x-mitre-data-source': 'data-source',
  campaign: 'campaign',
  'x-mitre-data-component': 'data-component',
  'x-mitre-detection-strategy': 'detection-strategy',
  'x-mitre-analytic': 'analytic',
};

/**
 * Map of ATT&CK ID types to their respective RegEx patterns.
 *
 * Maps `AttackIdType` instead of `StixType` because not all STIX types have ATT&CK ID patterns.
 * For example, `marking-definition`, `identity`, `relationship`, `bundle`, and `collection`
 * do not have ATT&CK ID patterns.
 *
 * @example
 * ```typescript
 * attackIdPatterns.technique; // /^T\d{4}$/
 * attackIdPatterns.tactic; // /^TA\d{4}$/
 * attackIdPatterns.subtechnique; // /^T\d{4}\.\d{3}$/
 * ```
 */
export const attackIdPatterns: Record<AttackIdType, RegExp> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.pattern]),
) as Record<AttackIdType, RegExp>;

/**
 * Map of ATT&CK ID types to their validation error messages.
 *
 * Used for providing helpful error messages when ATT&CK ID validation fails.
 *
 * @example
 * ```typescript
 * attackIdMessages.technique; // 'Must match ATT&CK Technique ID format (T####)'
 * attackIdMessages.group; // 'Must match ATT&CK Group ID format (G####)'
 * ```
 */
export const attackIdMessages: Record<AttackIdType, string> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.message]),
) as Record<AttackIdType, string>;

/**
 * Map of ATT&CK ID types to their format examples.
 *
 * Provides example formats for documentation and error messages.
 *
 * @example
 * ```typescript
 * attackIdExamples.technique; // 'T####'
 * attackIdExamples.subtechnique; // 'T####.###'
 * attackIdExamples['data-source']; // 'DS####'
 * ```
 */
export const attackIdExamples: Record<AttackIdType, string> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.example]),
) as Record<AttackIdType, string>;

/**
 * Gets the ATT&CK ID format example for a given STIX type.
 *
 * Provides special handling for 'attack-pattern' which can be either a technique
 * or a subtechnique, returning both possible formats.
 *
 * @param stixType - The STIX type to get the ATT&CK ID example for
 * @returns The format example string (e.g., 'T####' or 'T#### or T####.###')
 *
 * @example
 * ```typescript
 * getAttackIdExample('x-mitre-tactic'); // 'TA####'
 * getAttackIdExample('attack-pattern'); // 'T#### or T####.###'
 * getAttackIdExample('malware'); // 'S####'
 * ```
 */
export function getAttackIdExample(stixType: StixTypesWithAttackIds): string {
  if (stixType === 'attack-pattern') {
    return `${attackIdExamples.technique} or ${attackIdExamples.subtechnique}`;
  }

  const attackIdType = stixTypeToAttackIdMapping[stixType];
  return attackIdExamples[attackIdType];
}

/**
 * Creates a Zod schema for validating ATT&CK IDs based on STIX type.
 *
 * This factory function generates a Zod string schema that validates ATT&CK IDs
 * according to the format required for the given STIX type. Special handling is
 * provided for 'attack-pattern' which accepts both technique and subtechnique formats.
 *
 * @param stixType - The STIX type that determines which ATT&CK ID format to validate
 * @returns A Zod string schema configured for the appropriate ATT&CK ID format
 *
 * @example
 * ```typescript
 * const tacticIdSchema = createAttackIdSchema('x-mitre-tactic');
 * tacticIdSchema.parse('TA0001'); // Valid - returns 'TA0001'
 * tacticIdSchema.parse('T0001'); // Invalid - throws error
 *
 * const techniqueIdSchema = createAttackIdSchema('attack-pattern');
 * techniqueIdSchema.parse('T1234'); // Valid - technique format
 * techniqueIdSchema.parse('T1234.001'); // Valid - subtechnique format
 * techniqueIdSchema.parse('TA0001'); // Invalid - wrong format
 * ```
 */
export const createAttackIdSchema = (stixType: StixTypesWithAttackIds) => {
  const attackIdType = stixTypeToAttackIdMapping[stixType];

  // Special case for attack-pattern which could be technique or subtechnique
  if (stixType === 'attack-pattern') {
    return z
      .string()
      .refine(
        (id) => attackIdPatterns.technique.test(id) || attackIdPatterns.subtechnique.test(id),
        {
          error: `Must match either ATT&CK Technique ID format (${attackIdExamples.technique}) or Sub-technique ID format (${attackIdExamples.subtechnique})`,
        },
      );
  }

  return z.string().regex(attackIdPatterns[attackIdType], attackIdMessages[attackIdType]);
};
