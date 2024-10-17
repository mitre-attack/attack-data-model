import { z } from 'zod';
export declare const stixTypeSchema: z.ZodEnum<["attack-pattern", "bundle", "campaign", "course-of-action", "identity", "intrusion-set", "malware", "tool", "marking-definition", "x-mitre-data-component", "x-mitre-data-source", "x-mitre-tactic", "x-mitre-asset", "x-mitre-matrix", "x-mitre-collection", "relationship", "file", "artifact"]>;
export type StixType = z.infer<typeof stixTypeSchema>;
//# sourceMappingURL=stix-type.d.ts.map