import { Mitigation } from '../../schemas/sdo/mitigation.schema';

export class MitigationImpl {
    constructor(readonly mitigation: Mitigation) {
        Object.assign(this, mitigation);
    }

    // Additional methods as needed
}

export interface MitigationImpl extends Mitigation { }