import { GranularMarkingSchema } from "../src/types/misc";

const example = {
    marking_ref: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
    selectors: ["description", "labels"]
};

const parsedExample = GranularMarkingSchema.parse(example);

console.log(parsedExample);
// TrustedGranularMarking {
//   data: {
//     marking_ref: StixIdentifier { type: 'marking-definition', uuid: '34098fce-860f-48ae-8e50-ebd3cc5e41da' },
//     selectors: [ 'description', 'labels' ]
//   }
// }

console.log(JSON.stringify(parsedExample));
// {"data":{"marking_ref":{"type":"marking-definition","uuid":"34098fce-860f-48ae-8e50-ebd3cc5e41da"},"selectors":["description","labels"]}}

console.log(JSON.stringify(parsedExample.data));
// {"marking_ref":"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da","selectors":["description","labels"]}

console.log(parsedExample.data.marking_ref.toString());
// marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da

console.log(parsedExample.get("selectors"));
// [ 'description', 'labels' ]

console.log(String(parsedExample));
// {"marking_ref":"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da","selectors":["description","labels"]}

console.log(parsedExample.toString());
// {"marking_ref":"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da","selectors":["description","labels"]}

console.log(parsedExample + "");
// {"marking_ref":"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da","selectors":["description","labels"]}

console.log(typeof parsedExample.toString());
// string

console.log(typeof parsedExample);
// object