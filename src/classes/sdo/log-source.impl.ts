/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { LogSource } from '../../schemas/sdo/log-source.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class LogSourceImpl extends AttackBaseImpl {
  constructor(readonly logSource: LogSource) {
    super();
    Object.assign(this, logSource);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogSourceImpl extends LogSource {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
