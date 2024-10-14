import { attackDomainSchema, type AttackDomain } from "../schemas/index.js";

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

// DataRegistration class with validation logic
export class DataRegistration {
    constructor(public options: DataSourceOptions) {
        // Validate the provided options when an instance is created
        this.validateOptions();
    }

    /**
     * Validates the data source options to ensure the correct fields are provided for each source type.
     * Throws an error if validation fails.
     */
    private validateOptions(): void {
        const { source, parsingMode } = this.options;

        // Validate parsingMode
        if (parsingMode && !['strict', 'relaxed'].includes(parsingMode)) {
            throw new Error(`Invalid parsingMode: ${parsingMode}. Expected 'strict' or 'relaxed'.`);
        }

        switch (source) {
            case 'attack': {
                const { domain } = this.options as { domain: AttackDomain };
                if (!domain || !Object.values(attackDomainSchema.enum).includes(domain)) {
                    throw new Error(
                        `Invalid domain provided for 'attack' source. Expected one of: ${Object.values(
                            attackDomainSchema.enum
                        ).join(', ')}`
                    );
                }
                break;
            }
            case 'file': {
                const { path } = this.options as { path: string };
                if (!path) {
                    throw new Error(
                        "The 'file' source requires a 'path' field to specify the file location."
                    );
                }
                break;
            }
            case 'url':
            case 'taxii': {
                const { url } = this.options as { url: string };
                if (!url) {
                    throw new Error(
                        `The '${source}' source requires a 'url' field to specify the data location.`
                    );
                }
                break;
            }
            default: {
                throw new Error(`Unsupported data source type: ${source}`);
            }
        }
    }
}
