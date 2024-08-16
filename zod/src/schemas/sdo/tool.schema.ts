import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { SoftwareSchema } from "./software.schema";
import { createStixIdentifierSchema, KillChainPhaseSchema, PlatformsSchema, StixCreatedByRefSchema } from "../common";
import { ToolTypesOpenVocabulary } from "../common/open-vocabulary";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 


// Tool Schema
export const ToolSchema = SoftwareSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.tool),

    type: z.literal(StixTypeSchema.enum.tool),

    // Not used in ATT&CK Tool but defined in STIX
    tool_types: z
        .array(ToolTypesOpenVocabulary)
        .optional()
        .describe('The kind(s) of tool(s) being described.'),

    // Not used in ATT&CK Tool but defined in STIX
    kill_chain_phases: z
        .array(KillChainPhaseSchema)
        .optional()
        .describe('The list of kill chain phases for which this Tool can be used.'),
    
    // Not used in ATT&CK Tool but defined in STIX
    tool_version: z
        .string()
        .optional()
        .describe('The version identifier associated with the Tool'),
})
.refine(schemas => {
    // The object's name MUST be listed as the first alias in the x_mitre_aliases field
        if (schemas.x_mitre_aliases && schemas.x_mitre_aliases.length > 0) {
            return schemas.x_mitre_aliases[0] === schemas.name;
        }
        return true;
    },
    {
        message: "The first alias must match the object's name",
        path: ['x_mitre_aliases']
    });

// Define the type for Malware
export type Tool = z.infer<typeof ToolSchema>;