import { StixTimestamp } from '../src/objects/stix-timestamp';
import { StixTimestampSchema } from '../src/types/stix-timestamp'; 

// Usage example
const parsedTimestamp: StixTimestamp = StixTimestampSchema.parse("2023-06-21T15:30:00Z");

console.log(parsedTimestamp);
// { value: 2023-06-21T15:30:00.000Z, toString: [Function: toString] }

console.log(parsedTimestamp.value);
// 2023-06-21T15:30:00.000Z

console.log(parsedTimestamp.value.getFullYear()); // 2023
console.log(parsedTimestamp.value.getMonth()); // 5
console.log(parsedTimestamp.value.getDay()); // 3

console.log(Object.getPrototypeOf(parsedTimestamp));
// [Object: null prototype] {}

console.log(parsedTimestamp.toString());
// "2023-06-21T15:30:00Z"