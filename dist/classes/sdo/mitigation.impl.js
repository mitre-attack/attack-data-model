/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class MitigationImpl extends AttackBaseImpl {
    constructor(mitigation) {
        super();
        this.mitigation = mitigation;
        Object.assign(this, mitigation);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=mitigation.impl.js.map