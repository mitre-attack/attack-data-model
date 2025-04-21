import { z } from 'zod';
import {
  attackBaseDomainObjectSchema,
  descriptionSchema,
  xMitrePlatformsSchema,
  xMitreDomainsSchema,
  createStixIdValidator,
  xMitreContributorsSchema,
  xMitreModifiedByRefSchema,
  objectMarkingRefsSchema,
  externalReferencesSchema,
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
  .array(z.enum(supportedAssetSectors), {
    invalid_type_error: 'related_asset_sectors must be an array.',
  })
  .describe('List of industry sector(s) an asset may be commonly observed in.');

export type XMitreSectors = z.infer<typeof xMitreSectorsSchema>;

/////////////////////////////////////
//
// MITRE Related Assets
// (x_mitre_related_assets)
//
/////////////////////////////////////

export const relatedAssetSchema = z.object({
  name: z.string({
    required_error: 'Related asset name is required.',
    invalid_type_error: 'Related asset name must be a string.',
  }),

  related_asset_sectors: xMitreSectorsSchema.optional(),
  description: descriptionSchema.optional(),
});

export const relatedAssetsSchema = z
  .array(relatedAssetSchema)
  .describe(
    'Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition.',
  );

export type RelatedAsset = z.infer<typeof relatedAssetSchema>;
export type RelatedAssets = z.infer<typeof relatedAssetsSchema>;

/////////////////////////////////////
//
// MITRE Asset
//
/////////////////////////////////////

export const assetSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-asset'),

    type: createStixTypeValidator('x-mitre-asset'),

    description: descriptionSchema.optional(),

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_platforms: xMitrePlatformsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    x_mitre_sectors: xMitreSectorsSchema.optional(),

    x_mitre_related_assets: relatedAssetsSchema.optional(),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .strict()
  // validate common fields
  .superRefine((schema, ctx) => {
    const { external_references } = schema;

    // ATT&CK ID format
    if (!external_references?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one external_reference must be specified.',
      });
    } else {
      const attackIdEntry = external_references[0];
      if (!attackIdEntry.external_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ATT&CK ID must be defined in the first external_references entry.',
        });
      } else {
        const idRegex = /A\d{4}$/;
        if (!idRegex.test(attackIdEntry.external_id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'The first external_reference must match the ATT&CK ID format A####.',
          });
        }
      }
    }
  });

export type Asset = z.infer<typeof assetSchema>;
