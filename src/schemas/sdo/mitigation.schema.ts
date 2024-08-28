import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { stixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema, externalReferenceSchema, objectMarkingRefsSchema, stixCreatedByRefSchema, stixIdentifierSchema, xMitreDomainsSchema } from "../common";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 


export const mitigationSchema = attackBaseObjectSchema.extend({

  id: createStixIdentifierSchema(stixTypeSchema.enum["course-of-action"]),

  type: z.literal(stixTypeSchema.enum["course-of-action"]),

  // Optional in STIX but required in ATT&CK
  created_by_ref: stixCreatedByRefSchema,

  description: z
    .string()
    .describe("A description that provides more details and context about the Mitigation."),

  // Optional in STIX but required in ATT&CK
  external_references: z
    .array(externalReferenceSchema)
    .describe("A list of external references which refers to non-STIX information."),

  // Optional in STIX but required in ATT&CK
  object_marking_refs: objectMarkingRefsSchema,

  x_mitre_domains: xMitreDomainsSchema,

  x_mitre_modified_by_ref: stixIdentifierSchema
    .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),

  x_mitre_deprecated: z
    .boolean()
    .describe("Indicates whether the object has been deprecated.")
    .optional(),
});

// Define the type for SchemaName
export type Mitigation = z.infer<typeof mitigationSchema>;
