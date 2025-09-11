import { z } from "zod/v4";
import { logSourceSchema } from "../../src/schemas/sdo/log-source.schema.js";

/*************************************************************************************************** */
// Example 1: Valid Log Source
/*************************************************************************************************** */
const validLogSource = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a43d",
	"type": "x-mitre-log-source",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Process Access",
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
			"external_id": "LS0001",
			"url": "https://attack.mitre.org/log-sources/LS0001"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "sysmon",
			"channel": "EventCode=10",
		},
		{
			"name": "auditd:SYSCALL",
			"channel": "ptrace",
		}
	]
};

console.log("\nExample 1 - Valid Log Source:");
console.log(`SUCCESS ${logSourceSchema.parse(validLogSource).name}`)

/*************************************************************************************************** */
// Example 2: Invalid Log Source (ATT&CK ID does not match format LS####)
/*************************************************************************************************** */
const invalidLogSourceID = {
	...validLogSource,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/log-sources/LS0001",
			"external_id": "L001"
		}
	],
};

console.log("\nExample 2 - Invalid Log Source (ATT&CK ID does not match format LS####):");
try {
	logSourceSchema.parse(invalidLogSourceID);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ The first external_reference must match the ATT&CK ID format LS####.
//   → at external_references[0].external_id

/*************************************************************************************************** */
// Example 3: Valid Log Source with Multiple Permutations
/*************************************************************************************************** */
const validLogSourceMultiplePermutations = {
	...validLogSource,
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a43e",
	"name": "Windows Security Event Log",
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "LS0002",
			"url": "https://attack.mitre.org/log-sources/LS0002"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "Security",
			"channel": "Security",
		},
		{
			"name": "System",
			"channel": "System",
		},
		{
			"name": "Application",
			"channel": "Application",
		}
	]
};

console.log("\nExample 3 - Valid Log Source with Multiple Permutations:");
console.log(`SUCCESS ${logSourceSchema.parse(validLogSourceMultiplePermutations).name}`)

/*************************************************************************************************** */
// Example 4: Invalid Log Source (missing required fields)
/*************************************************************************************************** */
const invalidLogSourceMissingFields = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a43f",
	"type": "x-mitre-log-source",
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
			"external_id": "LS0003",
			"url": "https://attack.mitre.org/log-sources/LS0003"
		}
	],
	// Missing x_mitre_log_source_permutations
};

console.log("\nExample 4 - Invalid Log Source (missing required fields):");
try {
	logSourceSchema.parse(invalidLogSourceMissingFields);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Invalid input: expected nonoptional, received undefined
//   → at created_by_ref
// ✖ Invalid input: expected nonoptional, received undefined
//   → at object_marking_refs
// ✖ Invalid input: expected string, received undefined
//   → at name
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_domains
// ✖ Invalid input: expected array, received undefined
//   → at x_mitre_log_source_permutations

/*************************************************************************************************** */
// Example 5: Invalid Log Source with invalid type
/*************************************************************************************************** */
const logSourceWithInvalidType = {
	...validLogSource,
	"type": 'invalid-type'
}

console.log("\nExample 5 - Log Source with invalid type:");
try {
	logSourceSchema.parse(logSourceWithInvalidType);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Invalid input: expected "x-mitre-log-source"
//   → at type

/*************************************************************************************************** */
// Example 6: Invalid Log Source (empty permutations array)
/*************************************************************************************************** */
const invalidLogSourceEmptyPermutations = {
	...validLogSource,
	"x_mitre_log_source_permutations": []
};

console.log("\nExample 6 - Invalid Log Source (empty permutations array):");
try {
	logSourceSchema.parse(invalidLogSourceEmptyPermutations);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// Validation errors: ✖ Array must contain at least 1 element(s)
//   → at x_mitre_log_source_permutations

/*************************************************************************************************** */
// Example 7: Invalid Log Source (duplicate permutations)
/*************************************************************************************************** */
const invalidLogSourceDuplicatePermutations = {
	...validLogSource,
	"x_mitre_log_source_permutations": [
		{
			"name": "Security",
			"channel": "Security",
		},
		{
			"name": "Security",
			"channel": "Security",
		}
	]
};

console.log("\nExample 7 - Invalid Log Source (duplicate permutations):");
try {
	logSourceSchema.parse(invalidLogSourceDuplicatePermutations);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// ✖ Duplicate log source permutation found: each (name, channel) pair must be unique
//   → at x_mitre_log_source_permutations.x_mitre_log_source_permutations

/*************************************************************************************************** */
// Example 8: Valid Log Source (same name, different channels)
/*************************************************************************************************** */
const validLogSourceSameNameDifferentChannels = {
	...validLogSource,
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a440",
	"name": "Sysmon Event Log",
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "LS0004",
			"url": "https://attack.mitre.org/log-sources/LS0004"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "Sysmon",
			"channel": "EventCode=1",
		},
		{
			"name": "Sysmon",
			"channel": "EventCode=3",
		},
		{
			"name": "Sysmon",
			"channel": "EventCode=10",
		}
	]
};

console.log("\nExample 8 - Valid Log Source (same name, different channels):");
console.log(`SUCCESS ${logSourceSchema.parse(validLogSourceSameNameDifferentChannels).name}`)

/*************************************************************************************************** */
// Example 9: Invalid Log Source (empty permutation name)
/*************************************************************************************************** */
const invalidLogSourceEmptyPermutationName = {
	...validLogSource,
	"x_mitre_log_source_permutations": [
		{
			"name": "",
			"channel": "Security",
		}
	]
};

console.log("\nExample 9 - Invalid Log Source (empty permutation name):");
try {
	logSourceSchema.parse(invalidLogSourceEmptyPermutationName);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log(z.prettifyError(error));
	}
}
// ✖ Too small: expected string to have >=1 characters
//   → at x_mitre_log_source_permutations[0].name

/*************************************************************************************************** */
// Example 10: Invalid Log Source (empty permutation channel)
/*************************************************************************************************** */
const invalidLogSourceEmptyPermutationChannel = {
	...validLogSource,
	"x_mitre_log_source_permutations": [
		{
			"name": "Security",
			"channel": "",
		}
	]
};

console.log("\nExample 10 - Invalid Log Source (empty permutation channel):");
try {
	logSourceSchema.parse(invalidLogSourceEmptyPermutationChannel);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// ✖ Too small: expected string to have >=1 characters
//   → at x_mitre_log_source_permutations[0].channel

/*************************************************************************************************** */
// Example 11: Valid Log Source with Mobile Domain
/*************************************************************************************************** */
const validMobileLogSource = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a441",
	"type": "x-mitre-log-source",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Android System Log",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["mobile-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "LS0020",
			"url": "https://attack.mitre.org/log-sources/LS0020"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "logcat",
			"channel": "system",
		},
		{
			"name": "logcat",
			"channel": "main",
		}
	]
};

console.log("\nExample 11 - Valid Mobile Log Source:");
console.log(`SUCCESS ${logSourceSchema.parse(validMobileLogSource).name}`)

/*************************************************************************************************** */
// Example 12: Valid Multi-Domain Log Source
/*************************************************************************************************** */
const validMultiDomainLogSource = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a442",
	"type": "x-mitre-log-source",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Network Traffic",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0",
	"x_mitre_attack_spec_version": "4.0.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_domains": ["enterprise-attack", "ics-attack"],
	"external_references": [
		{
			"source_name": "mitre-attack",
			"external_id": "LS0030",
			"url": "https://attack.mitre.org/log-sources/LS0030"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "pcap",
			"channel": "network",
		},
		{
			"name": "netflow",
			"channel": "flow",
		},
		{
			"name": "firewall",
			"channel": "traffic",
		}
	]
};

console.log("\nExample 12 - Valid Multi-Domain Log Source:");
console.log(`SUCCESS ${logSourceSchema.parse(validMultiDomainLogSource).name}`)

/*************************************************************************************************** */
// Example 13: Invalid Log Source (invalid domain)
/*************************************************************************************************** */
const invalidLogSourceDomain = {
	...validLogSource,
	"x_mitre_domains": [
		"invalid-domain"
	]
};

console.log("\nExample 13 - Invalid Log Source (invalid domain):");
try {
	logSourceSchema.parse(invalidLogSourceDomain);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// ✖ Invalid option: expected one of "enterprise-attack"|"mobile-attack"|"ics-attack"
//   → at x_mitre_domains[0]

/*************************************************************************************************** */
// Example 14: Valid Log Source with Special Characters
/*************************************************************************************************** */
const validLogSourceSpecialChars = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a443",
	"type": "x-mitre-log-source",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Microsoft-Windows-Security-Auditing/Operational",
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
			"external_id": "LS0099",
			"url": "https://attack.mitre.org/log-sources/LS0099"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "Security/Application-Logs_2024",
			"channel": "Microsoft-Windows-Security-Auditing/Operational",
		},
		{
			"name": "EventLog:Security",
			"channel": "EventID=4624",
		}
	]
};

console.log("\nExample 14 - Valid Log Source with Special Characters:");
console.log(`SUCCESS ${logSourceSchema.parse(validLogSourceSpecialChars).name}`)

/*************************************************************************************************** */
// Example 15: Log Source with unknown property
/*************************************************************************************************** */
const logSourceWithUnknownProperty = {
	...validLogSource,
	foo: 'bar'
}

console.log("\nExample 15 - Parsing a log source with an unknown property (foo: 'bar'):");
try {
	const parsedLogSource = logSourceSchema.parse(logSourceWithUnknownProperty);
	console.log("Parsed successfully. Log Source name:", parsedLogSource.name);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// ✖ Unrecognized key: "foo"

/*************************************************************************************************** */
// Example 16: Invalid Log Source (wrong STIX ID format)
/*************************************************************************************************** */
const invalidLogSourceStixId = {
	...validLogSource,
	"id": "x-mitre-log-source--1"
};

console.log("\nExample 16 - Invalid Log Source (wrong STIX ID format):");
try {
	logSourceSchema.parse(invalidLogSourceStixId);
} catch (error) {
	if (error instanceof z.core.$ZodError) {
		console.log("Validation errors:", z.prettifyError(error));
	}
}
// ✖ Invalid STIX Identifier for LogSource object: contains invalid UUIDv4 format
//   → at id

/*************************************************************************************************** */
// Example 17: Valid Log Source with Complex Permutations
/*************************************************************************************************** */
const validLogSourceComplexPermutations = {
	"id": "x-mitre-log-source--7c93fd1a-1e6b-4b4e-be42-0d843216a444",
	"type": "x-mitre-log-source",
	"spec_version": "2.1",
	"created": "2025-06-03T15:32:27Z",
	"modified": "2025-06-03T15:32:27Z",
	"name": "Comprehensive System Monitoring",
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
			"external_id": "LS0100",
			"url": "https://attack.mitre.org/log-sources/LS0100"
		}
	],
	"x_mitre_log_source_permutations": [
		{
			"name": "sysmon:1",
			"channel": "process_creation",
		},
		{
			"name": "auditd:SYSCALL",
			"channel": "execve",
		},
		{
			"name": "powershell:4104",
			"channel": "script_block",
		},
		{
			"name": "wmi:19",
			"channel": "wmi_event",
		}
	]
};

console.log("\nExample 17 - Valid Log Source with Complex Permutations:");
console.log(`SUCCESS ${logSourceSchema.parse(validLogSourceComplexPermutations).name} (${validLogSourceComplexPermutations.x_mitre_log_source_permutations.length} permutations)`);