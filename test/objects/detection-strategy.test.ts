import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';
import { type ExternalReferences } from '../../src/schemas/common/index';
import {
    type DetectionStrategy,
    detectionStrategySchema,
} from '../../src/schemas/sdo/detection-strategy.schema';
import { createSyntheticStixObject } from '../../src/utils/generator';

describe('detectionStrategySchema', () => {
  const minimalDetectionStrategy = createSyntheticStixObject('x-mitre-detection-strategy');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => detectionStrategySchema.parse(minimalDetectionStrategy)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullDetectionStrategy: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_deprecated: false,
        x_mitre_contributors: ['John Doe', 'Jane Smith'],
        x_mitre_analytic_refs: [
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
        ],
      };
      expect(() => detectionStrategySchema.parse(fullDetectionStrategy)).not.toThrow();
    });

    it('should accept multiple analytics', () => {
      const multiAnalyticsDetectionStrategy: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_analytic_refs: [
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
          `x-mitre-analytic--${uuidv4()}`,
        ],
      };
      expect(() => detectionStrategySchema.parse(multiAnalyticsDetectionStrategy)).not.toThrow();
    });
  });

  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof DetectionStrategy,
      invalidValue: any,
      isRequired = true,
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalDetectionStrategy, [fieldName]: invalidValue };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalDetectionStrategy;
          expect(() => detectionStrategySchema.parse(objectWithoutField)).toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
      testField('id', `x-mitre-analytic--${uuidv4()}`); // Wrong prefix
    });

    describe('type', () => {
      testField('type', 'invalid-type');
      testField('type', 'x-mitre-analytic'); // Wrong type
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

    describe('x_mitre_analytic_refs', () => {
      it('should reject empty array', () => {
        const invalidObject = { ...minimalDetectionStrategy, x_mitre_analytic_refs: [] };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should reject analytics with invalid STIX ID format', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_analytic_refs: ['invalid-analytic-id'],
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should reject analytics with wrong STIX type prefix', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_analytic_refs: [`x-mitre-detection-strategy--${uuidv4()}`],
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_analytic_refs: 'not-an-array',
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should reject analytics with malformed UUID', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_analytic_refs: ['x-mitre-analytic--invalid-uuid'],
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });
    });

    // Optional Fields Testing
    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });

    describe('x_mitre_contributors', () => {
      it('should reject non-array value', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_contributors: 'not-an-array',
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should reject empty strings in contributors array', () => {
        const invalidObject = {
          ...minimalDetectionStrategy,
          x_mitre_contributors: ['John Doe', '', 'Jane Smith'],
        };
        expect(() => detectionStrategySchema.parse(invalidObject)).toThrow();
      });

      it('should accept valid contributors array', () => {
        const validObject = {
          ...minimalDetectionStrategy,
          x_mitre_contributors: ['John Doe', 'Jane Smith'],
        };
        expect(() => detectionStrategySchema.parse(validObject)).not.toThrow();
      });

      it('should reject empty array', () => {
        const validObject = {
          ...minimalDetectionStrategy,
          x_mitre_contributors: [],
        };
        expect(() => detectionStrategySchema.parse(validObject)).toThrow();
      });
    });
  });

  describe('Schema Refinements', () => {
    describe('External References Validation', () => {
      it('should reject when ATT&CK ID is missing', () => {
        const invalidDetectionStrategy = {
          ...minimalDetectionStrategy,
          external_references: [{ source_name: 'mitre-attack' }],
        };
        expect(() => detectionStrategySchema.parse(invalidDetectionStrategy)).toThrow(
          /ATT&CK ID must be defined/,
        );
      });

      it('should reject invalid ATT&CK ID format', () => {
        const invalidDetectionStrategy = {
          ...minimalDetectionStrategy,
          external_references: [{ source_name: 'mitre-attack', external_id: 'DS123' }],
        };
        expect(() => detectionStrategySchema.parse(invalidDetectionStrategy)).toThrow(
          `The first external_reference must match the ATT&CK ID format DET####.`,
        );
      });

      it('should reject ATT&CK ID with wrong prefix', () => {
        const invalidDetectionStrategy = {
          ...minimalDetectionStrategy,
          external_references: [{ source_name: 'mitre-attack', external_id: 'LS0001' }],
        };
        expect(() => detectionStrategySchema.parse(invalidDetectionStrategy)).toThrow(
          `The first external_reference must match the ATT&CK ID format DET####.`,
        );
      });
    });
  });

  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidDetectionStrategy = {
        ...minimalDetectionStrategy,
        unknown_property: true,
      } as DetectionStrategy;
      expect(() => detectionStrategySchema.parse(invalidDetectionStrategy)).toThrow();
    });

    it('should enforce strict mode', () => {
      const invalidDetectionStrategy = {
        ...minimalDetectionStrategy,
        foo: 'bar', // Not a valid field
      };
      expect(() => detectionStrategySchema.parse(invalidDetectionStrategy)).toThrow();
    });
  });

  describe('Edge Cases and Special Scenarios', () => {
    it('should handle duplicate analytic IDs', () => {
      const analyticId = `x-mitre-analytic--${uuidv4()}`;
      const detectionStrategyWithDuplicates: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_analytic_refs: [analyticId, analyticId, analyticId],
      };
      // Schema doesn't prevent duplicates, so this should pass
      expect(() => detectionStrategySchema.parse(detectionStrategyWithDuplicates)).not.toThrow();
    });

    it('should handle large number of analytics', () => {
      const manyAnalytics = Array.from({ length: 100 }, () => `x-mitre-analytic--${uuidv4()}`);
      const detectionStrategyWithManyAnalytics: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_analytic_refs: manyAnalytics,
      };
      expect(() => detectionStrategySchema.parse(detectionStrategyWithManyAnalytics)).not.toThrow();
    });

    it('should handle very long contributor names', () => {
      const longName = 'A'.repeat(1000);
      const detectionStrategyWithLongNames: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_contributors: [longName, 'Normal Name'],
      };
      expect(() => detectionStrategySchema.parse(detectionStrategyWithLongNames)).not.toThrow();
    });

    it('should handle special characters in contributor names', () => {
      const detectionStrategyWithSpecialChars: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_contributors: [
          'John Doe-Smith',
          "Jane O'Connor",
          'José García',
          '李小明',
          'user@domain.com',
        ],
      };
      expect(() => detectionStrategySchema.parse(detectionStrategyWithSpecialChars)).not.toThrow();
    });

    it('should handle mixed case and special characters in names', () => {
      const detectionStrategyWithMixedCase: DetectionStrategy = {
        ...minimalDetectionStrategy,
        name: 'Advanced PowerShell Command-Line Detection (v2.1)',
        x_mitre_contributors: ['Dr. John Smith, PhD', 'Jane Doe (Security Analyst)'],
      };
      expect(() => detectionStrategySchema.parse(detectionStrategyWithMixedCase)).not.toThrow();
    });

    it('should handle analytics from different UUIDs formats', () => {
      const detectionStrategyWithVariousUUIDs: DetectionStrategy = {
        ...minimalDetectionStrategy,
        x_mitre_analytic_refs: [
          'x-mitre-analytic--550e8400-e29b-41d4-a716-446655440000', // Version 1 UUID format
          'x-mitre-analytic--6ba7b810-9dad-11d1-80b4-00c04fd430c8', // Version 1 UUID format
          'x-mitre-analytic--6ba7b811-9dad-11d1-80b4-00c04fd430c8', // Version 1 UUID format
        ],
      };
      expect(() => detectionStrategySchema.parse(detectionStrategyWithVariousUUIDs)).not.toThrow();
    });
  });
});
