/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { Campaign } from '../../schemas/sdo/campaign.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { GroupImpl } from './group.impl.js';
import { MalwareImpl } from './malware.impl.js';
import { TechniqueImpl } from './technique.impl.js';
import { ToolImpl } from './tool.impl.js';

export class CampaignImpl extends AttackBaseImpl implements Campaign {
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

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CampaignImpl extends Campaign {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
