import { Collection } from '../../schemas/sdo/collection.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class CollectionImpl extends AttackObjectImpl {

    constructor(readonly collection: Collection) {
        super();
        Object.assign(this, collection);
    }
}

export interface CollectionImpl extends Collection { }