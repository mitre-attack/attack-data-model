import os
import pytest
import pandas as pd
from pydantic import ValidationError

from attack_model.builders.campaign_builder import AttackCampaignBuilder


@pytest.fixture
def builder():
    return AttackCampaignBuilder()


# Function to download or load a dataset
def download_or_load_dataset(url, local_filename):
    if not os.path.exists(local_filename):
        df = pd.read_json(url)
        df.to_json(local_filename, orient="records")
    else:
        df = pd.read_json(local_filename)
    return df


# The scope="session" parameter ensures that the fixture is executed only once per test session.
@pytest.fixture(scope="session")
def load_campaign_data():
    # Define local filenames
    enterprise_local = "enterprise-attack.json"
    ics_local = "ics-attack.json"
    mobile_local = "mobile-attack.json"

    # URLs for the datasets
    enterprise_url = "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json"
    ics_url = "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack.json"
    mobile_url = (
        "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack.json"
    )

    # Download or load datasets
    enterprise_df = pd.json_normalize(download_or_load_dataset(enterprise_url, enterprise_local)["objects"])
    ics_df = pd.json_normalize(download_or_load_dataset(ics_url, ics_local)["objects"])
    mobile_df = pd.json_normalize(download_or_load_dataset(mobile_url, mobile_local)["objects"])

    # Combine the datasets
    df = pd.concat([enterprise_df, ics_df, mobile_df], ignore_index=True)

    return df[df["type"] == "campaign"].reset_index(drop=True)


# Test to ensure the reset method correctly clears all previously set campaign information.
def test_reset_method(builder):
    """
    Test the reset method to ensure it clears any set campaign information,
    returning the builder to its default state.
    """
    builder.set_name("Test Campaign").reset()
    assert builder.campaign_info.get("name") == "", "The reset method should clear the campaign name"


# Test to validate that the builder can correctly create campaign objects from a dataset.
def test_validate_campaign_objects_from_dataset(load_campaign_data):
    """
    Validates that the builder can correctly create campaign objects from a provided dataset,
    ensuring each campaign object is correctly formed according to the Pydantic model.
    """
    validated_campaigns = []
    for _, row in load_campaign_data.iterrows():
        campaign_dict = row.dropna().to_dict()
        builder = AttackCampaignBuilder().from_campaign(campaign_dict)
        try:
            attack_campaign = builder.build()
            validated_campaigns.append(attack_campaign)
        except ValidationError:
            pytest.fail(f"Validation failed for campaign: {campaign_dict['id']}")
    assert len(validated_campaigns) > 0, "Should validate and create campaign objects"


# Test to verify manual data entry and method chaining works as expected.
def test_builder_with_manual_data_and_method_chaining(builder):
    """
    Ensures that the builder supports method chaining for setting various campaign attributes
    and that these attributes are correctly reflected in the built campaign object.
    """
    campaign = (
        builder.set_id("campaign--1234abcd-12ab-34cd-56ef-1234567890ab")
        .set_name("Example Campaign")
        .set_description("An example ATT&CK campaign")
        .set_x_mitre_attack_spec_version("1.0")
        .add_external_reference(source_name="source1", description="ext ref description")
        .add_external_reference(source_name="source2", description="ext ref description", external_id="exid1")
        .add_external_reference(
            source_name="source3",
            description="ext ref description",
            external_id="exid2",
            url="https://attack.mitre.org",
        )
        .build()
    )
    assert (
        campaign.id == "campaign--1234abcd-12ab-34cd-56ef-1234567890ab"
    ), "Campaign ID should match the manually set value"


# Test for verifying the functionality of removing an external reference.
def test_remove_external_reference(builder):
    """
    Tests the ability of the builder to remove an external reference from the campaign,
    ensuring the external references list is updated accordingly.
    """
    builder.add_external_reference(source_name="source1").remove_external_reference(0)
    assert len(builder.campaign_info.get("external_references", [])) == 0, "Should remove the external reference"


# Test for verifying the functionality of updating an external reference.
def test_update_external_reference(builder):
    """
    Tests the builder's ability to update details of an existing external reference,
    ensuring changes are accurately reflected in the campaign information.
    """
    builder.add_external_reference(source_name="source1", description="Original")
    builder.update_external_reference(0, description="Updated")
    assert (
        builder.campaign_info["external_references"][0]["description"] == "Updated"
    ), "Should update the external reference's description"


# Test for verifying bulk addition of external references.
def test_add_external_references_bulk(builder):
    """
    Tests the builder's capability to add multiple external references in bulk,
    streamlining the process of setting up campaign information.
    """
    references = [{"source_name": "source1"}, {"source_name": "source2"}]
    builder.add_external_references_bulk(references)
    assert len(builder.campaign_info["external_references"]) == 2, "Should add two external references in bulk"


# Test to ensure importing campaign information from a JSON file functions correctly.
def test_import_from_json(builder):
    """
    Validates the builder's functionality to import campaign information from a JSON file,
    populating the builder's campaign information accordingly.
    """
    builder.import_from_json("campaign_example.json")
    assert builder.campaign_info["name"] == "Imported Campaign", "Import should correctly populate campaign_info"


# Test to ensure exporting campaign information to a JSON file functions correctly.
def test_export_to_json(builder):
    """
    Verifies that the builder can export the current campaign information to a JSON file,
    creating the file with the expected content.
    """
    test_file_path = "test_campaign_export.json"
    builder.set_name("Export Test").export_to_json(test_file_path)
    assert os.path.isfile(test_file_path), "Export should create a file"
    os.remove(test_file_path)  # Cleanup after test


# Test to ensure the preview method provides an accurate representation of the current campaign information.
def test_preview_method(builder):
    """
    Tests the preview method to ensure it provides a correct and readable summary
    of the current state of the campaign information being built.
    """
    builder.set_name("Preview Test")
    preview = builder.preview()
    assert "Preview Test" in preview, "Preview should include the campaign name"


# Test to verify that cloning a builder works correctly, creating an independent copy.
def test_clone_method(builder):
    """
    Validates the clone method of the builder, ensuring that it produces an independent copy
    of the builder that can be modified without affecting the original.
    """
    original_builder = builder.set_name("Original")
    cloned_builder = original_builder.clone()
    cloned_builder.set_name("Cloned")

    assert (
        original_builder.campaign_info["name"] != cloned_builder.campaign_info["name"]
    ), "Cloned builder should be a separate instance with its own state"
