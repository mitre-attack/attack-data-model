import type { Asset } from '../../schemas/sdo/asset.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export declare class AssetImpl extends AttackBaseImpl {
    readonly asset: Asset;
    constructor(asset: Asset);
    private _techniques;
    addTechnique(technique: string): void;
    getDisplayName(): string;
}
export interface AssetImpl extends Asset {
}
//# sourceMappingURL=asset.impl.d.ts.map