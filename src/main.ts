import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import {
  type StixBundle,
  type AttackObject,
  extensibleStixBundleSchema,
} from './schemas/sdo/stix-bundle.schema.js';
import {
  techniqueSchema,
  tacticSchema,
  matrixSchema,
  mitigationSchema,
  relationshipSchema,
  dataSourceSchema,
  dataComponentSchema,
  groupSchema,
  malwareSchema,
  toolSchema,
  markingDefinitionSchema,
  identitySchema,
  collectionSchema,
  campaignSchema,
  assetSchema,
} from './schemas/index.js';
import {
  DataSourceRegistration,
  type ParsingMode,
} from './data-sources/data-source-registration.js';
import { AttackDataModel } from './classes/attack-data-model.js';

const readFile = async (path: string): Promise<string> => {
  if (typeof window !== 'undefined') {
    // Browser environment - treat path as URL
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  } else {
    // Node.js environment
    const fs = await import('fs');
    const { promisify } = await import('util');
    const nodeReadFile = promisify(fs.readFile);
    return nodeReadFile(path, 'utf8');
  }
};

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';

interface DataSourceMap {
  [key: string]: {
    id: string;
    model: AttackDataModel;
  };
}

// Data structure to track registered data sources
const dataSources: DataSourceMap = {};

/**
 * Registers a new data source by fetching and caching ATT&CK data based on the provided options.
 * Generates a unique ID for each registered data source.
 *
 * @param registration - A DataSourceRegistration object containing the source, domain, version, etc.
 * @returns The unique ID of the registered data source.
 */
export async function registerDataSource(registration: DataSourceRegistration): Promise<string> {
  const { source, parsingMode = 'strict' } = registration.options;

  let rawData: StixBundle;
  const uniqueId = uuidv4(); // Generate a unique ID for the data source

  switch (source) {
    case 'attack': {
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
      throw new Error(`Unsupported source type: ${source}`);
  }

  console.log('Retrieved data');

  const parsedAttackObjects = parseStixBundle(rawData, parsingMode);
  console.log('Parsed data.');
  console.log(parsedAttackObjects.length);

  const model = new AttackDataModel(uniqueId, parsedAttackObjects);
  console.log('Initialized data model.');

  // Store the model and its unique ID in the dataSources map
  dataSources[uniqueId] = { id: uniqueId, model };

  return uniqueId; // Return the unique identifier of the data source
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
  const baseBundleValidationResults = extensibleStixBundleSchema
    .pick({
      id: true,
      type: true,
      spec_version: true,
    })
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
  const objects = rawData.objects;
  for (let index = 0; index < objects.length; index++) {
    const obj = objects[index];
    let objParseResult: z.SafeParseReturnType<unknown, AttackObject> | null;

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
 * Returns the data model of the registered data source, given the data source's unique ID.
 *
 * @param id - The unique ID of the data model to retrieve.
 * @returns The corresponding AttackDataModel instance.
 */
export function loadDataModel(id: string): AttackDataModel {
  const dataSource = dataSources[id];
  if (!dataSource) {
    throw new Error(`Data source with ID ${id} not found.`);
  }
  return dataSource.model;
}
