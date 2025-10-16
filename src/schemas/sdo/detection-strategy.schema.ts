import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/common-properties.js';
import { createAttackExternalReferencesSchema } from '../common/misc.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// MITRE Detection Strategy
//
/////////////////////////////////////

export const detectionStrategySchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-detection-strategy'),

    type: createStixTypeValidator('x-mitre-detection-strategy'),

    external_references: createAttackExternalReferencesSchema('x-mitre-detection-strategy'),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema,

    x_mitre_analytic_refs: z.array(createStixIdValidator('x-mitre-analytic')).nonempty().meta({
      description:
        'Array of STIX IDs referencing `x-mitre-analytic` objects that implement this detection strategy.',
    }),

    x_mitre_domains: xMitreDomainsSchema,
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .meta({
    description: `
Detection strategies define high-level approaches for detecting specific adversary techniques.
They serve as containers that organize multiple platform-specific analytics into cohesive detection methodologies.
Detection strategies are defined as \`x-mitre-detection-strategy\` objects extending the generic
[STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).
    `.trim(),
  });

export type DetectionStrategy = z.infer<typeof detectionStrategySchema>;
