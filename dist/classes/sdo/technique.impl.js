/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { TacticImpl } from './tactic.impl.js';
import { MitigationImpl } from './mitigation.impl.js';
import { DataSourceImpl } from './data-source.impl.js';
import { AssetImpl } from './asset.impl.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { DataComponentImpl } from './data-component.impl.js';
export class TechniqueImpl extends AttackBaseImpl {
    constructor(technique) {
        super();
        this.technique = technique;
        this._subTechniques = [];
        this._tactics = [];
        this._mitigations = [];
        this._dataSources = [];
        this._relatedTechniques = [];
        this._targetAssets = [];
        this._detectingDataComponents = [];
        // Assign properties from the Technique object to this instance
        Object.assign(this, technique);
    }
    setParent(parent) {
        this._parentTechnique = parent;
    }
    addSubTechnique(subTechnique) {
        this._subTechniques.push(subTechnique);
    }
    addTactic(tactic) {
        this._tactics.push(tactic);
    }
    addMitigation(mitigation) {
        this._mitigations.push(mitigation);
    }
    addDataSource(dataSource) {
        this._dataSources.push(dataSource);
    }
    addRelatedTechnique(technique) {
        this._relatedTechniques.push(technique);
    }
    addTargetAsset(asset) {
        this._targetAssets.push(asset);
    }
    addDetectingDataComponent(dataComponent) {
        this._detectingDataComponents.push(dataComponent);
    }
    // Getters
    getSubTechniques() {
        return this._subTechniques;
    }
    getTactics() {
        return this._tactics;
    }
    getMitigations() {
        return this._mitigations;
    }
    getDataSources() {
        return this._dataSources;
    }
    getParentTechnique() {
        return this._parentTechnique;
    }
    getRelatedTechniques() {
        return this._relatedTechniques;
    }
    getTargetAssets() {
        return this._targetAssets;
    }
    getDetectingDataComponents() {
        return this._detectingDataComponents;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=technique.impl.js.map