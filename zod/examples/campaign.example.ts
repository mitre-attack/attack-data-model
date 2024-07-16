import { StixCreatedByRefSchema, StixCreatedTimestampSchema, StixModifiedTimestampSchema } from "../src/schemas/common";
import { AttackCampaignSchema, AttackCampaign } from "../src/schemas/sdo/campaign.schema";
import { z } from "zod";

/** ************************************************************************************************* */
// Example 1: Valid Campaign
/** ************************************************************************************************* */
const validCampaign: AttackCampaign = {
    type: "campaign",
    id: "campaign--0257b35b-93ef-4a70-80dd-ad5258e6045b",
    spec_version: "2.1",
    x_mitre_attack_spec_version: "3.2.0",
    name: "Operation Dream Job",
    x_mitre_version: "1.2",
    description: "Operation Dream Job was a cyber espionage operation...",
    created_by_ref: StixCreatedByRefSchema.parse("identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"),
    created: StixCreatedTimestampSchema.parse("2023-03-17T13:37:42.596Z"),
    modified: StixModifiedTimestampSchema.parse("2024-04-11T00:31:21.576Z"),
    object_marking_refs: ["marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"],
    x_mitre_domains: ["enterprise-attack"],
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/campaigns/C0022",
            external_id: "C0022"
        }
    ],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    x_mitre_deprecated: false,
    revoked: false,
    aliases: ["Operation Dream Job", "Operation North Star", "Operation Interception"],
    first_seen: "2019-09-01T04:00:00.000Z",
    last_seen: "2020-08-01T04:00:00.000Z",
    x_mitre_first_seen_citation: "(Citation: ESET Lazarus Jun 2020)",
    x_mitre_last_seen_citation: "(Citation: ClearSky Lazarus Aug 2020)"
};

console.log("Example 1 - Valid Campaign:");
console.log(AttackCampaignSchema.parse(validCampaign));


/** ************************************************************************************************* */
// Example 2: Invalid Campaign (missing required fields)
/** ************************************************************************************************* */
const invalidCampaign = {
    type: "campaign",
    id: "campaign--0257b35b-93ef-4a70-80dd-ad5258e6045b",
    spec_version: "2.1",
    x_mitre_attack_spec_version: "3.2.0",
    name: "Invalid Campaign",
    x_mitre_version: "1.0",
    // Missing description
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: "2023-03-17T13:37:42.596Z",
    modified: "2024-04-11T00:31:21.576Z",
    // Missing object_marking_refs
    x_mitre_domains: ["enterprise-attack"],
    // Missing external_references
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    x_mitre_deprecated: false,
    revoked: false,
    aliases: [],
    first_seen: "2019-09-01T04:00:00.000Z",
    last_seen: "2020-08-01T04:00:00.000Z",
    // Missing x_mitre_first_seen_citation
    // Missing x_mitre_last_seen_citation
};

console.log("\nExample 2 - Invalid Campaign (missing required fields):");
try {
    AttackCampaignSchema.parse(invalidCampaign);
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
        expected: 'array',
        received: 'undefined',
        path: [ 'object_marking_refs' ],
        message: 'Required'
    },
    {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: [ 'description' ],
        message: 'Required'
    },
    {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: [ 'x_mitre_first_seen_citation' ],
        message: 'Required'
    },
    {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: [ 'x_mitre_last_seen_citation' ],
        message: 'Required'
    }
    ]
 */

/** ************************************************************************************************* */
// Example 3: Campaign with optional fields
/** ************************************************************************************************* */
const campaignWithOptionalFields: AttackCampaign = {
    ...validCampaign,
    x_mitre_contributors: ["John Doe", "Jane Smith"],
};

console.log("\nExample 3 - Campaign with optional fields:");
console.log(AttackCampaignSchema.parse(campaignWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Campaign with invalid type
/** ************************************************************************************************* */
const campaignWithInvalidType = {
    ...validCampaign,
    type: "invalid-type",
};

console.log("\nExample 4 - Campaign with invalid type:");
try {
    AttackCampaignSchema.parse(campaignWithInvalidType);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid literal value, expected "campaign"
    }
}

/** ************************************************************************************************* */
// Example 5: Campaign with invalid dates
/** ************************************************************************************************* */
const campaignWithInvalidDates = {
    ...validCampaign,
    first_seen: "2019-09-01", // Invalid date format
    last_seen: "2020-08-01T04:00:00.000Z",
};

console.log("\nExample 5 - Campaign with invalid dates:");
try {
    AttackCampaignSchema.parse(campaignWithInvalidDates);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.
    }
}

/** ************************************************************************************************* */
// Example 6: Campaign with invalid citations
/** ************************************************************************************************* */
const campaignWithInvalidCitations = {
    ...validCampaign,
    x_mitre_first_seen_citation: "", // Empty string
    x_mitre_last_seen_citation: "(Citation: Valid Citation)",
};

console.log("\nExample 6 - Campaign with invalid citations:");
try {
    AttackCampaignSchema.parse(campaignWithInvalidCitations);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors[0].message);
        // Validation error: First seen citation is required and must be a non-empty string
    }
}

/** ************************************************************************************************* */
// Example 7: Parsing the provided example campaign
/** ************************************************************************************************* */
const exampleOfRealCampaign = {
    'type': 'campaign',
    'id': 'campaign--0257b35b-93ef-4a70-80dd-ad5258e6045b',
    'spec_version': '2.1',
    'x_mitre_attack_spec_version': '3.2.0',
    'name': 'Operation Dream Job',
    'x_mitre_version': '1.2',
    'description': '[Operation Dream Job](https://attack.mitre.org/campaigns/C0022) was a cyber espionage operation likely conducted by [Lazarus Group](https://attack.mitre.org/groups/G0032) that targeted the defense, aerospace, government, and other sectors in the United States, Israel, Australia, Russia, and India. In at least one case, the cyber actors tried to monetize their network access to conduct a business email compromise (BEC) operation. In 2020, security researchers noted overlapping TTPs, to include fake job lures and code similarities, between [Operation Dream Job](https://attack.mitre.org/campaigns/C0022), Operation North Star, and Operation Interception; by 2022 security researchers described [Operation Dream Job](https://attack.mitre.org/campaigns/C0022) as an umbrella term covering both Operation Interception and Operation North Star.(Citation: ClearSky Lazarus Aug 2020)(Citation: McAfee Lazarus Jul 2020)(Citation: ESET Lazarus Jun 2020)(Citation: The Hacker News Lazarus Aug 2022)',
    'created_by_ref': 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    'created': '2023-03-17T13:37:42.596Z',
    'modified': '2024-04-11T00:31:21.576Z',
    'object_marking_refs': ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
    'x_mitre_domains': ['enterprise-attack'],
    'external_references': [{
        'source_name': 'mitre-attack',
        'url': 'https://attack.mitre.org/campaigns/C0022',
        'external_id': 'C0022'
    },
    {
        'source_name': 'Operation Interception',
        'description': '(Citation: ESET Lazarus Jun 2020)'
    },
    {
        'source_name': 'Operation North Star',
        'description': '(Citation: McAfee Lazarus Jul 2020)(Citation: McAfee Lazarus Nov 2020)'
    },
    {
        'source_name': 'McAfee Lazarus Nov 2020',
        'description': 'Beek, C. (2020, November 5). Operation North Star: Behind The Scenes. Retrieved December 20, 2021.',
        'url': 'https://www.mcafee.com/blogs/other-blogs/mcafee-labs/operation-north-star-behind-the-scenes/'
    },
    {
        'source_name': 'ESET Lazarus Jun 2020',
        'description': 'Breitenbacher, D and Osis, K. (2020, June 17). OPERATION IN(TER)CEPTION: Targeted Attacks Against European Aerospace and Military Companies. Retrieved December 20, 2021.',
        'url': 'https://www.welivesecurity.com/wp-content/uploads/2020/06/ESET_Operation_Interception.pdf'
    },
    {
        'source_name': 'McAfee Lazarus Jul 2020',
        'description': 'Cashman, M. (2020, July 29). Operation North Star Campaign. Retrieved December 20, 2021.',
        'url': 'https://www.mcafee.com/blogs/other-blogs/mcafee-labs/operation-north-star-a-job-offer-thats-too-good-to-be-true/?hilite=%27Operation%27%2C%27North%27%2C%27Star%27'
    },
    {
        'source_name': 'ClearSky Lazarus Aug 2020',
        'description': "ClearSky Research Team. (2020, August 13). Operation 'Dream Job' Widespread North Korean Espionage Campaign. Retrieved December 20, 2021.",
        'url': 'https://www.clearskysec.com/wp-content/uploads/2020/08/Dream-Job-Campaign.pdf'
    },
    {
        'source_name': 'The Hacker News Lazarus Aug 2022',
        'description': 'Lakshmanan, R. (2022, August 17). North Korea Hackers Spotted Targeting Job Seekers with macOS Malware. Retrieved April 10, 2023.',
        'url': 'https://thehackernews.com/2022/08/north-korea-hackers-spotted-targeting.html'
    }],
    'x_mitre_modified_by_ref': 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
    'x_mitre_deprecated': false,
    'revoked': false,
    'aliases': ['Operation Dream Job',
        'Operation North Star',
        'Operation Interception'],
    'first_seen': '2019-09-01T04:00:00.000Z',
    'last_seen': '2020-08-01T04:00:00.000Z',
    'x_mitre_first_seen_citation': '(Citation: ESET Lazarus Jun 2020)',
    'x_mitre_last_seen_citation': '(Citation: ClearSky Lazarus Aug 2020)'
}

console.log("\nExample 7 - Parsing the provided example campaign:");
try {
    const parsedCampaign = AttackCampaignSchema.parse(exampleOfRealCampaign);
    console.log("Parsed successfully. Campaign name:", parsedCampaign.name);
    // Parsed successfully. Campaign name: Operation Dream Job
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log("Validation errors:", error.errors);
    }
}