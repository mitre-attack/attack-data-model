import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  createAttackExternalReferencesSchema,
  createOldMitreAttackIdSchema,
  createStixIdValidator,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// Mitigation (Course of Action) Schema
//
/////////////////////////////////////

export const mitigationSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('course-of-action'),

    type: createStixTypeValidator('course-of-action'),

    description: z.string().meta({
      description: 'A description that provides more details and context about the Mitigation.',
    }),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('course-of-action'),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.min(1).optional(),

    x_mitre_old_attack_id: createOldMitreAttackIdSchema('course-of-action').optional(),
  })
  .strict();

export type Mitigation = z.infer<typeof mitigationSchema>;
