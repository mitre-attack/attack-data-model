import axios from 'axios';
import { SDO, SRO } from '../../src/schemas/common/stix-core';
import { StixBundle } from '../../src/schemas/sdo/stix-bundle.schema';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';

export type AttackDomain = 'enterprise' | 'ics' | 'mobile';

export async function fetchAttackData(domain: AttackDomain, version?: string): Promise<StixBundle> {
    let url;
    if (version) {
        url = `${GITHUB_BASE_URL}/${domain}-attack/${domain}-attack-${version}.json`;
    } else {
        // get latest version
        url = `${GITHUB_BASE_URL}/${domain}-attack/${domain}-attack.json`;
    }
    const response = await axios.get<StixBundle>(url);
    return response.data;
}

export function filterObjectsByType(objects: SDO[], type: string | string[]): SDO[] {
    const types = Array.isArray(type) ? type : [type];
    return objects.filter(obj => types.includes(obj.type));
}

export async function getAttackObjects(domains: AttackDomain[] = ['enterprise', 'ics', 'mobile'], version?: string): Promise<{
    bundles: StixBundle[];
    allObjects: SDO[];
    sdos: SDO[];
    sros: SRO[];
    smos: SDO[];
    objectsByType: { [key: string]: SDO[] };
}> {
    const bundles: StixBundle[] = [];
    const allObjects: SDO[] = [];

    for (const domain of domains) {
        const bundle = await fetchAttackData(domain, version);
        bundles.push(bundle);
        allObjects.push(...bundle.objects);
    }

    const sdos = allObjects.filter(obj => !['relationship', 'marking-definition'].includes(obj.type));
    const sros = filterObjectsByType(allObjects, 'relationship') as SRO[];
    const smos = filterObjectsByType(allObjects, 'marking-definition');

    const objectTypes = [...new Set(allObjects.map(obj => obj.type))];
    const objectsByType: { [key: string]: SDO[] } = {};

    for (const type of objectTypes) {
        objectsByType[type] = filterObjectsByType(allObjects, type);
    }

    // Special case for software
    objectsByType['software'] = [
        ...filterObjectsByType(allObjects, 'tool'),
        ...filterObjectsByType(allObjects, 'malware')
    ];

    return { bundles, allObjects, sdos, sros, smos, objectsByType };
}