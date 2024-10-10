import { Group } from '../../schemas/sdo/group.schema';
import { TechniqueImpl } from './technique.impl';

export class GroupImpl {
    private techniques: TechniqueImpl[] = [];

    constructor(readonly group: Group) {
        Object.assign(this, group);
    }

    addTechnique(technique: TechniqueImpl): void {
        this.techniques.push(technique);
    }

    getTechniques(): TechniqueImpl[] {
        return this.techniques;
    }

    // Additional methods as needed
}

export interface GroupImpl extends Group { }