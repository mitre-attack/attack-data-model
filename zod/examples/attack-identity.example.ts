import { z } from "zod"
import { identitySchema } from "../src/schemas/sdo/identity.schema";

/** ************************************************************************************************* */
// Example 1: Valid Identity
/** ************************************************************************************************* */

const validIdentity = {
    type: 'identity',
    id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    created: "2017-06-01T00:00:00.000Z",
    modified: "2017-06-01T00:00:00.000Z",
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    identity_class: "organization",
    name: "The MITRE Corporation",
    x_mitre_attack_spec_version: "3.2.0",
	x_mitre_version: "1.0"
};

console.log("Example 1 - Valid Identity:");
console.log(identitySchema.parse(validIdentity));

/** ************************************************************************************************* */
// Example 2: Invalid Identity (missing required fields)
/** ************************************************************************************************* */

const invalidIdentity = {
    type: 'identity',
    id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    created: "2017-06-01T00:00:00.000Z",
    modified: "2017-06-01T00:00:00.000Z",
    // Missing object_marking_refs
    // Missing identity_class
    name: "The MITRE Corporation"
};

console.log("Example 2 - Invalid Identity (missing required fields):");
try {
    identitySchema.parse(invalidIdentity);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
        /**
         * Validation errors: [
            {
                code: 'invalid_type',
                expected: 'array',
                received: 'undefined',
                path: [ 'object_marking_refs' ],
                message: 'Required'
            },
            {
                expected: "'individual' | 'group' | 'system' | 'organization' | 'class' | 'unspecified'",
                received: 'undefined',
                code: 'invalid_type',
                path: [ 'identity_class' ],
                message: 'Required'
            }
            ]
         */
    }
}

/** ************************************************************************************************* */
// Example 3: Identity with invalid id
/** ************************************************************************************************* */
const identityWithInvalidId = {
    ...validIdentity,
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
};

console.log("\nExample 3 - Identity with invalid id:");
try {
    identitySchema.parse(identityWithInvalidId);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "identity"
    }
}

/** ************************************************************************************************* */
// Example 4: Identity with fields in STIX but not in ATT&CK
/** ************************************************************************************************* */
const identityWithStixFields = {
    ...validIdentity,
    description: "identity object description",
    roles: ["administrator"],
    sectors: ["non-profit"],
    contact_information: "attack@mitre.org"
};

console.log("\nExample 4 - Identity with fields in STIX but not in ATT&CK:");
console.log(identitySchema.parse(identityWithStixFields));
/**
 * {
    id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    type: 'identity',
    spec_version: '2.1',
    created: '2017-06-01T00:00:00.000Z',
    modified: '2017-06-01T00:00:00.000Z',
    object_marking_refs: [ 'marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168' ],
    name: 'The MITRE Corporation',
    x_mitre_attack_spec_version: '2.0.0',
    x_mitre_version: '2.1',
    identity_class: 'organization',
    description: 'identity object description',
    roles: [ 'administrator' ],
    sectors: [ 'non-profit' ],
    contact_information: 'attack@mitre.org',
    x_mitre_domains: [ 'enterprise-attack' ]
    }
 */

/** ************************************************************************************************* */
// Example 5: Parsing the provided example identity
/** ************************************************************************************************* */
const exampleOfRealIdentity = {
    "type": "identity",
    "id": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2017-06-01T00:00:00.000Z",
    "modified": "2017-06-01T00:00:00.000Z",
    "name": "The MITRE Corporation",
    "identity_class": "organization",
    "object_marking_refs": [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ]
}

console.log("\nExample 5 - Parsing the provided example identity:");
try {
    const parsedIdentity = identitySchema.parse(exampleOfRealIdentity);
    console.log(parsedIdentity);
    console.log("Parsed successfully. Identity name:", parsedIdentity.name);
    // Parsed successfully. Identity name: The MITRE Corporation
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}