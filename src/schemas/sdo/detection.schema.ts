import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixIdentifierSchema } from '../common/stix-identifier.js';
import { stixTypeSchema } from '../common/stix-type.js';

const indicator = z.object({
  pattern: z.string(), // `[process:command_line MATCHES '(?i)powershell.*-nop.*-w hidden']`
  pattern_type: z.literal('stix'),
});

export const detection = attackBaseObjectSchema.extend({
  id: createStixIdentifierSchema('x-mitre-detection'),
  type: z.literal(stixTypeSchema.enum['x-mitre-detection']),
  name: z.string(),
  indicator: indicator,
});

/**
 * the 'detection statements' leverage 'data components' to define how
 * adversary 'techniques' manifest in 'log sources' and how they
 * should be detected
 */
