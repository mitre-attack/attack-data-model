import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { SoftwareSchema } from "./software.schema";
import { createStixIdentifierSchema, KillChainPhaseSchema, StixCreatedByRefSchema } from "../common";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 


// Tool Schema
export const ToolSchema = SoftwareSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.tool),

    type: z.literal(StixTypeSchema.enum.tool),

    tool_types: z
        .array(z.string())
        .optional()
        .describe('The kind(s) of tool(s) being described.'),

    aliases: z
        .array(z.string())
        .optional()
        .describe("Alternative names used to identify this Campaign."),

    kill_chain_phases: z.
        array(KillChainPhaseSchema)
        .optional()
        .describe('The list of kill chain phases for which this Tool can be used.'),

    tool_version: z
        .string()
        .optional()
        .describe('The version identifier associated with the Tool')

});

// Define the type for Malware
export type Tool = z.infer<typeof ToolSchema>;