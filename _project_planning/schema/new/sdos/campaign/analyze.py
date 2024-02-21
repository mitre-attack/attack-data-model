import pandas as pd

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

# Exclude objects of type 'relationship' and 'marking-definition'
sdos = df[~df["type"].isin(["relationship", "marking-definition"])]

campaign_counts_all = sdos[sdos["type"] == "campaign"].count()
campaign_counts_non_zero = campaign_counts_all[campaign_counts_all > 0].sort_index()

# Convert Series to DataFrame for modification
campaign_counts_df = pd.DataFrame(campaign_counts_non_zero, columns=["Count"])

total_campaigns = max(campaign_counts_df.values)[0]

# Add 'Required in ATT&CK' column based on the count
campaign_counts_df["Required in ATT&CK"] = campaign_counts_df["Count"].apply(
    lambda x: f"True ({x}/{total_campaigns})" if x == total_campaigns else f"False ({x}/{total_campaigns})"
)

# Convert the index to a non-index column called 'Property'
campaigns = campaign_counts_df.reset_index(drop=False)
campaigns.rename(columns={"index": "Property"}, inplace=True)

print(campaigns.to_markdown(index=False))
