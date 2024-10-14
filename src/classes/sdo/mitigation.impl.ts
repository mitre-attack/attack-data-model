import type { Mitigation } from '../../schemas/sdo/mitigation.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MitigationImpl extends AttackBaseImpl {

    constructor(readonly mitigation: Mitigation) {
        super();
        Object.assign(this, mitigation);
    }
}

export interface MitigationImpl extends Mitigation { }