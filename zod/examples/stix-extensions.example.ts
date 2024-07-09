import { ExtensionsSchema, Extension } from "../src/schemas/property-schemas/misc";

const example = {
    "extension1": {
        extension_type: "custom-extension-1",
        extension_properties: {
            custom_field1: "Custom Value 1",
            custom_field2: 42
        }
    },
    "extension2": {
        extension_type: "custom-extension-2",
        extension_properties: {
            another_field: "Another Value",
            numeric_field: 123
        }
    }
};

const parsedExample = ExtensionsSchema.parse(example);

console.log(parsedExample);
// {
//     extension1: {
//       extension_type: 'custom-extension-1',
//       extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
//     },
//     extension2: {
//       extension_type: 'custom-extension-2',
//       extension_properties: { another_field: 'Another Value', numeric_field: 123 }
//     }
// }