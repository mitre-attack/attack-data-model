import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { stixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema, externalReferencesSchema, objectMarkingRefsSchema, stixCreatedByRefSchema, stixIdentifierSchema, xMitreDomainsSchema, xMitreModifiedByRefSchema } from "../common";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors';


export const mitigationSchema = attackBaseObjectSchema
  .extend({

    id: createStixIdentifierSchema(stixTypeSchema.enum["course-of-action"]),

    type: z.literal(stixTypeSchema.enum["course-of-action"]),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    description: z
      .string()
      .describe("A description that provides more details and context about the Mitigation."),

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema
      .describe("A list of external references which refers to non-STIX information."),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema
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
        path: ['x_mitre_old_attack_id']
      });
    }
  });

// Define the type for SchemaName
export type Mitigation = z.infer<typeof mitigationSchema>;
