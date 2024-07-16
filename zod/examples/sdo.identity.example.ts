import { StixCreatedTimestamp, StixModifiedTimestamp, createStixCreatedTimestamp, createStixModifiedTimestamp } from "../src/schemas/common/core-stix-sdo.schema";
import { IdentitySchema } from "../src/schemas/sdo/identity.schema";

const created: StixCreatedTimestamp = createStixCreatedTimestamp('2023-04-06T20:03:00.000Z');
const modified: StixModifiedTimestamp = createStixModifiedTimestamp('2023-04-06T20:03:00.000Z');

const sdoData = {
    id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    type: 'identity',
    created,
    modified,
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    identity_class: "organization",
    name: "The MITRE Corporation"
};

const sdo = IdentitySchema.parse(sdoData)

console.log(sdo.name); // "The MITRE Corporation"
console.log(sdo.type); // 'identity'