import { z } from "zod";
import { StixIdentifier, StixIdentifierSchema } from "../src/schemas/common/stix-identifier";
import { StixIdentifierImpl } from "../src/classes/stix-identifier.cls";

const id = 'attack-pattern--00000000-0000-4000-8000-000000000000';
const parsedId: StixIdentifier = StixIdentifierSchema.parse(id);

console.log(parsedId);                  // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(String(parsedId));          // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(`${parsedId}`);             // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(parsedId.toString());       // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(parsedId + '');             // attack-pattern--00000000-0000-4000-8000-000000000000


try {
    const badId = 'foobar--00000000-0000-4000-8000-000000000000' // 'foobar' is not a valid StixType!
    const badParsedId: StixIdentifier = StixIdentifierSchema.parse(badId);
} catch (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
    }
}
// [
//     {
//         code: 'custom',
//         message: 'Invalid STIX Identifier',
//         fatal: true,
//         path: []
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
// [
//     {
//         code: 'custom',
//         message: 'Invalid STIX Identifier',
//         fatal: true,
//         path: []
//     }
// ]


const stixIdObject = new StixIdentifierImpl(id);

console.log(stixIdObject);
// StixIdentifierImpl {
//     _page: {},
//     _type: 'attack-pattern',
//     _uuid: '00000000-0000-4000-8000-000000000000',
//     _stix: { stix: 'attack-pattern--00000000-0000-4000-8000-000000000000' }
// }

console.log(`${stixIdObject}`);                             // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(stixIdObject.toString());                       // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(String(stixIdObject));                          // attack-pattern--00000000-0000-4000-8000-000000000000
console.log(stixIdObject.toJSON());                         // { type: 'attack-pattern', uuid: '00000000-0000-4000-8000-000000000000' }
console.log(stixIdObject instanceof StixIdentifierImpl);    // true


try {
    const badStixIdObject = new StixIdentifierImpl('foobar--00000000-0000-4000-8000-000000000000');
} catch (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
        // [
        //     {
        //       code: 'custom',
        //       message: 'Invalid STIX Identifier',
        //       fatal: true,
        //       path: []
        //     }
        // ]
    }
}

try {
    const badStixIdObject = new StixIdentifierImpl('attack-pattern--12345');
} catch (err) {
    if (err instanceof z.ZodError) {
        console.log(err.issues);
        // [
        //     {
        //       code: 'custom',
        //       message: 'Invalid STIX Identifier',
        //       fatal: true,
        //       path: []
        //     }
        // ]
    }
}