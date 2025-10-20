import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  nonEmptyRequiredString,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// MITRE Log Source
//
//==============================================================================

export const xMitreLogSourcePermutationName = nonEmptyRequiredString;

export const xMitreLogSourceReferenceSchema = z
  .object({
    x_mitre_data_component_ref: createStixIdValidator('x-mitre-data-component'),
    name: nonEmptyRequiredString.meta({
      description: 'The name of the log source that the analytic is referencing',
    }),
    channel: nonEmptyRequiredString.meta({
      description: 'The channel of the log source that the analytic is referencing',
    }),
  })
  .meta({
    description: 'A reference to a log source',
  });

export type LogSourceReference = z.infer<typeof xMitreLogSourceReferenceSchema>;

//==============================================================================
//
// MITRE Log Sources (plural)
//
//==============================================================================

export const xMitreLogSourceReferencesSchema = z
  .array(xMitreLogSourceReferenceSchema)
  .min(1)
  .refine(
    // Reject duplicate log source references, delineated by (x_mitre_data_component_ref, name, channel)
    // An analytic cannot reference the same log source twice
    (logSourceReferences) => {
      const seenRefs = new Set<string>();

      for (const logSourceRef of logSourceReferences) {
        const key = `${logSourceRef.x_mitre_data_component_ref}|${logSourceRef.name}|${logSourceRef.channel}`;
        if (seenRefs.has(key)) {
          return false;
        }
        seenRefs.add(key);
      }

      return true;
    },
    {
      message:
        'Duplicate log source reference found: each (x_mitre_data_component_ref, name, channel) tuple must be unique',
      path: ['x_mitre_log_source_references'],
    },
  )
  .meta({
    description:
      "A list of log source references, delineated by the proprietor's STIX ID and the (name, channel) that is being targeted",
  });

export type LogSourceReferences = z.infer<typeof xMitreLogSourceReferencesSchema>;

//==============================================================================
//
// MITRE Mutable Element
//
//==============================================================================

export const xMitreMutableElementSchema = z.object({
  field: nonEmptyRequiredString,
  description: nonEmptyRequiredString,
});

export type MutableElement = z.infer<typeof xMitreMutableElementSchema>;

//==============================================================================
//
// MITRE Mutable Elements (plural)
//
//==============================================================================

export const xMitreMutableElementsSchema = z.array(xMitreMutableElementSchema).min(1).meta({
  description:
    'Environment-specific tuning knobs like TimeWindow, UserContext, or PortRange, so defenders can adapt without changing core behavior.',
});

export type MutableElements = z.infer<typeof xMitreMutableElementsSchema>;

//==============================================================================
//
// MITRE Analytic
//
//==============================================================================

export const analyticSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-analytic'),

    type: createStixTypeValidator('x-mitre-analytic'),

    description: descriptionSchema,

    x_mitre_platforms: xMitrePlatformsSchema.max(1), // 0 or 1

    external_references: createAttackExternalReferencesSchema('x-mitre-analytic'),

    x_mitre_log_source_references: xMitreLogSourceReferencesSchema.optional(),

    x_mitre_mutable_elements: xMitreMutableElementsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .strict();

export type Analytic = z.infer<typeof analyticSchema>;
