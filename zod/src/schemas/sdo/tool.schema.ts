import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { SoftwareSchema } from "./software.schema";
import { createStixIdentifierSchema, KillChainPhaseSchema, StixCreatedByRefSchema } from "../common";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 
export const toolTypes = z.enum([
    'denial-of-service',
    'exploitation',
    'information-gathering',
    'network-capture',
    'credential-exploitation',
    'remote-access',
    'vulnerability-scanning',
    'unknown'
]);

// Tool Schema
export const ToolSchema = SoftwareSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.tool),

    type: z.literal(StixTypeSchema.enum.tool),

    created_by_ref: StixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object."),

    tool_types: z
        .array(toolTypes)
        .optional()
        .describe('The kind(s) of tool(s) being described.'),

    // Not used in ATT&CK Tool but defined in STIX
    aliases: z
        .array(z.string())
        .optional()
        .describe("Alternative names used to identify this Campaign."),

    // Not used in ATT&CK Tool but defined in STIX
    kill_chain_phases: z
        .array(KillChainPhaseSchema)
        .optional()
        .describe('The list of kill chain phases for which this Tool can be used.'),
    
    // Not used in ATT&CK Tool but defined in STIX
    tool_version: z
        .string()
        .optional()
        .describe('The version identifier associated with the Tool')

});

// Define the type for Malware
export type Tool = z.infer<typeof ToolSchema>;