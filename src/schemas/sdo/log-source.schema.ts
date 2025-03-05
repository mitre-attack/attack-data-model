import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import {
  descriptionSchema,
  objectMarkingRefsSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/common-properties.js';
import { stixCreatedByRefSchema } from '../common/misc.js';
import { createStixIdentifierSchema } from '../common/stix-identifier.js';
import { stixTypeSchema } from '../common/stix-type.js';
import { xMitreCollectionLayersSchema } from './data-source.schema.js';

export const logSource = attackBaseObjectSchema.extend({
  id: createStixIdentifierSchema('x-mitre-log-source'),

  type: z.literal(stixTypeSchema.enum['x-mitre-log-source']),

  created_by_ref: stixCreatedByRefSchema,

  description: descriptionSchema,

  object_marking_refs: objectMarkingRefsSchema,

  x_mitre_platforms: xMitrePlatformsSchema.optional(),

  x_mitre_domains: xMitreDomainsSchema,

  x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

  x_mitre_contributors: xMitreContributorsSchema.optional(),

  x_mitre_collection_layers: xMitreCollectionLayersSchema,
});
