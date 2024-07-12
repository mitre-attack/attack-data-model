import { SDOImpl } from "../src/classes/sdo.cls";
import { SDO, StixCreatedTimestamp, StixModifiedTimestamp, createStixCreatedTimestamp, createStixModifiedTimestamp } from "../src/schemas/common/core-stix-sdo.schema";
import { ToolSchema } from "../src/schemas/sdo/tool.schema";

const created: StixCreatedTimestamp = createStixCreatedTimestamp('2023-04-06T20:03:00.000Z');
const modified: StixModifiedTimestamp = createStixModifiedTimestamp('2023-04-06T20:03:00.000Z');

const sdoData = {
    id: 'tool--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f',
    type: 'tool',
    description: 'test',
    spec_version: '2.1',
    created,
    modified,
    confidence: 85,
    name: "S1098",
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
};

const sdo = ToolSchema.parse(sdoData)

console.log(sdo.id); // 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f'
console.log(sdo.type); // 'indicator'
console.log(sdo.confidence); // 85

// // Accessing a property that wasn't in the input data
// console.log(sdo.labels); // undefined

// // Using static parse method
// const parsedSDO = SDOImpl.parse(sdoData);

// // Type checking
// console.log(SDOImpl.isSDO(sdo)); // true
// console.log(SDOImpl.isSDO({})); // false

// // Dynamically accessing properties
// const propertyName = 'spec_version';
// console.log(sdo[propertyName]); // '2.1'