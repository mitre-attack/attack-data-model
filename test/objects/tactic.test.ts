import { ZodError } from "zod";
import {
    ExternalReferences,
    StixCreatedTimestamp,
    StixModifiedTimestamp,
} from "../../src/schemas/common";
import {
    Tactic,
    tacticSchema,
} from "../../src/schemas/sdo/tactic.schema";
import { v4 as uuidv4 } from "uuid";

describe("tacticSchema", () => {
    let minimalTactic: Tactic;
    let invalidTactic: Tactic;

    beforeAll(() => {
        minimalTactic = {
            type: "x-mitre-tactic",
            id: `x-mitre-tactic--${uuidv4()}`,
            spec_version: "2.1",
            created_by_ref: `identity--${uuidv4()}`,
            created: "2017-05-31T21:32:29.203Z" as StixCreatedTimestamp,
            modified: "2021-02-09T13:58:23.806Z" as StixModifiedTimestamp,
            name: "Execution",
            description: "The adversary is trying to run malicious code.\n\nExecution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery.",
            external_references: [
                {
                    "external_id": "TA0002",
                    "url": "https://attack.mitre.org/tactics/TA0002",
                    "source_name": "mitre-attack"
                }
            ],
            x_mitre_shortname: "execution",
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_domains: ["enterprise-attack"],
            x_mitre_modified_by_ref:
                "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_version: "1.2",
        };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => tacticSchema.parse(minimalTactic)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullTactic: Tactic = {
                ...minimalTactic,
                x_mitre_deprecated: false,
            };
            expect(fullTactic).toBeDefined();
            expect(() => tacticSchema.parse(fullTactic)).not.toThrow();
        });
    });

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    id: "invalid-id" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...tacticWithoutId } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    type: "invalid-type" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...tacticWithoutType } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutType)).toThrow();
            });
        });

        describe('description', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    description: 123 as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...tacticWithoutDescription } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutDescription)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            let invalidTactic1: Tactic;
            let invalidTactic2: Tactic;
            beforeEach(() => {
                invalidTactic1 = {
                    ...minimalTactic,
                    created_by_ref: "invalid-created-by-ref" as any,
                };

                invalidTactic2 = {
                    ...minimalTactic,
                    created_by_ref: `malware--${uuidv4()}` as any,
                };
            });

            it("should reject invalid string values", () => {
                expect(() => tacticSchema.parse(invalidTactic1)).toThrow();
            });

            it("should reject invalid UUID format", () => {
                expect(() => tacticSchema.parse(invalidTactic2)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...tacticWithoutCreatedByRef } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutCreatedByRef)).toThrow();
            });
        });

        describe('external_references', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    external_references: 'not-an-array' as unknown as ExternalReferences
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...tacticWithoutExternalReferences } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutExternalReferences)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    object_marking_refs: ['invalid-object-marking-refs'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...tacticWithoutObjectMarkingRefs } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    x_mitre_domains: ['invalid-mitre-domains'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...tacticWithoutDomains } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_shortname', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    x_mitre_shortname: 'invalid-shortname' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_shortname, ...tacticWithoutMitreShortname } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutMitreShortname)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    x_mitre_modified_by_ref: 'invalid-modified-by-ref' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...tacticWithoutModifiedByRef } = minimalTactic;
                expect(() => tacticSchema.parse(tacticWithoutModifiedByRef)).toThrow();
            });
        });

        describe('x_mitre_deprecated', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    x_mitre_deprecated: 'not-a-boolean' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_deprecated, ...tacticWithoutDeprecated } = invalidTactic;
                expect(() => tacticSchema.parse(tacticWithoutDeprecated)).not.toThrow();
            });
        });

        describe('revoked', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    revoked: 'not-a-boolean' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { revoked, ...tacticWithoutRevoked } = invalidTactic;
                expect(() => tacticSchema.parse(tacticWithoutRevoked)).not.toThrow();
            });
        });
    });

    describe('Schema Refinements', () => {
        describe('External References Validation', () => {
            beforeEach(() => {
                invalidTactic = {
                    ...minimalTactic,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
            });

            it('should reject when ATT&CK ID is missing', () => {
                expect(() => tacticSchema.parse(invalidTactic)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format', () => {
                invalidTactic.external_references = [{ source_name: 'mitre-attack', external_id: 'TA123' }];
                expect(() => tacticSchema.parse(invalidTactic)).toThrow(`The first external_reference must match the ATT&CK ID format TA####}.`);
            });
        });
    });

    describe("Schema-Level Tests", () => {
        beforeEach(() => {
            invalidTactic = {
                ...minimalTactic,
                unknown_property: true
            } as Tactic;
        });

        it('should reject unknown properties', () => {
            expect(() => tacticSchema.parse(invalidTactic)).toThrow();
        });
    });
});