import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  stixBundleSchema,
  type AttackObject,
  type StixBundle,
} from './schemas/sdo/stix-bundle.schema.js';

import {
  analyticSchema,
  assetSchema,
  campaignSchema,
  collectionSchema,
  dataComponentSchema,
  dataSourceSchema,
  detectionStrategySchema,
  groupSchema,
  identitySchema,
  malwareSchema,
  markingDefinitionSchema,
  matrixSchema,
  mitigationSchema,
  relationshipSchema,
  tacticSchema,
  techniqueSchema,
  toolSchema,
} from './schemas/index.js';

import { AttackDataModel } from './api/attack-data-model.js';
import { attackDomainSchema, type AttackDomain } from './index.js';

export type ParsingMode = 'strict' | 'relaxed';

export type ContentOriginOptions =
  | {
      source: 'mitre';
      domain: AttackDomain;
      version?: string;
      parsingMode?: ParsingMode;
    }
  | {
      source: 'file';
      path: string;
      parsingMode?: ParsingMode;
    }
  | {
      source: 'url';
      url: string;
      parsingMode?: ParsingMode;
    }
  | {
      source: 'taxii';
      url: string;
      parsingMode?: ParsingMode;
    };

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
}

function normalizeVersion(version: string): string {
  return version.replace(/^v/, '');
}

export async function fetchAttackVersions(): Promise<string[]> {
  const url = 'https://api.github.com/repos/mitre-attack/attack-stix-data/releases';

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const releases: GitHubRelease[] = await response.json();

  const versions = releases
    .map((release) => normalizeVersion(release.tag_name))
    .sort((a, b) => {
      const [aMajor, aMinor] = a.split('.').map(Number);
      const [bMajor, bMinor] = b.split('.').map(Number);
      if (bMajor !== aMajor) return bMajor - aMajor;
      return bMinor - aMinor;
    });

  return versions;
}

export class ContentOriginRegistration {
  constructor(public readonly options: ContentOriginOptions) {
    this.validateOptions();
  }

  private async validateOptions(): Promise<void> {
    const { source, parsingMode } = this.options;

    if (parsingMode && !['strict', 'relaxed'].includes(parsingMode)) {
      throw new Error(`Invalid parsingMode: ${parsingMode}. Expected 'strict' or 'relaxed'.`);
    }

    switch (source) {
      case 'mitre': {
        await this.validateMitreOptions();
        break;
      }
      case 'file': {
        this.validateFileOptions();
        break;
      }
      case 'url':
      case 'taxii': {
        throw new Error(`The ${source} source is not implemented yet.`);
      }
      default: {
        throw new Error(`Unsupported content origin type: ${source}`);
      }
    }
  }

  private async validateMitreOptions(): Promise<void> {
    const { domain, version } = this.options as { domain: AttackDomain; version?: string };

    if (!domain || !Object.values(attackDomainSchema.enum).includes(domain)) {
      throw new Error(
        `Invalid domain provided for 'mitre' source. Expected one of: ${Object.values(
          attackDomainSchema.enum,
        ).join(', ')}`,
      );
    }

    if (version) {
      const supportedVersions = await fetchAttackVersions();
      const normalizedVersion = version.replace(/^v/, '');
      if (!supportedVersions.includes(normalizedVersion)) {
        throw new Error(
          `Invalid version: ${version}. Supported versions are: ${supportedVersions.join(', ')}`,
        );
      }
    }
  }

  private validateFileOptions(): void {
    const { path } = this.options as { path: string };
    if (!path) {
      throw new Error("The 'file' source requires a 'path' field to specify the file location.");
    }
  }
}

const readFile = async (path: string): Promise<string> => {
  // Convert bare filesystem paths to file:// URLs for Node.js
  const url =
    path.startsWith('http') || path.startsWith('file:')
      ? path
      : `file://${path.startsWith('/') ? '' : '/'}${path}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to read file: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

// Default GITHUB_BASE_URL
// Note: This can be overridden via GITHUB_BASE_URL environment variable in Node.js
const DEFAULT_GITHUB_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';

function getGitHubBaseUrl(): string {
  // Check if we're in a Node.js environment with environment variables
  try {
    // This will be tree-shaken out in browser builds
    if (typeof process !== 'undefined' && process?.env?.GITHUB_BASE_URL) {
      return process.env.GITHUB_BASE_URL;
    }
  } catch {
    // Ignore errors in browser environment
  }
  return DEFAULT_GITHUB_URL;
}

const GITHUB_BASE_URL = getGitHubBaseUrl();

interface ContentOriginMap {
  [key: string]: {
    id: string;
    model: AttackDataModel;
  };
}

// Data structure to track registered content origins
const contentOrigins: ContentOriginMap = {};

/**
 * Registers a new content origin by fetching and caching ATT&CK data based on the provided options.
 * Generates a unique ID for each registered content origin.
 *
 * @param registration - A ContentOriginRegistration object containing the source, domain, version, etc.
 * @returns The unique ID of the registered content origin.
 */
export async function registerContentOrigin(
  registration: ContentOriginRegistration,
): Promise<string> {
  const { source, parsingMode = 'strict' } = registration.options;

  let rawData: StixBundle;
  const uniqueId = uuidv4(); // Generate a unique ID for the content origin

  switch (source) {
    case 'mitre': {
      const { domain, version } = registration.options;
      rawData = await fetchAttackDataFromGitHub(domain, version);
      break;
    }
    case 'file': {
      const { path } = registration.options;
      rawData = await fetchDataFromFile(path);
      break;
    }
    case 'url':
    case 'taxii': {
      const { url } = registration.options;
      rawData = await fetchDataFromUrl(url);
      break;
    }
    default:
      throw new Error(`Unsupported content origin type: ${source}`);
  }

  console.log('Retrieved data');

  const parsedAttackObjects = parseStixBundle(rawData, parsingMode);
  console.log('Parsed data.');
  console.log(parsedAttackObjects.length);

  const model = new AttackDataModel(uniqueId, parsedAttackObjects);
  console.log('Initialized data model.');

  // Store the model and its unique ID in the contentOrigins map
  contentOrigins[uniqueId] = { id: uniqueId, model };

  return uniqueId; // Return the unique identifier of the content origin
}

/**
 * Fetches ATT&CK data from the MITRE ATT&CK GitHub repository based on the domain and version.
 *
 * @param domain - The ATT&CK domain (e.g., 'enterprise-attack').
 * @param version - The ATT&CK version (e.g., '15.1').
 * @returns A Promise that resolves to a StixBundle.
 */
async function fetchAttackDataFromGitHub(domain: string, version?: string): Promise<StixBundle> {
  let url = `${GITHUB_BASE_URL}/${domain}/`;
  const normalizedVersion = version ? version.replace(/^v/, '') : version; // Remove leading 'v' if present
  url += normalizedVersion ? `${domain}-${normalizedVersion}.json` : `${domain}.json`;

  try {
    const response = await axios.get<StixBundle>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10-second timeout
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

/**
 * Fetches data from a URL and returns it as a StixBundle.
 *
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to a StixBundle.
 */
async function fetchDataFromUrl(url: string): Promise<StixBundle> {
  try {
    const response = await axios.get<StixBundle>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // Set a timeout of 10 seconds
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

/**
 * Fetches data from a file on the local filesystem and returns it as a StixBundle.
 *
 * @param filePath - The path to the file to read.
 * @returns A Promise that resolves to a StixBundle.
 */
async function fetchDataFromFile(filePath: string): Promise<StixBundle> {
  try {
    const data = await readFile(filePath);
    return JSON.parse(data) as StixBundle;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to read or parse file at ${filePath}: ${error.message}`);
    } else {
      throw new Error(`Failed to read or parse file at ${filePath}: ${String(error)}`);
    }
  }
}

/**
 * Parses raw STIX bundles and validates the objects.
 *
 * @param rawData - The raw StixBundle to parse.
 * @returns The list of parsed STIX objects.
 */
function parseStixBundle(rawData: StixBundle, parsingMode: ParsingMode): AttackObject[] {
  const errors: string[] = [];
  const validObjects: AttackObject[] = [];

  // Validate the bundle's top-level properties
  const baseBundleValidationResults = stixBundleSchema
    .pick({
      id: true,
      type: true,
    })
    .loose() // <--- required to let `objects` pass-through without validation (otherwise it gets dropped and the ADM loads an empty list)
    .safeParse(rawData);

  if (!baseBundleValidationResults.success) {
    baseBundleValidationResults.error.issues.forEach((issue) => {
      errors.push(`Error: Path - ${issue.path.join('.')}, Message - ${issue.message}`);
    });

    if (parsingMode === 'strict') {
      throw new Error(`Bundle validation failed:\n${errors.join('\n')}`);
    } else {
      console.warn(`Bundle validation errors:\n${errors.join('\n')}`);
    }
    return []; // Return empty array if bundle itself is invalid
  }

  // Now process each object individually
  const objects = rawData.objects as AttackObject[];
  for (let index = 0; index < objects.length; index++) {
    const obj = objects[index] as AttackObject;
    let objParseResult;

    switch (obj.type) {
      case 'x-mitre-asset':
        objParseResult = assetSchema.safeParse(obj);
        break;
      case 'campaign':
        objParseResult = campaignSchema.safeParse(obj);
        break;
      case 'x-mitre-collection':
        objParseResult = collectionSchema.safeParse(obj);
        break;
      case 'x-mitre-data-component':
        objParseResult = dataComponentSchema.safeParse(obj);
        break;
      case 'x-mitre-data-source':
        objParseResult = dataSourceSchema.safeParse(obj);
        break;
      case 'intrusion-set':
        objParseResult = groupSchema.safeParse(obj);
        break;
      case 'identity':
        objParseResult = identitySchema.safeParse(obj);
        break;
      case 'malware':
        objParseResult = malwareSchema.safeParse(obj);
        break;
      case 'x-mitre-matrix':
        objParseResult = matrixSchema.safeParse(obj);
        break;
      case 'course-of-action':
        objParseResult = mitigationSchema.safeParse(obj);
        break;
      case 'x-mitre-tactic':
        objParseResult = tacticSchema.safeParse(obj);
        break;
      case 'attack-pattern':
        objParseResult = techniqueSchema.safeParse(obj);
        break;
      case 'tool':
        objParseResult = toolSchema.safeParse(obj);
        break;
      case 'marking-definition':
        objParseResult = markingDefinitionSchema.safeParse(obj);
        break;
      case 'relationship':
        objParseResult = relationshipSchema.safeParse(obj);
        break;
      case 'x-mitre-detection-strategy':
        objParseResult = detectionStrategySchema.safeParse(obj);
        break;
      case 'x-mitre-analytic':
        objParseResult = analyticSchema.safeParse(obj);
        break;
      default:
        errors.push(`Unknown object type at index ${index}: ${obj.type}`);
        objParseResult = null;
        break;
    }

    if (objParseResult && objParseResult.success) {
      validObjects.push(objParseResult.data);
    } else {
      if (objParseResult && objParseResult.error) {
        objParseResult.error.issues.forEach((issue) => {
          errors.push(
            `Error: Path - objects.${index}.${issue.path.join('.')}, Message - ${issue.message}`,
          );
        });
      } else {
        errors.push(`Failed to parse object at index ${index}`);
      }

      if (parsingMode === 'relaxed') {
        // Include the original object even if it failed validation
        validObjects.push(obj);
      }
    }
  }

  if (errors.length > 0) {
    if (parsingMode === 'strict') {
      throw new Error(`Validation errors:\n${errors.join('\n')}`);
    } else {
      console.warn(`Validation errors:\n${errors.join('\n')}`);
    }
  }

  return validObjects;
}

/**
 * Returns the data model of the registered content origin, given the content origin's unique ID.
 *
 * @param id - The unique ID of the data model to retrieve.
 * @returns The corresponding AttackDataModel instance.
 */
export function loadDataModel(id: string): AttackDataModel {
  const contentOrigin = contentOrigins[id];
  if (!contentOrigin) {
    throw new Error(`Content origin with ID ${id} not found.`);
  }
  return contentOrigin.model;
}
