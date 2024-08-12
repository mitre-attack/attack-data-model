import { z } from 'zod';
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { StixTypeSchema } from '../common/stix-type';
import { MitreContributorsSchema, DescriptionSchema, KillChainPhaseSchema, PlatformsSchema, AttackDomains, StixIdentifierSchema } from '../common';

// Initializes the custom ZodErrorMap
import '../../errors'; 

export const MobileTacticTypes = z.enum([
    "Post-Adversary Device Access",
    "Pre-Adversary Device Access",
    "Without Adversary Device Access"
]);

export type MobileTacticType = z.infer<typeof MobileTacticTypes>;

// Technique Schema
export const TechniqueSchema = AttackCoreSDOSchema.extend({
    type: z.literal(StixTypeSchema.enum['attack-pattern'], {
        message: `'type' property must be equal to ${StixTypeSchema.enum['attack-pattern']}`
    }),

    kill_chain_phases: z.array(KillChainPhaseSchema),

    description: DescriptionSchema
        .describe("The description of the object.")
        .optional(),

    x_mitre_platforms: PlatformsSchema,

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

    x_mitre_data_sources: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_data_sources must be an array of strings."
        })
        .describe("Sources of information that may be used to identify the action or result of the action being performed.")
        .optional(),
    
    x_mitre_defense_bypassed: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_defense_bypass must be an array of strings."
        })
        .describe("List of defensive tools, methodologies, or processes the technique can bypass.")
        .optional(),

    x_mitre_contributors: MitreContributorsSchema,

    x_mitre_permissions_required: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_permissions_required must be an array of strings."
        })
        .describe("The lowest level of permissions the adversary is required to be operating within to perform the technique on a system.")
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
        .array(z.string(), {
            invalid_type_error: "x_mitre_impact_type must be an array of strings."
        })
        .describe("Denotes if the technique can be used for integrity or availability attacks.")
        .optional(),

    x_mitre_effective_permissions: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_effective_permissions must be an array of strings."
        })
        .describe("The level of permissions the adversary will attain by performing the technique.")
        .optional(),
    
    x_mitre_network_requirements: z
        .array(z.string(), {
            invalid_type_error: "x_mitre_network_requirements must be an array of strings."
        })
        .optional(),

    x_mitre_tactic_type: z
        .array(MobileTacticTypes)
        .describe("'Post-Adversary Device Access', 'Pre-Adversary Device Access', or 'Without Adversary Device Access'.")
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

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
})
.required({
    name: true,
    type: true,
    kill_chain_phases: true,
    x_mitre_version: true,
    x_mitre_domains: true,
    x_mitre_is_subtechnique: true,
})
// validate common fields
.superRefine(({external_references, x_mitre_is_subtechnique}, ctx) => {
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
            let idRegex = x_mitre_is_subtechnique ? /T\d{4}\.\d{3}$/ : /T\d{4}$/;
            if (!idRegex.test(attackIdEntry.external_id)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The first external_reference must match the ATT&CK ID format ${x_mitre_is_subtechnique ? "T####.###" : "T####"}.`
                });
            }
        }
    }
})
// validate Enterprise only fields
.superRefine(({x_mitre_domains,
               kill_chain_phases,
               x_mitre_system_requirements,
               x_mitre_permissions_required,
               x_mitre_effective_permissions,
               x_mitre_defense_bypassed,
               x_mitre_remote_support,
               x_mitre_impact_type,
              }, ctx) => {
    let enterpriseDomain = AttackDomains.enum['enterprise-attack'];

    // helper functions/variables
    let tactics = function() {
        return kill_chain_phases.map(tactic => tactic.phase_name);
    };
    let hasValidDomain = x_mitre_domains.includes(enterpriseDomain);
    let inPrivilegeEscalationTactic = tactics().includes('privilege-escalation');
    let inDefenseEvasionTactic = tactics().includes('defense-evasion');
    let inExecutionTactic = tactics().includes('execution');
    let inImpactTactic = tactics().includes('impact');

    // x_mitre_system_requirements
    if (x_mitre_system_requirements?.length && !hasValidDomain) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_system_requirements is only supported in the 'enterprise-attack' domain.",
        });
    }

    // x_mitre_permissions_required
    if (x_mitre_permissions_required?.length && !hasValidDomain && !inPrivilegeEscalationTactic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_permissions_required is only supported in the 'enterprise-attack' domain in the Privilege Escalation tactic.",
        });
    }

    // x_mitre_effective_permissions
    if (x_mitre_effective_permissions?.length && !hasValidDomain && !inPrivilegeEscalationTactic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_effective_permissions is only supported in the 'enterprise-attack' domain in the Privilege Escalation tactic.",
        });
    }

    // x_mitre_defense_bypassed
    if (x_mitre_defense_bypassed?.length && !hasValidDomain && !inDefenseEvasionTactic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_defense_bypassed is only supported in the 'enterprise-attack' domain in the Defense Evasion tactic.",
        });
    }

    // x_mitre_remote_support
    if (x_mitre_remote_support !== undefined && !hasValidDomain && !inExecutionTactic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_remote_support is only supported in the 'enterprise-attack' domain in the Execution tactic.",
        });
    }

    // x_mitre_impact_type
    if (x_mitre_impact_type?.length && !hasValidDomain && !inImpactTactic) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_impact_type is only supported in the 'enterprise-attack' domain in the Impact tactic.",
        });
    }
})
// validate Mobile only fields
.superRefine(({x_mitre_domains, x_mitre_tactic_type}, ctx) => {
    let mobileDomain = AttackDomains.enum['mobile-attack'];

    // 'x_mitre_tactic_type' can only be populated for Mobile
    let hasValidDomain = x_mitre_domains.includes(mobileDomain);
    if (x_mitre_tactic_type?.length && !hasValidDomain) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_tactic_type is only supported in the 'mobile-attack' domain.",
        })
    }
})
// validate multi-domain fields
.superRefine(({x_mitre_domains, x_mitre_data_sources}, ctx) => {
    let validDomains = ['enterprise-attack', 'ics-attack'];
    let hasValidDomain = x_mitre_domains.some(d => validDomains.includes(d));
    if (x_mitre_data_sources?.length && !hasValidDomain) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "x_mitre_data_sources is not supported in the 'mobile-attack' domain.",
        });
    }
});

export type Technique = z.infer<typeof TechniqueSchema>;