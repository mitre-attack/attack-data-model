import { Description, StixCreatedTimestamp, StixIdentifier, StixModifiedTimestamp, StixSpecVersion, StixType, stixTypeSchema } from '../../src/schemas/common';
import { relationshipMap, RelationshipType, relationshipTypeSchema, validRelationshipObjectTypes } from '../../src/schemas/common/relationship-type';
import { Relationship, relationshipSchema } from '../../src/schemas/sro/relationship.schema';
import { v4 as uuidv4 } from 'uuid';

describe('RelationshipSchema', () => {

    let objects: any[];
    let minimalRelationship: Relationship;

    const validRelationships = [
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
        ...validRelationshipObjectTypes.map((objectType) => {
            return { sourceType: objectType, relationshipType: 'revoked-by', targetType: objectType }
        })
    ];

    beforeAll(() => {
        objects = global.attackData.objectsByType['attack-pattern'];

        minimalRelationship = relationshipSchema.parse({
			id: `relationship--${uuidv4()}` as StixIdentifier,
			type: stixTypeSchema.enum.relationship as StixType,
			spec_version: '2.1' as StixSpecVersion,
			created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
			relationship_type: relationshipTypeSchema.enum.uses as RelationshipType,
			source_ref: `campaign--${uuidv4()}` as StixIdentifier,
			target_ref: `malware--${uuidv4()}` as StixIdentifier
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
                        relationship_type: relationshipTypeSchema.enum[relationshipType],
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
            const invalidRelationships: any[] = [];

            // generate all possible source/target pairs
            const sourceTargetPairs = stixTypeSchema.options.flatMap(source => 
                stixTypeSchema.options.map(target => [source, target])
            );
            
            // create all relationship candidates from source/target pairs
            relationshipTypeSchema.options.forEach(relType => {
                for (let [src, tgt] of sourceTargetPairs) {
                    let candidate = { sourceType: src, relationshipType: relType, targetType: tgt };
                    
                    // check against the list of valid relationships
                    const isValid = validRelationships.some(({sourceType, relationshipType, targetType}) => 
                        sourceType == src && relationshipType == relType && targetType == tgt
                    );
                    if (!isValid) {
                        // add invalid candidate
                        invalidRelationships.push(candidate);
                    }
                }
            });
    
            // test each invalid relationship
            invalidRelationships.forEach(({sourceType, relationshipType, targetType}) => {
                it(`should reject ${sourceType} ${relationshipType} ${targetType} relationship`, () => {
                    const invalidRelationship: Relationship = {
                        ...minimalRelationship,
                        relationship_type: relationshipTypeSchema.enum[relationshipType],
                        source_ref: `${sourceType}--${uuidv4()}` as StixIdentifier,
                        target_ref: `${targetType}--${uuidv4()}` as StixIdentifier
                    };
                    expect(() => relationshipSchema.parse(invalidRelationship)).toThrow();
                });
            });
        });
    });

    describe('Edge Cases and Special Scenarios', () => {
        // Add more edge case tests as needed...
    });

    describe('Validate All Objects', () => {
        // it('should validate all objects in the global.attackData', () => {
        //     objects.forEach((obj, index) => {
        //         expect(() => relationshipSchema.parse(obj)).not.toThrow();
        //     });
        // });
    });
});