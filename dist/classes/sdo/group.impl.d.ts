import type { Group } from '../../schemas/sdo/group.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { CampaignImpl } from './campaign.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';
export declare class GroupImpl extends AttackBaseImpl implements Group {
    readonly group: Group;
    private _techniques;
    private _software;
    private _attributedCampaigns;
    constructor(group: Group);
    addTechnique(technique: TechniqueImpl): void;
    addSoftware(software: MalwareImpl | ToolImpl): void;
    addAttributedCampaign(campaign: CampaignImpl): void;
    getTechniques(): TechniqueImpl[];
    getSoftware(): (MalwareImpl | ToolImpl)[];
    getAttributedCampaigns(): CampaignImpl[];
}
export interface GroupImpl extends Group {
}
//# sourceMappingURL=group.impl.d.ts.map