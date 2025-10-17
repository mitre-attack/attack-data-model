import { z } from 'zod/v4';
import {
  nameSchema,
  xMitreAttackSpecVersionSchema,
  xMitreDeprecatedSchema,
  xMitreOldAttackIdSchema,
  xMitreVersionSchema,
} from './property-schemas/index.js';
import { stixDomainObjectSchema } from './stix-core.js';

// Define the new properties
const attackBaseObjectSchema = stixDomainObjectSchema.extend({
  name: nameSchema,

  /**
   * Required on all ATT&CK schemas except:
   *  - Marking Definition
   */
  x_mitre_attack_spec_version: xMitreAttackSpecVersionSchema,

  /**
   * Required on all ATT&CK schemas except:
   *  - Marking Definition
   *  - Identity
   *  - Relationship
   */
  x_mitre_version: xMitreVersionSchema,

  x_mitre_old_attack_id: xMitreOldAttackIdSchema.optional(),

  x_mitre_deprecated: xMitreDeprecatedSchema.optional(),
});

export const attackBaseDomainObjectSchema = attackBaseObjectSchema.extend({});
export const attackBaseRelationshipObjectSchema = attackBaseObjectSchema.extend({});
export const attackBaseMetaObjectSchema = attackBaseObjectSchema
  .extend({})
  .omit({ modified: true });

// Define the type for the ATT&CK Core SDO and SRO
export type AttackBaseSDO = z.infer<typeof attackBaseDomainObjectSchema>;
export type AttackBaseSRO = z.infer<typeof attackBaseRelationshipObjectSchema>;
export type AttackBaseSMO = z.infer<typeof attackBaseRelationshipObjectSchema>;
