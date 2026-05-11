/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

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

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToolImpl extends Tool {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
