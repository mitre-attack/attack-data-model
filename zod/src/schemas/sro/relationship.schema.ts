import { z } from 'zod';
import { SROSchema } from '../common/core-stix-sro.schema';
import { StixTypeSchema } from '../common/stix-type';
import { createStixIdentifierSchema, ObjectMarkingRefsSchema, StixCreatedByRefSchema, StixIdentifierSchema } from '../common';
import { getType, RelationshipTypeSchema, validSourceTypes, validTargetTypes, isValidSourceAndTargetRef } from '../common/relationship-type';

// Initializes the custom ZodErrorMap
import '../../errors'; 

export const RelationshipSchema = SROSchema.extend({
	id: createStixIdentifierSchema(StixTypeSchema.enum.relationship),

	type: z.literal(StixTypeSchema.enum.relationship),

	// Optional in STIX but required in ATT&CK
	object_marking_refs: ObjectMarkingRefsSchema,

  	// Optional in STIX but required in ATT&CK
  	created_by_ref: StixCreatedByRefSchema
		.describe("The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous."),

	// external_references are not required (Relationships do not have ATT&CK IDs)

	relationship_type: RelationshipTypeSchema,

	description: z
		.string()
		.optional()
		.describe("A description that provides more details and context about the Relationship, potentially including its purpose and its key characteristics."),
	
	source_ref: StixIdentifierSchema
		.describe("The ID of the source (from) object."),

	target_ref: StixIdentifierSchema
		.describe("The ID of the target (to) object."),
})
.required({
	id: true,
	type: true,
	spec_version: true,
	created: true,
	modified: true,
	relationship_type: true,
	source_ref: true,
	target_ref: true,
})
.refine((schema) => {
	// Validate source ref is a valid type based on the relationship_type
	const sourceType = getType(schema.source_ref);
	const validSources = validSourceTypes(schema.relationship_type, schema.target_ref);
	return validSources.includes(sourceType);
}, {
	message: "Invalid source type for the specified relationship type.",
	path: ["source_ref"]
})
.refine((schema) => {
	// Validate target ref is a valid type based on the relationship_type
	const targetType = getType(schema.target_ref);
	const validTargets = validTargetTypes(schema.relationship_type, schema.source_ref);
	return validTargets.includes(targetType);
}, {
	message: "Invalid target type for the specified relationship type.",
	path: ["target_ref"]
})
.refine((schema) => {
	// Validate source and target refs are compatible types
	// This catches cases in which the custom validation above
	// may return a false positive (e.g. an invalid relationship
	// MALWARE "uses" MALWARE would pass the validation logic
	// above)
	// NOTE: this may possibly supersede the above validaton
	return isValidSourceAndTargetRef(schema.relationship_type, schema.source_ref, schema.target_ref);
}, {
	message: "Incompatible source and target types for the specified relationship_type.",
});

export type Relationship = z.infer<typeof RelationshipSchema>;