import { MarkingDefinition } from '../../schemas/smo/marking-definition.schema';

export class MarkingDefinitionImpl {

    constructor(readonly markingDefinition: MarkingDefinition) {
        Object.assign(this, markingDefinition);
    }

    // Additional methods as needed
}

export interface MarkingDefinitionImpl extends MarkingDefinition { }