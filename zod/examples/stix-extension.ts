import { ExtensionSchema } from "../src/types/misc";

const example = {
    extension_type: "custom-extension",
    extension_properties: {
        custom_field1: "Custom Value 1",
        custom_field2: 42
    }
};

const parsedExample = ExtensionSchema.parse(example);

console.log(parsedExample);
// TrustedExtension {
//   data: {
//     extension_type: 'custom-extension',
//     extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
//   }
// }

console.log(JSON.stringify(parsedExample));
// {"data":{"extension_type":"custom-extension","extension_properties":{"custom_field1":"Custom Value 1","custom_field2":42}}}

console.log(JSON.stringify(parsedExample.data));
// {"extension_type":"custom-extension","extension_properties":{"custom_field1":"Custom Value 1","custom_field2":42}}

console.log(parsedExample.get("extension_type"));
// custom-extension

console.log(parsedExample.data.extension_properties);
// { custom_field1: 'Custom Value 1', custom_field2: 42 }

console.log(parsedExample.get("extension_properties"));
// { custom_field1: 'Custom Value 1', custom_field2: 42 }

console.log(String(parsedExample));
// {"extension_type":"custom-extension","extension_properties":{"custom_field1":"Custom Value 1","custom_field2":42}}

console.log(parsedExample.toString());
// {"extension_type":"custom-extension","extension_properties":{"custom_field1":"Custom Value 1","custom_field2":42}}

console.log(parsedExample + "");
// {"extension_type":"custom-extension","extension_properties":{"custom_field1":"Custom Value 1","custom_field2":42}}

console.log(typeof parsedExample.toString());
// string

console.log(typeof parsedExample);
// object