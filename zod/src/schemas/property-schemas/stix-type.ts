import { z } from 'zod';

const VALUES = [
    "attack-pattern",
    "campaign",
    "course-of-action",
    "identity",
    "indicator",
    "intrusion-set",
    "malware",
    "observed-data",
    "report",
    "threat-actor",
    "tool",
    "vulnerability",
    "marking-definition",
    "x-mitre-data-component",
    "x-mitre-data-source",
    "x-mitre-tactic",
    "x-mitre-asset",
    "x-mitre-matrix",
    "x-mitre-collection",

] as const;

export const StixTypeSchema = z
    .enum(VALUES)
    .describe("The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).")

export type StixType = z.infer<typeof StixTypeSchema>;