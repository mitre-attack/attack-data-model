import { dataComponentSchema } from "../src/schemas/sdo/data-component.schema";

describe("DataComponentSchema", () => {
  const validDataComponent = {
    modified: "2022-10-20T20:18:06.745Z",
    name: "Network Connection Creation",
    description:
      "Initial construction of a network connection, such as capturing socket information with a source/destination IP and port(s) (ex: Windows EID 5156, Sysmon EID 3, or Zeek conn.log)",
    x_mitre_data_source_ref:
      "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
    x_mitre_deprecated: false,
    x_mitre_version: "1.1",
    type: "x-mitre-data-component",
    id: "x-mitre-data-component--181a9f8c-c780-4f1f-91a8-edb770e904ba",
    created: "2021-10-20T15:05:19.274Z",
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

  it("should validate a valid DataComponent object", () => {
    expect(() => dataComponentSchema.parse(validDataComponent)).not.toThrow();
  });

  it("should throw an error if 'description' is missing", () => {
    const { description, ...invalidDataComponent } = validDataComponent;
    expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow(
      "Required"
    );
  });

  it("should throw an error if 'x_mitre_data_source_ref' is missing", () => {
    const { x_mitre_data_source_ref, ...invalidDataComponent } =
      validDataComponent;
    expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow(
      "Required"
    );
  });

  it("should allow optional fields to be omitted", () => {
    const { x_mitre_deprecated, ...partialDataComponent } = validDataComponent;
    expect(() => dataComponentSchema.parse(partialDataComponent)).not.toThrow();
  });

  it("should validate with optional fields present", () => {
    const completeDataComponent = {
      ...validDataComponent,
      x_mitre_deprecated: false,
    };
    expect(() =>
      dataComponentSchema.parse(completeDataComponent)
    ).not.toThrow();
  });
});
