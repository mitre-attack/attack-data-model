import { describe, beforeEach, it, expect } from 'vitest';
import { v4 as uuidv4 } from "uuid";
import { type Identity, identitySchema } from "../../src/schemas/sdo/identity.schema";
import { type StixCreatedTimestamp, type StixModifiedTimestamp } from "../../src/schemas/common/index";

describe("IdentitySchema", () => {
    let minimalIdentity: Identity;

    beforeEach(() => {
        minimalIdentity = {
            type: "identity",
            id: `identity--${uuidv4()}`,
            spec_version: "2.1",
            created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
            modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
            name: "The MITRE Corporation",
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            identity_class: "organization",
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_domains: ["enterprise-attack"],
            x_mitre_version: "1.0",
        };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => identitySchema.parse(minimalIdentity)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional fields)", () => {
            const fullIdentity: Identity = {
                ...minimalIdentity,
                description: "Description of the organization",
                roles: ["administrator"],
                sectors: ["non-profit"],
                contact_information: "attack@mitre.org",
            };
            expect(() => identitySchema.parse(fullIdentity)).not.toThrow();
        });
    });

    describe("Field-Specific Tests", () => {
        const testField = (
            fieldName: keyof Identity,
            invalidValue: any,
            isRequired = true // Flag indicating whether the field is required
        ) => {
            it(`should reject invalid values for ${fieldName}`, () => {
                const invalidObject = { ...minimalIdentity, [fieldName]: invalidValue };
                expect(() => identitySchema.parse(invalidObject)).toThrow();
            });

            if (isRequired) {
                it(`should reject omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalIdentity;
                    expect(() => identitySchema.parse(objectWithoutField)).toThrow();
                });
            } else {
                it(`should accept omission of ${fieldName}`, () => {
                    const { [fieldName]: omitted, ...objectWithoutField } = minimalIdentity;
                    expect(() => identitySchema.parse(objectWithoutField)).not.toThrow();
                });
            }
        };

        // Testing required fields
        describe("id", () => {
            testField("id", "invalid-id");
        });

        describe("type", () => {
            testField("type", "invalid-type");
        });

        describe("object_marking_refs", () => {
            testField("object_marking_refs", ["invalid-marking-ref"]);
        });

        describe("identity_class", () => {
            testField("identity_class", "invalid-identity-class");
        });

        describe("x_mitre_domains", () => {
            testField("x_mitre_domains", ["invalid-domain"]);
        });

        // Testing optional fields
        describe("description", () => {
            testField("description", 123, false);
        });

        describe("roles", () => {
            testField("roles", "not-an-array", false);
        });

        describe("sectors", () => {
            testField("sectors", ["invalid-sector"], false);
        });

        describe("contact_information", () => {
            testField("contact_information", 123, false);
        });
    });

    describe("Schema-Level Tests", () => {
        it("should reject unknown properties", () => {
            const identityWithUnknownProp = {
                ...minimalIdentity,
                unknown_property: "unexpected_value",
            };
            expect(() => identitySchema.parse(identityWithUnknownProp)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });
});
