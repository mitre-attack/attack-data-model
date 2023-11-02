import json
from pathlib import Path

import jsonschema
import jsonschema.validators


def main():
    cwd = Path.cwd()

    # these files are from: https://github.com/mitre/cti
    # stix_file = "attack-releases/stix-2.0/v13.1.json"
    # stix_file = "attack-releases/stix-2.0-v13.1-fsbundle/intrusion-set--0bbdf25b-30ff-4894-a1cd-49260d0dd2d9.json"

    groups_dir = cwd / "attack-releases/stix-2.0-v13.1-fsbundle/enterprise-attack/intrusion-set/"
    for group_bundle_file in groups_dir.iterdir():
        with open(group_bundle_file, "r") as f:
            attack_bundle = json.load(f)

        # Allow jsonschema validator to read from local directories
        path = Path.cwd()
        resolver = jsonschema.validators.RefResolver(
            base_uri=f"{path.as_uri()}/",
            referrer=True,
        )

        try:
            jsonschema.validate(
                instance=attack_bundle,
                # schema={"$ref": "schema/json/attack-group.schema.json"},
                schema={"$ref": "attack-data-model/schema/json/attack-intrusion-set.schema.json"},
                resolver=resolver,
            )
        except jsonschema.exceptions.ValidationError as exc:
            print(f"{group_bundle_file} is a mess")
            print(exc)
            print("\n\n====================================================================================\n\n")


if __name__ == "__main__":
    main()
