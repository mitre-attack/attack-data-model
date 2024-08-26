import { z } from 'zod';
import { StixIdentifier, stixIdentifierSchema } from './stix-identifier';


/////////////////////////////////////
//
// Version
//
/////////////////////////////////////

export const versionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof versionSchema>;


/////////////////////////////////////
//
// Name (name)
//
/////////////////////////////////////

export const nameSchema = z
    .string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof nameSchema>;


/////////////////////////////////////
//
// Description (description)
//
/////////////////////////////////////

export const descriptionSchema = z
    .string()
    .describe("A description of the object.");

export type Description = z.infer<typeof descriptionSchema>;


/////////////////////////////////////
//
// MITRE Domains (x_mitre_domains)
//
/////////////////////////////////////

export const attackDomainSchema = z.enum([
    "enterprise-attack",
    "mobile-attack",
    "ics-attack"
]);

export const xMitreDomainsSchema = z
    .array(attackDomainSchema)
    .min(1, {
        message: "At least one MITRE ATT&CK domain must be specified."
    })
    .describe("The technology domains to which the ATT&CK object belongs.");

export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;


/////////////////////////////////////
//
// MITRE Deprecated (x_mitre_deprecated)
//
/////////////////////////////////////

export const xMitreDeprecatedSchema = z
    .boolean({
        invalid_type_error: "x_mitre_deprecated must be a boolean."
    })
    .describe("Indicates whether the object has been deprecated.")

export type XMitreDeprecated = z.infer<typeof xMitreDeprecatedSchema>;


/////////////////////////////////////
//
// MITRE Platforms (x_mitre_platforms)
//
/////////////////////////////////////

const supportedMitrePlatforms = [
    'Field Controller/RTU/PLC/IED',
    'Network',
    'Data Historian',
    'Google Workspace',
    'Office 365',
    'Containers',
    'Azure AD',
    'Engineering Workstation',
    'Control Server',
    'Human-Machine Interface',
    'Windows',
    'Linux',
    'IaaS',
    'None',
    'iOS',
    'PRE',
    'SaaS',
    'Input/Output Server',
    'macOS',
    'Android',
    'Safety Instrumented System/Protection Relay',
    'Embedded'
] as const;

export const xMitrePlatformsSchema = z
    .array(
        z.enum(supportedMitrePlatforms),
        {
            invalid_type_error: "x_mitre_platforms must be an array of strings.",
            message: "x_mitre_platforms may only contain values from the following list: " + supportedMitrePlatforms.join(', ')
        }
    )
    .min(1)
    .refine(
        (items) => new Set(items).size === items.length,
        {
            message: "Platforms must be unique (no duplicates allowed)."
        }
    )
    .describe("List of platforms that apply to the object.");

export type XMitrePlatforms = z.infer<typeof xMitrePlatformsSchema>;




/////////////////////////////////////
//
// Object Marking Reference (object_marking_refs)
//
/////////////////////////////////////

export const objectMarkingRefsSchema = z
    .array(stixIdentifierSchema)
    .superRefine((val, ctx) => {
        val.forEach((identifier, index) => {
            if (!identifier.startsWith('marking-definition--')) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `All identifiers must start with 'marking-definition--'. Invalid identifier at index ${index}.`,
                    path: [index],
                });
            }
        });
    })
    .describe("The list of marking-definition objects to be applied to this object.");

export type ObjectMarkingRefs = z.infer<typeof objectMarkingRefsSchema>;


/////////////////////////////////////
//
// MITRE Contributors (x_mitre_contributors)
//
/////////////////////////////////////

export const xMitreContributorsSchema = z
    .array(z.string())
    .describe("People and organizations who have contributed to the object. Not found on relationship objects.")

export type XMitreContributors = z.infer<typeof xMitreContributorsSchema>;


/////////////////////////////////////
//
// MITRE Modified By Ref (x_mitre_modified_by_ref)
//
/////////////////////////////////////

export const xMitreIdentity: StixIdentifier = "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as const;

export const xMitreModifiedByRefSchema = stixIdentifierSchema
    .refine(val => val == xMitreIdentity)
    .describe("The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.");
