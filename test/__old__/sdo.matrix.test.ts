import { matrixSchema } from "../../src/schemas/sdo/matrix.schema";

describe("MatrixSchema", () => {
  const validMatrix = {
    type: "x-mitre-matrix",
    id: "x-mitre-matrix--575f48f4-8897-4468-897b-48bb364af6c7",
    spec_version: "2.1",
    x_mitre_attack_spec_version: "2.0.0",
    name: "Test Matrix",
    x_mitre_version: "2.1",
    description: "A detailed description of the matrix.",
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    created: "2022-01-01T00:00:00.000Z",
    modified: "2022-01-02T00:00:00.000Z",
    object_marking_refs: [
      "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
    ],
    x_mitre_domains: ["enterprise-attack"],
    external_references: [],
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    tactic_refs: [
      "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
      "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
    ],
  };

  test("valid matrix", () => {
    expect(() => matrixSchema.parse(validMatrix)).not.toThrow();
  });

  test("missing required fields", () => {
    const invalidMatrix = {
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.0.0",
      name: "Test Matrix",
      x_mitre_version: "2.1",
      description: "A detailed description of the matrix.",
      created_by_ref: "identity--12345678-1234-1234-1234-123456789012",
      created: "2022-01-01T00:00:00.000Z",
      modified: "2022-01-02T00:00:00.000Z",
      object_marking_refs: [
        "marking-definition--12345678-1234-1234-1234-123456789012",
      ],
      x_mitre_domains: ["enterprise-attack"],
      external_references: [],
      x_mitre_modified_by_ref: "identity--12345678-1234-1234-1234-123456789012",
      tactic_refs: ["x-mitre-tactic--12345678-1234-1234-1234-123456789012"],
    };

    expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
  });

  test("invalid x_mitre_domains", () => {
    const invalidMatrix = {
      ...validMatrix,
      x_mitre_domains: ["invalid-domain"],
    };

    expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
  });

  test("invalid x_mitre_modified_by_ref", () => {
    const invalidMatrix = {
      ...validMatrix,
      x_mitre_modified_by_ref: "invalid-id",
    };

    expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
  });

  test("invalid tactic_refs", () => {
    const invalidMatrix = {
      ...validMatrix,
      tactic_refs: ["invalid-tactic-id"],
    };

    expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
  });

  test("optional x_mitre_deprecated present", () => {
    const matrixWithDeprecated = {
      ...validMatrix,
      x_mitre_deprecated: true,
    };

    expect(() => matrixSchema.parse(matrixWithDeprecated)).not.toThrow();
  });

  test("optional x_mitre_deprecated missing", () => {
    const matrixWithoutDeprecated = {
      ...validMatrix,
    };

    expect(() => matrixSchema.parse(matrixWithoutDeprecated)).not.toThrow();
  });

  test("optional revoked present", () => {
    const matrixWithRevoked = {
      ...validMatrix,
      revoked: true,
    };

    expect(() => matrixSchema.parse(matrixWithRevoked)).not.toThrow();
  });

  test("optional revoked missing", () => {
    const matrixWithoutRevoked = {
      ...validMatrix,
    };

    expect(() => matrixSchema.parse(matrixWithoutRevoked)).not.toThrow();
  });
});
