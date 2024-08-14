import { z } from "zod";
import { CollectionSchema } from "../src/schemas/sdo/collection.schema";

/****************************************************************************************************/
// Example 1: Valid Collection
/****************************************************************************************************/
const validCollection = {
    "id": "x-mitre-collection--1f5f1533-f617-4ca8-9ab4-6a02367fa019",
    "type": "x-mitre-collection",
    "spec_version": "2.1",
    "x_mitre_attack_spec_version": "2.1.0",
    "name": "Enterprise ATT&CK",
    "x_mitre_version": "6.2",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2018-10-17T00:14:20.652Z",
    "modified": "2019-10-11T19:30:42.406Z",
    "object_marking_refs": [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    "x_mitre_contents": [
        {
            "object_ref": "attack-pattern--ad255bfe-a9e6-4b52-a258-8d3462abe842",
            "object_modified": "2024-02-02T19:04:35.389Z"
        },
        {
            "object_ref": "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
            "object_modified": "2019-07-19T17:42:06.909Z"
        }
    ]
};

console.log("\nExample 1: Valid Collection:");
console.log(`SUCCESS ${CollectionSchema.parse(validCollection).name}`)

/****************************************************************************************************/
// Example 2: Invalid Collection (missing required fields)
/****************************************************************************************************/
const invalidCollectionMissingFields = {
    "id": "x-mitre-collection--1f5f1533-f617-4ca8-9ab4-6a02367fa019",
    "type": "x-mitre-collection",
    "spec_version": "2.1",
    "x_mitre_attack_spec_version": "2.1.0",
    // Missing name
    "x_mitre_version": "6.2",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2018-10-17T00:14:20.652Z",
    "modified": "2019-10-11T19:30:42.406Z",
	// Missing object_marking_refs
	// Missing x_mitre_contents
};
console.log("\nExample 2: Invalid Collection (missing required fields):");
try {
    CollectionSchema.parse(invalidCollectionMissingFields);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}
/**
	Validation errors: [
		{
			code: 'invalid_type',
			expected: 'string',
			received: 'undefined',
			path: [ 'name' ],
			message: 'Required'
		},
		{
			code: 'invalid_type',
			expected: 'array',
			received: 'undefined',
			path: [ 'object_marking_refs' ],
			message: 'Required'
		},
		{
			code: 'invalid_type',
			expected: 'array',
			received: 'undefined',
			path: [ 'x_mitre_contents' ],
			message: 'Required'
		}
	]
 */

/****************************************************************************************************/
// Example 3: Collection with invalid type
/****************************************************************************************************/
const collectionWithInvalidType = {
	...validCollection,
	type: "invalid-type"
};

console.log("\nExample 3: Collection with invalid type:");
try {
    CollectionSchema.parse(collectionWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
    }
}
// Validation error: Invalid literal value, expected "x-mitre-collection"

/****************************************************************************************************/
// Example 4: Collection with optional fields
/****************************************************************************************************/
const collectionWithOptionalFields = {
	...validCollection,
	description: "Version 6.2 of the Enterprise ATT&CK dataset"
};

console.log("\nExample 4: Collection with optional fields:");
console.log(CollectionSchema.parse(collectionWithOptionalFields).description);

/****************************************************************************************************/
// Example 5: Collection with invalid object version references
/****************************************************************************************************/
const collectionWithInvalidContents = {
	...validCollection,
	x_mitre_contents: [
		{
			object_ref: "attack-pattern--ad255bfe-a9e6-4b52-a258-8d3462abe842",
			// Missing object_modified
		},
	// 	{
	// 		// Missing object_ref
	// 		object_modified: "2024-02-02T19:04:35.389Z"
	// 	},
    //     {
	// 		// Invalid object_ref
    //         object_ref: "invalid-id",
    //         object_modified: "2024-02-02T19:04:35.389Z"
    //     }
	]
};

console.log("\nExample 5: Collection with invalid object version references:");
try {
    CollectionSchema.parse(collectionWithInvalidContents);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
    }
}