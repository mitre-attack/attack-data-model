// Enum to specify valid domains
export enum AttackDomain {
    ENTERPRISE = 'enterprise-attack',
    MOBILE = 'mobile-attack',
    ICS = 'ics-attack',
}

// Union type for DataSourceOptions, where 'attack' source requires a domain
export type DataSourceOptions =
    | {
        source: 'attack';
        domain: AttackDomain;
        version?: string;
    }
    | {
        source: 'file';
        path: string;
    }
    | {
        source: 'url';
        url: string;
    }
    | {
        source: 'taxii';
        url: string;
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
        const { source } = this.options;

        switch (source) {
            case 'attack': {
                const { domain } = this.options as { domain: AttackDomain };
                if (!domain || !Object.values(AttackDomain).includes(domain)) {
                    throw new Error(
                        `Invalid domain provided for 'attack' source. Expected one of: ${Object.values(
                            AttackDomain
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
