/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';
export class DataComponentImpl extends AttackBaseImpl {
    constructor(dataComponent) {
        super();
        this.dataComponent = dataComponent;
        this._detectedTechniques = [];
        Object.assign(this, dataComponent);
    }
    // Add a technique detected by this data component
    addDetectedTechnique(technique) {
        this._detectedTechniques.push(technique);
    }
    // Getters
    getDetectedTechniques() {
        return this._detectedTechniques;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=data-component.impl.js.map