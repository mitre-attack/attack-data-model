import { Group } from '../../schemas/sdo/group.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';
import { CampaignImpl } from './campaign.impl';
import { MalwareImpl } from './malware.impl';
import { TechniqueImpl } from './technique.impl';
import { ToolImpl } from './tool.impl';

export class GroupImpl extends AttackObjectImpl implements Group {

    private _techniques: TechniqueImpl[] = [];
    private _software: (MalwareImpl | ToolImpl)[] = [];
    private _attributedCampaigns: CampaignImpl[] = [];

    constructor(readonly group: Group) {
        super();
        Object.assign(this, group);
    }

    // Add a technique used by the group
    addTechnique(technique: TechniqueImpl): void {
        this._techniques.push(technique);
    }

    // Add software used by the group
    addSoftware(software: MalwareImpl | ToolImpl): void {
        this._software.push(software);
    }

    addAttributedCampaign(campaign: CampaignImpl): void {
        this._attributedCampaigns.push(campaign);
    }

    // Getters
    getTechniques(): TechniqueImpl[] {
        return this._techniques;
    }

    getSoftware(): (MalwareImpl | ToolImpl)[] {
        return this._software;
    }

    getAttributedCampaigns(): CampaignImpl[] {
        return this._attributedCampaigns;
    }
}

export interface GroupImpl extends Group { }