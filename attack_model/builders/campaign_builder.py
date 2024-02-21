from datetime import datetime
from typing import Annotated, List, Optional, Union
from pydantic import BaseModel, EmailStr, HttpUrl, StringConstraints, constr

from models.campaign import AttackCampaign


class AttackCampaignBuilder:
    def __init__(self, campaign: Optional[AttackCampaign] = None):
        if campaign:
            self.campaign_info = campaign.dict()
        else:
            self.reset()

    def reset(self):
        self.campaign_info = {
            "type": "campaign",  # Assuming default type for simplicity
            "id": "",
            "created": datetime.now(),
            "modified": datetime.now(),
            "spec_version": "2.1",
        }

    def from_campaign(self, campaign: Union[AttackCampaign, dict]):
        if isinstance(campaign, AttackCampaign):
            self.campaign_info = campaign.dict()
        elif isinstance(campaign, dict):
            self.campaign_info = campaign
        else:
            raise ValueError("Input must be an AttackCampaign instance or a dictionary")
        return self

    def set_id(self, id: str):
        self.campaign_info["id"] = id
        return self

    def set_name(self, name: str):
        self.campaign_info["name"] = name
        return self

    def set_description(self, description: str):
        self.campaign_info["description"] = description
        return self

    def set_x_mitre_attack_spec_version(self, version: str):
        self.campaign_info["x_mitre_attack_spec_version"] = version
        return self

    # Add more setter methods for other fields as needed

    def build(self) -> AttackCampaign:
        return AttackCampaign(**self.campaign_info)
