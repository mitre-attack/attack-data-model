import { z } from 'zod';
import type { StixType } from './stix-type.js';

// ATT&CK ID format types
type AttackTypesWithAttackIds =
  | 'tactic'
  | 'technique'
  | 'subtechnique'
  | 'group'
  | 'software'
  | 'mitigation'
  | 'asset'
  | 'data-source'
  | 'campaign';

// STIX types that support ATT&CK IDs
export type StixTypesWithAttackIds = Extract<
  StixType,
  | 'x-mitre-tactic'
  | 'attack-pattern'
  | 'intrusion-set'
  | 'malware'
  | 'tool'
  | 'course-of-action'
  | 'x-mitre-asset'
  | 'x-mitre-data-source'
  | 'campaign'
>;

// Define the mapping between STIX types and ATT&CK ID formats
export const stixTypeToAttackIdMapping: Record<StixTypesWithAttackIds, AttackTypesWithAttackIds> = {
  'x-mitre-tactic': 'tactic',
  'attack-pattern': 'technique', // Note: subtechniques are also attack-patterns, but need separate handling
  'intrusion-set': 'group',
  malware: 'software',
  tool: 'software',
  'course-of-action': 'mitigation',
  'x-mitre-asset': 'asset',
  'x-mitre-data-source': 'data-source',
  campaign: 'campaign',
};

export const attackIdPatterns: Record<AttackTypesWithAttackIds, RegExp> = {
  tactic: /^TA\d{4}$/,
  technique: /^T\d{4}$/,
  subtechnique: /^T\d{4}\.\d{3}$/,
  group: /^G\d{4}$/,
  software: /^S\d{4}$/,
  mitigation: /^M\d{4}$/,
  asset: /^A\d{4}$/,
  'data-source': /^DS\d{4}$/,
  campaign: /^C\d{4}$/,
};

const attackIdMessages: Record<AttackTypesWithAttackIds, string> = {
  tactic: 'Must match ATT&CK Tactic ID format (TA####)',
  technique: 'Must match ATT&CK Technique ID format (T####)',
  subtechnique: 'Must match ATT&CK Sub-technique ID format (T####.###)',
  group: 'Must match ATT&CK Group ID format (G####)',
  software: 'Must match ATT&CK Software ID format (S####)',
  mitigation: 'Must match ATT&CK Mitigation ID format (M####)',
  asset: 'Must match ATT&CK Asset ID format (A####)',
  'data-source': 'Must match ATT&CK Data Source ID format (DS####)',
  campaign: 'Must match ATT&CK Campaign ID format (C####)',
};

// Generic ATT&CK ID validator with configurable patterns for different object types
export const createAttackIdSchema = (stixType: StixTypesWithAttackIds) => {
  const format = stixTypeToAttackIdMapping[stixType];

  // Special case for attack-pattern which could be technique or subtechnique
  if (stixType === 'attack-pattern') {
    return z.string().refine(
      (id) => attackIdPatterns.technique.test(id) || attackIdPatterns.subtechnique.test(id),
      () => ({
        message: `Must match either ATT&CK Technique ID format (T####) or Sub-technique ID format (T####.###)`,
      }),
    );
  }

  return z.string().regex(attackIdPatterns[format], attackIdMessages[format]);
};
