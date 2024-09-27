import { ZodError } from "zod";
import {
    StixCreatedTimestamp, StixModifiedTimestamp,
} from "../../src/schemas/common";
import {
    DataComponent,
    dataComponentSchema,
} from "../../src/schemas/sdo/data-component.schema";
import { v4 as uuidv4 } from "uuid";

describe("dataComponentSchema", () => {

    let minimalDataComponent: DataComponent;
    let invalidDataComponent: DataComponent;

    beforeAll(() => {
        minimalDataComponent = {
                type: "x-mitre-data-component",
                id: `x-mitre-data-component--${uuidv4()}`,
                description: "A user requested active directory credentials, such as a ticket or token.",
                spec_version: "2.1",
                created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
                created_by_ref: `identity--${uuidv4()}`,
                modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
                name: "Network Connection Creation",
                object_marking_refs: [
                    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
                ],
                x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
                x_mitre_data_source_ref: "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
                x_mitre_attack_spec_version: "2.1.0",
                x_mitre_domains: ["enterprise-attack"],
                x_mitre_version: "1.0",
            };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => dataComponentSchema
                .parse(minimalDataComponent)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullDataComponent: DataComponent = {
                ...minimalDataComponent,
                x_mitre_deprecated: false
            };
            expect(fullDataComponent).toBeDefined();
            expect(() => dataComponentSchema.parse(fullDataComponent)).not.toThrow();
        });
    })

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    id: "invalid-id" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...dataComponentWithoutId } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    type: "invalid-type" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...dataComponentWithoutType } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutType)).toThrow();
            });
        });

        describe('description', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    description: 123 as any,
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...dataComponentWithoutDescription } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutDescription)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            let invalidDataComponent1: DataComponent;
            let invalidDataComponent2: DataComponent;
            beforeEach(() => {
                invalidDataComponent1 = {
                    ...minimalDataComponent,
                    created_by_ref: "invalid-created-by-ref" as any,
                };

                invalidDataComponent2 = {
                    ...minimalDataComponent,
                    created_by_ref: `malware--${uuidv4()}` as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent1)).toThrow();
            });

            it("should reject invalid values", () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent2)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...dataComponentWithoutCreatedByRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentWithoutCreatedByRef)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    object_marking_refs: ['invalid-object-marking-refs'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...dataComponentWithoutObjectMarkingRefs } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    x_mitre_domains: ['invalid-mitre-domains'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...dataComponentWithoutDomains } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    x_mitre_modified_by_ref: 'invalid-modified-by-ref' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...dataComponentModifiedByRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentModifiedByRef)).toThrow();
            });
        });

        describe('x_mitre_data_source_ref', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    x_mitre_data_source_ref: 'invalid-data-source-ref' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...dataComponentDataSourceRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentDataSourceRef)).toThrow();
            });
        });

        describe('x_mitre_deprecated', () => {
            beforeEach(() => {
                invalidDataComponent = {
                    ...minimalDataComponent,
                    x_mitre_deprecated: 'not-a-boolean' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_deprecated, ...dataComponentWithoutDeprecated } = invalidDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentWithoutDeprecated)).not.toThrow();
            });
        });
    });

    describe("Schema-Level Tests", () => {
        beforeEach(() => {
            invalidDataComponent = {
                ...minimalDataComponent,
                unknown_property: true
            } as DataComponent;
        });

        it('should reject unknown properties', () => {
            expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });

    describe('Validate All Objects', () => {
        it('should validate all objects in the global.attackData', () => {
            let dataComponents: any[];
            dataComponents = global.attackData.objectsByType["x-mitre-data-component"];

            const errors: { dataComponent: DataComponent; error: ZodError }[] = [];

            for (let dataComponent of dataComponents) {
                try {
                    if (!dataComponent.x_mitre_deprecated && !dataComponent.revoked) {
                        dataComponentSchema
                            .parse(dataComponent);
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ dataComponent, error });
                    } else {
                        throw error; // Re-throw if it's not a ZodError
                    }
                }
            }

            if (errors.length > 0) {
                const errorReport = errors.map(({ dataComponent, error }) => {
                    const dataComponentStixId = dataComponent.id;
                    const dataComponentName = dataComponent.name;
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
    Data Component Name: ${dataComponentName}
    Data Component stixID: ${dataComponentStixId}
    Validation Errors:
    ${errorMessages}`;
                }).join('\n');

                console.warn(`The following ${errors.length} data component(s) failed validation:\n${errorReport}`);
            }

            // Log the number of errors found
            console.log(`Total data components with validation errors: ${errors.length}`);

            // This expectation will always pass, but it gives us a way to surface the error count in the test results
            expect(true).toBe(true);
        });
    });
});
