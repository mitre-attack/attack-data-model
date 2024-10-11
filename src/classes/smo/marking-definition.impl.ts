import { MarkingDefinition } from '../../schemas/smo/marking-definition.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class MarkingDefinitionImpl extends AttackObjectImpl {

    constructor(readonly markingDefinition: MarkingDefinition) {
        super();
        Object.assign(this, markingDefinition);
    }
}

export interface MarkingDefinitionImpl extends MarkingDefinition { }