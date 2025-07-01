import { z } from 'zod/v4';
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
  | 'campaign'
  | 'data-component'
  | 'log-source'
  | 'detection-strategy'
  | 'analytic';

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
  | 'x-mitre-data-component'
  | 'x-mitre-log-source'
  | 'x-mitre-detection-strategy'
  | 'x-mitre-analytic'
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
  'x-mitre-data-component': 'data-component',
  'x-mitre-log-source': 'data-source',
  'x-mitre-detection-strategy': 'detection-strategy',
  'x-mitre-analytic': 'analytic',
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
  'data-component': /^DC\d{4}$/,
  'log-source': /^LS\d{4}$/,
  'detection-strategy': /^DET\d{4}$/,
  analytic: /^AN\d{4}$/,
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
  'data-component': 'Must match ATT&CK Data Component Source ID format (DC####)',
  'log-source': 'Must match ATT&CK Data Source ID format (LS####)',
  'detection-strategy': 'Must match ATT&CK Detection Strategy Source ID format (DET####)',
  analytic: 'Must match ATT&CK Analytic Source ID format (AN####)',
};

// Generic ATT&CK ID validator with configurable patterns for different object types
export const createAttackIdSchema = (stixType: StixTypesWithAttackIds) => {
  const format = stixTypeToAttackIdMapping[stixType];

  // Special case for attack-pattern which could be technique or subtechnique
  if (stixType === 'attack-pattern') {
    return z
      .string()
      .refine(
        (id) => attackIdPatterns.technique.test(id) || attackIdPatterns.subtechnique.test(id),
        {
          error: `Must match either ATT&CK Technique ID format (T####) or Sub-technique ID format (T####.###)`,
        },
      );
  }

  return z.string().regex(attackIdPatterns[format], attackIdMessages[format]);
};
