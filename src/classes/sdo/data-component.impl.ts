/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { DataComponent } from '../../schemas/sdo/data-component.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { LogSourceImpl } from './log-source.impl.js';
import { TechniqueImpl } from './technique.impl.js';

export class DataComponentImpl extends AttackBaseImpl implements DataComponent {
  private _detectedTechniques: TechniqueImpl[] = [];
  private _logSources: LogSourceImpl[] = [];

  constructor(readonly dataComponent: DataComponent) {
    super();
    Object.assign(this, dataComponent);
  }

  // Add a technique detected by this data component
  addDetectedTechnique(technique: TechniqueImpl): void {
    this._detectedTechniques.push(technique);
  }

  addFoundIn(logSource: LogSourceImpl): void {
    this._logSources.push(logSource);
  }

  // Getters
  getDetectedTechniques(): TechniqueImpl[] {
    return this._detectedTechniques;
  }

  getLogSources(): LogSourceImpl[] {
    return this._logSources;
  }

  get foundIn(): LogSourceImpl[] {
    return this._logSources;
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DataComponentImpl extends DataComponent {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
