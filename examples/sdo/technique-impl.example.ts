import { z } from "zod/v4";
import { type TechniqueCls, TechniqueImpl } from "../../src/api/sdo/technique.impl.js";
import { techniqueSchema } from "../../src/schemas/sdo/technique.schema.js";

/*************************************************************************************************** */
// Example 1: Valid Technique
/*************************************************************************************************** */
const validEnterpriseTechnique = {
	"modified": "2024-02-02T19:04:35.389Z",
	"name": "Data Obfuscation",
	"description": "Adversaries may obfuscate command and control traffic to make it more difficult to detect.(Citation: Bitdefender FunnyDream Campaign November 2020) Command and control (C2) communications are hidden (but not necessarily encrypted) in an attempt to make the content more difficult to discover or decipher and to make the communication less conspicuous and hide commands from being seen. This encompasses many methods, such as adding junk data to protocol traffic, using steganography, or impersonating legitimate protocols. ",
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "command-and-control"
		}
	],
	"x_mitre_deprecated": false,
	"x_mitre_domains": [
		"enterprise-attack"
	],
	"x_mitre_is_subtechnique": false,
	"x_mitre_platforms": [
		"Linux",
		"macOS",
		"Windows"
	],
	"x_mitre_version": "1.1",
	"type": "attack-pattern",
	"id": "attack-pattern--ad255bfe-a9e6-4b52-a258-8d3462abe842",
	"created": "2017-05-31T21:30:18.931Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T1001",
			"external_id": "T1001"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_attack_spec_version": "3.2.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"spec_version": "2.1"
};

console.log("\nExample 1 - Valid Technique:");
console.log(`SUCCESS ${techniqueSchema.safeParse(validEnterpriseTechnique).success}`)

let technique: TechniqueCls
try {
	const invalidTechnique = { ...validEnterpriseTechnique, id: 'foobar' }
	technique = new TechniqueImpl(invalidTechnique);
} catch (err) {
	console.error('Could not initialize class instance due to Zod error:')
	console.error(z.prettifyError(err));
	// Could not initialize class instance due to Zod error:
	// ✖ Invalid STIX Identifier: must comply with format 'type--UUIDv4'
	// → at id
	// ✖ Invalid STIX Identifier for STIX object: contains invalid STIX type 'foobar'
	// → at id
	// ✖ Invalid STIX Identifier for STIX object: contains invalid UUIDv4 format
	// → at id
	// ✖ Invalid STIX Identifier: must start with 'attack-pattern--'
	// → at id
	process.exit()
}

console.log(technique.id);
// attack-pattern--ad255bfe-a9e6-4b52-a258-8d3462abe842

console.log(typeof technique.id);
// string

console.log(technique.spec_version);
// 2.1

console.log(technique.external_references);
// [
//   {
//     source_name: 'mitre-attack',
//     url: 'https://attack.mitre.org/techniques/T1001',
//     external_id: 'T1001'
//   }
// ]

console.log(technique.getAttackId());
// T1001

console.log(technique.getDisplayName());
// T1001: Data Obfuscation

console.log(technique.equals(new TechniqueImpl(validEnterpriseTechnique)))
// true

console.log(Object.keys(technique))
/**
 [
   'id',
   'type',
   'spec_version',
   'created',
   'modified',
   'created_by_ref',
   'revoked',
   'external_references',
   'object_marking_refs',
   'name',
   'x_mitre_attack_spec_version',
   'x_mitre_version',
   'x_mitre_deprecated',
   'kill_chain_phases',
   'description',
   'x_mitre_platforms',
   'x_mitre_is_subtechnique',
   'x_mitre_domains',
   'x_mitre_modified_by_ref',
   '_subTechniques',
   '_tactics',
   '_mitigations',
   '_logSources',
   '_relatedTechniques',
   '_targetAssets',
   '_detectingDataComponents'
 ]
 */

