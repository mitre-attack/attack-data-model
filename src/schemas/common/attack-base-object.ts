import { z } from 'zod';
import { stixDomainObjectSchema } from './sdo';
import { nameSchema, xMitreAttackSpecVersionSchema, xMitreOldAttackIdSchema, xMitreVersionSchema } from '.';

// Define the new properties
export const attackBaseObjectSchema = stixDomainObjectSchema.extend({
    name: nameSchema,

    x_mitre_attack_spec_version: xMitreAttackSpecVersionSchema,

    x_mitre_version: xMitreVersionSchema,

    x_mitre_old_attack_id: xMitreOldAttackIdSchema
        .optional(),
});

// Define the type for the ATT&CK Core SDO
export type AttackBaseObject = z.infer<typeof attackBaseObjectSchema>;