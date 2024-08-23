import { z } from 'zod';
import { SROSchema } from '../common/core-stix-sro.schema';
import { StixTypeSchema } from '../common/stix-type';
import { createStixIdentifierSchema, ObjectMarkingRefsSchema, StixCreatedByRefSchema, StixIdentifierSchema } from '../common';
import { RelationshipTypeSchema, isValidSourceType, isValidTargetType, isValidRelationship } from '../common/relationship-type';

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
.superRefine(({relationship_type, source_ref, target_ref}, ctx) => {
	// Validate relationship type
	const [validRelationship, relError] = isValidRelationship(relationship_type, source_ref, target_ref);
	if (!validRelationship) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: relError. message,
			path: relError.path
		});
	}

	// Validate source ref type
	const [validSource, sourceError] = isValidSourceType(relationship_type, source_ref);
	if (!validSource) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: sourceError.message,
			path: sourceError.path
		});
	}

	// Validate target ref type
	const [validTarget, targetError] = isValidTargetType(relationship_type, target_ref);
	if (!validTarget) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: targetError.message,
			path: targetError.path
		});
	}
});

export type Relationship = z.infer<typeof RelationshipSchema>;