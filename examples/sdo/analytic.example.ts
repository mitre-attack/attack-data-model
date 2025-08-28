import { z } from "zod/v4";
import { v4 as uuidv4 } from 'uuid';
import { analyticSchema } from "../../src/schemas/sdo/analytic.schema.js";

/*************************************************************************************************** */
// Example 1: Valid Analytic
/*************************************************************************************************** */
const validAnalytic = {
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a43d",
	"type": "x-mitre-analytic",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Suspicious PowerShell Activity",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["enterprise-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "AN0001",
			"url": "https://attack.mitre.org/analytics/AN0001"
		}
	],
	"description": "Adversary execution of PowerShell commands with suspicious parameters",
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["PowerShell"]
		}
    ],
    "x_mitre_platforms": ["Windows"],
	"x_mitre_mutable_elements": [
		{
			"field": "TimeWindow",
			"description": "Time window for correlation analysis"
		}
	]
};

console.log("\nExample 1 - Valid Analytic:");
console.log(`SUCCESS ${analyticSchema.parse(validAnalytic).name}`)

/*************************************************************************************************** */
// Example 2: Invalid Analytic (ATT&CK ID does not match format AN####)
/*************************************************************************************************** */
const invalidAnalyticID = {
	...validAnalytic,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/analytics/AN0001",
			"external_id": "A001"
		}
	],
};

console.log("\nExample 2 - Invalid Analytic (ATT&CK ID does not match format AN####):");
try {
	analyticSchema.parse(invalidAnalyticID);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ The first external_reference must match the ATT&CK ID format AN####.
//   → at external_references[0].external_id

/*************************************************************************************************** */
// Example 3: Valid Analytic with Multiple Log Sources and Mutable Elements
/*************************************************************************************************** */
const validAnalyticMultipleElements = {
	...validAnalytic,
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a43e",
	"name": "Multi-Layer Process Monitoring",
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "AN0002",
			"url": "https://attack.mitre.org/analytics/AN0002"
		}
	],
	"description": "Adversary process creation and execution patterns across multiple log sources",
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["Sysmon", "EventCode=1"]
		},
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b811-9dad-11d1-80b4-00c04fd430c9",
			"permutation_names": ["Security", "EventCode=4688"]
		}
	],
	"x_mitre_mutable_elements": [
		{
			"field": "TimeWindow",
			"description": "Time window for correlation analysis"
		},
		{
			"field": "UserContext",
			"description": "User context for filtering"
		},
		{
			"field": "ProcessNamePattern",
			"description": "Regular expression pattern for process names"
		}
	]
};

console.log("\nExample 3 - Valid Analytic with Multiple Elements:");
console.log(`SUCCESS ${analyticSchema.parse(validAnalyticMultipleElements).name}`)

/*************************************************************************************************** */
// Example 4: Invalid Analytic (missing required fields)
/*************************************************************************************************** */
const invalidAnalyticMissingFields = {
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a43f",
	"type": "x-mitre-analytic",
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
			"external_id": "AN0003",
			"url": "https://attack.mitre.org/analytics/AN0003"
		}
	],
	// Missing description
	// Missing x_mitre_log_source_references
	// Missing x_mitre_mutable_elements
};

console.log("\nExample 4 - Invalid Analytic (missing required fields):");
try {
	analyticSchema.parse(invalidAnalyticMissingFields);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Unrecognized key: "x_mitre_modified_by_ref"
// ✖ Invalid input: expected nonoptional, received undefined
//   → at created_by_ref
// ✖ Invalid input: expected nonoptional, received undefined
//   → at object_marking_refs
// ✖ Invalid input: expected string, received undefined
//   → at name
// ✖ x_mitre_platforms must be an array of strings
//   → at x_mitre_platforms
// ✖ Invalid input: expected string, received undefined
//   → at description
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_log_source_references
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_mutable_elements
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_domains

/*************************************************************************************************** */
// Example 5: Invalid Analytic with invalid type
/*************************************************************************************************** */
const analyticWithInvalidType = {
	...validAnalytic,
	"type": 'invalid-type'
}

console.log("\nExample 5 - Analytic with invalid type:");
try {
	analyticSchema.parse(analyticWithInvalidType);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Invalid input: expected "x-mitre-analytic"
//   → at type

/*************************************************************************************************** */
// Example 6: Invalid Analytic (empty log source references array)
/*************************************************************************************************** */
const invalidAnalyticEmptyLogSources = {
	...validAnalytic,
	"x_mitre_log_source_references": []
};

console.log("\nExample 6 - Invalid Analytic (empty log source references array):");
try {
	analyticSchema.parse(invalidAnalyticEmptyLogSources);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected array to have >=1 items
//   → at x_mitre_log_source_references

/*************************************************************************************************** */
// Example 7: Invalid Analytic (duplicate log source refs)
/*************************************************************************************************** */
const invalidAnalyticDuplicateLogSources = {
	...validAnalytic,
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["PowerShell"]
		},
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["Security"]
		}
	]
};

console.log("\nExample 7 - Invalid Analytic (duplicate log source refs):");
try {
	analyticSchema.parse(invalidAnalyticDuplicateLogSources);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Duplicate log source ref found: each (x_mitre_log_source_ref, permutation_names) pair must be unique
//   → at x_mitre_log_source_references.x_mitre_log_source_ref

/*************************************************************************************************** */
// Example 8: Invalid Analytic (empty mutable elements array)
/*************************************************************************************************** */
const invalidAnalyticEmptyMutableElements = {
	...validAnalytic,
	"x_mitre_mutable_elements": []
};

console.log("\nExample 8 - Invalid Analytic (empty mutable elements array):");
try {
	analyticSchema.parse(invalidAnalyticEmptyMutableElements);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected array to have >=1 items
//   → at x_mitre_mutable_elements

/*************************************************************************************************** */
// Example 9: Invalid Analytic (empty description field)
/*************************************************************************************************** */
const invalidAnalyticEmptyDescription = {
	...validAnalytic,
	"description": ""
};

console.log("\nExample 9 - Invalid Analytic (empty description field):");
try {
	analyticSchema.parse(invalidAnalyticEmptyDescription);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected string to have >=1 characters
//   → at description

/*************************************************************************************************** */
// Example 10: Invalid Analytic (empty log source reference permutation_names)
/*************************************************************************************************** */
const invalidAnalyticEmptyPermutationNames = {
	...validAnalytic,
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": []
		}
	]
};

console.log("\nExample 10 - Invalid Analytic (empty log source reference permutation_names):");
try {
	analyticSchema.parse(invalidAnalyticEmptyPermutationNames);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected array to have >=1 items
//   → at x_mitre_log_source_references[0].permutation_names
// ✖ Too small: expected array to have >=1 items
//   → at x_mitre_log_source_references[0].permutation_names

/*************************************************************************************************** */
// Example 11: Valid Analytic with Platform
/*************************************************************************************************** */
const validAnalyticWithPlatform = {
	...validAnalytic,
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a440",
	"name": "Windows Process Creation Detection",
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "AN0010",
			"url": "https://attack.mitre.org/analytics/AN0010"
		}
	],
	"x_mitre_platforms": ["Windows"],
	"description": "Windows-specific process creation patterns indicating potential adversary activity"
};

console.log("\nExample 11 - Valid Analytic with Platform:");
console.log(`SUCCESS ${analyticSchema.parse(validAnalyticWithPlatform).name}`)

/*************************************************************************************************** */
// Example 12: Invalid Analytic (multiple platforms)
/*************************************************************************************************** */
const invalidAnalyticMultiplePlatforms = {
	...validAnalytic,
	"x_mitre_platforms": ["Windows", "Linux"]
};

console.log("\nExample 12 - Invalid Analytic (multiple platforms):");
try {
	analyticSchema.parse(invalidAnalyticMultiplePlatforms);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too big: expected array to have <=1 items
//   → at x_mitre_platforms

/*************************************************************************************************** */
// Example 13: Valid Mobile Analytic
/*************************************************************************************************** */
const validMobileAnalytic = {
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a441",
	"type": "x-mitre-analytic",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Mobile Application Permission Abuse",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["mobile-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "AN0020",
			"url": "https://attack.mitre.org/analytics/AN0020"
		}
	],
	"x_mitre_platforms": ["Android"],
	"description": "Mobile applications requesting excessive or suspicious permissions",
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": `x-mitre-log-source--${uuidv4()}`,
			"permutation_names": ["logcat", "system"]
		}
	],
	"x_mitre_mutable_elements": [
		{
			"field": "PermissionThreshold",
			"description": "Number of permissions that trigger suspicious behavior detection"
		}
	]
};

console.log("\nExample 13 - Valid Mobile Analytic:");
console.log(`SUCCESS ${analyticSchema.parse(validMobileAnalytic).name}`)

/*************************************************************************************************** */
// Example 14: Invalid Analytic (wrong log source ref STIX ID format)
/*************************************************************************************************** */
const invalidAnalyticWrongLogSourceId = {
	...validAnalytic,
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-analytic--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["PowerShell"]
		}
	]
};

console.log("\nExample 14 - Invalid Analytic (wrong log source ref STIX ID format):");
try {
	analyticSchema.parse(invalidAnalyticWrongLogSourceId);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Invalid STIX Identifier: must start with 'x-mitre-log-source--'
//   → at x_mitre_log_source_references[0].x_mitre_log_source_ref

/*************************************************************************************************** */
// Example 15: Valid Analytic with Complex Log Source Permutation Names
/*************************************************************************************************** */
const validAnalyticComplexPermutationNames = {
	...validAnalytic,
	"id": "x-mitre-analytic--7c93fd1a-1e6b-4b4e-be42-0d843216a442",
	"name": "Advanced Process Monitoring",
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "AN0030",
			"url": "https://attack.mitre.org/analytics/AN0030"
		}
	],
	"description": "Complex process creation and execution patterns using multiple log sources",
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["sysmon:1", "auditd:SYSCALL", "Security/Microsoft-Windows-Security-Auditing"]
		}
	],
	"x_mitre_mutable_elements": [
		{
			"field": "ProcessPattern",
			"description": "Regular expression pattern for matching suspicious process names"
		}
	]
};

console.log("\nExample 15 - Valid Analytic with Complex Log Source Permutation Names:");
console.log(`SUCCESS ${analyticSchema.parse(validAnalyticComplexPermutationNames).name}`);

/*************************************************************************************************** */
// Example 16: Analytic with unknown property
/*************************************************************************************************** */
const analyticWithUnknownProperty = {
	...validAnalytic,
	foo: 'bar'
}

console.log("\nExample 16 - Parsing an analytic with an unknown property (foo: 'bar'):");
try {
	const parsedAnalytic = analyticSchema.parse(analyticWithUnknownProperty);
	console.log("Parsed successfully. Analytic name:", parsedAnalytic.name);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Unrecognized key: "foo"

/*************************************************************************************************** */
// Example 17: Invalid Analytic (duplicate permutation_names in same log source)
/*************************************************************************************************** */
const invalidAnalyticDuplicateKeys = {
	...validAnalytic,
	"x_mitre_log_source_references": [
		{
			"x_mitre_log_source_ref": "x-mitre-log-source--6ba7b810-9dad-11d1-80b4-00c04fd430c8",
			"permutation_names": ["PowerShell", "PowerShell"]
		}
	]
};

console.log("\nExample 17 - Invalid Analytic (duplicate permutation_names in same log source):");
try {
	analyticSchema.parse(invalidAnalyticDuplicateKeys);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Duplicate log source permutation found: each (name, channel) pair must be unique
//   → at x_mitre_log_source_references[0].permutation_names

/*************************************************************************************************** */
// Example 18: Invalid Analytic (empty mutable element field)
/*************************************************************************************************** */
const invalidAnalyticEmptyMutableField = {
	...validAnalytic,
	"x_mitre_mutable_elements": [
		{
			"field": "",
			"description": "Time window for correlation analysis"
		}
	]
};

console.log("\nExample 18 - Invalid Analytic (empty mutable element field):");
try {
	analyticSchema.parse(invalidAnalyticEmptyMutableField);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected string to have >=1 characters
//   → at x_mitre_mutable_elements[0].field