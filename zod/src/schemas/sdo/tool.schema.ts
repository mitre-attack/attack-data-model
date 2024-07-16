import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { StixIdentifierImpl } from "../../classes/stix-identifier.cls";
import { SoftwareSchema } from "./software.schema";
import { StixCreatedByRefSchema } from "../common";

// Custom error messages
const ToolError = {
    InvalidVersion: {
        code: z.ZodIssueCode.custom,
        message: "Malware version must be a valid semantic version string",
    },
    // Add more custom error messages as needed
};

// Tool Schema
export const ToolSchema = SoftwareSchema.extend({
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

    created_by_ref: StixCreatedByRefSchema
    .describe("The ID of the Source object that describes who created this object.")

});

// Define the type for Malware
export type Tool = z.infer<typeof ToolSchema>;