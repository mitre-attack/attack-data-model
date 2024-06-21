import { z } from "zod";
import { StixObject, StixObjectSchema } from "../src/types/stix-object";

// Example of a valid STIX object
// const validStixObject = {
//   id: 'indicator--00000000-0000-4000-8000-000000000000',
//   type: 'indicator',
//   spec_version: '2.1',
//   created: '2023-06-22T15:30:00.000Z',
//   modified: '2023-06-22T15:30:00.000Z',
// };
const validStixObject = {
    "id": "indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f",
    "type": "indicator",
    "spec_version": "2.1",
    "created": "2023-06-21T09:30:00.000Z",
    "modified": "2023-06-21T09:30:00.000Z",
    "created_by_ref": "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff",
    "labels": ["malicious-activity", "phishing"],
    "revoked": false,
    "confidence": 85,
    "lang": "en",
    "external_references": [
      {
        "source_name": "ACME Threat Intel",
        "description": "This indicator was reported by ACME Threat Intelligence Team",
        "url": "https://example.com/threat-report-101"
      }
    ],
    "object_marking_refs": ["marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da"],
    "granular_markings": [
      {
        "lang": "en",
        "marking_ref": "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
        "selectors": ["sel-0", "sel-1"]
      }
    ],
    "extensions": {
      "extension-definition--d83fce45-ef58-4c6c-a3f4-1fbc32e98c6e": {
        "extension_type": "property-extension",
        "severity": "high"
      }
    }
  }

const parsedObject: StixObject = StixObjectSchema.parse(validStixObject);

console.log(parsedObject);
// {
//     id: {
//       type: 'indicator',
//       uuid: '00000000-0000-4000-8000-000000000000',
//       toString: [Function: toString]
//     },
//     type: 'indicator',
//     spec_version: '2.1',
//     created: { value: 2023-06-22T15:30:00.000Z, toString: [Function: toString] },
//     modified: { value: 2023-06-22T15:30:00.000Z, toString: [Function: toString] }
// }

console.log(parsedObject.toJSON());

// {
//     id: 'indicator--00000000-0000-4000-8000-000000000000',
//     type: 'indicator',
//     spec_version: '2.1',
//     created: '2023-06-22T15:30:00Z',
//     modified: '2023-06-22T15:30:00Z'
// }