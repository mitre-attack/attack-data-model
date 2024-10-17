import type { Campaign } from '../../schemas/sdo/campaign.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { GroupImpl } from './group.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';
export declare class CampaignImpl extends AttackBaseImpl implements Campaign {
    readonly campaign: Campaign;
    private _techniques;
    private _software;
    private _attributedTo?;
    constructor(campaign: Campaign);
    addTechnique(technique: TechniqueImpl): void;
    addSoftware(software: MalwareImpl | ToolImpl): void;
    setAttributedTo(group: GroupImpl): void;
    getTechniques(): TechniqueImpl[];
    getSoftware(): (MalwareImpl | ToolImpl)[];
    getAttributedTo(): GroupImpl | undefined;
}
export interface CampaignImpl extends Campaign {
}
//# sourceMappingURL=campaign.impl.d.ts.map