import datetime
from attack_model.builders.campaign_builder import AttackCampaignBuilder


# Use Case 1: Build step by step

builder = AttackCampaignBuilder()
campaign = (
    builder
        .set_id("campaign--1234abcd-12ab-34cd-56ef-1234567890ab")
        .set_name("Example Campaign")
        .set_description("An example ATT&CK campaign")
        .set_x_mitre_attack_spec_version("1.0")
        # Set other fields as needed
        .build()
)

print(campaign)

# Use Case 2: Instantiate from existing campaign

existing_campaign = {
    "type": "campaign",
    "id": "campaign--1234abcd-12ab-34cd-56ef-1234567890ab",
    "name": "Existing Campaign",
    "created": datetime.now(),
    "modified": datetime.now(),
    "spec_version": "2.1",
    "x_mitre_attack_spec_version": "1.0",
    # Other fields as needed
}

builder = AttackCampaignBuilder().from_campaign(existing_campaign)
modified_campaign = builder.set_name("Modified Campaign Name").build()

print(modified_campaign)
