import { z } from 'zod';
import { AttackCoreSDOSchema, DescriptionSchema, ObjectMarkingRefsSchema, ObjectVersionReferenceSchema, StixTypeSchema } from "../common";

// https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/collections.md#collections
export const CollectionSchema = AttackCoreSDOSchema.extend({
	type: z.literal(StixTypeSchema.enum["x-mitre-collection"], {
		message: `'type' property must be equal to ${StixTypeSchema.enum['x-mitre-collection']}`
	}),

    description: DescriptionSchema
        .describe("Details, context, and explanation about the purpose or contents of the collection.")
        .optional(),

	object_marking_refs: ObjectMarkingRefsSchema,

	x_mitre_contents: z
		.array(ObjectVersionReferenceSchema)
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

export type Collection = z.infer<typeof CollectionSchema>;