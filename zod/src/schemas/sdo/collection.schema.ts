import { z } from 'zod';
import { attackBaseObjectSchema, createStixIdentifierSchema, descriptionSchema, objectMarkingRefsSchema, objectVersionReferenceSchema, stixTypeSchema } from "../common";

// https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/collections.md#collections
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