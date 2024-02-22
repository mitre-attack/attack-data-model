# Use Case 1: Build step by step
from attack_model.builders.campaign_builder import AttackCampaignBuilder

builder = AttackCampaignBuilder()
campaign = (
    builder.set_id("campaign--1234abcd-12ab-34cd-56ef-1234567890ab")
    .set_name("Example Campaign")
    .set_description("An example ATT&CK campaign")
    .set_x_mitre_attack_spec_version("1.0")
    # Set other fields as needed
    .build()
)

print(campaign)
