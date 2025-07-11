import { z } from "zod/v4";
import { dataComponentSchema } from "../../src/schemas/sdo/data-component.schema.js";

/** ************************************************************************************************* */
// Example 1: Valid Data Component
/** ************************************************************************************************* */
const validDataComponent = {
  modified: "2022-10-20T20:18:06.745Z",
  name: "Network Connection Creation",
  description:
    "Initial construction of a network connection, such as capturing socket information with a source/destination IP and port(s) (ex: Windows EID 5156, Sysmon EID 3, or Zeek conn.log)",
  x_mitre_data_source_ref:
    "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
  x_mitre_version: "1.1",
  type: "x-mitre-data-component",
  id: "x-mitre-data-component--181a9f8c-c780-4f1f-91a8-edb770e904ba",
  created: "2021-10-20T15:05:19.274Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log("Example 1 - Valid Data Component:");
console.log(dataComponentSchema.parse(validDataComponent));

/** ************************************************************************************************* */
// Example 2: Invalid Data Component (missing required fields)
/** ************************************************************************************************* */
const invalidDataComponent = {
  modified: "2022-10-20T20:18:06.745Z",
  name: "Network Connection Creation",
  x_mitre_data_source_ref:
    "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
  x_mitre_version: "1.1",
  type: "x-mitre-data-component",
  id: "x-mitre-data-component--181a9f8c-c780-4f1f-91a8-edb770e904ba",
  created: "2021-10-20T15:05:19.274Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log("\nExample 2 - Invalid Data Component (missing required fields):");
const e2 = dataComponentSchema.safeParse(invalidDataComponent);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 3: Data Component with optional fields
/** ************************************************************************************************* */
const dataComponentWithOptionalFields = {
  ...validDataComponent,
  x_mitre_deprecated: false,
  revoked: false,
};

console.log("\nExample 3 - Data Component with optional fields:");
console.log(dataComponentSchema.parse(dataComponentWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Data Component with invalid type
/** ************************************************************************************************* */
const dataComponentWithInvalidType = {
  ...validDataComponent,
  type: "invalid-type",
};

console.log("\nExample 4 - Data Component with invalid type:");
const e4 = dataComponentSchema.safeParse(dataComponentWithInvalidType);
console.log(z.prettifyError(e4.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 5: Data Component with invalid dates
/** ************************************************************************************************* */
const dataComponentWithInvalidDates = {
  ...validDataComponent,
  created: "2019-09-01",
  modified: "2020-08-01T04:00:00.000Z",
};

console.log("\nExample 5 - Data Component with invalid dates:");
const e5 = dataComponentSchema.safeParse(dataComponentWithInvalidDates);
console.log(z.prettifyError(e5.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 6: Parsing the provided example Data Component
/** ************************************************************************************************* */
const exampleOfRealDataComponent = {
  modified: "2022-10-07T16:15:56.932Z",
  name: "Process Creation",
  description:
    "The initial construction of an executable managed by the OS, that may involve one or more tasks or threads. (e.g. Win EID 4688, Sysmon EID 1, cmd.exe > net use, etc.)",
  x_mitre_data_source_ref:
    "x-mitre-data-source--e8b8ede7-337b-4c0c-8c32-5c7872c1ee22",
  x_mitre_deprecated: false,
  x_mitre_version: "1.1",
  type: "x-mitre-data-component",
  id: "x-mitre-data-component--3d20385b-24ef-40e1-9f56-f39750379077",
  created: "2021-10-20T15:05:19.272Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  revoked: false,
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log("\nExample 6 - Parsing the provided example data component:");
const e6 = dataComponentSchema.safeParse(exampleOfRealDataComponent);
if (e6.success) {
  console.log("Parsed successfully. Data Component name:", e6.data.name);
} else {
  console.log(z.prettifyError(e6.error as z.core.$ZodError));
}

/** ************************************************************************************************* */
// Example 7: DataComponent with unknown property
/** ************************************************************************************************* */
const dataComponentWithUnknownProperty = {
  ...exampleOfRealDataComponent,
  foo: 'bar'
}

console.log("\nExample 7 - Parsing a dataComponent with an unknown property (foo: 'bar'):");
const e7 = dataComponentSchema.safeParse(dataComponentWithUnknownProperty);
if (e7.success) {
  console.log("Parsed successfully. DataComponent name:", e7.data.name);
} else {
  console.log(z.prettifyError(e7.error as z.core.$ZodError));
}