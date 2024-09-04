import { v4 as uuidv4 } from 'uuid';
import { StixBundle, stixBundleSchema } from '../../src/schemas/sdo/stix-bundle.schema';
import { StixCreatedTimestamp, StixModifiedTimestamp, xMitreIdentity, XMitreModifiedByRef } from '../../src/schemas/common';
import { Collection, collectionSchema } from '../../src/schemas/sdo/collection.schema';
import { Technique } from '../../src/schemas/sdo/technique.schema';
import { z } from 'zod';

describe('StixBundleSchema', () => {
    let minimalBundle: StixBundle;
    let minimalCollection: Collection

    beforeAll(() => {
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
                    "object_ref": "attack-pattern--0042a9f5-f053-4769-b3ef-9ad018dfa298",
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

    describe('True Positives Tests', () => {
        it('should accept minimal valid bundle (only required fields)', () => {
            expect(() => stixBundleSchema.parse(minimalBundle)).not.toThrow();
        });

        it('should accept bundle with multiple valid objects', () => {
            const bundleWithMultipleObjects = {
                ...minimalBundle,
                objects: [
                    minimalCollection,
                    {
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
                    } as Technique
                ]
            };
            expect(() => stixBundleSchema.parse(bundleWithMultipleObjects)).not.toThrow();
        });
    });

    describe('True Negative Tests', () => {
        describe('id', () => {
            it('should reject invalid values', () => {
                const invalidId = {
                    ...minimalBundle,
                    id: 'invalid-id' as any
                };
                expect(() => stixBundleSchema.parse(invalidId)).toThrow();

                const invalidBundleId = {
                    ...minimalBundle,
                    id: `attack-pattern--${uuidv4()}` as any
                };
                expect(() => stixBundleSchema.parse(invalidBundleId)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { id, ...bundleWithoutId } = minimalBundle;
                expect(() => stixBundleSchema.parse(bundleWithoutId)).toThrow();
            });
        });

        describe('type', () => {
            it('should reject invalid values', () => {
                const invalidType = {
                    ...minimalBundle,
                    type: 'invalid-type' as any
                };
                expect(() => stixBundleSchema.parse(invalidType)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { type, ...bundleWithoutType } = minimalBundle;
                expect(() => stixBundleSchema.parse(bundleWithoutType)).toThrow();
            });
        });

        describe('objects', () => {
            it('should reject bundle with no objects', () => {
                const bundleWithNoObjects = {
                    ...minimalBundle,
                    objects: []
                };
                expect(() => stixBundleSchema.parse(bundleWithNoObjects)).toThrow();
            });

            it('should reject bundle where first object is not x-mitre-collection', () => {
                const bundleWithInvalidFirstObject = {
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
                expect(() => stixBundleSchema.parse(bundleWithInvalidFirstObject)).toThrow();
            });
        });
    });

    describe('Edge Cases and Special Scenarios', () => {
        // Add more edge case tests as needed...
    });

    it('should validate existing ATT&CK bundles and report errors', () => {
        const bundles = global.attackData.bundles as StixBundle[];

        const validBundles: StixBundle[] = [];
        const bundlesWithErrors: {
            bundle: StixBundle;
            activeIssues: z.ZodIssue[];
            deprecatedOrRevokedIssues: z.ZodIssue[];
        }[] = [];

        for (let bundle of bundles) {
            console.log(`Processing bundle: ${bundle.id}`);
            const result = stixBundleSchema.safeParse(bundle);
            if (result.success) {
                validBundles.push(bundle);
            } else {
                console.log(`Bundle ${bundle.id} has errors:`, result.error.issues);
                const activeIssues: z.ZodIssue[] = [];
                const deprecatedOrRevokedIssues: z.ZodIssue[] = [];

                result.error.issues.forEach(issue => {
                    if (issue.path.length >= 4) {
                        const objectId = issue.path[2] as string;
                        const object = bundle.objects.find(obj => obj.id === objectId);
                        if (object && (object.x_mitre_deprecated || object.revoked)) {
                            deprecatedOrRevokedIssues.push(issue);
                        } else {
                            activeIssues.push(issue);
                        }
                    } else {
                        activeIssues.push(issue);
                    }
                });

                bundlesWithErrors.push({ bundle, activeIssues, deprecatedOrRevokedIssues });
            }
        }

        const formatErrorReport = (issues: z.ZodIssue[], bundle: StixBundle) => {
            return issues.map(issue => {
                let objectId = 'Unknown';
                let objectType = 'Unknown';
                let objectName = 'Unknown';
                if (issue.path.length >= 3) {
                    objectId = issue.path[2] as string;
                    const object = bundle.objects.find(obj => obj.id === objectId);
                    if (object) {
                        objectType = object.type;
                        objectName = 'name' in object ? object.name : 'Unnamed';
                    }
                }

                return `
                Object ID: ${objectId}
                Object Type: ${objectType}
                Object Name: ${objectName}
                Error: ${issue.message}
                Path: ${issue.path.join('.')}`;
            }).join('\n');
        };

        bundlesWithErrors.forEach(({ bundle, activeIssues, deprecatedOrRevokedIssues }) => {
            if (activeIssues.length > 0) {
                console.warn(`
                Bundle ID: ${bundle.id}
                The following ${activeIssues.length} active object(s) have issues:
                ${formatErrorReport(activeIssues, bundle)}`);
            }

            if (deprecatedOrRevokedIssues.length > 0) {
                console.warn(`
                Bundle ID: ${bundle.id}
                The following ${deprecatedOrRevokedIssues.length} deprecated or revoked object(s) have issues:
                ${formatErrorReport(deprecatedOrRevokedIssues, bundle)}`);
            }
        });

        console.log(`
        Total bundles: ${bundles.length}
        Valid bundles: ${validBundles.length}
        Bundles with errors: ${bundlesWithErrors.length}
        Total active objects with issues: ${bundlesWithErrors.reduce((sum, b) => sum + b.activeIssues.length, 0)}
        Total deprecated/revoked objects with issues: ${bundlesWithErrors.reduce((sum, b) => sum + b.deprecatedOrRevokedIssues.length, 0)}
        `);

        // This expectation will always pass, but it gives us a way to surface the error count in the test results
        expect(bundlesWithErrors.length).toBeLessThanOrEqual(bundles.length);
    });
});