import type { DataComponent } from '../../schemas/sdo/data-component.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';
export declare class DataComponentImpl extends AttackBaseImpl implements DataComponent {
    readonly dataComponent: DataComponent;
    private _detectedTechniques;
    constructor(dataComponent: DataComponent);
    addDetectedTechnique(technique: TechniqueImpl): void;
    getDetectedTechniques(): TechniqueImpl[];
}
export interface DataComponentImpl extends DataComponent {
}
//# sourceMappingURL=data-component.impl.d.ts.map