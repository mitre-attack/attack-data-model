import { z } from "zod/v4";
import { mitigationSchema } from "../../src/schemas/sdo/mitigation.schema.js";

/** ************************************************************************************************* */
// Example 1: Valid Mitigation
/** ************************************************************************************************* */
const validMitigation = {
  type: "course-of-action",
  id: "course-of-action--00d7d21b-69d6-4797-88a2-c86f3fc97651",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "2.1.0",
  name: "Mitigation name",
  x_mitre_version: "1.0",
  description: "Mitigation description",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  created: "2018-10-17T00:14:20.652Z",
  modified: "2019-07-25T11:22:19.139Z",
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  x_mitre_domains: ["enterprise-attack"],
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/mitigations/M1174",
      external_id: "M1174",
    },
    {
      url: "https://example.com",
      description: "Example description.",
      source_name: "Example source name",
    },
  ],
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
};

console.log("Example 1 - Valid Mitigation:");
console.log(mitigationSchema.parse(validMitigation));

/** ************************************************************************************************* */
// Example 2: Invalid Mitigation (missing required fields)
/** ************************************************************************************************* */
const invalidMitigation = {
  type: "course-of-action",
  id: "course-of-action--00d7d21b-69d6-4797-88a2-c86f3fc97651",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "2.1.0",
  name: "Mitigation name",
  x_mitre_version: "1.0",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  created: "2018-10-17T00:14:20.652Z",
  modified: "2019-07-25T11:22:19.139Z",
  x_mitre_domains: ["enterprise-attack"],
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
};

console.log("\nExample 2 - Invalid Mitigation (missing required fields):");
const e2 = mitigationSchema.safeParse(invalidMitigation);
console.log(z.prettifyError(e2.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 3: Mitigation with optional fields
/** ************************************************************************************************* */
const mitigationWithOptionalFields = {
  ...validMitigation,
  x_mitre_deprecated: false,
  revoked: false,
  labels: [
    "IEC 62443-3-3:2013 - SR 5.1",
    "IEC 62443-4-2:2019 - CR 5.1",
    "NIST SP 800-53 Rev. 5 - AC-3; SC-7",
  ],
  x_mitre_old_attack_id: "MOB-M1008",
};

console.log("\nExample 3 - Mitigation with optional fields:");
console.log(mitigationSchema.parse(mitigationWithOptionalFields));

/** ************************************************************************************************* */
// Example 4: Mitigation with invalid type
/** ************************************************************************************************* */
const mitigationWithInvalidType = {
  ...validMitigation,
  type: "invalid-type",
};

console.log("\nExample 4 - Mitigation with invalid type:");
const e4 = mitigationSchema.safeParse(mitigationWithInvalidType);
console.log(z.prettifyError(e4.error as z.core.$ZodError));

/** ************************************************************************************************* */
// Example 5: Parsing the provided example Mitigation
/** ************************************************************************************************* */
const exampleOfRealMitigation = {
  x_mitre_domains: ["enterprise-attack"],
  object_marking_refs: [
    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
  ],
  id: "course-of-action--00d7d21b-69d6-4797-88a2-c86f3fc97651",
  type: "course-of-action",
  created: "2018-10-17T00:14:20.652Z",
  created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  external_references: [
    {
      source_name: "mitre-attack",
      url: "https://attack.mitre.org/mitigations/T1174",
      external_id: "T1174",
    },
    {
      url: "https://msdn.microsoft.com/library/windows/desktop/ms721766.aspx",
      description:
        "Microsoft. (n.d.). Installing and Registering a Password Filter DLL. Retrieved November 21, 2017.",
      source_name: "Microsoft Install Password Filter n.d",
    },
  ],
  modified: "2019-07-25T11:22:19.139Z",
  name: "Password Filter DLL Mitigation",
  description:
    "Ensure only valid password filters are registered. Filter DLLs must be present in Windows installation directory (<code>C:\\Windows\\System32\\</code> by default) of a domain controller and/or local computer with a corresponding entry in <code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Notification Packages</code>. (Citation: Microsoft Install Password Filter n.d)",
  x_mitre_deprecated: true,
  x_mitre_version: "1.0",
  x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
  spec_version: "2.1",
  x_mitre_attack_spec_version: "2.1.0",
};

console.log("\nExample 5 - Parsing the provided example mitigation:");
const e5 = mitigationSchema.safeParse(exampleOfRealMitigation);
if (e5.success) {
  console.log("Parsed successfully. Mitigation name:", e5.data.name);
} else {
  console.log(z.prettifyError(e5.error as z.core.$ZodError));
}

/** ************************************************************************************************* */
// Example 6: Mitigation with unknown property
/** ************************************************************************************************* */
const mitigationWithUnknownProperty = {
  ...validMitigation,
  foo: 'bar'
}

console.log("\nExample 6 - Parsing a mitigation with an unknown property (foo: 'bar'):");
const e6 = mitigationSchema.safeParse(mitigationWithUnknownProperty);
if (e6.success) {
  console.log("Parsed successfully. Mitigation name:", e6.data.name);
} else {
  console.log(z.prettifyError(e6.error as z.core.$ZodError));
}