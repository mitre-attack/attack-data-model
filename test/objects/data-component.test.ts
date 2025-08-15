import { describe, expect, it } from 'vitest';
import {
  type DataComponent,
  dataComponentSchema,
} from '../../src/schemas/sdo/data-component.schema';
import { createSyntheticStixObject } from '../../src/utils/index';

describe('dataComponentSchema', () => {
  const minimalDataComponent = createSyntheticStixObject('x-mitre-data-component');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => dataComponentSchema.parse(minimalDataComponent)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullDataComponent: DataComponent = {
        ...minimalDataComponent,
        x_mitre_deprecated: false,
      };
      expect(() => dataComponentSchema.parse(fullDataComponent)).not.toThrow();
    });
  });

  describe('Field-Specific Tests', () => {
    const testField = (fieldName: keyof DataComponent, invalidValue: any, isRequired = true) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalDataComponent, [fieldName]: invalidValue };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalDataComponent;
          expect(() => dataComponentSchema.parse(objectWithoutField)).toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('description', () => {
      testField('description', 123);
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref');
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', ['invalid-object-marking-refs']);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-mitre-domains']);
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 'invalid-modified-by-ref');
    });

    describe('x_mitre_data_source_ref', () => {
      testField('x_mitre_data_source_ref', 'invalid-data-source-ref');
    });

    // Optional Fields Testing
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });
  });

  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidDataComponent = {
        ...minimalDataComponent,
        unknown_property: true,
      } as DataComponent;
      expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
    });
  });
});
