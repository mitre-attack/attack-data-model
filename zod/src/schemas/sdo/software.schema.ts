import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { VersionSchema, NameSchema, DescriptionSchema } from '../common';

// Custom error messages
const SoftwareError = {
    InvalidVersion: {
        code: z.ZodIssueCode.custom,
        message: "Software version must be a valid semantic version string",
    },
    // Add more custom error messages as needed
};

// Software Schema
export const SoftwareSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum.tool, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.tool}`
    }),

    version: VersionSchema.optional(),

    // Add more fields specific to software...
});

// Define the type for Software
export type Software = z.infer<typeof SoftwareSchema>;