import { z } from "zod/v4";
import {
  stixCreatedByRefSchema,
  stixCreatedTimestampSchema,
  stixModifiedTimestampSchema,
} from "../../src/schemas/common/index.js";
import { dataSourceSchema } from "../../src/schemas/sdo/data-source.schema.js";

/** ************************************************************************************************* */
// Example 1: Valid Data Source
/** ************************************************************************************************* */
const validDataSource = {
  type: "x-mitre-data-source",
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
      url: "https://attack.mitre.org/datasources/DS0014",
      external_id: "DS0014"
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
  type: "x-mitre-data-source",
  id: "x-mitre-data-source--4523e7f3-8de2-4078-96f8-1227eb537159",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "3.2.0",
  name: "Test Data Source",
  x_mitre_version: "1.2",
  created_by_ref: stixCreatedByRefSchema.parse(
    "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
  ),
  created: stixCreatedTimestampSchema.parse("2023-03-17T13:37:42.596Z"),
  modified: stixModifiedTimestampSchema.parse("2024-04-11T00:31:21.576Z"),
  x_mitre_platforms: ["Windows", "Linux"],
  x_mitre_domains: ["enterprise-attack"],
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_contributors: ["Test Contributer"],
  x_mitre_deprecated: false,
  revoked: false,
  x_mitre_collection_layers: ["Host"],
};

console.log("\nExample 2 - Invalid Data Source (missing required fields):");
const e2 = dataSourceSchema.safeParse(invalidDataSource);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 3: Data Source with optional fields
/** ************************************************************************************************* */
const dataSourceWithOptionalFields = {
  ...validDataSource,
  x_mitre_platforms: ['Windows', 'Linux'],
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
const e4 = dataSourceSchema.safeParse(dataSourceWithInvalidType);
console.log(z.prettifyError(e4.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 5: Data Source with invalid dates
/** ************************************************************************************************* */
const dataSourceWithInvalidDates = {
  ...validDataSource,
  created: "2019-09-01",
  modified: "2020-08-01T04:00:00.000Z",
};

console.log("\nExample 5 - Data source with invalid dates:");
const e5 = dataSourceSchema.safeParse(dataSourceWithInvalidDates);
console.log(z.prettifyError(e5.error as z.core.$ZodError));

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
const e6 = dataSourceSchema.safeParse(exampleOfRealDataSource);
if (e6.success) {
  console.log("Parsed successfully. Data Source name:", e6.data.name);
} else {
  console.log(z.prettifyError(e6.error as z.core.$ZodError));
}

/** ************************************************************************************************* */
// Example 7: DataSource with unknown property
/** ************************************************************************************************* */
const dataSourceWithUnknownProperty = {
  ...exampleOfRealDataSource,
  foo: 'bar'
}

console.log("\nExample 7 - Parsing a dataSource with an unknown property (foo: 'bar'):");
const e7 = dataSourceSchema.safeParse(dataSourceWithUnknownProperty);
if (e7.success) {
  console.log("Parsed successfully. DataSource name:", e7.data.name);
} else {
  console.log(z.prettifyError(e7.error as z.core.$ZodError));
}