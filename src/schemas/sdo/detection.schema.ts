import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixIdentifierSchema } from '../common/stix-identifier.js';
import { stixTypeSchema } from '../common/stix-type.js';

/////////////////////////////////////
//
// MITRE Detection
//
/////////////////////////////////////

export const detectionSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdentifierSchema('x-mitre-detection'),
    type: z.literal(stixTypeSchema.enum['x-mitre-detection']),
    name: z.string(),
  })
  .describe(
    'The detection logic and patterns used to identify malicious activities based on the collected data.',
  );
