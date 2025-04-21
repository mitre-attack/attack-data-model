import { z } from 'zod';
import {
  attackBaseDomainObjectSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  stixIdentifierSchema,
  stixModifiedTimestampSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Object Version Reference
// (x_mitre_contents)
//
/////////////////////////////////////

export const objectVersionReferenceSchema = z.object({
  object_ref: stixIdentifierSchema.describe('The ID of the referenced object.'),

  object_modified: stixModifiedTimestampSchema.describe(
    'The modified time of the referenced object. It MUST be an exact match for the modified time of the STIX object being referenced.',
  ),
});

export const xMitreContentsSchema = z
  .array(objectVersionReferenceSchema)
  .min(1, 'At least one STIX object reference is required.')
  .describe('Specifies the objects contained within the collection.');

export type ObjectVersionReference = z.infer<typeof objectVersionReferenceSchema>;

/////////////////////////////////////
//
// MITRE STIX Collection
//
/////////////////////////////////////

export const collectionSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-collection'),

    type: createStixTypeValidator('x-mitre-collection'),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    description: descriptionSchema.describe(
      'Details, context, and explanation about the purpose or contents of the collection.',
    ),

    x_mitre_contents: xMitreContentsSchema,
  })
  .strict()
  .superRefine((schema, ctx) => {
    //==============================================================================
    // Validate x_mitre_contents
    //==============================================================================

    const XMitreContents = schema.x_mitre_contents;
    if (XMitreContents.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['x_mitre_contents'],
        message: 'At least one STIX object reference is required',
      });
    }
  });

export type Collection = z.infer<typeof collectionSchema>;
