/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Mitigation } from '../../schemas/sdo/mitigation.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MitigationImpl extends AttackBaseImpl {
  constructor(readonly mitigation: Mitigation) {
    super();
    Object.assign(this, mitigation);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MitigationImpl extends Mitigation {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
