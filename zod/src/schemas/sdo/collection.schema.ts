import { z } from 'zod';
import { attackBaseObjectSchema, createStixIdentifierSchema, descriptionSchema, stixIdentifierSchema, stixTimestampSchema, stixTypeSchema } from "../common";


/////////////////////////////////////
//
// Object Version Reference (x_mitre_contents)
//
/////////////////////////////////////

export const objectVersionReferenceSchema = z.object({
	object_ref: stixIdentifierSchema
		.refine(val => val !== undefined, {
			message: "'object_ref' is required."
		})
		.describe("The ID of the referenced object."),
	object_modified: stixTimestampSchema
		.brand("StixModifiedTimestamp")
		.refine(val => val !== undefined, {
			message: "'object_modified' is required."
		})
		.describe("The modified time of the referenced object. It MUST be an exact match for the modified time of the STIX object being referenced.")
});

export type ObjectVersionReference = z.infer<typeof objectVersionReferenceSchema>;


/////////////////////////////////////
//
// MITRE STIX Collection
//
/////////////////////////////////////

export const collectionSchema = attackBaseObjectSchema.extend({

	id: createStixIdentifierSchema(stixTypeSchema.enum['x-mitre-collection']),

	type: z.literal(stixTypeSchema.enum["x-mitre-collection"]),

	description: descriptionSchema
        .describe("Details, context, and explanation about the purpose or contents of the collection.")
        .optional(),

	x_mitre_contents: z
		.array(objectVersionReferenceSchema)
		.min(1, "At least one STIX object reference is required.")
		.describe("Specifies the objects contained within the collection."),
})
.required({
	id: true,
	type: true,
	name: true,
	created: true,
	modified: true,
	x_mitre_version: true,
	spec_version: true,
	x_mitre_attack_spec_version: true,
	created_by_ref: true,
	object_marking_refs: true,
	x_mitre_contents: true,
});

export type Collection = z.infer<typeof collectionSchema>;