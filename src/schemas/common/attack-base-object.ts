import { z } from 'zod';
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

  /**
   * Required on all ATT&CK schemas except:
   *  - Marking Definition
   */
  x_mitre_attack_spec_version: xMitreAttackSpecVersionSchema.optional(),

  /**
   * Required on all ATT&CK schemas except:
   *  - Marking Definition
   *  - Identity
   *  - Relationship
   */
  x_mitre_version: xMitreVersionSchema.optional(),

  x_mitre_old_attack_id: xMitreOldAttackIdSchema.optional(),

  x_mitre_deprecated: xMitreDeprecatedSchema,
});

// Define the type for the ATT&CK Core SDO
export type AttackBaseObject = z.infer<typeof attackBaseObjectSchema>;
