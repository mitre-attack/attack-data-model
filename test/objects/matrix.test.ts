import { describe, beforeEach, it, expect } from 'vitest';
import {
  type Description,
  type StixCreatedTimestamp,
  type StixModifiedTimestamp,
} from '../../src/schemas/common/index';
import { type Matrix, matrixSchema } from '../../src/schemas/sdo/matrix.schema';
import { v4 as uuidv4 } from 'uuid';

/**
 * Test suite for validating the Matrix schema.
 */
describe('MatrixSchema', () => {
  let minimalMatrix: Matrix;

  beforeEach(() => {
    minimalMatrix = {
      id: `x-mitre-matrix--${uuidv4()}`,
      type: 'x-mitre-matrix',
      spec_version: '2.1',
      created: '2017-06-01T00:00:00.000Z' as StixCreatedTimestamp,
      modified: '2017-06-01T00:00:00.000Z' as StixModifiedTimestamp,
      x_mitre_attack_spec_version: '2.1.0',
      x_mitre_version: '1.0',
      name: 'Test Matrix',
      object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
      x_mitre_domains: ['ics-attack'],
      description:
        'The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base.' as Description,
      created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      external_references: [
        {
          source_name: 'mitre-attack',
          external_id: 'ics-attack',
          url: 'https://attack.mitre.org/matrices/ics/',
        },
      ],
      x_mitre_modified_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      tactic_refs: ['x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a'],
    };
  });

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
