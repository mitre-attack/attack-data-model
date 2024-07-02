import { ExtensionsSchema, TrustedExtension } from "../src/types/misc";

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
// TrustedExtensions {
//     data: {
//       extension1: TrustedExtension { data: [Object] },
//       extension2: TrustedExtension { data: [Object] }
//     }
//   }


const extension1: TrustedExtension | undefined = parsedExample.getExtension("extension1");
console.log(typeof extension1);
// object

console.log(extension1?.data);
// {
//     extension_type: 'custom-extension-1',
//     extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
// }

console.log(extension1?.data.extension_properties)
// { custom_field1: 'Custom Value 1', custom_field2: 42 }

console.log(extension1?.get('extension_properties'))
// { custom_field1: 'Custom Value 1', custom_field2: 42 }


console.log('Loop over extensions:')
for (const [key, extension] of parsedExample) {
    console.log(key, extension);
}
// Loop over extensions:
// extension1 TrustedExtension {
//   data: {
//     extension_type: 'custom-extension-1',
//     extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
//   }
// }
// extension2 TrustedExtension {
//   data: {
//     extension_type: 'custom-extension-2',
//     extension_properties: { another_field: 'Another Value', numeric_field: 123 }
//   }
// }


// Using entries()
console.log("Entries:");
parsedExample.entries().forEach(([key, extension]) => {
    console.log(key, extension);
});
// Entries:
// extension1 TrustedExtension {
//   data: {
//     extension_type: 'custom-extension-1',
//     extension_properties: { custom_field1: 'Custom Value 1', custom_field2: 42 }
//   }
// }
// extension2 TrustedExtension {
//   data: {
//     extension_type: 'custom-extension-2',
//     extension_properties: { another_field: 'Another Value', numeric_field: 123 }
//   }
// }


// Using keys()
console.log("Keys:", parsedExample.keys());
// Keys: [ 'extension1', 'extension2' ]


// Using values()
console.log("Values:");
parsedExample.values().forEach(extension => {
    if (extension instanceof TrustedExtension) {
        console.log(extension.data.extension_type);
    } else {
        console.log("Unknown extension type");
    }
});
// Values:
// custom-extension-1
// custom-extension-2



// Test with undefined (optional)
const emptyExample = ExtensionsSchema.parse(undefined);
console.log("Empty example:", emptyExample);
// Empty example: TrustedExtensions { data: undefined }

console.log("Empty example keys:", emptyExample.keys());
// Empty example keys: []

console.log(String(emptyExample))
// undefined