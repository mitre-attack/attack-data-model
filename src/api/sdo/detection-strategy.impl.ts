/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { AttackBaseImpl } from '@/api/common/attack-object.impl.js';
import type { DetectionStrategy } from '@/schemas/index.js';
import { TechniqueImpl } from './technique.impl.js';

export class DetectionStrategyImpl extends AttackBaseImpl implements DetectionStrategy {
  private _techniques: TechniqueImpl[] = [];

  constructor(readonly detectionStrategy: DetectionStrategy) {
    super();
    Object.assign(this, detectionStrategy);
  }

  // Add a technique used by the group
  addTechnique(technique: TechniqueImpl): void {
    this._techniques.push(technique);
  }

  // Getters
  getTechniques(): TechniqueImpl[] {
    return this._techniques;
  }

  get detects(): TechniqueImpl[] {
    return this._techniques;
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DetectionStrategyImpl extends DetectionStrategy {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
