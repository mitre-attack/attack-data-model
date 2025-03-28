import { z } from "zod";
import { malwareSchema } from "../../src/schemas/sdo/malware.schema.js";
import { toolSchema } from "../../src/schemas/sdo/tool.schema.js";

// Malware Examples - 
console.log("****************************************************************************************************")
console.log("Malware Examples")
console.log("****************************************************************************************************")
/** ************************************************************************************************* */
// Example 1: Valid Malware
/** ************************************************************************************************* */

const validMalware = {
    type: 'malware',
    id: 'malware--2daa14d6-cbf3-4308-bb8e-213c324a08e4',
    spec_version: '2.1',
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: "2017-05-31T21:32:29.203Z",
    modified: "2021-02-09T13:58:23.806Z",
    name: "HAMMERTOSS",
    description: "[HAMMERTOSS](https://attack.mitre.org/software/S0037) is a backdoor that was used by [APT29](https://attack.mitre.org/groups/G0016) in 2015. (Citation: FireEye APT29) (Citation: F-Secure The Dukes)",
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/software/S0037",
            external_id: "S0037"
        },
        {
            source_name: "FireEye APT29",
            description: "FireEye Labs. (2015, July). HAMMERTOSS: Stealthy Tactics Define a Russian Cyber Threat Group. Retrieved September 17, 2015.",
            url: "https://www2.fireeye.com/rs/848-DID-242/images/rpt-apt29-hammertoss.pdf"
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
    x_mitre_attack_spec_version: "2.1.0",
    x_mitre_domains: [
        "enterprise-attack"
    ],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    is_family: false,
    x_mitre_version: "1.2"
};

console.log("Example 1 - Valid Malware:");
console.log(malwareSchema.parse(validMalware));

/** ************************************************************************************************* */
// Example 2: Invalid Malware (missing required fields)
/** ************************************************************************************************* */

const invalidMalware = {
    type: 'malware',
    id: 'malware--2daa14d6-cbf3-4308-bb8e-213c324a08e4',
    spec_version: '2.1',
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: "2017-05-31T21:32:29.203Z",
    modified: "2021-02-09T13:58:23.806Z",
    name: "HAMMERTOSS",
    description: "[HAMMERTOSS](https://attack.mitre.org/software/S0037) is a backdoor that was used by [APT29](https://attack.mitre.org/groups/G0016) in 2015. (Citation: FireEye APT29) (Citation: F-Secure The Dukes)",
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/software/S0037",
            external_id: "S0037"
        },
        {
            source_name: "FireEye APT29",
            description: "FireEye Labs. (2015, July). HAMMERTOSS: Stealthy Tactics Define a Russian Cyber Threat Group. Retrieved September 17, 2015.",
            url: "https://www2.fireeye.com/rs/848-DID-242/images/rpt-apt29-hammertoss.pdf"
        },
        {
            source_name: "F-Secure The Dukes",
            description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
            url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
        }
    ],
    // Missing object_marking_refs
    x_mitre_aliases: [
        "HAMMERTOSS",
        "HammerDuke",
        "NetDuke"
    ],
    x_mitre_attack_spec_version: "2.1.0",
    x_mitre_domains: [
        "enterprise-attack"
    ],
    // Missing x_mitre_modified_by_ref
    x_mitre_platforms: [
        "Windows"
    ],
    // Missing is_family
    x_mitre_version: "1.2"
};

console.log("Example 2 - Invalid Malware (missing required fields):");
try {
    malwareSchema.parse(invalidMalware);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}

/**
 * Validation errors: [
    {
      code: 'invalid_type',
      expected: 'array',
      received: 'undefined',
      path: [ 'object_marking_refs' ],
      message: 'Required'
    },
    {
      code: 'custom',
      message: 'Invalid STIX Identifier',
      fatal: true,
      path: [ 'x_mitre_modified_by_ref' ]
    },
    {
      code: 'invalid_type',
      expected: 'boolean',
      received: 'undefined',
      path: [ 'is_family' ],
      message: 'Required'
    }
  ]
*/
/** ************************************************************************************************* */
// Example 3: Malware with optional fields
/** ************************************************************************************************* */
const malwareWithOptionalFields = {
    ...validMalware,
    x_mitre_aliases: [
        "HAMMERTOSS",
        "HammerDuke",
        "NetDuke"
    ],
    x_mitre_platforms: [
        "Windows"
    ],
    x_mitre_contributors: ["Contributor"],
    x_mitre_deprecated: false,
    x_mitre_old_attack_id: "MOB-S0123"
};


console.log("\nExample 3 - Malware with optional fields:");
console.log(malwareSchema.parse(malwareWithOptionalFields));


/** ************************************************************************************************* */
// Example 4: Malware with invalid type
/** ************************************************************************************************* */
const malwareWithInvalidType = {
    ...validMalware,
    type: "invalid-type",
};

console.log("\nExample 4 - Malware with invalid type:");
try {
    malwareSchema.parse(malwareWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "malware"
    }
}

/** ************************************************************************************************* */
// Example 5: Malware with invalid id
/** ************************************************************************************************* */
const malwareWithInvalidId = {
    ...validMalware,
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
};

console.log("\nExample 5 - Malware with invalid id:");
try {
    malwareSchema.parse(malwareWithInvalidId);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "malware"
    }
}

/** ************************************************************************************************* */
// Example 6: Malware with fields in STIX but not in ATT&CK
/** ************************************************************************************************* */
const malwareWithStixFields = {
    ...validMalware,
    kill_chain_phases: [
		{
			"kill_chain_name": "mitre-attack",
			"phase_name": "command-and-control"
		}
	],
    aliases: [
        "HAMMERTOSS",
        "HammerDuke",
        "NetDuke"
    ],
    first_seen: "2015-07-01T00:00:00.000Z",
    last_seen: "2016-07-01T00:00:00.000Z",
    malware_types: ["remote-access-trojan"],
    os_execution_envs: [
        "Windows",
        "Linux"
    ],
    architecture_execution_envs: [
        "x86"
    ],
    capabilities: [
        "exfiltrates-data",
        "accesses-remote-machines"
    ],
    sample_refs: [
        "file--a3b8b3b2-4d2f-4a2e-9a1b-1c8b3e4e6f5d"
    ],
    implementation_languages: [
        "python"
    ]
};


console.log("\nExample 6 - Malware with fields in STIX but not in ATT&CK:");
console.log(malwareSchema.parse(malwareWithStixFields));

/** ************************************************************************************************* */
// Example 7: Parsing the provided example malware
/** ************************************************************************************************* */

const exampleOfRealMalware = {
    "type": "malware",
    "id": "malware--2daa14d6-cbf3-4308-bb8e-213c324a08e4",
    "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "created": "2017-05-31T21:32:29.203Z",
    "modified": "2021-02-09T13:58:23.806Z",
    "name": "HAMMERTOSS",
    "description": "[HAMMERTOSS](https://attack.mitre.org/software/S0037) is a backdoor that was used by [APT29](https://attack.mitre.org/groups/G0016) in 2015. (Citation: FireEye APT29) (Citation: F-Secure The Dukes)",
    "labels": [
        "malware"
    ],
    "external_references": [
        {
            "source_name": "mitre-attack",
            "url": "https://attack.mitre.org/software/S0037",
            "external_id": "S0037"
        },
        {
            "source_name": "FireEye APT29",
            "description": "FireEye Labs. (2015, July). HAMMERTOSS: Stealthy Tactics Define a Russian Cyber Threat Group. Retrieved September 17, 2015.",
            "url": "https://www2.fireeye.com/rs/848-DID-242/images/rpt-apt29-hammertoss.pdf"
        },
        {
            "source_name": "F-Secure The Dukes",
            "description": "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
            "url": "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
        }
    ],
    "object_marking_refs": [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    "x_mitre_aliases": [
        "HAMMERTOSS",
        "HammerDuke",
        "NetDuke"
    ],
    "x_mitre_attack_spec_version": "2.1.0",
    "x_mitre_domains": [
        "enterprise-attack"
    ],
    "x_mitre_modified_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    "x_mitre_platforms": [
        "Windows"
    ],
    "x_mitre_version": "1.2",
    "spec_version": '2.1',
    "is_family": false
}

console.log("\nExample 7 - Parsing the provided example malware:");
try {
    const parsedMalware = malwareSchema.parse(exampleOfRealMalware);
    console.log(parsedMalware);
    console.log("Parsed successfully. Malware name:", parsedMalware.name);
    // Parsed successfully. Malware name: HAMMERTOSS
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}


/** ************************************************************************************************* */
// Example 8: Malware with unknown property
/** ************************************************************************************************* */
const malwareWithUnknownProperty = {
    ...exampleOfRealMalware,
    foo: 'bar'
}

console.log("\nExample 8 - Parsing a malware with an unknown property (foo: 'bar'):");
try {
    const parsedMalware = malwareSchema.parse(malwareWithUnknownProperty);
    console.log("Parsed successfully. Malware name:", parsedMalware.name);
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


// Tool Examples - 
console.log("****************************************************************************************************")
console.log("Tool Examples")
console.log("****************************************************************************************************")

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
    x_mitre_domains: [
        "enterprise-attack"
    ],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
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
    // Missing x_mitre_attack_spec_version
};

console.log("Example 2 - Invalid Tool (missing required fields):");
try {
    toolSchema.parse(invalidTool);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}

/**
 * Validation errors: [
  {
    code: 'custom',
    message: 'Invalid STIX Identifier',
    fatal: true,
    path: [ 'created_by_ref' ]
  },
  {
    code: 'invalid_type',
    expected: 'array',
    received: 'undefined',
    path: [ 'external_references' ],
    message: 'Required'
  },
  {
    code: 'invalid_type',
    expected: 'array',
    received: 'undefined',
    path: [ 'object_marking_refs' ],
    message: 'Required'
  },
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: [ 'x_mitre_attack_spec_version' ],
    message: 'Required'
  }
]
 */

/** ************************************************************************************************* */
// Example 3: Tool with optional fields
/** ************************************************************************************************* */
const toolWithOptionalFields = {
    ...validTool,
    x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ],
    x_mitre_aliases: [
        "Sliver"
    ],
    x_mitre_deprecated: false,
    x_mitre_platforms: [
        "Windows",
        "Linux",
        "macOS"
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
    "x_mitre_version": "1.2",
    "spec_version": "2.0"
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


/** ************************************************************************************************* */
// Example 8: Tool with unknown property
/** ************************************************************************************************* */
const toolWithUnknownProperty = {
    ...exampleOfRealTool,
    foo: 'bar'
}

console.log("\nExample 8 - Parsing a tool with an unknown property (foo: 'bar'):");
try {
    const parsedTool = toolSchema.parse(toolWithUnknownProperty);
    console.log("Parsed successfully. Tool name:", parsedTool.name);
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