/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Identity } from '../../schemas/sdo/identity.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class IdentityImpl extends AttackBaseImpl {
  constructor(readonly identity: Identity) {
    super();
    Object.assign(this, identity);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IdentityImpl extends Identity {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
