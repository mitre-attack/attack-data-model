import { z } from 'zod/v4';
import {
  attackBaseDomainObjectSchema,
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// MITRE Shortname (x_mitre_shortname)
//
/////////////////////////////////////

const supportedMitreShortNames = [
  'credential-access',
  'execution',
  'impact',
  'persistence',
  'privilege-escalation',
  'lateral-movement',
  'defense-evasion',
  'exfiltration',
  'discovery',
  'collection',
  'resource-development',
  'reconnaissance',
  'command-and-control',
  'initial-access',
  'inhibit-response-function',
  'privilege-escalation',
  'lateral-movement',
  'discovery',
  'initial-access',
  'impact',
  'persistence',
  'execution',
  'command-and-control',
  'collection',
  'evasion',
  'impair-process-control',
  'initial-access',
  'exfiltration',
  'persistence',
  'privilege-escalation',
  'command-and-control',
  'execution',
  'impact',
  'credential-access',
  'collection',
  'lateral-movement',
  'defense-evasion',
  'network-effects',
  'discovery',
  'remote-service-effects',
] as const;

export const xMitreShortNameSchema = z.enum(supportedMitreShortNames).meta({
  description:
    'The x_mitre_shortname of the tactic is used for mapping techniques into the tactic. It corresponds to kill_chain_phases.phase_name of the techniques in the tactic.',
});

export type XMitreShortName = z.infer<typeof xMitreShortNameSchema>;

/////////////////////////////////////
//
// MITRE Tactic
//
/////////////////////////////////////

export const tacticSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-tactic'),

    type: createStixTypeValidator('x-mitre-tactic'),

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('x-mitre-tactic'),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_shortname: xMitreShortNameSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),
  })
  .meta({
    description:
      "Tactics represent the adversary's tactical goals during an attack and are defined by `x-mitre-tactic` objects. As custom STIX types, they extend the generic STIX Domain Object pattern.",
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

export type Tactic = z.infer<typeof tacticSchema>;
