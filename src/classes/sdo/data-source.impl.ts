import { DataSource } from '../../schemas/sdo/data-source.schema';

export class DataSourceImpl {
    constructor(readonly dataSource: DataSource) {
        Object.assign(this, dataSource);
    }

    // Additional methods as needed
}

export interface DataSourceImpl extends DataSource { }