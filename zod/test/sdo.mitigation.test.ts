import { MitigationSchema } from "../src/schemas/sdo/mitigation.schema";
import { describe, it, expect } from "@jest/globals";

describe("MitigationSchema", () => {
  const validMitigation = {
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

  it("should validate a correct Mitigation object", () => {
    expect(() => MitigationSchema.parse(validMitigation)).not.toThrow();
  });

  it("should invalidate a Mitigation object with missing required fields", () => {
    const invalidMitigation = { ...validMitigation };
    delete (invalidMitigation as any).type;

    expect(() => MitigationSchema.parse(invalidMitigation)).toThrow();
  });

  it("should invalidate a Mitigation object with incorrect type", () => {
    const invalidMitigation = { ...validMitigation, type: "incorrect-type" };

    expect(() => MitigationSchema.parse(invalidMitigation)).toThrow();
  });

  it("should invalidate a Mitigation object with incorrect x_mitre_domains", () => {
    const invalidMitigation = {
      ...validMitigation,
      x_mitre_domains: ["invalid-domain"],
    };

    expect(() => MitigationSchema.parse(invalidMitigation)).toThrow();
  });

  it("should validate a Mitigation object with optional fields missing", () => {
    const validMitigationWithoutOptional = { ...validMitigation };
    delete (validMitigationWithoutOptional as any).x_mitre_deprecated;
    delete (validMitigationWithoutOptional as any).x_mitre_old_attack_id;

    expect(() =>
      MitigationSchema.parse(validMitigationWithoutOptional)
    ).not.toThrow();
  });

  it("should invalidate a Mitigation object with incorrect x_mitre_deprecated type", () => {
    const invalidMitigation = {
      ...validMitigation,
      x_mitre_deprecated: "true",
    };

    expect(() => MitigationSchema.parse(invalidMitigation)).toThrow();
  });

  it("should invalidate a Mitigation object with incorrect x_mitre_old_attack_id type", () => {
    const invalidMitigation = {
      ...validMitigation,
      x_mitre_old_attack_id: 12345,
    };

    expect(() => MitigationSchema.parse(invalidMitigation)).toThrow();
  });
});
