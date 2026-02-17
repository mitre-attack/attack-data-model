import { z } from 'zod/v4';
import { createFirstAliasRefinement } from '../../refinements/index.js';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  aliasesSchema,
  AttackMotivationOV,
  AttackResourceLevelOV,
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  nonEmptyRequiredString,
  stixListOfString,
  stixTimestampSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/property-schemas/index.js';

// Group Schema
export const groupBaseSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('intrusion-set'),

    type: createStixTypeValidator('intrusion-set'),

    // Not used in ATT&CK Group but defined in STIX
    description: nonEmptyRequiredString.optional().meta({
      description:
        'A description that provides more details and context about the Intrusion Set, potentially including its purpose and its key characteristics',
    }),

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('intrusion-set'),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),

    aliases: aliasesSchema.optional().meta({
      description:
        "Alternative names used to identify this group. The first alias must match the object's name",
    }),

    // Not used in ATT&CK Group but defined in STIX
    first_seen: stixTimestampSchema.optional().meta({
      description: 'The time that this Intrusion Set was first seen',
    }),

    // Not used in ATT&CK Group but defined in STIX
    last_seen: stixTimestampSchema.optional().meta({
      description: 'The time that this Intrusion Set was last seen',
    }),

    // Not used in ATT&CK Group but defined in STIX
    goals: stixListOfString.optional().meta({
      description: 'The high-level goals of this Intrusion Set, namely, what are they trying to do',
    }),

    // Not used in ATT&CK Group but defined in STIX
    resource_level: AttackResourceLevelOV.optional().meta({
      description:
        'This property specifies the organizational level at which this Intrusion Set typically works, which in turn determines the resources available to this Intrusion Set for use in an attack',
    }),

    primary_motivation: AttackMotivationOV.optional().meta({
      description: 'The primary reason, motivation, or purpose behind this Intrusion Set',
    }),

    secondary_motivations: z.array(AttackMotivationOV).min(1).optional().meta({
      description: 'The secondary reasons, motivations, or purposes behind this Intrusion Set',
    }),
  })
  .strict()
  .meta({
    description: `
Groups represent clusters of adversary activity with shared characteristics, tools, tactics, or infrastructure.
They are defined as [intrusion-set](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230941)
objects and strictly follow the STIX 2.1 specification without additional custom fields.
    `.trim(),
  });

export type Group = z.infer<typeof groupBaseSchema>;
export type GroupPartial = Partial<Group>;

export const groupChecks = (ctx: z.core.ParsePayload<GroupPartial>): void => {
  createFirstAliasRefinement()(ctx);
};

export const groupSchema = groupBaseSchema.check(groupChecks);

export const groupPartialSchema = groupBaseSchema.partial().check(groupChecks);
