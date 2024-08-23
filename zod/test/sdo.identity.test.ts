import { identitySchema } from "../src/schemas/sdo/identity.schema";

describe('IdentitySchema', () => {
  // Test valid object
  test('should validate a correct Identity object', () => {
    const validObject = {
      type: 'identity',
      id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      created: "2017-06-01T00:00:00.000Z",
      modified: "2017-06-01T00:00:00.000Z",
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      identity_class: "organization",
      name: "The MITRE Corporation",
      x_mitre_domains: ["enterprise-attack"]
    };
    expect(() => identitySchema.parse(validObject)).not.toThrow();
  });

  // Test required fields
  test('should throw error when required fields are missing', () => {
    const invalidObject = {
      type: 'identity',
      id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      created: "2017-06-01T00:00:00.000Z",
      modified: "2017-06-01T00:00:00.000Z",
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      name: "The MITRE Corporation"
    };
    expect(() => identitySchema.parse(invalidObject)).toThrow();
  });

  // Test fields in STIX but not in ATT&CK
  test('should validate object with fields in STIX but not in ATT&CK', () => {
    const validObject = {
      type: 'identity',
      id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      created: "2017-06-01T00:00:00.000Z",
      modified: "2017-06-01T00:00:00.000Z",
      object_marking_refs: [
          "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
      ],
      identity_class: "organization",
      name: "The MITRE Corporation",
      description: "identity object description",
      roles: ["administrator"],
      sectors: ["non-profit"],
      contact_information: "attack@mitre.org",
      x_mitre_domains: ["enterprise-attack"]
    };
    expect(() => identitySchema.parse(validObject)).not.toThrow();
  });

  // Test invalid ID format
  test('should throw error when ID format is invalid', () => {
    const objectWithInvalidId = {
      id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
      type: 'identity',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z'
    };
    expect(() => identitySchema.parse(objectWithInvalidId)).toThrow();
  });
});