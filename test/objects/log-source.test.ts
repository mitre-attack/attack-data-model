import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/generator';
import {
    type ExternalReferences
} from '../../src/schemas/common/index';
import { type LogSource, logSourceSchema } from '../../src/schemas/sdo/log-source.schema';

describe('logSourceSchema', () => {
  const minimalLogSource = createSyntheticStixObject('x-mitre-log-source');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => logSourceSchema.parse(minimalLogSource)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullLogSource: LogSource = {
        ...minimalLogSource,
        x_mitre_deprecated: false,
        x_mitre_log_source_permutations: [
          {
            name: 'Security',
            channel: 'Security',
          },
          {
            name: 'System',
            channel: 'System',
          },
        ],
      };
      expect(() => logSourceSchema.parse(fullLogSource)).not.toThrow();
    });

    it('should accept multiple log source permutations', () => {
      const multiPermutationLogSource: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
          {
            name: 'Application',
            channel: 'Application',
          },
          {
            name: 'Security',
            channel: 'Security',
          },
          {
            name: 'System',
            channel: 'System',
          },
        ],
      };
      expect(() => logSourceSchema.parse(multiPermutationLogSource)).not.toThrow();
    });
  });

  describe('Field-Specific Tests', () => {
    const testField = (fieldName: keyof LogSource, invalidValue: any, isRequired = true) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalLogSource, [fieldName]: invalidValue };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalLogSource;
          expect(() => logSourceSchema.parse(objectWithoutField)).toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
      testField('id', `x-mitre-data-source--${uuidv4()}`); // Wrong prefix
    });

    describe('type', () => {
      testField('type', 'invalid-type');
      testField('type', 'x-mitre-data-source'); // Wrong type
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

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 'invalid-modified-by-ref');
    });

    describe('x_mitre_log_source_permutations', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalLogSource, x_mitre_log_source_permutations: [] };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      it('should reject permutations with empty name', () => {
        const invalidObject = {
          ...minimalLogSource,
          x_mitre_log_source_permutations: [{ name: '', channel: 'Security' }],
        };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      it('should reject permutations with empty channel', () => {
        const invalidObject = {
          ...minimalLogSource,
          x_mitre_log_source_permutations: [{ name: 'Security', channel: '' }],
        };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      it('should reject permutations missing name', () => {
        const invalidObject = {
          ...minimalLogSource,
          x_mitre_log_source_permutations: [{ channel: 'Security' }],
        };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      it('should reject permutations missing channel', () => {
        const invalidObject = {
          ...minimalLogSource,
          x_mitre_log_source_permutations: [{ name: 'Security' }],
        };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalLogSource,
          x_mitre_log_source_permutations: 'not-an-array',
        };
        expect(() => logSourceSchema.parse(invalidObject)).toThrow();
      });
    });

    // Optional Fields Testing
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });
  });

  describe('Schema Refinements', () => {
    describe('External References Validation', () => {
      it('should reject when ATT&CK ID is missing', () => {
        const invalidLogSource = {
          ...minimalLogSource,
          external_references: [{ source_name: 'mitre-attack' }],
        };
        expect(() => logSourceSchema.parse(invalidLogSource)).toThrow(/ATT&CK ID must be defined/);
      });

      it('should reject invalid ATT&CK ID format', () => {
        const invalidLogSource = {
          ...minimalLogSource,
          external_references: [{ source_name: 'mitre-attack', external_id: 'LS123' }],
        };
        expect(() => logSourceSchema.parse(invalidLogSource)).toThrow(
          `The first external_reference must match the ATT&CK ID format LS####.`,
        );
      });

      it('should reject ATT&CK ID with wrong prefix', () => {
        const invalidLogSource = {
          ...minimalLogSource,
          external_references: [{ source_name: 'mitre-attack', external_id: 'DS0001' }],
        };
        expect(() => logSourceSchema.parse(invalidLogSource)).toThrow(
          `The first external_reference must match the ATT&CK ID format LS####.`,
        );
      });
    });
  });

  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidLogSource = {
        ...minimalLogSource,
        unknown_property: true,
      } as LogSource;
      expect(() => logSourceSchema.parse(invalidLogSource)).toThrow();
    });

    it('should enforce strict mode', () => {
      const invalidLogSource = {
        ...minimalLogSource,
        foo: 'bar', // Not a valid field
      };
      expect(() => logSourceSchema.parse(invalidLogSource)).toThrow();
    });
  });

  describe('Edge Cases and Special Scenarios', () => {
    it('should reject log source permutations with identical (name, channel) pairs', () => {
      const logSourceWithIdenticalPermutations: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
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
      expect(() => logSourceSchema.parse(logSourceWithIdenticalPermutations)).toThrow(
        /Duplicate log source permutation found/,
      );
    });

    it('should allow permutations with same name but different channel', () => {
      const logSourceWithSameName: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
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
      expect(() => logSourceSchema.parse(logSourceWithSameName)).not.toThrow();
    });

    it('should allow permutations with same channel but different name', () => {
      const logSourceWithSameChannel: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
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
      expect(() => logSourceSchema.parse(logSourceWithSameChannel)).not.toThrow();
    });

    it('should handle very long permutation names and channels', () => {
      const longString = 'A'.repeat(1000);
      const logSourceWithLongStrings: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
          {
            name: longString,
            channel: longString,
          },
        ],
      };
      expect(() => logSourceSchema.parse(logSourceWithLongStrings)).not.toThrow();
    });

    it('should handle special characters in permutation fields', () => {
      const logSourceWithSpecialChars: LogSource = {
        ...minimalLogSource,
        x_mitre_log_source_permutations: [
          {
            name: 'Security/Application-Logs_2024',
            channel: 'Microsoft-Windows-Security-Auditing/Operational',
          },
        ],
      };
      expect(() => logSourceSchema.parse(logSourceWithSpecialChars)).not.toThrow();
    });
  });
});
