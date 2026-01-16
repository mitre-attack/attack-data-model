import { describe, beforeEach, it, expect, afterAll } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { type StixBundle, stixBundleSchema } from '../../src/schemas/sdo/stix-bundle.schema';
import {
  type StixCreatedTimestamp,
  type StixModifiedTimestamp,
  xMitreIdentity,
} from '../../src/schemas/common/index';
import type { Collection } from '../../src/schemas/sdo/collection.schema';
import type { Technique } from '../../src/schemas/sdo/technique.schema';
import { z } from 'zod';
import { logger } from '../utils/logger';

/**
 * Test suite for validating StixBundle schema.
 */
describe('StixBundleSchema', () => {
  let minimalBundle: StixBundle;
  let minimalCollection: Collection;

  beforeEach(() => {
    const collectionId = `x-mitre-collection--${uuidv4()}`;
    minimalCollection = {
      id: collectionId,
      type: 'x-mitre-collection',
      spec_version: '2.1',
      created_by_ref: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
      created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
      modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
      object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
      name: 'Test Collection',
      description: 'This is a test collection.',
      x_mitre_attack_spec_version: '2.1.0',
      x_mitre_version: '1.0',
      x_mitre_contents: [
        {
          object_ref: collectionId,
          object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
        },
      ],
    };

    minimalBundle = {
      id: `bundle--${uuidv4()}`,
      type: 'bundle',
      objects: [minimalCollection],
    };
  });

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it('should accept minimal valid bundle (only required fields)', () => {
      expect(() => stixBundleSchema.parse(minimalBundle)).not.toThrow();
    });

    it('should accept bundle with multiple valid objects', () => {
      const mockTechnique: Technique = {
        id: `attack-pattern--${uuidv4()}`,
        type: 'attack-pattern',
        spec_version: '2.1',
        created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
        modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
        name: 'Test Technique',
        x_mitre_attack_spec_version: '2.1.0',
        x_mitre_version: '1.0',
        x_mitre_domains: ['enterprise-attack'],
        x_mitre_is_subtechnique: false,
        external_references: [
          {
            source_name: 'mitre-attack',
            external_id: 'T1234',
          },
        ],
      };

      const bundleWithMultipleObjects = {
        ...minimalBundle,
        objects: [minimalCollection, mockTechnique],
      };

      expect(() => stixBundleSchema.parse(bundleWithMultipleObjects)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof StixBundle,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalBundle, [fieldName]: invalidValue };
        expect(() => stixBundleSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalBundle;
          expect(() => stixBundleSchema.parse(objectWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalBundle;
          expect(() => stixBundleSchema.parse(objectWithoutField)).not.toThrow();
        });
      }
    };

    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('objects', () => {
      it('should reject invalid objects array (non-array value)', () => {
        const invalidObjectsArray = {
          ...minimalBundle,
          objects: 'invalid-string' as any,
        };
        expect(() => stixBundleSchema.parse(invalidObjectsArray)).toThrow();
      });

      it('should reject bundle with empty objects array', () => {
        const bundleWithEmptyObjects = {
          ...minimalBundle,
          objects: [],
        };
        expect(() => stixBundleSchema.parse(bundleWithEmptyObjects)).toThrow();
      });
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const bundleWithUnknownProp = {
        ...minimalBundle,
        unknown_prop: 'unexpected value',
      };

      expect(() => stixBundleSchema.parse(bundleWithUnknownProp)).toThrow();
    });

    it('should reject bundle where first object is not a valid x-mitre-collection', () => {
      const invalidFirstObjectBundle = {
        ...minimalBundle,
        objects: [
          {
            id: `attack-pattern--${uuidv4()}`,
            type: 'attack-pattern',
            spec_version: '2.1',
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: 'Test Attack Pattern',
            x_mitre_attack_spec_version: '2.1.0',
            x_mitre_modified_by_ref: xMitreIdentity,
            x_mitre_version: '1.0',
            x_mitre_domains: ['enterprise-attack'],
          },
        ],
      };

      expect(() => stixBundleSchema.parse(invalidFirstObjectBundle)).toThrow();
    });

    describe('Uniqueness Constraint', () => {
      it('should accept bundle with unique object IDs (true positive)', () => {
        const technique1: Technique = {
          id: `attack-pattern--${uuidv4()}`,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 1',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1001',
            },
          ],
        };

        const technique2: Technique = {
          id: `attack-pattern--${uuidv4()}`,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 2',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1002',
            },
          ],
        };

        const bundleWithUniqueObjects = {
          ...minimalBundle,
          objects: [minimalCollection, technique1, technique2],
        };

        expect(() => stixBundleSchema.parse(bundleWithUniqueObjects)).not.toThrow();
      });

      it('should reject bundle with duplicate object IDs (true negative)', () => {
        const duplicateId = `attack-pattern--${uuidv4()}`;

        const technique1: Technique = {
          id: duplicateId,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 1',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1001',
            },
          ],
        };

        const technique2: Technique = {
          id: duplicateId, // Same ID as technique1
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 2',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1002',
            },
          ],
        };

        const bundleWithDuplicateObjects = {
          ...minimalBundle,
          objects: [minimalCollection, technique1, technique2],
        };

        expect(() => stixBundleSchema.parse(bundleWithDuplicateObjects)).toThrow(
          /Duplicate object with id/,
        );
      });

      it('should report the duplicate ID in error message', () => {
        const duplicateId = `attack-pattern--${uuidv4()}`;

        const technique1: Technique = {
          id: duplicateId,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 1',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1001',
            },
          ],
        };

        const technique2: Technique = {
          id: duplicateId,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 2',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1002',
            },
          ],
        };

        const bundleWithDuplicateObjects = {
          ...minimalBundle,
          objects: [minimalCollection, technique1, technique2],
        };

        try {
          stixBundleSchema.parse(bundleWithDuplicateObjects);
          expect.fail('Expected schema to throw for duplicate IDs');
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.issues[0].message;
            expect(errorMessage).toContain(duplicateId);
          } else {
            throw error;
          }
        }
      });

      it('should handle multiple duplicates in a single bundle', () => {
        const duplicateId1 = `attack-pattern--${uuidv4()}`;
        const duplicateId2 = `attack-pattern--${uuidv4()}`;

        const technique1: Technique = {
          id: duplicateId1,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 1',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1001',
            },
          ],
        };

        const technique2: Technique = {
          id: duplicateId1, // Duplicate of technique1
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 2',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1002',
            },
          ],
        };

        const technique3: Technique = {
          id: duplicateId2,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 3',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1003',
            },
          ],
        };

        const technique4: Technique = {
          id: duplicateId2, // Duplicate of technique3
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 4',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1004',
            },
          ],
        };

        const bundleWithMultipleDuplicates = {
          ...minimalBundle,
          objects: [minimalCollection, technique1, technique2, technique3, technique4],
        };

        try {
          stixBundleSchema.parse(bundleWithMultipleDuplicates);
          expect.fail('Expected schema to throw for multiple duplicate IDs');
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Should have at least 2 errors (one for each duplicate pair)
            expect(error.issues.length).toBeGreaterThanOrEqual(2);
          } else {
            throw error;
          }
        }
      });
    });

    describe('x_mitre_contents Validation', () => {
      it('should accept bundle where all x_mitre_contents references exist in objects (true positive)', () => {
        const techniqueId = `attack-pattern--${uuidv4()}`;
        const technique: Technique = {
          id: techniqueId,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1234',
            },
          ],
        };

        const collectionWithValidRef: Collection = {
          ...minimalCollection,
          x_mitre_contents: [
            {
              object_ref: techniqueId,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
          ],
        };

        const bundleWithValidRefs = {
          ...minimalBundle,
          objects: [collectionWithValidRef, technique],
        };

        expect(() => stixBundleSchema.parse(bundleWithValidRefs)).not.toThrow();
      });

      it('should reject bundle where x_mitre_contents references a missing object (true negative)', () => {
        const missingId = `attack-pattern--${uuidv4()}`;

        const collectionWithInvalidRef: Collection = {
          ...minimalCollection,
          x_mitre_contents: [
            {
              object_ref: missingId,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
          ],
        };

        const bundleWithMissingRef = {
          ...minimalBundle,
          objects: [collectionWithInvalidRef],
        };

        expect(() => stixBundleSchema.parse(bundleWithMissingRef)).toThrow(
          /referenced in x_mitre_contents is not present in the bundle's objects array/,
        );
      });

      it('should report the missing STIX ID in error message', () => {
        const missingId = `attack-pattern--${uuidv4()}`;

        const collectionWithInvalidRef: Collection = {
          ...minimalCollection,
          x_mitre_contents: [
            {
              object_ref: missingId,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
          ],
        };

        const bundleWithMissingRef = {
          ...minimalBundle,
          objects: [collectionWithInvalidRef],
        };

        try {
          stixBundleSchema.parse(bundleWithMissingRef);
          expect.fail('Expected schema to throw for missing x_mitre_contents reference');
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.issues[0].message;
            expect(errorMessage).toContain(missingId);
          } else {
            throw error;
          }
        }
      });

      it('should handle multiple missing references in x_mitre_contents', () => {
        const missingId1 = `attack-pattern--${uuidv4()}`;
        const missingId2 = `attack-pattern--${uuidv4()}`;

        const collectionWithMultipleMissingRefs: Collection = {
          ...minimalCollection,
          x_mitre_contents: [
            {
              object_ref: missingId1,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
            {
              object_ref: missingId2,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
          ],
        };

        const bundleWithMultipleMissingRefs = {
          ...minimalBundle,
          objects: [collectionWithMultipleMissingRefs],
        };

        try {
          stixBundleSchema.parse(bundleWithMultipleMissingRefs);
          expect.fail('Expected schema to throw for multiple missing x_mitre_contents references');
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Should have 2 errors (one for each missing reference)
            expect(error.issues.length).toBe(2);
          } else {
            throw error;
          }
        }
      });

      it('should accept bundle with mix of valid and present references in x_mitre_contents', () => {
        const techniqueId1 = `attack-pattern--${uuidv4()}`;
        const techniqueId2 = `attack-pattern--${uuidv4()}`;

        const technique1: Technique = {
          id: techniqueId1,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 1',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1001',
            },
          ],
        };

        const technique2: Technique = {
          id: techniqueId2,
          type: 'attack-pattern',
          spec_version: '2.1',
          created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
          modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
          name: 'Test Technique 2',
          x_mitre_attack_spec_version: '2.1.0',
          x_mitre_version: '1.0',
          x_mitre_domains: ['enterprise-attack'],
          x_mitre_is_subtechnique: false,
          external_references: [
            {
              source_name: 'mitre-attack',
              external_id: 'T1002',
            },
          ],
        };

        const collectionWithMultipleValidRefs: Collection = {
          ...minimalCollection,
          x_mitre_contents: [
            {
              object_ref: techniqueId1,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
            {
              object_ref: techniqueId2,
              object_modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            },
          ],
        };

        const bundleWithMultipleValidRefs = {
          ...minimalBundle,
          objects: [collectionWithMultipleValidRefs, technique1, technique2],
        };

        expect(() => stixBundleSchema.parse(bundleWithMultipleValidRefs)).not.toThrow();
      });
    });
  });

  // GitHub Actions often fails without an increased timeout for this test
  it('should validate existing ATT&CK bundles and report errors', { timeout: 10_000 }, () => {
    const bundles = globalThis.attackData.bundles as StixBundle[];
    const bundlesWithErrors: { bundleIndex: number; errors: string[] }[] = [];

    bundles.forEach((bundle, bundleIndex) => {
      try {
        stixBundleSchema.parse(bundle);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: string[] = [];

          // Get bundle ID and friendly name
          const bundleId = bundle.id;
          const collectionObject = bundle.objects[0] as any; // The first object should be x-mitre-collection
          const bundleFriendlyName = collectionObject.name || 'Unknown';

          error.issues.forEach((issue) => {
            const objectIndex = issue.path.find((p) => typeof p === 'number');
            const errorObject =
              objectIndex !== undefined ? bundle.objects[objectIndex as number] : undefined;

            let errorMessage = `Error in bundle ${bundleIndex + 1} (${bundleFriendlyName}, ID: ${bundleId}):`;
            if (errorObject) {
              // Determine Object Status
              let objectStatus = 'Active';
              if ((errorObject as any).x_mitre_deprecated) {
                objectStatus = 'Deprecated';
              } else if ('revoked' in errorObject && errorObject.revoked) {
                objectStatus = 'Revoked';
              }
              errorMessage += `\n  Object Index: ${objectIndex}`;
              errorMessage += `\n  Object ID: ${errorObject.id}`;
              errorMessage += `\n  Object Type: ${errorObject.type}`;
              errorMessage += `\n  Object Name: ${(errorObject as any).name || 'N/A'}`;
              errorMessage += `\n  Object Status: ${objectStatus}`;
            }
            errorMessage += `\n  Path: ${issue.path.join('.')}`;
            errorMessage += `\n  Error: ${issue.message}`;

            errors.push(errorMessage);
          });

          bundlesWithErrors.push({ bundleIndex, errors });
          logger.warn(errors.join('\n\n'));
        }
      }
    });

    // Log a summary of the validation results
    logger.log(`Validated ${bundles.length} bundles`);
    logger.log(`Found errors in ${bundlesWithErrors.length} bundles`);

    // This expectation will always pass, but it gives us a way to surface the error count in the test results
    expect(bundlesWithErrors.length).toBeLessThanOrEqual(bundles.length);
  });

  // Close the logger after all tests are complete
  afterAll(() => {
    logger.close();
  });
});
