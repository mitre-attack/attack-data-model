import { z } from 'zod/v4';

import { stixIdentifierSchema } from './stix-identifier.js';
import { stixTypeSchema } from './stix-type.js';
import { stixSpecVersionSchema } from './stix-spec-version.js';
import { stixCreatedTimestampSchema, stixModifiedTimestampSchema } from './stix-timestamp.js';
import { stixCreatedByRefSchema, granularMarkingSchema, externalReferencesSchema } from './misc.js';
import { objectMarkingRefsSchema } from './common-properties.js';
import { extensionsSchema } from './extensions.js';

const stixBaseObjectSchema = z
  .object({
    id: stixIdentifierSchema.meta({
      description: 'The id property universally and uniquely identifies this object.',
    }),
    type: stixTypeSchema,
    spec_version: stixSpecVersionSchema.meta({
      description: 'The version of the STIX specification used to represent this object.',
    }),
    created: stixCreatedTimestampSchema.meta({
      description:
        'The created property represents the time at which the first version of this object was created. The timstamp value MUST be precise to the nearest millisecond.',
    }),
    modified: stixModifiedTimestampSchema.meta({
      description:
        'The modified property represents the time that this particular version of the object was modified. The timstamp value MUST be precise to the nearest millisecond.',
    }),
    created_by_ref: stixCreatedByRefSchema.optional(),
    labels: z
      .array(z.string())
      .meta({
        description: 'The labels property specifies a set of terms used to meta this object.',
      })
      .optional(),
    revoked: z
      .boolean()
      .meta({ description: 'The revoked property indicates whether the object has been revoked.' })
      .optional(),
    confidence: z
      .number()
      .meta({
        description:
          'Identifies the confidence that the creator has in the correctness of their data.',
      })
      .int()
      .min(1)
      .max(99)
      .optional()
      .refine((val) => val === undefined || (val > 0 && val < 100), {
        message: 'Confidence must be between 1 and 99 inclusive.',
      })
      .optional(),
    lang: z
      .string()
      .meta({ description: 'Identifies the language of the text content in this object.' })
      .optional(),
    external_references: externalReferencesSchema.optional(),
    object_marking_refs: objectMarkingRefsSchema.optional(),
    granular_markings: z
      .array(granularMarkingSchema)
      .meta({ description: 'The set of granular markings that apply to this object.' })
      .optional(),
    extensions: extensionsSchema.optional(),
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

export const stixDomainObjectSchema = stixBaseObjectSchema.extend({});
export const stixRelationshipObjectSchema = stixBaseObjectSchema.extend({});

export type SDO = z.infer<typeof stixDomainObjectSchema>;
export type SRO = z.infer<typeof stixRelationshipObjectSchema>;
