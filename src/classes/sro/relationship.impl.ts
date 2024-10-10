import { Relationship } from '../../schemas/sro/relationship.schema';

export class RelationshipImpl {

    constructor(readonly relationship: Relationship) {
        Object.assign(this, relationship);
    }

    // Additional methods as needed
}

export interface RelationshipImpl extends Relationship { }