import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  descriptionSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/common-properties.js';
import { createAttackExternalReferencesSchema } from '../common/misc.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// MITRE Log Source Reference
//
/////////////////////////////////////

export const xMitreLogSourcePermutationName = z.string();

export const xMitreLogSourceReferenceSchema = z
  .object({
    x_mitre_log_source_ref: createStixIdValidator('x-mitre-log-source'),
    permutation_names: z.array(z.string()).nonempty().meta({
      description:
        'Must match one of the elements in the ``x_mitre_log_source_permutations`` array',
    }),
  })
  .meta({
    description: 'A reference to a log source permutation',
  });

export type LogSourceReference = z.infer<typeof xMitreLogSourceReferenceSchema>;

/////////////////////////////////////
//
// MITRE Log Source References (plural)
//
/////////////////////////////////////

export const xMitreLogSourceReferencesSchema = z
  .array(xMitreLogSourceReferenceSchema)
  .nonempty()
  .refine(
    // Reject duplicate x_mitre_log_source_ref (cannot reference the same log source twice)
    // Reject duplicate permutation name elements for each x_mitre_log_source_ref (cannot reference the same permutation name twice)
    (logSourceReferences) => {
      const seenRefs = new Set<string>();

      for (const logSourceRef of logSourceReferences) {
        if (seenRefs.has(logSourceRef.x_mitre_log_source_ref)) {
          return false;
        }
        seenRefs.add(logSourceRef.x_mitre_log_source_ref);

        const seenPermutationNames = new Set<string>();
        for (const key of logSourceRef.permutation_names) {
          if (seenPermutationNames.has(key)) {
            return false;
          }
          seenPermutationNames.add(key);
        }
      }

      return true;
    },
    {
      message:
        'Duplicate log source permutation found: each (x_mitre_log_source_ref, permutation_names) pair must be unique',
      path: ['x_mitre_log_source_references'],
    },
  )
  .meta({
    description:
      'A list of log source STIX IDs, plus the specific permutation names, e.g., sysmon:1 or auditd:SYSCALL.',
  });

export type LogSourceReferences = z.infer<typeof xMitreLogSourceReferencesSchema>;

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

export const extensibleAnalyticSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-analytic'),

    type: createStixTypeValidator('x-mitre-analytic'),

    description: descriptionSchema.nonempty(),

    x_mitre_platforms: xMitrePlatformsSchema.max(1), // 0 or 1

    external_references: createAttackExternalReferencesSchema('x-mitre-analytic'),

    x_mitre_log_source_references: xMitreLogSourceReferencesSchema,

    x_mitre_mutable_elements: xMitreMutableElementsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .strict();

export const analyticSchema = extensibleAnalyticSchema;

export type Analytic = z.infer<typeof extensibleAnalyticSchema>;
