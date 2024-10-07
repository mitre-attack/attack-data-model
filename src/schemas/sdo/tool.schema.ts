import { z } from "zod";
import { stixTypeSchema } from "../common/stix-type";
import { softwareSchema } from "./software.schema";
import { createStixIdentifierSchema } from "../common";
import { ToolTypesOpenVocabulary } from "../common/open-vocabulary";

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors';

/////////////////////////////////////
//
// Kill Chain Phases (kill_chain_phases)
//
/////////////////////////////////////

export const killChainNameSchema = z.enum([
    "mitre-attack",
    "mitre-mobile-attack",
    "mitre-ics-attack"
]);

export const killChainPhaseSchema = z.object({
    phase_name: z
        .string({
            required_error: "Phase name is required.",
            invalid_type_error: "Phase name must be a string."
        })
        .describe("The name of the phase in the kill chain. The value of this property SHOULD be all lowercase and SHOULD use hyphens instead of spaces or underscores as word separators.")
        .refine(
            (value) => {
                // Check if the value is all lowercase
                const isLowercase = value === value.toLowerCase();

                // Check if the value uses hyphens instead of spaces or underscores
                const usesHyphens = !value.includes(' ') && !value.includes('_');

                return isLowercase && usesHyphens;
            },
            {
                message: "Phase name should be all lowercase and use hyphens instead of spaces or underscores."
            }
        ),

    kill_chain_name: killChainNameSchema
})
    .strict();

export type KillChainName = z.infer<typeof killChainNameSchema>;
export type KillChainPhase = z.infer<typeof killChainPhaseSchema>;


/////////////////////////////////////
//
// Tool Schema
//
/////////////////////////////////////

export const toolSchema = softwareSchema.extend({

    id: createStixIdentifierSchema(stixTypeSchema.enum.tool),

    type: z.literal(stixTypeSchema.enum.tool),

    // Not used in ATT&CK Tool but defined in STIX
    tool_types: z
        .array(ToolTypesOpenVocabulary)
        .optional()
        .describe('The kind(s) of tool(s) being described.'),

    // Not used in ATT&CK Tool but defined in STIX
    kill_chain_phases: z
        .array(killChainPhaseSchema)
        .optional()
        .describe('The list of kill chain phases for which this Tool can be used.'),

    // Not used in ATT&CK Tool but defined in STIX
    tool_version: z
        .string()
        .optional()
        .describe('The version identifier associated with the Tool'),
})
    .superRefine((schema, ctx) => {
        //==============================================================================
        // Validate external references
        //==============================================================================

        const {
            external_references,
        } = schema;
        const attackIdEntry = external_references[0];
        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_references entry.",
                path: ['external_references', 0, 'external_id']
            });
        } else {
            const idRegex = /^S\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format S####}.`,
                    path: ['external_references', 0, 'external_id']
                });
            }
        }

        //==============================================================================
        // Validate x_mitre_aliases
        //==============================================================================

        // The object's name MUST be listed as the first alias in the x_mitre_aliases field
        if (schema.x_mitre_aliases && schema.x_mitre_aliases.length > 0) {
            if (!(schema.x_mitre_aliases[0] === schema.name)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "The first alias must match the object's name",
                });
            }
        }
    });

// Define the type for Tool
export type Tool = z.infer<typeof toolSchema>;