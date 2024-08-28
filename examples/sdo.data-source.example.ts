import {
  stixCreatedByRefSchema,
  stixCreatedTimestampSchema,
  stixModifiedTimestampSchema,
} from "../src/schemas/common";
import { dataSourceSchema } from "../src/schemas/sdo/data-source.schema";
import { z } from "zod";

/** ************************************************************************************************* */
// Example 1: Valid Data Source
/** ************************************************************************************************* */
const validDataSource = {
  type: "data-source",
  id: "x-mitre-data-source--4523e7f3-8de2-4078-96f8-1227eb537159",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "3.2.0",
  name: "Test Data Source",
  x_mitre_version: "1.2",
  description: "Test data source description",
  created_by_ref: stixCreatedByRefSchema.parse(
    "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
  ),
  created: stixCreatedTimestampSchema.parse("2023-03-17T13:37:42.596Z"),
  modified: stixModifiedTimestampSchema.parse("2024-04-11T00:31:21.576Z"),
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_domains: ["enterprise-attack"],
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/campaigns/C0022",
      external_id: "C0022",
    },
  ],
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_collection_layers: ["Host"],
};

console.log("Example 1 - Valid Data Source:");
console.log(dataSourceSchema.parse(validDataSource));

/** ************************************************************************************************* */
// Example 2: Invalid Data Source (missing required fields)
/** ************************************************************************************************* */
const invalidDataSource = {
  type: "data-source",
  id: "x-mitre-data-source--4523e7f3-8de2-4078-96f8-1227eb537159",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "3.2.0",
  name: "Test Data Source",
  x_mitre_version: "1.2",
  // Missing description
  created_by_ref: stixCreatedByRefSchema.parse(
    "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
  ),
  created: StixCreatedTimestampSchema.parse("2023-03-17T13:37:42.596Z"),
  modified: StixModifiedTimestampSchema.parse("2024-04-11T00:31:21.576Z"),
  // Missing object_marking_refs
  x_mitre_platforms: "Optional",
  x_mitre_domains: ["enterprise-attack"],
  // Missing external_references
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_contributors: ["Test Contributer"],
  x_mitre_deprecated: false,
  revoked: false,
  x_mitre_collection_layers: ["Host"],
};

console.log("\nExample 2 - Invalid Data Source (missing required fields):");
try {
  dataSourceSchema.parse(invalidDataSource);
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
    }
    ]
 */

/** ************************************************************************************************* */
// Example 3: Data Source with optional fields
/** ************************************************************************************************* */
const dataSourceWithOptionalFields = {
  ...validDataSource,
  x_mitre_platforms: "Optional",
  x_mitre_contributors: ["John Doe", "Jane Smith"],
  x_mitre_deprecated: false,
  revoked: false,
};

console.log("\nExample 3 - Data Source with optional fields:");
console.log(dataSourceSchema.parse(dataSourceWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Data Source with invalid type
/** ************************************************************************************************* */
const dataSourceWithInvalidType = {
  ...validDataSource,
  type: "invalid-type",
};

console.log("\nExample 4 - Data Source with invalid type:");
try {
  dataSourceSchema.parse(dataSourceWithInvalidType);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid literal value, expected "x-mitre-data-source"
  }
}

/** ************************************************************************************************* */
// Example 5: Data Source with invalid dates
/** ************************************************************************************************* */
const dataSourceWithInvalidDates = {
  ...validDataSource,
  first_seen: "2019-09-01", // Invalid date format
  last_seen: "2020-08-01T04:00:00.000Z",
};

console.log("\nExample 5 - Dat source with invalid dates:");
try {
  dataSourceSchema.parse(dataSourceWithInvalidDates);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.
  }
}

/** ************************************************************************************************* */
// Example 6: Parsing the provided example Data Source
/** ************************************************************************************************* */
const exampleOfRealDataSource = {
  modified: "2023-04-20T18:38:40.409Z",
  name: "Sensor Health",
  description:
    "Information from host telemetry providing insights about system status, errors, or other notable functional activity",
  x_mitre_platforms: ["Linux", "Windows", "macOS", "Android", "iOS"],
  x_mitre_deprecated: false,
  x_mitre_domains: ["enterprise-attack", "mobile-attack"],
  x_mitre_version: "1.1",
  x_mitre_contributors: ["Center for Threat-Informed Defense (CTID)"],
  x_mitre_collection_layers: ["Host"],
  type: "x-mitre-data-source",
  id: "x-mitre-data-source--4523e7f3-8de2-4078-96f8-1227eb537159",
  created: "2021-10-20T15:05:19.272Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  revoked: false,
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/datasources/DS0013",
      external_id: "DS0013",
    },
  ],
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_attack_spec_version: "3.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
};

console.log("\nExample 6 - Parsing the provided example data source:");
try {
  const parsedDataSource = dataSourceSchema.parse(exampleOfRealDataSource);
  console.log("Parsed successfully. Data Source name:", parsedDataSource.name);
  // Parsed successfully. Data Source name: Sensor Health
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
