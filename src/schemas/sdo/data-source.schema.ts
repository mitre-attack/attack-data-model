import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// MITRE Collection Layers
// (x_mitre_collection_layers)
//
//==============================================================================

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
  .min(1)
  .meta({ description: 'List of places the data can be collected from.' });

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;

//==============================================================================
//
// MITRE Data Source
//
//==============================================================================

export const dataSourceSchema = attackBaseDomainObjectSchema
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
  .strict()
  .meta({
    description: `
> [!WARNING]
> **Deprecation Notice**: Data Sources (\`x-mitre-data-source\`) are deprecated as of ATT&CK Specification 3.3.0 and superseded by the Detection Strategy framework.
> They remain supported for backward compatibility but will be removed in ATT&CK Specification 4.0.0.

Data sources represent categories of information that can be collected for detection purposes.
They are defined as \`x-mitre-data-source\` objects extending the generic
[STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).
    `.trim(),
  });

export type DataSource = z.infer<typeof dataSourceSchema>;
