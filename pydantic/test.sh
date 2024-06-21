#!/bin/bash

pytest tests/campaigns/campaigns_pytest.py -k test_validate_campaign_objects_from_dataset
# pytest tests/campaigns/campaigns_pytest.py -k test_remove_external_reference
# pytest tests/campaigns/campaigns_pytest.py -k test_update_external_reference
# pytest tests/campaigns/campaigns_pytest.py -k test_add_external_references_bulk
