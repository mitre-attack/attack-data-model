import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validateNoDuplicates } from '../../src/refinements/index.js';

/**
 * Test suite for validateNoDuplicates refinement function
 */
describe('validateNoDuplicates', () => {
  describe('Single key validation', () => {
    it('should accept array with unique values for single key', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const validData = {
        items: [
          { id: '1', name: 'Item 1' },
          { id: '2', name: 'Item 2' },
          { id: '3', name: 'Item 3' },
        ],
      };

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should reject array with duplicate values for single key', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const invalidData = {
        items: [
          { id: '1', name: 'Item 1' },
          { id: '2', name: 'Item 2' },
          { id: '1', name: 'Item 3' }, // Duplicate id
        ],
      };

      expect(() => schema.parse(invalidData)).toThrow(/Duplicate object/);
    });

    it('should include the duplicate value in error message for single key', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const invalidData = {
        items: [
          { id: 'abc-123', name: 'Item 1' },
          { id: 'def-456', name: 'Item 2' },
          { id: 'abc-123', name: 'Item 3' }, // Duplicate
        ],
      };

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw for duplicate values');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toContain('abc-123');
          expect(errorMessage).toContain('index 2');
          expect(errorMessage).toContain('index 0');
        } else {
          throw error;
        }
      }
    });
  });

  describe('Composite key validation', () => {
    it('should accept array with unique composite keys', () => {
      const schema = z
        .object({
          references: z.array(
            z.object({
              source_name: z.string(),
              external_id: z.string(),
              url: z.string().optional(),
            }),
          ),
        })
        .check(validateNoDuplicates(['references'], ['source_name', 'external_id']));

      const validData = {
        references: [
          { source_name: 'mitre-attack', external_id: 'T1001' },
          { source_name: 'mitre-attack', external_id: 'T1002' },
          { source_name: 'other-source', external_id: 'T1001' },
        ],
      };

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should reject array with duplicate composite keys', () => {
      const schema = z
        .object({
          references: z.array(
            z.object({
              source_name: z.string(),
              external_id: z.string(),
              url: z.string().optional(),
            }),
          ),
        })
        .check(validateNoDuplicates(['references'], ['source_name', 'external_id']));

      const invalidData = {
        references: [
          { source_name: 'mitre-attack', external_id: 'T1001' },
          { source_name: 'other-source', external_id: 'T1002' },
          { source_name: 'mitre-attack', external_id: 'T1001' }, // Duplicate composite key
        ],
      };

      expect(() => schema.parse(invalidData)).toThrow(/Duplicate object/);
    });

    it('should include both key values in error message for composite keys', () => {
      const schema = z
        .object({
          references: z.array(
            z.object({
              source_name: z.string(),
              external_id: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['references'], ['source_name', 'external_id']));

      const invalidData = {
        references: [
          { source_name: 'source-a', external_id: 'id-1' },
          { source_name: 'source-b', external_id: 'id-2' },
          { source_name: 'source-a', external_id: 'id-1' }, // Duplicate
        ],
      };

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw for duplicate composite keys');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toContain('source-a');
          expect(errorMessage).toContain('id-1');
          expect(errorMessage).toContain('index 2');
          expect(errorMessage).toContain('index 0');
        } else {
          throw error;
        }
      }
    });
  });

  describe('Custom error messages', () => {
    it('should use custom error message when provided', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        })
        .check(
          validateNoDuplicates(
            ['items'],
            ['id'],
            'Found duplicate item with ID {id} at position {index}',
          ),
        );

      const invalidData = {
        items: [
          { id: 'item-1', name: 'First' },
          { id: 'item-2', name: 'Second' },
          { id: 'item-1', name: 'Third' }, // Duplicate
        ],
      };

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw with custom error message');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toBe('Found duplicate item with ID item-1 at position 2');
        } else {
          throw error;
        }
      }
    });

    it('should support placeholders for composite keys in custom messages', () => {
      const schema = z
        .object({
          refs: z.array(
            z.object({
              source: z.string(),
              id: z.string(),
            }),
          ),
        })
        .check(
          validateNoDuplicates(
            ['refs'],
            ['source', 'id'],
            'Duplicate reference: {source}/{id} at index {index}',
          ),
        );

      const invalidData = {
        refs: [
          { source: 'github', id: '123' },
          { source: 'gitlab', id: '456' },
          { source: 'github', id: '123' }, // Duplicate
        ],
      };

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw with custom error message');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toBe('Duplicate reference: github/123 at index 2');
        } else {
          throw error;
        }
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle empty arrays', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const validData = {
        items: [],
      };

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should handle arrays with a single item', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const validData = {
        items: [{ id: '1' }],
      };

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should handle missing array gracefully', () => {
      const schema = z
        .object({
          items: z
            .array(
              z.object({
                id: z.string(),
              }),
            )
            .optional(),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const validData = {};

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should handle undefined key values', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string().optional(),
              name: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const validData = {
        items: [
          { name: 'Item 1' }, // No id
          { id: '1', name: 'Item 2' },
          { name: 'Item 3' }, // No id - should be considered duplicate of first
        ],
      };

      // Items with undefined id should still be checked for duplicates
      expect(() => schema.parse(validData)).toThrow(/Duplicate object/);
    });

    it('should handle nested array paths', () => {
      const schema = z
        .object({
          bundle: z.object({
            objects: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
              }),
            ),
          }),
        })
        .check(validateNoDuplicates(['bundle', 'objects'], ['id']));

      const invalidData = {
        bundle: {
          objects: [
            { id: 'obj-1', type: 'type-a' },
            { id: 'obj-2', type: 'type-b' },
            { id: 'obj-1', type: 'type-c' }, // Duplicate
          ],
        },
      };

      expect(() => schema.parse(invalidData)).toThrow(/Duplicate object/);
    });
  });

  describe('Multiple duplicates', () => {
    it('should report all duplicates in array', () => {
      const schema = z
        .object({
          items: z.array(
            z.object({
              id: z.string(),
            }),
          ),
        })
        .check(validateNoDuplicates(['items'], ['id']));

      const invalidData = {
        items: [
          { id: '1' },
          { id: '2' },
          { id: '1' }, // First duplicate
          { id: '3' },
          { id: '2' }, // Second duplicate
          { id: '1' }, // Third duplicate
        ],
      };

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw for multiple duplicates');
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Should have 3 errors (indices 2, 4, 5)
          expect(error.issues.length).toBe(3);
        } else {
          throw error;
        }
      }
    });
  });

  describe('Primitive array validation', () => {
    it('should accept array with unique primitive values', () => {
      const schema = z.array(z.string()).check(validateNoDuplicates([], []));

      const validData = ['value1', 'value2', 'value3'];

      expect(() => schema.parse(validData)).not.toThrow();
    });

    it('should reject array with duplicate primitive values', () => {
      const schema = z.array(z.string()).check(validateNoDuplicates([], []));

      const invalidData = ['value1', 'value2', 'value1']; // Duplicate

      expect(() => schema.parse(invalidData)).toThrow(/Duplicate value/);
    });

    it('should include the duplicate value in error message for primitives', () => {
      const schema = z.array(z.string()).check(validateNoDuplicates([], []));

      const invalidData = ['abc', 'def', 'abc']; // Duplicate

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw for duplicate primitives');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toContain('abc');
          expect(errorMessage).toContain('index 2');
          expect(errorMessage).toContain('index 0');
        } else {
          throw error;
        }
      }
    });

    it('should use custom error message for primitive arrays', () => {
      const schema = z
        .array(z.string())
        .check(validateNoDuplicates([], [], 'Duplicate ID "{value}" at position {index}'));

      const invalidData = ['id-1', 'id-2', 'id-1']; // Duplicate

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw with custom error message');
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues[0].message;
          expect(errorMessage).toBe('Duplicate ID "id-1" at position 2');
        } else {
          throw error;
        }
      }
    });

    it('should handle multiple duplicates in primitive array', () => {
      const schema = z.array(z.string()).check(validateNoDuplicates([], []));

      const invalidData = ['a', 'b', 'a', 'c', 'b', 'a'];

      try {
        schema.parse(invalidData);
        expect.fail('Expected schema to throw for multiple duplicates');
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Should have 3 errors (indices 2, 4, 5)
          expect(error.issues.length).toBe(3);
        } else {
          throw error;
        }
      }
    });

    it('should work with number arrays', () => {
      const schema = z.array(z.number()).check(validateNoDuplicates([], []));

      const invalidData = [1, 2, 3, 2]; // Duplicate

      expect(() => schema.parse(invalidData)).toThrow(/Duplicate value/);
    });
  });
});
