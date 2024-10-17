import { type AttackDomain } from '../index.js';
export type ParsingMode = 'strict' | 'relaxed';
export type DataSourceOptions = {
    source: 'attack';
    domain: AttackDomain;
    version?: string;
    parsingMode?: ParsingMode;
} | {
    source: 'file';
    path: string;
    parsingMode?: ParsingMode;
} | {
    source: 'url';
    url: string;
    parsingMode?: ParsingMode;
} | {
    source: 'taxii';
    url: string;
    parsingMode?: ParsingMode;
};
/**
 * Represents a data source registration with validation logic.
 */
export declare class DataSourceRegistration {
    readonly options: DataSourceOptions;
    /**
     * Creates a new DataSourceRegistration instance.
     * @param options - The data source options to register.
     */
    constructor(options: DataSourceOptions);
    /**
     * Validates the data source options to ensure the correct fields are provided for each source type.
     * @throws An error if validation fails.
     */
    private validateOptions;
    /**
     * Validates options specific to the 'attack' source type.
     * @throws An error if validation fails.
     */
    private validateAttackOptions;
    /**
     * Validates options specific to the 'file' source type.
     * @throws An error if validation fails.
     */
    private validateFileOptions;
}
//# sourceMappingURL=data-source-registration.d.ts.map