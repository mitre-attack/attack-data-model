import { z } from 'zod';
import { AttackCoreSDOSchema, AttackDomains, DescriptionSchema, MitreContributorsSchema, ObjectMarkingRefsSchema, PlatformsSchema, StixIdentifierSchema, StixTypeSchema } from '../common';

// Initializes the custom ZodErrorMap
import '../../errors';

export const AssetSectors = z.enum([
	"Electric",
	"Water and Wastewater",
	"Manufacturing",
	"Rail",
	"Maritime",
	"General"
]);

export const RelatedAssetsSchema = z.object({
    name: z.string({
		required_error: "Related asset name is required.",
		invalid_type_error: "Related asset name must be a string."
	}),
    related_asset_sectors: z.array(AssetSectors, {
		invalid_type_error: "related_asset_sectors must be an array."
	}),
});

export type RelatedAssets = z.infer<typeof RelatedAssetsSchema>;

export const AssetSchema = AttackCoreSDOSchema.extend({
	type: z.literal(StixTypeSchema.enum['x-mitre-asset'], {
		message: `'type' property must be equal to ${StixTypeSchema.enum['x-mitre-asset']}`
	}),

	description: DescriptionSchema
		.describe("The description of the object.")
		.optional(),

	object_marking_refs: ObjectMarkingRefsSchema,
	
	x_mitre_platforms: PlatformsSchema,

	x_mitre_domains: z
		.array(AttackDomains)
		.describe("The technology domains to which the ATT&CK object belongs."),

	x_mitre_deprecated: z
		.boolean({
			invalid_type_error: "x_mitre_deprecated must be a boolean."
		})
		.optional(),

	x_mitre_contributors: MitreContributorsSchema
		.optional(),
	
	x_mitre_sectors: z
		.array(AssetSectors)
		.describe("List of industry sector(s) an asset may be commonly observed in.")
		.optional(),

	x_mitre_related_assets: z
		.array(RelatedAssetsSchema)
		.describe("Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition.")
		.optional(),

	x_mitre_modified_by_ref: StixIdentifierSchema
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

export type Asset = z.infer<typeof AssetSchema>;