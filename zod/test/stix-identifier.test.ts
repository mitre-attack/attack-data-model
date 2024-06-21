import { StixIdentifierSchema } from '../src/types/stix-identifier';
import { StixTypeSchema } from '../src/types/stix-type';

describe('StixIdentifierSchema', () => {
  // Test valid STIX identifier
  test('should validate a correct STIX identifier', () => {
    const validId = 'malware--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    const result = StixIdentifierSchema.parse(validId);
    expect(result).toEqual({
      type: 'malware',
      uuid: '0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061',
      toString: expect.any(Function)
    });
    expect(result.toString()).toBe(validId);
  });

  // Test invalid format (no --)
  test('should throw error for identifier without --', () => {
    const invalidId = 'malware0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      "Invalid STIX identifier format: must contain exactly one '--'"
    );
  });

  // Test invalid format (multiple --)
  test('should throw error for identifier with multiple --', () => {
    const invalidId = 'malware--0c7b5b88--8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      "Invalid STIX identifier format: must contain exactly one '--'"
    );
  });

  // Test invalid STIX type
  test('should throw error for invalid STIX type', () => {
    const invalidId = 'invalid-type--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      "Invalid STIX identifier: type must be a valid STIX type and UUID must be a valid v4 UUID"
    );
  });

  // Test invalid UUID
  test('should throw error for invalid UUID', () => {
    const invalidId = 'malware--invalid-uuid';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      "Invalid STIX identifier: type must be a valid STIX type and UUID must be a valid v4 UUID"
    );
  });

  // Test toString method
  test('should correctly serialize back to string', () => {
    const validId = 'indicator--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    const result = StixIdentifierSchema.parse(validId);
    expect(result.toString()).toBe(validId);
  });

  test.each(StixTypeSchema.options)('should validate identifier with type %s', (type) => {
    const validId = `${type}--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061`;
    expect(() => StixIdentifierSchema.parse(validId)).not.toThrow();
  });
});