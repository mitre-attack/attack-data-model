import json
from pathlib import Path

import jsonschema
import jsonschema.validators


def main():
    cwd = Path.cwd()

    # Access the appropriate bundle
    file = cwd / "attack-releases/stix-2.0/v14.1/enterprise-attack.json"

    with open(file, "r") as f:
        attack_bundle = json.load(f)

    # Allow jsonschema validator to read from local directories
    resolver = jsonschema.validators.RefResolver(
        base_uri=f"{cwd.as_uri()}/",
        referrer=True,
    )

    try:
        jsonschema.validate(
            instance=attack_bundle,
            schema={"$ref": "schema/json/attack-domain-bundle.schema.json"},
            resolver=resolver,
        )
        print("SUCCESS: "+f"{file}")
    except jsonschema.exceptions.ValidationError as exc:
        print(f"{file} is a mess")
        print(exc)
        print("\n\n====================================================================================\n\n")

if __name__ == "__main__":
    main()
