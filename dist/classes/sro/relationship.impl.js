/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class RelationshipImpl extends AttackBaseImpl {
    constructor(relationship) {
        super();
        this.relationship = relationship;
        Object.assign(this, relationship);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=relationship.impl.js.map