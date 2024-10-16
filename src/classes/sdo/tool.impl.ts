import type { Tool } from '../../schemas/sdo/tool.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';

export class ToolImpl extends AttackBaseImpl implements Tool {
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

export interface ToolImpl extends Tool {}
