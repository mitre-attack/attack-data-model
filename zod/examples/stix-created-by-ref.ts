import { StixCreatedByRefSchema } from "../src/types/misc";

const example = "identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8";

const parsedExample = StixCreatedByRefSchema.parse(example);

console.log(parsedExample);
// TrustedStixIdentifier {
//     type: 'identity',
//     uuid: '2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8'
//   }

console.log(JSON.stringify(parsedExample));
// {"type":"identity","uuid":"2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8"}

console.log(parsedExample.type);
// identity

console.log(parsedExample.uuid);
// 2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8

console.log(String(parsedExample));
// identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8

console.log(parsedExample.toString());
// identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8

console.log(parsedExample + "");
// identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8

console.log(typeof parsedExample.toString());
// string

console.log(typeof parsedExample);
// object