import { z } from 'zod/v4';
import {
  attackBaseDomainObjectSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  stixIdentifierSchema,
  stixModifiedTimestampSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Object Version Reference
// (x_mitre_contents)
//
/////////////////////////////////////

export const objectVersionReferenceSchema = z.object({
  object_ref: stixIdentifierSchema.meta({ description: 'The ID of the referenced object.' }),

  object_modified: stixModifiedTimestampSchema.meta({
    description:
      'The modified time of the referenced object. It MUST be an exact match for the modified time of the STIX object being referenced.',
  }),
});

export const xMitreContentsSchema = z
  .array(objectVersionReferenceSchema)
  .min(1, 'At least one STIX object reference is required.')
  .meta({ description: 'Specifies the objects contained within the collection.' });

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

    description: descriptionSchema.meta({
      description:
        'Details, context, and explanation about the purpose or contents of the collection.',
    }),

    x_mitre_contents: xMitreContentsSchema.min(1, 'At least one STIX object reference is required'),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .strict()
  .meta({
    description: `
See our [collections document](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/main/docs/collections.md) for more information about the design and intention of collection objects.
    `.trim(),
  });

export type Collection = z.infer<typeof collectionSchema>;
