import json

from attack_model.models.campaign import STIXObject

schema = STIXObject.schema()

schema_json = json.dumps(schema, indent=4)

print(schema_json)
