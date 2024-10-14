import type {
    StixCreatedTimestamp,
    StixModifiedTimestamp,
} from "../../src/schemas/common/index.js";
import {
    type Collection,
    collectionSchema
} from "../../src/schemas/sdo/collection.schema.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Test suite for validating the Collection schema.
 */
describe("collectionSchema", () => {
    let minimalCollection: Collection;

    beforeEach(() => {
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
            ]
        };
    });

    /**
     * Section for valid input tests
     */
    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => collectionSchema.parse(minimalCollection)).not.toThrow();
        });
    });

    /**
     * Section for field-specific tests
     */
    describe("Field-Specific Tests", () => {
        const testField = (
            fieldName: keyof Collection,
            invalidValue: any,
            isRequired = true // Flag indicating whether the field is required
        ) => {
            it(`should reject invalid values for ${fieldName}`, () => {
                const invalidCollection = { ...minimalCollection, [fieldName]: invalidValue };
                expect(() => collectionSchema.parse(invalidCollection)).toThrow();
            });

            if (isRequired) {
                it(`should reject omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...collectionWithoutField } = minimalCollection;
                    expect(() => collectionSchema.parse(collectionWithoutField)).toThrow();
                });
            } else {
                it(`should accept omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...collectionWithoutField } = minimalCollection;
                    expect(() => collectionSchema.parse(collectionWithoutField)).not.toThrow();
                });
            }
        };

        // Required Fields
        describe("id", () => {
            testField("id", "invalid-id");
        });

        describe("type", () => {
            testField("type", "invalid-type");
        });

        describe("created_by_ref", () => {
            testField("created_by_ref", "invalid-created-by-ref"); // should reject invalid string values
            testField("created_by_ref", `malware--${uuidv4()}`); // should reject invalid UUID format
        });

        describe("object_marking_refs", () => {
            testField("object_marking_refs", ["invalid-object-marking-refs"]);
        });

        describe("description", () => {
            testField("description", 123);
        });

        describe("x_mitre_contents", () => {
            testField("x_mitre_contents", ["invalid-mitre-contents"]);
        });
    });

    /**
     * Section for schema-level tests
     */
    describe("Schema-Level Tests", () => {
        it('should reject unknown properties', () => {
            const invalidCollection: Collection = {
                ...minimalCollection,
                unknown_property: true
            } as Collection;
            expect(() => collectionSchema.parse(invalidCollection)).toThrow();
        });
    });

    /**
     * Schema Refinements
     */
    describe('Schema Refinements', () => {
        it('should reject if x_mitre_contents array is empty', () => {
            const invalidCollection: Collection = {
                ...minimalCollection,
                x_mitre_contents: []
            };
            expect(() => collectionSchema.parse(invalidCollection)).toThrow("At least one STIX object reference is required");
        });
    });
});
