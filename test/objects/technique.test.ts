import { v4 as uuidv4 } from 'uuid';
import { ZodError } from "zod";
import { Technique, techniqueSchema } from '../../src/schemas/sdo/technique.schema';
import { StixCreatedTimestamp, StixModifiedTimestamp, xMitreIdentity } from '../../src/schemas/common';

/**
 * Test suite for validating the Technique schema.
 */

describe('TechniqueSchema', () => {

    let minimalTechnique: Technique;

    beforeEach(() => {
        minimalTechnique = {
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
    });

    /**
     * Section for valid input tests
     */
    describe('Valid Inputs', () => {
        it('should accept minimal valid object (only required fields)', () => {
            expect(() => techniqueSchema.parse(minimalTechnique)).not.toThrow();
        });

        it('should accept fully populated valid object (required + optional fields)', () => {
            const objectWithOptionalFields = {
                ...minimalTechnique,
                description: 'Test description',
                x_mitre_detection: 'Test detection',
                x_mitre_platforms: ['Windows', 'macOS'],
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'],
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'],
                x_mitre_network_requirements: true,
                x_mitre_modified_by_ref: xMitreIdentity
            };
            expect(() => techniqueSchema.parse(objectWithOptionalFields)).not.toThrow();
        });
    });

    /**
     * Section for field-specific tests
     */
    describe('Field-Specific Tests', () => {
        const testField = (
            fieldName: string,
            invalidValue: any,
            isRequired = true // Flag indicating whether the field is required
        ) => {
            it(`should reject invalid values for ${fieldName}`, () => {
                const invalidObject = { ...minimalTechnique, [fieldName]: invalidValue };
                expect(() => techniqueSchema.parse(invalidObject)).toThrow();
            });

            if (isRequired) {
                it(`should reject omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalTechnique;
                    expect(() => techniqueSchema.parse(objectWithoutField)).toThrow();
                });
            } else {
                it(`should accept omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalTechnique;
                    expect(() => techniqueSchema.parse(objectWithoutField)).not.toThrow();
                });
            }
        };

        describe('id', () => {
            testField('id', 'invalid-id');
        });

        describe('type', () => {
            testField('type', 'invalid-type');
        });

        describe('x_mitre_is_subtechnique', () => {
            testField('x_mitre_is_subtechnique', 123);
        });

        describe('description', () => {
            testField('description', 123, false);
        });

        describe('external_references', () => {
            testField('external_references', 'not-an-array');
        });

        describe('x_mitre_detection', () => {
            testField('x_mitre_detection', 123, false);
        });

        describe('x_mitre_platforms', () => {
            testField('x_mitre_platforms', 123, false);
        });
    });

    /**
     * Section for schema-level tests
     */
    describe('Schema-Level Tests', () => {
        it('should reject unknown properties', () => {
            const objectWithUnknownProp = {
                ...minimalTechnique,
                unknownProp: 'unexpected value'
            };
            expect(() => techniqueSchema.parse(objectWithUnknownProp)).toThrow();
        });
    });

    /**
     * Section for schema refinements
     */
    describe('Schema Refinements', () => {
        let enterpriseTechnique: Technique;

        beforeEach(() => {
            enterpriseTechnique = {
                ...minimalTechnique,
                x_mitre_domains: ['enterprise-attack'],
                external_references: [
                    {
                        source_name: 'mitre-attack',
                        external_id: 'T1234'
                    }
                ],
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'execution' }
                ]
            };
        });

        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format for non-subtechnique', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'T123' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/must match the ATT&CK ID format T####/);
            });

            it('should reject invalid ATT&CK ID format for subtechnique', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    x_mitre_is_subtechnique: true,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/must match the ATT&CK ID format T####.###/);
            });
        });
    });
});
