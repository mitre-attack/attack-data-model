/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class CollectionImpl extends AttackBaseImpl {
    constructor(collection) {
        super();
        this.collection = collection;
        Object.assign(this, collection);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=collection.impl.js.map