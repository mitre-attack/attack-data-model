/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Asset } from '../../schemas/sdo/asset.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class AssetImpl extends AttackBaseImpl {
  constructor(readonly asset: Asset) {
    super();
    Object.assign(this, asset);
  }

  // Custom properties prefixed with `_` to avoid conflicts
  private _techniques: string[] = [];

  public addTechnique(technique: string): void {
    this._techniques.push(technique);
  }

  // Custom method or property
  public getDisplayName(): string {
    return `${this.asset.name} - Asset`;
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AssetImpl extends Asset {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
