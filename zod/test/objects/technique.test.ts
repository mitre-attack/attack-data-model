import { log, error } from "console";
import { v4 as uuidv4 } from 'uuid';
import { Technique, techniqueSchema, XMitreIsSubtechnique, XMitreRemoteSupport, KillChainPhase, XMitreDataSources, XMitreDefenseBypasses, XMitrePermissionsRequired, XMitreSystemRequirements, XMitreImpactType, XMitreDetection, XMitreEffectivePermissions, XMitreNetworkRequirements } from '../../src/schemas/sdo/technique.schema';
import { Description, ExternalReference, ExternalReferences, Name, StixCreatedTimestamp, StixIdentifier, StixModifiedTimestamp, StixSpecVersion, StixType, stixTypeSchema, XMitreAttackSpecVersion, XMitreContributors, XMitreDeprecated, XMitreDomains, xMitreIdentity, XMitreModifiedByRef, XMitrePlatforms, XMitreVersion } from '../../src/schemas/common';


describe('TechniqueSchema', () => {
    let techniques: any[];

    let minimalTechnique: Technique;

    beforeAll(() => {
        techniques = global.attackData.objectsByType['attack-pattern'];

        minimalTechnique = {
            id: `attack-pattern--${uuidv4()}` as StixIdentifier,
            type: "attack-pattern" as StixType,
            spec_version: '2.1' as StixSpecVersion,
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: 'Test Technique' as Name,
            x_mitre_attack_spec_version: '2.1.0' as XMitreAttackSpecVersion,
            x_mitre_version: '1.0' as XMitreVersion,
            x_mitre_domains: ['enterprise-attack'] as XMitreDomains,
            x_mitre_is_subtechnique: false as XMitreIsSubtechnique,
            external_references: [{
                source_name: 'mitre-attack',
                external_id: 'T1234'
            }] as ExternalReferences
        };
    });

    describe('Valid Inputs', () => {
        it('should accept minimal valid object (only required fields)', () => {
            expect(() => techniqueSchema.parse(minimalTechnique)).not.toThrow();
        });

        it('should accept a fully populated privilege-escalation technique', () => {
            const privilegeEscalationTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description' as Description,
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'privilege-escalation' } as KillChainPhase
                ] as KillChainPhase[],
                x_mitre_detection: 'Test detection' as XMitreDetection,
                x_mitre_platforms: ['Windows', 'macOS'] as XMitrePlatforms,
                x_mitre_data_sources: ['Process: Process Creation'] as XMitreDataSources,
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'] as XMitreContributors,
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'] as XMitreSystemRequirements,
                x_mitre_permissions_required: ['User'] as XMitrePermissionsRequired,
                x_mitre_effective_permissions: ['Administrator'] as XMitreEffectivePermissions,
                x_mitre_network_requirements: true as XMitreNetworkRequirements,
                x_mitre_deprecated: false as XMitreDeprecated,
                x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef
            };

            expect(() => techniqueSchema.parse(privilegeEscalationTechnique)).not.toThrow();
        });

        it('should accept a fully populated defense-evasion technique', () => {
            const defenseEvasionTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description' as Description,
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'defense-evasion' } as KillChainPhase
                ] as KillChainPhase[],
                x_mitre_detection: 'Test detection' as XMitreDetection,
                x_mitre_platforms: ['Windows', 'macOS'] as XMitrePlatforms,
                x_mitre_data_sources: ['Process: Process Creation'] as XMitreDataSources,
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'] as XMitreContributors,
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'] as XMitreSystemRequirements,
                x_mitre_defense_bypassed: ['Application Control', 'Anti-virus'] as XMitreDefenseBypasses,
                x_mitre_network_requirements: true as XMitreNetworkRequirements,
                x_mitre_deprecated: false as XMitreDeprecated,
                x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef
            };

            expect(() => techniqueSchema.parse(defenseEvasionTechnique)).not.toThrow();
        });

        it('should accept a fully populated execution technique', () => {
            const executionTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description' as Description,
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'execution' } as KillChainPhase
                ] as KillChainPhase[],
                x_mitre_detection: 'Test detection' as XMitreDetection,
                x_mitre_platforms: ['Windows', 'macOS'] as XMitrePlatforms,
                x_mitre_data_sources: ['Process: Process Creation'] as XMitreDataSources,
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'] as XMitreContributors,
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'] as XMitreSystemRequirements,
                x_mitre_remote_support: true as XMitreRemoteSupport,
                x_mitre_network_requirements: true as XMitreNetworkRequirements,
                x_mitre_deprecated: false as XMitreDeprecated,
                x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef
            };

            expect(() => techniqueSchema.parse(executionTechnique)).not.toThrow();
        });

        it('should accept a fully populated impact technique', () => {
            const impactTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description' as Description,
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'impact' } as KillChainPhase
                ] as KillChainPhase[],
                x_mitre_detection: 'Test detection' as XMitreDetection,
                x_mitre_platforms: ['Windows', 'macOS'] as XMitrePlatforms,
                x_mitre_data_sources: ['Process: Process Creation'] as XMitreDataSources,
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'] as XMitreContributors,
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'] as XMitreSystemRequirements,
                x_mitre_impact_type: ['Integrity', 'Availability'] as XMitreImpactType,
                x_mitre_network_requirements: true as XMitreNetworkRequirements,
                x_mitre_deprecated: false as XMitreDeprecated,
                x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef
            };

            expect(() => techniqueSchema.parse(impactTechnique)).not.toThrow();
        });

        it('should validate existing ATT&CK objects', () => {

            // get the first technique where all required + optional are included
            // spoiler alert: there are none
            //
            // const fullTechnique = techniques.find(t =>
            //     t.description &&
            //     t.kill_chain_phases &&
            //     t.x_mitre_detection &&
            //     t.x_mitre_platforms &&
            //     t.x_mitre_data_sources &&
            //     t.x_mitre_defense_bypassed &&
            //     t.x_mitre_contributors &&
            //     t.x_mitre_permissions_required &&
            //     t.x_mitre_remote_support &&
            //     t.x_mitre_system_requirements &&
            //     t.x_mitre_impact_type &&
            //     t.x_mitre_effective_permissions &&
            //     t.x_mitre_network_requirements &&
            //     t.x_mitre_tactic_type &&
            //     t.x_mitre_deprecated &&
            //     t.x_mitre_modified_by_ref
            // );
            // expect(fullTechnique).toBeDefined();
            // expect(() => techniqueSchema.parse(fullTechnique)).not.toThrow();

            for (let technique of techniques) {
                expect(() => techniqueSchema.parse(technique)).not.toThrow();
            }

        });
    });

    describe('Field-Specific Tests', () => {
        // Testing a few key fields as examples

        describe('id', () => {
            it('should accept valid values', () => {
                const validStixId = `attack-pattern--${uuidv4()}` as StixIdentifier;
                const validTechnique = {
                    ...minimalTechnique,
                    id: validStixId
                };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = {
                    ...minimalTechnique,
                    id: 'invalid-id'
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { id, ...techniqueWithoutId } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutId)).toThrow();
            });
        });

        describe('x_mitre_is_subtechnique', () => {
            it('should accept valid values', () => {
                const validTechnique = {
                    ...minimalTechnique,
                    x_mitre_is_subtechnique: true as XMitreIsSubtechnique,
                    external_references: [{
                        source_name: 'mitre-attack',
                        external_id: 'T1234.001' // <--- must match expected sub-technique format
                    }] as ExternalReferences
                };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = {
                    ...minimalTechnique,
                    x_mitre_is_subtechnique: 'not a boolean'
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_is_subtechnique, ...techniqueWithoutSubtechnique } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutSubtechnique)).toThrow();
            });
        });

        describe('x_mitre_platforms', () => {
            it('should accept valid values', () => {
                const validTechnique = { ...minimalTechnique, x_mitre_platforms: ['Windows', 'macOS'] };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject invalid values', () => {
                const invalidTechnique = { ...minimalTechnique, x_mitre_platforms: 'Windows' };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_platforms, ...techniqueWithoutPlatforms } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutPlatforms)).not.toThrow();
            });
        });

        // Add more field-specific tests...
    });

    describe('Schema-Level Tests', () => {
        it('should reject unknown properties', () => {
            const techniqueWithUnknownProp = {
                ...minimalTechnique,
                unknownProp: 'test'
            };
            expect(() => techniqueSchema.parse(techniqueWithUnknownProp)).toThrow();
        });

        it('should validate ATT&CK ID format', () => {
            const validTechnique = {
                ...minimalTechnique,
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }] as ExternalReference[]
            };
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();

            const invalidTechnique = {
                ...minimalTechnique,
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }] as ExternalReference[]
            };
            expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
        });
    });
    describe('Edge Cases and Special Scenarios', () => {

        let enterpriseTechnique: Technique;

        beforeEach(() => {
            enterpriseTechnique = techniqueSchema.parse(minimalTechnique);
        });

        it('should validate ATT&CK ID format for techniques and sub-techniques', () => {
            const validTechnique = {
                ...enterpriseTechnique,
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
            };
            expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();

            const validSubTechnique = {
                ...enterpriseTechnique,
                x_mitre_is_subtechnique: true,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }]
            };
            expect(() => techniqueSchema.parse(validSubTechnique)).not.toThrow();

            const invalidTechniqueId = {
                ...enterpriseTechnique,
                x_mitre_is_subtechnique: false,
                external_references: [{ source_name: 'mitre-attack', external_id: 'T1234.001' }]
            };
            expect(() => techniqueSchema.parse(invalidTechniqueId)).toThrow();

            const invalidSubTechniqueId = {
                ...enterpriseTechnique,
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
        //         ...minimalTechnique,
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_system_requirements: ['iOS 14']
        //     };
        //     expect(() => techniqueSchema.parse(nonEnterpriseTechnique)).toThrow();
        // });

        // it('should validate tactic-specific enterprise fields', () => {
        //     const validPrivilegeEscalation = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'privilege-escalation' }],
        //         x_mitre_permissions_required: ['User'],
        //         x_mitre_effective_permissions: ['Administrator']
        //     };
        //     expect(() => techniqueSchema.parse(validPrivilegeEscalation)).not.toThrow();

        //     const invalidPrivilegeEscalation = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'execution' }],
        //         x_mitre_permissions_required: ['User']
        //     };
        //     expect(() => techniqueSchema.parse(invalidPrivilegeEscalation)).toThrow();

        //     const validDefenseEvasion = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'defense-evasion' }],
        //         x_mitre_defense_bypassed: ['Application whitelisting']
        //     };
        //     expect(() => techniqueSchema.parse(validDefenseEvasion)).not.toThrow();

        //     const validExecution = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'execution' }],
        //         x_mitre_remote_support: true
        //     };
        //     expect(() => techniqueSchema.parse(validExecution)).not.toThrow();

        //     const validImpact = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'impact' }],
        //         x_mitre_impact_type: ['Integrity']
        //     };
        //     expect(() => techniqueSchema.parse(validImpact)).not.toThrow();
        // });

        // it('should validate mobile-only fields', () => {
        //     const validMobileTechnique = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_tactic_type: ['Post-Adversary Device Access']
        //     };
        //     expect(() => techniqueSchema.parse(validMobileTechnique)).not.toThrow();

        //     const invalidMobileTechnique = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         x_mitre_tactic_type: ['Post-Adversary Device Access']
        //     };
        //     expect(() => techniqueSchema.parse(invalidMobileTechnique)).toThrow();
        // });

        // it('should validate x_mitre_data_sources for non-mobile domains', () => {
        //     const validEnterpriseTechnique = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['enterprise-attack'],
        //         x_mitre_data_sources: ['Process monitoring']
        //     };
        //     expect(() => techniqueSchema.parse(validEnterpriseTechnique)).not.toThrow();

        //     const invalidMobileTechnique = {
        //         ...minimalTechnique,
        //         x_mitre_domains: ['mobile-attack'],
        //         x_mitre_data_sources: ['Process monitoring']
        //     };
        //     expect(() => techniqueSchema.parse(invalidMobileTechnique)).toThrow();
        // });
    });
});