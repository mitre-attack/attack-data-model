/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class TacticImpl extends AttackBaseImpl {
    constructor(tactic) {
        super();
        this.tactic = tactic;
        Object.assign(this, tactic);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=tactic.impl.js.map