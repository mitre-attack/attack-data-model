import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  xMitrePlatformsSchema,
  xMitreDomainsSchema,
  descriptionSchema,
  xMitreModifiedByRefSchema,
  xMitreContributorsSchema,
  objectMarkingRefsSchema,
  externalReferencesSchema,
  stixCreatedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// MITRE Collection Layers
// (x_mitre_collection_layers)
//
/////////////////////////////////////

const supportedMitreCollectionLayers = [
  'Cloud Control Plane',
  'Host',
  'Report',
  'Container',
  'Device',
  'OSINT',
  'Network',
] as const;

export const xMitreCollectionLayersSchema = z
  .array(z.enum(supportedMitreCollectionLayers), {
    invalid_type_error:
      'x_mitre_collection_layers must be an array of supported collection layers.',
  })
  .describe('List of places the data can be collected from.');

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;

/////////////////////////////////////
//
// MITRE Data Source
//
/////////////////////////////////////

export const dataSourceSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-data-source'),

    type: createStixTypeValidator('x-mitre-data-source'),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
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

// Define the type for DataSource
export type DataSource = z.infer<typeof dataSourceSchema>;
