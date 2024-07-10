import { StixCreatedByRefSchema } from "../src/schemas/common/misc";

const example = "identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8";

const parsedExample = StixCreatedByRefSchema.parse(example);

console.log(parsedExample);
// identity--2d1c6ab3-5e4e-48ac-a32b-f0c01c2836a8
