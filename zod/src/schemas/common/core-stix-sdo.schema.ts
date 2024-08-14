import { z } from 'zod';

import { StixIdentifierSchema } from './stix-identifier';
import { StixTypeSchema } from "./stix-type";
import { StixSpecVersionSchema } from './stix-spec-version';
import { StixTimestampSchema } from './stix-timestamp';
import { StixCreatedByRefSchema, ExternalReferenceSchema, ExtensionSchema, GranularMarkingSchema } from './misc';
import { ObjectMarkingRefsSchema } from './common-properties';


export const SDOSchema = z
    .object({
        id: StixIdentifierSchema
            .describe("The id property universally and uniquely identifies this object."),
        type: StixTypeSchema,
        spec_version: StixSpecVersionSchema
            .describe("The version of the STIX specification used to represent this object."),
        created: StixTimestampSchema
            .brand("StixCreatedTimestamp")
            .describe("The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."),
        modified: StixTimestampSchema
            .brand("StixModifiedTimestamp")
            .describe("The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."),
        created_by_ref: StixCreatedByRefSchema
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
            .array(ExternalReferenceSchema)
            .describe("A list of external references which refers to non-STIX information.")
            .optional(),
        object_marking_refs: ObjectMarkingRefsSchema
            .optional(),
        granular_markings: z
            .array(GranularMarkingSchema)
            .describe("The set of granular markings that apply to this object.")
            .optional(),
        extensions: z
            .record(z.union([ExtensionSchema, z.record(z.unknown())]))
            .describe("Specifies any extensions of the object, as a dictionary.")
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

export type SDO = z.infer<typeof SDOSchema>;