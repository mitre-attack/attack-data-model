import { toolSchema } from "../src/schemas/sdo/tool.schema";

describe('ToolSchema', () => {
  // Test valid object
  test('should validate a correct Tool object', () => {
    const validObject = {
      type: 'tool',
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      spec_version: '2.1',
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      created: "2021-07-30T15:43:17.770Z",
      modified: "2024-04-11T00:06:01.264Z",
      name: "Sliver",
      description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
      external_references: [
          {
              source_name: "mitre-attack",
              url: "https://attack.mitre.org/software/S0049",
              external_id: "S0049"
          },
          {
              source_name: "F-Secure The Dukes",
              description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
              url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
          }
      ],
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      x_mitre_aliases: [
          "Sliver"
      ],
      x_mitre_deprecated: false,
      x_mitre_domains: [
          "enterprise-attack"
      ],
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      x_mitre_platforms: [
          "Windows",
          "Linux",
          "macOS"
      ],
      x_mitre_version: "1.2"
    };
    expect(() => toolSchema.parse(validObject)).not.toThrow();
  });

  // Test required fields
  test('should throw error when required fields are missing', () => {
    const invalidObject = {
      type: 'tool',
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      spec_version: '2.1',
      // Missing created_by_ref
      created: "2021-07-30T15:43:17.770Z",
      modified: "2024-04-11T00:06:01.264Z",
      name: "Sliver",
      description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
      // Missing external_references
      // Missing object_marking_refs
      x_mitre_aliases: [
          "Sliver"
      ],
      x_mitre_contributors: [
          "Achute Sharma, Keysight",
          "Ayan Saha, Keysight"
      ],
      x_mitre_deprecated: false,
      x_mitre_domains: [
          "enterprise-attack"
      ],
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      x_mitre_platforms: [
          "Windows",
          "Linux",
          "macOS"
      ],
      x_mitre_version: "1.2"
    };
    expect(() => toolSchema.parse(invalidObject)).toThrow();
  });

  // Test invalid ID format
  test('should throw error when ID format is invalid', () => {
    const objectWithInvalidId = {
      id: 'malware--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      type: 'tool',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z'
    };
    expect(() => toolSchema.parse(objectWithInvalidId)).toThrow();
  });


  // Test optional fields
  test('should validate object with optional fields', () => {
    const objectWithOptionalFields = {
      type: 'tool',
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      spec_version: '2.1',
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      created: "2021-07-30T15:43:17.770Z",
      modified: "2024-04-11T00:06:01.264Z",
      name: "Sliver",
      description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
      external_references: [
          {
              source_name: "mitre-attack",
              url: "https://attack.mitre.org/software/S0049",
              external_id: "S0049"
          },
          {
              source_name: "F-Secure The Dukes",
              description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
              url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
          }
      ],
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      x_mitre_aliases: [
          "Sliver"
      ],
      x_mitre_deprecated: false,
      x_mitre_domains: [
          "enterprise-attack"
      ],
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      x_mitre_platforms: [
          "Windows",
          "Linux",
          "macOS"
      ],
      x_mitre_version: "1.2",
      x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ]
    };
    expect(() => toolSchema.parse(objectWithOptionalFields)).not.toThrow();
  });

  // Test fields in STIX but not in ATT&CK
  test('should validate object with fields in STIX but not in ATT&CK', () => {
    const objectWithStixFields = {
      type: 'tool',
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      spec_version: '2.1',
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      created: "2021-07-30T15:43:17.770Z",
      modified: "2024-04-11T00:06:01.264Z",
      name: "Sliver",
      description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
      external_references: [
          {
              source_name: "mitre-attack",
              url: "https://attack.mitre.org/software/S0049",
              external_id: "S0049"
          },
          {
              source_name: "F-Secure The Dukes",
              description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
              url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
          }
      ],
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      x_mitre_aliases: [
          "Sliver"
      ],
      x_mitre_deprecated: false,
      x_mitre_domains: [
          "enterprise-attack"
      ],
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      x_mitre_platforms: [
          "Windows",
          "Linux",
          "macOS"
      ],
      x_mitre_version: "1.2",
      x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
      ],
      kill_chain_phases: [
        {
          "kill_chain_name": "mitre-attack",
          "phase_name": "command-and-control"
        }
      ],
      aliases: [
          "Sliver"
      ],
      tool_types: ["remote-access"],
      tool_version: "1.0"
    };
    expect(() => toolSchema.parse(objectWithStixFields)).not.toThrow();
  });

  // Test invalid type
  test('should throw error when type is not tool', () => {
    const objectWithInvalidId = {
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      type: 'invalid-type',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
    };
    expect(() => toolSchema.parse(objectWithInvalidId)).toThrow();
  });
});