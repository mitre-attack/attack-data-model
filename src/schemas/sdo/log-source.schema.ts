import { z } from 'zod/v4';
import {
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  attackBaseDomainObjectSchema,
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
} from '../common/index.js';

/////////////////////////////////////
//
// Log Source Permutations
// (x_mitre_log_source_permutations)
//
/////////////////////////////////////

export const xMitreLogSourcePermutationsSchema = z
  .array(
    z.object({
      name: z.string().nonempty(),
      channel: z.string().nonempty(),
      data_component_name: z.string().nonempty(),
    }),
  )
  .nonempty()
  .refine(
    // Reject duplicate (name, channel) pairs
    // Allow same name with different channels
    // Allow same channel with different names
    (permutations) => {
      const seen = new Set<string>();

      for (const perm of permutations) {
        const key = `${perm.name}|${perm.channel}`;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
      }

      return true;
    },
    {
      message: 'Duplicate log source permutation found: each (name, channel) pair must be unique',
      path: ['x_mitre_log_source_permutations'],
    },
  );

export type XMitreLogSourcePermutations = z.infer<typeof xMitreLogSourcePermutationsSchema>;

/////////////////////////////////////
//
// MITRE Log Source SDO
// (x-mitre-log-source)
//
/////////////////////////////////////

export const extensibleLogSourceSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-log-source'),

    type: createStixTypeValidator('x-mitre-log-source'),

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('x-mitre-log-source'),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_log_source_permutations: xMitreLogSourcePermutationsSchema,
  })
  .required({
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
    created_by_ref: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

export const logSourceSchema = extensibleLogSourceSchema;

export type LogSource = z.infer<typeof extensibleLogSourceSchema>;
