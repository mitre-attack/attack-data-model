import { MarkingDefinitionSchema } from "../src/schemas/smo/marking-definition.schema";

describe("MarkingDefinitionSchema", () => {
  it("should validate a correct marking definition with statement", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
      created: "2016-08-01T00:00:00.000Z",
      definition_type: "statement",
      definition: {
        statement: "Copyright 2019, Example Corp",
      },
    };

    expect(() => MarkingDefinitionSchema.parse(validData)).not.toThrow();
  });

  it("should validate a correct marking definition with TLP", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      definition_type: "tlp",
      name: "TLP:RED",
      definition: {
        tlp: "red",
      },
    };

    expect(() => MarkingDefinitionSchema.parse(validData)).not.toThrow();
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

    expect(() => MarkingDefinitionSchema.parse(invalidData)).toThrow(
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

    expect(() => MarkingDefinitionSchema.parse(invalidData)).toThrow(
      new RegExp("Required")
    );
  });

  it("should validate optional fields", () => {
    const validData = {
      type: "marking-definition",
      spec_version: "2.1",
      id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed",
      created: "2017-01-20T00:00:00.000Z",
      definition_type: "tlp",
      name: "TLP:RED",
      definition: {
        tlp: "red",
      },
      external_references: ["https://example.com"],
      object_marking_refs: [
        "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
      ],
      granular_markings: ["example granular marking"],
    };

    expect(() => MarkingDefinitionSchema.parse(validData)).not.toThrow();
  });
});
