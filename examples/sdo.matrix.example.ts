import { matrixSchema } from "../src/schemas/sdo/matrix.schema";
import { z } from "zod";

/** ************************************************************************************************* */
// Example 1: Valid Matrix
/** ************************************************************************************************* */
const validMatrix = {
  tactic_refs: [
    "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
    "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
    "x-mitre-tactic--78f1d2ae-a579-44c4-8fc5-3e1775c73fac",
    "x-mitre-tactic--33752ae7-f875-4f43-bdb6-d8d02d341046",
    "x-mitre-tactic--ddf70682-f3ce-479c-a9a4-7eadf9bfead7",
    "x-mitre-tactic--696af733-728e-49d7-8261-75fdc590f453",
    "x-mitre-tactic--51c25a9e-8615-40c0-8afd-1da578847924",
    "x-mitre-tactic--b2a67b1e-913c-46f6-b219-048a90560bb9",
    "x-mitre-tactic--97c8ff73-bd14-4b6c-ac32-3d91d2c41e3f",
    "x-mitre-tactic--298fe907-7931-4fd2-8131-2814dd493134",
    "x-mitre-tactic--ff048b6c-b872-4218-b68c-3735ebd1f024",
    "x-mitre-tactic--77542f83-70d0-40c2-8a9d-ad2eb8b00279",
  ],
  x_mitre_domains: ["ics-attack"],
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  created: "2018-10-17T00:14:20.652Z",
  description:
    "The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base.",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  external_references: [
    {
      source_name: "mitre-attack",
      external_id: "ics-attack",
      url: "https://attack.mitre.org/matrices/ics/",
    },
  ],
  id: "x-mitre-matrix--575f48f4-8897-4468-897b-48bb364af6c7",
  modified: "2022-05-24T14:00:00.188Z",
  name: "ATT&CK for ICS",
  type: "x-mitre-matrix",
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_version: "1.0",
  spec_version: "2.1",
};

console.log("Example 1 - Valid Matrix:");
console.log(matrixSchema.parse(validMatrix));

/** ************************************************************************************************* */
// Example 2: Invalid Matrix (missing required fields)
/** ************************************************************************************************* */
const invalidMatrix = {
  tactic_refs: [
    "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
    "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
    "x-mitre-tactic--78f1d2ae-a579-44c4-8fc5-3e1775c73fac",
    "x-mitre-tactic--33752ae7-f875-4f43-bdb6-d8d02d341046",
    "x-mitre-tactic--ddf70682-f3ce-479c-a9a4-7eadf9bfead7",
    "x-mitre-tactic--696af733-728e-49d7-8261-75fdc590f453",
    "x-mitre-tactic--51c25a9e-8615-40c0-8afd-1da578847924",
    "x-mitre-tactic--b2a67b1e-913c-46f6-b219-048a90560bb9",
    "x-mitre-tactic--97c8ff73-bd14-4b6c-ac32-3d91d2c41e3f",
    "x-mitre-tactic--298fe907-7931-4fd2-8131-2814dd493134",
    "x-mitre-tactic--ff048b6c-b872-4218-b68c-3735ebd1f024",
    "x-mitre-tactic--77542f83-70d0-40c2-8a9d-ad2eb8b00279",
  ],
  x_mitre_domains: ["ics-attack"],
  // missing object_marking_refs
  created: "2018-10-17T00:14:20.652Z",
  // missing description
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  external_references: [
    {
      source_name: "mitre-attack",
      external_id: "ics-attack",
      url: "https://attack.mitre.org/matrices/ics/",
    },
  ],
  id: "x-mitre-matrix--575f48f4-8897-4468-897b-48bb364af6c7",
  modified: "2022-05-24T14:00:00.188Z",
  name: "ATT&CK for ICS",
  type: "x-mitre-matrix",
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_version: "1.0",
  spec_version: "2.1",
};

console.log("\nExample 2 - Invalid Matrix (missing required fields):");
try {
  matrixSchema.parse(invalidMatrix);
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
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: [ 'description' ],
          message: 'Required'
      }
      ]
   */

/** ************************************************************************************************* */
// Example 3: Matrix with optional fields
/** ************************************************************************************************* */
const matrixWithOptionalFields = {
  ...validMatrix,
  x_mitre_deprecated: false,
  revoked: false,
};

console.log("\nExample 3 - Matrix with optional fields:");
console.log(matrixSchema.parse(matrixWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Matrix with invalid type
/** ************************************************************************************************* */
const matrixWithInvalidType = {
  ...validMatrix,
  type: "invalid-type",
};

console.log("\nExample 4 - Matrix with invalid type:");
try {
  matrixSchema.parse(matrixWithInvalidType);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid literal value, expected "x-mitre-matrix"
  }
}

/** ************************************************************************************************* */
// Example 5: Parsing the provided example Matrix
/** ************************************************************************************************* */
const exampleOfRealMatrix = {
  tactic_refs: [
    "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
    "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
    "x-mitre-tactic--78f1d2ae-a579-44c4-8fc5-3e1775c73fac",
    "x-mitre-tactic--33752ae7-f875-4f43-bdb6-d8d02d341046",
    "x-mitre-tactic--ddf70682-f3ce-479c-a9a4-7eadf9bfead7",
    "x-mitre-tactic--696af733-728e-49d7-8261-75fdc590f453",
    "x-mitre-tactic--51c25a9e-8615-40c0-8afd-1da578847924",
    "x-mitre-tactic--b2a67b1e-913c-46f6-b219-048a90560bb9",
    "x-mitre-tactic--97c8ff73-bd14-4b6c-ac32-3d91d2c41e3f",
    "x-mitre-tactic--298fe907-7931-4fd2-8131-2814dd493134",
    "x-mitre-tactic--ff048b6c-b872-4218-b68c-3735ebd1f024",
    "x-mitre-tactic--77542f83-70d0-40c2-8a9d-ad2eb8b00279",
  ],
  x_mitre_domains: ["ics-attack"],
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  created: "2018-10-17T00:14:20.652Z",
  description:
    "The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base.",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  external_references: [
    {
      source_name: "mitre-attack",
      external_id: "ics-attack",
      url: "https://attack.mitre.org/matrices/ics/",
    },
  ],
  id: "x-mitre-matrix--575f48f4-8897-4468-897b-48bb364af6c7",
  modified: "2022-05-24T14:00:00.188Z",
  name: "ATT&CK for ICS",
  type: "x-mitre-matrix",
  x_mitre_attack_spec_version: "2.1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  x_mitre_version: "1.0",
  spec_version: "2.1",
};

console.log("\nExample 5 - Parsing the provided example matrix:");
try {
  const parsedMatrix = matrixSchema.parse(exampleOfRealMatrix);
  console.log("Parsed successfully. Matrix name:", parsedMatrix.name);
  // Parsed successfully. Matrix name: ATT&CK for ICS
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
