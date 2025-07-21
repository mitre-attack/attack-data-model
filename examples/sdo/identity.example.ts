import { z } from "zod/v4"
import { identitySchema } from "../../src/schemas/sdo/identity.schema.js";

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
    spec_version: "2.1"
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
    x_mitre_domains:["enterprise-attack"],
    name: "The MITRE Corporation",
    x_mitre_attack_spec_version: "3.2.0",
	x_mitre_version: "1.0",
    spec_version: "2.1"
};

console.log("Example 2 - Invalid Identity (missing required fields):");
const e2 = identitySchema.safeParse(invalidIdentity);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 3: Identity with invalid id
/** ************************************************************************************************* */
const identityWithInvalidId = {
    ...validIdentity,
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
};

console.log("\nExample 3 - Identity with invalid id:");
const e3 = identitySchema.safeParse(identityWithInvalidId);
console.log(z.prettifyError(e3.error as z.core.$ZodError));

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
    ],
    "x_mitre_attack_spec_version": "3.2.0",
	"x_mitre_version": "1.0",
    "spec_version": "2.1",
    "x_mitre_domains":["enterprise-attack"],
}

console.log("\nExample 5 - Parsing the provided example identity:");
const e5 = identitySchema.safeParse(exampleOfRealIdentity);
if (e5.success) {
    console.log(e5.data);
    console.log("Parsed successfully. Identity name:", e5.data.name);
} else {
    console.log(z.prettifyError(e5.error as z.core.$ZodError));
}

/** ************************************************************************************************* */
// Example 6: Identity with unknown property
/** ************************************************************************************************* */
const identityWithUnknownProperty = {
    ...exampleOfRealIdentity,
    foo: 'bar'
}

console.log("\nExample 6 - Parsing a identity with an unknown property (foo: 'bar'):");
const e6 = identitySchema.safeParse(identityWithUnknownProperty);
if (e6.success) {
    console.log("Parsed successfully. Identity name:", e6.data.name);
} else {
    console.log(z.prettifyError(e6.error as z.core.$ZodError));
}