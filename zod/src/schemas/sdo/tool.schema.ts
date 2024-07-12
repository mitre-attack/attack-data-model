import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { VersionSchema, NameSchema, DescriptionSchema, StixIdentifierSchema } from '../common';
import { StixIdentifierImpl } from "../../classes/stix-identifier.cls";

// Custom error messages
const ToolError = {
    InvalidVersion: {
        code: z.ZodIssueCode.custom,
        message: "Tool version must be a valid semantic version string",
    },
    // Add more custom error messages as needed
};

// Tool Schema
export const ToolSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum.tool, {
        message: `'type' property must be equal to ${StixTypeSchema.enum.tool}`
    }),

    id: z.string().refine(
        id => {
            const parsedId = new StixIdentifierImpl(id);
            return parsedId.type === "tool"
        },
        { message: "The 'id' property must be of type 'tool'" }
    ),

    description: DescriptionSchema
    // Add more fields specific to Tool...
});

// Define the type for Tool
export type Tool = z.infer<typeof ToolSchema>;

//created_by_ref is required
//x_mitre_platforms
//x_mitre_contributors
//x_mitre_aliases