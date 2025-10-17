import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  createAttackExternalReferencesSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/common-properties.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

//==============================================================================
//
// MITRE Detection Strategy
//
//==============================================================================

export const detectionStrategySchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-detection-strategy'),

    type: createStixTypeValidator('x-mitre-detection-strategy'),

    external_references: createAttackExternalReferencesSchema('x-mitre-detection-strategy'),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema,

    x_mitre_analytic_refs: z
      .array(createStixIdValidator('x-mitre-analytic'))
      .min(1, { error: 'At least one analytic ref is required' }),

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

export type DetectionStrategy = z.infer<typeof detectionStrategySchema>;
