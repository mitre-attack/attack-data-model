import type { Matrix } from '../../schemas/sdo/matrix.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MatrixImpl extends AttackBaseImpl {

    constructor(readonly matrix: Matrix) {
        super();
        Object.assign(this, matrix);
    }
}

export interface MatrixImpl extends Matrix { }