import { ZodError } from "zod";
import { GranularMarkingSchema } from "../src/schemas/property-schemas/misc";

const validExample = {
    marking_ref: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
    selectors: ["description", "labels"]
};

const parsedExample = GranularMarkingSchema.parse(validExample);

console.log(parsedExample);
// {
//     marking_ref: 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da',
//     selectors: ['description', 'labels']
// }


const invalidExample = {
    marking_ref: "foobar--34098fce-860f-48ae-8e50-ebd3cc5e41da",
    selectors: ["description", "labels"]
};

try {
    GranularMarkingSchema.parse(invalidExample);
} catch (error) {
    console.log((error as ZodError).flatten());
    // {
    //     formErrors: [],
    //     fieldErrors: { marking_ref: [ 'Invalid STIX Identifier' ] }
    // }
}