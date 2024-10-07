import { v4 as uuidv4 } from 'uuid';
import { Technique, techniqueSchema, KillChainPhase, XMitreDataSources, XMitrePermissionsRequired, XMitreSystemRequirements, XMitreDetection, XMitreEffectivePermissions, XMitreNetworkRequirements } from '../../src/schemas/sdo/technique.schema';
import { Description, ExternalReferences, StixCreatedTimestamp, StixIdentifier, StixModifiedTimestamp, XMitreContributors, XMitreDeprecated, xMitreIdentity, XMitreModifiedByRef, XMitrePlatforms } from '../../src/schemas/common';
import { ZodError } from "zod";


describe('TechniqueSchema', () => {

    let minimalTechnique: Technique;

    beforeAll(() => {

        minimalTechnique = {
            id: `attack-pattern--${uuidv4()}`,
            type: "attack-pattern",
            spec_version: '2.1',
            created: '2021-01-01T00:00:00.000Z' as StixCreatedTimestamp,
            modified: '2021-01-01T00:00:00.000Z' as StixModifiedTimestamp,
            name: 'Test Technique',
            x_mitre_attack_spec_version: '2.1.0',
            x_mitre_version: '1.0',
            x_mitre_domains: ['enterprise-attack'],
            x_mitre_is_subtechnique: false,
            external_references: [
                {
                    source_name: 'mitre-attack',
                    external_id: 'T1234'
                }
            ]
        };
    });

    describe('True Positive Tests', () => {
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
                description: 'Test description',
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'defense-evasion' }
                ],
                x_mitre_detection: 'Test detection',
                x_mitre_platforms: ['Windows', 'macOS'],
                x_mitre_data_sources: ['Process: Process Creation'],
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'],
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'],
                x_mitre_defense_bypassed: ['Application Control', 'Anti-virus'],
                x_mitre_network_requirements: true,
                x_mitre_deprecated: false,
                x_mitre_modified_by_ref: xMitreIdentity
            };

            expect(() => techniqueSchema.parse(defenseEvasionTechnique)).not.toThrow();
        });

        it('should accept a fully populated execution technique', () => {
            const executionTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description',
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'execution' }
                ],
                x_mitre_detection: 'Test detection',
                x_mitre_platforms: ['Windows', 'macOS'],
                x_mitre_data_sources: ['Process: Process Creation'],
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'],
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'],
                x_mitre_remote_support: true,
                x_mitre_network_requirements: true,
                x_mitre_deprecated: false,
                x_mitre_modified_by_ref: xMitreIdentity
            };

            expect(() => techniqueSchema.parse(executionTechnique)).not.toThrow();
        });

        it('should accept a fully populated impact technique', () => {
            const impactTechnique: Technique = {
                ...minimalTechnique,
                description: 'Test description',
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'impact' }
                ],
                x_mitre_detection: 'Test detection',
                x_mitre_platforms: ['Windows', 'macOS'],
                x_mitre_data_sources: ['Process: Process Creation'],
                x_mitre_contributors: ['Contributor 1', 'Contributor 2'],
                x_mitre_system_requirements: ['Requirement 1', 'Requirement 2'],
                x_mitre_impact_type: ['Integrity', 'Availability'],
                x_mitre_network_requirements: true,
                x_mitre_deprecated: false,
                x_mitre_modified_by_ref: xMitreIdentity
            };

            expect(() => techniqueSchema.parse(impactTechnique)).not.toThrow();
        });
    });

    describe('True Negative Tests', () => {
    // Testing a few key fields as examples

        describe('id', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    id: 'invalid-id' as StixIdentifier // <--- cast to StixIdentifier to test invalid value
                } as Technique;
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { id, ...techniqueWithoutId } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutId)).toThrow();
            });
        });

        describe('type', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    type: 'invalid-type' as any // <--- cast to any to test invalid value
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { type, ...techniqueWithoutType } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutType)).toThrow();
            });
        });

        describe('external_references', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    external_references: 'not-an-array' as unknown as ExternalReferences

                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { external_references, ...techniqueWithoutExternalReferences } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutExternalReferences)).toThrow();
            });
        });

        describe('kill_chain_phases', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    kill_chain_phases: [{ invalid: 'object' }] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { kill_chain_phases, ...techniqueWithoutKillChain } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutKillChain)).not.toThrow();
            });
        });

        describe('description', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    description: 123 as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { description, ...techniqueWithoutDescription } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDescription)).not.toThrow();
            });
        });

        describe('x_mitre_platforms', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_platforms: 123 as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_platforms, ...techniqueWithoutPlatforms } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutPlatforms)).not.toThrow();
            });
        });

        describe('x_mitre_detection', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_detection: 123 as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_detection, ...techniqueWithoutDetection } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDetection)).not.toThrow();
            });
        });

        describe('x_mitre_is_subtechnique', () => {

            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_is_subtechnique: 123 as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_is_subtechnique, ...techniqueWithoutSubtechnique } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutSubtechnique)).toThrow();
            });
        });

        describe('x_mitre_data_sources', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_data_sources: 'invalid string' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_data_sources, ...techniqueWithoutDataSources } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDataSources)).not.toThrow();
            });
        });

        describe('x_mitre_defense_bypassed', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_defense_bypassed: ['Invalid Defense'] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_defense_bypassed, ...techniqueWithoutDefenseBypassed } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDefenseBypassed)).not.toThrow();
            });
        });

        describe('x_mitre_contributors', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_contributors: 'invalid string' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_contributors, ...techniqueWithoutContributors } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutContributors)).not.toThrow();
            });
        });

        describe('x_mitre_permissions_required', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_permissions_required: ['Invalid Permission'] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_permissions_required, ...techniqueWithoutPermissions } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutPermissions)).not.toThrow();
            });
        });

        describe('x_mitre_remote_support', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_remote_support: 'not a boolean' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_remote_support, ...techniqueWithoutRemoteSupport } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutRemoteSupport)).not.toThrow();
            });
        });

        describe('x_mitre_system_requirements', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_system_requirements: 'not an array' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_system_requirements, ...techniqueWithoutSystemRequirements } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutSystemRequirements)).not.toThrow();
            });
        });

        describe('x_mitre_impact_type', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_impact_type: ['Invalid Impact'] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_impact_type, ...techniqueWithoutImpactType } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutImpactType)).not.toThrow();
            });
        });

        describe('x_mitre_effective_permissions', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_effective_permissions: ['Invalid Permission'] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_effective_permissions, ...techniqueWithoutEffectivePermissions } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutEffectivePermissions)).not.toThrow();
            });
        });

        describe('x_mitre_network_requirements', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_network_requirements: 'not a boolean' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_network_requirements, ...techniqueWithoutNetworkRequirements } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutNetworkRequirements)).not.toThrow();
            });
        });

        describe('x_mitre_tactic_type', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_tactic_type: ['Invalid Tactic Type'] as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_tactic_type, ...techniqueWithoutTacticType } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutTacticType)).not.toThrow();
            });
        });

        describe('x_mitre_deprecated', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_deprecated: 'not a boolean' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_deprecated, ...techniqueWithoutDeprecated } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDeprecated)).not.toThrow();
            });
        });

        describe('x_mitre_domains', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_domains: 'not an array' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should reject omitted required values', () => {
                const { x_mitre_domains, ...techniqueWithoutDomains } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutDomains)).toThrow();
            });
        });

        describe('x_mitre_modified_by_ref', () => {
            it('should reject invalid values', () => {
                const invalidTechnique: Technique = {
                    ...minimalTechnique,
                    x_mitre_modified_by_ref: 'invalid-id' as any
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow();
            });

            it('should accept omitted optional values', () => {
                const { x_mitre_modified_by_ref, ...techniqueWithoutModifiedByRef } = minimalTechnique;
                expect(() => techniqueSchema.parse(techniqueWithoutModifiedByRef)).not.toThrow();
            });
        });

        it('should reject unknown properties', () => {
            const techniqueWithUnknownProp: Technique = {
                ...minimalTechnique,
                unknownProp: 'test'
            } as Technique;
            expect(() => techniqueSchema.parse(techniqueWithUnknownProp)).toThrow();
        });
    });

    describe('Schema Refinements', () => {

        let enterpriseTechnique: Technique;
        let mobileTechnique: Technique;

        beforeEach(() => {
            enterpriseTechnique = {
                ...minimalTechnique,
                x_mitre_domains: ['enterprise-attack'],
                external_references: [
                    {
                        source_name: 'mitre-attack',
                        external_id: 'T1234'
                    }
                ],
                kill_chain_phases: [
                    { kill_chain_name: 'mitre-attack', phase_name: 'execution' }
                ]
            };

            mobileTechnique = {
                ...minimalTechnique,
                x_mitre_domains: ['mobile-attack'],
                external_references: [
                    {
                        source_name: 'mitre-attack',
                        external_id: 'T1234'
                    }
                ]
            };
        });

        //==============================================================================
        // Validate external references
        //==============================================================================

        describe('External References Validation', () => {
            it('should reject when ATT&CK ID is missing', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    external_references: [{ source_name: 'mitre-attack' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/ATT&CK ID must be defined/);
            });

            it('should reject invalid ATT&CK ID format for non-subtechnique', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'T123' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/must match the ATT&CK ID format T####/);
            });

            it('should reject invalid ATT&CK ID format for subtechnique', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    x_mitre_is_subtechnique: true,
                    external_references: [{ source_name: 'mitre-attack', external_id: 'T1234' }]
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/must match the ATT&CK ID format T####.###/);
            });
        });

        //==============================================================================
        // Validate Enterprise-only properties
        //==============================================================================

        describe('Enterprise-only Properties Validation', () => {
            const tacticSpecificFields = [
                { field: 'x_mitre_permissions_required', tactic: 'privilege-escalation', value: ['User'] },
                { field: 'x_mitre_effective_permissions', tactic: 'privilege-escalation', value: ['User'] },
                { field: 'x_mitre_defense_bypassed', tactic: 'defense-evasion', value: ['Firewall'] },
                { field: 'x_mitre_remote_support', tactic: 'execution', value: true },
                { field: 'x_mitre_impact_type', tactic: 'impact', value: ['Availability'] }
            ];

            tacticSpecificFields.forEach(({ field, tactic, value }) => {
                it(`should accept ${field} in ${tactic} tactic`, () => {
                    const validTechnique = {
                        ...enterpriseTechnique,
                        [field]: value,
                        kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: tactic }]
                    };
                    expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
                });

                it(`should reject ${field} in wrong tactic`, () => {
                    const invalidTechnique = {
                        ...enterpriseTechnique,
                        [field]: value,
                        kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'different-tactic' }]
                    };
                    expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(new RegExp(`${field} is only supported in the ${tactic} tactic`));
                });
            });

            it('should reject all enterprise-only fields in non-enterprise domain', () => {
                const enterpriseOnlyFields = [
                    { field: 'x_mitre_system_requirements', value: ['Windows 10'] },
                    { field: 'x_mitre_permissions_required', value: ['User'] },
                    { field: 'x_mitre_effective_permissions', value: ['User'] },
                    { field: 'x_mitre_defense_bypassed', value: ['Firewall'] },
                    { field: 'x_mitre_remote_support', value: true },
                    { field: 'x_mitre_impact_type', value: ['Availability'] }
                ];

                enterpriseOnlyFields.forEach(({ field, value }) => {
                    const invalidTechnique = {
                        ...mobileTechnique,
                        [field]: value
                    };
                    expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(
                        new RegExp(`${field} is only supported in the 'enterprise-attack' domain`)
                    );
                });
            });
        });

        //==============================================================================
        // Validate Mobile-only properties
        //==============================================================================

        describe('Mobile-only Properties Validation', () => {
            it('should reject x_mitre_tactic_type in non-mobile domain', () => {
                const invalidTechnique = {
                    ...enterpriseTechnique,
                    x_mitre_tactic_type: ['Post-Adversary Device Access']
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/only supported in the 'mobile-attack' domain/);
            });

            it('should accept x_mitre_tactic_type in mobile domain', () => {
                const validTechnique = {
                    ...mobileTechnique,
                    x_mitre_tactic_type: ['Post-Adversary Device Access']
                };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });

            it('should reject x_mitre_data_sources in mobile domain', () => {
                const invalidTechnique = {
                    ...mobileTechnique,
                    x_mitre_data_sources: ['Some Data Source: Some Component']
                };
                expect(() => techniqueSchema.parse(invalidTechnique)).toThrow(/not supported in the 'mobile-attack' domain/);
            });

            it('should accept x_mitre_data_sources in enterprise domain', () => {
                const validTechnique = {
                    ...enterpriseTechnique,
                    x_mitre_data_sources: ['Some Data Source: Some Component']
                };
                expect(() => techniqueSchema.parse(validTechnique)).not.toThrow();
            });
        });

    });
});