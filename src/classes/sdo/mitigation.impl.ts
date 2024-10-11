import { Mitigation } from '../../schemas/sdo/mitigation.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class MitigationImpl extends AttackObjectImpl {

    constructor(readonly mitigation: Mitigation) {
        super();
        Object.assign(this, mitigation);
    }
}

export interface MitigationImpl extends Mitigation { }