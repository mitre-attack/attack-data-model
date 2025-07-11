import { z } from "zod/v4";
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
console.log(`SUCCESS ${techniqueSchema.parse(validEnterpriseTechnique).name}`)

/*************************************************************************************************** */
// Example 2: Invalid Technique (ATT&CK ID does not match format T####)
/*************************************************************************************************** */
const invalidTechniqueID = {
	...validEnterpriseTechnique,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T1001",
			"external_id": "A00"
		}
	],
};

console.log("\nExample 2 - Invalid Technique (ATT&CK ID does not match format T####):");
const e2 = techniqueSchema.safeParse(invalidTechniqueID);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 3: Valid Sub-technique
/*************************************************************************************************** */
const validSubtechnique = {
	"modified": "2023-03-20T18:43:03.218Z",
	"name": "Uninstall Malicious Application",
	"description": "Adversaries may include functionality in malware that uninstalls the malicious application from the device. This can be achieved by: \n \n* Abusing device owner permissions to perform silent uninstallation using device owner API calls. \n* Abusing root permissions to delete files from the filesystem. \n* Abusing the accessibility service. This requires sending an intent to the system to request uninstallation, and then abusing the accessibility service to click the proper places on the screen to confirm uninstallation.",
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-mobile-attack",
			"phase_name": "defense-evasion"
		}
	],
	"x_mitre_deprecated": false,
	"x_mitre_detection": "Users can see a list of applications that can use accessibility services in the device settings. Application vetting services could look for use of the accessibility service or features that typically require root access.",
	"x_mitre_domains": [
		"mobile-attack"
	],
	"x_mitre_is_subtechnique": true,
	"x_mitre_platforms": [
		"Android"
	],
	"x_mitre_version": "1.1",
	"x_mitre_tactic_type": [
		"Post-Adversary Device Access"
	],
	"type": "attack-pattern",
	"id": "attack-pattern--0cdd66ad-26ac-4338-a764-4972a1e17ee3",
	"created": "2022-03-30T19:31:31.855Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T1630/001",
			"external_id": "T1630.001"
		},
		{
			"source_name": "NIST Mobile Threat Catalogue",
			"url": "https://pages.nist.gov/mobile-threat-catalogue/application-threats/APP-43.html",
			"external_id": "APP-43"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_attack_spec_version": "3.1.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"spec_version": "2.1"
}
console.log("\nExample 3 - Valid Subtechnique:");
console.log(`SUCCESS ${techniqueSchema.parse(validSubtechnique).name}`)

/*************************************************************************************************** */
// Example 4: Invalid Sub-technique (ATT&CK ID does not match format T####.###)
/*************************************************************************************************** */
const invalidSubtechniqueID = {
	...validSubtechnique,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T1630/001",
			"external_id": "T1630"
		},
		{
			"source_name": "NIST Mobile Threat Catalogue",
			"url": "https://pages.nist.gov/mobile-threat-catalogue/application-threats/APP-43.html",
			"external_id": "APP-43"
		}
	],
}

console.log("\nExample 4 - Invalid Subtechnique (ATT&CK ID does not match format T####.###):");
const e4 = techniqueSchema.safeParse(invalidSubtechniqueID);
console.log(z.prettifyError(e4.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 5: Invalid Technique (missing required fields)
/*************************************************************************************************** */
const invalidTechniqueMissingFields = {
	"modified": "2024-02-02T19:04:35.389Z",
	"description": "Adversaries may obfuscate command and control traffic to make it more difficult to detect.(Citation: Bitdefender FunnyDream Campaign November 2020) Command and control (C2) communications are hidden (but not necessarily encrypted) in an attempt to make the content more difficult to discover or decipher and to make the communication less conspicuous and hide commands from being seen. This encompasses many methods, such as adding junk data to protocol traffic, using steganography, or impersonating legitimate protocols. ",
	"x_mitre_deprecated": false,
	"x_mitre_is_subtechnique": false,
	"x_mitre_platforms": [
		"Linux",
		"macOS",
		"Windows"
	],
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

console.log("\nExample 5 - Invalid Technique (missing required fields):");
const e5 = techniqueSchema.safeParse(invalidTechniqueMissingFields);
console.log(z.prettifyError(e5.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 6: Technique with invalid type
/*************************************************************************************************** */
const techniqueWithInvalidType = {
	...validEnterpriseTechnique,
	"type": 'invalid-type'
}

console.log("\nExample 6 - Technique with invalid type:");
const e6 = techniqueSchema.safeParse(techniqueWithInvalidType);
console.log(z.prettifyError(e6.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 7: Valid Enterprise Technique with Enterprise-only fields
/*************************************************************************************************** */
const validTechniqueWithEnterpriseFields = {
	...validEnterpriseTechnique,
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "privilege-escalation"
		},
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "defense-evasion"
		},
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "execution"
		},
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "impact"
		}
	],
	"x_mitre_system_requirements": ["Windows 10"],
	"x_mitre_permissions_required": ["User"],
	"x_mitre_effective_permissions": ["Administrator"],
	"x_mitre_defense_bypassed": ["Anti-virus"],
	"x_mitre_remote_support": true,
	"x_mitre_impact_type": ["Integrity"]
};
console.log("\nExample 7: Valid Enterprise Technique with Enterprise-only fields:");
let result = techniqueSchema.parse(validTechniqueWithEnterpriseFields);
console.log(`SUCCESS ${result.name} (${result.x_mitre_domains})`)

/*************************************************************************************************** */
// Example 8: Invalid Enterprise Technique with Mobile-only fields
/*************************************************************************************************** */
const invalidEnterpriseTechnique = {
	...validEnterpriseTechnique,
	"x_mitre_tactic_type": ["Post-Adversary Device Access"],
};

console.log("\nExample 8: Invalid Enterprise Technique with Mobile-only fields:");
const e8 = techniqueSchema.safeParse(invalidEnterpriseTechnique);
console.log(z.prettifyError(e8.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 9: Valid Mobile Technique with Mobile-only fields
/*************************************************************************************************** */
const validMobileTechnique = {
	"modified": "2023-03-15T16:23:59.281Z",
	"name": "Abuse Elevation Control Mechanism",
	"description": "Adversaries may circumvent mechanisms designed to control elevated privileges to gain higher-level permissions. Most modern systems contain native elevation control mechanisms that are intended to limit privileges that a user can gain on a machine. Authorization has to be granted to specific users in order to perform tasks that are designated as higher risk. An adversary can use several methods to take advantage of built-in control mechanisms in order to escalate privileges on a system. ",
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-mobile-attack",
			"phase_name": "privilege-escalation"
		}
	],
	"x_mitre_deprecated": false,
	"x_mitre_detection": "When an application requests administrator permission, users are presented with a popup and the option to grant or deny the request. Application vetting services can detect when an application requests administrator permission. Extra scrutiny could be applied to applications that do",
	"x_mitre_domains": [
		"mobile-attack"
	],
	"x_mitre_is_subtechnique": false,
	"x_mitre_platforms": [
		"Android"
	],
	"x_mitre_version": "1.1",
	"x_mitre_tactic_type": [
		"Post-Adversary Device Access"
	],
	"type": "attack-pattern",
	"id": "attack-pattern--08ea902d-ecb5-47ed-a453-2798057bb2d3",
	"created": "2022-04-01T15:54:05.633Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T1626",
			"external_id": "T1626"
		},
		{
			"source_name": "NIST Mobile Threat Catalogue",
			"url": "https://pages.nist.gov/mobile-threat-catalogue/application-threats/APP-22.html",
			"external_id": "APP-22"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"x_mitre_attack_spec_version": "3.1.0",
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"spec_version": "2.1"
}

console.log("\nExample 9: Valid Mobile Technique with Mobile-only fields:");
result = techniqueSchema.parse(validMobileTechnique);
console.log(`SUCCESS ${result.name} (${result.x_mitre_domains})`)

/*************************************************************************************************** */
// Example 10: Invalid Mobile Technique with Enterprise-only fields
/*************************************************************************************************** */
const invalidMobileTechnique = {
	...validMobileTechnique,
	"x_mitre_system_requirements": ["system requirements"]
}

console.log("\nExample 10: Invalid Mobile Technique with Enterprise-only fields:");
const e10 = techniqueSchema.safeParse(invalidMobileTechnique);
console.log(z.prettifyError(e10.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 11: Valid ICS Technique with ICS-only fields
/*************************************************************************************************** */
const validIcsTechnique = {
	"modified": "2023-10-13T17:56:58.380Z",
	"name": "Block Command Message",
	"description": "Adversaries may block a command message from reaching its intended target to prevent command execution. In OT networks, command messages are sent to provide instructions to control system devices. A blocked command message can inhibit response functions from correcting a disruption or unsafe condition. (Citation: Bonnie Zhu, Anthony Joseph, Shankar Sastry 2011)  (Citation: Electricity Information Sharing and Analysis Center; SANS Industrial Control Systems March 2016)",
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-ics-attack",
			"phase_name": "inhibit-response-function"
		}
	],
	"x_mitre_attack_spec_version": "3.2.0",
	"x_mitre_deprecated": false,
	"x_mitre_domains": [
		"ics-attack"
	],
	"x_mitre_is_subtechnique": false,
	"x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"x_mitre_platforms": [
		"None"
	],
	"x_mitre_version": "1.1",
	"x_mitre_data_sources": [
		"Process: Process Termination",
		"Operational Databases: Process History/Live Data",
		"Application Log: Application Log Content",
		"Network Traffic: Network Traffic Flow",
		"Operational Databases: Process/Event Alarm"
	],
	"type": "attack-pattern",
	"id": "attack-pattern--008b8f56-6107-48be-aa9f-746f927dbb61",
	"created": "2020-05-21T17:43:26.506Z",
	"created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
	"revoked": false,
	"external_references": [
		{
			"source_name": "mitre-attack",
			"url": "https://attack.mitre.org/techniques/T0803",
			"external_id": "T0803"
		},
		{
			"source_name": "Bonnie Zhu, Anthony Joseph, Shankar Sastry 2011",
			"description": "Bonnie Zhu, Anthony Joseph, Shankar Sastry 2011 A Taxonomy of Cyber Attacks on SCADA Systems Retrieved. 2018/01/12 ",
			"url": "http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6142258"
		},
		{
			"source_name": "Electricity Information Sharing and Analysis Center; SANS Industrial Control Systems March 2016",
			"description": "Electricity Information Sharing and Analysis Center; SANS Industrial Control Systems 2016, March 18 Analysis of the Cyber Attack on the Ukranian Power Grid: Defense Use Case Retrieved. 2018/03/27 ",
			"url": "https://assets.contentstack.io/v3/assets/blt36c2e63521272fdc/blt6a77276749b76a40/607f235992f0063e5c070fff/E-ISAC_SANS_Ukraine_DUC_5%5b73%5d.pdf"
		}
	],
	"object_marking_refs": [
		"marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
	],
	"spec_version": "2.1"
}

console.log("\nExample 11: Valid ICS Technique with ICS-only fields:");
result = techniqueSchema.parse(validIcsTechnique);
console.log(`SUCCESS ${result.name} (${result.x_mitre_domains})`)

/*************************************************************************************************** */
// Example 12: Invalid ICS Technique with Enterprise-only fields
/*************************************************************************************************** */
const invalidIcsTechnique = {
	...validIcsTechnique,
	"x_mitre_permissions_required": ["permissions required"]
}

console.log("\nExample 12: Invalid ICS Technique with Enterprise-only fields:");
const e12 = techniqueSchema.safeParse(invalidIcsTechnique);
console.log(z.prettifyError(e12.error as z.core.$ZodError));

/*************************************************************************************************** */
// Example 13: Valid multi-domain Technique with Enterprise/ICS-only fields
/*************************************************************************************************** */
const validMultiDomainTechnique = {
	...validEnterpriseTechnique,
	"x_mitre_domains": [
		"enterprise-attack",
		"ics-attack"
	],
	"x_mitre_data_sources": [
		"Process: Process Termination",
		"Operational Databases: Process History/Live Data",
		"Application Log: Application Log Content",
		"Network Traffic: Network Traffic Flow",
		"Operational Databases: Process/Event Alarm"
	],
}

console.log("\nExample 13: Valid multi-domain Technique with Enterprise/ICS-only fields:");
result = techniqueSchema.parse(validMultiDomainTechnique);
console.log(`SUCCESS ${result.name} (${result.x_mitre_domains})`)

/*************************************************************************************************** */
// Example 14: Enterprise-only fields in the wrong tactic
/*************************************************************************************************** */
console.log("\nExample 14: Invalid Enterprise Technique with Enterprise-only field in wrong tactic:");
const invalidEnterpriseTechniqueWrongTactic = {
	...validEnterpriseTechnique,
	"kill_chain_phases": [
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "execution"
		}
	],
	"x_mitre_permissions_required": ["User"]
};

const e14 = techniqueSchema.safeParse(invalidEnterpriseTechniqueWrongTactic);
console.log(z.prettifyError(e14.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 15: Technique with unknown property
/** ************************************************************************************************* */
const techniqueWithUnknownProperty = {
	...validEnterpriseTechnique,
	foo: 'bar'
}

console.log("\nExample 15 - Parsing a technique with an unknown property (foo: 'bar'):");
const e15 = techniqueSchema.safeParse(techniqueWithUnknownProperty);
if (e15.success) {
	console.log("Parsed successfully. Technique name:", e15.data.name);
} else {
	console.log(z.prettifyError(e15.error as z.core.$ZodError));
}