import { z } from 'zod/v4';
import { nonEmptyRequiredString } from '../common/generic.js';
import {
  attackBaseMetaObjectSchema,
  createStixIdValidator,
  createStixTypeValidator,
  nameSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// TLP Marking Object
//
/////////////////////////////////////

// TLP Marking Object type
export const tlpMarkingObjectSchema = z
  .object({
    tlp: nonEmptyRequiredString.meta({
      description:
        'The TLP level [TLP] of the content marked by this marking definition, as defined in this section.',
    }),
  })
  .strict();

// Base schema for all TLP marking definitions
export const baseMarkingDefinitionSchema = z.object({
  type: z.literal('marking-definition'),
  spec_version: z.literal('2.1'),
  id: z.uuid(),
  created: z.iso.datetime(),
  definition_type: z.literal('tlp'),
  name: nameSchema,
  definition: tlpMarkingObjectSchema,
});

// The following standard marking definitions MUST be used to reference or represent TLP markings.
// Other instances of tlp-marking MUST NOT be used or created(the only instances of TLP marking
// definitions permitted are those defined here).

// TLP:WHITE schema
export const tlpWhiteSchema = baseMarkingDefinitionSchema
  .extend({
    id: z.literal('marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9'),
    name: z.literal('TLP:WHITE'),
    definition: z.object({
      tlp: z.literal('white'),
    }),
  })
  .strict();

// TLP:GREEN schema
export const tlpGreenSchema = baseMarkingDefinitionSchema
  .extend({
    id: z.literal('marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da'),
    name: z.literal('TLP:GREEN'),
    definition: z.object({
      tlp: z.literal('green'),
    }),
  })
  .strict();

// TLP:AMBER schema
export const tlpAmberSchema = baseMarkingDefinitionSchema
  .extend({
    id: z.literal('marking-definition--f88d31f6-486f-44da-b317-01333bde0b82'),
    name: z.literal('TLP:AMBER'),
    definition: z.object({
      tlp: z.literal('amber'),
    }),
  })
  .strict();

// TLP:RED schema
export const tlpRedSchema = baseMarkingDefinitionSchema
  .extend({
    id: z.literal('marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed'),
    name: z.literal('TLP:RED'),
    definition: z.object({
      tlp: z.literal('red'),
    }),
  })
  .strict();

// Union type for all TLP marking definitions
export const tlpMarkingDefinitionSchema = z.union([
  tlpWhiteSchema,
  tlpGreenSchema,
  tlpAmberSchema,
  tlpRedSchema,
]);

export type TlpMarkingDefinition = z.infer<typeof tlpMarkingDefinitionSchema>;
export type TlpMarkingObject = z.infer<typeof tlpMarkingObjectSchema>;

/////////////////////////////////////
//
// Statement Marking Object
//
/////////////////////////////////////

export const statementMarkingObjectSchema = z
  .object({
    statement: nonEmptyRequiredString.meta({
      description:
        'A Statement (e.g., copyright, terms of use) applied to the content marked by this marking definition.',
    }),
  })
  .strict();

/////////////////////////////////////
//
// Marking Definition
//
/////////////////////////////////////

// MarkingDefinition Schema
export const markingDefinitionSchema = attackBaseMetaObjectSchema
  .extend({
    id: createStixIdValidator('marking-definition'),

    type: createStixTypeValidator('marking-definition'),

    // Deprecated in STIX
    // Optional in STIX but required in ATT&CK
    definition_type: z
      .enum(['statement', 'tlp'], {
        message: "definition_type must be either 'statement' or 'tlp'",
      })
      .meta({
        description: 'The definition_type property identifies the type of Marking Definition.',
      }),

    // Deprecated in STIX
    definition: z.union([tlpMarkingObjectSchema, statementMarkingObjectSchema]).meta({
      description:
        'The definition property contains the marking object itself (e.g., the TLP marking as defined in section 7.2.1.4, the Statement marking as defined in section 7.2.1.3). Any new marking definitions SHOULD be specified using the extension facility described in section 7.3. If the extensions property is not present, this property MUST be present.',
    }),
  })
  // .partial toggles required fields to optional
  .partial({
    name: true, // Listed in STIX 2.1 spec but not used in ATT&CK
  })
  // .omit sets inherited fields as unsupported
  .omit({
    x_mitre_attack_spec_version: true,
    x_mitre_version: true,
    x_mitre_deprecated: true,
  })
  // .required toggles optional fields to required
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

// Define the type for MarkingDefinition
export type MarkingDefinition = z.infer<typeof markingDefinitionSchema>;
