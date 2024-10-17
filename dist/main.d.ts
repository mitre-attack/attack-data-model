import { DataSourceRegistration } from './data-sources/data-source-registration.js';
import { AttackDataModel } from './classes/attack-data-model.js';
import './errors';
/**
 * Registers a new data source by fetching and caching ATT&CK data based on the provided options.
 * Generates a unique ID for each registered data source.
 *
 * @param registration - A DataSourceRegistration object containing the source, domain, version, etc.
 * @returns The unique ID of the registered data source.
 */
export declare function registerDataSource(registration: DataSourceRegistration): Promise<string>;
/**
 * Returns the data model of the registered data source, given the data source's unique ID.
 *
 * @param id - The unique ID of the data model to retrieve.
 * @returns The corresponding AttackDataModel instance.
 */
export declare function loadDataModel(id: string): AttackDataModel;
//# sourceMappingURL=main.d.ts.map