import { markingDefinitionSchema } from "../src/schemas/smo/marking-definition.schema";
import { z } from "zod";

/** ************************************************************************************************* */
// Example 1: Valid Marking Definition
/** ************************************************************************************************* */
const validMarkingDefinition = {
  definition: {
    statement: "Copyright 2015-2024, The MITRE Corporation. MITRE ATT&CK and ATT&CK are registered trademarks of The MITRE Corporation.",
  },
  id: "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  type: "marking-definition",
  created: "2017-06-01T00:00:00.000Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  definition_type: "statement",
  x_mitre_attack_spec_version: "2.1.0",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log("Example 1 - Valid Marking Definition:");
console.log(markingDefinitionSchema.parse(validMarkingDefinition));
// {
//   id: 'marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168',
//   type: 'marking-definition',
//   spec_version: '2.1',
//   created: '2017-06-01T00:00:00.000Z',
//   created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
//   definition_type: 'statement',
//   definition: {
//     statement: 'Copyright 2015-2024, The MITRE Corporation. MITRE ATT&CK and ATT&CK are registered trademarks of The MITRE Corporation.'
//   },
//   x_mitre_domains: [ 'mobile-attack' ],
//   x_mitre_attack_spec_version: '2.1.0'
// }


/** ************************************************************************************************* */
// Example 2: Invalid Marking Definition (missing required fields)
/** ************************************************************************************************* */
const invalidMarkingDefinition = {
  definition: {
    statement:
      "Copyright 2015-2024, The MITRE Corporation. MITRE ATT&CK and ATT&CK are registered trademarks of The MITRE Corporation.",
  },
  id: "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  type: "marking-definition",
  // missing created
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  // missing definition_type
  x_mitre_attack_spec_version: "2.1.0",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log(
  "\nExample 2 - Invalid Marking Definition (missing required fields):"
);
try {
  markingDefinitionSchema.parse(invalidMarkingDefinition);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
// Validation errors: [
//   {
//     code: 'custom',
//     message: "Invalid STIX timestamp format: must be an RFC3339 timestamp with a timezone specification of 'Z'.",
//     fatal: true,
//     path: [ 'created' ]
//   },
//   {
//     expected: "'statement' | 'tlp'",
//     received: 'undefined',
//     code: 'invalid_type',
//     path: [ 'definition_type' ],
//     message: "definition_type must be either 'statement' or 'tlp'"
//   }
// ]

/** ************************************************************************************************* */
// Example 3: Marking Definition with invalid fields
/** ************************************************************************************************* */
const invalidDefinitionStatement = {
  statement: "Example statement",
  name: "Example name",   // <--- This property is not allowed on definition statements
  external_references: [  // <--- This property is not allowed on definition statements
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/software/S0698",
      external_id: "S0698",
    },
  ],
  object_marking_refs: [ // <--- This property is not allowed on definition statements
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5", // <--- This property is not allowed on definition statements
}

const markingDefinitionWithOptionalFields = {
  ...validMarkingDefinition,
  definition: invalidDefinitionStatement,
};

console.log("\nExample 3 - Marking Definition with optional fields:");
try {
  markingDefinitionSchema.parse(markingDefinitionWithOptionalFields);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
// Validation errors: [
//   {
//     code: 'unrecognized_keys',
//     keys: [
//       'name',
//       'external_references',
//       'object_marking_refs',
//       'created_by_ref'
//     ],
//     path: [ 'definition' ],
//     message: "Unrecognized key(s) in object: 'name', 'external_references', 'object_marking_refs', 'created_by_ref'"
//   }
// ]

/** ************************************************************************************************* */
// Example 4: Marking Definition with invalid type
/** ************************************************************************************************* */
const markingDefinitionWithInvalidType = {
  ...validMarkingDefinition,
  type: "invalid-type",
};

console.log("\nExample 4 - Marking Definition with invalid type:");
try {
  markingDefinitionSchema.parse(markingDefinitionWithInvalidType);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation error:", error.errors[0].message);
    // Validation error: Invalid literal value, expected "marking-definition"
  }
}

/** ************************************************************************************************* */
// Example 5: Parsing the provided example Marking Definition
/** ************************************************************************************************* */
const exampleOfRealMarkingDefinition = {
  definition: {
    statement:
      "Copyright 2015-2024, The MITRE Corporation. MITRE ATT&CK and ATT&CK are registered trademarks of The MITRE Corporation.",
  },
  id: "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  type: "marking-definition",
  created: "2017-06-01T00:00:00.000Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  definition_type: "statement",
  x_mitre_attack_spec_version: "2.1.0",
  spec_version: "2.1",
  x_mitre_domains: ["mobile-attack"],
};

console.log("\nExample 5 - Parsing the provided example Marking Definition:");
try {
  const parsedMarkingDefinition = markingDefinitionSchema.parse(
    exampleOfRealMarkingDefinition
  );
  console.log(`Parsed successfully. marking definition id: ${parsedMarkingDefinition.id}`);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Validation errors:", error.errors);
  }
}
// Parsed successfully. Marking Definition id: marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168
