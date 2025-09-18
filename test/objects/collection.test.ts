import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';
import { type Collection, collectionSchema } from '../../src/schemas/sdo/collection.schema';
import { createSyntheticStixObject } from '../../src/utils/index';

/**
 * Test suite for validating the Collection schema.
 */
describe('collectionSchema', () => {
  const minimalCollection = createSyntheticStixObject('x-mitre-collection');

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => collectionSchema.parse(minimalCollection)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof Collection,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidCollection = { ...minimalCollection, [fieldName]: invalidValue };
        expect(() => collectionSchema.parse(invalidCollection)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...collectionWithoutField } = minimalCollection;
          expect(() => collectionSchema.parse(collectionWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...collectionWithoutField } = minimalCollection;
          expect(() => collectionSchema.parse(collectionWithoutField)).not.toThrow();
        });
      }
    };

    // Required Fields
    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref'); // should reject invalid string values
      testField('created_by_ref', `malware--${uuidv4()}`); // should reject invalid UUID format
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', ['invalid-object-marking-refs']);
    });

    describe('description', () => {
      testField('description', 123);
    });

    describe('x_mitre_contents', () => {
      testField('x_mitre_contents', ['invalid-mitre-contents']);
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidCollection: Collection = {
        ...minimalCollection,
        unknown_property: true,
      } as Collection;
      expect(() => collectionSchema.parse(invalidCollection)).toThrow();
    });
  });

  /**
   * Schema Refinements
   */
  describe('Schema Refinements', () => {
    it('should reject if x_mitre_contents array is empty', () => {
      const invalidCollection: Collection = {
        ...minimalCollection,
        x_mitre_contents: [],
      };
      expect(() => collectionSchema.parse(invalidCollection)).toThrow(
        'At least one STIX object reference is required',
      );
    });
  });
});
