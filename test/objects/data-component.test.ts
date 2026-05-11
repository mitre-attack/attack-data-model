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

    describe('x_mitre_log_sources', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalDataComponent, x_mitre_log_sources: [] };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log sources with empty name', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: [{ name: '', channel: 'Security' }],
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log sources with empty channel', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: [{ name: 'Security', channel: '' }],
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log sources with erroneous keys', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: [
            { name: 'Security', channel: 'Security', foobar: '' }, // foobar not allowed
          ],
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log sources missing name', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: [{ channel: 'Security' }],
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log sources missing channel', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: [{ name: 'Security' }],
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalDataComponent,
          x_mitre_log_sources: 'not-an-array',
        };
        expect(() => dataComponentSchema.parse(invalidObject)).toThrow();
      });
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

    it('should enforce strict mode', () => {
      const invalidDataComponent = {
        ...minimalDataComponent,
        foo: 'bar', // Not a valid field
      };
      expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
    });
  });

  describe('Edge Cases and Special Scenarios', () => {
    it('should reject log sources with identical (name, channel) pairs', () => {
      const dataComponentWithIdenticalLogSources: DataComponent = {
        ...minimalDataComponent,
        x_mitre_log_sources: [
          {
            name: 'Security',
            channel: 'Security',
          },
          {
            name: 'Security',
            channel: 'Security',
          },
        ],
      };
      expect(() => dataComponentSchema.parse(dataComponentWithIdenticalLogSources)).toThrow(
        /Duplicate log source found/,
      );
    });

    it('should allow log sources with same name but different channel', () => {
      const dataComponentWithLogSourceWithSameName: DataComponent = {
        ...minimalDataComponent,
        x_mitre_log_sources: [
          {
            name: 'Security',
            channel: 'Security',
          },
          {
            name: 'Security',
            channel: 'Application',
          },
        ],
      };
      expect(() => dataComponentSchema.parse(dataComponentWithLogSourceWithSameName)).not.toThrow();
    });

    it('should allow log sources with same channel but different name', () => {
      const dataComponentWithLogSourcesWithSameChannel: DataComponent = {
        ...minimalDataComponent,
        x_mitre_log_sources: [
          {
            name: 'Security',
            channel: 'EventLog',
          },
          {
            name: 'Application',
            channel: 'EventLog',
          },
        ],
      };
      expect(() => dataComponentSchema.parse(dataComponentWithLogSourcesWithSameChannel)).not.toThrow();
    });

    it('should handle very long log source names and channels', () => {
      const longString = 'A'.repeat(1000);
      const logSourceWithLongStrings: DataComponent = {
        ...minimalDataComponent,
        x_mitre_log_sources: [
          {
            name: longString,
            channel: longString,
          },
        ],
      };
      expect(() => dataComponentSchema.parse(logSourceWithLongStrings)).not.toThrow();
    });

    it('should handle special characters in log source fields', () => {
      const logSourceWithSpecialChars: DataComponent = {
        ...minimalDataComponent,
        x_mitre_log_sources: [
          {
            name: 'Security/Application-Logs_2024',
            channel: 'Microsoft-Windows-Security-Auditing/Operational',
          },
        ],
      };
      expect(() => dataComponentSchema.parse(logSourceWithSpecialChars)).not.toThrow();
    });
  });
});
