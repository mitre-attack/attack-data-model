import { z } from 'zod';
import { stixTypeSchema } from '../src/schemas/common/stix-type';


describe('StixTypeSchema', () => {
  // Test valid STIX types
  test('should validate all defined STIX types', () => {
    const validTypes = [
      "attack-pattern", "campaign", "course-of-action", "identity", "indicator",
      "intrusion-set", "malware", "observed-data", "report", "threat-actor",
      "tool", "vulnerability", "marking-definition"
    ];

    validTypes.forEach((type) => {
      expect(stixTypeSchema.safeParse(type).success).toBe(true);
    });
  });

  // Test invalid STIX type
  test('should reject invalid STIX types', () => {
    const invalidTypes = ['invalid-type', 'ATTACK-PATTERN', 'Malware', ''];

    invalidTypes.forEach((type) => {
      expect(stixTypeSchema.safeParse(type).success).toBe(false);
    });
  });

  // Test type inference
  test('should infer the correct type', () => {
    type StixType = z.infer<typeof stixTypeSchema>;
    const typeCheck: StixType = 'malware'; // This should compile without error
    expect(typeCheck).toBe('malware');
  });

  // Test description
  test('should have the correct description', () => {
    const description = stixTypeSchema.description;
    expect(description).toBe("The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).");
  });

  // Test enum values
  test('should contain all expected enum values', () => {
    const expectedValues = [
      "attack-pattern", "campaign", "course-of-action", "identity", "indicator",
      "intrusion-set", "malware", "observed-data", "report", "threat-actor",
      "tool", "vulnerability", "marking-definition"
    ];

    expect(stixTypeSchema.options).toEqual(expect.arrayContaining(expectedValues));
    expect(stixTypeSchema.options.length).toBe(expectedValues.length);
  });
});