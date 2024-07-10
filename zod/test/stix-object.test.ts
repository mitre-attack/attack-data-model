import { SDOSchema } from '../src/schemas/common/core-stix-sdo.schema';

describe('SDOSchema', () => {
  // Test valid object
  test('should validate a correct STIX object', () => {
    const validObject = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
    };
    expect(() => SDOSchema.parse(validObject)).not.toThrow();
  });

  // Test required fields
  test('should throw error when required fields are missing', () => {
    const invalidObject = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
    };
    expect(() => SDOSchema.parse(invalidObject)).toThrow();
  });

  // Test optional fields
  test('should validate object with optional fields', () => {
    const objectWithOptionalFields = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
      created_by_ref: 'identity--87654321-4321-4321-4321-210987654321',
      labels: ['malicious-activity'],
      revoked: false,
      confidence: 85,
      lang: 'en',
    };
    expect(() => SDOSchema.parse(objectWithOptionalFields)).not.toThrow();
  });

  // Test confidence validation
  test('should throw error when confidence is out of range', () => {
    const objectWithInvalidConfidence = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
      confidence: 100,
    };
    expect(() => SDOSchema.parse(objectWithInvalidConfidence)).toThrow();
  });

  // Test invalid ID format
  test('should throw error when ID format is invalid', () => {
    const objectWithInvalidId = {
      id: 'invalid-id',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
    };
    expect(() => SDOSchema.parse(objectWithInvalidId)).toThrow();
  });

  // Test invalid timestamp format
  test('should throw error when timestamp format is invalid', () => {
    const objectWithInvalidTimestamp = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22',
      modified: '2023-06-22T10:00:00.000Z',
    };
    expect(() => SDOSchema.parse(objectWithInvalidTimestamp)).toThrow();
  });

  // Test external references
  test('should validate object with external references', () => {
    const objectWithExternalReferences = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
      external_references: [
        {
          source_name: 'ACME Threat Intel',
          description: 'Threat report',
          url: 'https://example.com/threat-report',
        },
      ],
    };
    expect(() => SDOSchema.parse(objectWithExternalReferences)).not.toThrow();
  });

  // Test extensions
  test('should validate object with extensions', () => {
    const objectWithExtensions = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
      extensions: {
        'extension-definition--d83fce45-ef58-4c6c-a3f4-1fbc32e98c6e': {
          extension_type: 'property-extension',
        },
      },
    };
    expect(() => SDOSchema.parse(objectWithExtensions)).not.toThrow();
  });

  // Test strict mode (no additional properties)
  test('should throw error when additional properties are present', () => {
    const objectWithAdditionalProps = {
      id: 'indicator--12345678-1234-1234-1234-123456789012',
      type: 'indicator',
      spec_version: '2.1',
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
      additionalProp: 'This should not be here',
    };
    expect(() => SDOSchema.parse(objectWithAdditionalProps)).toThrow();
  });
});