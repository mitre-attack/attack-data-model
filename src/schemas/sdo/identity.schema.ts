import { z } from 'zod/v4';
import { createStixTypeValidator } from '@/schemas/common/stix-type.js';
import { createStixIdValidator } from '@/schemas/common/stix-identifier.js';
import { objectMarkingRefsSchema } from '@/schemas/common/common-properties.js';
import { attackBaseDomainObjectSchema } from '@/schemas/common/attack-base-object.js';
import { IdentityClassOV, IndustrySectorOV } from '@/schemas/common/open-vocabulary.js';

/////////////////////////////////////
//
// Identity Schema
//
/////////////////////////////////////

export const extensibleIdentitySchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('identity'),

    type: createStixTypeValidator('identity'),

    object_marking_refs: objectMarkingRefsSchema,

    identity_class: IdentityClassOV.meta({
      description:
        'The type of entity that this Identity describes, e.g., an individual or organization. This is an open vocabulary and the values SHOULD come from the identity-class-ov vocabulary',
    }),

    description: z
      .string()
      .meta({
        description: 'A description of the object',
      })
      .optional(),

    // Not used in ATT&CK Identity but defined in STIX
    roles: z
      .array(z.string(), {
        error: (issue) =>
          issue.code === 'invalid_type'
            ? 'Roles must be an array of strings'
            : 'Invalid roles array',
      })
      .meta({
        description: 'The list of roles that this Identity performs',
      })
      .optional(),

    // Not used in ATT&CK Identity but defined in STIX
    sectors: z
      .array(IndustrySectorOV)
      .meta({
        description:
          'The list of industry sectors that this Identity belongs to. This is an open vocabulary and values SHOULD come from the industry-sector-ov vocabulary',
      })
      .optional(),

    // Not used in ATT&CK Identity but defined in STIX
    contact_information: z
      .string()
      .meta({
        description: 'The contact information (e-mail, phone number, etc.) for this Identity',
      })
      .optional(),
  })
  .omit({
    x_mitre_version: true,
  })
  .strict();

// Alias because identities currently don't have any refinements
export const identitySchema = extensibleIdentitySchema;

// Define the type for Identity
export type Identity = z.infer<typeof extensibleIdentitySchema>;
