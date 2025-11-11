import { describe, expect, it } from 'vitest';
import { type Tactic, tacticSchema } from '../../src/schemas/sdo/tactic.schema';
import { createSyntheticStixObject } from '../../src/utils/index';

/**
 * Test suite for validating the Tactic schema.
 */
describe('tacticSchema', () => {
  const minimalTactic = createSyntheticStixObject('x-mitre-tactic');

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => tacticSchema.parse(minimalTactic)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullTactic: Tactic = {
        ...minimalTactic,
        x_mitre_deprecated: false,
      };
      expect(() => tacticSchema.parse(fullTactic)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof Tactic,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidTactic = { ...minimalTactic, [fieldName]: invalidValue };
        expect(() => tacticSchema.parse(invalidTactic)).toThrow();
      });
      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...tacticWithoutField } = minimalTactic;
          expect(() => tacticSchema.parse(tacticWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...tacticWithoutField } = minimalTactic;
          expect(() => tacticSchema.parse(tacticWithoutField)).not.toThrow();
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

    describe('description', () => {
      testField('description', 123); // Now marked as required
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref');
    });

    describe('external_references', () => {
      testField('external_references', 'not-an-array');
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', ['invalid-object-marking-refs']);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-mitre-domains']);
    });

    describe('x_mitre_shortname', () => {
      testField('x_mitre_shortname', 'invalid-shortname');
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 'invalid-modified-by-ref');
    });

    // Optional Fields
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false); // Optional field
    });

    describe('revoked', () => {
      testField('revoked', 'not-a-boolean', false); // Optional field
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidTactic: Tactic = {
        ...minimalTactic,
        unknown_property: true,
      } as Tactic;
      expect(() => tacticSchema.parse(invalidTactic)).toThrow();
    });
  });

  /**
   * Schema Refinements
   */
  describe('Schema Refinements', () => {
    it('should reject when ATT&CK ID is missing from external references', () => {
      const invalidTactic = {
        ...minimalTactic,
        external_references: [{ source_name: 'mitre-attack' }],
      };
      expect(() => tacticSchema.parse(invalidTactic)).toThrow(
        'ATT&CK ID must be defined in the first external_references entry.',
      );
    });

    it('should reject invalid ATT&CK ID format', () => {
      const invalidTactic = {
        ...minimalTactic,
        external_references: [{ source_name: 'mitre-attack', external_id: 'TA123' }],
      };
      expect(() => tacticSchema.parse(invalidTactic)).toThrow(
        'The first external_reference must match the ATT&CK ID format TA####.',
      );
    });
  });
});
