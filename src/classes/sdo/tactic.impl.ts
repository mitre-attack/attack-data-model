import { Tactic } from '../../schemas/sdo/tactic.schema';

export class TacticImpl {
    constructor(readonly tactic: Tactic) {
        Object.assign(this, tactic);
    }

    // Additional methods as needed
}

export interface TacticImpl extends Tactic { }