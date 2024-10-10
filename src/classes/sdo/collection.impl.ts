import { Collection } from '../../schemas/sdo/collection.schema';

export class CollectionImpl {

    constructor(readonly collection: Collection) {
        Object.assign(this, collection);
    }

    // Additional methods as needed
}

export interface CollectionImpl extends Collection { }