import { z } from "zod";
import { toolSchema } from "../src/schemas/sdo/tool.schema";

/** ************************************************************************************************* */
// Example 1: Valid Tool
/** ************************************************************************************************* */

const validTool = {
    type: 'tool',
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
    spec_version: '2.1',
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: "2021-07-30T15:43:17.770Z",
    modified: "2024-04-11T00:06:01.264Z",
    name: "Sliver",
    description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/software/S0049",
            external_id: "S0049"
        },
        {
            source_name: "F-Secure The Dukes",
            description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
            url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
        }
    ],
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    x_mitre_aliases: [
        "Sliver"
    ],
    x_mitre_deprecated: false,
    x_mitre_domains: [
        "enterprise-attack"
    ],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    x_mitre_platforms: [
        "Windows",
        "Linux",
        "macOS"
    ],
    x_mitre_version: "1.2",
    x_mitre_attack_spec_version: "3.2.0"
};

console.log("Example 1 - Valid Tool:");
console.log(toolSchema.parse(validTool));

/** ************************************************************************************************* */
// Example 2: Invalid Tool (missing required fields)
/** ************************************************************************************************* */

const invalidTool = {
    type: 'tool',
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
    spec_version: '2.1',
    // Missing created_by_ref
    created: "2021-07-30T15:43:17.770Z",
    modified: "2024-04-11T00:06:01.264Z",
    name: "Sliver",
    description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
    // Missing external_references
    // Missing object_marking_refs
    x_mitre_aliases: [
        "Sliver"
    ],
    x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ],
    x_mitre_deprecated: false,
    x_mitre_domains: [
        "enterprise-attack"
    ],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    x_mitre_platforms: [
        "Windows",
        "Linux",
        "macOS"
    ],
    x_mitre_version: "1.2"
};

console.log("Example 2 - Invalid Tool (missing required fields):");
try {
    toolSchema.parse(invalidTool);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}

/** ************************************************************************************************* */
// Example 3: Tool with optional fields
/** ************************************************************************************************* */
const toolWithOptionalFields = {
    ...validTool,
    x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ]
};


console.log("\nExample 3 - Tool with optional fields:");
console.log(toolSchema.parse(toolWithOptionalFields));


/** ************************************************************************************************* */
// Example 4: Tool with invalid type
/** ************************************************************************************************* */
const toolWithInvalidType = {
    ...validTool,
    type: "invalid-type",
};

console.log("\nExample 4 - Tool with invalid type:");
try {
    toolSchema.parse(toolWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "tool"
    }
}

/** ************************************************************************************************* */
// Example 5: Tool with invalid id
/** ************************************************************************************************* */
const toolWithInvalidId = {
    ...validTool,
    id: 'malware--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
};

console.log("\nExample 5 - Tool with invalid id:");
try {
    toolSchema.parse(toolWithInvalidId);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "tool"
    }
}
/** ************************************************************************************************* */
// Example 6: Tool with fields in STIX but not in ATT&CK
/** ************************************************************************************************* */
const toolWithStixFields = {
    ...validTool,
    kill_chain_phases: [
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "command-and-control"
		}
	],
    aliases: [
        "Sliver"
    ],
    tool_types: ["remote-access"],
    tool_version: "1.0"
};


console.log("\nExample 6 - Tool with fields in STIX but not in ATT&CK:");
console.log(toolSchema.parse(toolWithStixFields));

/** ************************************************************************************************* */
// Example 7: Parsing the provided example tool
/** ************************************************************************************************* */

const exampleOfRealTool = {
    "type": "tool",
    "id": "tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2021-07-30T15:43:17.770Z",
    "modified": "2024-04-11T00:06:01.264Z",
    "name": "Sliver",
    "description": "[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)",
    "labels": [
        "tool"
    ],
    "external_references": [
        {
            "source_name": "mitre-attack",
            "url": "https://attack.mitre.org/software/S0633",
            "external_id": "S0633"
        },
        {
            "source_name": "Bishop Fox Sliver Framework August 2019",
            "description": "Kervella, R. (2019, August 4). Cross-platform General Purpose Implant Framework Written in Golang. Retrieved July 30, 2021.",
            "url": "https://labs.bishopfox.com/tech-blog/sliver"
        }
    ],
    "object_marking_refs": [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    "x_mitre_aliases": [
        "Sliver"
    ],
    "x_mitre_attack_spec_version": "3.2.0",
    "x_mitre_contributors": [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ],
    "x_mitre_deprecated": false,
    "x_mitre_domains": [
        "enterprise-attack"
    ],
    "x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "x_mitre_platforms": [
        "Windows",
        "Linux",
        "macOS"
    ],
    "x_mitre_version": "1.2"
}

console.log("\nExample 7 - Parsing the provided example tool:");
try {
    const parsedTool = toolSchema.parse(exampleOfRealTool);
    console.log(parsedTool);
    console.log("Parsed successfully. Tool name:", parsedTool.name);
    // Parsed successfully. Tool name: Sliver
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}