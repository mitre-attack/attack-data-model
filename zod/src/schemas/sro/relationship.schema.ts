import { z } from 'zod';
import { stixRelationshipObjectSchema } from '../common/sro';
import { createStixIdentifierSchema, descriptionSchema, stixIdentifierSchema, StixType, stixTypeSchema } from '../common';
import { relationshipTypeSchema, isValidSourceType, isValidTargetType, isValidRelationshipType } from '../common/relationship-type';

// Initializes the custom ZodErrorMap
import '../../errors';

// read only type reference
const RELATIONSHIP_TYPE: StixType = stixTypeSchema.enum.relationship;

// MITRE ATT&CK Relationship schema
export const RelationshipSchema = stixRelationshipObjectSchema.extend({

	id: createStixIdentifierSchema(stixTypeSchema.enum.relationship),

	type: z.literal(RELATIONSHIP_TYPE),

	// external_references are not required

	relationship_type: relationshipTypeSchema,

	description: descriptionSchema
		.optional(),
	
	source_ref: stixIdentifierSchema
		.describe("The ID of the source (from) object."),

	target_ref: stixIdentifierSchema
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
.superRefine((schema, ctx) => {
	// Destructure relevant properties from schema
	const {
		relationship_type,
		source_ref,
		target_ref
	} = schema;

	// Validate relationship type
	const [validRelationship, relError] = isValidRelationshipType(relationship_type, source_ref, target_ref);
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