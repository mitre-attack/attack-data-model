from datetime import datetime
from typing import List, Optional, Union
from pydantic import HttpUrl

from .base import STIXObject


# Define specific properties for MITRE ATT&CK Campaign
class AttackCampaign(STIXObject):
    name: str
    x_mitre_attack_spec_version: str
    x_mitre_version: Optional[str]
    description: Optional[str]
    aliases: Optional[List[str]]
    first_seen: Optional[datetime]
    last_seen: Optional[datetime]
    x_mitre_first_seen_citation: Optional[HttpUrl]
    x_mitre_last_seen_citation: Optional[HttpUrl]
    x_mitre_modified_by_ref: Optional[str]
    x_mitre_deprecated: Optional[bool]
    x_mitre_domains: Optional[List[str]]
