import { Tactic } from '../../schemas/sdo/tactic.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class TacticImpl extends AttackObjectImpl {

    constructor(readonly tactic: Tactic) {
        super();
        Object.assign(this, tactic);
    }
}

export interface TacticImpl extends Tactic { }