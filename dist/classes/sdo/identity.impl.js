/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class IdentityImpl extends AttackBaseImpl {
    constructor(identity) {
        super();
        this.identity = identity;
        Object.assign(this, identity);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=identity.impl.js.map