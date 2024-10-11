import { Identity } from '../../schemas/sdo/identity.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class IdentityImpl extends AttackObjectImpl {

    constructor(readonly identity: Identity) {
        super();
        Object.assign(this, identity);
    }
}

export interface IdentityImpl extends Identity { }