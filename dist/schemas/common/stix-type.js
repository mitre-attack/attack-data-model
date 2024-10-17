import { z } from 'zod';
const supportedStixTypes = [
    'attack-pattern',
    'bundle',
    'campaign',
    'course-of-action',
    'identity',
    'intrusion-set',
    'malware',
    'tool',
    'marking-definition',
    'x-mitre-data-component',
    'x-mitre-data-source',
    'x-mitre-tactic',
    'x-mitre-asset',
    'x-mitre-matrix',
    'x-mitre-collection',
    'relationship',
    'file', // not used in ATT&CK but used in sample_refs for Malware
    'artifact', // not used in ATT&CK but used in sample_refs for Malware
    // "indicator",         // not used in ATT&CK
    // "observed-data",     // not used in ATT&CK
    // "report",            // not used in ATT&CK
    // "threat-actor",      // not used in ATT&CK
    // "vulnerability",     // not used in ATT&CK
];
export const stixTypeSchema = z
    .enum(supportedStixTypes)
    .describe('The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).');
//# sourceMappingURL=stix-type.js.map