import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";

// Custom error messages
const SchemaNameError = {
    InvalidFormat: {
        code: z.ZodIssueCode.custom,
        message: "Custom error message for invalid format",
    },
    // Add more custom error messages as needed
};

// SchemaName Schema
export const SchemaNameSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum.schemaType, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.schemaType}`
    }),

    // Add additional fields specific to this schema
    // Example:
    // field_name: z.string().describe("Description of the field"),

    // Example of a field with custom validation:
    // custom_field: z.string().refine(
    //     (val) => {
    //         // Custom validation logic
    //         return true; // or false if validation fails
    //     },
    //     {
    //         message: "Custom error message for failed validation",
    //     }
    // ),

    // Example of an optional field with a default value:
    // optional_field: z.number().default(0).describe("Optional field with default value"),

    // Example of an enum field:
    // enum_field: z.enum(["value1", "value2", "value3"]).describe("Enum field"),

    // Add more fields as needed...
});

// Define the type for SchemaName
export type SchemaName = z.infer<typeof SchemaNameSchema>;