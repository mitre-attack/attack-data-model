import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  IdentityClassOV,
  IndustrySectorOV,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  nonEmptyRequiredString,
  objectMarkingRefsSchema,
  stixListOfString,
} from '../common/property-schemas/index.js';

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
