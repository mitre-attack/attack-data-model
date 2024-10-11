import { Tool } from '../../schemas/sdo/tool.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';
import { TechniqueImpl } from './technique.impl';

export class ToolImpl extends AttackObjectImpl implements Tool {

    private _techniques: TechniqueImpl[] = [];

    constructor(readonly tool: Tool) {
        super();
        Object.assign(this, tool);
    }

    // Add a technique used by the tool
    addTechnique(technique: TechniqueImpl): void {
        this._techniques.push(technique);
    }

    // Getters
    getTechniques(): TechniqueImpl[] {
        return this._techniques;
    }
}

export interface ToolImpl extends Tool { }