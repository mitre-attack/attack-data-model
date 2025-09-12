import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/generator';
import { type ExternalReferences } from '../../src/schemas/common/index';
import {
  type Analytic,
  analyticSchema,
  LogSourceReference,
} from '../../src/schemas/sdo/analytic.schema';

describe('analyticSchema', () => {
  const minimalAnalytic = createSyntheticStixObject('x-mitre-analytic');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => analyticSchema.parse(minimalAnalytic)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullAnalytic: Analytic = {
        ...minimalAnalytic,
        x_mitre_deprecated: false,
        x_mitre_platforms: ['Windows'],
        x_mitre_log_source_references: [
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['PowerShell'],
          },
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['Security', 'System'],
          },
        ],
        x_mitre_mutable_elements: [
          {
            field: 'TimeWindow',
            description: 'Time window for correlation analysis',
          },
          {
            field: 'UserContext',
            description: 'User context for filtering',
          },
        ],
      };
      expect(() => analyticSchema.parse(fullAnalytic)).not.toThrow();
    });

    it('should accept multiple log source references and mutable elements', () => {
      const multiElementAnalytic: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_source_references: [
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['PowerShell'],
          },
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['Security', 'Application'],
          },
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['Sysmon'],
          },
        ],
        x_mitre_mutable_elements: [
          {
            field: 'TimeWindow',
            description: 'Time window for correlation analysis',
          },
          {
            field: 'UserContext',
            description: 'User context for filtering',
          },
          {
            field: 'PortRange',
            description: 'Network port range for filtering',
          },
        ],
      };
      expect(() => analyticSchema.parse(multiElementAnalytic)).not.toThrow();
    });
  });

  describe('Field-Specific Tests', () => {
    const testField = (fieldName: keyof Analytic, invalidValue: any, isRequired = true) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalAnalytic, [fieldName]: invalidValue };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalAnalytic;
          expect(() => analyticSchema.parse(objectWithoutField)).toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
      testField('id', `x-mitre-log-source--${uuidv4()}`); // Wrong prefix
    });

    describe('type', () => {
      testField('type', 'invalid-type');
      testField('type', 'x-mitre-log-source'); // Wrong type
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref');
    });

    describe('external_references', () => {
      testField('external_references', 'not-an-array' as unknown as ExternalReferences);
      testField('external_references', []); // Empty array should fail
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', ['invalid-object-marking-refs']);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-mitre-domains']);
    });

    describe('description', () => {
      testField('description', ''); // Empty string should fail
      testField('description', 123); // Non-string should fail
    });

    describe('x_mitre_log_source_references', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalAnalytic, x_mitre_log_source_references: [] };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source references with invalid x_mitre_log_source_ref format', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            { x_mitre_log_source_ref: 'invalid-log-source-ref', permutation_names: ['PowerShell'] },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source references with wrong STIX type prefix', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            { x_mitre_log_source_ref: `x-mitre-analytic--${uuidv4()}`, permutation_names: ['PowerShell'] },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source references with empty permutation_names array', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            { x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`, permutation_names: [] },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source references missing x_mitre_log_source_ref field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [{ permutation_names: ['PowerShell'] }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source references missing permutation_names field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            { x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}` },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject identical log source references', () => {
        const duplicateRef: LogSourceReference = {
          x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
          permutation_names: ['PowerShell'],
        };
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [duplicateRef, duplicateRef],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject duplicate log source references with duplicate x_mitre_log_source_ref', () => {
        const duplicateId = `x-mitre-log-source--${uuidv4()}`;
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            {
              x_mitre_log_source_ref: duplicateId,
              permutation_names: ['Foo'],
            },
            {
              x_mitre_log_source_ref: duplicateId,
              permutation_names: ['Bar'],
            },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should accept log source references with overlapping permutation_names', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: [
            {
              x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
              permutation_names: ['PowerShell'],
            },
            {
              x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
              permutation_names: ['PowerShell'],
            },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).not.toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_source_references: 'not-an-array',
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });
    });

    describe('x_mitre_mutable_elements', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalAnalytic, x_mitre_mutable_elements: [] };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject mutable elements with empty field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_mutable_elements: [
            { field: '', description: 'Time window for correlation analysis' },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject mutable elements with empty description', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_mutable_elements: [{ field: 'TimeWindow', description: '' }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject mutable elements missing field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_mutable_elements: [{ description: 'Time window for correlation analysis' }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject mutable elements missing description', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_mutable_elements: [{ field: 'TimeWindow' }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_mutable_elements: 'not-an-array',
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });
    });

    // Optional Fields Testing
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });

    describe('x_mitre_platforms', () => {
      it('should reject invalid platform values', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_platforms: ['invalid-platform'],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject more than one platform', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_platforms: ['Windows', 'Linux'],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should accept single valid platform', () => {
        const validObject = {
          ...minimalAnalytic,
          x_mitre_platforms: ['Windows'],
        };
        expect(() => analyticSchema.parse(validObject)).not.toThrow();
      });

      it('should reject empty array', () => {
        const validObject = {
          ...minimalAnalytic,
          x_mitre_platforms: [],
        };
        expect(() => analyticSchema.parse(validObject)).toThrow();
      });
    });
  });

  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidAnalytic = {
        ...minimalAnalytic,
        unknown_property: true,
      } as Analytic;
      expect(() => analyticSchema.parse(invalidAnalytic)).toThrow();
    });

    it('should enforce strict mode', () => {
      const invalidAnalytic = {
        ...minimalAnalytic,
        foo: 'bar', // Not a valid field
      };
      expect(() => analyticSchema.parse(invalidAnalytic)).toThrow();
    });
  });

  describe('Edge Cases and Special Scenarios', () => {
    it('should handle very long description', () => {
      const longString = 'A'.repeat(1000);
      const analyticWithLongDescription: Analytic = {
        ...minimalAnalytic,
        description: longString,
      };
      expect(() => analyticSchema.parse(analyticWithLongDescription)).not.toThrow();
    });

    it('should handle special characters in description', () => {
      const analyticWithSpecialChars: Analytic = {
        ...minimalAnalytic,
        description:
          'Adversary execution of PowerShell commands with suspicious parameters: $var = "test"; & cmd /c "dir"',
      };
      expect(() => analyticSchema.parse(analyticWithSpecialChars)).not.toThrow();
    });

    it('should handle multiple permutation_names in log source references', () => {
      const analyticWithMultipleKeys: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_source_references: [
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: ['PowerShell', 'Security', 'Application', 'System'],
          },
        ],
      };
      expect(() => analyticSchema.parse(analyticWithMultipleKeys)).not.toThrow();
    });

    it('should handle very long field names and descriptions in mutable elements', () => {
      const longString = 'A'.repeat(500);
      const analyticWithLongMutableElements: Analytic = {
        ...minimalAnalytic,
        x_mitre_mutable_elements: [
          {
            field: longString,
            description: longString,
          },
        ],
      };
      expect(() => analyticSchema.parse(analyticWithLongMutableElements)).not.toThrow();
    });

    it('should handle special characters in mutable element fields', () => {
      const analyticWithSpecialChars: Analytic = {
        ...minimalAnalytic,
        x_mitre_mutable_elements: [
          {
            field: 'TimeWindow_2024-Q1',
            description: 'Time window for correlation analysis (2024 Q1 baseline)',
          },
        ],
      };
      expect(() => analyticSchema.parse(analyticWithSpecialChars)).not.toThrow();
    });

    it('should handle complex log source permutation name patterns', () => {
      const analyticWithComplexPermutationNames: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_source_references: [
          {
            x_mitre_log_source_ref: `x-mitre-log-source--${uuidv4()}`,
            permutation_names: [
              'sysmon:1',
              'auditd:SYSCALL',
              'Security/Microsoft-Windows-Security-Auditing',
            ],
          },
        ],
      };
      expect(() => analyticSchema.parse(analyticWithComplexPermutationNames)).not.toThrow();
    });
  });
});
