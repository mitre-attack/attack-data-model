import json
from pathlib import Path

import jsonschema
import jsonschema.validators


def main():
    cwd = Path.cwd()

    # Access the appropriate bundle
    file = cwd / "cti/enterprise-attack/enterprise-attack.json"
    # for group_bundle_file in groups_dir.iterdir():
    f = open(file, "r")
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
            schema={"$ref": "attack-data-model/schema/json/attack-domain-bundle.schema.json"},
            resolver=resolver,
        )
        print("SUCCESS: "+f"{file}")
    except jsonschema.exceptions.ValidationError as exc:
        print(f"{file} is a mess")
        print(exc)
        print("\n\n====================================================================================\n\n")

if __name__ == "__main__":
    main()
