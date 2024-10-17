import { z } from 'zod';
import { type Malware } from './malware.schema.js';
import { type Asset } from './asset.schema.js';
import { type Campaign } from './campaign.schema.js';
import { type DataComponent } from './data-component.schema.js';
import { type DataSource } from './data-source.schema.js';
import { type Identity } from './identity.schema.js';
import { type Matrix } from './matrix.schema.js';
import { type Tool } from './tool.schema.js';
import { type Tactic } from './tactic.schema.js';
import { type Technique } from './technique.schema.js';
import { type Group } from './group.schema.js';
import { type Mitigation } from './mitigation.schema.js';
import { type Collection } from './collection.schema.js';
import { type Relationship } from '../sro/relationship.schema.js';
import { type MarkingDefinition } from '../smo/marking-definition.schema.js';
import '../../errors';
export type AttackObject = Malware | Asset | Campaign | Collection | DataComponent | DataSource | Identity | Matrix | Tool | Tactic | Technique | Group | Mitigation | Relationship | MarkingDefinition;
export declare const attackObjectsSchema: z.ZodTypeAny;
export type AttackObjects = z.infer<typeof attackObjectsSchema>;
export declare const baseStixBundleSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `bundle--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    type: z.ZodLiteral<"bundle">;
    spec_version: z.ZodEnum<["2.0", "2.1"]>;
    objects: z.ZodTypeAny;
}, "strip", z.ZodTypeAny, {
    type: "bundle";
    id: `bundle--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}, {
    type: "bundle";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}>;
export declare const stixBundleSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `bundle--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    type: z.ZodLiteral<"bundle">;
    spec_version: z.ZodEnum<["2.0", "2.1"]>;
    objects: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    type: "bundle";
    id: `bundle--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}, {
    type: "bundle";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}>, {
    type: "bundle";
    id: `bundle--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}, {
    type: "bundle";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    objects?: any;
}>;
export type StixBundle = z.infer<typeof stixBundleSchema>;
//# sourceMappingURL=stix-bundle.schema.d.ts.map