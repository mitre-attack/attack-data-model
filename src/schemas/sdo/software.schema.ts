import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object.js";
import { descriptionSchema, xMitrePlatformsSchema, stixCreatedByRefSchema, objectMarkingRefsSchema, xMitreDomainsSchema, aliasesSchema, xMitreModifiedByRefSchema, externalReferencesSchema, stixTypeSchema } from '../common/index.js';

// Initializes the custom ZodErrorMap
// TODO migrate to loading this in a globally scoped module
import '../../errors';

/////////////////////////////////////
//
// Software Schema
//
/////////////////////////////////////

export const softwareSchema = attackBaseObjectSchema.extend({

    type: z.union([
        z.literal(stixTypeSchema.enum.malware),
        z.literal(stixTypeSchema.enum.tool)
    ]),

    created_by_ref: stixCreatedByRefSchema
        .describe("The ID of the Source object that describes who created this object."),

    description: descriptionSchema,

    external_references: externalReferencesSchema,

    object_marking_refs: objectMarkingRefsSchema,

    // Malware: Required
    // Tool: Optional
    x_mitre_platforms: xMitrePlatformsSchema
        .optional(),

    x_mitre_contributors: z
        .array(z.string())
        .optional(),

    x_mitre_aliases: aliasesSchema
        .describe("Alternative names used to identify this software. The first alias must match the object's name.")
        .optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_domains: xMitreDomainsSchema,

    // Not used in ATT&CK Malware or Tool but defined in STIX
    aliases: aliasesSchema
        .optional()
        .describe("Alternative names used to identify this software."),

});

// Define the type for Software
export type Software = z.infer<typeof softwareSchema>;