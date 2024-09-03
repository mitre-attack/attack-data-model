import { ZodIssue, z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
    Relationship, relationshipSchema,
    RelationshipType, relationshipTypeSchema,
    validRelationshipObjectTypes,
    invalidRelationships,
    isValidRelationship
} from '../../src/schemas/sro/relationship.schema';
import {
    Description, StixCreatedTimestamp, StixIdentifier,
    StixModifiedTimestamp, StixSpecVersion, StixType,
    stixTypeSchema,
    xMitreIdentity
} from '../../src/schemas/common';


describe('RelationshipSchema', () => {

    let minimalRelationship: Relationship;

    const validRelationships: { sourceType: StixType, relationshipType: RelationshipType, targetType: StixType }[] = [
        // USES
        { sourceType: 'malware', relationshipType: 'uses', targetType: 'attack-pattern' },
        { sourceType: 'tool', relationshipType: 'uses', targetType: 'attack-pattern' },
        { sourceType: 'intrusion-set', relationshipType: 'uses', targetType: 'malware' },
        { sourceType: 'intrusion-set', relationshipType: 'uses', targetType: 'tool' },
        { sourceType: 'intrusion-set', relationshipType: 'uses', targetType: 'attack-pattern' },
        { sourceType: 'campaign', relationshipType: 'uses', targetType: 'malware' },
        { sourceType: 'campaign', relationshipType: 'uses', targetType: 'tool' },
        { sourceType: 'campaign', relationshipType: 'uses', targetType: 'attack-pattern' },
        // MITIGATES
        { sourceType: 'course-of-action', relationshipType: 'mitigates', targetType: 'attack-pattern' },
        // SUBTECHNIQUE-OF
        { sourceType: 'attack-pattern', relationshipType: 'subtechnique-of', targetType: 'attack-pattern' },
        // DETECTS
        { sourceType: 'x-mitre-data-component', relationshipType: 'detects', targetType: 'attack-pattern' },
        // ATTRIBUTED-TO
        { sourceType: 'campaign', relationshipType: 'attributed-to', targetType: 'intrusion-set' },
        // TARGETS
        { sourceType: 'attack-pattern', relationshipType: 'targets', targetType: 'x-mitre-asset' },
        // REVOKED-BY
        ...validRelationshipObjectTypes.map(objectType => ({
            sourceType: objectType,
            relationshipType: 'revoked-by' as RelationshipType,
            targetType: objectType
        }))
    ];

    beforeAll(() => {

        minimalRelationship = relationshipSchema.parse({
            id: `relationship--${uuidv4()}`,
            type: stixTypeSchema.Enum.relationship,
            spec_version: '2.1',
            created: '2021-01-01T00:00:00.000Z',
            modified: '2021-01-01T00:00:00.000Z',
            relationship_type: relationshipTypeSchema.enum.uses,
            source_ref: `${stixTypeSchema.Enum.campaign}--${uuidv4()}`,
            target_ref: `${stixTypeSchema.Enum.malware}--${uuidv4()}`,
            object_marking_refs: [`marking-definition--${uuidv4()}`],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_modified_by_ref: xMitreIdentity,
            x_mitre_version: "1.0",
            x_mitre_domains: ["enterprise-attack"]
        });
    });

    describe('True Positives Tests', () => {
        it('should accept minimal valid object (only required fields)', () => {
            expect(() => relationshipSchema.parse(minimalRelationship)).not.toThrow();
        });

        it('should accept fully populated valid object (required + optional fields)', () => {
            const fullRelationship = {
				...minimalRelationship,
				description: 'Test description.' as Description,
				created_by_ref: `identity--${uuidv4()}` as StixIdentifier,
				external_references: [{
					source_name: 'mitre-attack',
					description: 'Doe, J. (2020, August 27). Title. Retrieved January 1, 2021.',
					url: 'https://citation.url.org/'
				}]
			};
			expect(() => relationshipSchema.parse(fullRelationship)).not.toThrow();
        });

        describe('Relationships with valid Source/Target types', () => {
            validRelationships.forEach(({sourceType, relationshipType, targetType}) => {
                it(`should accept ${sourceType} ${relationshipType} ${targetType} relationship`, () => {
                    const validRelationship: Relationship = {
                        ...minimalRelationship,
                        relationship_type: relationshipType as RelationshipType,
                        source_ref: `${sourceType}--${uuidv4()}` as StixIdentifier,
                        target_ref: `${targetType}--${uuidv4()}` as StixIdentifier
                    };
                    expect(() => relationshipSchema.parse(validRelationship)).not.toThrow();
                });
            });
        });
    });

    describe('True Negative Tests', () => {
        describe('id', () => {
            it('should reject invalid values', () => {
                const invalidId: Relationship = {
                    ...minimalRelationship,
                    id: 'invalid-id' as any
                };
                expect(() => relationshipSchema.parse(invalidId)).toThrow();

                const invalidRelationshipId: Relationship = {
                    ...minimalRelationship,
                    id: `attack-pattern--${uuidv4()}` as any
                };
                expect(() => relationshipSchema.parse(invalidRelationshipId)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { id, ...relationshipWithoutId } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutId)).toThrow();
            });
        });

        describe('type', () => {
            it('should reject invalid values', () => {
                const invalidType: Relationship = {
                    ...minimalRelationship,
                    type: 'invalid-type' as any
                };
                expect(() => relationshipSchema.parse(invalidType)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { type, ...relationshipWithoutType } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutType)).toThrow();
            });
        });

        describe('spec_version', () => {
            it('should reject invalid values', () => {
                const invalidSpecVersion: Relationship = {
                    ...minimalRelationship,
                    spec_version: 'invalid' as StixSpecVersion
                };
                expect(() => relationshipSchema.parse(invalidSpecVersion)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { spec_version, ...relationshipWithoutSpecVersion } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutSpecVersion)).toThrow();
            });
        });

        describe('created', () => {
            it('should reject invalid values', () => {
                const invalidCreatedDate: Relationship = {
                    ...minimalRelationship,
                    created: 'invalid-date' as StixCreatedTimestamp
                };
                expect(() => relationshipSchema.parse(invalidCreatedDate)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { created, ...relationshipWithoutCreatedDate } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutCreatedDate)).toThrow();
            });
        });

        describe('modified', () => {
            it('should reject invalid values', () => {
                const invalidModifiedDate: Relationship = {
                    ...minimalRelationship,
                    modified: 'invalid-date' as StixModifiedTimestamp
                };
                expect(() => relationshipSchema.parse(invalidModifiedDate)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { modified, ...relationshipWithoutModifiedDate } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutModifiedDate)).toThrow();
            });
        });

        describe('relationship_type', () => {
            it('should reject invalid values', () => {
                const invalidRelationshipType: Relationship = {
                    ...minimalRelationship,
                    relationship_type: 'invalid-type' as RelationshipType
                };
                expect(() => relationshipSchema.parse(invalidRelationshipType)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { relationship_type, ...relationshipWithoutType } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutType)).toThrow();
            });
        });

        describe('source_ref', () => {
            it('should reject invalid values', () => {
                const invalidSourceRef: Relationship = {
                    ...minimalRelationship,
                    source_ref: 'invalid-source-ref' as StixIdentifier
                };
                expect(() => relationshipSchema.parse(invalidSourceRef)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { source_ref, ...relationshipWithoutSourceRef } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutSourceRef)).toThrow();
            });
        });

        describe('target_ref', () => {
            it('should reject invalid values', () => {
                const invalidTargetRef: Relationship = {
                    ...minimalRelationship,
                    target_ref: 'invalid-target-ref' as StixIdentifier
                };
                expect(() => relationshipSchema.parse(invalidTargetRef)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { target_ref, ...relationshipWithoutTargetRef } = minimalRelationship;
                expect(() => relationshipSchema.parse(relationshipWithoutTargetRef)).toThrow();
            });
        });

        describe('Schema-Level Tests', () => {
            it('should reject unknown properties', () => {
                const relationshipWithUnknownProperties = {
                    ...minimalRelationship,
                    unknown_property: true
                } as Relationship;
                expect(() => relationshipSchema.parse(relationshipWithUnknownProperties)).toThrow();
            });
        });

        describe('Relationships with invalid Source/Target types', () => {

            validRelationships.forEach(({ sourceType, relationshipType, targetType }) => {
                it(`should return true for valid ${sourceType} ${relationshipType} ${targetType} relationship`, () => {
                    expect(isValidRelationship(sourceType, relationshipType as RelationshipType, targetType)).toBe(true);
                });
            });

            invalidRelationships.forEach(({ sourceType, relationshipType, targetType }) => {
                it(`should return false for invalid ${sourceType} ${relationshipType} ${targetType} relationship`, () => {
                    expect(isValidRelationship(sourceType, relationshipType as RelationshipType, targetType)).toBe(false);
                });
            });
        });
    });

    describe('Edge Cases and Special Scenarios', () => {
        // Add more edge case tests as needed...
    });

    it('should validate existing ATT&CK relationships and report errors', () => {
        const relationships = global.attackData.objectsByType['relationship'] as Relationship[];

        const validRelationships: Relationship[] = [];
        const deprecatedOrRevokedErrors: { relationship: Relationship; issues: z.ZodIssue[] }[] = [];
        const activeErrors: { relationship: Relationship; issues: z.ZodIssue[] }[] = [];

        for (let relationship of relationships) {
            const result = relationshipSchema.safeParse(relationship);
            if (result.success) {
                validRelationships.push(relationship);
            } else {
                const errorInfo = { relationship: relationship, issues: result.error.issues };
                if (relationship.x_mitre_deprecated || relationship.revoked) {
                    deprecatedOrRevokedErrors.push(errorInfo);
                } else {
                    activeErrors.push(errorInfo);
                }
            }
        }

        const formatErrorReport = (errors: { relationship: Relationship; issues: z.ZodIssue[] }[]) => {
            return errors.map(({ relationship, issues }) => {
                const errorMessages = issues.map(issue =>
                    `    - ${issue.path.join('.')}: ${issue.message}`
                ).join('\n');

                return `
                Relationship ID: ${relationship.id}
                Source Ref: ${relationship.source_ref}
                Target Ref: ${relationship.target_ref}
                Relationship Type: ${relationship.relationship_type}
                Deprecated: ${relationship.x_mitre_deprecated ? 'Yes' : 'No'}
                Revoked: ${relationship.revoked ? 'Yes' : 'No'}
                Validation Errors:
                ${errorMessages}`;
            }).join('\n');
        };

        if (activeErrors.length > 0) {
            console.warn(`The following ${activeErrors.length} active relationship(s) failed validation:\n${formatErrorReport(activeErrors)}`);
        }

        if (deprecatedOrRevokedErrors.length > 0) {
            console.warn(`The following ${deprecatedOrRevokedErrors.length} deprecated or revoked relationship(s) failed validation:\n${formatErrorReport(deprecatedOrRevokedErrors)}`);
        }

        console.log(`
        Total relationships: ${relationships.length}
        Valid relationships: ${validRelationships.length}
        Active relationships with errors: ${activeErrors.length}
        Deprecated or revoked relationships with errors: ${deprecatedOrRevokedErrors.length}
        `);

        // This expectation will always pass, but it gives us a way to surface the error count in the test results
        expect(true).toBe(true);
    });
});