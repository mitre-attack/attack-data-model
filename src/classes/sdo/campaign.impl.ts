import { Campaign } from '../../schemas/sdo/campaign.schema';
import { AttackObjectImpl } from '../common/attack-object.impl';
import { GroupImpl } from './group.impl';
import { MalwareImpl } from './malware.impl';
import { TechniqueImpl } from './technique.impl';
import { ToolImpl } from './tool.impl';

export class CampaignImpl extends AttackObjectImpl implements Campaign {

    private _techniques: TechniqueImpl[] = [];
    private _software: (MalwareImpl | ToolImpl)[] = [];
    private _attributedTo?: GroupImpl;

    constructor(readonly campaign: Campaign) {
        super();
        Object.assign(this, campaign);
    }

    // Add a technique used by the campaign
    addTechnique(technique: TechniqueImpl): void {
        this._techniques.push(technique);
    }

    // Add software used by the campaign
    addSoftware(software: MalwareImpl | ToolImpl): void {
        this._software.push(software);
    }

    // Set the group this campaign is attributed to
    setAttributedTo(group: GroupImpl): void {
        this._attributedTo = group;
    }

    // Getters
    getTechniques(): TechniqueImpl[] {
        return this._techniques;
    }

    getSoftware(): (MalwareImpl | ToolImpl)[] {
        return this._software;
    }

    getAttributedTo(): GroupImpl | undefined {
        return this._attributedTo;
    }
}

export interface CampaignImpl extends Campaign { }