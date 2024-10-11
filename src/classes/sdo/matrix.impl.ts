import { Matrix } from '../../schemas/sdo/matrix.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class MatrixImpl extends AttackObjectImpl {

    constructor(readonly matrix: Matrix) {
        super();
        Object.assign(this, matrix);
    }
}

export interface MatrixImpl extends Matrix { }