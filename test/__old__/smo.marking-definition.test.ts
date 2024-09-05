import { markingDefinitionSchema } from "../../src/schemas/smo/marking-definition.schema";

describe("MarkingDefinitionSchema", () => {
  it("should validate a correct marking definition with statement", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
      created: "2016-08-01T00:00:00.000Z",
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      "x_mitre_attack_spec_version": "2.1.0",
      "x_mitre_domains": ["enterprise-attack"],
      definition_type: "statement",
      definition: {
        statement: "Copyright 2019, Example Corp",
      },
    };

    expect(() => markingDefinitionSchema.parse(validData)).not.toThrow();
  });

  it("should validate a correct marking definition with TLP", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      "x_mitre_attack_spec_version": "2.1.0",
      "x_mitre_domains": ["enterprise-attack"],
      definition_type: "tlp",
      definition: {
        tlp: "red",
      },
    };

    expect(() => markingDefinitionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error if definition_type is incorrect", () => {
    const invalidData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      definition_type: "wrong-type",
      definition: {
        tlp: "red",
      },
    };

    expect(() => markingDefinitionSchema.parse(invalidData)).toThrow(
      "definition_type must be either 'statement' or 'tlp'"
    );
  });

  it("should throw an error if definition is missing", () => {
    const invalidData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      definition_type: "tlp",
    };

    expect(() => markingDefinitionSchema.parse(invalidData)).toThrow(
      new RegExp("Required")
    );
  });

  it("should throw an error if unrecognized fields detected (name, external_references)", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      definition_type: "tlp",
      name: "TLP:RED", // <--- Not allowed
      definition: {
        tlp: "red",
      },
      external_references: ["https://example.com"], // <--- Not allowed
    };

    expect(() => markingDefinitionSchema.parse(validData)).toThrowError(
      /Unrecognized key\(s\) in object: 'name', 'external_references'/
    );
  });
});
