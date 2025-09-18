/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Collection } from '../../schemas/sdo/collection.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class CollectionImpl extends AttackBaseImpl {
  constructor(readonly collection: Collection) {
    super();
    Object.assign(this, collection);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollectionImpl extends Collection {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
