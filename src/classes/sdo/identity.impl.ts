import { Identity } from '../../schemas/sdo/identity.schema';

export class IdentityImpl {

    constructor(readonly identity: Identity) {
        Object.assign(this, identity);
    }

    // Additional methods as needed
}

export interface IdentityImpl extends Identity { }