import type { Tactic } from '../../schemas/sdo/tactic.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export declare class TacticImpl extends AttackBaseImpl {
    readonly tactic: Tactic;
    constructor(tactic: Tactic);
}
export interface TacticImpl extends Tactic {
}
//# sourceMappingURL=tactic.impl.d.ts.map