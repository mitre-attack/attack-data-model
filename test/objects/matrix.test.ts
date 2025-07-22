import { describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/generator';
import { type Matrix, matrixSchema } from '../../src/schemas/sdo/matrix.schema';

/**
 * Test suite for validating the Matrix schema.
 */
describe('MatrixSchema', () => {
  const minimalMatrix = createSyntheticStixObject('x-mitre-matrix');

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => matrixSchema.parse(minimalMatrix)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional fields)', () => {
      const matrixWithOptionalFields: Matrix = {
        ...minimalMatrix,
        x_mitre_deprecated: false,
        revoked: false,
      };

      expect(() => matrixSchema.parse(matrixWithOptionalFields)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof Matrix,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidMatrix = { ...minimalMatrix, [fieldName]: invalidValue };
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...matrixWithoutField } = minimalMatrix;
          expect(() => matrixSchema.parse(matrixWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...matrixWithoutField } = minimalMatrix;
          expect(() => matrixSchema.parse(matrixWithoutField)).not.toThrow();
        });
      }
    };

    // Required Fields
    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('spec_version', () => {
      testField('spec_version', 'invalid-spec-version');
    });

    describe('x_mitre_attack_spec_version', () => {
      testField('x_mitre_attack_spec_version', 'invalid-version');
    });

    describe('name', () => {
      testField('name', 123);
    });

    describe('x_mitre_version', () => {
      testField('x_mitre_version', 123);
    });

    describe('created', () => {
      testField('created', 123);
    });

    describe('modified', () => {
      testField('modified', 123);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-domain']);
    });

    describe('external_references', () => {
      testField('external_references', 'not-an-array');
    });

    // Required Fields that were incorrectly tested as optional
    describe('description', () => {
      testField('description', 123); // Now marked as required
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 123); // Now marked as required
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 123); // Now marked as required
    });

    // Optional Fields
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not a boolean', false);
    });

    describe('revoked', () => {
      testField('revoked', 'not a boolean', false);
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const matrixWithUnknownProp: Matrix = {
        ...minimalMatrix,
        unknownProp: 'unexpected value',
      } as Matrix;
      expect(() => matrixSchema.parse(matrixWithUnknownProp)).toThrow();
    });
  });
});
