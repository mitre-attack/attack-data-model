import { DataSourceSchema } from "../src/schemas/sdo/data-source.schema";

describe("DataSourceSchema", () => {
  const validDataSource = {
    modified: "2023-04-20T18:38:40.409Z",
    name: "Sensor Health",
    description:
      "Information from host telemetry providing insights about system status, errors, or other notable functional activity",
    x_mitre_platforms: ["Linux", "Windows", "macOS", "Android", "iOS"],
    x_mitre_deprecated: false,
    x_mitre_domains: ["enterprise-attack", "mobile-attack"],
    x_mitre_version: "1.1",
    x_mitre_contributors: ["Center for Threat-Informed Defense (CTID)"],
    x_mitre_collection_layers: ["Host"],
    type: "x-mitre-data-source",
    id: "x-mitre-data-source--4523e7f3-8de2-4078-96f8-1227eb537159",
    created: "2021-10-20T15:05:19.272Z",
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    revoked: false,
    external_references: [
      {
        source_name: "mitre-attack",
        url: "https://attack.mitre.org/datasources/DS0013",
        external_id: "DS0013",
      },
    ],
    object_marking_refs: [
      "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
    ],
    x_mitre_attack_spec_version: "3.1.0",
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    spec_version: "2.1",
  };
  it("should validate a valid DataSource object", () => {
    expect(() => DataSourceSchema.parse(validDataSource)).not.toThrow();
  });

  it("should throw an error if 'description' is missing", () => {
    const { description, ...invalidDataSource } = validDataSource;
    expect(() => DataSourceSchema.parse(invalidDataSource)).toThrow("Required");
  });

  it("should throw an error if 'x_mitre_collection_layers' is not an array of strings", () => {
    const invalidDataSource = {
      ...validDataSource,
      x_mitre_collection_layers: "not-an-array",
    };
    expect(() => DataSourceSchema.parse(invalidDataSource)).toThrow(
      "x_mitre_collection_layers must be an array of strings."
    );
  });

  it("should allow optional fields to be omitted", () => {
    const {
      x_mitre_platforms,
      x_mitre_contributors,
      x_mitre_deprecated,
      ...partialDataSource
    } = validDataSource;
    expect(() => DataSourceSchema.parse(partialDataSource)).not.toThrow();
  });

  it("should validate with optional fields present", () => {
    const completeDataSource = {
      ...validDataSource,
      x_mitre_platforms: ["Windows"],
      x_mitre_contributors: ["Contributor1"],
      x_mitre_deprecated: false,
    };
    expect(() => DataSourceSchema.parse(completeDataSource)).not.toThrow();
  });
});
