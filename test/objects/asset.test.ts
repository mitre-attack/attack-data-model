import { v4 as uuidv4 } from 'uuid';
import { Asset, assetSchema, RelatedAsset, XMitreSectors } from '../../src/schemas/sdo/asset.schema';
import { Description, ExternalReferences, StixCreatedTimestamp, StixIdentifier, StixModifiedTimestamp, StixSpecVersion, StixType } from '../../src/schemas/common';

describe('AssetSchema', () => {
    let assets: any[];
    let minimalAsset: Asset;

    beforeAll(() => {
        assets = global.attackData.objectsByType['x-mitre-asset'];

        minimalAsset = {
            id: `x-mitre-asset--${uuidv4()}`,
            type: "x-mitre-asset",
            spec_version: "2.1",
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: "Test Asset",
            x_mitre_domains: ['ics-attack'],
            x_mitre_version: "1.0",
            created_by_ref: `identity--${uuidv4()}`,
            external_references: [
                {
                    source_name: "mitre-attack",
                    external_id: "A1234"
                }
            ],
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            x_mitre_attack_spec_version: "3.2.0"
        };
    });

    describe('True Positives Tests', () => {
        it('should accept minimal valid object (only required fields)', () => {
            expect(() => assetSchema.parse(minimalAsset)).not.toThrow();
        });

        it('should accept fully populated valid object (required + optional fields)', () => {
            const fullAsset = {
                ...minimalAsset,
                description: 'Test description.' as Description,
                x_mitre_contributors: ["John Doe", "Jane Doe"],
                x_mitre_sectors: ["General"],
                x_mitre_platforms: ['Windows'],
                x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
                x_mitre_related_assets: [
                    {
                        name: "Related asset name.",
                        related_asset_sectors: ["General"],
                        description: "Test description."
                    }
                ],
                x_mitre_deprecated: false
            };
            expect(() => assetSchema.parse(fullAsset)).not.toThrow();
        });
    });

    describe('True Negative Tests', () => {
        describe('id', () => {

            it('should reject invalid values', () => {
                const invalidId: Asset = {
                    ...minimalAsset,
                    id: 'invalid-id' as StixIdentifier
                } as Asset;
                expect(() => assetSchema.parse(invalidId)).toThrow();

                const invalidAssetId: Asset = {
                    ...minimalAsset,
                    id: `attack-pattern--${uuidv4()}` as any
                };
                expect(() => assetSchema.parse(invalidAssetId)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { id, ...assetWithoutId } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutId)).toThrow();
            });
        });

        describe('type', () => {

            it('should reject invalid values', () => {
                const invalidType: Asset = {
                    ...minimalAsset,
                    type: 'invalid-type' as StixType
                } as Asset;
                expect(() => assetSchema.parse(invalidType)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { type, ...assetWithoutType } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutType)).toThrow();
            });
        });

        describe('spec_version', () => {

            it('should reject invalid values', () => {
                const invalidSpecVersion: Asset = {
                    ...minimalAsset,
                    spec_version: 'invalid' as StixSpecVersion
                };
                expect(() => assetSchema.parse(invalidSpecVersion)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { spec_version, ...assetWithoutSpecVersion } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutSpecVersion)).toThrow();
            });
        });

        describe('description', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    description: 123 as any
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { description, ...assetWithoutDescription } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutDescription)).not.toThrow();
            });
        });

        describe('external_references', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    external_references: 'not-an-array' as unknown as ExternalReferences
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...assetWithoutReferences } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutReferences)).toThrow();
            });

            it('should reject when ATT&CK ID is missing', () => {
                const invalidAsset = {
                    ...minimalAsset,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow(/ATT&CK ID must be defined/);
            });
        });

        describe('x_mitre_platforms', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_paltforms: 123 as any
                } as Asset;
                expect(() => assetSchema.parse(invalidAsset)).toThrow();

                const invalidPlatform: Asset = {
                    ...minimalAsset,
                    x_mitre_platforms: ['invalid-platform'] as any
                };
                expect(() => assetSchema.parse(invalidPlatform)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_platforms, ...assetWithoutPlatforms } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutPlatforms)).not.toThrow();
            });
        });

        describe('x_mitre_domains', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_domains: 'not-an-array' as any
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();

                const invalidDomain: Asset = {
                    ...minimalAsset,
                    x_mitre_domains: ['invalid-domain'] as any
                };
                expect(() => assetSchema.parse(invalidDomain)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...assetWithoutDomains } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_contributors', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_contributors: 'invalid string' as any
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_contributors, ...assetWithoutContributors } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutContributors)).not.toThrow();
            });
        });

        describe('x_mitre_sectors', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_sectors: 123 as any
                } as Asset;
                expect(() => assetSchema.parse(invalidAsset)).toThrow();

                const invalidSector: Asset = {
                    ...minimalAsset,
                    x_mitre_sectors: ['invalid-sector'] as any
                };
                expect(() => assetSchema.parse(invalidSector)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_sectors, ...assetWithoutSectors } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutSectors)).not.toThrow();
            });
        });

        describe('x_mitre_related_assets', () => {
            const minimalRelatedAsset = {
                name: "Related Asset",
                related_asset_sectors: ["General"] ,
                description: "Test description."
            }

            it('should reject invalid values', () => {
                // invalid type
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: 'not-an-array' as any
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_related_assets, ...assetWithoutRelatedAssets } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutRelatedAssets)).not.toThrow();
            });

            it('should reject ommitted required value', () => {
                const { name, ...relatedAssetWithoutName } = minimalRelatedAsset;
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        {
                            ...relatedAssetWithoutName
                        } as RelatedAsset
                    ]
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should accept ommitted optional values', () => {
                const { description, related_asset_sectors, ...relatedAsset } = minimalRelatedAsset;
                const validAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        { ...relatedAsset }
                    ]
                };
                expect(() => assetSchema.parse(validAsset)).not.toThrow();
            });

            it('should reject invalid related asset name', () => {
                const assetWithInvalidRelatedAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        {
                            ...minimalRelatedAsset,
                            name: 123 as any
                        } as RelatedAsset
                    ]
                };
                expect(() => assetSchema.parse(assetWithInvalidRelatedAsset)).toThrow();
            });

            it('should reject invalid related asset description', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        {
                            ...minimalRelatedAsset,
                            description: 123 as any
                        } as RelatedAsset
                    ]
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should reject invalid related asset sectors', () => {
                const invalidRelatedAssetSectorType: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        {
                            ...minimalRelatedAsset,
                            related_asset_sectors: 'not-an-array' as any
                        } as RelatedAsset
                    ]
                };

                const invalidRelatedAssetSectorValue: Asset = {
                    ...minimalAsset,
                    x_mitre_related_assets: [
                        {
                            ...minimalRelatedAsset,
                            related_asset_sectors: ["invalid-sector"] as any
                        } as RelatedAsset
                    ]
                };

                expect(() => assetSchema.parse(invalidRelatedAssetSectorType)).toThrow();
                expect(() => assetSchema.parse(invalidRelatedAssetSectorValue)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {

            it('should reject invalid values', () => {
                const invalidAsset: Asset = {
                    ...minimalAsset,
                    x_mitre_modified_by_ref: 'invalid-id' as any
                };
                expect(() => assetSchema.parse(invalidAsset)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_modified_by_ref, ...assetWithoutModifiedByRef } = minimalAsset;
                expect(() => assetSchema.parse(assetWithoutModifiedByRef)).not.toThrow();
            });
        });

        describe('Schema-Level Tests', () => {
            it('should reject unknown properties', () => {
                const assetWithUnknownProp: Asset = {
                    ...minimalAsset,
                    unknown_prop: 'invalid'
                } as Asset;
                expect(() => assetSchema.parse(assetWithUnknownProp)).toThrow();
            });
        });
    });

    describe('Validate All Objects', () => {
        it('should validate all objects in the global.attackData', () => {
            assets.forEach((obj, index) => {
                expect(() => assetSchema.parse(obj)).not.toThrow();
            });
        });
    });
});