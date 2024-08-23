import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { descriptionSchema, xMitrePlatformsSchema, stixCreatedByRefSchema, stixIdentifierSchema, externalReferenceSchema, objectMarkingRefsSchema, xMitreDomainsSchema } from '../common';

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors'; 


// Software Schema
export const softwareSchema = attackBaseObjectSchema.extend({

    // Not used in ATT&CK Malware or Tool but defined in STIX
    aliases: z
        .array(z.string())
        .optional()
        .describe("Alternative names used to identify this software."),

    // Even though this is defined as an optional field within the Core STIX SDO schema, it is required for Software.
    // TODO Fix created_by_ref in Darkmoon (malware--310f437b-29e7-4844-848c-7220868d074a) before making this required.
    created_by_ref: stixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object."),

    description: descriptionSchema,

    external_references: z
        .array(externalReferenceSchema)
        .describe("A list of external references which refers to non-STIX information."),

    object_marking_refs: objectMarkingRefsSchema
    ,

    // Malware: Required
    // Tool: Optional
    x_mitre_platforms: xMitrePlatformsSchema
        .optional(),

    x_mitre_contributors: z
        .array(z.string())
        .optional(),

    x_mitre_aliases: z
        .array(
            z.string(),
            {
                invalid_type_error: "Aliases must be an array of strings."
            }
        )
        .describe("Alternative names used to identify this software. The first alias must match the object's name.")
        .optional(),
    
    x_mitre_deprecated: z
        .boolean()
        .describe("Indicates whether the object has been deprecated.")
        .optional(),

    x_mitre_modified_by_ref: stixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
    
    x_mitre_domains: xMitreDomainsSchema,
});

// Define the type for Software
export type Software = z.infer<typeof softwareSchema>;