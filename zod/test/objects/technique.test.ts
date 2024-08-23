import { log, error } from "console";
import { Technique, techniqueSchema } from '../../src/schemas/sdo/technique.schema';
import { Name, StixCreatedTimestamp, StixModifiedTimestamp, StixSpecVersion, StixType, XMitreDomains } from '../../src/schemas/common';
import { v4 as uuidv4 } from 'uuid';


describe('TechniqueSchema', () => {
    let techniques: any[];

    beforeAll(() => {
        techniques = global.attackData.objectsByType['attack-pattern'];
    });

    describe('Valid Inputs', () => {
        it('should accept minimal valid object (only required fields)', () => {
            const minimalTechnique = {
                id: `attack-pattern--${uuidv4()}`,
                type: 'attack-pattern' as StixType,
                spec_version: '2.1' as StixSpecVersion,
                created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
                modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
                name: 'Test Technique' as Name,
                x_mitre_attack_spec_version: '2.1.0',
                x_mitre_version: '1.0',
                x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
                x_mitre_is_subtechnique: false,
                external_references: [{
                    source_name: 'mitre-attack',
                    external_id: 'T1234'
                }]
            };
            expect(() => techniqueSchema.parse(minimalTechnique)).not.toThrow();
        });

        it('should accept fully populated valid object (required + optional fields)', () => {
            const fullTechnique = techniques.find(t =>
                t.description &&
                t.kill_chain_phases &&
                t.x_mitre_detection &&
                t.x_mitre_platforms
            );
            expect(fullTechnique).toBeDefined();
            expect(() => techniqueSchema.parse(fullTechnique)).not.toThrow();
        });
    });

    describe('Field-Specific Tests', () => {
        // Testing a few key fields as examples

        describe('id', () => {
            it('should accept valid values', () => {
                const validStixId = `attack-pattern--${uuidv4()}`;
                const validTechnique = {
                    ...techniques[0],
                    id: validStixId
                };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = { ...techniques[0], id: 'invalid-id' };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omittance of required values', () => {
                const { id, ...techniqueWithoutId } = techniques[0];
                expect(() => techniqueSchema.parse(techniqueWithoutId)).toThrow();
            });
        });

        describe('x_mitre_is_subtechnique', () => {
            it('should accept valid values', () => {
                const validTechnique = { ...techniques[0], x_mitre_is_subtechnique: true };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = { ...techniques[0], x_mitre_is_subtechnique: 'not a boolean' };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omittance of required values', () => {
                const { x_mitre_is_subtechnique, ...techniqueWithoutSubtechnique } = techniques[0];
                expect(() => techniqueSchema.parse(techniqueWithoutSubtechnique)).toThrow();
            });
        });

        describe('x_mitre_platforms', () => {
            it('should accept valid values', () => {
                const validTechnique = { ...techniques[0], x_mitre_platforms: ['Windows', 'macOS'] };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = { ...techniques[0], x_mitre_platforms: 'Windows' };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omittance of optional values', () => {
                const { x_mitre_platforms, ...techniqueWithoutPlatforms } = techniques[0];
                expect(() => techniqueSchema.parse(techniqueWithoutPlatforms)).not.toThrow();
            });
        });

        // Add more field-specific tests...
    });

    describe('Schema-Level Tests', () => {
        it('should reject unknown properties', () => {
            const techniqueWithUnknownProp = { ...techniques[0], unknownProp: 'test' };
            expect(() => techniqueSchema.parse(techniqueWithUnknownProp)).toThrow();
        });

        it('should validate ATT&CK ID format', () => {
            const validTechnique = {
                ...techniques[0],
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
            };
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();

            const invalidTechnique = {
                ...techniques[0],
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }]
            };
            expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
        });
    });
    describe('Edge Cases and Special Scenarios', () => {

        let enterpriseTechnique: Technique;

        beforeEach(() => {
            enterpriseTechnique = techniqueSchema.parse({
                id: `attack-pattern--${uuidv4()}`,
                type: 'attack-pattern' as StixType,
                spec_version: '2.1' as StixSpecVersion,
                created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
                modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
                name: 'Test Technique' as Name,
                x_mitre_attack_spec_version: '2.1.0',
                x_mitre_version: '1.0',
                x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
                x_mitre_is_subtechnique: false,
                external_references: [{
                    source_name: 'mitre-attack',
                    external_id: 'T1234'
                }],
            });
        });

        it('should validate ATT&CK ID format for techniques and sub-techniques', () => {
            const validTechnique = {
                ...techniques[0],
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
            };
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();

            const validSubTechnique = {
                ...techniques[0],
                x_mitre_is_subtechnique: true,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }]
            };
            expect(() => techniqueSchema.parse(validSubTechnique)).not.toThrow();

            const invalidTechniqueId = {
                ...techniques[0],
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }]
            };
            expect(() => techniqueSchema.parse(invalidTechniqueId)).toThrow();

            const invalidSubTechniqueId = {
                ...techniques[0],
                x_mitre_is_subtechnique: true,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
            };
            expect(() => techniqueSchema.parse(invalidSubTechniqueId)).toThrow();
        });

        // TODO start here
        it('should throw when "x_mitre_system_requirements" detected in non enterprise technique', () => {
            const invalidTechnique = {
                ...enterpriseTechnique,
                x_mitre_domains: ['mobile-attack'] as XMitreDomains,
                x_mitre_system_requirements: ['list', 'of', 'strings']
            }
            expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
        });

        it('should pass when "x_mitre_system_requirements" detected in enterprise technique', () => {
            const validTechnique = {
                ...enterpriseTechnique,
                x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
                x_mitre_system_requirements: ['list', 'of', 'strings']
            }
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
        });

        it('should throw when "x_mitre_permissions_required" detected in non-enterprise technique', () => {
            const invalidTechnique = {
                ...enterpriseTechnique,
                x_mitre_domains: ['mobile-attack'] as XMitreDomains, // <--- should cause exception
                x_mitre_permissions_required: ['Administrator']
            }
            expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
        });

        it('should pass when "x_mitre_permissions_required" detected in enterprise technique', () => {
            const validTechnique = {
                ...enterpriseTechnique,
                x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
                x_mitre_permissions_required: ['Administrator']
            }
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
        });

        it('should throw when "x_mitre_permissions_required" detected in enterprise technique without reference to "privilege-escalation" tactic', () => {
            const invalidTechnique = {
                ...enterpriseTechnique,
                x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
                x_mitre_permissions_required: ['Administrator'],
                kill_chain_phases: [
                    {
                        kill_chain_name: 'mitre-attack',
                        phase_name: 'NOT-privilege-escalation' // <--- should cause exception
                    }],
            }
            expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
        });

        // it('should validate enterprise-only fields', () => {
        //     const nonEnterpriseTechnique = {
        //         ...techniques[0],
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_system_requirements: ['iOS 14']
        //     };
        //     expect(() => techniqueSchema.parse(nonEnterpriseTechnique)).toThrow();
        // });

        // it('should validate tactic-specific enterprise fields', () => {
        //     const validPrivilegeEscalation = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'privilege-escalation' }],
        //         x_mitre_permissions_required: ['User'],
        //         x_mitre_effective_permissions: ['Administrator']
        //     };
        //     expect(() => techniqueSchema.parse(validPrivilegeEscalation)).not.toThrow();

        //     const invalidPrivilegeEscalation = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'execution' }],
        //         x_mitre_permissions_required: ['User']
        //     };
        //     expect(() => techniqueSchema.parse(invalidPrivilegeEscalation)).toThrow();

        //     const validDefenseEvasion = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'defense-evasion' }],
        //         x_mitre_defense_bypassed: ['Application whitelisting']
        //     };
        //     expect(() => techniqueSchema.parse(validDefenseEvasion)).not.toThrow();

        //     const validExecution = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'execution' }],
        //         x_mitre_remote_support: true
        //     };
        //     expect(() => techniqueSchema.parse(validExecution)).not.toThrow();

        //     const validImpact = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'impact' }],
        //         x_mitre_impact_type: ['Integrity']
        //     };
        //     expect(() => techniqueSchema.parse(validImpact)).not.toThrow();
        // });

        // it('should validate mobile-only fields', () => {
        //     const validMobileTechnique = {
        //         ...techniques[0],
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_tactic_type: ['Post-Adversary Device Access']
        //     };
        //     expect(() => techniqueSchema.parse(validMobileTechnique)).not.toThrow();

        //     const invalidMobileTechnique = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         x_mitre_tactic_type: ['Post-Adversary Device Access']
        //     };
        //     expect(() => techniqueSchema.parse(invalidMobileTechnique)).toThrow();
        // });

        // it('should validate x_mitre_data_sources for non-mobile domains', () => {
        //     const validEnterpriseTechnique = {
        //         ...techniques[0],
        //         x_mitre_domains: ['enterprise-attack'],
        //         x_mitre_data_sources: ['Process monitoring']
        //     };
        //     expect(() => techniqueSchema.parse(validEnterpriseTechnique)).not.toThrow();

        //     const invalidMobileTechnique = {
        //         ...techniques[0],
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_data_sources: ['Process monitoring']
        //     };
        //     expect(() => techniqueSchema.parse(invalidMobileTechnique)).toThrow();
        // });
    });
});