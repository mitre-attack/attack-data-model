import { describe, beforeEach, it, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { type Analytic, analyticSchema, LogSourceRef } from '../../src/schemas/sdo/analytic.schema';
import {
  type StixCreatedTimestamp,
  type StixModifiedTimestamp,
  type ExternalReferences,
  type XMitreModifiedByRef,
  xMitreIdentity,
} from '../../src/schemas/common/index';

describe('analyticSchema', () => {
  let minimalAnalytic: Analytic;

  beforeEach(() => {
    minimalAnalytic = {
      type: 'x-mitre-analytic',
      id: `x-mitre-analytic--${uuidv4()}`,
      spec_version: '2.1',
      created: '2025-10-31T00:00:00.000Z' as StixCreatedTimestamp,
      created_by_ref: `identity--${uuidv4()}`,
      modified: '2025-10-31T00:00:00.000Z' as StixModifiedTimestamp,
      name: 'Suspicious PowerShell Activity',
      object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
      external_references: [
        {
          source_name: 'mitre-attack',
          url: 'https://attack.mitre.org/analytics/AN0001',
          external_id: 'AN0001',
        },
      ],
      x_mitre_attack_spec_version: '2.1.0',
      x_mitre_domains: ['enterprise-attack'],
      x_mitre_platforms: ['Windows'],
      x_mitre_version: '1.0',
      x_mitre_detects: 'Adversary execution of PowerShell commands with suspicious parameters',
      x_mitre_log_sources: [
        {
          ref: `x-mitre-log-source--${uuidv4()}`,
          keys: ['PowerShell'],
        },
      ],
      x_mitre_mutable_elements: [
        {
          field: 'TimeWindow',
          description: 'Time window for correlation analysis',
        },
      ],
    };
  });

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => analyticSchema.parse(minimalAnalytic)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullAnalytic: Analytic = {
        ...minimalAnalytic,
        x_mitre_deprecated: false,
        x_mitre_platforms: ['Windows'],
        x_mitre_log_sources: [
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['PowerShell'],
          },
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['Security', 'System'],
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

    it('should accept multiple log sources and mutable elements', () => {
      const multiElementAnalytic: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_sources: [
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['PowerShell'],
          },
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['Security', 'Application'],
          },
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['Sysmon'],
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

    describe('x_mitre_detects', () => {
      testField('x_mitre_detects', ''); // Empty string should fail
      testField('x_mitre_detects', 123); // Non-string should fail
    });

    describe('x_mitre_log_sources', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalAnalytic, x_mitre_log_sources: [] };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source refs with invalid ref format', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [{ ref: 'invalid-ref', keys: ['PowerShell'] }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source refs with wrong STIX type prefix', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [{ ref: `x-mitre-analytic--${uuidv4()}`, keys: ['PowerShell'] }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source refs with empty keys array', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [{ ref: `x-mitre-log-source--${uuidv4()}`, keys: [] }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source refs missing ref field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [{ keys: ['PowerShell'] }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject log source refs missing keys field', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [{ ref: `x-mitre-log-source--${uuidv4()}` }],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject identical log source refs', () => {
        const duplicateRef: LogSourceRef = {
          ref: `x-mitre-log-source--${uuidv4()}`,
          keys: ['PowerShell'],
        };
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [duplicateRef, duplicateRef],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should reject duplicate log source refs with duplicate ref keys', () => {
        const duplicateId = `x-mitre-log-source--${uuidv4()}`;
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [
            {
              ref: duplicateId,
              keys: ['Foo'],
            },
            {
              ref: duplicateId,
              keys: ['Bar'],
            },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).toThrow();
      });

      it('should accept log source refs with overlapping keys', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: [
            {
              ref: `x-mitre-log-source--${uuidv4()}`,
              keys: ['PowerShell'],
            },
            {
              ref: `x-mitre-log-source--${uuidv4()}`,
              keys: ['PowerShell'],
            },
          ],
        };
        expect(() => analyticSchema.parse(invalidObject)).not.toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalAnalytic,
          x_mitre_log_sources: 'not-an-array',
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
    it('should handle very long detects description', () => {
      const longString = 'A'.repeat(1000);
      const analyticWithLongDetects: Analytic = {
        ...minimalAnalytic,
        x_mitre_detects: longString,
      };
      expect(() => analyticSchema.parse(analyticWithLongDetects)).not.toThrow();
    });

    it('should handle special characters in detects description', () => {
      const analyticWithSpecialChars: Analytic = {
        ...minimalAnalytic,
        x_mitre_detects:
          'Adversary execution of PowerShell commands with suspicious parameters: $var = "test"; & cmd /c "dir"',
      };
      expect(() => analyticSchema.parse(analyticWithSpecialChars)).not.toThrow();
    });

    it('should handle multiple keys in log source refs', () => {
      const analyticWithMultipleKeys: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_sources: [
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['PowerShell', 'Security', 'Application', 'System'],
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

    it('should handle complex log source key patterns', () => {
      const analyticWithComplexKeys: Analytic = {
        ...minimalAnalytic,
        x_mitre_log_sources: [
          {
            ref: `x-mitre-log-source--${uuidv4()}`,
            keys: ['sysmon:1', 'auditd:SYSCALL', 'Security/Microsoft-Windows-Security-Auditing'],
          },
        ],
      };
      expect(() => analyticSchema.parse(analyticWithComplexKeys)).not.toThrow();
    });
  });
});
