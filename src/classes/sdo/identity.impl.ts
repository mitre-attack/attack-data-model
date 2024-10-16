import type { Identity } from '../../schemas/sdo/identity.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class IdentityImpl extends AttackBaseImpl {
  constructor(readonly identity: Identity) {
    super();
    Object.assign(this, identity);
  }
}

export interface IdentityImpl extends Identity {}
