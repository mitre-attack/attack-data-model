import { groupSchema } from "../src/schemas/sdo/group.schema";

describe("GroupSchema", () => {
  it("should validate a valid Group object", () => {
    const validGroup = {
      type: "intrusion-set",
      id: "intrusion-set--00f67a77-86a4-4adf-be26-1a54fc713340",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.0.0",
      name: "Example Intrusion Set",
      x_mitre_version: "2.1",
      created: "2023-01-01T00:00:00.000Z",
      modified: "2023-01-01T00:00:00.000Z",
      x_mitre_domains: ["enterprise-attack"],
      description: "This is an example intrusion set.",
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      x_mitre_contributors: ["Contributor 1", "Contributor 2"],
      x_mitre_deprecated: false,
      aliases: ["Example Alias"],
      first_seen: "2023-01-01T00:00:00.000Z",
      last_seen: "2023-01-02T00:00:00.000Z",
      goals: ["Goal 1", "Goal 2"],
      resource_level: "organization",
      primary_motivation: "financial gain",
      secondary_motivations: ["ideological", "personal satisfaction"],
      confidence: 80,
      lang: "en",
      granular_markings: [],
      extensions: {},
    };

    expect(() => groupSchema.parse(validGroup)).not.toThrow();
  });

  it("should invalidate a Group object with missing required fields", () => {
    const invalidGroup = {
      type: "intrusion-set",
      // Missing required fields like id, spec_version, name, etc.
    };

    expect(() => groupSchema.parse(invalidGroup)).toThrow();
  });

  it("should invalidate a Group object with incorrect type", () => {
    const invalidGroup = {
      type: "malware", // Incorrect type
      id: "intrusion-set--1234abcd-5678-efgh-ijkl-1234567890ab",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.0.0",
      name: "Example Intrusion Set",
      x_mitre_version: "2.1",
      created: "2023-01-01T00:00:00.000Z",
      modified: "2023-01-01T00:00:00.000Z",
    };

    expect(() => groupSchema.parse(invalidGroup)).toThrow();
  });

  it("should invalidate a Group object with invalid x_mitre_attack_spec_version format", () => {
    const invalidGroup = {
      type: "intrusion-set",
      id: "intrusion-set--1234abcd-5678-efgh-ijkl-1234567890ab",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "invalid-version", // Invalid format
      name: "Example Intrusion Set",
      x_mitre_version: "2.1",
      created: "2023-01-01T00:00:00.000Z",
      modified: "2023-01-01T00:00:00.000Z",
    };

    expect(() => groupSchema.parse(invalidGroup)).toThrow();
  });

  it("should invalidate a Group object with invalid x_mitre_version format", () => {
    const invalidGroup = {
      type: "intrusion-set",
      id: "intrusion-set--1234abcd-5678-efgh-ijkl-1234567890ab",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.0.0",
      name: "Example Intrusion Set",
      x_mitre_version: "invalid-version", // Invalid format
      created: "2023-01-01T00:00:00.000Z",
      modified: "2023-01-01T00:00:00.000Z",
    };

    expect(() => groupSchema.parse(invalidGroup)).toThrow();
  });

  it("should invalidate a Group object with invalid confidence value", () => {
    const invalidGroup = {
      type: "intrusion-set",
      id: "intrusion-set--1234abcd-5678-efgh-ijkl-1234567890ab",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.0.0",
      name: "Example Intrusion Set",
      x_mitre_version: "2.1",
      created: "2023-01-01T00:00:00.000Z",
      modified: "2023-01-01T00:00:00.000Z",
      confidence: 150, // Invalid confidence value
    };

    expect(() => groupSchema.parse(invalidGroup)).toThrow();
  });
});
