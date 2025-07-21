import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { type AttackObject, type StixBundle } from '../../src/schemas/sdo/stix-bundle.schema.js';
import { type Relationship } from '../../src/schemas/sro/relationship.schema.js';
import { type MarkingDefinition } from '../../src/schemas/smo/marking-definition.schema.js';
import {
  attackDomainSchema,
  type AttackDomain,
} from '../../src/schemas/common/common-properties.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';
const CACHE_DIR = path.resolve(__dirname, '../../.cached_stix_data');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const fileExists = promisify(fs.exists);

/**
 * Fetches MITRE ATT&CK data for a specific domain and version.
 *
 * @param domain - The ATT&CK domain to fetch data for (e.g., 'enterprise-attack', 'mobile-attack', 'ics-attack').
 * @param version - Optional. The specific version of ATT&CK data to fetch. If not provided, fetches the latest version.
 * @returns A Promise that resolves to a StixBundle containing the fetched ATT&CK data.
 * @throws Will throw an error if the HTTP request fails.
 */
async function fetchAttackData(domain: AttackDomain, version?: string): Promise<StixBundle> {
  let url = `${GITHUB_BASE_URL}/${domain}/`;
  url += version ? `${domain}-${version}.json` : `${domain}.json`;

  const response = await axios.get<StixBundle>(url);
  return response.data;
}

/**
 * Fetches the cached ATT&CK data or downloads it if not available.
 *
 * @param domain - The ATT&CK domain to fetch data for (e.g., 'enterprise-attack').
 * @param version - The specific version of ATT&CK data.
 * @returns A Promise that resolves to a StixBundle.
 */
async function getCachedOrFetchAttackData(
  domain: AttackDomain,
  version?: string,
): Promise<StixBundle> {
  const fileName = version ? `${domain}-${version}.json` : `${domain}.json`;
  const filePath = path.join(CACHE_DIR, fileName);

  try {
    if (await fileExists(filePath)) {
      const data = await readFile(filePath, 'utf8');
      // console.log(`Successfully read cached file: ${filePath}`);
      try {
        return JSON.parse(data) as StixBundle;
      } catch (parseError) {
        console.error(`Error parsing JSON from cached file: ${filePath}`, parseError);
        throw parseError;
      }
    } else {
      console.log(`Fetching data for ${domain} from remote server`);
      const stixData = await fetchAttackData(domain, version);

      if (!(await fileExists(CACHE_DIR))) {
        await fs.promises.mkdir(CACHE_DIR, { recursive: true });
      }

      await writeFile(filePath, JSON.stringify(stixData, null, 2), 'utf8');
      // console.log(`Successfully cached data for ${domain} at ${filePath}`);
      return stixData;
    }
  } catch (error) {
    console.error(`Error in getCachedOrFetchAttackData for ${domain}:`, error);
    throw error;
  }
}

/**
 * Fetches and processes MITRE ATT&CK data for specified domains.
 *
 * @param domains - An array of ATT&CK domains to fetch data for. Defaults to all domains if not specified.
 * @param version - Optional. The specific version of ATT&CK data to fetch. If not provided, fetches the latest version for each domain.
 * @returns A Promise that resolves to an object containing processed ATT&CK data.
 */
export async function getAttackObjects(
  domains: AttackDomain[] = Object.values(attackDomainSchema.enum),
  version?: string,
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
    const bundle = await getCachedOrFetchAttackData(domain, version);
    bundles.push(bundle);
    allObjects.push(...bundle.objects);
  }

  // Categorize objects into SDOs, SROs, and SMOs
  const sdos = allObjects.filter(
    (obj) => !['relationship', 'marking-definition'].includes(obj.type),
  ) as Exclude<AttackObject, Relationship | MarkingDefinition>[];
  const sros = allObjects.filter((obj) => obj.type === 'relationship') as Relationship[];
  const smos = allObjects.filter((obj) => obj.type === 'marking-definition') as MarkingDefinition[];

  // Group objects by their type
  const objectTypes = [...new Set(allObjects.map((obj) => obj.type))];
  const objectsByType: { [key: string]: AttackObject[] } = {};

  for (const type of objectTypes) {
    objectsByType[type] = allObjects.filter((obj) => obj.type === type);
  }

  // Special case: group 'tool' and 'malware' objects under 'software'
  objectsByType['software'] = [
    ...allObjects.filter((obj) => obj.type === 'tool'),
    ...allObjects.filter((obj) => obj.type === 'malware'),
  ];

  return { bundles, allObjects, sdos, sros, smos, objectsByType };
}
