import {
  createFirstAliasRefinement,
  createFirstXMitreAliasRefinement,
} from '@/refinements/index.js';
import { z } from 'zod/v4';
import {
  createAttackExternalReferencesSchema,
  createOldMitreAttackIdSchema,
  createStixIdValidator,
  createStixTypeValidator,
  killChainPhaseSchema,
} from '../common/index.js';
import { ToolTypeOV } from '../common/open-vocabulary.js';
import { softwareSchema } from './software.schema.js';

/////////////////////////////////////
//
// Tool Schema
//
/////////////////////////////////////

export const toolSchema = softwareSchema
  .extend({
    id: createStixIdValidator('tool'),

    type: createStixTypeValidator('tool'),

    external_references: createAttackExternalReferencesSchema('tool'),

    // Not used in ATT&CK Tool but defined in STIX
    tool_types: z
      .array(ToolTypeOV)
      .optional()
      .meta({ description: 'The kind(s) of tool(s) being described.' }),

    // Not used in ATT&CK Tool but defined in STIX
    kill_chain_phases: z
      .array(killChainPhaseSchema)
      .optional()
      .meta({ description: 'The list of kill chain phases for which this Tool can be used.' }),

    // Not used in ATT&CK Tool but defined in STIX
    tool_version: z
      .string()
      .optional()
      .meta({ description: 'The version identifier associated with the Tool' }),

    x_mitre_old_attack_id: createOldMitreAttackIdSchema('tool').optional(),
  })
  .strict()
  .check((ctx) => {
    createFirstXMitreAliasRefinement()(ctx);
    createFirstAliasRefinement()(ctx);
  });

export type Tool = z.infer<typeof toolSchema>;
