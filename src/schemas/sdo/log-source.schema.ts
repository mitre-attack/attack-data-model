import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import {
  // descriptionSchema,
  objectMarkingRefsSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  // xMitrePlatformsSchema,
} from '../common/common-properties.js';
import { externalReferencesSchema, stixCreatedByRefSchema } from '../common/misc.js';
// import { createStixIdValidator } from '../common/stix-identifier.js';
// import { createStixTypeValidator } from '../common/stix-type.js';
import { MitreCollectionLayerOV } from '../common/open-vocabulary.js';

/////////////////////////////////////
//
// MITRE Collection Layers
// (x_mitre_collection_layers)
//
/////////////////////////////////////

export const xMitreCollectionLayersSchema = z
  .array(MitreCollectionLayerOV, {
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
    // name
    // channel
    // x_mitre_data_component

    // id: createStixIdValidator('x-mitre-log-source'),
    // type: createStixTypeValidator('x-mitre-log-source'),

    // Optional in STIX but required in ATT&CK
    // TODO move to detection strategy
    created_by_ref: stixCreatedByRefSchema,

    // TODO remove!
    // description: descriptionSchema,

    // TODO move to detection strategy
    external_references: externalReferencesSchema,

    // Optional in STIX but required in ATT&CK
    // TODO Software team figure this out - either track on detection strategy AND/OR log sources
    object_marking_refs: objectMarkingRefsSchema,

    // x_mitre_platforms: xMitrePlatformsSchema.optional(),

    // TODO move to detection strategy
    x_mitre_domains: xMitreDomainsSchema,

    // TODO move to detection strategy
    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    // TODO move to detection strategy
    x_mitre_contributors: xMitreContributorsSchema.optional(),

    // TODO delete me!
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
