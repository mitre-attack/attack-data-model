import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { stixTypeSchema } from "../common/stix-type";
import {
  xMitrePlatformsSchema,
  stixIdentifierSchema,
  xMitreDomainsSchema,
} from "../common";

// Custom error messages
const DataSourceSchemaError = {
  InvalidFormat: {
    code: z.ZodIssueCode.custom,
    message: "Invalid format for Data Source schema",
  },
  InvalidType: {
    code: z.ZodIssueCode.custom,
    message: `'type' property must be equal to ${stixTypeSchema.enum["x-mitre-data-source"]}`,
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
//     DONE "x_mitre_platforms": "Optional",
//     DONE "x_mitre_domains": "Required",
//     DONE "external_references": "Required",
//     DONE "x_mitre_modified_by_ref": "Required",
//     DONE "x_mitre_contributors": "Optional",
//     DONE "x_mitre_deprecated": "Optional",
//     DONE "revoked": "Optional",
//     DONE "x_mitre_collection_layers": "Required"
//   }

// DataSource Schema
export const dataSourceSchema = attackBaseObjectSchema.extend({
  type: z.literal(
    stixTypeSchema.enum["x-mitre-data-source"],
    DataSourceSchemaError.InvalidType
  ),

  description: z
    .string()
    .describe(
      "A description that provides more details and context about the Data Source."
    ),

  x_mitre_platforms: xMitrePlatformsSchema.optional(),

  x_mitre_domains: xMitreDomainsSchema,

  x_mitre_modified_by_ref: stixIdentifierSchema.describe(
    "The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."
  ),

  x_mitre_contributors: z
    .array(z.string())
    .describe("People and organizations who have contributed to the object. Not found on relationship objects.")
    .optional(),

  x_mitre_deprecated: z
    .boolean()
    .describe("Indicates whether the object has been deprecated.")
    .optional(),

  x_mitre_collection_layers: z
    .array(z.string(), {
      invalid_type_error:
        "x_mitre_collection_layers must be an array of strings.",
    })
    .describe("List of places the data can be collected from.."),
});

// Define the type for DataSource
export type DataSource = z.infer<typeof dataSourceSchema>;
