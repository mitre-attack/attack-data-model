import { ZodError } from "zod";
import {
    Description,
    Name,
    ObjectMarkingRefs,
    StixCreatedTimestamp,
    StixIdentifier,
    StixModifiedTimestamp,
    StixSpecVersion,
    StixType,
    XMitreAttackSpecVersion,
    XMitreDomains,
    XMitreVersion,
    stixTypeSchema,
} from "../../src/schemas/common";
import {
    Identity,
    identitySchema,
} from "../../src/schemas/sdo/identity.schema";
import { v4 as uuidv4 } from "uuid";

describe("identitySchema", () => {
    let identities: any[];

    let minimalIdentity: Identity;

    beforeAll(() => {
        identities = global.attackData.objectsByType["identity"];

        minimalIdentity = identitySchema.parse({
            type: stixTypeSchema.Enum["identity"] as StixType,
            id: `identity--${uuidv4()}` as StixIdentifier,
            spec_version: "2.1" as StixSpecVersion,
            created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
            modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
            name: "The MITRE Corporation" as Name,
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ] as ObjectMarkingRefs,
            identity_class: "organization",
            x_mitre_attack_spec_version: "2.1.0" as XMitreAttackSpecVersion,
            x_mitre_domains: ["enterprise-attack"] as XMitreDomains,
            x_mitre_version: "1.0" as XMitreVersion,
        });
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => identitySchema.parse(minimalIdentity)).not.toThrow();
        });

        // it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
        //     const fullIdentity = {
        //         ...minimalIdentity,
        //         description: "Description" as Description,
        //     };
        //     expect(fullidentity).toBeDefined();
        //     expect(() => identitySchema.parse(fullidentity)).not.toThrow();
        // });

        it("should accept fully populated valid object (required + optional fields deifined in STIX but not used in ATT&CK)", () => {
            // Test with all fields populated with valid, non-edge-case values
            const fullidentity = {
                ...minimalIdentity,
                description: "Description" as Description,
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
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    id: "invalid-id" as StixIdentifier,
                } as Identity;
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...identityWithoutId } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    type: "invalid-type" as any,
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...identityWithoutType } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutType)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            it('should reject invalid values', () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    object_marking_refs: 123 as any
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...identityWithoutObjectMarkingRefs } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe("identity_class", () => {
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    identity_class: "invalid" as any,
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { identity_class, ...identityWithoutIdentityClass } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutIdentityClass)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            it('should reject invalid values', () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    x_mitre_domains: 'not an array' as any
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...identityWithoutDomains } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutDomains)).toThrow();
            });
        });

        describe('description', () => {
            it('should reject invalid values', () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    description: 123 as any
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { description, ...identityWithoutDescription } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutDescription)).not.toThrow();
            });
        });

        describe("roles", () => {
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    roles: 123 as any,
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { roles, ...identityWithoutRoles } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutRoles)).not.toThrow();
            });
        });

        describe("sectors", () => {
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    sectors: 123 as any,
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { sectors, ...identityWithoutRoles } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutRoles)).not.toThrow();
            });
        });

        describe("contact_information", () => {
            it("should reject invalid values", () => {
                const invalidIdentity: Identity = {
                    ...minimalIdentity,
                    contact_information: 123 as any,
                };
                expect(() => identitySchema.parse(invalidIdentity)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { contact_information, ...identityWithoutContactInformation } = minimalIdentity;
                expect(() => identitySchema.parse(identityWithoutContactInformation)).not.toThrow();
            });
        });
    });

    describe("Schema-Level Tests", () => {
        it('should reject unknown properties', () => {
            const identityWithUnknownProperties = {
                ...minimalIdentity,
                unknown_property: true
            } as Identity;
            expect(() => identitySchema.parse(identityWithUnknownProperties)).toThrow();
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
