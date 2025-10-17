import { attackBaseDomainObjectSchema } from '@/schemas/common/attack-base-object.js';
import { descriptionSchema, objectMarkingRefsSchema } from '@/schemas/common/common-properties.js';
import { nonEmptyRequiredString, stixListOfString } from '@/schemas/common/generic.js';
import { IdentityClassOV, IndustrySectorOV } from '@/schemas/common/open-vocabulary.js';
import { createStixIdValidator } from '@/schemas/common/stix-identifier.js';
import { createStixTypeValidator } from '@/schemas/common/stix-type.js';
import { z } from 'zod/v4';

//==============================================================================
//
// Identity Schema
//
//==============================================================================

export const identitySchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('identity'),

    type: createStixTypeValidator('identity'),

    object_marking_refs: objectMarkingRefsSchema,

    identity_class: IdentityClassOV.meta({
      description:
        'The type of entity that this Identity describes, e.g., an individual or organization. This is an open vocabulary and the values SHOULD come from the identity-class-ov vocabulary',
    }),

    description: descriptionSchema.optional(),

    // Not used in ATT&CK Identity but defined in STIX
    roles: stixListOfString.optional().meta({
      description: 'The list of roles that this Identity performs',
    }),

    // Not used in ATT&CK Identity but defined in STIX
    sectors: z.array(IndustrySectorOV).min(1).optional().meta({
      description:
        'The list of industry sectors that this Identity belongs to. This is an open vocabulary and values SHOULD come from the industry-sector-ov vocabulary',
    }),

    // Not used in ATT&CK Identity but defined in STIX
    contact_information: nonEmptyRequiredString.optional().meta({
      description: 'The contact information (e-mail, phone number, etc.) for this Identity',
    }),
  })
  .omit({
    x_mitre_version: true,
  })
  .strict();

export type Identity = z.infer<typeof identitySchema>;
