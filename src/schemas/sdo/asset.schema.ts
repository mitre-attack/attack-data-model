import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  nameSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// MITRE Asset Sectors
// (x_mitre_sectors)
//
//==============================================================================

const supportedAssetSectors = [
  'Electric',
  'Water and Wastewater',
  'Manufacturing',
  'Rail',
  'Maritime',
  'General',
] as const;

export const xMitreSectorsSchema = z
  .array(
    z.enum(supportedAssetSectors, {
      error: () => `Sector must be one of: ${supportedAssetSectors.join(', ')}`,
    }),
    {
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'related_asset_sectors must be an array'
          : 'Invalid asset sectors array',
    },
  )
  .min(1)
  .meta({
    description: 'List of industry sector(s) an asset may be commonly observed in',
  });

export type XMitreSectors = z.infer<typeof xMitreSectorsSchema>;

//==============================================================================
//
// MITRE Related Assets
// (x_mitre_related_assets)
//
//==============================================================================

export const relatedAssetSchema = z.object({
  name: nameSchema,
  related_asset_sectors: xMitreSectorsSchema.optional(),
  description: descriptionSchema.optional(),
});

export const relatedAssetsSchema = z.array(relatedAssetSchema).min(1).meta({
  description:
    'Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition',
});

export type RelatedAsset = z.infer<typeof relatedAssetSchema>;
export type RelatedAssets = z.infer<typeof relatedAssetsSchema>;

//==============================================================================
//
// MITRE Asset
//
//==============================================================================

export const assetSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-asset'),

    type: createStixTypeValidator('x-mitre-asset'),

    description: descriptionSchema.optional(),

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('x-mitre-asset'),

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_sectors: xMitreSectorsSchema.optional(),

    x_mitre_related_assets: relatedAssetsSchema.optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
    created_by_ref: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

export type Asset = z.infer<typeof assetSchema>;
