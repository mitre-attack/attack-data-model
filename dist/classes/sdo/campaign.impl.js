/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { GroupImpl } from './group.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';
export class CampaignImpl extends AttackBaseImpl {
    constructor(campaign) {
        super();
        this.campaign = campaign;
        this._techniques = [];
        this._software = [];
        Object.assign(this, campaign);
    }
    // Add a technique used by the campaign
    addTechnique(technique) {
        this._techniques.push(technique);
    }
    // Add software used by the campaign
    addSoftware(software) {
        this._software.push(software);
    }
    // Set the group this campaign is attributed to
    setAttributedTo(group) {
        this._attributedTo = group;
    }
    // Getters
    getTechniques() {
        return this._techniques;
    }
    getSoftware() {
        return this._software;
    }
    getAttributedTo() {
        return this._attributedTo;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=campaign.impl.js.map