import { describe, expect, it } from 'vitest';
import { type ExternalReferences } from '../../src/schemas/common/index';
import { type Mitigation, mitigationSchema } from '../../src/schemas/sdo/mitigation.schema';
import { createSyntheticStixObject } from '../../src/utils/index';

describe('MitigationSchema', () => {
  const minimalMitigation = createSyntheticStixObject('course-of-action');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => mitigationSchema.parse(minimalMitigation)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional fields)', () => {
      const mitigationWithOptionalFields: Mitigation = {
        ...minimalMitigation,
        x_mitre_deprecated: false,
        revoked: false,
        labels: [
          'IEC 62443-3-3:2013 - SR 5.4',
          'IEC 62443-4-2:2019 - CR 5.4',
          'NIST SP 800-53 Rev. 5 - SI-3',
        ],
        x_mitre_old_attack_id: 'MOB-M1008',
      };

      expect(() => mitigationSchema.parse(mitigationWithOptionalFields)).not.toThrow();
    });
  });

  describe('Field-Specific Tests', () => {
    const testField = (fieldName: keyof Mitigation, invalidValue: any, isRequired = true) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalMitigation, [fieldName]: invalidValue };
        expect(() => mitigationSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalMitigation;
          expect(() => mitigationSchema.parse(objectWithoutField)).toThrow();
        });
      }
    };

    // Testing required fields
    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
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

    describe('description', () => {
      testField('description', 123);
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 123);
    });

    describe('created', () => {
      testField('created', 123);
    });

    describe('modified', () => {
      testField('modified', 123);
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', 123);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-domain']);
    });

    describe('external_references', () => {
      testField('external_references', 'not-an-array' as unknown as ExternalReferences);
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 123);
    });

    // Testing optional fields
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not a boolean', false);
    });

    describe('revoked', () => {
      testField('revoked', 'not a boolean', false);
    });

    describe('labels', () => {
      testField('labels', 'not an array', false);
    });

    describe('x_mitre_old_attack_id', () => {
      testField('x_mitre_old_attack_id', 123, false);
    });
  });

  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const mitigationWithUnknownProp = {
        ...minimalMitigation,
        unknownProp: 'unexpected_value',
      } as Mitigation;
      expect(() => mitigationSchema.parse(mitigationWithUnknownProp)).toThrow();
    });
  });
});
