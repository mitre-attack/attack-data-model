import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { stixTypeSchema } from "../common/stix-type";
import { stixIdentifierSchema, xMitreDomainsSchema } from "../common";

// Custom error messages
const MatrixSchemaError = {
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
//     DONE "external_references": "Required",
//     DONE "x_mitre_modified_by_ref": "Required",
//     DONE "x_mitre_deprecated": "Optional",
//     DONE "revoked": "Optional",
//     DONE "tactic_refs": "Required"
//   }

// SchemaName Schema
export const matrixSchema = attackBaseObjectSchema.extend({
  type: z.literal(stixTypeSchema.enum["x-mitre-matrix"], {
    message: `'type' property must be equal to ${stixTypeSchema.enum["x-mitre-matrix"]}`,
  }),

  description: z
    .string()
    .describe(
      "A description that provides more details and context about the Matrix."
    ),

  x_mitre_domains: xMitreDomainsSchema,

  x_mitre_modified_by_ref: stixIdentifierSchema.describe(
    "The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."
  ),

  x_mitre_deprecated: z
    .boolean()
    .describe("Indicates whether the object has been deprecated.")
    .optional(),

  tactic_refs: z
    .array(
      z
        .string()
        .regex(
          /^x-mitre-tactic--[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
        )
    )
    .describe(
      "An ordered list of x-mitre-tactic STIX IDs corresponding to the tactics of the matrix. The order determines the appearance within the matrix."
    ),
});

// Define the type for Matrix
export type Matrix = z.infer<typeof matrixSchema>;
