import { StixIdentifierSchema, StixIdentifierError } from '../src/schemas/common/stix-identifier';
import { StixTypeSchema } from '../src/schemas/common/stix-type';

describe('StixIdentifierSchema', () => {
  // Test valid STIX identifier
  test('should validate a correct STIX identifier', () => {
    const validId = 'malware--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    const result = StixIdentifierSchema.parse(validId);
    expect(result).toEqual({
      type: 'malware',
      uuid: '0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061',
      toString: expect.any(Function),
      [Symbol.toPrimitive]: expect.any(Function)
    });
    expect(result.toString()).toBe(validId);
    expect(String(result)).toBe(validId);
  });

  // Test invalid format (no --)
  test('should throw error for identifier without --', () => {
    const invalidId = 'malware0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      StixIdentifierError.InvalidFormat.message
    );
  });

  // Test invalid format (multiple --)
  test('should throw error for identifier with multiple --', () => {
    const invalidId = 'malware--0c7b5b88--8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      StixIdentifierError.InvalidFormat.message
    );
  });

  // Test invalid STIX type
  test('should throw error for invalid STIX type', () => {
    const invalidId = 'invalid-type--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      StixIdentifierError.InvalidType.message
    );
  });

  // Test invalid UUID
  test('should throw error for invalid UUID', () => {
    const invalidId = 'malware--invalid-uuid';
    expect(() => StixIdentifierSchema.parse(invalidId)).toThrow(
      StixIdentifierError.InvalidFormat.message
    );
  });

  // Test toString method
  test('should correctly serialize back to string', () => {
    const validId = 'indicator--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    const result = StixIdentifierSchema.parse(validId);
    expect(result.toString()).toBe(validId);
  });

  // Test Symbol.toPrimitive method
  test('should correctly convert to primitive', () => {
    const validId = 'indicator--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061';
    const result = StixIdentifierSchema.parse(validId);
    expect(String(result)).toBe(validId);
    expect(result[Symbol.toPrimitive]('number')).toBe(null);
  });

  test.each(StixTypeSchema.options)('should validate identifier with type %s', (type) => {
    const validId = `${type}--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061`;
    expect(() => StixIdentifierSchema.parse(validId)).not.toThrow();
  });
});