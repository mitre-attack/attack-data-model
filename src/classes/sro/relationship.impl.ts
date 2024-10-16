/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Relationship } from '../../schemas/sro/relationship.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class RelationshipImpl extends AttackBaseImpl {
  constructor(readonly relationship: Relationship) {
    super();
    Object.assign(this, relationship);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RelationshipImpl extends Relationship {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
