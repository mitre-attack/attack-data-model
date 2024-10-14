import { v4 as uuidv4 } from 'uuid';
import { type Asset, assetSchema } from '../../src/schemas/sdo/asset.schema.js';
import { type StixCreatedTimestamp, type StixModifiedTimestamp, xMitreIdentity } from '../../src/schemas/common/index.js';

/**
 * Test suite for validating the Asset schema.
 */
describe('AssetSchema', () => {

    let minimalAsset: Asset;

    beforeEach(() => {
        minimalAsset = {
            id: `x-mitre-asset--${uuidv4()}`,
            type: "x-mitre-asset",
            spec_version: '2.1',
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: 'Test Asset',
            x_mitre_domains: ['ics-attack'],
            x_mitre_version: '1.0',
            created_by_ref: `identity--${uuidv4()}`,
            external_references: [
                {
                    source_name: 'mitre-attack',
                    external_id: 'A1234'
                }
            ],
            object_marking_refs: ['marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168'],
            x_mitre_attack_spec_version: '3.2.0',
        };
    });

    /**
     * Section for valid input tests
     */
    describe('Valid Inputs', () => {
        it('should accept minimal valid object (only required fields)', () => {
            expect(() => assetSchema.parse(minimalAsset)).not.toThrow();
        });

        it('should accept fully populated valid object (required + optional fields)', () => {
            const objectWithOptionalFields = {
                ...minimalAsset,
                description: 'Test description',
                x_mitre_platforms: ['Windows', 'macOS'],
                x_mitre_sectors: ['Electric'],
                x_mitre_related_assets: [
                    {
                        name: 'Related Asset 1',
                        related_asset_sectors: ['Electric'],
                        description: 'Related asset description',
                    }
                ],
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'],
                x_mitre_modified_by_ref: xMitreIdentity,
            };
            expect(() => assetSchema.parse(objectWithOptionalFields)).not.toThrow();
        });
    });

    /**
     * Section for field-specific tests
     */
    describe('Field-Specific Tests', () => {
        const testField = (
            fieldName: keyof Asset,
            invalidValue: any,
            isRequired = true // Flag indicating whether the field is required
        ) => {
            it(`should reject invalid values for ${fieldName}`, () => {
                const invalidObject = { ...minimalAsset, [fieldName]: invalidValue };
                expect(() => assetSchema.parse(invalidObject)).toThrow();
            });

            if (isRequired) {
                it(`should reject omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalAsset;
                    expect(() => assetSchema.parse(objectWithoutField)).toThrow();
                });
            } else {
                it(`should accept omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalAsset;
                    expect(() => assetSchema.parse(objectWithoutField)).not.toThrow();
                });
            }
        };

        // Testing required fields
        describe('id', () => {
            testField('id', 'invalid-id');
        });

        describe('type', () => {
            testField('type', 'invalid-type');
        });

        describe('x_mitre_domains', () => {
            testField('x_mitre_domains', 'invalid-domains');
        });

        describe('external_references', () => {
            testField('external_references', 'invalid-value');
        });

        describe('object_marking_refs', () => {
            testField('object_marking_refs', 'invalid-value');
        });

        // Testing optional fields
        describe('description', () => {
            testField('description', 123, false);
        });

        describe('x_mitre_platforms', () => {
            testField('x_mitre_platforms', 123, false);
        });

        describe('x_mitre_sectors', () => {
            testField('x_mitre_sectors', 'invalid-value', false);
        });

        describe('x_mitre_related_assets', () => {
            testField('x_mitre_related_assets', 'invalid-value', false);
        });

        describe('x_mitre_contributors', () => {
            testField('x_mitre_contributors', 'invalid-value', false);
        });

        describe('x_mitre_modified_by_ref', () => {
            testField('x_mitre_modified_by_ref', 'invalid-id', false);
        });
    });

    /**
     * Section for schema-level tests
     */
    describe('Schema-Level Tests', () => {
        it('should reject unknown properties', () => {
            const objectWithUnknownProp = {
                ...minimalAsset,
                unknownProp: 'unexpected value'
            };
            expect(() => assetSchema.parse(objectWithUnknownProp)).toThrow();
        });
    });

    /**
     * Section for schema refinements
     */
    describe('Schema Refinements', () => {
        let enterpriseAsset: Asset;

        beforeEach(() => {
            enterpriseAsset = {
                ...minimalAsset,
                x_mitre_domains: ['enterprise-attack'],
                external_references: [
                    {
                        source_name: 'mitre-attack',
                        external_id: 'A1234'
                    }
                ]
            };
        });

        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidAsset = {
                    ...enterpriseAsset,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format', () => {
                const invalidAsset = {
                    ...enterpriseAsset,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'A123' }]
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow(/must match the ATT&CK ID format A####/);
            });
        });
    });
});
