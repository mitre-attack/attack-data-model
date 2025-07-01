import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/common-properties.js';
import { createAttackExternalReferencesSchema } from '../common/misc.js';

/////////////////////////////////////
//
// MITRE Detection Strategy
//
/////////////////////////////////////

export const extensibleDetectionStrategySchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-detection-strategy'),

    type: createStixTypeValidator('x-mitre-detection-strategy'),

    external_references: createAttackExternalReferencesSchema('x-mitre-detection-strategy'),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema,

    x_mitre_analytics: z.array(createStixIdValidator('x-mitre-analytic')).nonempty(),

    x_mitre_domains: xMitreDomainsSchema,
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .meta({
    description:
      'The detection logic and patterns used to identify malicious activities based on the collected data.',
  });

export const detectionStrategySchema = extensibleDetectionStrategySchema;

export type DetectionStrategy = z.infer<typeof detectionStrategySchema>;
