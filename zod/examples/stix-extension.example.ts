import { ExtensionSchema } from "../src/schemas/property-schemas/misc";

const example = {
    extension_type: "custom-extension",
    extension_properties: {
        custom_field1: "Custom Value 1",
        custom_field2: 42
    }
};

const parsedExample = ExtensionSchema.parse(example);

console.log(parsedExample);
// {
//     extension_type: 'custom-extension',
//     extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
// }