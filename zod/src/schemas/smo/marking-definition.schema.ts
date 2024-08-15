import { z } from "zod"; } from "../common";
import { StixTypeSchema } from "../common/stix-type";
import { AttackDomains } from "../common/core-attack-sdo.schema";
import { createStixIdentifierSchema, SDOSchema, StixCreatedByRefSchema, StixSpecVersionSchema, StixTimestampSchema } from "../common";


/////////////////////////////////////
//
// TLP Marking Object
//
/////////////////////////////////////

// TLP Marking Object type
const TlpMarkingObjectSchema = z.object({
  tlp: z
    .string()
    .describe("The TLP level [TLP] of the content marked by this marking definition, as defined in this section.")
});

// Base schema for all TLP marking definitions
const BaseMarkingDefinitionSchema = z.object({
  type: z.literal('marking-definition'),
  spec_version: z.literal('2.1'),
  id: z.string().uuid(),
  created: z.string().datetime(),
  definition_type: z.literal('tlp'),
  name: z.string(),
  definition: TlpMarkingObjectSchema
});

// TLP:WHITE schema
const TlpWhiteSchema = BaseMarkingDefinitionSchema.extend({
  id: z.literal('marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9'),
  name: z.literal('TLP:WHITE'),
  definition: z.object({
    tlp: z.literal('white')
  })
});

// TLP:GREEN schema
const TlpGreenSchema = BaseMarkingDefinitionSchema.extend({
  id: z.literal('marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da'),
  name: z.literal('TLP:GREEN'),
  definition: z.object({
    tlp: z.literal('green')
  })
});

// TLP:AMBER schema
const TlpAmberSchema = BaseMarkingDefinitionSchema.extend({
  id: z.literal('marking-definition--f88d31f6-486f-44da-b317-01333bde0b82'),
  name: z.literal('TLP:AMBER'),
  definition: z.object({
    tlp: z.literal('amber')
  })
});

// TLP:RED schema
const TlpRedSchema = BaseMarkingDefinitionSchema.extend({
  id: z.literal('marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed'),
  name: z.literal('TLP:RED'),
  definition: z.object({
    tlp: z.literal('red')
  })
});

// Union type for all TLP marking definitions
const TlpMarkingDefinitionSchema = z.union([
  TlpWhiteSchema,
  TlpGreenSchema,
  TlpAmberSchema,
  TlpRedSchema
]);

export type TlpMarkingDefinition = z.infer<typeof TlpMarkingDefinitionSchema>;
export type TlpMarkingObjectType = z.infer<typeof TlpMarkingObjectSchema>;


/////////////////////////////////////
//
// Statement Marking Object
//
/////////////////////////////////////

export const StatementMarkingObjectSchema = z.object({
  statement: z
    .string()
    .describe("A Statement (e.g., copyright, terms of use) applied to the content marked by this marking definition.")
});


/////////////////////////////////////
//
// Marking Definition
//
/////////////////////////////////////

// MarkingDefinition Schema
export const MarkingDefinitionSchema = z.object({

  id: createStixIdentifierSchema(StixTypeSchema.enum["marking-definition"]),

  type: z.literal(StixTypeSchema.enum["marking-definition"]),

  spec_version: StixSpecVersionSchema
    .describe("The version of the STIX specification used to represent this object."),

  created: StixTimestampSchema
    .brand("StixCreatedTimestamp")
    .describe("The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."),

  // Optional in STIX but required in ATT&CK
  created_by_ref: StixCreatedByRefSchema
    .describe("The ID of the Source object that describes who created this object."),

  // Deprecated in STIX
  // Not used in ATT&CK Malware but defined in STIX
  definition_type: z
    .enum(
      ["statement", "tlp"],
      { message: "definition_type must be either 'statement' or 'tlp'" }
    )
    .optional()
    .describe("The definition_type property identifies the type of Marking Definition."),

  // Deprecated in STIX
  definition: z
    .union([TlpMarkingObjectSchema, StatementMarkingObjectSchema])
    .describe("The definition property contains the marking object itself (e.g., the TLP marking as defined in section 7.2.1.4, the Statement marking as defined in section 7.2.1.3). Any new marking definitions SHOULD be specified using the extension facility described in section 7.3. If the extensions property is not present, this property MUST be present."),

  x_mitre_domains: z
    .array(AttackDomains)
    .describe("The technology domains to which the ATT&CK object belongs."),

  x_mitre_attack_spec_version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Must be in the format 'major.minor.patch'")
    .describe("The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."),
});

// Define the type for MarkingDefinition
export type MarkingDefinition = z.infer<typeof MarkingDefinitionSchema>;
