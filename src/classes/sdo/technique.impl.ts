/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Technique } from '../../schemas/sdo/technique.schema.js';
import { TacticImpl } from './tactic.impl.js';
import { MitigationImpl } from './mitigation.impl.js';
import { LogSourceImpl } from './log-source.impl.js';
import { AssetImpl } from './asset.impl.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { DataComponentImpl } from './data-component.impl.js';

export class TechniqueImpl extends AttackBaseImpl {
  private _subTechniques: TechniqueImpl[] = [];
  private _tactics: TacticImpl[] = [];
  private _mitigations: MitigationImpl[] = [];
  private _dataSources: LogSourceImpl[] = [];
  private _parentTechnique?: TechniqueImpl;
  private _relatedTechniques: TechniqueImpl[] = [];
  private _targetAssets: AssetImpl[] = [];
  private _detectingDataComponents: DataComponentImpl[] = [];

  constructor(readonly technique: Technique) {
    super();
    // Assign properties from the Technique object to this instance
    Object.assign(this, technique);
  }

  setParent(parent: TechniqueImpl): void {
    this._parentTechnique = parent;
  }

  addSubTechnique(subTechnique: TechniqueImpl): void {
    this._subTechniques.push(subTechnique);
  }

  addTactic(tactic: TacticImpl): void {
    this._tactics.push(tactic);
  }

  addMitigation(mitigation: MitigationImpl): void {
    this._mitigations.push(mitigation);
  }

  addDataSource(dataSource: LogSourceImpl): void {
    this._dataSources.push(dataSource);
  }

  addRelatedTechnique(technique: TechniqueImpl): void {
    this._relatedTechniques.push(technique);
  }

  addTargetAsset(asset: AssetImpl): void {
    this._targetAssets.push(asset);
  }

  addDetectingDataComponent(dataComponent: DataComponentImpl): void {
    this._detectingDataComponents.push(dataComponent);
  }

  // Getters
  public getSubTechniques(): TechniqueImpl[] {
    return this._subTechniques;
  }

  getTactics(): TacticImpl[] {
    return this._tactics;
  }

  getMitigations(): MitigationImpl[] {
    return this._mitigations;
  }

  getDataSources(): LogSourceImpl[] {
    return this._dataSources;
  }

  getParentTechnique(): TechniqueImpl | undefined {
    return this._parentTechnique;
  }

  getRelatedTechniques(): TechniqueImpl[] {
    return this._relatedTechniques;
  }

  getTargetAssets(): AssetImpl[] {
    return this._targetAssets;
  }

  getDetectingDataComponents(): DataComponentImpl[] {
    return this._detectingDataComponents;
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TechniqueImpl extends Technique {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
