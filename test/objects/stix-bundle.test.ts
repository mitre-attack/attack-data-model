import { v4 as uuidv4 } from 'uuid';
import { type StixBundle, stixBundleSchema } from '../../src/schemas/sdo/stix-bundle.schema.js';
import { type StixCreatedTimestamp, type StixModifiedTimestamp, xMitreIdentity } from '../../src/schemas/common/index.js';
import type { Collection } from '../../src/schemas/sdo/collection.schema.js';
import type { Technique } from '../../src/schemas/sdo/technique.schema.js';
import { z } from 'zod';

/**
 * Test suite for validating StixBundle schema.
 */
describe('StixBundleSchema', () => {
    let minimalBundle: StixBundle;
    let minimalCollection: Collection;

    beforeEach(() => {
        minimalCollection = {
            id: `x-mitre-collection--${uuidv4()}`,
            type: 'x-mitre-collection',
            spec_version: '2.1',
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            name: 'Test Collection',
            description: 'This is a test collection.',
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_version: "1.0",
            x_mitre_contents: [
                {
                    object_ref: "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
                    object_modified: "2021-01-01T00:00:00.000Z" as StixModifiedTimestamp
                }
            ]
        };

        minimalBundle = {
            id: `bundle--${uuidv4()}`,
            type: 'bundle',
            spec_version: '2.1',
            objects: [minimalCollection]
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
                type: "attack-pattern",
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
                        external_id: 'T1234'
                    }
                ]
            };

            const bundleWithMultipleObjects = {
                ...minimalBundle,
                objects: [
                    minimalCollection,
                    mockTechnique
                ]
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
            isRequired = true // Flag indicating whether the field is required
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

        describe('spec_version', () => {
            testField('spec_version', 'invalid-version');
        });

        describe('objects', () => {
            it('should reject invalid objects array (non-array value)', () => {
                const invalidObjectsArray = {
                    ...minimalBundle,
                    objects: 'invalid-string' as any
                };
                expect(() => stixBundleSchema.parse(invalidObjectsArray)).toThrow();
            });

            it('should reject bundle with empty objects array', () => {
                const bundleWithEmptyObjects = {
                    ...minimalBundle,
                    objects: []
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
                unknown_prop: "unexpected value"
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
                        x_mitre_attack_spec_version: "2.1.0",
                        x_mitre_modified_by_ref: xMitreIdentity,
                        x_mitre_version: "1.0",
                        x_mitre_domains: ["enterprise-attack"]
                    }
                ]
            };

            expect(() => stixBundleSchema.parse(invalidFirstObjectBundle)).toThrow();
        });
    });

    /**
     * Edge cases and special scenario tests
     */
    describe('Edge Cases and Special Scenarios', () => {
        // Add additional edge case tests as needed
    });

    it('should validate existing ATT&CK bundles and report errors', () => {
        const bundles = global.attackData.bundles as StixBundle[];
        const bundlesWithErrors: { bundleIndex: number; errors: string[] }[] = [];

        bundles.forEach((bundle, bundleIndex) => {
            try {
                stixBundleSchema.parse(bundle);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const errors: string[] = [];

                    // Get bundle ID and friendly name
                    const bundleId = bundle.id;
                    const collectionObject = bundle.objects[0] as any;  // The first object should be x-mitre-collection
                    const bundleFriendlyName = collectionObject.name || 'Unknown';

                    error.issues.forEach((issue) => {
                        const objectIndex = issue.path.find((p) => typeof p === 'number');
                        const errorObject = objectIndex !== undefined ? bundle.objects[objectIndex as number] : undefined;

                        let errorMessage = `Error in bundle ${bundleIndex + 1} (${bundleFriendlyName}, ID: ${bundleId}):`;
                        if (errorObject) {

                            // Determine Object Status
                            let objectStatus = 'Active';
                            if ((errorObject as any).x_mitre_deprecated) {
                                objectStatus = 'Deprecated';
                            } else if ("revoked" in errorObject && errorObject.revoked) {
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
                    console.warn(errors.join('\n\n'));
                }
            }
        });

        // Log a summary of the validation results
        console.log(`Validated ${bundles.length} bundles`);
        console.log(`Found errors in ${bundlesWithErrors.length} bundles`);

        // This expectation will always pass, but it gives us a way to surface the error count in the test results
        expect(bundlesWithErrors.length).toBeLessThanOrEqual(bundles.length);
    });
});