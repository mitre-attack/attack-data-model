import type { Relationship } from '../../schemas/sro/relationship.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class RelationshipImpl extends AttackBaseImpl {
  constructor(readonly relationship: Relationship) {
    super();
    Object.assign(this, relationship);
  }
}

export interface RelationshipImpl extends Relationship {}
