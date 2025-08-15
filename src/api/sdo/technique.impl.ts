import { Validated } from '../common/index.js';
import { techniqueSchema } from '@/schemas/sdo/technique.schema.js';
import type { AttackObject, Technique } from '@/schemas/sdo/index.js';
import type { TacticImpl } from './tactic.impl.js';
import type { MitigationImpl } from './mitigation.impl.js';
import type { LogSourceImpl } from './log-source.impl.js';
import type { AssetImpl } from './asset.impl.js';
import type { DataComponentImpl } from './data-component.impl.js';
import type { StixModifiedTimestamp, XMitrePlatform } from '@/schemas/common/index.js';

export class TechniqueImpl extends Validated(techniqueSchema) {
  // Relationship tracking (mutable, not part of the JSON data)
  #subTechniques: TechniqueImpl[] = [];
  #tactics: TacticImpl[] = [];
  #mitigations: MitigationImpl[] = [];
  #logSources: LogSourceImpl[] = [];
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
    if (!this.#subTechniques.includes(subTechnique)) {
      this.#subTechniques.push(subTechnique);
    }
  }

  addTactic(tactic: TacticImpl): void {
    if (!this.#tactics.includes(tactic)) {
      this.#tactics.push(tactic);
    }
  }

  addMitigation(mitigation: MitigationImpl): void {
    if (!this.#mitigations.includes(mitigation)) {
      this.#mitigations.push(mitigation);
    }
  }

  addLogSource(logSource: LogSourceImpl): void {
    if (!this.#logSources.includes(logSource)) {
      this.#logSources.push(logSource);
    }
  }

  addRelatedTechnique(technique: TechniqueImpl): void {
    if (!this.#relatedTechniques.includes(technique)) {
      this.#relatedTechniques.push(technique);
    }
  }

  addTargetAsset(asset: AssetImpl): void {
    if (!this.#targetAssets.includes(asset)) {
      this.#targetAssets.push(asset);
    }
  }

  addDetectingDataComponent(dataComponent: DataComponentImpl): void {
    if (!this.#detectingDataComponents.includes(dataComponent)) {
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

  getLogSources(): readonly LogSourceImpl[] {
    return [...this.#logSources];
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

  // Common functionality
  getRevokedBy(): AttackObject | undefined {
    return this.#revokedBy;
  }

  setRevokedBy(obj: AttackObject | undefined) {
    this.#revokedBy = obj;
  }

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

  // Get tactics from kill chain phases
  getTacticNames(): string[] {
    return this.kill_chain_phases?.map((phase) => phase.phase_name) ?? [];
  }

  // Get platforms as a comma-separated string
  getPlatformsString(): string {
    return this.x_mitre_platforms?.join(', ') ?? '';
  }

  // Check if technique applies to a specific platform
  supportsPlatform(platform: string): boolean {
    return this.x_mitre_platforms?.includes(platform as XMitrePlatform) ?? false;
  }

  // Create a new instance with updated fields
  with(updates: Partial<TechniqueImpl>): TechniqueImpl {
    const newData = { ...this, ...updates };
    return new TechniqueImpl(newData);
  }

  // Create a new instance with updated modified timestamp
  touch(): TechniqueImpl {
    return this.with({
      modified: new Date().toISOString() as StixModifiedTimestamp,
    });
  }

  // Equality check
  equals(other: TechniqueImpl): boolean {
    return this.id === other.id && this.modified === other.modified;
  }

  // Check if this version is newer than another
  isNewerThan(other: TechniqueImpl): boolean {
    if (this.id !== other.id) {
      throw new Error('Cannot compare different techniques');
    }
    return new Date(this.modified) > new Date(other.modified);
  }
}

export type TechniqueCls = Technique & typeof TechniqueImpl;
