import { z } from 'zod';

export const VersionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof VersionSchema>;

// Add more common property schemas here as needed
// For example:

export const NameSchema = z.string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof NameSchema>;

export const DescriptionSchema = z.string()
    .describe("A description of the object.");

export type Description = z.infer<typeof DescriptionSchema>;

// ... other common properties ...