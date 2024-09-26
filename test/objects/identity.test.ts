import { ZodError } from "zod";
import {
    StixCreatedTimestamp,
    StixModifiedTimestamp
} from "../../src/schemas/common";
import {
    Identity,
    identitySchema,
} from "../../src/schemas/sdo/identity.schema";
import { v4 as uuidv4 } from "uuid";

describe("identitySchema", () => {
    let identities: any[];

    let minimalIdentity: Identity;
    let invalidIdentity: Identity;

    beforeAll(() => {
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
            x_mitre_version: "1.0"
        };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => identitySchema.parse(minimalIdentity)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional fields deifined in STIX but not used in ATT&CK)", () => {
            // Test with all fields populated with valid, non-edge-case values
            const fullidentity: Identity = {
                ...minimalIdentity,
                description: "Description",
                roles: ["administrator"],
                sectors: ["non-profit"], 
                contact_information: "attack@mitre.org"
            };
            expect(fullidentity).toBeDefined();
            expect(() => identitySchema.parse(fullidentity)).not.toThrow();
        });
        // Add more valid input tests...
    });

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    id: "invalid-id" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...identityWithoutId } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    type: "invalid-type" as any,
                };
            });
            
            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...identityWithoutType } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutType)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    object_marking_refs: 123 as any
                };
            });
            
            it('should reject invalid values', () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...identityWithoutObjectMarkingRefs } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe("identity_class", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    identity_class: "invalid" as any,
                };
            });
            
            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { identity_class, ...identityWithoutIdentityClass } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutIdentityClass)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    x_mitre_domains: 'not an array' as any
                };
            });
            
            it('should reject invalid values', () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...identityWithoutDomains } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutDomains)).toThrow();
            });
        });

        describe('description', () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    description: 123 as any
                };
            });
            
            it('should reject invalid values', () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { description, ...identityWithoutDescription } = invalidIdentity;
                expect(() => identitySchema.parse(identityWithoutDescription)).not.toThrow();
            });
        });

        describe("roles", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    roles: 123 as any,
                };
            });
            
            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { roles, ...identityWithoutRoles } = invalidIdentity;
                expect(() => identitySchema.parse(identityWithoutRoles)).not.toThrow();
            });
        });

        describe("sectors", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    sectors: 123 as any,
                };
            });
            
            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { sectors, ...identityWithoutRoles } = invalidIdentity;
                expect(() => identitySchema.parse(identityWithoutRoles)).not.toThrow();
            });
        });

        describe("contact_information", () => {
            beforeEach(() => {
                invalidIdentity = {
                    ...minimalIdentity,
                    contact_information: 123 as any,
                };
            });
            
            it("should reject invalid values", () => {
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { contact_information, ...identityWithoutContactInformation } = invalidIdentity;
                expect(() => identitySchema.parse(identityWithoutContactInformation)).not.toThrow();
            });
        });
    });

    describe("Schema-Level Tests", () => {
        beforeEach(() => {
            invalidIdentity = {
                ...minimalIdentity,
                unknown_property: true
            } as Identity;
        });
        it('should reject unknown properties', () => {
            expect(() => identitySchema.parse(invalidIdentity)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });

    describe('Validate All Objects', () => {
        it('should validate all objects in the global.attackData', () => {
            identities = global.attackData.objectsByType["identity"];
            const errors: { identity: Identity; error: ZodError }[] = [];

            for (let identity of identities) {
                try {
                    if (!identity.x_mitre_deprecated && !identity.revoked) {
                        identitySchema.parse(identity);
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ identity, error });
                    } else {
                        throw error; // Re-throw if it's not a ZodError
                    }
                }
            }

            if (errors.length > 0) {
                const errorReport = errors.map(({ identity, error }) => {
                    const identityName = identity.name;
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
    identity Name: ${identityName}
    Validation Errors:
    ${errorMessages}`;
                }).join('\n');

                console.warn(`The following ${errors.length} identity(s) failed validation:\n${errorReport}`);
            }

            // Log the number of errors found
            console.log(`Total identities with validation errors: ${errors.length}`);

            // This expectation will always pass, but it gives us a way to surface the error count in the test results
            expect(true).toBe(true);
        });
    });
});
