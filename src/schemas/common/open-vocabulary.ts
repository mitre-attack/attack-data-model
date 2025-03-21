import { z } from 'zod';

/**
 * Naming convention for OV variables:
 * Open vocabularies MUST
 *  - use singular tense: MalwareType as opposed to MalwareType~s~
 *  - use the suffix: "OV"
 *  - Follow ProperCase
 */

export const MalwareTypeOV = z.enum([
  'adware',
  'backdoor',
  'bot',
  'bootkit',
  'ddos',
  'downloader',
  'dropper',
  'exploit-kit',
  'keylogger',
  'ransomware',
  'remote-access-trojan',
  'resource-exploitation',
  'rogue-security-software',
  'rootkit',
  'screen-capture',
  'spyware',
  'trojan',
  'virus',
  'webshell',
  'wiper',
  'worm',
  'unknown',
]);

export const ProcessorArchitectureOV = z.enum([
  'alpha',
  'arm',
  'ia-64',
  'mips',
  'powerpc',
  'sparc',
  'x86',
  'x86-64',
]);

export const ImplementationLanguageOV = z.enum([
  'applescript',
  'bash',
  'c',
  'c++',
  'c#',
  'go',
  'java',
  'javascript',
  'lua',
  'objective-c',
  'perl',
  'php',
  'powershell',
  'python',
  'ruby',
  'scala',
  'swift',
  'typescript',
  'visual-basic',
  'x86-32',
  'x86-64',
]);

export const MalwareCapabilityOV = z.enum([
  'accesses-remote-machines',
  'anti-debugging',
  'anti-disassembly',
  'anti-emulation',
  'anti-memory-forensics',
  'anti-sandbox',
  'anti-vm',
  'captures-input-peripherals',
  'captures-output-peripherals',
  'captures-system-state-data',
  'cleans-traces-of-infection',
  'commits-fraud',
  'communicates-with-c2',
  'compromises-data-integrity',
  'compromises-data-availability',
  'compromises-system-availability',
  'controls-local-machine',
  'degrades-security-software',
  'degrades-system-updates',
  'determines-c2-server',
  'emails-spam',
  'escalates-privileges',
  'evades-av',
  'exfiltrates-data',
  'fingerprints-host',
  'hides-artifacts',
  'hides-executing-code',
  'infects-files',
  'infects-remote-machines',
  'installs-other-components',
  'persists-after-system-reboot',
  'prevents-artifact-access',
  'prevents-artifact-deletion',
  'probes-network-environment',
  'self-modifies',
  'steals-authentication-credentials',
  'violates-system-operational-integrity',
]);

export const ToolTypeOV = z.enum([
  'denial-of-service',
  'exploitation',
  'information-gathering',
  'network-capture',
  'credential-exploitation',
  'remote-access',
  'vulnerability-scanning',
  'unknown',
]);

export const IdentityClassOV = z.enum([
  'individual',
  'group',
  'system',
  'organization',
  'class',
  'unspecified',
]);

/**
 * 10.2 Attack Motivation Vocabulary
 *
 * Vocabulary Name: attack-motivation-ov
 *
 * The attack motivation vocabulary is currently used in the following SDO(s):
 *   * Intrusion Set
 *   * Threat Actor
 *
 * Knowing a Threat Actor or Intrusion Set's motivation may allow an analyst or
 * defender to better understand likely targets and behaviors.
 */
export const AttackMotivationOV = z.enum([
  'accidental',
  'coercion',
  'dominance',
  'ideology',
  'notoriety',
  'organizational-gain',
  'personal-gain',
  'personal-satisfaction',
  'revenge',
  'unpredictable',
]);

/**
 * 10.3 Attack Resource Level Vocabulary
 *
 * Vocabulary Name: attack-resource-level-ov
 *
 * The attack resource level vocabulary is currently used in the following SDO(s):
 *   * Intrusion Set
 *   * Threat Actor
 *
 * Attack Resource Level is an open vocabulary that captures the general level of
 * resources that a threat actor, intrusion set, or campaign might have access to.
 * It ranges from individual, a person acting alone, to government, the resources
 * of a national government.
 *
 * This section including vocabulary items and their descriptions is based on the
 * Threat Agent Library publication from Intel Corp in September 2007 [Casey 2007].
 */
export const AttackResourceLevelOV = z.enum([
  'individual',
  'club',
  'contest',
  'team',
  'organization',
  'government',
]);

/**
 * 10.11 Industry Sector Vocabulary
 *
 * Vocabulary Name: industry-sector-ov
 *
 * The industry sector vocabulary is currently used in the following SDO(s):
 *   * Identity
 *
 * Industry sector is an open vocabulary that describes industrial and commercial sectors.
 * It is intended to be holistic; it has been derived from several other lists and is not
 * limited to "critical infrastructure" sectors.
 */
export const IndustrySectorOV = z.enum([
  'agriculture',
  'aerospace',
  'automotive',
  'chemical',
  'commercial',
  'communications',
  'construction',
  'defense',
  'education',
  'energy',
  'entertainment',
  'financial-services',
  'government',
  'government-emergency-services',
  'government-local',
  'government-national',
  'government-public-services',
  'government-regional',
  'healthcare',
  'hospitality-leisure',
  'infrastructure',
  'infrastructure-dams',
  'infrastructure-nuclear',
  'infrastructure-water',
  'insurance',
  'manufacturing',
  'mining',
  'non-profit',
  'pharmaceuticals',
  'retail',
  'technology',
  'telecommunications',
  'transportation',
  'utilities',
]);
