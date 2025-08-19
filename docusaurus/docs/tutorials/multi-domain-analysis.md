import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Multi-Domain ATT&CK Analysis

<WorkInProgressNotice />

**Learn to work with Enterprise, Mobile, and ICS ATT&CK domains**

In this tutorial, you'll learn how to load and analyze data from multiple ATT&CK domains (Enterprise, Mobile, and ICS). You'll compare techniques across domains and understand how adversary tactics vary between different environments.

## What You'll Build

You'll create a Node.js script that:

- Loads data from all three ATT&CK domains
- Compares technique coverage across domains
- Identifies common and domain-specific tactics
- Demonstrates cross-domain analysis patterns

## Prerequisites

- Completed the [Your First ATT&CK Query](./your-first-query) tutorial
- Basic understanding of ATT&CK domains (Enterprise, Mobile, ICS)

## Step 1: Set Up Multi-Domain Project

Create a new directory for your multi-domain analysis:

```bash
mkdir multi-domain-analysis
cd multi-domain-analysis
npm init -y
npm install @mitre-attack/attack-data-model
npm install -D typescript tsx @types/node
```

## Step 2: Load Multiple ATT&CK Domains

Create a file named `multi-domain.ts` and add the following code:

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

async function loadAllDomains() {
    console.log('🌐 Loading all ATT&CK domains...\n');

    // Define all three domains
    const domains = [
        { name: 'enterprise-attack', label: 'Enterprise' },
        { name: 'mobile-attack', label: 'Mobile' },
        { name: 'ics-attack', label: 'ICS' }
    ];

    const dataModels: { [key: string]: any } = {};

    for (const domain of domains) {
        try {
            console.log(`📡 Loading ${domain.label} domain...`);

            const dataSource = new DataSource({
                source: 'attack',
                domain: domain.name,
                version: '15.1',
                parsingMode: 'relaxed'
            });

            const uuid = await registerDataSource(dataSource);
            if (uuid) {
                dataModels[domain.name] = loadDataModel(uuid);
                const techniqueCount = dataModels[domain.name].techniques.length;
                console.log(`✅ ${domain.label}: ${techniqueCount} techniques loaded\n`);
            }

        } catch (error) {
            console.error(`❌ Failed to load ${domain.label} domain:`, error);
        }
    }

    return dataModels;
}
```

## Step 3: Compare Domain Statistics

Add this function to analyze differences between domains:

```typescript
function analyzeDomainStatistics(dataModels: { [key: string]: any }) {
    console.log('📊 Domain Comparison:\n');

    const stats: { [key: string]: any } = {};

    Object.keys(dataModels).forEach(domain => {
        const model = dataModels[domain];
        stats[domain] = {
            techniques: model.techniques.length,
            tactics: model.tactics.length,
            groups: model.groups.length,
            software: model.malware.length + model.tools.length,
            mitigations: model.mitigations.length
        };
    });

    // Display comparison table
    console.log('| Metric      | Enterprise | Mobile | ICS |');
    console.log('|-------------|------------|--------|-----|');

    const metrics = ['techniques', 'tactics', 'groups', 'software', 'mitigations'];

    metrics.forEach(metric => {
        const enterprise = stats['enterprise-attack']?.[metric] || 0;
        const mobile = stats['mobile-attack']?.[metric] || 0;
        const ics = stats['ics-attack']?.[metric] || 0;

        console.log(`| ${metric.padEnd(11)} | ${String(enterprise).padEnd(10)} | ${String(mobile).padEnd(6)} | ${String(ics).padEnd(3)} |`);
    });

    console.log('\n');
    return stats;
}
```

## Step 4: Find Common Tactics Across Domains

Add this function to identify tactics that appear in multiple domains:

```typescript
function findCommonTactics(dataModels: { [key: string]: any }) {
    console.log('🎯 Tactic Analysis:\n');

    const tacticsByDomain: { [key: string]: Set<string> } = {};

    // Collect tactics from each domain
    Object.keys(dataModels).forEach(domain => {
        tacticsByDomain[domain] = new Set();
        dataModels[domain].tactics.forEach((tactic: any) => {
            tacticsByDomain[domain].add(tactic.x_mitre_shortname);
        });
    });

    // Find common tactics
    const allTactics = new Set<string>();
    Object.values(tacticsByDomain).forEach(domainTactics => {
        domainTactics.forEach(tactic => allTactics.add(tactic));
    });

    console.log('Common tactics across domains:');

    allTactics.forEach(tactic => {
        const domains = Object.keys(tacticsByDomain).filter(domain =>
            tacticsByDomain[domain].has(tactic)
        );

        if (domains.length > 1) {
            const domainLabels = domains.map(d => {
                switch(d) {
                    case 'enterprise-attack': return 'Enterprise';
                    case 'mobile-attack': return 'Mobile';
                    case 'ics-attack': return 'ICS';
                    default: return d;
                }
            }).join(', ');

            console.log(`- ${tactic}: ${domainLabels}`);
        }
    });

    console.log('\n');
}
```

## Step 5: Analyze Cross-Domain Techniques

Add this function to find techniques that may be related across domains:

```typescript
function analyzeCrossDomainTechniques(dataModels: { [key: string]: any }) {
    console.log('🔍 Cross-Domain Technique Analysis:\n');

    // Look for techniques with similar names across domains
    const enterpriseTechniques = dataModels['enterprise-attack']?.techniques || [];
    const mobileTechniques = dataModels['mobile-attack']?.techniques || [];

    console.log('Similar techniques between Enterprise and Mobile:');

    let similarCount = 0;

    enterpriseTechniques.forEach((entTechnique: any) => {
        mobileTechniques.forEach((mobTechnique: any) => {
            // Simple name similarity check
            const entName = entTechnique.name.toLowerCase();
            const mobName = mobTechnique.name.toLowerCase();

            if (entName === mobName) {
                console.log(`📱 ${entTechnique.name}`);
                console.log(`   Enterprise: ${entTechnique.external_references[0].external_id}`);
                console.log(`   Mobile: ${mobTechnique.external_references[0].external_id}\n`);
                similarCount++;
            }
        });
    });

    console.log(`Found ${similarCount} techniques with identical names across domains.\n`);
}
```

## Step 6: Create the Main Analysis Function

Add the main function to orchestrate the analysis:

```typescript
async function performMultiDomainAnalysis() {
    try {
        // Load all domains
        const dataModels = await loadAllDomains();

        if (Object.keys(dataModels).length === 0) {
            console.error('❌ No domains loaded successfully');
            return;
        }

        // Perform various analyses
        analyzeDomainStatistics(dataModels);
        findCommonTactics(dataModels);
        analyzeCrossDomainTechniques(dataModels);

        console.log('✅ Multi-domain analysis complete!');

    } catch (error) {
        console.error('❌ Analysis failed:', error);
    }
}

// Run the analysis
performMultiDomainAnalysis();
```

## Step 7: Run Your Multi-Domain Analysis

Execute your script to see the cross-domain analysis:

```bash
npx tsx multi-domain.ts
```

You should see output comparing the domains, identifying common tactics, and highlighting similar techniques.

## What You've Learned

In this tutorial, you've learned:

1. **How to load multiple ATT&CK domains** simultaneously
2. **How to compare domain statistics** like technique and tactic counts
3. **How to identify common patterns** across different attack environments
4. **How to analyze relationships** between Enterprise, Mobile, and ICS domains
5. **How to structure cross-domain analysis** for comprehensive threat intelligence

## Understanding Multi-Domain ATT&CK

Key insights from multi-domain analysis:

- **Enterprise Domain**: Focuses on traditional IT environments with the most comprehensive technique coverage
- **Mobile Domain**: Specialized for mobile device threats with unique tactics like "Initial Access" through app stores
- **ICS Domain**: Covers industrial control systems with tactics specific to operational technology
- **Common Tactics**: Many fundamental tactics like "Execution" and "Persistence" appear across domains
- **Technique Overlap**: Some techniques have similar names but different implementations across domains

## Next Steps

Now that you understand cross-domain analysis, explore:

- **[Understanding Relationships](./relationships)** - Master ATT&CK object connections
- **[How-to: Handle Performance at Scale](../how-to-guides/performance)** - Optimize for large datasets
- **[Explanation: Why ADM Exists](../explanation/why-adm-exists)** - Understand the project's design rationale

## Common Issues

**Memory usage**: Loading all domains simultaneously can use significant memory. Consider loading domains individually for analysis if you encounter memory limits.

**Network timeouts**: Loading multiple domains requires multiple network requests. Ensure stable internet connectivity.

**Version consistency**: Use the same version number across all domains to ensure compatibility in cross-domain comparisons.

---
