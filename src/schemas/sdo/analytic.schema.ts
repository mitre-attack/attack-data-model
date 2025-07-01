import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import { xMitrePlatformsSchema } from '../common/common-properties.js';

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
      .meta({
        description:
          'Must match one of the elements in the ``x_mitre_log_source_permutations`` array',
      })
      .nonempty(),
  })
  .meta({
    description: 'A reference to a log source permutation', // TODO enter a description for the log source ref
  });
export type LogSourceRef = z.infer<typeof xMitreLogSourceRefSchema>;

/////////////////////////////////////
//
// MITRE Log Sources (plural)
//
/////////////////////////////////////

export const xMitreLogSourceRefsSchema = z.array(xMitreLogSourceRefSchema);
export type LogSourceRefs = z.infer<typeof xMitreLogSourceRefsSchema>;

/////////////////////////////////////
//
// MITRE Mutable Element
//
/////////////////////////////////////

export const xMitreMutableElementSchema = z.object({
  field: z.string(),
  description: z.string(),
});
export type MutableElement = z.infer<typeof xMitreMutableElementSchema>;

/////////////////////////////////////
//
// MITRE Mutable Elements (plural)
//
/////////////////////////////////////

export const xMitreMutableElementsSchema = z.array(xMitreMutableElementSchema);
export type MutableElements = z.infer<typeof xMitreMutableElementsSchema>;

/////////////////////////////////////
//
// MITRE Analytic
//
/////////////////////////////////////

export const extensibleAnalyticSchema = attackBaseDomainObjectSchema.extend({
  id: createStixIdValidator('x-mitre-analytic'),

  type: createStixTypeValidator('x-mitre-analytic'),

  x_mitre_platforms: xMitrePlatformsSchema,

  x_mitre_detects: z.string().meta({ description: 'Open format field for detections' }),

  x_mitre_log_sources: xMitreLogSourceRefsSchema,

  x_mitre_mutable_elements: xMitreMutableElementsSchema,
});

export const analyticSchema = extensibleAnalyticSchema;

export type Analytic = z.infer<typeof extensibleAnalyticSchema>;
