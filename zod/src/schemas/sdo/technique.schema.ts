import { z } from 'zod';
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixType, StixTypeSchema } from '../common/stix-type';
import { DescriptionSchema, KillChainPhaseSchema, PlatformsSchema, AttackDomains, createStixIdentifierSchema, MitreDefenseBypassesSchema, MitrePermissionsRequiredSchema, MitreEffectivePermissionsSchema, MitreTacticTypeSchema, MitreDataSourcesSchema, MitreModifiedByRefSchema, ExternalReferenceSchema } from '../common';

// Initializes the custom ZodErrorMap
import '../../errors'; 

// read only type reference
const TECHNIQUE_TYPE: StixType = StixTypeSchema.enum['attack-pattern'];


// Technique Schema
export const TechniqueSchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(TECHNIQUE_TYPE),

    type: z.literal(TECHNIQUE_TYPE),

    // Optional in STIX but required in ATT&CK
    external_references: z
        .array(ExternalReferenceSchema)
        .min(1, "At least one external reference is required.")
        .describe("A list of external references which refers to non-STIX information."),

    kill_chain_phases: z
        .array(KillChainPhaseSchema)
        .optional(),

    description: DescriptionSchema
        .describe("The description of the object.")
        .optional(),

    x_mitre_platforms: PlatformsSchema
        .optional(),

    x_mitre_detection: z
        .string({
            invalid_type_error: "x_mitre_detection must be a string."
        })
        .describe("Strategies for identifying if a technique has been used by an adversary.")
        .optional(),

    x_mitre_is_subtechnique: z
        .boolean({
            invalid_type_error: "x_mitre_is_subtechnique must be a boolean."
        })
        .describe("If true, this attack-pattern is a sub-technique."),

    x_mitre_data_sources: MitreDataSourcesSchema
        .describe("Sources of information that may be used to identify the action or result of the action being performed.")
        .optional(),
    
    x_mitre_defense_bypassed: MitreDefenseBypassesSchema
        .optional(),

    x_mitre_contributors: z
        .array(z.string())
        .optional(),

    x_mitre_permissions_required: MitrePermissionsRequiredSchema
        .optional(),

    x_mitre_remote_support: z
        .boolean()
        .describe("If true, the technique can be used to execute something on a remote system.")
        .optional(),

    x_mitre_system_requirements: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_system_requirements must be an array of strings."
        })
        .describe("Additional information on requirements the adversary needs to meet or about the state of the system (software, patch level, etc.) that may be required for the technique to work.")
        .optional(),

    x_mitre_impact_type: z
        .array(z.enum(['Availability', 'Integrity']), {
            invalid_type_error: "x_mitre_impact_type must be an array of strings."
        })
        .describe("Denotes if the technique can be used for integrity or availability attacks.")
        .optional(),

    x_mitre_effective_permissions: MitreEffectivePermissionsSchema
        .optional(),
    
    x_mitre_network_requirements: z
        .boolean()
        .optional(),

    x_mitre_tactic_type: MitreTacticTypeSchema
        .optional(),

    x_mitre_deprecated: z
        .boolean({
            invalid_type_error: "x_mitre_deprecated must be a boolean."
        })
        .describe("Indicates whether the object has been deprecated.")
        .optional(),
    
    x_mitre_domains: z
        .array(AttackDomains)
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_modified_by_ref: MitreModifiedByRefSchema
        .optional()

})
    .required({
        created: true,
        external_references: true,
        id: true,
        modified: true,
        name: true,
        spec_version: true,
        type: true,
        x_mitre_attack_spec_version: true,
        x_mitre_domains: true,
        x_mitre_is_subtechnique: true,
        x_mitre_version: true
    })
    .superRefine((schema, ctx) => {

        // unpack properties from schema
        const {
            external_references,
            kill_chain_phases,
            x_mitre_domains,
            x_mitre_permissions_required,
            x_mitre_effective_permissions,
            x_mitre_system_requirements,
            x_mitre_defense_bypassed,
            x_mitre_remote_support,
            x_mitre_impact_type,
            x_mitre_is_subtechnique,
            x_mitre_tactic_type,
            x_mitre_data_sources
        } = schema;

        // define helper variables
        const inEnterpriseDomain = x_mitre_domains.includes(AttackDomains.enum['enterprise-attack']);
        const inMobileDomain = x_mitre_domains.includes(AttackDomains.enum['mobile-attack']);

        //==============================================================================
        // Verify that first external reference is an ATT&CK ID
        //==============================================================================

        const attackIdEntry = external_references[0];

        if (!attackIdEntry.external_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "ATT&CK ID must be defined in the first external_references entry.",
                path: ['external_references', 0, 'external_id']
            });
        } else {

            const idRegex = x_mitre_is_subtechnique ? /^T\d{4}\.\d{3}$/ : /^T\d{4}$/;

            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format ${x_mitre_is_subtechnique ? "T####.###" : "T####"}.`,
                    path: ['external_references', 0, 'external_id']
                });
            }
        }

        //==============================================================================
        // Validate Enterprise-only properties
        //==============================================================================

        const tactics = kill_chain_phases?.map(tactic => tactic.phase_name) || [];

        function validateEnterpriseOnlyField(
            fieldName: string,
            value: any,
            requiredTactic: string | null = null
        ) {
            if (value !== undefined) {
                if (!inEnterpriseDomain) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${fieldName} is only supported in the 'enterprise-attack' domain.`,
                        path: [fieldName]
                    });
                } else if (requiredTactic && kill_chain_phases !== undefined && !tactics.includes(requiredTactic)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${fieldName} is only supported in the ${requiredTactic} tactic.`,
                        path: [fieldName]
                    });
                }
            }
        }

        // Validate enterprise-only fields
        validateEnterpriseOnlyField('x_mitre_system_requirements', x_mitre_system_requirements);
        validateEnterpriseOnlyField('x_mitre_permissions_required', x_mitre_permissions_required, 'privilege-escalation');
        validateEnterpriseOnlyField('x_mitre_effective_permissions', x_mitre_effective_permissions, 'privilege-escalation');
        validateEnterpriseOnlyField('x_mitre_defense_bypassed', x_mitre_defense_bypassed, 'defense-evasion');
        validateEnterpriseOnlyField('x_mitre_remote_support', x_mitre_remote_support, 'execution');
        validateEnterpriseOnlyField('x_mitre_impact_type', x_mitre_impact_type, 'impact');

        //==============================================================================
        // Validate Mobile-only properties
        //==============================================================================

        if (x_mitre_tactic_type?.length && !inMobileDomain) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "x_mitre_tactic_type is only supported in the 'mobile-attack' domain.",
            })
        }

        if (x_mitre_data_sources && inMobileDomain) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "x_mitre_data_sources is not supported in the 'mobile-attack' domain.",
            });
        }
    });


export type Technique = z.infer<typeof TechniqueSchema>;