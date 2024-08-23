import { z } from "zod";
import { attackBaseObjectSchema, createStixIdentifierSchema, descriptionSchema, externalReferenceSchema, xMitreDeprecatedSchema, xMitreModifiedByRefSchema, xMitreShortNameSchema, objectMarkingRefsSchema, stixCreatedByRefSchema, stixIdentifierSchema, xMitreDomainsSchema } from "../common";
import { stixTypeSchema } from "../common/stix-type";

// Initializes the custom ZodErrorMap
import '../../errors'; 

// Tactic Schema
export const tacticSchema = attackBaseObjectSchema.extend({

    id: createStixIdentifierSchema(stixTypeSchema.enum["x-mitre-tactic"]),

    type: z.literal(stixTypeSchema.enum["x-mitre-tactic"]),

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema
        .describe("The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous."),

    // Optional in STIX but required in ATT&CK
    external_references: z
        .array(externalReferenceSchema)
        .describe("A list of external references which refers to non-STIX information."),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_deprecated: xMitreDeprecatedSchema
        .optional(),

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
    .superRefine((schema, ctx) => {

        // Destructure relevant properties from the schema
        const { external_references } = schema;

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
                    message: `The first external_reference must match the ATT&CK ID format "TA####"}.`
                });
            }
        }
    });

export type Tactic = z.infer<typeof tacticSchema>;