import { z } from "zod/v4";
import { v4 as uuidv4 } from 'uuid';
import { detectionStrategySchema } from "../../src/schemas/sdo/detection-strategy.schema.js";

/*************************************************************************************************** */
// Example 1: Valid Detection Strategy
/*************************************************************************************************** */
const validDetectionStrategy = {
	"id": "x-mitre-detection-strategy--7c93fd1a-1e6b-4b4e-be42-0d843216a43d",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Credential Dumping via Sensitive Memory and Registry Access Correlation",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["enterprise-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0001",
			"url": "https://attack.mitre.org/detection-strategies/DET0001"
		}
	],
	"x_mitre_contributors": [
		"Security Research Team",
		"John Smith"
	],
    "x_mitre_analytic_refs": [
        `x-mitre-analytic--${uuidv4()}`,
        `x-mitre-analytic--${uuidv4()}`
	]
};

console.log("\nExample 1 - Valid Detection Strategy:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validDetectionStrategy).name}`)

/*************************************************************************************************** */
// Example 2: Invalid Detection Strategy (ATT&CK ID does not match format DET####)
/*************************************************************************************************** */
const invalidDetectionStrategyID = {
	...validDetectionStrategy,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/detection-strategies/DET0001",
			"external_id": "D001"
		}
	],
};

console.log("\nExample 2 - Invalid Detection Strategy (ATT&CK ID does not match format DET####):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyID);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// Validation errors: ✖ The first external_reference must match the ATT&CK ID format DET####.
//   → at external_references[0].external_id

/*************************************************************************************************** */
// Example 3: Valid Detection Strategy with Multiple Contributors
/*************************************************************************************************** */
const validDetectionStrategyWithContributors = {
	...validDetectionStrategy,
	"name": "PowerShell Obfuscation Detection",
	"x_mitre_contributors": [
		"John Smith",
		"Jane Doe",
		"Security Research Team",
		"Advanced Threat Analytics Lab"
	],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0002",
			"url": "https://attack.mitre.org/detection-strategies/DET0002"
		}
	],
	"x_mitre_analytic_refs": [
		`x-mitre-analytic--${uuidv4()}`,
		`x-mitre-analytic--${uuidv4()}`,
		`x-mitre-analytic--${uuidv4()}`,
	]
};

console.log("\nExample 3 - Valid Detection Strategy with Multiple Contributors:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validDetectionStrategyWithContributors).name}`)

/*************************************************************************************************** */
// Example 4: Invalid Detection Strategy (missing required fields)
/*************************************************************************************************** */
const invalidDetectionStrategyMissingFields = {
	"id": "x-mitre-detection-strategy--550e8400-e29b-41d4-a716-446655440001",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	// Missing name
	// Missing created_by_ref (required by schema)
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	// Missing object_marking_refs (required by schema)
	// Missing x_mitre_domains
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0003",
			"url": "https://attack.mitre.org/detection-strategies/DET0003"
		}
	],
	// Missing x_mitre_contributors (required)
	// Missing x_mitre_analytic_refs
};

console.log("\nExample 4 - Invalid Detection Strategy (missing required fields):");
try {
    detectionStrategySchema.parse(invalidDetectionStrategyMissingFields);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// Validation errors: ✖ Invalid input: expected nonoptional, received undefined
//   → at created_by_ref
// ✖ Invalid input: expected nonoptional, received undefined
//   → at object_marking_refs
// ✖ Invalid input: expected string, received undefined
//   → at name
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_contributors
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_analytic_refs
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_domains

/*************************************************************************************************** */
// Example 5: Invalid Detection Strategy with invalid type
/*************************************************************************************************** */
const detectionStrategyWithInvalidType = {
	...validDetectionStrategy,
	"type": 'invalid-type'
}

console.log("\nExample 5 - Detection Strategy with invalid type:");
try {
    detectionStrategySchema.parse(detectionStrategyWithInvalidType);
} catch (error) {
    if (error instanceof z.core.$ZodError) {
        console.log(z.prettifyError(error));
	}
}
// ✖ Invalid input: expected "x-mitre-detection-strategy"
//   → at type

/*************************************************************************************************** */
// Example 6: Invalid Detection Strategy (empty analytics array)
/*************************************************************************************************** */
const invalidDetectionStrategyEmptyAnalytics = {
	...validDetectionStrategy,
	"x_mitre_analytic_refs": []
};

console.log("\nExample 6 - Invalid Detection Strategy (empty analytics array):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyEmptyAnalytics);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation error:", z.prettifyError(error));
	}
}
// Validation error: ✖ Too small: expected array to have >=1 items
//   → at x_mitre_analytic_refs

/*************************************************************************************************** */
// Example 7: Invalid Detection Strategy (wrong analytic ID format)
/*************************************************************************************************** */
const invalidDetectionStrategyAnalyticID = {
	...validDetectionStrategy,
	"x_mitre_analytic_refs": [
		"invalid-analytic-id",
		`x-mitre-analytic--${uuidv4()}`,
	]
};

console.log("\nExample 7 - Invalid Detection Strategy (wrong analytic ID format):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyAnalyticID);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation error:", z.prettifyError(error));
	}
}
// Validation error: ✖ Invalid STIX Identifier: must comply with format 'type--UUIDv4'
//   → at x_mitre_analytic_refs[0]
// ✖ Invalid STIX Identifier for STIX object: contains invalid STIX type 'invalid-analytic-id'
//   → at x_mitre_analytic_refs[0]
// ✖ Invalid STIX Identifier for STIX object: contains invalid UUIDv4 format
//   → at x_mitre_analytic_refs[0]
// ✖ Invalid STIX Identifier: must start with 'x-mitre-analytic--'
//   → at x_mitre_analytic_refs[0]

/*************************************************************************************************** */
// Example 8: Invalid Detection Strategy (wrong STIX type in analytic ID)
/*************************************************************************************************** */
const invalidDetectionStrategyWrongStixType = {
	...validDetectionStrategy,
	"x_mitre_analytic_refs": [
		"x-mitre-detection-strategy--6ba7b810-9dad-11d1-80b4-00c04fd430c8"
	]
};

console.log("\nExample 8 - Invalid Detection Strategy (wrong STIX type in analytic ID):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyWrongStixType);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation error:", z.prettifyError(error));
	}
}
// Validation error: ✖ Invalid STIX Identifier: must start with 'x-mitre-analytic--'
//   → at x_mitre_analytic_refs[0]

/*************************************************************************************************** */
// Example 9: Valid Detection Strategy with Mobile Domain
/*************************************************************************************************** */
const validMobileDetectionStrategy = {
	"id": "x-mitre-detection-strategy--7c8d9e10-f3ab-22e5-b827-556766550001",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Mobile Application Behavior Analysis",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.2",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": [
		"mobile-attack"
	],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0015",
			"url": "https://attack.mitre.org/detection-strategies/DET0015"
		}
	],
	"x_mitre_contributors": [
		"Mobile Security Research Lab",
		"Dr. Sarah Johnson"
	],
	"x_mitre_analytic_refs": [
		`x-mitre-analytic--${uuidv4()}`,
	]
};

console.log("\nExample 9 - Valid Mobile Detection Strategy:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validMobileDetectionStrategy).name}`)

/*************************************************************************************************** */
// Example 10: Valid Multi-Domain Detection Strategy
/*************************************************************************************************** */
const validMultiDomainDetectionStrategy = {
	"id": "x-mitre-detection-strategy--7c93fd1a-1e6b-4b4e-be42-0d843216a43e",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Cross-Platform Command Execution Detection",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": [
		"enterprise-attack",
		"ics-attack"
	],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0025",
			"url": "https://attack.mitre.org/detection-strategies/DET0025"
		}
	],
	"x_mitre_contributors": [
		"Cross-Platform Security Team",
		"Industrial Control Systems Lab"
	],
	"x_mitre_analytic_refs": [
		`x-mitre-analytic--${uuidv4()}`,
		`x-mitre-analytic--${uuidv4()}`,
		`x-mitre-analytic--${uuidv4()}`,
		`x-mitre-analytic--${uuidv4()}`,
	]
};

console.log("\nExample 10 - Valid Multi-Domain Detection Strategy:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validMultiDomainDetectionStrategy).name}`)

/*************************************************************************************************** */
// Example 11: Invalid Detection Strategy (invalid domain)
/*************************************************************************************************** */
const invalidDetectionStrategyDomain = {
	...validDetectionStrategy,
	"x_mitre_domains": [
		"invalid-domain"
	]
};

console.log("\nExample 11 - Invalid Detection Strategy (invalid domain):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyDomain);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation error:", z.prettifyError(error));
	}
}
// Validation error: ✖ Invalid option: expected one of "enterprise-attack"|"mobile-attack"|"ics-attack"
//   → at x_mitre_domains[0]

/*************************************************************************************************** */
// Example 12: Invalid Detection Strategy (missing contributors)
/*************************************************************************************************** */
const invalidDetectionStrategyMissingContributors = {
	...validDetectionStrategy,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0030",
			"url": "https://attack.mitre.org/detection-strategies/DET0030"
		}
	]
};
// Remove required contributors field
delete invalidDetectionStrategyMissingContributors.x_mitre_contributors;

console.log("\nExample 12 - Invalid Detection Strategy (missing contributors):");
try {
	detectionStrategySchema.parse(invalidDetectionStrategyMissingContributors);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation error:", z.prettifyError(error));
	}
}
// Validation error: ✖ Invalid input: expected array, received undefined
//   → at x_mitre_contributors

/*************************************************************************************************** */
// Example 13: Valid Detection Strategy with Special Characters
/*************************************************************************************************** */
const validDetectionStrategySpecialChars = {
	"id": "x-mitre-detection-strategy--7c93fd1a-1e6b-4b4e-be42-0d843216a43f",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Advanced Persistent Threat (APT) Detection Strategy v2.0",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["enterprise-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0099",
			"url": "https://attack.mitre.org/detection-strategies/DET0099"
		}
	],
	"x_mitre_contributors": [
		"Dr. John Smith, PhD",
		"Jane Doe (Lead Analyst)",
		"Security Team Alpha-1",
		"José García-Rodriguez",
		"李小明",
		"user@security-domain.com"
	],
	"x_mitre_analytic_refs": [
		`x-mitre-analytic--${uuidv4()}`,
	]
};

console.log("\nExample 13 - Valid Detection Strategy with Special Characters:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validDetectionStrategySpecialChars).name}`)

/*************************************************************************************************** */
// Example 14: Detection Strategy with unknown property
/*************************************************************************************************** */
const detectionStrategyWithUnknownProperty = {
	...validDetectionStrategy,
	foo: 'bar'
}

console.log("\nExample 14 - Parsing a detection strategy with an unknown property (foo: 'bar'):");
try {
	const parsedDetectionStrategy = detectionStrategySchema.parse(detectionStrategyWithUnknownProperty);
	console.log("Parsed successfully. Detection Strategy name:", parsedDetectionStrategy.name);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// Validation errors: ✖ Unrecognized key: "foo"

/*************************************************************************************************** */
// Example 15: Valid Detection Strategy with Large Number of Analytics
/*************************************************************************************************** */
const validDetectionStrategyManyAnalytics = {
	"id": "x-mitre-detection-strategy--7c93fd1a-1e6b-4b4e-be42-0d843216a440",
	"type": "x-mitre-detection-strategy",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Comprehensive Threat Detection Suite",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["enterprise-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "DET0100",
			"url": "https://attack.mitre.org/detection-strategies/DET0100"
		}
	],
	"x_mitre_contributors": [
		"Comprehensive Detection Team"
	],
	"x_mitre_analytic_refs": Array.from({ length: 20 }, (_, i) => 
		`x-mitre-analytic--${uuidv4()}`,
	)
};

console.log("\nExample 15 - Valid Detection Strategy with Many Analytics:");
console.log(`SUCCESS ${detectionStrategySchema.parse(validDetectionStrategyManyAnalytics).name} (${validDetectionStrategyManyAnalytics.x_mitre_analytic_refs.length} analytics)`);