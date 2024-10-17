/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class AssetImpl extends AttackBaseImpl {
    constructor(asset) {
        super();
        this.asset = asset;
        // Custom properties prefixed with `_` to avoid conflicts
        this._techniques = [];
        Object.assign(this, asset);
    }
    addTechnique(technique) {
        this._techniques.push(technique);
    }
    // Custom method or property
    getDisplayName() {
        return `${this.asset.name} - Asset`;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=asset.impl.js.map