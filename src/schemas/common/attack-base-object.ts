import { z } from 'zod/v4';
import { stixDomainObjectSchema } from './stix-core.js';
import {
  nameSchema,
  xMitreAttackSpecVersionSchema,
  xMitreDeprecatedSchema,
  xMitreOldAttackIdSchema,
  xMitreVersionSchema,
} from './common-properties.js';

// Define the new properties
export const attackBaseObjectSchema = stixDomainObjectSchema.extend({
  name: nameSchema,

  x_mitre_attack_spec_version: xMitreAttackSpecVersionSchema,

  x_mitre_version: xMitreVersionSchema,

  x_mitre_old_attack_id: xMitreOldAttackIdSchema.optional(),

  x_mitre_deprecated: xMitreDeprecatedSchema.optional(),
});

// Define the type for the ATT&CK Core SDO
export type AttackBaseObject = z.infer<typeof attackBaseObjectSchema>;
