import { Asset } from '../../schemas/sdo/asset.schema';

export class AssetImpl {

    constructor(readonly asset: Asset) {
        Object.assign(this, asset);
    }

    // Additional methods as needed
}

export interface AssetImpl extends Asset { }