import { registerDataSource, loadDataModel, DataSourceRegistration, AttackDataModel, TechniqueImpl } from '@mitre-attack/attack-data-model';

class RelationshipExplorer {
    private attackDataModel: AttackDataModel;

    async initialize(): Promise<void> {
        console.log('Initializing ATT&CK Relationship Explorer...\n');

        const dataSource = new DataSourceRegistration({
            source: 'attack',
            domain: 'enterprise-attack',
            version: '17.1',
            parsingMode: 'relaxed'
        });

        const uuid = await registerDataSource(dataSource);
        if (!uuid) throw new Error('Failed to register data source');

        this.attackDataModel = loadDataModel(uuid);
        console.log('Data loaded successfully!\n');
    }

    // We'll add exploration methods here...

    // Returns an array of tactic objects for a given technique
    getTechniqueTactics(technique: any): any[] {
        const killChainPhases = technique.kill_chain_phases || [];
        const tacticShortnames = killChainPhases.map(phase => phase.phase_name);

        const tactics = this.attackDataModel.tactics.filter(
            tactic => tacticShortnames.includes(tactic.x_mitre_shortname)
        );
        return tactics;
    } 

    exploreTechniqueTactics(): void {
        console.log('TECHNIQUE-TACTIC RELATIONSHIPS\n');

        // Find a specific technique
        const technique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1055'
        ) as TechniqueImpl | undefined;
        
        if (!technique) return;

        console.log(`Technique: ${technique.name} (${technique.external_references[0].external_id})`);
        console.log(`Description: ${technique.description.substring(0, 100)}...\n`);

        const tactics = this.getTechniqueTactics(technique);
        console.log(`This technique is used for ${tactics.length} tactical goal(s):`);

        tactics.forEach((tactic, index) => {
            console.log(`${index + 1}. ${tactic.name}`);
            console.log(`   Purpose: ${tactic.description.substring(0, 80)}...\n`);
        });

        console.log('This shows how one technique can serve multiple adversary goals!\n');
    }

    exploreGroupTechniques(): void {
        console.log('GROUP-TECHNIQUE RELATIONSHIPS (Procedures)\n');

        // Find APT1 group
        const apt1 = this.attackDataModel.groups.find(g =>
            g.external_references[0].external_id === 'G0006'
        );

        if (!apt1) return;

        console.log(`Group: ${apt1.name} (${apt1.external_references[0].external_id})`);
        console.log(`Description: ${apt1.description.substring(0, 120)}...\n`);

        // Get techniques used by this group
        const techniques = apt1.getTechniques();
        console.log(`This group uses ${techniques.length} different techniques:`);

        // Show first 5 techniques
        techniques.slice(0, 5).forEach((technique, index) => {
            console.log(`${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`);

            // Find the relationship to get procedure details
            const relationship = this.attackDataModel.relationships.find(rel =>
                rel.source_ref === apt1.id &&
                rel.target_ref === technique.id &&
                rel.relationship_type === 'uses'
            );

            if (relationship && relationship.description) {
                console.log(`   Procedure: ${relationship.description.substring(0, 100)}...`);
            }
            console.log('');
        });

        console.log(`... and ${techniques.length - 5} more techniques\n`);
    }

    exploreSoftwareUsage(): void {
        console.log('SOFTWARE-TECHNIQUE RELATIONSHIPS\n');

        // Find Mimikatz (a well-known tool)
        const mimikatz = this.attackDataModel.tools.find(tool =>
            tool.name.toLowerCase().includes('mimikatz')
        );

        if (!mimikatz) return;

        console.log(`Tool: ${mimikatz.name} (${mimikatz.external_references[0].external_id})`);
        console.log(`Description: ${mimikatz.description.substring(0, 120)}...\n`);

        // Get techniques used by this software
        const techniques = mimikatz.getTechniques();
        console.log(`This tool implements ${techniques.length} techniques:`);

        techniques.forEach((technique, index) => {
            console.log(`${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`);

            // Show which tactics this technique supports
            const tactics = this.getTechniqueTactics(technique);

            console.log(`   Supports tactics: ${tactics.map(t => t.name).join(', ')}\n`);
        });
        const relationships = this.attackDataModel.relationships;

        const mimikatzId = mimikatz.id;

        // Find all "uses" relationships where target is Mimikatz
        const groupUsesMimikatz = relationships.filter(rel =>
            rel.relationship_type === "uses" &&
            rel.target_ref === mimikatzId &&
            rel.source_ref.startsWith("intrusion-set--") // group id prefix
        );

        // Get group objects
        const groupsUsingMimikatz = groupUsesMimikatz.map(rel =>
            this.attackDataModel.groups.find(group => group.id === rel.source_ref)
        ).filter(Boolean); // Remove undefined if any

        console.log(`This tool is used by ${groupsUsingMimikatz.length} groups:`);
        groupsUsingMimikatz.slice(0, 3).forEach((group, index) => {
            console.log(`${index + 1}. ${group.name} (${group.external_references[0].external_id})`);
        });
        console.log('');
    }

    exploreSubtechniqueRelationships(): void {
        console.log('PARENT-SUBTECHNIQUE RELATIONSHIPS\n');

        // Find a parent technique with sub-techniques
        const parentTechnique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1003' &&
            !t.x_mitre_is_subtechnique
        ) as TechniqueImpl | undefined;

        if (!parentTechnique) return;

        console.log(`Parent Technique: ${parentTechnique.name} (${parentTechnique.external_references[0].external_id})`);
        console.log(`Description: ${parentTechnique.description.substring(0, 120)}...\n`);

        // Get sub-techniques
        
        const subTechniques = parentTechnique.getSubTechniques();
        console.log(`This technique has ${subTechniques.length} sub-techniques:`);

        subTechniques.forEach((subTech, index) => {
            console.log(`${index + 1}. ${subTech.name} (${subTech.external_references[0].external_id})`);
            console.log(`   Platforms: ${subTech.x_mitre_platforms?.join(', ') || 'Not specified'}\n`);
        });

        // Navigate back from sub-technique to parent
        if (subTechniques.length > 0) {
            const firstSubTech = subTechniques[0];
            const parentFromChild = firstSubTech.getParentTechnique();

            console.log(`Navigation verification:`);
            console.log(`Sub-technique "${firstSubTech.name}" → Parent: "${parentFromChild?.name}"`);
            console.log(`Bidirectional navigation works!\n`);
        }
    }

    exploreMitigationRelationships(): void {
        console.log('MITIGATION-TECHNIQUE RELATIONSHIPS\n');

        // Find a technique
        const technique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1059'
        );

        if (!technique) return;

        console.log(`Technique: ${technique.name} (${technique.external_references[0].external_id})`);
        console.log(`Description: ${technique.description.substring(0, 120)}...\n`);

        // Get mitigations for this technique
        const mitigations = technique.getMitigations();
        console.log(`This technique can be mitigated by ${mitigations.length} measures:`);

        mitigations.forEach((mitigation, index) => {
            console.log(`${index + 1}. ${mitigation.name} (${mitigation.external_references[0].external_id})`);

            // Find the relationship to get mitigation guidance
            const relationship = this.attackDataModel.relationships.find(rel =>
                rel.source_ref === mitigation.id &&
                rel.target_ref === technique.id &&
                rel.relationship_type === 'mitigates'
            );

            if (relationship && relationship.description) {
                console.log(`   Guidance: ${relationship.description.substring(0, 100)}...\n`);
            }
        });
    }

    exploreTransitiveRelationships(): void {
        console.log('TRANSITIVE RELATIONSHIPS (Group → Software → Techniques)\n');

        // Find a group
        const group = this.attackDataModel.groups.find(g =>
            g.external_references[0].external_id === 'G0016'
        );

        if (!group) return;

        console.log(`Group: ${group.name} (${group.external_references[0].external_id})`);
        console.log(`Description: ${group.description.substring(0, 120)}...\n`);
        
        const relationships = this.attackDataModel.relationships;

        // Get software used by the group
        const softwareUsedByGroup = relationships.filter(rel =>
            rel.relationship_type === "uses" &&
            rel.source_ref === group.id &&
            (
                rel.target_ref.startsWith("malware--") ||
                rel.target_ref.startsWith("tool--")
            )
        );

        // Get software objects
        const allSoftware = [
            ...this.attackDataModel.malware,
            ...this.attackDataModel.tools
        ];
        const software = softwareUsedByGroup.map(rel =>
            allSoftware.find(soft => soft.id === rel.target_ref)
        ).filter(Boolean);

        console.log(`This group uses ${software.length} software tools:`);

        software.slice(0, 3).forEach((soft, index) => {
            console.log(`\n${index + 1}. ${soft.name} (${soft.external_references[0].external_id})`);

            // Get techniques used by this software
            const techniques = soft.getTechniques();
            console.log(`   → Implements ${techniques.length} techniques:`);

            techniques.slice(0, 2).forEach((technique, techIndex) => {
                console.log(`     ${techIndex + 1}. ${technique.name} (${technique.external_references[0].external_id})`);

                // Show tactics supported
                // Show which tactics this technique supports
                const tactics = this.getTechniqueTactics(technique);
                console.log(`        Tactics: ${tactics.map(t => t.name).join(', ')}`);
            });

            if (techniques.length > 2) {
                console.log(`     ... and ${techniques.length - 2} more techniques`);
            }
        });

        console.log(`\nThis shows the relationship chain: Group → Software → Techniques → Tactics\n`);
    }
}

// Initialize and run examples
async function main() {
    const explorer = new RelationshipExplorer();
    await explorer.initialize();

    // We'll add example calls here...
    await explorer.exploreTechniqueTactics();
    await explorer.exploreGroupTechniques();
    await explorer.exploreSoftwareUsage();
    await explorer.exploreSubtechniqueRelationships();
    await explorer.exploreMitigationRelationships();
    await explorer.exploreTransitiveRelationships();

    console.log('Relationship exploration complete!\n');
    console.log('Key takeaways:');
    console.log('   - ATT&CK objects are richly interconnected');
    console.log('   - Relationships carry descriptive context');
    console.log('   - Navigation methods simplify complex queries');
    console.log('   - Transitive relationships reveal attack patterns');
}

main().catch(console.error);
