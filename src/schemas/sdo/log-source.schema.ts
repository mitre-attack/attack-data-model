import { z } from 'zod/v4';
import { MitreCollectionLayerOV } from '../common/open-vocabulary.js';
import {
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitreContributorsSchema,
  objectMarkingRefsSchema,
  // createAttackExternalReferencesSchema,
  stixCreatedByRefSchema,
  attackBaseDomainObjectSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// MITRE Collection Layers
// (x_mitre_collection_layers)
//
/////////////////////////////////////

export const xMitreCollectionLayersSchema = z
  .array(MitreCollectionLayerOV, {
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_collection_layers must be an array of supported collection layers.'
        : 'Invalid input in x_mitre_collection_layers',
  })
  .describe('List of places the data can be collected from.');

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;

/////////////////////////////////////
//
// MITRE Log Source SDO
// (x-mitre-log-source)
//
/////////////////////////////////////

export const logSourceSchema = attackBaseDomainObjectSchema
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

    // Optional in STIX but required in ATT&CK
    // external_references: createAttackExternalReferencesSchema('x-mitre-log-source'), // TODO add log source type to createAttackExternalReferencesSchema (confirm this first)

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
  .strict();

export type LogSource = z.infer<typeof logSourceSchema>;
