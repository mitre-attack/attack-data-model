// src/utils/attack-data.ts

import axios from 'axios';
import { SDO, SRO } from '../../src/schemas/common/stix-core';

// !curl -k https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json -o enterprise-attack.json
// !curl -k https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack.json -o ics-attack.json
// !curl - k https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json -o mobile-attack.json
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';

export type AttackDomain = 'enterprise' | 'ics' | 'mobile';

export async function fetchAttackData(domain: AttackDomain, version?: string): Promise<SDO[]> {
    let url;
    if (version) {
        url = `${GITHUB_BASE_URL}/${domain}-attack/${domain}-attack-${version}.json`;
    } else {
        // get latest version
        url = `${GITHUB_BASE_URL}/${domain}-attack/${domain}-attack.json`;
    }
    const response = await axios.get(url);
    return response.data.objects;
}

export function filterObjectsByType(objects: SDO[], type: string | string[]): SDO[] {
    const types = Array.isArray(type) ? type : [type];
    return objects.filter(obj => types.includes(obj.type));
}

export async function getAttackObjects(domains: AttackDomain[] = ['enterprise', 'ics', 'mobile'], version?: string): Promise<{
    allObjects: SDO[];
    sdos: SDO[];
    sros: SRO[];
    smos: SDO[];
    objectsByType: { [key: string]: SDO[] };
}> {
    const allObjects: SDO[] = [];

    for (const domain of domains) {
        const domainObjects = await fetchAttackData(domain, version);
        allObjects.push(...domainObjects);
    }

    const sdos = allObjects.filter(obj => !['relationship', 'marking-definition'].includes(obj.type));
    const sros = filterObjectsByType(allObjects, 'relationship');
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

    return { allObjects, sdos, sros, smos, objectsByType };
}