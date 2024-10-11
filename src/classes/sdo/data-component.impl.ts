import { DataComponent } from '../../schemas/sdo/data-component.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';
import { TechniqueImpl } from './technique.impl';

export class DataComponentImpl extends AttackObjectImpl implements DataComponent {

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

export interface DataComponentImpl extends DataComponent { }