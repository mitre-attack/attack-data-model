import { registerDataSource, loadDataModel, DataSourceRegistration } from '@mitre-attack/attack-data-model';

async function loadAllDomains() {
    console.log('Loading all ATT&CK domains...\n');

    // Define all three domains
    type DomainName = "enterprise-attack" | "mobile-attack" | "ics-attack";
    const domains: { name: DomainName; label: string }[] = [
        { name: 'enterprise-attack', label: 'Enterprise' },
        { name: 'mobile-attack', label: 'Mobile' },
        { name: 'ics-attack', label: 'ICS' }
    ];

    const dataModels: { [key: string]: any } = {};

    for (const domain of domains) {
        try {
            console.log(`Loading ${domain.label} domain...`);

            const dataSource = new DataSourceRegistration({
                source: 'attack',
                domain: domain.name,
                version: '17.1',
                parsingMode: 'relaxed'
            });

            const uuid = await registerDataSource(dataSource);
            if (uuid) {
                dataModels[domain.name] = loadDataModel(uuid);
                const techniqueCount = dataModels[domain.name].techniques.length;
                console.log(`${domain.label}: ${techniqueCount} techniques loaded\n`);
            }

        } catch (error) {
            console.error(`Failed to load ${domain.label} domain:`, error);
        }
    }

    return dataModels;
}

function analyzeDomainStatistics(dataModels: { [key: string]: any }) {
    console.log('Domain Comparison:\n');

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

function findCommonTactics(dataModels: { [key: string]: any }) {
    console.log('Tactic Analysis:\n');

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

function analyzeCrossDomainTechniques(dataModels: { [key: string]: any }) {
    console.log('Cross-Domain Technique Analysis:\n');

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
                console.log(`${entTechnique.name}`);
                console.log(`   Enterprise: ${entTechnique.external_references[0].external_id}`);
                console.log(`   Mobile: ${mobTechnique.external_references[0].external_id}\n`);
                similarCount++;
            }
        });
    });

    console.log(`Found ${similarCount} techniques with identical names across domains.\n`);
}

async function performMultiDomainAnalysis() {
    try {
        // Load all domains
        const dataModels = await loadAllDomains();

        if (Object.keys(dataModels).length === 0) {
            console.error('No domains loaded successfully');
            return;
        }

        // Perform various analyses
        analyzeDomainStatistics(dataModels);
        findCommonTactics(dataModels);
        analyzeCrossDomainTechniques(dataModels);

        console.log('Multi-domain analysis complete!');

    } catch (error) {
        console.error('Analysis failed:', error);
    }
}

// Run the analysis
performMultiDomainAnalysis();