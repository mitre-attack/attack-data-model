import { z } from 'zod/v4';
import { createStixTypeValidator } from '../common/stix-type.js';
import { objectMarkingRefsSchema, xMitreDomainsSchema } from '../common/common-properties.js';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { IdentityClassOV, IndustrySectorOV } from '../common/open-vocabulary.js';

/////////////////////////////////////
//
// Identity Schema
//
/////////////////////////////////////

export const identitySchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('identity'),

    type: createStixTypeValidator('identity'),

    object_marking_refs: objectMarkingRefsSchema,

    identity_class: IdentityClassOV.meta({
      description:
        'The type of entity that this Identity describes, e.g., an individual or organization. This is an open vocabulary and the values SHOULD come from the identity-class-ov vocabulary',
    }),

    x_mitre_domains: xMitreDomainsSchema,

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
  .strict();

// Define the type for Identity
export type Identity = z.infer<typeof identitySchema>;
