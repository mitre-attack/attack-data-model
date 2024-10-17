import type { Technique } from '../../schemas/sdo/technique.schema.js';
import { TacticImpl } from './tactic.impl.js';
import { MitigationImpl } from './mitigation.impl.js';
import { DataSourceImpl } from './data-source.impl.js';
import { AssetImpl } from './asset.impl.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { DataComponentImpl } from './data-component.impl.js';
export declare class TechniqueImpl extends AttackBaseImpl {
    readonly technique: Technique;
    private _subTechniques;
    private _tactics;
    private _mitigations;
    private _dataSources;
    private _parentTechnique?;
    private _relatedTechniques;
    private _targetAssets;
    private _detectingDataComponents;
    constructor(technique: Technique);
    setParent(parent: TechniqueImpl): void;
    addSubTechnique(subTechnique: TechniqueImpl): void;
    addTactic(tactic: TacticImpl): void;
    addMitigation(mitigation: MitigationImpl): void;
    addDataSource(dataSource: DataSourceImpl): void;
    addRelatedTechnique(technique: TechniqueImpl): void;
    addTargetAsset(asset: AssetImpl): void;
    addDetectingDataComponent(dataComponent: DataComponentImpl): void;
    getSubTechniques(): TechniqueImpl[];
    getTactics(): TacticImpl[];
    getMitigations(): MitigationImpl[];
    getDataSources(): DataSourceImpl[];
    getParentTechnique(): TechniqueImpl | undefined;
    getRelatedTechniques(): TechniqueImpl[];
    getTargetAssets(): AssetImpl[];
    getDetectingDataComponents(): DataComponentImpl[];
}
export interface TechniqueImpl extends Technique {
}
//# sourceMappingURL=technique.impl.d.ts.map