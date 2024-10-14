import type { Asset } from '../../schemas/sdo/asset.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class AssetImpl extends AttackBaseImpl {

    constructor(readonly asset: Asset) {
        super();
        Object.assign(this, asset);
    }
}

export interface AssetImpl extends Asset { }