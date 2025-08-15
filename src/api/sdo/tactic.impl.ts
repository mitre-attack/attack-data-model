/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Tactic } from '../../schemas/sdo/tactic.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class TacticImpl extends AttackBaseImpl {
  constructor(readonly tactic: Tactic) {
    super();
    Object.assign(this, tactic);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TacticImpl extends Tactic {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
