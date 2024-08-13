import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { AttackDomains } from "../common/core-attack-sdo.schema";
import { ObjectMarkingRefsSchema, StixCreatedByRefSchema } from "../common";

// Custom error messages
const MarkingDefinitionSchemaError = {
  InvalidFormat: {
    code: z.ZodIssueCode.custom,
    message: "Custom error message for invalid format",
  },
  InvalidType: {
    code: z.ZodIssueCode.custom,
    message: `'type' property must be equal to ${StixTypeSchema.enum["marking-definition"]}`,
  },
};

// marking-definition:
// {
//   DONE "type": "Required",
//   DONE "id": "Required",
//   DONE "spec_version": "Required",
//   DONE "x_mitre_attack_spec_version": "Required",
//   DONE "created_by_ref": "Optional",
//   DONE "created": "Required",
//   DONE "x_mitre_domains": "Required",
//   DONE"definition_type": "Required",
//   DONE "definition": "Required"
//   DONE"external_references": "Optional",
//   DONE "object_marking_refs": "Optional",
//   DONE "granular_markings": "Optional"
//   DONE "name": "Optional"
// }

// MarkingDefinition Schema
export const MarkingDefinitionSchema = z.object({
  type: z.literal(StixTypeSchema.enum["marking-definition"], {
    message: `'type' property must be equal to ${StixTypeSchema.enum["marking-definition"]}`,
  }),

  spec_version: z.string().describe("The specification version."),

  id: z.string().describe("The unique identifier for the marking definition."),

  created: z.string().describe("The time when the object was created."),

  created_by_ref: StixCreatedByRefSchema.describe(
    "The ID of the Source object that describes who created this object."
  ).optional(),

  x_mitre_domains: z
    .array(AttackDomains)
    .default([AttackDomains.Values["enterprise-attack"]])
    .describe("The technology domains to which the ATT&CK object belongs."),

  x_mitre_attack_spec_version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Must be in the format 'major.minor.patch'")
    .default("2.0.0")
    .describe(
      "The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."
    ),

  definition_type: z
    .enum(["statement", "tlp"], {
      message: "definition_type must be either 'statement' or 'tlp'",
    })
    .describe(
      "The definition_type property identifies the type of Marking Definition."
    ),

  definition: z
    .object({
      statement: z.string().optional(),
      tlp: z.enum(["white", "green", "amber", "red"]).optional(),
    })
    .refine((data) => data.statement || data.tlp, {
      message: "definition must contain either a 'statement' or 'tlp' field",
    })
    .describe("The definition property contains the marking object itself."),

  name: z
    .string()
    .optional()
    .describe("A name used to identify the Marking Definition."),

  external_references: z
    .array(z.string())
    .optional()
    .describe("External references related to this marking definition."),

  object_marking_refs: ObjectMarkingRefsSchema
    .optional(),

  granular_markings: z
    .array(z.string())
    .optional()
    .describe("Granular markings applied to specific parts of the object."),
});

// Define the type for MarkingDefinition
export type MarkingDefinition = z.infer<typeof MarkingDefinitionSchema>;
