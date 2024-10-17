import { z } from 'zod';
export declare const externalReferenceSchema: z.ZodObject<{
    source_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    source_name: string;
    url?: string | undefined;
    description?: string | undefined;
    external_id?: string | undefined;
}, {
    source_name: string;
    url?: string | undefined;
    description?: string | undefined;
    external_id?: string | undefined;
}>;
export declare const externalReferencesSchema: z.ZodArray<z.ZodObject<{
    source_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    source_name: string;
    url?: string | undefined;
    description?: string | undefined;
    external_id?: string | undefined;
}, {
    source_name: string;
    url?: string | undefined;
    description?: string | undefined;
    external_id?: string | undefined;
}>, "many">;
export type ExternalReference = z.infer<typeof externalReferenceSchema>;
export type ExternalReferences = z.infer<typeof externalReferencesSchema>;
export declare const stixCreatedByRefSchema: z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `identity--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
export type StixCreatedByRef = z.infer<typeof stixCreatedByRefSchema>;
export declare const granularMarkingSchema: z.ZodObject<{
    marking_ref: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    selectors: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    selectors: string[];
}, {
    marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    selectors: string[];
}>;
export type GranularMarking = z.infer<typeof granularMarkingSchema>;
export declare const extensionSchema: z.ZodObject<{
    extension_type: z.ZodString;
    extension_properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    extension_type: string;
    extension_properties: Record<string, unknown>;
}, {
    extension_type: string;
    extension_properties: Record<string, unknown>;
}>;
export type Extension = z.infer<typeof extensionSchema>;
export declare const extensionsSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
    extension_type: z.ZodString;
    extension_properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    extension_type: string;
    extension_properties: Record<string, unknown>;
}, {
    extension_type: string;
    extension_properties: Record<string, unknown>;
}>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>>;
export type Extensions = z.infer<typeof extensionsSchema>;
//# sourceMappingURL=misc.d.ts.map