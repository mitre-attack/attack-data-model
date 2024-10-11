import { Asset } from '../../schemas/sdo/asset.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';

export class AssetImpl extends AttackObjectImpl {

    constructor(readonly asset: Asset) {
        super();
        Object.assign(this, asset);
    }
}

export interface AssetImpl extends Asset { }