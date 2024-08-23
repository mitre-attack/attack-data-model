import { z } from 'zod';

import { stixIdentifierSchema } from './stix-identifier';
import { stixTypeSchema } from "./stix-type";
import { stixSpecVersionSchema } from './stix-spec-version';
import { stixCreatedTimestampSchema, stixModifiedTimestampSchema } from './stix-timestamp';
import { stixCreatedByRefSchema, externalReferenceSchema, granularMarkingSchema, extensionsSchema } from './misc';
import { objectMarkingRefsSchema } from './common-properties';


export const stixDomainObjectSchema = z
    .object({
        id: stixIdentifierSchema
            .describe("The id property universally and uniquely identifies this object."),
        type: stixTypeSchema,
        spec_version: stixSpecVersionSchema
            .describe("The version of the STIX specification used to represent this object."),
        created: stixCreatedTimestampSchema
            .describe("The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."),
        modified: stixModifiedTimestampSchema
            .describe("The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."),
        created_by_ref: stixCreatedByRefSchema
            .describe("The created_by_ref property specifies the id property of the identity object that describes the entity that created this object. If this attribute is omitted, the source of this information is undefined. This may be used by object creators who wish to remain anonymous.")
            .optional(),
        labels: z
            .array(z.string())
            .describe("The labels property specifies a set of terms used to describe this object.")
            .optional(),
        revoked: z
            .boolean()
            .describe("The revoked property indicates whether the object has been revoked.")
            .optional(),
        confidence: z
            .number()
            .describe("Identifies the confidence that the creator has in the correctness of their data.")
            .int().min(1).max(99).optional()
            .refine(val => val === undefined || (val > 0 && val < 100), {
                message: "Confidence must be between 1 and 99 inclusive."
            })
            .optional(),
        lang: z
            .string()
            .describe("Identifies the language of the text content in this object.")
            .optional(),
        external_references: z
            .array(externalReferenceSchema)
            .describe("A list of external references which refers to non-STIX information.")
            .optional(),
        object_marking_refs: objectMarkingRefsSchema
            .optional(),
        granular_markings: z
            .array(granularMarkingSchema)
            .describe("The set of granular markings that apply to this object.")
            .optional(),
        extensions: extensionsSchema
            .optional(),
    })
    // Specify which properties to make required:
    .required({
        id: true,
        type: true,
        spec_version: true,
        created: true,
        modified: true,
    })
    // Disallow unknown keys. If there are any unknown keys in the input, Zod will throw an error.
    .strict();

export type SDO = z.infer<typeof stixDomainObjectSchema>;