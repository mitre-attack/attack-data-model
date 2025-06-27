import { z } from 'zod/v4';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  aliasesSchema,
  createStixIdValidator,
  externalReferencesSchema,
  stixTimestampSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';
import { AttackMotivationOV, AttackResourceLevelOV } from '../common/open-vocabulary.js';

// Group Schema
export const groupSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('intrusion-set'),

    type: createStixTypeValidator('intrusion-set'),

    // Not used in ATT&CK Group but defined in STIX
    description: z
      .string()
      .optional()
      .meta({
        description: 'A description that provides more details and context about the Intrusion Set, potentially including its purpose and its key characteristics'
      }),

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_contributors: z.array(z.string()).optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),

    aliases: aliasesSchema
      .optional()
      .meta({
        description: "Alternative names used to identify this group. The first alias must match the object's name"
      }),

    // Not used in ATT&CK Group but defined in STIX
    first_seen: stixTimestampSchema
      .optional()
      .meta({
        description: 'The time that this Intrusion Set was first seen'
      }),

    // Not used in ATT&CK Group but defined in STIX
    last_seen: stixTimestampSchema
      .optional()
      .meta({
        description: 'The time that this Intrusion Set was last seen'
      }),

    // Not used in ATT&CK Group but defined in STIX
    goals: z
      .array(z.string())
      .optional()
      .meta({
        description: 'The high-level goals of this Intrusion Set, namely, what are they trying to do'
      }),

    // Not used in ATT&CK Group but defined in STIX
    resource_level: AttackResourceLevelOV.optional().meta({
      description: 'This property specifies the organizational level at which this Intrusion Set typically works, which in turn determines the resources available to this Intrusion Set for use in an attack'
    }),

    primary_motivation: AttackMotivationOV.optional().meta({
      description: 'The primary reason, motivation, or purpose behind this Intrusion Set'
    }),

    secondary_motivations: z
      .array(AttackMotivationOV)
      .optional()
      .meta({
        description: 'The secondary reasons, motivations, or purposes behind this Intrusion Set'
      }),
  })
  .strict()
  .refine(
    (schema) => {
      // The object's name MUST be listed as the first alias in the aliases field
      if (schema.aliases && schema.aliases.length > 0) {
        return schema.aliases[0] === schema.name;
      }
      return true;
    },
    {
      message: "The first alias must match the object's name",
      path: ['aliases'],
    },
  );

// Define the type for SchemaName
export type Group = z.infer<typeof groupSchema>;