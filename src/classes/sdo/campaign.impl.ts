import { Campaign } from '../../schemas/sdo/campaign.schema';
import { TechniqueImpl } from './technique.impl';

export class CampaignImpl {
    private techniques: TechniqueImpl[] = [];

    constructor(readonly campaign: Campaign) {
        Object.assign(this, campaign);
    }

    addTechnique(technique: TechniqueImpl): void {
        this.techniques.push(technique);
    }

    getTechniques(): TechniqueImpl[] {
        return this.techniques;
    }

    // Additional methods as needed
}

export interface CampaignImpl extends Campaign { }