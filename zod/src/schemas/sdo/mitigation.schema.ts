import { z } from "zod";
import {
  AttackCoreSDOSchema,
  AttackDomains,
} from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { StixIdentifierSchema } from "../common";

// Custom error messages
const MitigationSchemaError = {
  InvalidFormat: {
    code: z.ZodIssueCode.custom,
    message: "Invalid format for Mitigation schema",
  },
};

// {
//   DONE "type": "Required",
//   DONE "id": "Required",
//   DONE "spec_version": "Required",
//   DONE "x_mitre_attack_spec_version": "Required",
//   DONE "name": "Required",
//   DONE "x_mitre_version": "Required",
//   DONE "description": "Required",
//   DONE "created_by_ref": "Required",
//   DONE"created": "Required",
//   DONE "modified": "Required",
//   DONE "object_marking_refs": "Required",
//   DONE "x_mitre_domains": "Required",
//   DONE "external_references": "Required",
//   DONE "x_mitre_modified_by_ref": "Required",
//   DONE "x_mitre_deprecated": "Optional",
//   DONE "revoked": "Optional",
//   DONE "labels": "Optional",
//   DONE "x_mitre_old_attack_id": "Optional"
// }

// Mitigation Schema
export const MitigationSchema = AttackCoreSDOSchema.extend({
  type: z.literal(StixTypeSchema.enum["course-of-action"], {
    message: `'type' property must be equal to ${StixTypeSchema.enum["course-of-action"]}`,
  }),

  description: z
    .string()
    .describe(
      "A description that provides more details and context about the Mitigation."
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

  x_mitre_old_attack_id: z
    .string()
    .describe("Old ATT&CK ids that may have been associated with this software")
    .optional(),
});

// Define the type for SchemaName
export type Mitigation = z.infer<typeof MitigationSchema>;
