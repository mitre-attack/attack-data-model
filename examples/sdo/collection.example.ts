import { z } from "zod/v4";
import { collectionSchema } from "../../src/schemas/sdo/collection.schema.js";

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
    "id": "x-mitre-collection--1f5f1533-f617-4ca8-9ab4-6a02367fa019",
    "type": "x-mitre-collection",
    "spec_version": "2.1",
    "x_mitre_attack_spec_version": "2.1.0",
    "x_mitre_version": "6.2",
    "description": "Version 6.2 of the Enterprise ATT&CK dataset",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2018-10-17T00:14:20.652Z",
    "modified": "2019-10-11T19:30:42.406Z",
}
console.log("\nExample 2: Invalid Collection (missing required fields):");
const e2 = collectionSchema.safeParse(invalidCollectionMissingFields);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/****************************************************************************************************/
// Example 3: Collection with invalid type
/****************************************************************************************************/
const collectionWithInvalidType = {
	...validCollection,
	type: "invalid-type"
};

console.log("\nExample 3: Collection with invalid type:");
const e3 = collectionSchema.safeParse(collectionWithInvalidType);
console.log(z.prettifyError(e3.error as z.core.$ZodError));

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
		},
        {
            object_modified: "2024-02-02T19:04:35.389Z"
        },
        {
            object_ref: "invalid-id",
            object_modified: "2024-02-02T19:04:35.389Z"
        }
	]
};

console.log("\nExample 5: Collection with invalid object version references:");
const e5 = collectionSchema.safeParse(collectionWithInvalidContents);
console.log(z.prettifyError(e5.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 6: Collection with unknown property
/** ************************************************************************************************* */
const collectionWithUnknownProperty = {
    ...validCollection,
    foo: 'bar'
}

console.log("\nExample 6 - Parsing a collection with an unknown property (foo: 'bar'):");
const e6 = collectionSchema.safeParse(collectionWithUnknownProperty);
if (e6.success) {
    console.log("Parsed successfully. Collection name:", e6.data.name);
} else {
    console.log(z.prettifyError(e6.error as z.core.$ZodError));
}