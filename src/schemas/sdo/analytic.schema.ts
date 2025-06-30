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

export const xMitreLogSourceRef = z
  .object({
    ref: createStixIdValidator('x-mitre-log-source'),
    keys: z.array(z.string()).meta({
      description:
        'Must match one of the elements in the ``x_mitre_log_source_permutations`` array',
    }),
  })
  .meta({
    description: 'asdf', // TODO enter a description for the log source ref
  });
export type LogSourceRef = z.infer<typeof xMitreLogSourceRef>;

/////////////////////////////////////
//
// MITRE Log Sources (plural)
//
/////////////////////////////////////

export const xMitreLogSourceRefs = z.array(xMitreLogSourceRef);
export type LogSourceRefs = z.infer<typeof xMitreLogSourceRefs>;

/////////////////////////////////////
//
// MITRE Mutable Element
//
/////////////////////////////////////

export const xMitreMutableElement = z.object({
  field: z.string(),
  description: z.string(),
});
export type MutableElement = z.infer<typeof xMitreMutableElement>;

/////////////////////////////////////
//
// MITRE Mutable Elements (plural)
//
/////////////////////////////////////

export const xMitreMutableElements = z.array(xMitreMutableElement);
export type MutableElements = z.infer<typeof xMitreMutableElements>;

/////////////////////////////////////
//
// MITRE Analytic
//
/////////////////////////////////////

export const xMitreAnalytic = attackBaseDomainObjectSchema.extend({
  id: createStixIdValidator('x-mitre-analytic'),
  type: createStixTypeValidator('x-mitre-analytic'),
  // spec_version
  // created
  // modified
  // x_mitre_version
  // x_mitre_attack_spec_version
  x_mitre_platforms: xMitrePlatformsSchema,
  x_mitre_detects: z.string().meta({ description: 'Open format field for detections' }),
  x_mitre_log_sources: xMitreLogSourceRefs,
  x_mitre_mutable_elements: xMitreMutableElements,
});

export type Analytic = z.infer<typeof xMitreAnalytic>;
