import { z } from "zod";
import { stixBundleSchema } from '../../src/schemas/sdo/stix-bundle.schema';
import { StixCreatedTimestamp, StixModifiedTimestamp } from "../../src/schemas/common";
import { v4 as uuidv4 } from 'uuid';
import { identitySchema } from "../../src/schemas/sdo/identity.schema";
import { assetSchema } from "../../src/schemas/sdo/asset.schema";
import { campaignSchema } from "../../src/schemas/sdo/campaign.schema";
import { malwareSchema } from "../../src/schemas/sdo/malware.schema";
import { matrixSchema } from "../../src/schemas/sdo/matrix.schema";
import { toolSchema } from "../../src/schemas/sdo/tool.schema";
import { groupSchema } from "../../src/schemas/sdo/group.schema";
import { mitigationSchema } from "../../src/schemas/sdo/mitigation.schema";
import { dataComponentSchema } from "../../src/schemas/sdo/data-component.schema";
import { dataSourceSchema } from "../../src/schemas/sdo/data-source.schema";
import { tacticSchema } from "../../src/schemas/sdo/tactic.schema";
import { techniqueSchema } from "../../src/schemas/sdo/technique.schema";
import { collectionSchema } from "../../src/schemas/sdo/collection.schema";
import { markingDefinitionSchema } from "../../src/schemas/smo/marking-definition.schema";
import { relationshipSchema } from "../../src/schemas/sro/relationship.schema";

const StixObjectSchema: {[key: string]: z.ZodSchema} = {
    "x-mitre-asset": assetSchema,
    "campaign": campaignSchema,
    "x-mitre-collection": collectionSchema,
    "x-mitre-data-component": dataComponentSchema,
    "x-mitre-data-source": dataSourceSchema,
    "intrusion-set": groupSchema,
    "identity": identitySchema,
    "malware": malwareSchema,
    "marking-definition": markingDefinitionSchema,
    "x-mitre-matrix": matrixSchema,
    "course-of-action": mitigationSchema,
    "x-mitre-tactic": tacticSchema,
    "attack-pattern": techniqueSchema,
    "tool": toolSchema,
    "relationship": relationshipSchema
};

/** ************************************************************************************************* */
// Example 1: Valid Stix Bundle
/** ************************************************************************************************* */

const minimalCollection = {
    id: `x-mitre-collection--${uuidv4()}`,
    type: 'x-mitre-collection',
    spec_version: '2.1',
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
    modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    name: 'Test Collection',
    description: 'This is a test collection.',
    x_mitre_attack_spec_version: "2.1.0",
    x_mitre_version: "1.0",
    x_mitre_contents: [
        {
            object_ref: "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
            object_modified: "2021-01-01T00:00:00.000Z" as StixModifiedTimestamp
        }
    ]
};

const validBundle = {
    id: `bundle--${uuidv4()}`,
    type: 'bundle',
    spec_version: '2.1',
    objects: [minimalCollection],
};

console.log("Example 1 - Valid Stix Bundle:");
console.log(stixBundleSchema.parse(validBundle));

/** ************************************************************************************************* */
// Example 2: Invalid Stix Bundle (missing required fields)
/** ************************************************************************************************* */

const invalidBundle = {
    id: `bundle--${uuidv4()}`,
    // Missing type
    // Missing spec_version
    objects: [minimalCollection]
};

console.log("Example 2 - Invalid Stix Bundle (missing required fields):");
try {
    stixBundleSchema.parse(invalidBundle);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}

/** 
 * Validation errors: [
    {
      received: undefined,
      code: 'invalid_literal',
      expected: 'bundle',
      path: [ 'type' ],
      message: "Invalid 'type' property. Expected 'bundle' for StixBundle object, but received 'undefined'."
    },
    {
      expected: "'2.0' | '2.1'",
      received: 'undefined',
      code: 'invalid_type',
      path: [ 'spec_version' ],
      message: 'Required'
    }
]
*/

/** ************************************************************************************************* */
// Example 3: Invalid Stix Bundle (missing required fields)
/** ************************************************************************************************* */

const bundleWithInvalidCollection = {
    id: `bundle--${uuidv4()}`,
    type: 'bundle',
    spec_version: '2.1',
    objects: [
        {
            id: `x-mitre-collection--${uuidv4()}`,
            type: 'x-mitre-collection',
            spec_version: '2.1',
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            name: 'Test Collection',
            description: 'This is a test collection.',
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_version: "1.0",
            x_mitre_contents: [
                {
                    object_ref: "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
                    object_modified: "2021-01-01T00:00:00.000Z" as StixModifiedTimestamp
                }
            ]
        },
        {
            type: "identity",
            id: `identity--${uuidv4()}`,
            // Incorrect spec version
            spec_version: "2.3",
            created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
            modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
            name: "The MITRE Corporation",
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            //Missing identity_class
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_domains: ["enterprise-attack"],
            x_mitre_version: "1.0"
        }
    ]
};
console.log("Example 3 - Invalid Collection (missing required fields):");

try {
    stixBundleSchema.parse(bundleWithInvalidCollection);
  } catch (error) {
    if (error instanceof z.ZodError) {
        const errors: string[] = [];
        error.issues.forEach((issue) => {
        const objectIndex = issue.path.find((p) => typeof p === 'number');
        const errorObject = objectIndex !== undefined ? bundleWithInvalidCollection.objects[objectIndex as number] : undefined;
        console.log("\n")
        let errorMessage = `Error in bundle`;
        let objectMessage = `Validation errors: `;
        if (errorObject) {
          errorMessage += `\n  Object Index: ${objectIndex}`;
          errorMessage += `\n  Object ID: ${errorObject.id}`;
          errorMessage += `\n  Object Type: ${errorObject.type}`;
          errorMessage += `\n  Object Name: ${(errorObject as any).name || 'N/A'}`;
  
          // Determine Object Status
          let objectStatus = 'Active';
          if ((errorObject as any).x_mitre_deprecated) {
            objectStatus = 'Deprecated';
          }
          errorMessage += `\n  Object Status: ${objectStatus}`;
          const schema = StixObjectSchema[errorObject.type];
            try {
                schema.parse(errorObject);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    objectMessage += error.errors.map(err => `\n  - ${err.path.join('.')} : ${err.message}`).join('');
                }
            }
        }
        errorMessage += `\n  Path: ${issue.path.join('.')}`;
        errorMessage += `\n  Error: ${issue.message}`;
        errors.push(errorMessage);
        console.warn(errorMessage);
        console.warn(objectMessage);
      });
    }
  }

/**
 * 
Error in bundle
  Object Index: 1
  Object ID: identity--76cb565f-7af8-4343-a251-101a7223b18c
  Object Type: identity
  Object Name: The MITRE Corporation
  Object Status: Active
  Path: objects.1
  Error: Invalid input
Validation errors: 
  - spec_version : Invalid enum value. Expected '2.0' | '2.1', received '2.3'
  - identity_class : Required
 */


/** ************************************************************************************************* */
// Example 4: Stix Bundle with invalid type
/** ************************************************************************************************* */
const stixBundleWithInvalidType = {
    ...validBundle,
    type: "invalid-type",
};

console.log("\nExample 4 - Stix Bundle with invalid type:");
try {
    stixBundleSchema.parse(stixBundleWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid 'type' property. Expected 'bundle' for StixBundle object, but received 'invalid-type'.
    }
}

/** ************************************************************************************************* */
// Example 5: Stix Bundle with invalid id
/** ************************************************************************************************* */
const stixBundleWithInvalidId = {
    ...validBundle,
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
};

console.log("\nExample 5 - Stix Bundle with invalid id:");
try {
    stixBundleSchema.parse(stixBundleWithInvalidId);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid STIX Identifier: must start with 'bundle--'.
    }
}

/** ************************************************************************************************* */
// Example 6: Parsing the provided example stix bundle
/** ************************************************************************************************* */

const exampleOfRealStixBundle = {
    "id": `bundle--${uuidv4()}`,
    "type": 'bundle',
    "spec_version": '2.1',
    "objects": [
        {
            "id": `x-mitre-collection--${uuidv4()}`,
            "type": 'x-mitre-collection',
            "spec_version": '2.1',
            "created_by_ref": "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            "created": '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            "modified": '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            "object_marking_refs": [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            "name": 'Test Collection',
            "description": 'This is a test collection.',
            "x_mitre_attack_spec_version": "2.1.0",
            "x_mitre_version": "1.0",
            "x_mitre_contents": [
                {
                    "object_ref": "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
                    "object_modified": "2021-01-01T00:00:00.000Z" as StixModifiedTimestamp
                }
            ]
        },
        {
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
    ]
}

console.log("\nExample 7 - Parsing the provided example stixBundle:");
try {
    const parsedBundle = stixBundleSchema.parse(exampleOfRealStixBundle);
    console.log(parsedBundle);
    console.log("Parsed successfully. stix bundle ID:", parsedBundle.id);
    // Parsed successfully. ID: bundle--1d9d1bf4-f94e-401e-b330-e0f2229493e3
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}

/** ************************************************************************************************* */
// Example 7: Stix Bundle with unknown property
/** ************************************************************************************************* */
const stixBundleWithUnknownProperty = {
    ...exampleOfRealStixBundle,
    foo: 'bar',
}

console.log("\nExample 7 - Parsing a stix bundle with an unknown property (foo: 'bar'):");
try {
    const parsedBundle = stixBundleSchema.parse(stixBundleWithUnknownProperty);
    console.log("Parsed successfully. Stix Bundle name:", parsedBundle.id);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}
/**
 * Validation errors: [
    {
      code: 'unrecognized_keys',
      keys: [ 'foo' ],
      path: [],
      message: "Unrecognized key(s) in object: 'foo'"
    }
  ]
*/