import {
    ExternalReferences,
    StixCreatedTimestamp,
    StixModifiedTimestamp
} from "../../src/schemas/common";
import {
    KillChainPhase,
    Tool,
    toolSchema,
} from "../../src/schemas/sdo/tool.schema";
import { v4 as uuidv4 } from "uuid";

describe("toolSchema", () => {
    let minimalTool: Tool;

    beforeEach(() => {
        minimalTool = {
            type: "tool",
            id: `tool--${uuidv4()}`,
            spec_version: "2.1",
            created_by_ref: `identity--${uuidv4()}`,
            created: "2021-07-30T15:43:17.770Z" as StixCreatedTimestamp,
            modified: "2024-04-11T00:06:01.264Z" as StixModifiedTimestamp,
            name: "Sliver",
            description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
            external_references: [
                {
                    source_name: "mitre-attack",
                    url: "https://attack.mitre.org/software/S0049",
                    external_id: "S0049"
                },
                {
                    source_name: "F-Secure The Dukes",
                    description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
                    url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
                }
            ],
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
            expect(() => toolSchema.parse(minimalTool)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullTool = {
                ...minimalTool,
                x_mitre_platforms: ["Windows"],
                x_mitre_contributors: ["Contributor"],
                x_mitre_aliases: ["Sliver"],
                x_mitre_deprecated: false
            };
            expect(fullTool).toBeDefined();
            expect(() => toolSchema.parse(fullTool)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional fields defined in STIX but not used in ATT&CK)", () => {
            const fullTool = {
                ...minimalTool,
                kill_chain_phases: [
                    {
                        kill_chain_name: "mitre-attack",
                        phase_name: "privilege-escalation",
                    },
                ] as KillChainPhase[],
                aliases: ["Sliver"],
                tool_types: ["remote-access"],
                tool_version: "1.0"
            };
            expect(fullTool).toBeDefined();
            expect(() => toolSchema.parse(fullTool)).not.toThrow();
        });
    });

    describe("Field-Specific Tests", () => {
        let invalidTool: Tool;

        describe("id", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    id: "invalid-id" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...toolWithoutId } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    type: "invalid-type" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...toolWithoutType } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutType)).toThrow();
            });
        });

        describe("tool_types", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    tool_types: ["invalid-tool-type"] as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { tool_types, ...toolWithoutToolTypes } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutToolTypes)).not.toThrow();
            });
        });

        describe("kill_chain_phases", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    kill_chain_phases: [{ invalid: "object" }] as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { kill_chain_phases, ...toolWithoutKillChainPhases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutKillChainPhases)).not.toThrow();
            });
        });

        describe("tool_version", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    tool_version: 123 as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { tool_version, ...toolWithoutToolVersion } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutToolVersion)).not.toThrow();
            });
        });

        describe("aliases", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    aliases: "not-an-array" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { aliases, ...toolWithoutAliases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutAliases)).not.toThrow();
            });
        });

        describe("created_by_ref", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    created_by_ref: "invalid-created-by-ref" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...toolWithoutCreatedByRef } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutCreatedByRef)).toThrow();
            });
        });

        describe("description", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    description: 123 as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...toolWithoutDescription } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutDescription)).toThrow();
            });
        });

        describe("external_references", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    external_references: "not-an-array" as unknown as ExternalReferences,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omitted required values", () => {
                const { external_references, ...toolWithoutExternalReferences } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutExternalReferences)).toThrow();
            });
        });

        describe("object_marking_refs", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    object_marking_refs: ["invalid-object-marking-refs"] as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...toolWithoutObjectMarkingRefs } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe("x_mitre_platforms", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_platforms: ["invalid-mitre-platforms"] as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { x_mitre_platforms, ...toolWithoutPlatforms } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutPlatforms)).not.toThrow();
            });
        });

        describe("x_mitre_contributors", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_contributors: "not-an-array" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { x_mitre_contributors, ...toolWithoutContributors } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutContributors)).not.toThrow();
            });
        });

        describe("x_mitre_aliases", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_aliases: "not-an-array" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { x_mitre_aliases, ...toolWithoutXMitreAliases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutXMitreAliases)).not.toThrow();
            });
        });

        describe("x_mitre_modified_by_ref", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_modified_by_ref: "invalid-modified-by-ref" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...toolWithoutModifiedByRef } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutModifiedByRef)).toThrow();
            });
        });

        describe("x_mitre_domains", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_domains: ["invalid-mitre-domains"] as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omitted required values", () => {
                const { x_mitre_domains, ...toolWithoutDomains } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutDomains)).toThrow();
            });
        });

        describe("x_mitre_deprecated", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    x_mitre_deprecated: "not-a-boolean" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { x_mitre_deprecated, ...toolWithoutDeprecated } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutDeprecated)).not.toThrow();
            });
        });

        describe("revoked", () => {
            beforeEach(() => {
                invalidTool = {
                    ...minimalTool,
                    revoked: "not-a-boolean" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { revoked, ...toolWithoutRevoked } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutRevoked)).not.toThrow();
            });
        });
    });    

    describe('Schema Refinements', () => {
        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidTool = {
                    ...minimalTool,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format', () => {
                const invalidTool = {
                    ...minimalTool,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'S123' }]
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow(`The first external_reference must match the ATT&CK ID format S####}.`);
            });
        });

        describe('x_mitre_aliases Validation', () => {
            it('should reject when first alias does not match object name', () => {
                const invalidTool = {
                    ...minimalTool,
                    x_mitre_aliases: ["HammerDuke"]
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow(`The first alias must match the object's name`);
            });
        });
    });

    describe("Schema-Level Tests", () => {
        it('should reject unknown properties', () => {
            const toolWithUnknownProperties = {
                ...minimalTool,
                unknown_property: true
            } as Tool;
            expect(() => toolSchema.parse(toolWithUnknownProperties)).toThrow();
        });
    });
});
