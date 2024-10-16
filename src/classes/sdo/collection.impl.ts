import type { Collection } from '../../schemas/sdo/collection.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class CollectionImpl extends AttackBaseImpl {
  constructor(readonly collection: Collection) {
    super();
    Object.assign(this, collection);
  }
}

export interface CollectionImpl extends Collection {}
