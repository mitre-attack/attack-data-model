import { z } from 'zod';
import { stixDomainObjectSchema } from './sdo';
import { nameSchema } from '.';

// Define the new properties
export const attackBaseObjectSchema = stixDomainObjectSchema.extend({
    name: nameSchema,

    x_mitre_attack_spec_version: z
        .string()
        .regex(/^\d+\.\d+\.\d+$/, "Must be in the format 'major.minor.patch'")
        .describe("The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."),

    x_mitre_version: z
        .string()
        .regex(/^\d+\.\d+$/, "Must be in the format 'major.minor'")
        .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects."),

    x_mitre_old_attack_id: z
        .string()
        .describe("Old ATT&CK IDs that may have been associated with this object")
        .optional(),
});

// Define the type for the ATT&CK Core SDO
export type AttackBaseObject = z.infer<typeof attackBaseObjectSchema>;