import { z } from 'zod/v4';
import { malwarePartialSchema, malwareSchema } from './malware.schema.js';
import { toolPartialSchema, toolSchema } from './tool.schema.js';

//==============================================================================
//
// Software Schema
//
//==============================================================================

export const softwareSchema = z.union([malwareSchema, toolSchema, malwarePartialSchema, toolPartialSchema]).meta({
  description:
    'Software represents tools and malicious code used by adversaries to accomplish their objectives. ATT&CK models software using two STIX object types: [malware](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230945) and [tool](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230961).',
});

export type Software = z.infer<typeof softwareSchema>;
