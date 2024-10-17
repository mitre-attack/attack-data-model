/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { CampaignImpl } from './campaign.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';
export class GroupImpl extends AttackBaseImpl {
    constructor(group) {
        super();
        this.group = group;
        this._techniques = [];
        this._software = [];
        this._attributedCampaigns = [];
        Object.assign(this, group);
    }
    // Add a technique used by the group
    addTechnique(technique) {
        this._techniques.push(technique);
    }
    // Add software used by the group
    addSoftware(software) {
        this._software.push(software);
    }
    addAttributedCampaign(campaign) {
        this._attributedCampaigns.push(campaign);
    }
    // Getters
    getTechniques() {
        return this._techniques;
    }
    getSoftware() {
        return this._software;
    }
    getAttributedCampaigns() {
        return this._attributedCampaigns;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=group.impl.js.map