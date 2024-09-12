import { z } from "zod";
import { tacticSchema } from "../../src/schemas/sdo/tactic.schema";

/****************************************************************************************************/
// Example 1: Valid Tactic
/****************************************************************************************************/
const validTactic = {
	"id": "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"name": "Execution",
	"description": "The adversary is trying to run malicious code.\n\nExecution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery. ",
	"external_references": [
		{
			"external_id": "TA0002",
			"url": "https://attack.mitre.org/tactics/TA0002",
			"source_name": "mitre-attack"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_shortname": "execution",
	"type": "x-mitre-tactic",
	"modified": "2019-07-19T17:42:06.909Z",
	"created": "2018-10-17T00:14:20.652Z",
	"spec_version": "2.1",
	"x_mitre_attack_spec_version": "2.1.0",
	"x_mitre_domains": [
		"enterprise-attack"
	],
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_version": "1.0"
};

console.log("\nExample 1: Valid Tactic:");
console.log(`SUCCESS ${tacticSchema.parse(validTactic).name}`)

/****************************************************************************************************/
// Example 2: Invalid Tactic (ATT&CK ID does not match format TA####)
/****************************************************************************************************/
const invalidTacticID = {
	...validTactic,
	external_references: [
		{
			source_name: "mitre-attack",
			external_id: "X0000"
		}
	]
};

console.log("\nExample 2: Invalid Tactic (ATT&CK ID does not match format TA####):");
try {
	tacticSchema.parse(invalidTacticID);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.log("Validation errors:", error.errors);
	}
}
/**
	Validation errors: [
		{
			code: 'custom',
			message: 'The first external_reference must match the ATT&CK ID format "TA####"}.',
			path: []
		}
	]
 */

/****************************************************************************************************/
// Example 3: Invalid Tactic (missing required fields)
/****************************************************************************************************/
const invalidTacticMissingFields = {
	"id": "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	// Missing name
	"description": "The adversary is trying to run malicious code.\n\nExecution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery. ",
	"external_references": [
		{
			"external_id": "TA0002",
			"url": "https://attack.mitre.org/tactics/TA0002",
			"source_name": "mitre-attack"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	// Missing x_mitre_shortname
	"type": "x-mitre-tactic",
	"modified": "2019-07-19T17:42:06.909Z",
	"created": "2018-10-17T00:14:20.652Z",
	"spec_version": "2.1",
	"x_mitre_attack_spec_version": "2.1.0",
	// Missing x_mitre_domains
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	// Missing x_mitre_version (Defaults to 1.0)
};

console.log("\nExample 3: Invalid Tactic (missing required fields):");
try {
	tacticSchema.parse(invalidTacticMissingFields);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.log("Validation errors:", error.errors);
	}
}

// Expected Output:
// Validation errors: [
// 	{
// 	  code: 'invalid_type',
// 	  expected: 'string',
// 	  received: 'undefined',
// 	  path: [ 'name' ],
// 	  message: 'Required'
// 	},
// 	{
// 	  code: 'invalid_type',
// 	  expected: 'string',
// 	  received: 'undefined',
// 	  path: [ 'x_mitre_version' ],
// 	  message: 'Required'
// 	},
// 	{
// 	  code: 'invalid_type',
// 	  expected: 'array',
// 	  received: 'undefined',
// 	  path: [ 'x_mitre_domains' ],
// 	  message: 'Required'
// 	},
// 	{
// 	  expected: "'credential-access' | 'execution' | 'impact' | 'persistence' | 'privilege-escalation' | 'lateral-movement' | 'defense-evasion' | 'exfiltration' | 'discovery' | 'collection' | 'resource-development' | 'reconnaissance' | 'command-and-control' | 'initial-access' | 'inhibit-response-function' | 'privilege-escalation' | 'lateral-movement' | 'discovery' | 'initial-access' | 'impact' | 'persistence' | 'execution' | 'command-and-control' | 'collection' | 'evasion' | 'impair-process-control' | 'initial-access' | 'exfiltration' | 'persistence' | 'privilege-escalation' | 'command-and-control' | 'execution' | 'impact' | 'credential-access' | 'collection' | 'lateral-movement' | 'defense-evasion' | 'network-effects' | 'discovery' | 'remote-service-effects'",
// 	  received: 'undefined',
// 	  code: 'invalid_type',
// 	  path: [ 'x_mitre_shortname' ],
// 	  message: 'Required'
// 	}
//   ]


/****************************************************************************************************/
// Example 4: Tactic with invalid type
/****************************************************************************************************/
const tacticWithInvalidType = {
	...validTactic,
	type: "invalid-type"
};

console.log("\nExample 4: Tactic with invalid type:");
try {
	tacticSchema.parse(tacticWithInvalidType);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.log("Validation error:", error.errors[0].message);
	}
}

// Expected Output:
// Validation error: Invalid 'type' property. Expected 'x-mitre-tactic' for Tactic object, but received 'invalid-type'.


/****************************************************************************************************/
// Example 5: Tactic with optional fields
/****************************************************************************************************/
const tacticWithOptionalFields = {
	...validTactic,
	x_mitre_deprecated: true
}

console.log("\nExample 5: Tactic with optional fields:");
console.log(tacticSchema.parse(tacticWithOptionalFields));

// Expected output:
// {
// 	id: 'x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5',
// 	type: 'x-mitre-tactic',
// 	spec_version: '2.1',
// 	created: '2018-10-17T00:14:20.652Z',
// 	modified: '2019-07-19T17:42:06.909Z',
// 	created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
// 	external_references: [
// 	  {
// 		source_name: 'mitre-attack',
// 		url: 'https://attack.mitre.org/tactics/TA0002',
// 		external_id: 'TA0002'
// 	  }
// 	],
// 	object_marking_refs: [ 'marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168' ],
// 	name: 'Execution',
// 	x_mitre_attack_spec_version: '2.1.0',
// 	x_mitre_version: '1.0',
// 	description: 'The adversary is trying to run malicious code.\n' +
// 	  '\n' +
// 	  'Execution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery. ',
// 	x_mitre_domains: [ 'enterprise-attack' ],
// 	x_mitre_deprecated: true,
// 	x_mitre_shortname: 'execution',
// 	x_mitre_modified_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5'
//   }