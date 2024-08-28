import { z } from 'zod';
import { attackBaseObjectSchema, descriptionSchema, xMitrePlatformsSchema, stixIdentifierSchema, stixTypeSchema, xMitreDomainsSchema } from '../common';

// Initializes the custom ZodErrorMap
import '../../errors';

export const assetSectors = z.enum([
	"Electric",
	"Water and Wastewater",
	"Manufacturing",
	"Rail",
	"Maritime",
	"General"
]);

export const relatedAssetsSchema = z.object({
    name: z.string({
		required_error: "Related asset name is required.",
		invalid_type_error: "Related asset name must be a string."
	}),
	related_asset_sectors: z.array(assetSectors, {
		invalid_type_error: "related_asset_sectors must be an array."
	}),
});

export type RelatedAssets = z.infer<typeof relatedAssetsSchema>;

export const assetSchema = attackBaseObjectSchema.extend({
	type: z.literal(stixTypeSchema.enum['x-mitre-asset'], {
		message: `'type' property must be equal to ${stixTypeSchema.enum['x-mitre-asset']}`
	}),

	description: descriptionSchema
		.describe("The description of the object.")
		.optional(),
	
	x_mitre_platforms: xMitrePlatformsSchema,

	x_mitre_domains: xMitreDomainsSchema,

	x_mitre_contributors: z
        .array(z.string())
        .optional(),
	
	x_mitre_sectors: z
		.array(assetSectors)
		.describe("List of industry sector(s) an asset may be commonly observed in.")
		.optional(),

	x_mitre_related_assets: z
		.array(relatedAssetsSchema)
		.describe("Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition.")
		.optional(),

	x_mitre_modified_by_ref: stixIdentifierSchema
        .describe("The STIX ID of an identity object. Used to track the identity of the individual or organization which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations."),
})
.required({
	name: true,
	type: true,
	x_mitre_version: true,
	x_mitre_domains: true,
})
// validate common fields
.superRefine(({external_references}, ctx) => {
	// ATT&CK ID format
	if (!external_references?.length) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "At least one external_reference must be specified."
		});
	} else {
		let attackIdEntry = external_references[0];
		if (!attackIdEntry.external_id) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "ATT&CK ID must be defined in the first external_references entry.",
			});
		} else {
			let idRegex = /A\d{4}$/;
			if (!idRegex.test(attackIdEntry.external_id)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "The first external_reference must match the ATT&CK ID format A####."
				})
			}
		}
	}
});

export type Asset = z.infer<typeof assetSchema>;