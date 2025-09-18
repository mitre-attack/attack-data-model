import type { StixModifiedTimestamp, XMitrePlatform } from '@/schemas/common/index.js';
import type { AttackObject } from '@/schemas/sdo/index.js';
import { techniqueSchema } from '@/schemas/sdo/technique.schema.js';
import { Validated } from '../common/index.js';
import type { AssetImpl } from './asset.impl.js';
import type { DataComponentImpl } from './data-component.impl.js';
import type { MitigationImpl } from './mitigation.impl.js';
import type { TacticImpl } from './tactic.impl.js';

export class TechniqueImpl extends Validated(techniqueSchema) {
  // Relationship tracking (mutable, not part of the JSON data)
  #subTechniques: TechniqueImpl[] = [];
  #tactics: TacticImpl[] = [];
  #mitigations: MitigationImpl[] = [];
  #parentTechnique?: TechniqueImpl;
  #relatedTechniques: TechniqueImpl[] = [];
  #targetAssets: AssetImpl[] = [];
  #detectingDataComponents: DataComponentImpl[] = [];
  #revokedBy?: AttackObject;

  // Relationship management methods
  setParent(parent: TechniqueImpl): void {
    this.#parentTechnique = parent;
  }

  addSubTechnique(subTechnique: TechniqueImpl): void {
    if (!this.#subTechniques.some((t) => t.id === subTechnique.id)) {
      this.#subTechniques.push(subTechnique);
    }
  }

  addTactic(tactic: TacticImpl): void {
    if (!this.#tactics.some((t) => t.id === tactic.id)) {
      this.#tactics.push(tactic);
    }
  }

  addMitigation(mitigation: MitigationImpl): void {
    if (!this.#mitigations.some((m) => m.id === mitigation.id)) {
      this.#mitigations.push(mitigation);
    }
  }

  addRelatedTechnique(technique: TechniqueImpl): void {
    if (!this.#relatedTechniques.some((t) => t.id === technique.id)) {
      this.#relatedTechniques.push(technique);
    }
  }

  addTargetAsset(asset: AssetImpl): void {
    if (!this.#targetAssets.some((a) => a.id === asset.id)) {
      this.#targetAssets.push(asset);
    }
  }

  addDetectingDataComponent(dataComponent: DataComponentImpl): void {
    if (!this.#detectingDataComponents.some((dc) => dc.id === dataComponent.id)) {
      this.#detectingDataComponents.push(dataComponent);
    }
  }

  // Getters for relationships
  getSubTechniques(): readonly TechniqueImpl[] {
    return [...this.#subTechniques];
  }

  getTactics(): readonly TacticImpl[] {
    return [...this.#tactics];
  }

  getMitigations(): readonly MitigationImpl[] {
    return [...this.#mitigations];
  }

  getParentTechnique(): TechniqueImpl | undefined {
    return this.#parentTechnique;
  }

  getRelatedTechniques(): readonly TechniqueImpl[] {
    return [...this.#relatedTechniques];
  }

  getTargetAssets(): readonly AssetImpl[] {
    return [...this.#targetAssets];
  }

  getDetectingDataComponents(): readonly DataComponentImpl[] {
    return [...this.#detectingDataComponents];
  }

  getRevokedBy(): AttackObject | undefined {
    return this.#revokedBy;
  }

  setRevokedBy(obj: AttackObject | undefined) {
    this.#revokedBy = obj;
  }

  // Business logic methods
  isDeprecated(): boolean {
    return this.x_mitre_deprecated ?? false;
  }

  isRevoked(): boolean {
    return this.revoked ?? false;
  }

  isSubTechnique(): boolean {
    return this.x_mitre_is_subtechnique ?? false;
  }

  getAttackId(): string | undefined {
    return this.external_references?.[0]?.external_id;
  }

  getDisplayName(): string {
    const attackId = this.getAttackId();
    return attackId ? `${attackId}: ${this.name}` : this.name;
  }

  getTacticNames(): string[] {
    return this.kill_chain_phases?.map((phase) => phase.phase_name) ?? [];
  }

  getPlatformsString(): string {
    return this.x_mitre_platforms?.join(', ') ?? '';
  }

  supportsPlatform(platform: string): boolean {
    return this.x_mitre_platforms?.includes(platform as XMitrePlatform) ?? false;
  }

  with(updates: Partial<TechniqueImpl>): TechniqueImpl {
    const newData = { ...this, ...updates };
    return new TechniqueImpl(newData);
  }

  touch(): TechniqueImpl {
    return this.with({
      modified: new Date().toISOString() as StixModifiedTimestamp,
    });
  }

  equals(other: TechniqueImpl): boolean {
    return this.id === other.id && this.modified === other.modified;
  }

  isNewerThan(other: TechniqueImpl): boolean {
    if (this.id !== other.id) {
      throw new Error('Cannot compare different techniques');
    }
    return new Date(this.modified) > new Date(other.modified);
  }
}
