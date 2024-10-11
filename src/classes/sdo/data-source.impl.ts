import { DataSource } from '../../schemas/sdo/data-source.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class DataSourceImpl extends AttackObjectImpl {

    constructor(readonly dataSource: DataSource) {
        super();
        Object.assign(this, dataSource);
    }
}

export interface DataSourceImpl extends DataSource { }