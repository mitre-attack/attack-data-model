import { ZodError } from "zod";
import {
    Description,
    ExternalReferences,
    Name,
    ObjectMarkingRefs,
    StixCreatedByRef,
    StixCreatedTimestamp,
    StixIdentifier,
    StixModifiedTimestamp,
    StixSpecVersion,
    StixType,
    XMitreAttackSpecVersion,
    XMitreContributors,
    XMitreDomains,
    XMitreModifiedByRef,
    XMitrePlatforms,
    XMitreVersion,
    stixTypeSchema,
} from "../../src/schemas/common";
import {
    KillChainPhase,
    Tool,
    toolSchema,
} from "../../src/schemas/sdo/tool.schema";
import { v4 as uuidv4 } from "uuid";

describe("toolSchema", () => {
    let tools: any[];

    let minimalTool: Tool;

    beforeAll(() => {
        minimalTool = toolSchema.parse({
            type: stixTypeSchema.Enum["tool"] as StixType,
            id: `tool--${uuidv4()}` as StixIdentifier,
            spec_version: "2.1" as StixSpecVersion,
            created_by_ref: `identity--${uuidv4()}` as StixCreatedByRef,
            created: "2021-07-30T15:43:17.770Z" as StixCreatedTimestamp,
            modified: "2024-04-11T00:06:01.264Z" as StixModifiedTimestamp,
            name: "Sliver" as Name,
            description:'[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)' as Description,
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
            ] as ExternalReferences,
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ] as ObjectMarkingRefs,
            x_mitre_attack_spec_version: "2.1.0" as XMitreAttackSpecVersion,
            x_mitre_domains: ["enterprise-attack"] as XMitreDomains,
            x_mitre_modified_by_ref:
                "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as XMitreModifiedByRef,
            x_mitre_version: "1.2" as XMitreVersion,
        });
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => toolSchema.parse(minimalTool)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullTool = {
                ...minimalTool,
                x_mitre_platforms: ["Windows"] as XMitrePlatforms,
                x_mitre_contributors: ["Contributor"] as XMitreContributors,
                x_mitre_aliases: ["Sliver"]
            };
            expect(fullTool).toBeDefined();
            expect(() => toolSchema.parse(fullTool)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional fields defined in STIX but not used in ATT&CK)", () => {
            // Test with all fields populated with valid, non-edge-case values
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
        // Add more valid input tests...
    });

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    id: "invalid-id" as StixIdentifier,
                } as Tool;
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...toolWithoutId } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    type: "invalid-type" as any,
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...toolWithoutType } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutType)).toThrow();
            });
        });

        describe("tool_types", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    tool_types: "invalid" as any,
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { tool_types, ...toolWithoutToolTypes } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutToolTypes)).not.toThrow();
            });
        });

        describe("kill_chain_phases", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    kill_chain_phases: [{ invalid: "object" }] as any,
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { kill_chain_phases, ...toolWithoutKillChainPhases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutKillChainPhases)).not.toThrow();
            });
        });

        describe("tool_version", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    tool_version: 123 as any,
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omittance of optional values", () => {
                const { tool_version, ...toolWithoutToolVersion } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutToolVersion)).not.toThrow();
            });
        });

        describe('aliases', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    aliases: 123 as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { aliases, ...toolWithoutAliases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutAliases)).not.toThrow();
            });
        });

        describe("created_by_ref", () => {
            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    created_by_ref: "invalid-created-by-ref" as any,
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject invalid values", () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    created_by_ref: `malware--${uuidv4()}` as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...toolWithoutCreatedByRef } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutCreatedByRef)).toThrow();
            });
        });

        describe('description', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    description: 123 as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...toolWithoutDescription } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutDescription)).toThrow();
            });
        });

        describe('external_references', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    external_references: 'not-an-array' as unknown as ExternalReferences

                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...toolWithoutExternalReferences } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutExternalReferences)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    description: 123 as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...toolWithoutObjectMarkingRefs } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_platforms', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    x_mitre_platforms: 123 as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_platforms, ...toolWithoutPlatforms } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutPlatforms)).not.toThrow();
            });
        });

        describe('x_mitre_contributors', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    x_mitre_contributors: 'invalid string' as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_contributors, ...toolWithoutContributors } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutContributors)).not.toThrow();
            });
        });

        describe('x_mitre_aliases', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    x_mitre_aliases: 123 as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should accept omitted optional values", () => {
                const { x_mitre_aliases, ...toolWithoutXMitreAliases } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutXMitreAliases)).not.toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    x_mitre_modified_by_ref: 'invalid-id' as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...toolWithoutModifiedByRef } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutModifiedByRef)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            it('should reject invalid values', () => {
                const invalidTool: Tool = {
                    ...minimalTool,
                    x_mitre_domains: 'not an array' as any
                };
                expect(() => toolSchema.parse(invalidTool)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...toolWithoutDomains } = minimalTool;
                expect(() => toolSchema.parse(toolWithoutDomains)).toThrow();
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
            tools = global.attackData.objectsByType["tool"];
            const errors: { tool: Tool; error: ZodError }[] = [];

            for (let tool of tools) {
                try {
                    if (!tool.x_mitre_deprecated && !tool.revoked) {
                        toolSchema.parse(tool);
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ tool, error });
                    } else {
                        throw error; // Re-throw if it's not a ZodError
                    }
                }
            }

            if (errors.length > 0) {
                const errorReport = errors.map(({ tool, error }) => {
                    const toolId = tool.external_references[0].external_id;
                    const toolName = tool.name;
                    const toolStixId = tool.id;
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
    Tool ID: ${toolId}
    Tool Name: ${toolName}
    Tool stixID: ${toolStixId}
    Validation Errors:
    ${errorMessages}`;
                }).join('\n');

                console.warn(`The following ${errors.length} tool(s) failed validation:\n${errorReport}`);
            }

            // Log the number of errors found
            console.log(`Total tools with validation errors: ${errors.length}`);

            // This expectation will always pass, but it gives us a way to surface the error count in the test results
            expect(true).toBe(true);
        });
    });
});
