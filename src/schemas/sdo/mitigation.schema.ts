import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  createStixIdValidator,
  externalReferencesSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
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

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    description: z
      .string()
      .describe('A description that provides more details and context about the Mitigation.'),

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema.describe(
      'A list of external references which refers to non-STIX information.',
    ),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,
  })
  .strict()
  .superRefine((schema, ctx) => {
    //==============================================================================
    // Validate x_mitre_old_attack_id
    //==============================================================================
    const idRegex = /^MOB-M\d{4}$/;
    const oldAttackId = schema.x_mitre_old_attack_id;
    if (typeof oldAttackId === 'string' && !idRegex.test(oldAttackId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `x_mitre_old_attack_id for mitigation need to be in the format MOB-M####}.`,
        path: ['x_mitre_old_attack_id'],
      });
    }
  });

// Define the type for SchemaName
export type Mitigation = z.infer<typeof mitigationSchema>;
