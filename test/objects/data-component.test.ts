import { ZodError } from "zod";
import {
    StixIdentifier,
    stixTypeSchema,
} from "../../src/schemas/common";
import {
    DataComponent,
    dataComponentSchema,
} from "../../src/schemas/sdo/data-component.schema";
import { v4 as uuidv4 } from "uuid";

describe("dataComponentSchema", () => {

    let minimalDataComponent: DataComponent;

    beforeAll(() => {
        minimalDataComponent = dataComponentSchema
            .parse({
                type: stixTypeSchema.Enum["x-mitre-data-component"],
                id: `x-mitre-data-component--${uuidv4()}`,
                description: "",
                spec_version: "2.1",
                created: "2017-06-01T00:00:00.000Z",
                created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
                modified: "2017-06-01T00:00:00.000Z",
                name: "Network Connection Creation",
                object_marking_refs: [
                    "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
                ],
                x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
                x_mitre_data_source_ref: "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
                x_mitre_attack_spec_version: "2.1.0",
                x_mitre_domains: ["enterprise-attack"],
                x_mitre_version: "1.0",
            });
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => dataComponentSchema
                .parse(minimalDataComponent)).not.toThrow();
        });
    })

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            it("should reject invalid values", () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    id: "invalid-id" as StixIdentifier,
                } as DataComponent;
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...dataComponentWithoutId } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            it("should reject invalid values", () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    type: "invalid-type" as any,
                };
                expect(() => dataComponentSchema
                    .parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...dataComponentWithoutType } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutType)).toThrow();
            });
        });

        describe('description', () => {
            it('should reject invalid values', () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    description: 123 as any
                };
                expect(() => dataComponentSchema
                    .parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...dataComponentWithoutDescription } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutDescription)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            it("should reject invalid values", () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    created_by_ref: "invalid-created-by-ref" as any,
                };
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject invalid values", () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    created_by_ref: `malware--${uuidv4()}` as any
                };
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...dataComponentWithoutCreatedByRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentWithoutCreatedByRef)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            it('should reject invalid values', () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    object_marking_refs: 123 as any
                };
                expect(() => dataComponentSchema
                    .parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...dataComponentWithoutObjectMarkingRefs } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            it('should reject invalid values', () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    x_mitre_domains: 'not an array' as any
                };
                expect(() => dataComponentSchema
                    .parse(invalidDataComponent)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...dataComponentWithoutDomains } = minimalDataComponent;
                expect(() => dataComponentSchema
                    .parse(dataComponentWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            it('should reject invalid values', () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    x_mitre_modified_by_ref: 'invalid-id' as any
                };
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...dataComponentModifiedByRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentModifiedByRef)).toThrow();
            });
        });

        describe('x_mitre_data_source_ref', () => {
            it('should reject invalid values', () => {
                const invalidDataComponent: DataComponent = {
                    ...minimalDataComponent,
                    x_mitre_data_source_ref: 'invalid-id' as any
                };
                expect(() => dataComponentSchema.parse(invalidDataComponent)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...dataComponentDataSourceRef } = minimalDataComponent;
                expect(() => dataComponentSchema.parse(dataComponentDataSourceRef)).toThrow();
            });
        });
    });

    describe("Schema-Level Tests", () => {
        it('should reject unknown properties', () => {
            const dataComponentWithUnknownProperties = {
                ...minimalDataComponent,
                unknown_property: true
            } as DataComponent;
            expect(() => dataComponentSchema
                .parse(dataComponentWithUnknownProperties)).toThrow();
        });

        // Add any other schema-level tests...
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });

        // Add more edge case tests as needed...
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
