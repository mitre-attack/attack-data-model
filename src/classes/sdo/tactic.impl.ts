import type { Tactic } from '../../schemas/sdo/tactic.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class TacticImpl extends AttackBaseImpl {

    constructor(readonly tactic: Tactic) {
        super();
        Object.assign(this, tactic);
    }
}

export interface TacticImpl extends Tactic { }