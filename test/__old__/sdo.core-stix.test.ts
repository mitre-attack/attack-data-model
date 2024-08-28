import { stixDomainObjectSchema, createStixCreatedTimestamp, createStixModifiedTimestamp } from '../../src/schemas/common/sdo';
import { stixTypeSchema } from '../../src/schemas/common/stix-type';

describe('SDOSchema', () => {
  // Helper function to create a valid SDO object
  const createValidSDO = () => ({
    id: 'indicator--12345678-1234-4234-9234-123456789012',
    type: 'indicator',
    spec_version: '2.1',
    created: createStixCreatedTimestamp('2023-06-22T10:00:00.000Z'),
    modified: createStixModifiedTimestamp('2023-06-22T10:00:00.000Z'),
  });

  // Test valid object
  test('should validate a correct STIX object', () => {
    const validObject = createValidSDO();
    expect(() => stixDomainObjectSchema.parse(validObject)).not.toThrow();
  });

  // Test required fields
  test('should throw error when required fields are missing', () => {
    const invalidObject = {
      id: 'indicator--12345678-1234-4234-9234-123456789012',
      type: 'indicator',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test each required field
  test.each(['id', 'type', 'spec_version', 'created', 'modified'])(
    'should throw error when %s is missing',
    (field) => {
      const validObject = createValidSDO();
      delete validObject[field];
      expect(() => stixDomainObjectSchema.parse(validObject)).toThrow();
    }
  );

  // Test invalid id format
  test('should throw error when id format is invalid', () => {
    const invalidObject = {
      ...createValidSDO(),
      id: 'invalid-id',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test invalid type
  test('should throw error when type is invalid', () => {
    const invalidObject = {
      ...createValidSDO(),
      type: 'invalid-type',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test invalid spec_version
  test('should throw error when spec_version is invalid', () => {
    const invalidObject = {
      ...createValidSDO(),
      spec_version: '3.0',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test invalid created timestamp
  test('should throw error when created timestamp is invalid', () => {
    const invalidObject = {
      ...createValidSDO(),
      created: 'invalid-timestamp',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test invalid modified timestamp
  test('should throw error when modified timestamp is invalid', () => {
    const invalidObject = {
      ...createValidSDO(),
      modified: 'invalid-timestamp',
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test optional fields
  test('should validate object with all optional fields', () => {
    const objectWithOptionalFields = {
      ...createValidSDO(),
      created_by_ref: 'identity--87654321-4321-4321-4321-210987654321',
      revoked: false,
      labels: ['malicious-activity'],
      confidence: 85,
      lang: 'en',
      external_references: [
        {
          source_name: 'ACME Threat Intel',
          description: 'Threat report',
          url: 'https://example.com/threat-report',
        },
      ],
      object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
      granular_markings: [
        {
          marking_ref: 'marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168',
          selectors: ['description'],
        },
      ],
      extensions: {
        'extension-definition--d83fce45-ef58-4c6c-a3f4-1fbc32e98c6e': {
          extension_type: 'property-extension',
        },
      },
    };
    expect(() => stixDomainObjectSchema.parse(objectWithOptionalFields)).not.toThrow();
  });

  // Test each optional field individually
  test.each([
    'created_by_ref',
    'revoked',
    'labels',
    'confidence',
    'lang',
    'external_references',
    'object_marking_refs',
    'granular_markings',
    'extensions',
  ])('should validate object with optional field %s', (field) => {
    const validObject = createValidSDO();
    const optionalField = {
      created_by_ref: 'identity--87654321-4321-4321-4321-210987654321',
      revoked: false,
      labels: ['malicious-activity'],
      confidence: 85,
      lang: 'en',
      external_references: [
        {
          source_name: 'ACME Threat Intel',
          description: 'Threat report',
          url: 'https://example.com/threat-report',
        },
      ],
      object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
      granular_markings: [
        {
          marking_ref: 'marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168',
          selectors: ['description'],
        },
      ],
      extensions: {
        'extension-definition--d83fce45-ef58-4c6c-a3f4-1fbc32e98c6e': {
          extension_type: 'property-extension',
        },
      },
    };
    validObject[field] = optionalField[field];
    expect(() => stixDomainObjectSchema.parse(validObject)).not.toThrow();
  });

  // Test confidence validation
  test('should throw error when confidence is out of range', () => {
    const invalidObject = {
      ...createValidSDO(),
      confidence: 100,
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });

  // Test strict mode (no additional properties)
  test('should throw error when additional properties are present', () => {
    const objectWithAdditionalProps = {
      ...createValidSDO(),
      additionalProp: 'This should not be here',
    };
    expect(() => stixDomainObjectSchema.parse(objectWithAdditionalProps)).toThrow();
  });

  // Test different STIX types
  test.each(stixTypeSchema.options)('should validate object with type %s', (type) => {
    const validObject = {
      ...createValidSDO(),
      id: `${type}--12345678-1234-4234-9234-123456789012`,
      type,
    };
    expect(() => stixDomainObjectSchema.parse(validObject)).not.toThrow();
  });

  // Test created and modified as regular timestamps
  test('should validate object with regular timestamps for created and modified', () => {
    const objectWithRegularTimestamps = {
      ...createValidSDO(),
      created: '2023-06-22T10:00:00.000Z',
      modified: '2023-06-22T10:00:00.000Z',
    };
    expect(() => stixDomainObjectSchema.parse(objectWithRegularTimestamps)).not.toThrow();
  });

  // Test modified timestamp after created timestamp
  test('should validate when modified is after created', () => {
    const validObject = {
      ...createValidSDO(),
      created: createStixCreatedTimestamp('2023-06-22T10:00:00.000Z'),
      modified: createStixModifiedTimestamp('2023-06-23T10:00:00.000Z'),
    };
    expect(() => stixDomainObjectSchema.parse(validObject)).not.toThrow();
  });

  // Test modified timestamp before created timestamp
  test('should throw error when modified is before created', () => {
    const invalidObject = {
      ...createValidSDO(),
      created: createStixCreatedTimestamp('2023-06-22T10:00:00.000Z'),
      modified: createStixModifiedTimestamp('2023-06-21T10:00:00.000Z'),
    };
    expect(() => stixDomainObjectSchema.parse(invalidObject)).toThrow();
  });
});