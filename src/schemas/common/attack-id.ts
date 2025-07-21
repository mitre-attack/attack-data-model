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
  'log-source': {
    pattern: /^LS\d{4}$/,
    message: 'Must match ATT&CK Log Source ID format (DS####)',
    example: 'LS####',
    stixTypes: ['x-mitre-log-source'] as const,
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

// Derived types and exports for backward compatibility and type safety
export type AttackIdType = keyof typeof attackIdConfig;

export type StixTypesWithAttackIds = Extract<
  StixType,
  (typeof attackIdConfig)[AttackIdType]['stixTypes'][number]
>;

// Create reverse mapping from STIX type to attack ID type
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
  'x-mitre-log-source': 'log-source',
  'x-mitre-detection-strategy': 'detection-strategy',
  'x-mitre-analytic': 'analytic',
};

// Maps the ATT&CK type to its respective RegEx pattern
// e.g., { "technique": /^T[0-9]{4}(\.[0-9]{3})?$/ }
// We map ``AttackIdType`` instead of ``StixType`` because not all ``StixType`` values have ATT&CK ID patterns
// For example, ``marking-definition``, ``identity``, ``relationship``, ``bundle``, ``collection`` do not have ATT&CK ID patterns
export const attackIdPatterns: Record<AttackIdType, RegExp> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.pattern]),
) as Record<AttackIdType, RegExp>;

export const attackIdMessages: Record<AttackIdType, string> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.message]),
) as Record<AttackIdType, string>;

export const attackIdExamples: Record<AttackIdType, string> = Object.fromEntries(
  Object.entries(attackIdConfig).map(([key, config]) => [key, config.example]),
) as Record<AttackIdType, string>;

/**
 * Gets the format example for a given STIX type
 * Special handling for attack-pattern which can be either technique or subtechnique
 */
export function getAttackIdExample(stixType: StixTypesWithAttackIds): string {
  if (stixType === 'attack-pattern') {
    return `${attackIdExamples.technique} or ${attackIdExamples.subtechnique}`;
  }

  const attackIdType = stixTypeToAttackIdMapping[stixType];
  return attackIdExamples[attackIdType];
}

/**
 * Generic ATT&CK ID validator with configurable patterns for different object types
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
