import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import {
  descriptionSchema,
  objectMarkingRefsSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/common-properties.js';
import { externalReferencesSchema, stixCreatedByRefSchema } from '../common/misc.js';
import { createStixIdentifierSchema } from '../common/stix-identifier.js';
import { stixTypeSchema } from '../common/stix-type.js';
import { MitreCollectionLayersOV } from '../common/open-vocabulary.js';

/////////////////////////////////////
//
// MITRE Collection Layers
// (x_mitre_collection_layers)
//
/////////////////////////////////////

export const xMitreCollectionLayersSchema = z
  .array(MitreCollectionLayersOV, {
    invalid_type_error:
      'x_mitre_collection_layers must be an array of supported collection layers.',
  })
  .describe('List of places the data can be collected from.');

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;

/////////////////////////////////////
//
// MITRE Log Source SDO
// (x-mitre-log-source)
//
/////////////////////////////////////

export const logSourceSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdentifierSchema('x-mitre-log-source'),

    type: z.literal(stixTypeSchema.enum['x-mitre-log-source']),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    description: descriptionSchema,

    external_references: externalReferencesSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_collection_layers: xMitreCollectionLayersSchema,
  })
  .strict()
  .superRefine((schema, ctx) => {
    //==============================================================================
    // Validate external references
    //==============================================================================

    const { external_references } = schema;
    const attackIdEntry = external_references[0];
    if (!attackIdEntry.external_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ATT&CK ID must be defined in the first external_references entry.',
        path: ['external_references', 0, 'external_id'],
      });
    } else {
      const idRegex = /^DS\d{4}$/;
      if (!idRegex.test(attackIdEntry.external_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The first external_reference must match the ATT&CK ID format DS####.`,
          path: ['external_references', 0, 'external_id'],
        });
      }
    }
  });

export type LogSource = z.infer<typeof logSourceSchema>;
