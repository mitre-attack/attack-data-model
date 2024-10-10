import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { StixBundle, stixBundleSchema, AttackObject } from './schemas/sdo/stix-bundle.schema';
import { DataRegistration } from './data-sources/data-registration';
import { AttackDataModel } from './classes/attack-data-model';

// Initializes the custom ZodErrorMap
import './errors';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';
const CACHE_DIR = path.resolve(__dirname, '../.cached_stix_data');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const fileExists = promisify(fs.exists);

interface DataSourceMap {
    [key: string]: {
        id: string;
        model: AttackDataModel
    };
}

// Data structure to track registered data sources
const dataSources: DataSourceMap = {};

/**
 * Registers a new data source by fetching and caching ATT&CK data based on the provided options.
 * Generates a unique ID for each registered data source.
 * 
 * @param registration - A DataRegistration object containing the source, domain, version, etc.
 * @returns The unique ID of the registered data source.
 */
export async function registerDataSource(registration: DataRegistration): Promise<string> {
    const { source } = registration.options;

    let rawData: StixBundle;
    let uniqueId = uuidv4(); // Generate a unique ID for the data source

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

    const parsedAttackObjects = parseStixBundle(rawData);
    const model = new AttackDataModel(uniqueId, parsedAttackObjects);

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
    url += version ? `${domain}-${version}.json` : `${domain}.json`;

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
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data) as StixBundle;
    } catch (error) {
        throw new Error(`Failed to read or parse file at ${filePath}: ${error.message}`);
    }
}

/**
 * Parses raw STIX bundles and validates the objects.
 * 
 * @param rawData - The raw StixBundle to parse.
 * @returns The list of parsed STIX objects.
 */
function parseStixBundle(rawData: StixBundle): AttackObject[] {
    const errors: string[] = [];

    try {
        // Validate the entire STIX bundle using the Zod schema
        const parsedBundle = stixBundleSchema.parse(rawData);

        // Return the objects from the parsed STIX bundle
        return parsedBundle.objects;

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Collect validation errors from Zod
            error.issues.forEach((issue) => {
                errors.push(`Error: Path - ${issue.path.join('.')}, Message - ${issue.message}`);
            });
            console.warn(errors.join('\n\n'));  // Log validation errors, but continue
        } else {
            throw new Error(`Unexpected error during STIX bundle parsing: ${error.message}`);
        }
    }

    // In case of errors, return an empty array
    return [];
}


/**
 * Returns the registered data source by its unique ID.
 * 
 * @param id - The unique ID of the source to retrieve.
 * @returns The corresponding AttackDataModel instance.
 */
export function load(id: string): AttackDataModel {
    const dataSource = dataSources[id];
    if (!dataSource) {
        throw new Error(`Data source with ID ${id} not found.`);
    }
    return dataSource.model;
}