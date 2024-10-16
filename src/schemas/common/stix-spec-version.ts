import { z } from 'zod';

const specVersionDescription = [
  'The version of the STIX specification used to represent this object.',
  'The value of this property MUST be 2.1 for STIX Objects defined according to this specification.',
  'If objects are found where this property is not present, the implicit value for all STIX Objects other than SCOs is 2.0.',
  'Since SCOs are now top-level objects in STIX 2.1, the default value for SCOs is 2.1.',
].join(' ');

export const stixSpecVersionSchema = z.enum(['2.0', '2.1']).describe(specVersionDescription);

export type StixSpecVersion = z.infer<typeof stixSpecVersionSchema>;
