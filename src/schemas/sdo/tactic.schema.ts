import { z } from "zod";
import { attackBaseObjectSchema, createStixIdentifierSchema, descriptionSchema, externalReferenceSchema, xMitreDeprecatedSchema, xMitreModifiedByRefSchema, objectMarkingRefsSchema, stixCreatedByRefSchema, stixIdentifierSchema, xMitreDomainsSchema, externalReferencesSchema } from "../common";
import { stixTypeSchema } from "../common/stix-type";

// Initializes the custom ZodErrorMap
import '../../errors'; 


/////////////////////////////////////
//
// MITRE Shortname (x_mitre_shortname)
//
/////////////////////////////////////

const supportedMitreShortNames = [
    'credential-access',
    'execution',
    'impact',
    'persistence',
    'privilege-escalation',
    'lateral-movement',
    'defense-evasion',
    'exfiltration',
    'discovery',
    'collection',
    'resource-development',
    'reconnaissance',
    'command-and-control',
    'initial-access',
    'inhibit-response-function',
    'privilege-escalation',
    'lateral-movement',
    'discovery',
    'initial-access',
    'impact',
    'persistence',
    'execution',
    'command-and-control',
    'collection',
    'evasion',
    'impair-process-control',
    'initial-access',
    'exfiltration',
    'persistence',
    'privilege-escalation',
    'command-and-control',
    'execution',
    'impact',
    'credential-access',
    'collection',
    'lateral-movement',
    'defense-evasion',
    'network-effects',
    'discovery',
    'remote-service-effects'
] as const;

export const xMitreShortNameSchema = z
    .enum(supportedMitreShortNames)
    .describe("The x_mitre_shortname of the tactic is used for mapping techniques into the tactic. It corresponds to kill_chain_phases.phase_name of the techniques in the tactic.");

export type XMitreShortName = z.infer<typeof xMitreShortNameSchema>;


/////////////////////////////////////
//
// Tactic ID
//
/////////////////////////////////////

const tacticIdSchema = createStixIdentifierSchema('x-mitre-tactic');
export type TacticId = z.infer<typeof tacticIdSchema>; // Will be "x-mitre-tactic--${string}"


/////////////////////////////////////
//
// MITRE Tactic
//
/////////////////////////////////////

export const tacticSchema = attackBaseObjectSchema.extend({

    id: tacticIdSchema,

    type: z.literal(stixTypeSchema.enum["x-mitre-tactic"]),

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_shortname: xMitreShortNameSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema
})
    .required({
        created: true,
        created_by_ref: true,
        description: true,
        external_references: true,
        id: true,
        modified: true,
        name: true,
        object_marking_refs: true,
        spec_version: true,
        type: true,
        x_mitre_attack_spec_version: true,
        x_mitre_domains: true,
        x_mitre_modified_by_ref: true,
        x_mitre_shortname: true,
        x_mitre_version: true,
    })
    .strict()
    .superRefine((schema, ctx) => {

        // Destructure relevant properties from the schema
        const { external_references } = schema;

        //==============================================================================
        // Validate external references
        //==============================================================================

        // Verify that first external reference is an ATT&CK ID
        const attackIdEntry = external_references[0];
        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_references entry.",
                path: ['external_references', 0, 'external_id']
            });
        } else {
            // Check if the ATT&CK ID format is correct
            const idRegex = /TA\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format TA####}.`
                });
            }
        }
    });

export type Tactic = z.infer<typeof tacticSchema>;