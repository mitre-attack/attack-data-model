import { z } from "zod";
import { collectionSchema } from "../src/schemas/sdo/collection.schema";

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
    "description": "Version 6.2 of the Enterprise ATT&CK dataset",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2018-10-17T00:14:20.652Z",
    "modified": "2019-10-11T19:30:42.406Z",
    "object_marking_refs": [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    "x_mitre_contents": [
        {
            "object_ref": "attack-pattern--01a5a209-b94c-450b-b7f9-946497d91055",
            "object_modified": "2019-07-17T20:04:40.297Z"
        },
        {
            "object_ref": "attack-pattern--0259baeb-9f63-4c69-bf10-eb038c390688",
            "object_modified": "2019-06-18T13:58:28.377Z"
        },
        {
            "object_ref": "relationship--0024d82d-97ea-4dc5-81a1-8738862e1f3b",
            "object_modified": "2019-04-24T23:59:16.298Z"
        },
        {
            "object_ref": "intrusion-set--090242d7-73fc-4738-af68-20162f7a5aae",
            "object_modified": "2019-03-22T14:21:19.419Z"
        },
        {
            "object_ref": "malware--069af411-9b24-4e85-b26c-623d035bbe84",
            "object_modified": "2019-04-22T22:40:40.953Z"
        },
        {
            "object_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            "object_modified": "2017-06-01T00:00:00.000Z"
        },
        {
            "object_ref": "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            "object_modified": "2017-06-01T00:00:00.000Z"
        }
    ]
}

console.log("\nExample 1: Valid Collection:");
console.log(`SUCCESS ${collectionSchema.parse(validCollection).name}`)

/****************************************************************************************************/
// Example 2: Invalid Collection (missing required fields)
/****************************************************************************************************/
const invalidCollectionMissingFields = {
    "id": "x-mitre-collection--402e24b4-436e-4936-b19b-2038648f489",
    "type": "x-mitre-collection",
    "spec_version": "2.1",
    "x_mitre_attack_spec_version": "2.1.0",
    // Missing name
    "x_mitre_version": "6.2",
    "description": "Version 6.2 of the Enterprise ATT&CK dataset",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2018-10-17T00:14:20.652Z",
    "modified": "2019-10-11T19:30:42.406Z",
    // Missing object_marking_refs
    // Missing x_mitre_contents
}
console.log("\nExample 2: Invalid Collection (missing required fields):");
try {
    collectionSchema.parse(invalidCollectionMissingFields);
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
    collectionSchema.parse(collectionWithInvalidType);
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
console.log(collectionSchema.parse(collectionWithOptionalFields).description);

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
        {
            // Missing object_ref
            object_modified: "2024-02-02T19:04:35.389Z"
        },
        {
            // Invalid object_ref
            object_ref: "invalid-id",
            object_modified: "2024-02-02T19:04:35.389Z"
        }
	]
};

console.log("\nExample 5: Collection with invalid object version references:");
try {
    collectionSchema.parse(collectionWithInvalidContents);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors);
    }
}
// Validation error: [
//     {
//       code: 'custom',
//       message: "Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.",
//       fatal: true,
//       path: [ 'x_mitre_contents', 0, 'object_modified' ]
//     },
//     {
//       code: 'custom',
//       message: 'Invalid STIX Identifier',
//       fatal: true,
//       path: [ 'x_mitre_contents', 1, 'object_ref' ]
//     },
//     {
//       code: 'custom',
//       message: 'Invalid STIX Identifier',
//       fatal: true,
//       path: [ 'x_mitre_contents', 2, 'object_ref' ]
//     }
//   ]
