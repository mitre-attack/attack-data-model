import type { Mitigation } from '../../schemas/sdo/mitigation.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export declare class MitigationImpl extends AttackBaseImpl {
    readonly mitigation: Mitigation;
    constructor(mitigation: Mitigation);
}
export interface MitigationImpl extends Mitigation {
}
//# sourceMappingURL=mitigation.impl.d.ts.map