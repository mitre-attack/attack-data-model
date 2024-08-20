import { z } from 'zod';

const VALUES = [
    "attack-pattern",
    "stix-bundle",
    "campaign",
    "course-of-action",
    "identity",
    "indicator", // not used in ATT&CK
    "intrusion-set",
    "malware",
    "observed-data", // not used in ATT&CK
    "report", // not used in ATT&CK
    "threat-actor", // not used in ATT&CK
    "tool",
    "vulnerability", // not used in ATT&CK
    "marking-definition",
    "x-mitre-data-component",
    "x-mitre-data-source",
    "x-mitre-tactic",
    "x-mitre-asset",
    "x-mitre-matrix",
    "x-mitre-collection",
    "relationship",
] as const;

export const StixTypeSchema = z
    .enum(VALUES)
    .describe("The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).")

export type StixType = z.infer<typeof StixTypeSchema>;