import { z } from "zod";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from "../common/stix-type";
import { DescriptionSchema, PlatformsSchema, MitreContributorsSchema,StixCreatedByRefSchema } from '../common';
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

    description: DescriptionSchema,

    created_by_ref: StixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object."),    
    
    x_mitre_platforms: PlatformsSchema,

    x_mitre_contributors: MitreContributorsSchema,

    x_mitre_aliases: z
        .array(
            z.string(), 
            {
                invalid_type_error: "Aliases must be an array of strings."
            }
        )
        .describe("List of aliases for the given software.")
        .optional(),
        
    labels: z
        .array(
            z.string(), 
            {
                invalid_type_error: "Labels must be an array of strings."
            }
        )
        .describe("The kind(s) of tool(s) being described")
        .optional()
});

// Define the type for Tool
export type Tool = z.infer<typeof ToolSchema>;