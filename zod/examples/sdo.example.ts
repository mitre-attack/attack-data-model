import { SDOImpl } from "../src/classes/sdo.cls";
import { SDO, StixCreatedTimestamp, StixModifiedTimestamp, createStixCreatedTimestamp, createStixModifiedTimestamp } from "../src/schemas/sdo.schema";

const created: StixCreatedTimestamp = createStixCreatedTimestamp('2023-04-06T20:03:00.000Z');
const modified: StixModifiedTimestamp = createStixModifiedTimestamp('2023-04-06T20:03:00.000Z');

const sdoData: SDO = {
    id: 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f',
    type: 'indicator',
    spec_version: '2.1',
    created,
    modified,
    confidence: 85,
};

const sdo = new SDOImpl(sdoData as any);

console.log(sdo.id); // 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f'
console.log(sdo.type); // 'indicator'
console.log(sdo.confidence); // 85

// Accessing a property that wasn't in the input data
console.log(sdo.labels); // undefined

// Using static parse method
const parsedSDO = SDOImpl.parse(sdoData);

// Type checking
console.log(SDOImpl.isSDO(sdo)); // true
console.log(SDOImpl.isSDO({})); // false

// Dynamically accessing properties
const propertyName = 'spec_version';
console.log(sdo[propertyName]); // '2.1'