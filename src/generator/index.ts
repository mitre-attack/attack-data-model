import {
  type Analytic,
  type Asset,
  type Campaign,
  type Collection,
  type DataComponent,
  type DataSource,
  type Description,
  type DetectionStrategy,
  type Group,
  type Identity,
  type LogSource,
  type Malware,
  type MarkingDefinition,
  type Matrix,
  type Mitigation,
  type Relationship,
  type SDO,
  type SRO,
  type StixCreatedTimestamp,
  type StixModifiedTimestamp,
  type StixType,
  type Tactic,
  type Technique,
  type Tool,
} from '@/schemas/index.js';

const minimalSdo = {
  spec_version: '2.1',
  created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
  modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
  x_mitre_version: '1.0',
  created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
  object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
  x_mitre_attack_spec_version: '3.2.0',
  x_mitre_modified_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
};

const minimalAsset = {
  id: 'x-mitre-asset--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'x-mitre-asset',
  name: 'Test Asset',
  x_mitre_domains: ['ics-attack'],
  external_references: [
    {
      source_name: 'mitre-attack',
      external_id: 'A1234',
    },
  ],
};

const minimalAnalytic = {
  type: 'x-mitre-analytic',
  id: 'x-mitre-analytic--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'Suspicious PowerShell Activity',
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/analytics/AN0001',
      external_id: 'AN0001',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_platforms: ['Windows'],
  description: 'Adversary execution of PowerShell commands with suspicious parameters',
  x_mitre_log_source_references: [
    {
      x_mitre_log_source_ref: 'x-mitre-log-source--1a2b3c4d-5e6f-789a-bcde-123456789abc',
      permutation_names: ['PowerShell'],
    },
  ],
  x_mitre_mutable_elements: [
    {
      field: 'TimeWindow',
      description: 'Time window for correlation analysis',
    },
  ],
};

const minimalCampaign = {
  type: 'campaign',
  id: 'campaign--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'Operation Dream Job',
  description: 'Operation Dream Job was a cyber espionage operation...',
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/campaigns/C0022',
      external_id: 'C0022',
    },
    {
      source_name: 'ESET Lazarus Jun 2020',
      description:
        'Breitenbacher, D and Osis, K. (2020, June 17). OPERATION IN(TER)CEPTION: Targeted Attacks Against European Aerospace and Military Companies. Retrieved December 20, 2021.',
      url: 'https://www.welivesecurity.com/wp-content/uploads/2020/06/ESET_Operation_Interception.pdf',
    },
    {
      source_name: 'ClearSky Lazarus Aug 2020',
      description:
        "ClearSky Research Team. (2020, August 13). Operation 'Dream Job' Widespread North Korean Espionage Campaign. Retrieved December 20, 2021.",
      url: 'https://www.clearskysec.com/wp-content/uploads/2020/08/Dream-Job-Campaign.pdf',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_deprecated: false,
  revoked: false,
  aliases: ['Operation Dream Job', 'Operation North Star', 'Operation Interception'],
  first_seen: '2019-09-01T04:00:00.000Z',
  last_seen: '2020-08-01T04:00:00.000Z',
  x_mitre_first_seen_citation: '(Citation: ESET Lazarus Jun 2020)',
  x_mitre_last_seen_citation: '(Citation: ClearSky Lazarus Aug 2020)',
};

const minimalCollection = {
  type: 'x-mitre-collection',
  id: 'x-mitre-collection--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'Enterprise ATT&CK',
  description: 'Version 6.2 of the Enterprise ATT&CK dataset',
  x_mitre_contents: [
    {
      object_ref: 'attack-pattern--01a5a209-b94c-450b-b7f9-946497d91055',
      object_modified: '2017-05-31T21:32:29.203Z' as StixModifiedTimestamp,
    },
  ],
};

const minimalDataComponent = {
  type: 'x-mitre-data-component',
  id: 'x-mitre-data-component--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  description: 'A user requested active directory credentials, such as a ticket or token.',
  name: 'Network Connection Creation',
  x_mitre_data_source_ref: 'x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3',
  x_mitre_domains: ['enterprise-attack'],
};

const minimalDataSource = {
  type: 'x-mitre-data-source',
  id: 'x-mitre-data-source--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  description: 'Test log source description',
  name: 'Network Connection Creation',
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/datasources/DS0014', // TODO change this after website updates to use logsources
      external_id: 'DS0014',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_collection_layers: ['Host'],
};

const minimalDetectionStrategy = {
  type: 'x-mitre-detection-strategy',
  id: 'x-mitre-detection-strategy--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'PowerShell Command Line Detection',
  x_mitre_contributors: ['John Doe', 'Jane Smith'],
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/detection-strategies/DET0001',
      external_id: 'DET0001',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_analytic_refs: ['x-mitre-analytic--1a2b3c4d-5e6f-789a-bcde-123456789abc'],
};

const minimalGroup = {
  id: 'intrusion-set--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'intrusion-set',
  name: 'Test Name',
  x_mitre_domains: ['enterprise-attack'],
  external_references: [
    {
      source_name: 'mitre-attack',
      external_id: 'G1000',
      url: 'https://attack.mitre.org/groups/G1000',
    },
    {
      source_name: 'Dragos',
      url: 'https://dragos.com/resource/allanite/',
      description: 'Dragos Allanite Retrieved. 2019/10/27',
    },
  ],
};

const minimalIdentity = {
  type: 'identity',
  id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
  name: 'The MITRE Corporation',
  identity_class: 'organization',
  spec_version: '2.1',
  created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
  modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
  created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
  object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
  x_mitre_attack_spec_version: '3.2.0',
};

const minimalLogSource = {
  type: 'x-mitre-log-source',
  id: 'x-mitre-log-source--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'Windows Security Event Log',
  object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/logsources/LS0001',
      external_id: 'LS0001',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_log_source_permutations: [
    {
      name: 'Security',
      channel: 'Security',
      data_component_name: 'Security',
    },
  ],
};

const minimalMalware = {
  type: 'malware',
  id: 'malware--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'HAMMERTOSS',
  description:
    '[HAMMERTOSS](https://attack.mitre.org/software/S0037) is a backdoor that was used by [APT29](https://attack.mitre.org/groups/G0016) in 2015. (Citation: FireEye APT29) (Citation: F-Secure The Dukes)',
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/software/S0037',
      external_id: 'S0037',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
  is_family: false,
};

const minimalMarkingDefinition = {
  definition: {
    statement:
      'Copyright 2015-2024, The MITRE Corporation. MITRE ATT&CK and ATT&CK are registered trademarks of The MITRE Corporation.',
  },
  id: 'marking-definition--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'marking-definition',
  created: '2017-06-01T00:00:00.000Z' as StixCreatedTimestamp,
  created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
  definition_type: 'statement',
  spec_version: '2.1',
};

const minimalMatrix = {
  id: 'x-mitre-matrix--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'x-mitre-matrix',
  name: 'Test Matrix',
  x_mitre_domains: ['ics-attack'],
  description:
    'The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base.' as Description,
  external_references: [
    {
      source_name: 'mitre-attack',
      external_id: 'ics-attack',
      url: 'https://attack.mitre.org/matrices/ics/',
    },
  ],
  tactic_refs: ['x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a'],
};

const minimalMitigation = {
  id: 'course-of-action--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'course-of-action',
  name: 'Test Mitigation',
  description: 'Test description',
  x_mitre_domains: ['ics-attack'],
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/mitigations/M0948',
      external_id: 'M0000',
    },
  ],
};

const minimalRelationship = {
  id: 'relationship--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'relationship',
  spec_version: '2.1',
  created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
  modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
  relationship_type: 'uses',
  source_ref: 'intrusion-set--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  target_ref: 'malware--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  object_marking_refs: ['marking-definition--1a2b3c4d-5e6f-789a-bcde-123456789abc'],
  x_mitre_attack_spec_version: '2.1.0',
  x_mitre_modified_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
};

const minimalTactic = {
  type: 'x-mitre-tactic',
  id: 'x-mitre-tactic--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  name: 'Execution',
  description: 'The adversary is trying to run malicious code.',
  external_references: [
    {
      external_id: 'TA0002',
      url: 'https://attack.mitre.org/tactics/TA0002',
      source_name: 'mitre-attack',
    },
  ],
  x_mitre_shortname: 'execution',
  x_mitre_domains: ['enterprise-attack'],
};

const minimalTool = {
  id: 'tool--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'tool',
  name: 'Sliver',
  description:
    '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
  external_references: [
    {
      source_name: 'mitre-attack',
      url: 'https://attack.mitre.org/software/S0049',
      external_id: 'S0049',
    },
    {
      source_name: 'F-Secure The Dukes',
      description:
        'F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.',
      url: 'https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf',
    },
  ],
  x_mitre_domains: ['enterprise-attack'],
};

const minimalTechnique = {
  id: 'attack-pattern--1a2b3c4d-5e6f-789a-bcde-123456789abc',
  type: 'attack-pattern',
  name: 'Test Technique',
  x_mitre_domains: ['enterprise-attack'],
  x_mitre_is_subtechnique: false,
  external_references: [
    {
      source_name: 'mitre-attack',
      external_id: 'T1234',
    },
  ],
};

/**
 * Generates sample valid STIX objects for testing.
 * Static objects are used for now, but this could eventually be replaced with a fake data
 * generator like `zod-mock`, once it supports zod v4.
 *
 * @param stixType - The STIX type that should be created (e.g., 'x-mitre-detection-strategy')
 * @returns A valid object of the desired type, with dummy data.
 *
 * @example
 * const sampleDetectionStrategy = createSyntheticStixObject('x-mitre-detection-strategy');
 * result = detectionStrategySchema.safeParse(sampleDetectionStrategy); // This should always be successful
 */
export function createSyntheticStixObject(
  stixType: StixType,
): SDO | SRO | MarkingDefinition | undefined {
  switch (stixType) {
    case 'x-mitre-asset':
      return { ...minimalSdo, ...minimalAsset } as Asset;
    case 'campaign':
      return { ...minimalSdo, ...minimalCampaign } as Campaign;
    case 'x-mitre-collection':
      return { ...minimalSdo, ...minimalCollection } as Collection;
    case 'x-mitre-data-component':
      return { ...minimalSdo, ...minimalDataComponent } as DataComponent;
    case 'x-mitre-data-source':
      return { ...minimalSdo, ...minimalDataSource } as DataSource;
    case 'intrusion-set':
      return { ...minimalSdo, ...minimalGroup } as Group;
    case 'identity':
      return minimalIdentity as Identity;
    case 'malware':
      return { ...minimalSdo, ...minimalMalware } as Malware;
    case 'x-mitre-matrix':
      return { ...minimalSdo, ...minimalMatrix } as Matrix;
    case 'course-of-action':
      return { ...minimalSdo, ...minimalMitigation } as Mitigation;
    case 'x-mitre-tactic':
      return { ...minimalSdo, ...minimalTactic } as Tactic;
    case 'attack-pattern':
      return { ...minimalSdo, ...minimalTechnique } as Technique;
    case 'tool':
      return { ...minimalSdo, ...minimalTool } as Tool;
    case 'marking-definition':
      return minimalMarkingDefinition as MarkingDefinition;
    case 'relationship':
      return minimalRelationship as Relationship;
    case 'x-mitre-log-source':
      return { ...minimalSdo, ...minimalLogSource } as LogSource;
    case 'x-mitre-detection-strategy':
      return { ...minimalSdo, ...minimalDetectionStrategy } as DetectionStrategy;
    case 'x-mitre-analytic':
      return { ...minimalSdo, ...minimalAnalytic } as Analytic;
    default:
      return undefined;
  }
}
