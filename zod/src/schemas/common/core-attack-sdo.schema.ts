import { z } from 'zod';
import { SDOSchema } from './core-stix-sdo.schema';
import { NameSchema, StixIdentifierSchema } from '../common';

// Define the Attack Domains as a Zod enum
export const AttackDomains = z.enum([
    "enterprise-attack",
    "mobile-attack",
    "ics-attack"
]);

// Infer the type from the Zod enum
export type AttackDomain = z.infer<typeof AttackDomains>;

// Define the new properties
export const AttackCoreSDOSchema = SDOSchema.extend({
    name: NameSchema,

    x_mitre_attack_spec_version: z.string()
        .regex(/^\d+\.\d+\.\d+$/, "Must be in the format 'major.minor.patch'")
        .default("2.0.0")
        .describe("The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions."),

    x_mitre_version: z.string()
        .regex(/^\d+\.\d+$/, "Must be in the format 'major.minor'")
        .default("2.1")
        .describe("Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects."),

    x_mitre_domains: z.array(AttackDomains)
        .default([AttackDomains.Values['enterprise-attack']])
        .describe("The technology domains to which the ATT&CK object belongs."),

    x_mitre_deprecated: z.boolean()
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    x_mitre_modified_by_ref: StixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
});

// Define the type for the ATT&CK Core SDO
export type AttackCoreSDO = z.infer<typeof AttackCoreSDOSchema>;