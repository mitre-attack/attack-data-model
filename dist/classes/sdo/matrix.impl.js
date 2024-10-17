/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class MatrixImpl extends AttackBaseImpl {
    constructor(matrix) {
        super();
        this.matrix = matrix;
        Object.assign(this, matrix);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=matrix.impl.js.map