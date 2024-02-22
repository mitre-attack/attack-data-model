import datetime
import pandas as pd

from attack_model.builders.campaign_builder import AttackCampaignBuilder


enterprise_attack = pd.read_json(
    "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json"
)
ics_attack = pd.read_json(
    "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack.json"
)
mobile_attack = pd.read_json(
    "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json"
)

enterprise_df = pd.json_normalize(enterprise_attack["objects"])
ics_df = pd.json_normalize(ics_attack["objects"])
mobile_df = pd.json_normalize(mobile_attack["objects"])

df = pd.concat([enterprise_df, ics_df, mobile_df], ignore_index=True)

campaign_objects_df = df.loc[df["type"] == "campaign"]

# Resetting the index of the filtered DataFrame to ensure a continuous index starting from 0
campaign_objects_df_reset = campaign_objects_df.reset_index(drop=True)

print(f"{campaign_objects_df_reset.shape[0]} need to be validated.")

validated_campaigns = []

for index, row in campaign_objects_df_reset.iterrows():

    # Convert the row to a Dict
    campaign_dict = row.dropna().to_dict()

    # Initialize the AttackCampaignBuilder with the dictionary
    builder = AttackCampaignBuilder().from_campaign(campaign_dict)

    try:
        attack_campaign = builder.build()
        # If the build is successful, add the AttackCampaign object to the list
        validated_campaigns.append(attack_campaign)
    except Exception as e:
        # Handle validation errors or other exceptions
        print(f"Error creating AttackCampaign object for row {index}: {e}")

print(f"{len(validated_campaigns)} were validated.")
