import { z } from 'zod';
import { StixIdentifier, stixIdentifierSchema } from './stix-identifier';


/////////////////////////////////////
//
// Version
// (version)
//
/////////////////////////////////////

export const versionSchema = z.string()
    .regex(/^\d+\.\d+$/, "Version must be in the format 'major.minor'")
    .default("2.1")
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type Version = z.infer<typeof versionSchema>;


/////////////////////////////////////
//
// Name 
// (name)
//
/////////////////////////////////////

export const nameSchema = z
    .string()
    .min(1, "Name must not be empty")
    .describe("The name of the object.");

export type Name = z.infer<typeof nameSchema>;


/////////////////////////////////////
//
// Description 
// (description)
//
/////////////////////////////////////

export const descriptionSchema = z
    .string()
    .describe("A description of the object.");

export type Description = z.infer<typeof descriptionSchema>;


/////////////////////////////////////
//
// Aliases 
// (aliases)
//
/////////////////////////////////////

export const aliasesSchema = z
    .array(z.string(), {
        invalid_type_error: "Aliases must be an array of strings."
    })
    .describe("Alternative names used to identify this object. The first alias must match the object's name.");

export type Aliases = z.infer<typeof aliasesSchema>;


/////////////////////////////////////
//
// MITRE Version 
// (x_mitre_version)
//
/////////////////////////////////////

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type OneToTwoDigits = `${Digit}` | `${Digit}${Digit}`;

type MitreVersion = `${OneToTwoDigits}.${OneToTwoDigits}`;

const majorMinorVersionRegex = /^(\d{1,3})\.(\d{1,3})$/;

export const xMitreVersionSchema = z
    .custom<MitreVersion>()
    .refine(
        (value): value is MitreVersion => {
            if (!majorMinorVersionRegex.test(value)) return false;
            const [major, minor] = value.split('.').map(Number);
            return Number.isInteger(major) && Number.isInteger(minor) &&
                major >= 0 && major <= 99 && minor >= 0 && minor <= 99;
        },
        {
            message: "The version must be in the format 'M.N' where M and N are integers between 0 and 99"
        }
    )
    .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.");

export type XMitreVersion = z.infer<typeof xMitreVersionSchema>;


/////////////////////////////////////
//
// MITRE ATT&CK Spec Version 
// (x_mitre_attack_spec_version)
//
/////////////////////////////////////

type VersionNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type MitreAttackSpecVersion = `${VersionNumber}.${VersionNumber}.${VersionNumber}`;

const majorMinorPatchVersionRegex = /^[0-9]\.[0-9]\.[0-9]$/;

export const xMitreAttackSpecVersionSchema = z
    .string()
    .refine(
        (value): value is MitreAttackSpecVersion => {
            if (!majorMinorPatchVersionRegex.test(value)) return false;
            const [major, minor, patch] = value.split('.').map(Number);
            return (
                major >= 0 && major <= 9 &&
                minor >= 0 && minor <= 9 &&
                patch >= 0 && patch <= 9
            );
        },
        {
            message: "Must be in the format 'M.N.P' where M, N, and P are single-digit integers (0-9)"
        }
    )
    .describe("The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.");

export type XMitreAttackSpecVersion = z.infer<typeof xMitreAttackSpecVersionSchema>;

/////////////////////////////////////
//
// MITRE Old ATT&CK ID 
// (x_mitre_old_attack_id)
//
/////////////////////////////////////

// e.g., "MOB-M1008", "MOB-S0012"
type MitreOldAttackId = `MOB-${'M' | 'S'}${number}`;

const oldAttackIdRegex = /^MOB-(M|S)\d{4}$/;

export const xMitreOldAttackIdSchema = z
    .string()
    .refine(
        (value): value is MitreOldAttackId => {
            return oldAttackIdRegex.test(value);
        },
        {
            message: "Must be in the format 'MOB-X0000' where X is either 'M' or 'S', followed by exactly four digits"
        }
    )
    .describe("Old ATT&CK IDs that may have been associated with this object");

export type XMitreOldAttackId = z.infer<typeof xMitreOldAttackIdSchema>;


/////////////////////////////////////
//
// MITRE Domains 
// (x_mitre_domains)
//
/////////////////////////////////////

export const attackDomainSchema = z.enum([
    "enterprise-attack",
    "mobile-attack",
    "ics-attack"
]);

export type AttackDomain = z.infer<typeof attackDomainSchema>;

export const xMitreDomainsSchema = z
    .array(attackDomainSchema)
    .min(1, {
        message: "At least one MITRE ATT&CK domain must be specified."
    })
    .describe("The technology domains to which the ATT&CK object belongs.");

export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;


/////////////////////////////////////
//
// MITRE Deprecated 
// (x_mitre_deprecated)
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
// MITRE Platforms 
// (x_mitre_platforms)
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
// Object Marking Reference 
// (object_marking_refs)
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
// MITRE Contributors 
// (x_mitre_contributors)
//
/////////////////////////////////////

export const xMitreContributorsSchema = z
    .array(z.string())
    .describe("People and organizations who have contributed to the object. Not found on relationship objects.")

export type XMitreContributors = z.infer<typeof xMitreContributorsSchema>;


/////////////////////////////////////
//
// MITRE Modified By Ref 
// (x_mitre_modified_by_ref)
//
/////////////////////////////////////

export const xMitreIdentity: StixIdentifier = "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as const;

export const xMitreModifiedByRefSchema = stixIdentifierSchema
    .refine(val => val == xMitreIdentity)
    .describe("The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.");

export type XMitreModifiedByRef = z.infer<typeof xMitreModifiedByRefSchema>;