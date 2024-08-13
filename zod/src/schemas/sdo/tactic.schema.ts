import { z } from "zod";
import { AttackCoreSDOSchema, AttackDomains, DescriptionSchema, MitreContributorsSchema, ObjectMarkingRefsSchema, StixIdentifierSchema } from "../common";
import { StixTypeSchema } from "../common/stix-type";

// Initializes the custom ZodErrorMap
import '../../errors'; 

// Tactic Schema
export const TacticSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum["x-mitre-tactic"], {
        message: `'type' property must be equal to ${StixTypeSchema.enum["x-mitre-tactic"]}`
    }),

    description: DescriptionSchema
        .describe("The description of the object.")
        .optional(),

    object_marking_refs: ObjectMarkingRefsSchema,

    x_mitre_domains: z
        .array(AttackDomains)
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_contributors: MitreContributorsSchema
        .optional(),

    x_mitre_deprecated: z
        .boolean({
            invalid_type_error: "x_mitre_deprecated must be a boolean."
        })
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    x_mitre_shortname: z
        .string()
        .describe("	The tactic shortname is used for mapping techniques into the tactic. It corresponds to kill_chain_phases.phase_name of the techniques in the tactic."),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
})
.required({
    name: true,
    type: true,
    x_mitre_version: true,
    x_mitre_domains: true,
    x_mitre_shortname: true,
})
.superRefine(({external_references}, ctx) => {
    // ATT&CK ID format
    if (!external_references?.length) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one external_reference must be specified."
        });
    } else {
        let attackIdEntry = external_references[0];
        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_references entry.",
            });
        } else {
            let idRegex = /TA\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format "TA####"}.`
                });
            }
        }
    }
});

export type Tactic = z.infer<typeof TacticSchema>;