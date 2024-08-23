import { z } from 'zod';
import { stixDomainObjectSchema } from './sdo';

// TODO: Merge this with core-stix-sdo.schema.ts? -> core-stix.schema.ts

export const stixRelationshipObjectSchema = stixDomainObjectSchema.extend({});

export type SRO = z.infer<typeof stixRelationshipObjectSchema>;