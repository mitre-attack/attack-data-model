import { z } from "zod";
import { AttackCoreSDOSchema, AttackDomains } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema, ExternalReferenceSchema, ObjectMarkingRefsSchema, StixCreatedByRefSchema, StixIdentifierSchema } from "../common";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 


export const MitigationSchema = AttackCoreSDOSchema.extend({

  id: createStixIdentifierSchema(StixTypeSchema.enum["course-of-action"]),

  type: z.literal(StixTypeSchema.enum["course-of-action"]),

  // Optional in STIX but required in ATT&CK
  created_by_ref: StixCreatedByRefSchema
    .describe("The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous."),

  description: z
    .string()
    .describe("A description that provides more details and context about the Mitigation."),

  // Optional in STIX but required in ATT&CK
  external_references: z
    .array(ExternalReferenceSchema)
    .describe("A list of external references which refers to non-STIX information."),

  // Optional in STIX but required in ATT&CK
  object_marking_refs: ObjectMarkingRefsSchema,

  x_mitre_domains: z
    .array(AttackDomains)
    .describe("The technology domains to which the ATT&CK object belongs."),

  x_mitre_modified_by_ref: StixIdentifierSchema
    .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),

  x_mitre_deprecated: z
    .boolean()
    .describe("Indicates whether the object has been deprecated.")
    .optional(),
});

// Define the type for SchemaName
export type Mitigation = z.infer<typeof MitigationSchema>;
