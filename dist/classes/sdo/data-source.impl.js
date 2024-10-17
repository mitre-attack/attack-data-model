/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class DataSourceImpl extends AttackBaseImpl {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
        Object.assign(this, dataSource);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=data-source.impl.js.map