/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Analytic } from '@/schemas/index.js';
import { AttackBaseImpl } from '@/classes/common/attack-object.impl.js';

export class AnalyticImpl extends AttackBaseImpl implements Analytic {
  constructor(readonly analytic: Analytic) {
    super();
    Object.assign(this, analytic);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AnalyticImpl extends Analytic {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
