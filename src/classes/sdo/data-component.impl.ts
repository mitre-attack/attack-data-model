import { DataComponent } from '../../schemas/sdo/data-component.schema';

export class DataComponentImpl {

    constructor(readonly dataComponent: DataComponent) {
        Object.assign(this, dataComponent);
    }

    // Additional methods as needed
}

export interface DataComponentImpl extends DataComponent { }