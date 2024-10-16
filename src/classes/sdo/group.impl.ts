/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Group } from '../../schemas/sdo/group.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { CampaignImpl } from './campaign.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';

export class GroupImpl extends AttackBaseImpl implements Group {
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

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GroupImpl extends Group {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
