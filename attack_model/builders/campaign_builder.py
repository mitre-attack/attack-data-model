import copy
from datetime import datetime
import json
from typing import Annotated, List, Optional, Union
from pydantic import BaseModel, EmailStr, HttpUrl, StringConstraints, ValidationError, constr

from ..models.campaign import AttackCampaign


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

    def build(self) -> AttackCampaign:
        return AttackCampaign(**self.campaign_info)

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

    # Implementing missing setter methods based on the model properties
    def set_created_by_ref(self, created_by_ref: str):
        self.campaign_info["created_by_ref"] = created_by_ref
        return self

    def set_revoked(self, revoked: bool):
        self.campaign_info["revoked"] = revoked
        return self

    def set_external_references(self, external_references: List[dict]):
        self.campaign_info["external_references"] = external_references
        return self

    def set_object_marking_refs(self, object_marking_refs: List[str]):
        self.campaign_info["object_marking_refs"] = object_marking_refs
        return self

    def set_aliases(self, aliases: List[str]):
        self.campaign_info["aliases"] = aliases
        return self

    def set_first_seen(self, first_seen: datetime):
        self.campaign_info["first_seen"] = first_seen
        return self

    def set_last_seen(self, last_seen: datetime):
        self.campaign_info["last_seen"] = last_seen
        return self

    def set_x_mitre_first_seen_citation(self, citation: str):
        self.campaign_info["x_mitre_first_seen_citation"] = citation
        return self

    def set_x_mitre_last_seen_citation(self, citation: str):
        self.campaign_info["x_mitre_last_seen_citation"] = citation
        return self

    def set_x_mitre_modified_by_ref(self, modified_by_ref: str):
        self.campaign_info["x_mitre_modified_by_ref"] = modified_by_ref
        return self

    def set_x_mitre_deprecated(self, deprecated: bool):
        self.campaign_info["x_mitre_deprecated"] = deprecated
        return self

    def set_x_mitre_domains(self, domains: List[str]):
        self.campaign_info["x_mitre_domains"] = domains
        return self

    def set_x_mitre_contributors(self, contributors: Optional[List[str]]):
        self.campaign_info["x_mitre_contributors"] = contributors
        return self

    def add_external_reference(
        self,
        source_name: str,
        description: Optional[str] = None,
        external_id: Optional[str] = None,
        url: Optional[str] = None,
    ):
        external_reference = {
            "source_name": source_name,
            "description": description,
            "external_id": external_id,
            "url": url,
        }
        if "external_references" not in self.campaign_info or self.campaign_info["external_references"] is None:
            self.campaign_info["external_references"] = []
        self.campaign_info["external_references"].append(external_reference)
        return self

    def remove_external_reference(self, index: int):
        if index < len(self.campaign_info["external_references"]):
            del self.campaign_info["external_references"][index]
        return self

    def update_external_reference(self, index: int, **kwargs):
        if index < len(self.campaign_info["external_references"]):
            for key, value in kwargs.items():
                self.campaign_info["external_references"][index][key] = value
        return self

    # TODO needs review
    def add_external_references_bulk(self, external_references: List[dict]):
        """_summary_
        For adding multiple items at once to a list (e.g., external_references, aliases), a method that accepts an iterable and appends all items to the corresponding list in campaign_info can save time and lines of code.
        Args:
            external_references (List[dict]): _description_

        Returns:
            _type_: _description_
        """
        if "external_references" not in self.campaign_info:
            self.campaign_info["external_references"] = []
        self.campaign_info["external_references"].extend(external_references)
        return self

    # TODO needs review
    def validate(self):
        """
        Validates the current state of campaign_info against the AttackCampaign Pydantic model.
        Returns a tuple (bool, str) indicating whether the validation was successful and a message.
        """
        try:
            # Attempt to create an AttackCampaign object with the current campaign_info
            AttackCampaign(**self.campaign_info)
            return True, "Validation successful. The campaign_info is ready for building."
        except ValidationError as e:
            # Return False and the error message if validation fails
            return False, f"Validation failed: {e}"

    # TODO needs review
    def clone(self):
        """_summary_
        A method to clone the current builder, including its state. Can be helpful when you need to create multiple similar objects with slight variations.
        Returns:
            _type_: _description_
        """
        new_builder = type(self)()  # Create a new instance of the same class
        new_builder.campaign_info = copy.deepcopy(self.campaign_info)
        return new_builder

    # TODO needs review
    def import_from_json(self, file_path: str):
        """_summary_
        A method to import campaign configuration from a JSON or YAML file. Can use useful for streamlining the process of creating campaigns from pre-defined templates or configurations.
        Args:
            file_path (str): _description_

        Returns:
            _type_: _description_
        """
        with open(file_path, "r") as file:
            self.campaign_info = json.load(file)
        return self

    # TODO needs review
    def export_to_json(self, file_path: str):
        """_summary_
        Exports the current configuration to a file. Can be useful for saving work, sharing configurations, or creating templates.
        Args:
            file_path (str): _description_

        Returns:
            _type_: _description_
        """
        with open(file_path, "w") as file:
            json.dump(self.campaign_info, file, indent=4)
        return self

    # TODO needs review
    def preview(self):
        """_summary_
        A method to print or return a string representation of the current state of the campaign_info, allowing users to review their configuration before building the final object.
        Returns:
            _type_: _description_
        """
        return json.dumps(self.campaign_info, indent=4)

    # Add more setter methods for other fields as needed
