import { z } from "zod";
import {
  AttackCoreSDOSchema,
  AttackDomains,
} from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { StixIdentifierSchema } from "../common";

// Custom error messages
const DataComponentSchemaError = {
  InvalidFormat: {
    code: z.ZodIssueCode.custom,
    message: "Custom error message for invalid format",
  },
};

// {
//     DONE "type": "Required",
//     DONE "id": "Required",
//     DONE "spec_version": "Required",
//     DONE "x_mitre_attack_spec_version": "Required",
//     DONE "name": "Required",
//     DONE "x_mitre_version": "Required",
//     DONE "description": "Required",
//     DONE "created_by_ref": "Required",
//     DONE "created": "Required",
//     DONE "modified": "Required",
//     DONE "object_marking_refs": "Required",
//     DONE "x_mitre_domains": "Required",
//     DONE "x_mitre_modified_by_ref": "Required",
//     DONE "x_mitre_deprecated": "Optional",
//     DONE "revoked": "Optional",
//     DONE"x_mitre_data_source_ref": "Required"
//   }

// Data Component Schema
export const DataComponentSchema = AttackCoreSDOSchema.extend({
  type: z.literal(StixTypeSchema.enum["x-mitre-data-component"], {
    message: `'type' property must be equal to ${StixTypeSchema.enum["x-mitre-data-component"]}`,
  }),

  description: z
    .string()
    .describe(
      "A description that provides more details and context about the Data Component."
    ),

  x_mitre_domains: z
    .array(AttackDomains)
    .default([AttackDomains.Values["enterprise-attack"]])
    .describe("The technology domains to which the ATT&CK object belongs."),

  x_mitre_modified_by_ref: StixIdentifierSchema.describe(
    "The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."
  ),

  x_mitre_deprecated: z
    .boolean()
    .describe("Indicates whether the object has been deprecated.")
    .optional(),

  x_mitre_data_source_ref: z
    .string()
    .describe("The STIX ID of the data source this component is a part of."),
});

// Define the type for SchemaName
export type DataComponent = z.infer<typeof DataComponentSchema>;
