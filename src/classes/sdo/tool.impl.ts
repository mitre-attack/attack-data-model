import { Tool } from '../../schemas/sdo/tool.schema';
import { TechniqueImpl } from './technique.impl';

export class ToolImpl {
    private techniques: TechniqueImpl[] = [];

    constructor(readonly tool: Tool) {
        Object.assign(this, tool);
    }

    addTechnique(technique: TechniqueImpl): void {
        this.techniques.push(technique);
    }

    getTechniques(): TechniqueImpl[] {
        return this.techniques;
    }

    // Additional methods as needed
}

export interface ToolImpl extends Tool { }