import type { DataSource } from '../../schemas/sdo/data-source.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export declare class DataSourceImpl extends AttackBaseImpl {
    readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
}
export interface DataSourceImpl extends DataSource {
}
//# sourceMappingURL=data-source.impl.d.ts.map