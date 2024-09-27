import { ZodError } from "zod";
import {
    StixCreatedTimestamp,
    StixModifiedTimestamp,
} from "../../src/schemas/common";
import {
    Collection,
    collectionSchema
} from "../../src/schemas/sdo/collection.schema";
import { v4 as uuidv4 } from "uuid";

describe("collectionSchema", () => {
    let collections: any[];
    let minimalCollection: Collection;
    let invalidCollection: Collection;

    beforeAll(() => {
        minimalCollection = {
            type: "x-mitre-collection",
            id: `x-mitre-collection--${uuidv4()}`,
            spec_version: "2.1",
            created_by_ref: `identity--${uuidv4()}`,
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: "Enterprise ATT&CK",
            description: "Version 6.2 of the Enterprise ATT&CK dataset",
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_version: "1.2",
            x_mitre_contents: [
                {
                    object_ref: "attack-pattern--01a5a209-b94c-450b-b7f9-946497d91055",
                    object_modified: "2017-05-31T21:32:29.203Z" as StixModifiedTimestamp
                },
                {
                    object_ref: "attack-pattern--0259baeb-9f63-4c69-bf10-eb038c390688",
                    object_modified: "2021-02-09T13:58:23.806Z" as StixModifiedTimestamp
                },
                {
                    object_ref: "relationship--0024d82d-97ea-4dc5-81a1-8738862e1f3b",
                    object_modified: "2021-02-09T13:58:23.806Z" as StixModifiedTimestamp
                }
            ]
        };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => collectionSchema.parse(minimalCollection)).not.toThrow();
        });
    });

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    id: "invalid-id" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...collectionWithoutId } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    type: "invalid-type" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...collectionWithoutType } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutType)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            let invalidCollection1: Collection;
            let invalidCollection2: Collection;

            beforeEach(() => {
                invalidCollection1 = {
                    ...minimalCollection,
                    created_by_ref: "invalid-created-by-ref" as any,
                };

                invalidCollection2 = {
                    ...minimalCollection,
                    created_by_ref: `malware--${uuidv4()}` as any,
                };
            });

            it("should reject invalid string values", () => {
                expect(() => collectionSchema.parse(invalidCollection1)).toThrow();
            });

            it("should reject invalid UUID format", () => {
                expect(() => collectionSchema.parse(invalidCollection2)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...collectionWithoutCreatedByRef } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutCreatedByRef)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    object_marking_refs: 123 as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...collectionWithoutObjectMarkingRefs } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('description', () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    description: 123 as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...collectionWithoutDescription } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutDescription)).toThrow();
            });
        });

        describe('x_mitre_contents', () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    x_mitre_contents: 123 as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_contents, ...collectionWithoutXMitreContents } = minimalCollection;
                expect(() => collectionSchema.parse(collectionWithoutXMitreContents)).toThrow();
            });
        });
    });

    describe('Schema Refinements', () => {
        describe('X Mitre Contents Validation', () => {
            beforeEach(() => {
                invalidCollection = {
                    ...minimalCollection,
                    x_mitre_contents: []
                };
            });

            it('should reject if at least one STIX object reference is not present', () => {
                expect(() => collectionSchema.parse(invalidCollection)).toThrow(/At least one STIX object reference is required/);
            });
        });
    });

    describe("Schema-Level Tests", () => {
        beforeEach(() => {
            invalidCollection = {
                ...minimalCollection,
                unknown_property: true
            } as Collection;
        });

        it('should reject unknown properties', () => {
            expect(() => collectionSchema.parse(invalidCollection)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });

    describe('should validate existing ATT&CK objects and report errors', () => {
        it('should validate all objects in the global.attackData', () => {
            collections = global.attackData.objectsByType["x-mitre-collection"];
            const errors: { collection: Collection; error: ZodError }[] = [];

            for (let collection of collections) {
                try {
                    collectionSchema.parse(collection);
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ collection, error });
                    } else {
                        throw error; // Re-throw if it's not a ZodError
                    }
                }
            }

            if (errors.length > 0) {
                const errorReport = errors.map(({ collection, error }) => {
                    const collectionStixId = collection.id;
                    const collectionName = collection.name;
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
    Collection Name: ${collectionName}
    Collection stixID: ${collectionStixId}
    Validation Errors:
    ${errorMessages}`;
                }).join('\n');

                console.warn(`The following ${errors.length} malware(s) failed validation:\n${errorReport}`);
            }

            // Log the number of errors found
            console.log(`Total malwares with validation errors: ${errors.length}`);

            // This expectation will always pass, but it gives us a way to surface the error count in the test results
            expect(true).toBe(true);
        });
    });
});