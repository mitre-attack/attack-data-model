import { StixCreatedTimestamp, StixModifiedTimestamp, StixSpecVersion } from "../../src/schemas/common";
import { groupSchema } from "../../src/schemas/sdo/group.schema";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';


/** ************************************************************************************************* */
// Example 1: Valid Group
/** ************************************************************************************************* */
const validGroup = {
  id: `intrusion-set--${uuidv4()}`,
  type: "intrusion-set",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "2.1.0",
  name: "Test Name",
  x_mitre_version: "1.0",
  created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
  modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
  x_mitre_domains: ["enterprise-attack"],
  external_references: [
    {
      source_name: "mitre-attack",
      external_id: "G1000",
      url: "https://attack.mitre.org/groups/G1000",
    },
    {
      source_name: "Dragos",
      url: "https://dragos.com/resource/allanite/",
      description: "Dragos   Allanite Retrieved. 2019/10/27 ",
    },
  ],
};

console.log("Example 1 - Valid Group:");
console.log(groupSchema.parse(validGroup));

/** ************************************************************************************************* */
// Example 2: Invalid Group (missing required fields)
/** ************************************************************************************************* */
const invalidGroup = {
  modified: "2024-04-17T16:13:43.697Z",
  // missing name
  x_mitre_version: "1.4",
  type: "intrusion-set",
  id: "intrusion-set--9538b1a4-4120-4e2d-bf59-3b11fcab05a4",
  created: "2019-04-16T15:14:38.533Z",
  // missing x_mitre_domains
  // external_references
  x_mitre_attack_spec_version: "3.2.0",
  spec_version: "2.1",
};

console.log("\nExample 2 - Invalid Group (missing required fields):");
try {
  groupSchema.parse(invalidGroup);
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
      path: [ 'external_references' ],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: [ 'name' ],
      message: 'Required'
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

/** ************************************************************************************************* */
// Example 3: Group with optional fields
/** ************************************************************************************************* */
const groupWithOptionalFields = {
  ...validGroup,
  description:
    "[TEMP.Veles](https://attack.mitre.org/groups/G0088) is a Russia-based threat group that has targeted critical infrastructure. The group has been observed utilizing [TRITON](https://attack.mitre.org/software/S0609), a malware framework designed to manipulate industrial safety systems.(Citation: FireEye TRITON 2019)(Citation: FireEye TEMP.Veles 2018)(Citation: FireEye TEMP.Veles JSON April 2019)",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/groups/G0088",
      external_id: "G0088",
    },
  ],
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_contributors: ["Dragos Threat Intelligence"],
  x_mitre_deprecated: false,
  revoked: false,
  aliases: ["Test Name", "XENOTIME"],
};

console.log("\nExample 3 - Group with optional fields:");
console.log(groupSchema.parse(groupWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Group with invalid type
/** ************************************************************************************************* */
const grouptWithInvalidType = {
  ...validGroup,
  type: "invalid-type",
};

console.log("\nExample 4 - Group with invalid type:");
try {
  groupSchema.parse(grouptWithInvalidType);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid literal value, expected "intrusion-set"
  }
}

/** ************************************************************************************************* */
// Example 5: Group with invalid dates
/** ************************************************************************************************* */
const groupWithInvalidDates = {
  ...validGroup,
  first_seen: "2019-09-01", // Invalid date format
  last_seen: "2020-08-01T04:00:00.000Z",
};

console.log("\nExample 5 - Group with invalid dates:");
try {
  groupSchema.parse(groupWithInvalidDates);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.
  }
}

/** ************************************************************************************************* */
// Example 6: Parsing the provided example Group
/** ************************************************************************************************* */
const exampleOfRealGroup = {
  modified: "2024-04-10T18:39:36.997Z",
  name: "CyberAv3ngers",
  description:
    "The [CyberAv3ngers](https://attack.mitre.org/groups/G1027) are a suspected Iranian Government Islamic Revolutionary Guard Corps (IRGC)-affiliated APT group. The [CyberAv3ngers](https://attack.mitre.org/groups/G1027) have been known to be active since at least 2020, with disputed and false claims of critical infrastructure compromises in Israel.(Citation: CISA AA23-335A IRGC-Affiliated December 2023)\n\nIn 2023, the [CyberAv3ngers](https://attack.mitre.org/groups/G1027) engaged in a global targeting and hacking of the Unitronics [Programmable Logic Controller (PLC)](https://attack.mitre.org/assets/A0003) with [Human-Machine Interface (HMI)](https://attack.mitre.org/assets/A0002). This PLC can be found in multiple sectors, including water and wastewater, energy, food and beverage manufacturing, and healthcare. The most notable feature of this attack was the defacement of the devices user interface.(Citation: CISA AA23-335A IRGC-Affiliated December 2023)",
  aliases: ["CyberAv3ngers", "Soldiers of Soloman"],
  x_mitre_deprecated: false,
  x_mitre_version: "1.0",
  type: "intrusion-set",
  id: "intrusion-set--a07a367a-146c-45a8-a830-d3d337b9befa",
  created: "2024-03-25T19:57:07.829Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  revoked: false,
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/groups/G1027",
      external_id: "G1027",
    },
    {
      source_name: "Soldiers of Soloman",
      description:
        "CyberAv3ngers reportedly has connections to the IRGC-linked group Soldiers of Solomon.(Citation: CISA AA23-335A IRGC-Affiliated December 2023)",
    },
    {
      source_name: "CISA AA23-335A IRGC-Affiliated December 2023",
      description:
        "DHS/CISA. (2023, December 1). IRGC-Affiliated Cyber Actors Exploit PLCs in Multiple Sectors, Including U.S. Water and Wastewater Systems Facilities. Retrieved March 25, 2024.",
      url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-335a",
    },
  ],
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_domains: ["ics-attack"],
  x_mitre_attack_spec_version: "3.2.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
};

console.log("\nExample 6 - Parsing the provided example group:");
try {
  const parsedGroup = groupSchema.parse(exampleOfRealGroup);
  console.log("Parsed successfully. Group name:", parsedGroup.name);
  // Parsed successfully. Group name: CyberAv3ngers
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}

/** ************************************************************************************************* */
// Example 7: Group with unknown property
/** ************************************************************************************************* */
const groupWithUnknownProperty = {
  ...validGroup,
  foo: 'bar'
}

console.log("\nExample 7 - Parsing a group with an unknown property (foo: 'bar'):");
try {
  const parsedGroup = groupSchema.parse(groupWithUnknownProperty);
  console.log("Parsed successfully. Group name:", parsedGroup.name);
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
