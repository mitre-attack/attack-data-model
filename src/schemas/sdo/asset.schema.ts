import { z } from 'zod/v4';
import {
  attackBaseObjectSchema,
  descriptionSchema,
  xMitrePlatformsSchema,
  xMitreDomainsSchema,
  createStixIdValidator,
  xMitreContributorsSchema,
  xMitreModifiedByRefSchema,
  createStixTypeValidator,
} from '../common/index.js';

/////////////////////////////////////
//
// MITRE Asset Sectors
// (x_mitre_sectors)
//
/////////////////////////////////////

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
  .meta({
    description: 'List of industry sector(s) an asset may be commonly observed in',
  });

export type XMitreSectors = z.infer<typeof xMitreSectorsSchema>;

/////////////////////////////////////
//
// MITRE Related Assets
// (x_mitre_related_assets)
//
/////////////////////////////////////

export const relatedAssetSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Related asset name is required'
        : 'Related asset name must be a string',
  }),

  related_asset_sectors: xMitreSectorsSchema.optional(),
  description: descriptionSchema.optional(),
});

export const relatedAssetsSchema = z.array(relatedAssetSchema).meta({
  description:
    'Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition',
});

export type RelatedAsset = z.infer<typeof relatedAssetSchema>;
export type RelatedAssets = z.infer<typeof relatedAssetsSchema>;

/////////////////////////////////////
//
// MITRE Asset
//
/////////////////////////////////////

export const assetSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-asset'),

    type: createStixTypeValidator('x-mitre-asset'),

    description: descriptionSchema.optional(),

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_sectors: xMitreSectorsSchema.optional(),

    x_mitre_related_assets: relatedAssetsSchema.optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    external_references: true,
    object_marking_refs: true,
    created_by_ref: true,
  })
  .strict()
  // validate common fields
  .check((ctx) => {
    const { external_references } = ctx.value;

    // ATT&CK ID format validation
    if (!external_references?.length) {
      ctx.issues.push({
        code: 'custom',
        message: 'At least one external_reference must be specified',
        path: ['external_references'],
        input: external_references,
      });
    } else {
      const attackIdEntry = external_references[0];
      if (!attackIdEntry.external_id) {
        ctx.issues.push({
          code: 'custom',
          message: 'ATT&CK ID must be defined in the first external_references entry',
          path: ['external_references', 0, 'external_id'],
          input: external_references[0],
        });
      } else {
        const idRegex = /^A\d{4}$/;
        if (!idRegex.test(attackIdEntry.external_id)) {
          ctx.issues.push({
            code: 'custom',
            message: 'The first external_reference must match the ATT&CK ID format A####',
            path: ['external_references', 0, 'external_id'],
            input: external_references[0],
          });
        }
      }
    }
  });

export type Asset = z.infer<typeof assetSchema>;
