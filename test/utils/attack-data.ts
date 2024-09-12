import axios from 'axios';
import { AttackObject, StixBundle } from '../../src/schemas/sdo/stix-bundle.schema';
import { Relationship } from '../../src/schemas/sro/relationship.schema';
import { MarkingDefinition } from '../../src/schemas/smo/marking-definition.schema';
import { attackDomainSchema, AttackDomain } from '../../src/schemas/common/common-properties';

/**
 * Base URL for the MITRE ATT&CK STIX data on GitHub.
 */
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';

/**
 * Fetches MITRE ATT&CK data for a specific domain and version.
 * 
 * @param domain - The ATT&CK domain to fetch data for (e.g., 'enterprise-attack', 'mobile-attack', 'ics-attack').
 * @param version - Optional. The specific version of ATT&CK data to fetch. If not provided, fetches the latest version.
 * @returns A Promise that resolves to a StixBundle containing the fetched ATT&CK data.
 * @throws Will throw an error if the HTTP request fails.
 */
export async function fetchAttackData(domain: AttackDomain, version?: string): Promise<StixBundle> {
    // Construct the URL based on whether a specific version is requested
    let url = `${GITHUB_BASE_URL}/${domain}/`;
    url += version ? `${domain}-${version}.json` : `${domain}.json`;

    // Fetch the data and return it
    const response = await axios.get<StixBundle>(url);
    return response.data;
}

/**
 * Fetches and processes MITRE ATT&CK data for specified domains.
 * 
 * @param domains - An array of ATT&CK domains to fetch data for. Defaults to all domains if not specified.
 * @param version - Optional. The specific version of ATT&CK data to fetch. If not provided, fetches the latest version for each domain.
 * @returns A Promise that resolves to an object containing processed ATT&CK data.
 */
export async function getAttackObjects(
    domains: AttackDomain[] = Object.values(attackDomainSchema.Enum),
    version?: string
): Promise<{
    bundles: StixBundle[];
    allObjects: AttackObject[];
    sdos: Exclude<AttackObject, Relationship | MarkingDefinition>[];
    sros: Relationship[];
    smos: MarkingDefinition[];
    objectsByType: { [key: string]: AttackObject[] };
}> {
    const bundles: StixBundle[] = [];
    const allObjects: AttackObject[] = [];

    // Fetch data for each specified domain
    for (const domain of domains) {
        const bundle = await fetchAttackData(domain, version);
        bundles.push(bundle);
        allObjects.push(...bundle.objects);
    }

    // Categorize objects into SDOs, SROs, and SMOs
    const sdos = allObjects.filter(obj => !['relationship', 'marking-definition'].includes(obj.type)) as Exclude<AttackObject, Relationship | MarkingDefinition>[];
    const sros = allObjects.filter(obj => obj.type === 'relationship') as Relationship[];
    const smos = allObjects.filter(obj => obj.type === 'marking-definition') as MarkingDefinition[];

    // Group objects by their type
    const objectTypes = [...new Set(allObjects.map(obj => obj.type))];
    const objectsByType: { [key: string]: AttackObject[] } = {};

    for (const type of objectTypes) {
        objectsByType[type] = allObjects.filter(obj => obj.type === type);
    }

    // Special case: group 'tool' and 'malware' objects under 'software'
    objectsByType['software'] = [
        ...allObjects.filter(obj => obj.type === 'tool'),
        ...allObjects.filter(obj => obj.type === 'malware')
    ];

    return { bundles, allObjects, sdos, sros, smos, objectsByType };
}