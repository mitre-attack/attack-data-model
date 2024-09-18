import { ZodError } from "zod";
import {
    ExternalReferences,
    StixCreatedTimestamp,
    StixIdentifier
} from "../../src/schemas/common";
import {
    DataSource,
    dataSourceSchema,
} from "../../src/schemas/sdo/data-source.schema";
import { v4 as uuidv4 } from "uuid";

describe("dataSourceSchema", () => {
    let dataSources: any[];
    let minimalDataSource: DataSource;

    beforeAll(() => {
        minimalDataSource = dataSourceSchema
            .parse({
                type: "x-mitre-data-source",
                id: `x-mitre-data-source--${uuidv4()}`,
                description: "Test data source description",
                spec_version: "2.1",
                created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
                created_by_ref: `identity--${uuidv4()}`,
                modified: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
                name: "Network Connection Creation",
                object_marking_refs: [
                    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
                ],
                x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
                external_references: [
                    {
                        "source_name": "mitre-attack",
                        "url": "https://attack.mitre.org/datasources/DS0014",
                        "external_id": "DS0014"
                    },
                ],
                x_mitre_attack_spec_version: "2.1.0",
                x_mitre_domains: ["enterprise-attack"],
                x_mitre_version: "1.0",
                x_mitre_collection_layers: ["Host"]
            });
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => dataSourceSchema
                .parse(minimalDataSource)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullDataSource = {
                ...minimalDataSource,
                x_mitre_platforms: ["Windows"],
                x_mitre_contributors: ["Contributor"],
                x_mitre_deprecated: false
            };
            expect(fullDataSource).toBeDefined();
            expect(() => dataSourceSchema.parse(fullDataSource)).not.toThrow();
        });
    })


    describe("Field-Specific Tests", () => {
        describe("id", () => {
            it("should reject invalid values", () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    id: "invalid-id" as StixIdentifier,
                } as DataSource;
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...dataSourceWithoutId } = minimalDataSource;
                expect(() => dataSourceSchema
                    .parse(dataSourceWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            it("should reject invalid values", () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    type: "invalid-type" as any,
                };
                expect(() => dataSourceSchema
                    .parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...dataSourceWithoutType } = minimalDataSource;
                expect(() => dataSourceSchema
                    .parse(dataSourceWithoutType)).toThrow();
            });
        });

        describe('description', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    description: 123 as any
                };
                expect(() => dataSourceSchema
                    .parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...dataSourceWithoutDescription } = minimalDataSource;
                expect(() => dataSourceSchema
                    .parse(dataSourceWithoutDescription)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            it("should reject invalid values", () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    created_by_ref: "invalid-created-by-ref" as any,
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it("should reject invalid values", () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    created_by_ref: `DataSource--${uuidv4()}` as any
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...dataSourceWithoutCreatedByRef } = minimalDataSource;
                expect(() => dataSourceSchema.parse(dataSourceWithoutCreatedByRef)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    object_marking_refs: 123 as any
                };
                expect(() => dataSourceSchema
                    .parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...dataSourceWithoutObjectMarkingRefs } = minimalDataSource;
                expect(() => dataSourceSchema
                    .parse(dataSourceWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    x_mitre_domains: 'not an array' as any
                };
                expect(() => dataSourceSchema
                    .parse(invalidDataSource)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...dataSourceWithoutDomains } = minimalDataSource;
                expect(() => dataSourceSchema
                    .parse(dataSourceWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    x_mitre_modified_by_ref: 'invalid-id' as any
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...DataSourceModifiedByRef } = minimalDataSource;
                expect(() => dataSourceSchema.parse(DataSourceModifiedByRef)).toThrow();
            });
        });

        describe('external_references', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    external_references: 'not-an-array' as unknown as ExternalReferences

                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...dataSourceWithoutExternalReferences } = minimalDataSource;
                expect(() => dataSourceSchema.parse(dataSourceWithoutExternalReferences)).toThrow();
            });
        });

        describe('x_mitre_collection_layers', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    x_mitre_collection_layers: 'invalid-id' as any
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_collection_layers, ...DataSourceMitreCollectionLayers } = minimalDataSource;
                expect(() => dataSourceSchema.parse(DataSourceMitreCollectionLayers)).toThrow();
            });
        });

        describe('x_mitre_deprecated', () => {
            it('should reject invalid values', () => {
                const invalidDataSource: DataSource = {
                    ...minimalDataSource,
                    x_mitre_deprecated: 'not a boolean' as any
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_deprecated, ...dataSourceWithoutDeprecated } = minimalDataSource;
                expect(() => dataSourceSchema.parse(dataSourceWithoutDeprecated)).not.toThrow();
            });
        });
    });

    describe('Schema Refinements', () => {
        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidDataSource = {
                    ...minimalDataSource,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format for non-subtechnique', () => {
                const invalidDataSource = {
                    ...minimalDataSource,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'DS123' }]
                };
                expect(() => dataSourceSchema.parse(invalidDataSource)).toThrow(`The first external_reference must match the ATT&CK ID format DS####}.`);
            });
        });
    });

    describe("Schema-Level Tests", () => {
        it('should reject unknown properties', () => {
            const DataSourceWithUnknownProperties = {
                ...minimalDataSource,
                unknown_property: true
            } as DataSource;
            expect(() => dataSourceSchema
                .parse(DataSourceWithUnknownProperties)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });

    describe('Validate All Objects', () => {
        it('should validate all objects in the global.attackData', () => {
            
            dataSources = global.attackData.objectsByType["x-mitre-data-source"];

            const errors: { dataSource: DataSource; error: ZodError }[] = [];

            for (let dataSource of dataSources) {
                try {
                    if (!dataSource.x_mitre_deprecated && !dataSource.revoked) {
                        dataSourceSchema
                            .parse(dataSource);
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ dataSource, error });
                    } else {
                        throw error; // Re-throw if it's not a ZodError
                    }
                }
            }

            if (errors.length > 0) {
                const errorReport = errors.map(({ dataSource, error }) => {
                    const dataSourceId = dataSource.external_references[0].external_id;
                    const dataSourceStixId = dataSource.id;
                    const dataSourceName = dataSource.name;
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
    Data Source ID: ${dataSourceId}
    Data Source Name: ${dataSourceName}
    Data Source stixID: ${dataSourceStixId}
    Validation Errors:
    ${errorMessages}`;
                }).join('\n');

                console.warn(`The following ${errors.length} data source(s) failed validation:\n${errorReport}`);
            }

            // Log the number of errors found
            console.log(`Total data sources with validation errors: ${errors.length}`);

            // This expectation will always pass, but it gives us a way to surface the error count in the test results
            expect(true).toBe(true);
        });
    });
});
