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

    id: createStixIdentifierSchema(StixTypeSchema.enum.tool),


    created_by_ref: StixCreatedByRefSchema
    .describe("The ID of the Source object that describes who created this object.")

});

// Define the type for Malware
export type Tool = z.infer<typeof ToolSchema>;