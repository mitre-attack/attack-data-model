python3 setup.py sdist bdist_wheel
pip install dist/attack_model-0.1.0-py3-none-any.whl --force-reinstall
python3 tests/campaigns/campaign_builder_from_existing.py
