import { z } from 'zod';
import { Z } from 'zod-class';

import { StixIdentifierSchema } from '../../schemas/common/stix-identifier';
import { StixTypeSchema } from "../../schemas/common/stix-type";
import { StixSpecVersionSchema } from '../../schemas/common/stix-spec-version';
import { StixTimestampSchema } from '../../schemas/common/stix-timestamp';
import { StixCreatedByRefSchema, ExternalReferenceSchema, ExtensionSchema, GranularMarkingSchema } from '../../schemas/common/misc';
import { ObjectMarkingRefsSchema } from '../../schemas/common';


export class SDO extends Z.class({

    id: StixIdentifierSchema
        .describe("The id property universally and uniquely identifies this object."),
    type: StixTypeSchema,
    spec_version: StixSpecVersionSchema
        .describe("The version of the STIX specification used to represent this object."),
    created: StixTimestampSchema
        // .brand("StixCreatedTimestamp")
        .describe("The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond."),
    modified: StixTimestampSchema
        // .brand("StixModifiedTimestamp")
        .describe("The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond."),
    created_by_ref: StixCreatedByRefSchema,
    // .describe("The ID of the Source object that describes who created this object.")
    // .optional(),
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
        }),
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
}) { }