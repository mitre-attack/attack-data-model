import { z } from 'zod/v4';
import {
  attackBaseObjectSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  xMitreModifiedByRefSchema,
  xMitreDomainsSchema,
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

export const tacticSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-tactic'),

    type: createStixTypeValidator('x-mitre-tactic'),

    description: descriptionSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_shortname: xMitreShortNameSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    external_references: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
  })
  .strict()
  .check((ctx) => {
    // Destructure relevant properties from the schema
    const { external_references } = ctx.value;

    //==============================================================================
    // Validate external references
    //==============================================================================

    // Verify that first external reference is an ATT&CK ID
    const attackIdEntry = external_references[0];
    if (!attackIdEntry.external_id) {
      ctx.issues.push({
        code: 'custom',
        message: 'ATT&CK ID must be defined in the first external_references entry.',
        path: ['external_references', 0, 'external_id'],
        input: external_references[0],
      });
    } else {
      // Check if the ATT&CK ID format is correct
      const idRegex = /TA\d{4}$/;
      if (!idRegex.test(attackIdEntry.external_id)) {
        ctx.issues.push({
          code: 'custom',
          message: `The first external_reference must match the ATT&CK ID format TA####.`,
          path: ['external_references', 0, 'external_id'],
          input: attackIdEntry.external_id,
        });
      }
    }
  });

export type Tactic = z.infer<typeof tacticSchema>;
