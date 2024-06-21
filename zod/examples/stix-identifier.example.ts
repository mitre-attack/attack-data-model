import { z } from "zod";
import { StixIdentifier, StixIdentifierSchema } from "../src/types/stix-identifier";


const id = 'attack-pattern--00000000-0000-4000-8000-000000000000';
const parsedId: StixIdentifier = StixIdentifierSchema.parse(id);

console.log(parsedId);
// {
//     type: 'attack-pattern',
//     uuid: '00000000-0000-4000-8000-000000000000',
//     toString: [Function: toString],
//     [Symbol(Symbol.toPrimitive)]: [Function: [Symbol.toPrimitive]]
// }

console.log(parsedId.type);       // attack-pattern
console.log(parsedId.uuid);       // 00000000-0000-4000-8000-000000000000
console.log(String(parsedId));    // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(`${parsedId}`);       // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(parsedId.toString()); // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(parsedId + '');       // attack-pattern--00000000-0000-4000-8000-000000000000


try {
    const badId = 'foobar--00000000-0000-4000-8000-000000000000' // 'foobar' is not a valid StixType!
    const badParsedId: StixIdentifier = StixIdentifierSchema.parse(badId);
} catch (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
    }
}
// Throws:
// [
//     {
//       code: 'custom',
//       message: 'Invalid STIX Type: type must be a valid STIX type',
//       path: []
//     }
// ]


try {
    const badId = 'attack-pattern--00000000-0000-4000-8000-00000000000' // There is one missing digit!
    const badParsedId: StixIdentifier = StixIdentifierSchema.parse(badId);
} catch (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
    }
}
// Throws:
// [
//     {
//       code: 'custom',
//       message: 'Invalid STIX identifier format: must comply with regex: /^[a-z-]+--[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
//       path: []
//     }
// ]