import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/common-properties.js';
import { createAttackExternalReferencesSchema } from '../common/misc.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// MITRE Log Source
//
/////////////////////////////////////

export const xMitreLogSourcePermutationKey = z.string();

export const xMitreLogSourceRefSchema = z
  .object({
    ref: createStixIdValidator('x-mitre-log-source'),
    keys: z
      .array(z.string())
      .nonempty()
      .meta({
        description:
          'Must match one of the elements in the ``x_mitre_log_source_permutations`` array',
      })
      .nonempty(),
  })
  .meta({
    description: 'A reference to a log source permutation',
  });

export type LogSourceRef = z.infer<typeof xMitreLogSourceRefSchema>;

/////////////////////////////////////
//
// MITRE Log Sources (plural)
//
/////////////////////////////////////

export const xMitreLogSourceRefsSchema = z
  .array(xMitreLogSourceRefSchema)
  .nonempty()
  .refine(
    // Reject duplicate refs (cannot reference the same log source twice)
    // Reject duplicate key elements for each ref (cannot reference the same key twice)
    (logSourceRefs) => {
      const seenRefs = new Set<string>();

      for (const logSourceRef of logSourceRefs) {
        if (seenRefs.has(logSourceRef.ref)) {
          return false;
        }
        seenRefs.add(logSourceRef.ref);

        const seenKeys = new Set<string>();
        for (const key of logSourceRef.keys) {
          if (seenKeys.has(key)) {
            return false;
          }
          seenKeys.add(key);
        }
      }

      return true;
    },
    {
      message: 'Duplicate log source permutation found: each (name, channel) pair must be unique',
      path: ['x_mitre_log_source_permutations'],
    },
  )
  .meta({
    description:
      'A list of log source STIX IDs, plus the specific channel or event type, e.g., sysmon:1 or auditd:SYSCALL.',
  });

export type LogSourceRefs = z.infer<typeof xMitreLogSourceRefsSchema>;

/////////////////////////////////////
//
// MITRE Mutable Element
//
/////////////////////////////////////

export const xMitreMutableElementSchema = z.object({
  field: z.string().nonempty(),
  description: z.string().nonempty(),
});

export type MutableElement = z.infer<typeof xMitreMutableElementSchema>;

/////////////////////////////////////
//
// MITRE Mutable Elements (plural)
//
/////////////////////////////////////

export const xMitreMutableElementsSchema = z.array(xMitreMutableElementSchema).nonempty().meta({
  description:
    'Environment-specific tuning knobs like TimeWindow, UserContext, or PortRange, so defenders can adapt without changing core behavior.',
});

export type MutableElements = z.infer<typeof xMitreMutableElementsSchema>;

/////////////////////////////////////
//
// MITRE Analytic
//
/////////////////////////////////////

export const analyticSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-analytic'),

    type: createStixTypeValidator('x-mitre-analytic'),

    x_mitre_platforms: xMitrePlatformsSchema.max(1), // 0 or 1

    x_mitre_detects: z.string().nonempty().meta({
      description:
        'A tool-agnostic description of the adversary behavior chain this analytic looks for.',
    }),

    external_references: createAttackExternalReferencesSchema('x-mitre-analytic'),

    x_mitre_log_sources: xMitreLogSourceRefsSchema,

    x_mitre_mutable_elements: xMitreMutableElementsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .strict();

export type Analytic = z.infer<typeof analyticSchema>;
