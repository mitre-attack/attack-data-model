import { z } from 'zod/v4';
import {
  createFirstAliasRefinement,
  createFirstXMitreAliasRefinement,
} from '../../refinements/index.js';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  aliasesSchema,
  createAttackExternalReferencesSchema,
  createOldMitreAttackIdSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  emptyStixListErrorMessage,
  killChainPhaseSchema,
  nonEmptyRequiredString,
  stixCreatedByRefSchema,
  ToolTypeOV,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// Tool Schema
//
//==============================================================================

export const extensibleToolSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('tool').meta({
      description: 'The unique identifier for this Tool object.',
    }),

    type: createStixTypeValidator('tool').meta({
      description: 'The STIX object type for this object, which is always "tool".',
    }),

    created_by_ref: stixCreatedByRefSchema.meta({
      description: 'The ID of the Source object that describes who created this object.',
    }),

    description: descriptionSchema,

    external_references: createAttackExternalReferencesSchema('tool'),

    // Malware: Required
    // Tool: Optional
    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_aliases: aliasesSchema.optional().meta({
      description:
        "Alternative names used to identify this software. The first alias must match the object's name.",
    }),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_domains: xMitreDomainsSchema,

    // Not used in ATT&CK Malware or Tool but defined in STIX
    aliases: aliasesSchema
      .optional()
      .meta({ description: 'Alternative names used to identify this software.' }),

    // Not used in ATT&CK Tool but defined in STIX
    tool_types: z
      .array(ToolTypeOV)
      .min(1, { error: emptyStixListErrorMessage })
      .optional()
      .meta({ description: 'The kind(s) of tool(s) being described.' }),

    // Not used in ATT&CK Tool but defined in STIX
    kill_chain_phases: z
      .array(killChainPhaseSchema)
      .min(1, { error: emptyStixListErrorMessage })
      .optional()
      .meta({ description: 'The list of kill chain phases for which this Tool can be used.' }),

    // Not used in ATT&CK Tool but defined in STIX
    tool_version: nonEmptyRequiredString
      .optional()
      .meta({ description: 'The version identifier associated with the Tool' }),

    x_mitre_old_attack_id: createOldMitreAttackIdSchema('tool').optional(),
  })
  .strict();

export const toolSchema = extensibleToolSchema.check((ctx) => {
  createFirstXMitreAliasRefinement()(ctx);
  createFirstAliasRefinement()(ctx);
});

export const toolPartialSchema = extensibleToolSchema.partial().check((ctx) => {
  createFirstXMitreAliasRefinement()(ctx);
  createFirstAliasRefinement()(ctx);
});

export type Tool = z.infer<typeof toolSchema>;
export type ToolPartial = z.infer<typeof toolPartialSchema>;
