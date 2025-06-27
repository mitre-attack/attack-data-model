import { z } from 'zod/v4';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  createStixIdValidator,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Mitigation (Course of Action) Schema
//
/////////////////////////////////////

export const mitigationSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('course-of-action'),

    type: createStixTypeValidator('course-of-action'),

    description: z.string().meta({
      description: 'A description that provides more details and context about the Mitigation.',
    }),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
    external_references: true, // Optional in STIX but required in ATT&CK
  })
  .strict()
  .check((ctx) => {
    //==============================================================================
    // Validate x_mitre_old_attack_id
    //==============================================================================
    const idRegex = /^MOB-M\d{4}$/;
    const oldAttackId = ctx.value.x_mitre_old_attack_id;
    if (typeof oldAttackId === 'string' && !idRegex.test(oldAttackId)) {
      ctx.issues.push({
        code: 'custom',
        message: `x_mitre_old_attack_id for mitigation need to be in the format MOB-M####}.`,
        path: ['x_mitre_old_attack_id'],
        input: oldAttackId,
      });
    }
  });

// Define the type for SchemaName
export type Mitigation = z.infer<typeof mitigationSchema>;
