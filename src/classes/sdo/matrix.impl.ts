import { Matrix } from '../../schemas/sdo/matrix.schema';

export class MatrixImpl {

    constructor(readonly matrix: Matrix) {
        Object.assign(this, matrix);
    }

    // Additional methods as needed
}

export interface MatrixImpl extends Matrix { }