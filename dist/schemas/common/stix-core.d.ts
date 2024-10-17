import { z } from 'zod';
export declare const stixDomainObjectSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodEnum<["attack-pattern", "bundle", "campaign", "course-of-action", "identity", "intrusion-set", "malware", "tool", "marking-definition", "x-mitre-data-component", "x-mitre-data-source", "x-mitre-tactic", "x-mitre-asset", "x-mitre-matrix", "x-mitre-collection", "relationship", "file", "artifact"]>;
    id: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    lang: z.ZodOptional<z.ZodString>;
    labels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    spec_version: z.ZodEnum<["2.0", "2.1"]>;
    created: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixCreatedTimestamp">;
    modified: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixModifiedTimestamp">;
    created_by_ref: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `identity--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>>;
    revoked: z.ZodOptional<z.ZodBoolean>;
    confidence: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodNumber>, number | undefined, number | undefined>>;
    external_references: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    object_marking_refs: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, "many">, (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[], (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[]>>;
    granular_markings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        marking_ref: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
        selectors: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }, {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }>, "many">>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        extension_type: z.ZodString;
        extension_properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }, {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>>>;
}, {}>, "strict", z.ZodTypeAny, {
    type: "file" | "attack-pattern" | "bundle" | "campaign" | "course-of-action" | "identity" | "intrusion-set" | "malware" | "tool" | "marking-definition" | "x-mitre-data-component" | "x-mitre-data-source" | "x-mitre-tactic" | "x-mitre-asset" | "x-mitre-matrix" | "x-mitre-collection" | "relationship" | "artifact";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    created: (`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`) & z.BRAND<"StixCreatedTimestamp">;
    modified: (`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`) & z.BRAND<"StixModifiedTimestamp">;
    lang?: string | undefined;
    labels?: string[] | undefined;
    created_by_ref?: `identity--${string}` | undefined;
    revoked?: boolean | undefined;
    confidence?: number | undefined;
    external_references?: {
        source_name: string;
        url?: string | undefined;
        description?: string | undefined;
        external_id?: string | undefined;
    }[] | undefined;
    object_marking_refs?: (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[] | undefined;
    granular_markings?: {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }[] | undefined;
    extensions?: Record<string, Record<string, unknown> | {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }> | undefined;
}, {
    type: "file" | "attack-pattern" | "bundle" | "campaign" | "course-of-action" | "identity" | "intrusion-set" | "malware" | "tool" | "marking-definition" | "x-mitre-data-component" | "x-mitre-data-source" | "x-mitre-tactic" | "x-mitre-asset" | "x-mitre-matrix" | "x-mitre-collection" | "relationship" | "artifact";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    created: `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
    modified: `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
    lang?: string | undefined;
    labels?: string[] | undefined;
    created_by_ref?: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}` | undefined;
    revoked?: boolean | undefined;
    confidence?: number | undefined;
    external_references?: {
        source_name: string;
        url?: string | undefined;
        description?: string | undefined;
        external_id?: string | undefined;
    }[] | undefined;
    object_marking_refs?: (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[] | undefined;
    granular_markings?: {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }[] | undefined;
    extensions?: Record<string, Record<string, unknown> | {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }> | undefined;
}>;
export declare const stixRelationshipObjectSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodEnum<["attack-pattern", "bundle", "campaign", "course-of-action", "identity", "intrusion-set", "malware", "tool", "marking-definition", "x-mitre-data-component", "x-mitre-data-source", "x-mitre-tactic", "x-mitre-asset", "x-mitre-matrix", "x-mitre-collection", "relationship", "file", "artifact"]>;
    id: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    lang: z.ZodOptional<z.ZodString>;
    labels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    spec_version: z.ZodEnum<["2.0", "2.1"]>;
    created: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixCreatedTimestamp">;
    modified: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixModifiedTimestamp">;
    created_by_ref: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `identity--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>>;
    revoked: z.ZodOptional<z.ZodBoolean>;
    confidence: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodNumber>, number | undefined, number | undefined>>;
    external_references: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    object_marking_refs: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, "many">, (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[], (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[]>>;
    granular_markings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        marking_ref: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
        selectors: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }, {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }>, "many">>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        extension_type: z.ZodString;
        extension_properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }, {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>>>;
}, {}>, "strict", z.ZodTypeAny, {
    type: "file" | "attack-pattern" | "bundle" | "campaign" | "course-of-action" | "identity" | "intrusion-set" | "malware" | "tool" | "marking-definition" | "x-mitre-data-component" | "x-mitre-data-source" | "x-mitre-tactic" | "x-mitre-asset" | "x-mitre-matrix" | "x-mitre-collection" | "relationship" | "artifact";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    created: (`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`) & z.BRAND<"StixCreatedTimestamp">;
    modified: (`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`) & z.BRAND<"StixModifiedTimestamp">;
    lang?: string | undefined;
    labels?: string[] | undefined;
    created_by_ref?: `identity--${string}` | undefined;
    revoked?: boolean | undefined;
    confidence?: number | undefined;
    external_references?: {
        source_name: string;
        url?: string | undefined;
        description?: string | undefined;
        external_id?: string | undefined;
    }[] | undefined;
    object_marking_refs?: (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[] | undefined;
    granular_markings?: {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }[] | undefined;
    extensions?: Record<string, Record<string, unknown> | {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }> | undefined;
}, {
    type: "file" | "attack-pattern" | "bundle" | "campaign" | "course-of-action" | "identity" | "intrusion-set" | "malware" | "tool" | "marking-definition" | "x-mitre-data-component" | "x-mitre-data-source" | "x-mitre-tactic" | "x-mitre-asset" | "x-mitre-matrix" | "x-mitre-collection" | "relationship" | "artifact";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    created: `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
    modified: `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
    lang?: string | undefined;
    labels?: string[] | undefined;
    created_by_ref?: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}` | undefined;
    revoked?: boolean | undefined;
    confidence?: number | undefined;
    external_references?: {
        source_name: string;
        url?: string | undefined;
        description?: string | undefined;
        external_id?: string | undefined;
    }[] | undefined;
    object_marking_refs?: (`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`)[] | undefined;
    granular_markings?: {
        marking_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
        selectors: string[];
    }[] | undefined;
    extensions?: Record<string, Record<string, unknown> | {
        extension_type: string;
        extension_properties: Record<string, unknown>;
    }> | undefined;
}>;
export type SDO = z.infer<typeof stixDomainObjectSchema>;
export type SRO = z.infer<typeof stixRelationshipObjectSchema>;
//# sourceMappingURL=stix-core.d.ts.map