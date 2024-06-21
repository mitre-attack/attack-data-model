# Use Case 1: Build step by step
from attack_model.builders.campaign_builder import AttackCampaignBuilder

builder = AttackCampaignBuilder()

# campaign = (
#     builder.set_id("campaign--1234abcd-12ab-34cd-56ef-1234567890ab")
#     .set_name("Example Campaign")
#     .set_description("An example ATT&CK campaign")
#     .set_x_mitre_attack_spec_version("1.0")
#     .add_external_reference(source_name="source1", description="ext ref description")
#     .add_external_reference(source_name="source2", description="ext ref description", external_id="exid1")
#     .add_external_reference(
#         source_name="source3", description="ext ref description", external_id="exid2", url="https://attack.mitre.org"
#     )
#     .build()
# )


builder.set_id("campaign--1234abcd-12ab-34cd-56ef-1234567890ab")\
    .set_name("Example Campaign")\
    .set_description("An example ATT&CK campaign")\
    .set_x_mitre_attack_spec_version("1.0")\
    .add_external_reference(source_name="source1", description="ext ref description")\
    .add_external_reference(source_name="source2", description="ext ref description", external_id="exid1")\
    .add_external_reference(source_name="source3", description="ext ref description", external_id="exid2", url="https://attack.mitre.org")


is_valid, message = builder.validate()

print("Is the campaign valid? ", is_valid)
print(message)
