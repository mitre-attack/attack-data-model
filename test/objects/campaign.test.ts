import { ZodError } from "zod";
import {
    StixCreatedTimestamp,
    StixModifiedTimestamp,
    StixTimestamp,
} from "../../src/schemas/common";
import {
    Campaign,
    campaignSchema,
} from "../../src/schemas/sdo/campaign.schema";
import { v4 as uuidv4 } from "uuid";

describe("campaignSchema", () => {

    let minimalCampaign: Campaign;
    let invalidCampaign: Campaign;

    beforeAll(() => {
        minimalCampaign = {
            type: "campaign",
            id: `campaign--${uuidv4()}`,
            spec_version: "2.1",
            created_by_ref: `identity--${uuidv4()}`,
            created: "2017-05-31T21:32:29.203Z" as StixCreatedTimestamp,
            modified: "2021-02-09T13:58:23.806Z" as StixModifiedTimestamp,
            name: "Operation Dream Job",
            description: "Operation Dream Job was a cyber espionage operation...",
            external_references: [
                {
                    source_name: "mitre-attack",
                    url: "https://attack.mitre.org/campaigns/C0022",
                    external_id: "C0022"
                },
                {
                    source_name: "ESET Lazarus Jun 2020",
                    description: "Breitenbacher, D and Osis, K. (2020, June 17). OPERATION IN(TER)CEPTION: Targeted Attacks Against European Aerospace and Military Companies. Retrieved December 20, 2021.",
                    url: "https://www.welivesecurity.com/wp-content/uploads/2020/06/ESET_Operation_Interception.pdf"
                },
                {
                    source_name: "ClearSky Lazarus Aug 2020",
                    description: "ClearSky Research Team. (2020, August 13). Operation 'Dream Job' Widespread North Korean Espionage Campaign. Retrieved December 20, 2021.",
                    url: "https://www.clearskysec.com/wp-content/uploads/2020/08/Dream-Job-Campaign.pdf"
                }
            ],
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_attack_spec_version: "3.2.0",
            x_mitre_domains: ["enterprise-attack"],
            x_mitre_modified_by_ref:
                "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_deprecated: false,
            revoked: false,
            aliases: ["Operation Dream Job", "Operation North Star", "Operation Interception"],
            first_seen: "2019-09-01T04:00:00.000Z",
            last_seen: "2020-08-01T04:00:00.000Z",
            x_mitre_first_seen_citation: "(Citation: ESET Lazarus Jun 2020)",
            x_mitre_last_seen_citation: "(Citation: ClearSky Lazarus Aug 2020)",
            x_mitre_version: "1.2",
        };
    });

    describe("Valid Inputs", () => {
        it("should accept minimal valid object (only required fields)", () => {
            expect(() => campaignSchema.parse(minimalCampaign)).not.toThrow();
        });

        it("should accept fully populated valid object (required + optional ATT&CK fields)", () => {
            const fullCampaign: Campaign = {
                ...minimalCampaign,
                x_mitre_contributors: ["John Doe", "Jane Smith"]
            };
            expect(fullCampaign).toBeDefined();
            expect(() => campaignSchema.parse(fullCampaign)).not.toThrow();
        });
    });

    describe("Field-Specific Tests", () => {
        describe("id", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    id: "invalid-id" as any,
                }
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { id, ...campaignWithoutId } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutId)).toThrow();
            });
        });

        describe("type", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    type: "invalid-type" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { type, ...campaignWithoutType } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutType)).toThrow();
            });
        });

        describe('description', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    description: 123 as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { description, ...campaignWithoutDescription } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutDescription)).toThrow();
            });
        });

        describe('external_references', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    external_references: 'not-an-array' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...campaignWithoutExternalReferences } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutExternalReferences)).toThrow();
            });
        });

        describe("created_by_ref", () => {
            let invalidCampaign1: Campaign;
            let invalidCampaign2: Campaign;
            beforeEach(() => {
                invalidCampaign1 = {
                    ...minimalCampaign,
                    created_by_ref: "invalid-created-by-ref" as any,
                };
                invalidCampaign2 = {
                    ...minimalCampaign,
                    created_by_ref: `malware--${uuidv4()}` as any
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign1)).toThrow();
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign2)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { created_by_ref, ...campaignWithoutCreatedByRef } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutCreatedByRef)).toThrow();
            });
        });

        describe('object_marking_refs', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    object_marking_refs: ['invalid-object-marking-refs'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { object_marking_refs, ...campaignWithoutObjectMarkingRefs } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutObjectMarkingRefs)).toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_domains: ['invalid-mitre-domains'] as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...campaignWithoutDomains } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_modified_by_ref: 'invalid-modified-by-ref' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_modified_by_ref, ...campaignWithoutModifiedByRef } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutModifiedByRef)).toThrow();
            });
        });

        describe('x_mitre_contributors', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_contributors: 'not-an-array' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_contributors, ...campaignWithoutContributors } = invalidCampaign;
                expect(() => campaignSchema.parse(campaignWithoutContributors)).not.toThrow();
            });
        });

        describe('aliases', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    aliases: 'not-an-array' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { aliases, ...campaignWithoutAliases } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutAliases)).toThrow();
            });
        });

        describe("first_seen", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    first_seen: "2017-05-31" as StixTimestamp,
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { first_seen, ...campaignWithoutFirstSeen } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutFirstSeen)).toThrow();
            });
        });

        describe("last_seen", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    last_seen: "2017-05-31" as StixTimestamp,
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { last_seen, ...campaignWithoutLastSeen } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutLastSeen)).toThrow();
            });
        });

        describe("x_mitre_first_seen", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_first_seen_citation: "invalid-citation" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_first_seen_citation, ...campaignWithoutXMitreFirstSeen } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutXMitreFirstSeen)).toThrow();
            });
        });

        describe("x_mitre_last_seen", () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_last_seen_citation: "invalid-citation" as any,
                };
            });

            it("should reject invalid values", () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it("should reject omittance of required values", () => {
                const { x_mitre_last_seen_citation, ...campaignWithoutXMitreLastSeen } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutXMitreLastSeen)).toThrow();
            });
        });

        describe('x_mitre_deprecated', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_deprecated: 'not-a-boolean' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it('should reject omittance of required values', () => {
                const { x_mitre_deprecated, ...campaignWithoutDeprecated } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutDeprecated)).toThrow();
            });
        });

        describe('revoked', () => {
            beforeEach(() => {
                invalidCampaign = {
                    ...minimalCampaign,
                    revoked: 'not-a-boolean' as any
                };
            });

            it('should reject invalid values', () => {
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
            });

            it('should reject omittance of required values', () => {
                const { revoked, ...campaignWithoutRevoked } = minimalCampaign;
                expect(() => campaignSchema.parse(campaignWithoutRevoked)).toThrow();
            });
        });
    });

    describe('Schema Refinements', () => {
        describe('aliases Validation', () => {
            it('should reject when first alias does not match object name', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    aliases: ["Operation Interception"]
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`The first alias must match the object's name`);
            });
        });

        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'C123' }]
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`The first external_reference must match the ATT&CK ID format C####}.`);
            });
        });

        describe('First Seen Citation Validation', () => {
            it('should reject if citation not found in external references', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_first_seen_citation: "(Citation: Not in External Reference)"
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Citation Not in External Reference not found in external_references.`);
            });

            it('should reject invalid Citation format', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_first_seen_citation: '(Citation: Name1), (Citation: Name2)'
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Must be one or more citations in the form '(Citation: <Citation Name>)' without any separators`);
            });

            it('should reject campaign with empty citation string', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_first_seen_citation: ""
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Must be one or more citations in the form '(Citation: <Citation Name>)' without any separators`);
            });
        });

        describe('Last Seen Citation Validation', () => {
            it('should reject if citation not found in external references', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_last_seen_citation: "(Citation: Not in External Reference)"
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Citation Not in External Reference not found in external_references.`);
            });

            it('should reject invalid Citation format', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_last_seen_citation: '(Citation: Name1), (Citation: Name2)'
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Must be one or more citations in the form '(Citation: <Citation Name>)' without any separators`);
            });

            it('should reject campaign with empty citation string', () => {
                const invalidCampaign = {
                    ...minimalCampaign,
                    x_mitre_last_seen_citation: ""
                };
                expect(() => campaignSchema.parse(invalidCampaign)).toThrow(`Must be one or more citations in the form '(Citation: <Citation Name>)' without any separators`);
            });
        });
    });

    describe("Schema-Level Tests", () => {
        beforeEach(() => {
            invalidCampaign = {
                ...minimalCampaign,
                unknown_property: true
            } as Campaign;
        });

        it('should reject unknown properties', () => {
            expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
        });
    });

    describe("Edge Cases and Special Scenarios", () => {
        it("should handle special case X", () => {
            // Test any schema-specific special cases
        });
    });
});