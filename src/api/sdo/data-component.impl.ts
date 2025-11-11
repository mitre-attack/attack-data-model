/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { DataComponent } from '../../schemas/sdo/data-component.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';

export class DataComponentImpl extends AttackBaseImpl implements DataComponent {
  private _detectedTechniques: TechniqueImpl[] = [];

  constructor(readonly dataComponent: DataComponent) {
    super();
    Object.assign(this, dataComponent);
  }

  // Add a technique detected by this data component
  addDetectedTechnique(technique: TechniqueImpl): void {
    this._detectedTechniques.push(technique);
  }

  // Getters
  getDetectedTechniques(): TechniqueImpl[] {
    return this._detectedTechniques;
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DataComponentImpl extends DataComponent {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
