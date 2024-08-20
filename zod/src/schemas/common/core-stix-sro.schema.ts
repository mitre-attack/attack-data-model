import { z } from 'zod';
import { SDOSchema } from './core-stix-sdo.schema';

// TODO: Merge this with core-stix-sdo.schema.ts? -> core-stix.schema.ts

export const SROSchema = SDOSchema;

export type SRO = z.infer<typeof SROSchema>;