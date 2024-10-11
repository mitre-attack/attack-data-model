import { Relationship } from '../../schemas/sro/relationship.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class RelationshipImpl extends AttackObjectImpl {

    constructor(readonly relationship: Relationship) {
        super();
        Object.assign(this, relationship);
    }
}

export interface RelationshipImpl extends Relationship { }