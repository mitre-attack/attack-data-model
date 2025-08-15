import { describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/generator';
import { markingDefinitionSchema } from '../../src/schemas/smo/marking-definition.schema';

/**
 * Test suite for validating MarkingDefinition schema with "statement" type.
 */
describe('MarkingDefinitionSchema (Statement)', () => {
  const minimalMarkingDefinition = createSyntheticStixObject('marking-definition');

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it("should accept minimal valid 'statement' marking definition", () => {
      expect(() => markingDefinitionSchema.parse(minimalMarkingDefinition)).not.toThrow();
    });

    it("should accept fully populated valid 'statement' marking definition (required + optional fields)", () => {
      const markingDefinitionWithOptionalFields = {
        ...minimalMarkingDefinition,
        name: 'Statement Marking Definition',
      };

      expect(() =>
        markingDefinitionSchema.parse(markingDefinitionWithOptionalFields),
      ).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: string,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalMarkingDefinition, [fieldName]: invalidValue };
        expect(() => markingDefinitionSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalMarkingDefinition;
          expect(() => markingDefinitionSchema.parse(objectWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalMarkingDefinition;
          expect(() => markingDefinitionSchema.parse(objectWithoutField)).not.toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('spec_version', () => {
      testField('spec_version', 'invalid-version');
    });

    describe('definition_type', () => {
      testField('definition_type', 'invalid-definition-type');
    });

    describe('created', () => {
      testField('created', 'invalid-timestamp');
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref');
    });

    describe('definition', () => {
      it('should reject invalid statement definition', () => {
        const invalidDefinition = {
          ...minimalMarkingDefinition,
          definition: {
            statement: 123, // Invalid statement type
          },
        };
        expect(() => markingDefinitionSchema.parse(invalidDefinition)).toThrow();
      });

      it("should reject omission of 'statement' in the definition", () => {
        const { definition, ...objectWithoutDefinition } = minimalMarkingDefinition;
        expect(() => markingDefinitionSchema.parse(objectWithoutDefinition)).toThrow();
      });
    });

    // Optional fields
    describe('name', () => {
      testField('name', 123, false);
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const markingDefinitionWithUnknownProp = {
        ...minimalMarkingDefinition,
        unknown_property: 'unexpected value',
      };

      expect(() => markingDefinitionSchema.parse(markingDefinitionWithUnknownProp)).toThrow();
    });
  });
});
