import { ZodError, z } from "zod";
import { StixObject, SDOSchema } from "../src/schemas/common/core-stix-sdo.schema";

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

const parsedObject: StixObject = SDOSchema.parse(validStixObject);

console.log(parsedObject);
// {
//   id: 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f',
//   type: 'indicator',
//   spec_version: '2.1',
//   created: '2023-06-21T09:30:00.000Z',
//   modified: '2023-06-21T09:30:00.000Z',
//   created_by_ref: 'identity--f431f809-377b-45e0-aa1c-6a4751cae5ff',
//   labels: [ 'malicious-activity', 'phishing' ],
//   revoked: false,
//   confidence: 85,
//   lang: 'en',
//   external_references: [
//     {
//       source_name: 'ACME Threat Intel',
//       description: 'This indicator was reported by ACME Threat Intelligence Team',
//       url: 'https://example.com/threat-report-101'
//     }
//   ],
//   object_marking_refs: [ 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da' ],
//   granular_markings: [
//     {
//       marking_ref: 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da',
//       selectors: [Array]
//     }
//   ],
//   extensions: {
//     'extension-definition--d83fce45-ef58-4c6c-a3f4-1fbc32e98c6e': { extension_type: 'property-extension', severity: 'high' }
//   }
// }


const { spec_version } = validStixObject;
const invalidObject = { spec_version }; // missing a ton of properties!

try {
  const parsedTimestampBad: StixObject = SDOSchema.parse(invalidObject);
  console.log(parsedTimestampBad);
} catch (error) {
  console.log((error as ZodError).flatten());
  // {
  //   formErrors: [],
  //   fieldErrors: {
  //     id: [ 'Invalid STIX Identifier' ],
  //     type: [ 'Required' ],
  //     created: [ 'Invalid input' ],
  //     modified: [ 'Invalid input' ]
  //   }
  // }
}