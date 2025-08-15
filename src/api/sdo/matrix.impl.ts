/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Matrix } from '../../schemas/sdo/matrix.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MatrixImpl extends AttackBaseImpl {
  constructor(readonly matrix: Matrix) {
    super();
    Object.assign(this, matrix);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MatrixImpl extends Matrix {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
