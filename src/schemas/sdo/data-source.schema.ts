import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  xMitrePlatformsSchema,
  xMitreDomainsSchema,
  descriptionSchema,
  xMitreModifiedByRefSchema,
  xMitreContributorsSchema,
  createAttackExternalReferencesSchema,
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
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_collection_layers must be an array of supported collection layers.'
        : 'x_mitre_collection_layers is invalid or missing',
  })
  .meta({ description: 'List of places the data can be collected from.' });

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;

/////////////////////////////////////
//
// MITRE Data Source
//
/////////////////////////////////////

export const extensibleDataSourceSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-data-source'),

    type: createStixTypeValidator('x-mitre-data-source'),

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('x-mitre-data-source'),

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_collection_layers: xMitreCollectionLayersSchema,
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

// No refinements currently exist on data sources, so just export an alias
export const dataSourceSchema = extensibleDataSourceSchema;

// Define the type for DataSource
export type DataSource = z.infer<typeof extensibleDataSourceSchema>;
