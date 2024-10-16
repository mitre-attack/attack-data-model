import { attackDomainSchema, type AttackDomain } from '../index.js';
import { fetchAttackVersions } from './fetch-attack-versions.js';

export type ParsingMode = 'strict' | 'relaxed';

export type DataSourceOptions =
  | {
      source: 'attack';
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

/**
 * Represents a data source registration with validation logic.
 */
export class DataSourceRegistration {
  /**
   * Creates a new DataSourceRegistration instance.
   * @param options - The data source options to register.
   */
  constructor(public readonly options: DataSourceOptions) {
    this.validateOptions();
  }

  /**
   * Validates the data source options to ensure the correct fields are provided for each source type.
   * @throws An error if validation fails.
   */
  private async validateOptions(): Promise<void> {
    const { source, parsingMode } = this.options;

    // Validate parsing mode
    if (parsingMode && !['strict', 'relaxed'].includes(parsingMode)) {
      throw new Error(`Invalid parsingMode: ${parsingMode}. Expected 'strict' or 'relaxed'.`);
    }

    switch (source) {
      case 'attack': {
        await this.validateAttackOptions();
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
        throw new Error(`Unsupported data source type: ${source}`);
      }
    }
  }

  /**
   * Validates options specific to the 'attack' source type.
   * @throws An error if validation fails.
   */
  private async validateAttackOptions(): Promise<void> {
    const { domain, version } = this.options as { domain: AttackDomain; version?: string };

    // Validate domain
    if (!domain || !Object.values(attackDomainSchema.enum).includes(domain)) {
      throw new Error(
        `Invalid domain provided for 'attack' source. Expected one of: ${Object.values(
          attackDomainSchema.enum,
        ).join(', ')}`,
      );
    }

    // Validate version if provided
    if (version) {
      const supportedVersions = await fetchAttackVersions();
      const normalizedVersion = version.replace(/^v/, ''); // Remove leading 'v' if present
      if (!supportedVersions.includes(normalizedVersion)) {
        throw new Error(
          `Invalid version: ${version}. Supported versions are: ${supportedVersions.join(', ')}`,
        );
      }
    }
  }

  /**
   * Validates options specific to the 'file' source type.
   * @throws An error if validation fails.
   */
  private validateFileOptions(): void {
    const { path } = this.options as { path: string };
    if (!path) {
      throw new Error("The 'file' source requires a 'path' field to specify the file location.");
    }
  }
}
