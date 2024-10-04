
import { z } from "zod";
import { assetSchema } from "../../src/schemas/sdo/asset.schema";

/*************************************************************************************************** */
// Example 1: Valid Asset
/*************************************************************************************************** */
const validAsset = {
	"modified": "2023-10-04T18:05:43.237Z",
	"name": "Remote Terminal Unit (RTU)",
	"description": "A Remote Terminal Unit (RTU) is a device that typically resides between field devices (e.g., PLCs, IEDs) and control/SCADA servers and supports various communication interfacing and data aggregation functions. RTUs are typically responsible for forwarding commands from the control server and the collection of telemetry, events, and alerts from the field devices. An RTU can be implemented as a dedicated embedded device, as software platform that runs on a hardened/ruggedized computer, or using a custom application program on a PLC.",
	"x_mitre_platforms": [
		"Embedded",
		"Windows",
		"Linux"
	],
	"x_mitre_deprecated": false,
	"x_mitre_domains": [
		"ics-attack"
	],
	"x_mitre_version": "1.0",
	"type": "x-mitre-asset",
	"id": "x-mitre-asset--1769c499-55e5-462f-bab2-c39b8cd5ae32",
	"created": "2023-09-28T14:44:54.756Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/assets/A0004",
			"external_id": "A0004"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_attack_spec_version": "3.2.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"spec_version": "2.1"
};

console.log("\nExample 1: Valid Asset:");
console.log(`SUCCESS ${assetSchema.parse(validAsset).name}`)

/*************************************************************************************************** */
// Example 2: Invalid Asset (ATT&CK ID does not match format A####)
/*************************************************************************************************** */
const invalidAssetID = {
	...validAsset,
	external_references: [
		{
			source_name: "mitre-attack",
			external_id: "T1111"
		}
	]
};

console.log("\nExample 2: Invalid Asset (ATT&CK ID does not match format A####):");
try {
	assetSchema.parse(invalidAssetID);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}
/**
	Validation errors: [
		{
			code: 'custom',
			message: 'The first external_reference must match the ATT&CK ID format A####.',
			path: []
		}
	]
 */

/*************************************************************************************************** */
// Example 3: Invalid Asset (missing required fields)
/*************************************************************************************************** */
const invalidAssetMissingFields = {
	"modified": "2023-10-04T18:05:43.237Z",
	// Missing name
	"description": "A Remote Terminal Unit (RTU) is a device that typically resides between field devices (e.g., PLCs, IEDs) and control/SCADA servers and supports various communication interfacing and data aggregation functions. RTUs are typically responsible for forwarding commands from the control server and the collection of telemetry, events, and alerts from the field devices. An RTU can be implemented as a dedicated embedded device, as software platform that runs on a hardened/ruggedized computer, or using a custom application program on a PLC.",
	"x_mitre_sectors": [
		"Electric",
		"Water and Wastewater",
		"General"
	],
	"x_mitre_platforms": [
		"Embedded",
		"Windows",
		"Linux"
	],
	"x_mitre_deprecated": false,
	// Missing x_mitre_domains
	// Missing x_mitre_version (Defaults to 1.0)
	"type": "x-mitre-asset",
	"id": "x-mitre-asset--1769c499-55e5-462f-bab2-c39b8cd5ae32",
	"created": "2023-09-28T14:44:54.756Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/assets/A0004",
			"external_id": "A0004"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_attack_spec_version": "3.2.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"spec_version": "2.1"
};

console.log("\nExample 3: Invalid Asset (missing required fields):");
try {
	assetSchema.parse(invalidAssetMissingFields);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}
/**
	Validation errors: [
		{
			code: 'invalid_type',
			expected: 'string',
			received: 'undefined',
			path: [ 'name' ],
			message: 'Required'
		},
		{
			code: 'custom',
			message: "The version must be in the format 'M.N' where M and N are integers between 0 and 99",
			path: [ 'x_mitre_version' ]
		},
		{
			code: 'invalid_type',
			expected: 'array',
			received: 'undefined',
			path: [ 'x_mitre_domains' ],
			message: 'Required'
		}
	]
 */

/*************************************************************************************************** */
// Example 4: Asset with invalid type
/*************************************************************************************************** */
const assetWithInvalidType = {
	...validAsset,
	type: "invalid-type"
};

console.log("\nExample 4: Asset with invalid type:");
try {
	assetSchema.parse(assetWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
    }
}
// Validation error: Invalid 'type' property. Expected 'x-mitre-asset' for Asset object, but received 'invalid-type'.

/*************************************************************************************************** */
// Example 5: Asset with optional fields
/*************************************************************************************************** */
const assetWithOptionalFields = {
	...validAsset,
	x_mitre_contributors: ["John Doe", "Jane Smith"],
	x_mitre_sectors: [
		"Electric",
		"Water and Wastewater",
		"General"
	],
	x_mitre_related_assets: [
		{
			name: "Related Asset",
			description: "Description",
			related_asset_sectors: ["Electric"]
		}
	]
};

console.log("\nExample 5: Asset with optional fields:");
console.log(assetSchema.parse(assetWithOptionalFields));

/*************************************************************************************************** */
// Example 6: Asset with invalid sectors
/*************************************************************************************************** */
const assetWithInvalidSectors = {
	...validAsset,
	x_mitre_sectors: [
		"Invalid Sector"
	]
};

console.log("\nExample 6: Asset with invalid sectors:");
try {
	assetSchema.parse(assetWithInvalidSectors);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
    }
}
// Validation error: Invalid enum value. Expected 'Electric' | 'Water and Wastewater' | 'Manufacturing' | 'Rail' | 'Maritime' | 'General', received 'Invalid Sector'

/*************************************************************************************************** */
// Example 7: Asset with invalid related assets
/*************************************************************************************************** */
const assetWithInvalidRelatedAssets = {
	...validAsset,
	x_mitre_related_assets: [
		{
			description: "invalid related asset"
		}
	]
};

console.log("\nExample 7: Asset with invalid related assets:");
try {
	assetSchema.parse(assetWithInvalidRelatedAssets);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
    }
}
// Validation error: Related asset name is required.

/** ************************************************************************************************* */
// Example 8: Asset with unknown property
/** ************************************************************************************************* */
const assetWithUnknownProperty = {
    ...validAsset,
    foo: 'bar'
}

console.log("\nExample 8 - Parsing an asset with an unknown property (foo: 'bar'):");
try {
    const parsedAsset = assetSchema.parse(assetWithUnknownProperty);
    console.log("Parsed successfully. Asset name:", parsedAsset.name);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
        // Validation errors: [
        //     {
        //       code: 'unrecognized_keys',
        //       keys: [ 'foo' ],
        //       path: [],
        //       message: "Unrecognized key(s) in object: 'foo'"
        //     }
        //   ]
    }
}
