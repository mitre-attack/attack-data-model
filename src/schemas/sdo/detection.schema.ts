import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// MITRE Detection
//
/////////////////////////////////////

export const detectionSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-detection'),
    type: createStixTypeValidator('x-mitre-detection'),
    name: z.string(),
  })
  .describe(
    'The detection logic and patterns used to identify malicious activities based on the collected data.',
  );

export type Detection = z.infer<typeof detectionSchema>;
