# Understanding ATT&CK Relationships

**Master navigation between related ATT&CK objects**

ATT&CK's power comes from the rich relationships between techniques, tactics, groups, software, and mitigations. In this tutorial, you'll learn to navigate these connections to uncover threat intelligence insights and build comprehensive security analysis capabilities.

## What You'll Learn

By the end of this tutorial, you'll understand how to:

- Navigate technique-to-tactic relationships
- Explore group-to-technique connections (procedures)
- Discover software usage patterns
- Find mitigations for specific techniques
- Work with parent/sub-technique hierarchies
- Trace transitive relationships across object types

## Prerequisites

Complete the previous tutorials:

- **[Your First ATT&CK Query](./your-first-query)**
- **[Building a Technique Browser](./technique-browser)**

## Step 1: Set Up Your Relationship Explorer

Create a new project:

```bash
mkdir attack-relationships
cd attack-relationships
npm init -y
npm install @mitre-attack/attack-data-model
npm install -D typescript tsx @types/node
```

Create `relationship-explorer.ts`:

```typescript
import { registerDataSource, loadDataModel, DataSource, AttackDataModel } from '@mitre-attack/attack-data-model';

class RelationshipExplorer {
    private attackDataModel: AttackDataModel;

    async initialize(): Promise<void> {
        console.log('🔗 Initializing ATT&CK Relationship Explorer...\n');

        const dataSource = new DataSource({
            source: 'attack',
            domain: 'enterprise-attack',
            version: '15.1',
            parsingMode: 'relaxed'
        });

        const uuid = await registerDataSource(dataSource);
        if (!uuid) throw new Error('Failed to register data source');

        this.attackDataModel = loadDataModel(uuid);
        console.log('✅ Data loaded successfully!\n');
    }

    // We'll add exploration methods here...
}

// Initialize and run examples
async function main() {
    const explorer = new RelationshipExplorer();
    await explorer.initialize();

    // We'll add example calls here...
}

main().catch(console.error);
```

## Step 2: Explore Technique-Tactic Relationships

Add this method to understand how techniques map to tactical goals:

```typescript
    exploreTechniqueTactics(): void {
        console.log('🎯 TECHNIQUE-TACTIC RELATIONSHIPS\n');

        // Find a specific technique
        const technique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1055'
        );

        if (!technique) return;

        console.log(`📋 Technique: ${technique.name} (${technique.external_references[0].external_id})`);
        console.log(`📝 Description: ${technique.description.substring(0, 100)}...\n`);

        // Get associated tactics
        const tactics = technique.getTactics();
        console.log(`🎯 This technique is used for ${tactics.length} tactical goal(s):`);

        tactics.forEach((tactic, index) => {
            console.log(`${index + 1}. ${tactic.name}`);
            console.log(`   Purpose: ${tactic.description.substring(0, 80)}...\n`);
        });

        console.log('💡 This shows how one technique can serve multiple adversary goals!\n');
    }
```

Add the method call to your main function:

```typescript
    // In main function:
    await explorer.exploreTechniqueTactics();
```

## Step 3: Discover Group-Technique Relationships (Procedures)

Add this method to explore how groups use techniques:

```typescript
    exploreGroupTechniques(): void {
        console.log('👥 GROUP-TECHNIQUE RELATIONSHIPS (Procedures)\n');

        // Find APT1 group
        const apt1 = this.attackDataModel.groups.find(g =>
            g.external_references[0].external_id === 'G0006'
        );

        if (!apt1) return;

        console.log(`🏴 Group: ${apt1.name} (${apt1.external_references[0].external_id})`);
        console.log(`📝 Description: ${apt1.description.substring(0, 120)}...\n`);

        // Get techniques used by this group
        const techniques = apt1.getTechniques();
        console.log(`⚔️  This group uses ${techniques.length} different techniques:`);

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
```

## Step 4: Explore Software Usage Patterns

Add this method to understand software-technique relationships:

```typescript
    exploreSoftwareUsage(): void {
        console.log('💻 SOFTWARE-TECHNIQUE RELATIONSHIPS\n');

        // Find Mimikatz (a well-known tool)
        const mimikatz = this.attackDataModel.tools.find(tool =>
            tool.name.toLowerCase().includes('mimikatz')
        );

        if (!mimikatz) return;

        console.log(`🔧 Tool: ${mimikatz.name} (${mimikatz.external_references[0].external_id})`);
        console.log(`📝 Description: ${mimikatz.description.substring(0, 120)}...\n`);

        // Get techniques used by this software
        const techniques = mimikatz.getTechniques();
        console.log(`⚡ This tool implements ${techniques.length} techniques:`);

        techniques.forEach((technique, index) => {
            console.log(`${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`);

            // Show which tactics this technique supports
            const tactics = technique.getTactics();
            console.log(`   Supports tactics: ${tactics.map(t => t.name).join(', ')}\n`);
        });

        // Find groups that use this software
        const groupsUsingMimikatz = this.attackDataModel.groups.filter(group =>
            group.getAssociatedSoftware().some(software => software.id === mimikatz.id)
        );

        console.log(`👥 This tool is used by ${groupsUsingMimikatz.length} groups:`);
        groupsUsingMimikatz.slice(0, 3).forEach((group, index) => {
            console.log(`${index + 1}. ${group.name} (${group.external_references[0].external_id})`);
        });
        console.log('');
    }
```

## Step 5: Navigate Parent-Child Technique Relationships

Add this method to explore sub-technique hierarchies:

```typescript
    exploreSubtechniqueRelationships(): void {
        console.log('🌳 PARENT-SUBTECHNIQUE RELATIONSHIPS\n');

        // Find a parent technique with sub-techniques
        const parentTechnique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1003' &&
            !t.x_mitre_is_subtechnique
        );

        if (!parentTechnique) return;

        console.log(`👨‍👧‍👦 Parent Technique: ${parentTechnique.name} (${parentTechnique.external_references[0].external_id})`);
        console.log(`📝 Description: ${parentTechnique.description.substring(0, 120)}...\n`);

        // Get sub-techniques
        const subTechniques = parentTechnique.getSubtechniques();
        console.log(`🌿 This technique has ${subTechniques.length} sub-techniques:`);

        subTechniques.forEach((subTech, index) => {
            console.log(`${index + 1}. ${subTech.name} (${subTech.external_references[0].external_id})`);
            console.log(`   Platforms: ${subTech.x_mitre_platforms?.join(', ') || 'Not specified'}\n`);
        });

        // Navigate back from sub-technique to parent
        if (subTechniques.length > 0) {
            const firstSubTech = subTechniques[0];
            const parentFromChild = firstSubTech.getParentTechnique();

            console.log(`🔄 Navigation verification:`);
            console.log(`Sub-technique "${firstSubTech.name}" → Parent: "${parentFromChild?.name}"`);
            console.log(`✅ Bidirectional navigation works!\n`);
        }
    }
```

## Step 6: Discover Mitigation Relationships

Add this method to find defensive measures:

```typescript
    exploreMitigationRelationships(): void {
        console.log('🛡️  MITIGATION-TECHNIQUE RELATIONSHIPS\n');

        // Find a technique
        const technique = this.attackDataModel.techniques.find(t =>
            t.external_references[0].external_id === 'T1059'
        );

        if (!technique) return;

        console.log(`⚔️  Technique: ${technique.name} (${technique.external_references[0].external_id})`);
        console.log(`📝 Description: ${technique.description.substring(0, 120)}...\n`);

        // Get mitigations for this technique
        const mitigations = technique.getMitigations();
        console.log(`🛡️  This technique can be mitigated by ${mitigations.length} measures:`);

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
```

## Step 7: Explore Transitive Relationships

Add this method to trace complex relationship chains:

```typescript
    exploreTransitiveRelationships(): void {
        console.log('🔄 TRANSITIVE RELATIONSHIPS (Group → Software → Techniques)\n');

        // Find a group
        const group = this.attackDataModel.groups.find(g =>
            g.external_references[0].external_id === 'G0016'
        );

        if (!group) return;

        console.log(`👥 Group: ${group.name} (${group.external_references[0].external_id})`);
        console.log(`📝 Description: ${group.description.substring(0, 120)}...\n`);

        // Get software used by the group
        const software = group.getAssociatedSoftware();
        console.log(`💻 This group uses ${software.length} software tools:`);

        software.slice(0, 3).forEach((tool, index) => {
            console.log(`\n${index + 1}. ${tool.name} (${tool.external_references[0].external_id})`);

            // Get techniques used by this software
            const techniques = tool.getTechniques();
            console.log(`   → Implements ${techniques.length} techniques:`);

            techniques.slice(0, 2).forEach((technique, techIndex) => {
                console.log(`     ${techIndex + 1}. ${technique.name} (${technique.external_references[0].external_id})`);

                // Show tactics supported
                const tactics = technique.getTactics();
                console.log(`        Tactics: ${tactics.map(t => t.name).join(', ')}`);
            });

            if (techniques.length > 2) {
                console.log(`     ... and ${techniques.length - 2} more techniques`);
            }
        });

        console.log(`\n💡 This shows the relationship chain: Group → Software → Techniques → Tactics\n`);
    }
```

## Step 8: Run All Relationship Explorations

Update your main function to run all examples:

```typescript
async function main() {
    const explorer = new RelationshipExplorer();
    await explorer.initialize();

    // Run all relationship explorations
    explorer.exploreTechniqueTactics();
    explorer.exploreGroupTechniques();
    explorer.exploreSoftwareUsage();
    explorer.exploreSubtechniqueRelationships();
    explorer.exploreMitigationRelationships();
    explorer.exploreTransitiveRelationships();

    console.log('🎉 Relationship exploration complete!\n');
    console.log('💡 Key takeaways:');
    console.log('   - ATT&CK objects are richly interconnected');
    console.log('   - Relationships carry descriptive context');
    console.log('   - Navigation methods simplify complex queries');
    console.log('   - Transitive relationships reveal attack patterns');
}
```

## Step 9: Run Your Relationship Explorer

Execute your script to see ATT&CK relationships in action:

```bash
npx tsx relationship-explorer.ts
```

You'll see a comprehensive exploration of ATT&CK relationships, showing how different objects connect and relate to each other.

## What You've Learned

In this tutorial, you've mastered:

1. **Technique-Tactic Mapping**: Understanding how techniques serve tactical goals
2. **Procedure Discovery**: Finding how groups use specific techniques
3. **Software Analysis**: Exploring tool capabilities and usage
4. **Hierarchy Navigation**: Working with parent and sub-technique relationships
5. **Mitigation Research**: Discovering defensive measures for techniques
6. **Transitive Relationships**: Tracing complex relationship chains

## Key Relationship Navigation Methods

You've used these essential methods:

- **`getTactics()`**: Find tactics associated with a technique
- **`getTechniques()`**: Get techniques used by groups or software
- **`getSubtechniques()`** / **`getParentTechnique()`**: Navigate technique hierarchies
- **`getMitigations()`**: Find defensive measures for techniques
- **`getAssociatedSoftware()`**: Discover tools used by groups

## Real-World Applications

These relationship navigation skills enable:

- **Threat Intelligence**: Mapping adversary capabilities and behaviors
- **Security Analysis**: Understanding attack patterns and defense priorities
- **Tool Development**: Building comprehensive security platforms
- **Research**: Discovering trends and patterns in adversary tactics

## Advanced Relationship Patterns

Try exploring these patterns on your own:

```typescript
// Find all groups that use a specific technique
const groupsUsingTechnique = attackDataModel.groups.filter(group =>
    group.getTechniques().some(tech => tech.id === specificTechnique.id)
);

// Find techniques that have no mitigations
const unmitigatedTechniques = attackDataModel.techniques.filter(tech =>
    tech.getMitigations().length === 0
);

// Find software used across multiple tactics
const multiTacticSoftware = attackDataModel.tools.filter(tool =>
    new Set(tool.getTechniques().flatMap(tech => tech.getTactics())).size > 3
);
```

## Next Steps

You've completed all tutorials! Now you can:

- **[Apply these skills in How-to Guides](../how-to-guides/)** - Solve specific problems
- **[Explore the Reference Documentation](../reference/)** - Understand the complete API
- **[Read Explanations](../explanation/)** - Learn about design decisions and architecture
- **Build your own applications** using the patterns you've learned

## Troubleshooting

**"Cannot read property of undefined" errors**: Some objects might not have all expected relationships. Always check if methods return empty arrays or null values.

**Performance with large datasets**: Relationship navigation is efficient, but filtering large result sets may take time. Consider caching results for repeated queries.

**Missing relationships**: Remember that ATT&CK data evolves. Some relationships may not exist in all versions or domains.

---

**Congratulations!** You've mastered ATT&CK relationship navigation and completed the tutorial series. You now have the skills to build sophisticated security analysis tools and conduct advanced threat intelligence research!
