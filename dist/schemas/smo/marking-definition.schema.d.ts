import { z } from 'zod';
export declare const tlpMarkingObjectSchema: z.ZodObject<{
    tlp: z.ZodString;
}, "strict", z.ZodTypeAny, {
    tlp: string;
}, {
    tlp: string;
}>;
export declare const baseMarkingDefinitionSchema: z.ZodObject<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "marking-definition";
    id: string;
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: string;
    };
}, {
    name: string;
    type: "marking-definition";
    id: string;
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: string;
    };
}>;
export declare const tlpWhiteSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9">;
    name: z.ZodLiteral<"TLP:WHITE">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"white">;
    }, "strip", z.ZodTypeAny, {
        tlp: "white";
    }, {
        tlp: "white";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:WHITE";
    type: "marking-definition";
    id: "marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "white";
    };
}, {
    name: "TLP:WHITE";
    type: "marking-definition";
    id: "marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "white";
    };
}>;
export declare const tlpGreenSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da">;
    name: z.ZodLiteral<"TLP:GREEN">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"green">;
    }, "strip", z.ZodTypeAny, {
        tlp: "green";
    }, {
        tlp: "green";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:GREEN";
    type: "marking-definition";
    id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "green";
    };
}, {
    name: "TLP:GREEN";
    type: "marking-definition";
    id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "green";
    };
}>;
export declare const tlpAmberSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--f88d31f6-486f-44da-b317-01333bde0b82">;
    name: z.ZodLiteral<"TLP:AMBER">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"amber">;
    }, "strip", z.ZodTypeAny, {
        tlp: "amber";
    }, {
        tlp: "amber";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:AMBER";
    type: "marking-definition";
    id: "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "amber";
    };
}, {
    name: "TLP:AMBER";
    type: "marking-definition";
    id: "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "amber";
    };
}>;
export declare const tlpRedSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed">;
    name: z.ZodLiteral<"TLP:RED">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"red">;
    }, "strip", z.ZodTypeAny, {
        tlp: "red";
    }, {
        tlp: "red";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:RED";
    type: "marking-definition";
    id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "red";
    };
}, {
    name: "TLP:RED";
    type: "marking-definition";
    id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "red";
    };
}>;
export declare const tlpMarkingDefinitionSchema: z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9">;
    name: z.ZodLiteral<"TLP:WHITE">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"white">;
    }, "strip", z.ZodTypeAny, {
        tlp: "white";
    }, {
        tlp: "white";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:WHITE";
    type: "marking-definition";
    id: "marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "white";
    };
}, {
    name: "TLP:WHITE";
    type: "marking-definition";
    id: "marking-definition--613f2e26-407d-48c7-9eca-b8e91df99dc9";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "white";
    };
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da">;
    name: z.ZodLiteral<"TLP:GREEN">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"green">;
    }, "strip", z.ZodTypeAny, {
        tlp: "green";
    }, {
        tlp: "green";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:GREEN";
    type: "marking-definition";
    id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "green";
    };
}, {
    name: "TLP:GREEN";
    type: "marking-definition";
    id: "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "green";
    };
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--f88d31f6-486f-44da-b317-01333bde0b82">;
    name: z.ZodLiteral<"TLP:AMBER">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"amber">;
    }, "strip", z.ZodTypeAny, {
        tlp: "amber";
    }, {
        tlp: "amber";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:AMBER";
    type: "marking-definition";
    id: "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "amber";
    };
}, {
    name: "TLP:AMBER";
    type: "marking-definition";
    id: "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "amber";
    };
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"marking-definition">;
    spec_version: z.ZodLiteral<"2.1">;
    id: z.ZodString;
    created: z.ZodString;
    definition_type: z.ZodLiteral<"tlp">;
    name: z.ZodString;
    definition: z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>;
}, {
    id: z.ZodLiteral<"marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed">;
    name: z.ZodLiteral<"TLP:RED">;
    definition: z.ZodObject<{
        tlp: z.ZodLiteral<"red">;
    }, "strip", z.ZodTypeAny, {
        tlp: "red";
    }, {
        tlp: "red";
    }>;
}>, "strict", z.ZodTypeAny, {
    name: "TLP:RED";
    type: "marking-definition";
    id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "red";
    };
}, {
    name: "TLP:RED";
    type: "marking-definition";
    id: "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed";
    spec_version: "2.1";
    created: string;
    definition_type: "tlp";
    definition: {
        tlp: "red";
    };
}>]>;
export type TlpMarkingDefinition = z.infer<typeof tlpMarkingDefinitionSchema>;
export type TlpMarkingObject = z.infer<typeof tlpMarkingObjectSchema>;
export declare const statementMarkingObjectSchema: z.ZodObject<{
    statement: z.ZodString;
}, "strict", z.ZodTypeAny, {
    statement: string;
}, {
    statement: string;
}>;
export declare const markingDefinitionSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `marking-definition--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    type: z.ZodLiteral<"marking-definition">;
    name: z.ZodOptional<z.ZodString>;
    spec_version: z.ZodEnum<["2.0", "2.1"]>;
    created: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixCreatedTimestamp">;
    created_by_ref: z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `identity--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
    definition_type: z.ZodEnum<["statement", "tlp"]>;
    definition: z.ZodUnion<[z.ZodObject<{
        tlp: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        tlp: string;
    }, {
        tlp: string;
    }>, z.ZodObject<{
        statement: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        statement: string;
    }, {
        statement: string;
    }>]>;
    x_mitre_domains: z.ZodArray<z.ZodEnum<["enterprise-attack", "mobile-attack", "ics-attack"]>, "many">;
    x_mitre_attack_spec_version: z.ZodEffects<z.ZodString, "0.0.0" | "0.0.2" | "0.0.1" | "0.0.3" | "0.0.4" | "0.0.8" | "0.0.5" | "0.0.6" | "0.0.7" | "0.0.9" | "0.2.0" | "0.2.2" | "0.2.1" | "0.2.3" | "0.2.4" | "0.2.8" | "0.2.5" | "0.2.6" | "0.2.7" | "0.2.9" | "0.1.0" | "0.1.2" | "0.1.1" | "0.1.3" | "0.1.4" | "0.1.8" | "0.1.5" | "0.1.6" | "0.1.7" | "0.1.9" | "0.3.0" | "0.3.2" | "0.3.1" | "0.3.3" | "0.3.4" | "0.3.8" | "0.3.5" | "0.3.6" | "0.3.7" | "0.3.9" | "0.4.0" | "0.4.2" | "0.4.1" | "0.4.3" | "0.4.4" | "0.4.8" | "0.4.5" | "0.4.6" | "0.4.7" | "0.4.9" | "0.8.0" | "0.8.2" | "0.8.1" | "0.8.3" | "0.8.4" | "0.8.8" | "0.8.5" | "0.8.6" | "0.8.7" | "0.8.9" | "0.5.0" | "0.5.2" | "0.5.1" | "0.5.3" | "0.5.4" | "0.5.8" | "0.5.5" | "0.5.6" | "0.5.7" | "0.5.9" | "0.6.0" | "0.6.2" | "0.6.1" | "0.6.3" | "0.6.4" | "0.6.8" | "0.6.5" | "0.6.6" | "0.6.7" | "0.6.9" | "0.7.0" | "0.7.2" | "0.7.1" | "0.7.3" | "0.7.4" | "0.7.8" | "0.7.5" | "0.7.6" | "0.7.7" | "0.7.9" | "0.9.0" | "0.9.2" | "0.9.1" | "0.9.3" | "0.9.4" | "0.9.8" | "0.9.5" | "0.9.6" | "0.9.7" | "0.9.9" | "2.0.0" | "2.0.2" | "2.0.1" | "2.0.3" | "2.0.4" | "2.0.8" | "2.0.5" | "2.0.6" | "2.0.7" | "2.0.9" | "2.2.0" | "2.2.2" | "2.2.1" | "2.2.3" | "2.2.4" | "2.2.8" | "2.2.5" | "2.2.6" | "2.2.7" | "2.2.9" | "2.1.0" | "2.1.2" | "2.1.1" | "2.1.3" | "2.1.4" | "2.1.8" | "2.1.5" | "2.1.6" | "2.1.7" | "2.1.9" | "2.3.0" | "2.3.2" | "2.3.1" | "2.3.3" | "2.3.4" | "2.3.8" | "2.3.5" | "2.3.6" | "2.3.7" | "2.3.9" | "2.4.0" | "2.4.2" | "2.4.1" | "2.4.3" | "2.4.4" | "2.4.8" | "2.4.5" | "2.4.6" | "2.4.7" | "2.4.9" | "2.8.0" | "2.8.2" | "2.8.1" | "2.8.3" | "2.8.4" | "2.8.8" | "2.8.5" | "2.8.6" | "2.8.7" | "2.8.9" | "2.5.0" | "2.5.2" | "2.5.1" | "2.5.3" | "2.5.4" | "2.5.8" | "2.5.5" | "2.5.6" | "2.5.7" | "2.5.9" | "2.6.0" | "2.6.2" | "2.6.1" | "2.6.3" | "2.6.4" | "2.6.8" | "2.6.5" | "2.6.6" | "2.6.7" | "2.6.9" | "2.7.0" | "2.7.2" | "2.7.1" | "2.7.3" | "2.7.4" | "2.7.8" | "2.7.5" | "2.7.6" | "2.7.7" | "2.7.9" | "2.9.0" | "2.9.2" | "2.9.1" | "2.9.3" | "2.9.4" | "2.9.8" | "2.9.5" | "2.9.6" | "2.9.7" | "2.9.9" | "1.0.0" | "1.0.2" | "1.0.1" | "1.0.3" | "1.0.4" | "1.0.8" | "1.0.5" | "1.0.6" | "1.0.7" | "1.0.9" | "1.2.0" | "1.2.2" | "1.2.1" | "1.2.3" | "1.2.4" | "1.2.8" | "1.2.5" | "1.2.6" | "1.2.7" | "1.2.9" | "1.1.0" | "1.1.2" | "1.1.1" | "1.1.3" | "1.1.4" | "1.1.8" | "1.1.5" | "1.1.6" | "1.1.7" | "1.1.9" | "1.3.0" | "1.3.2" | "1.3.1" | "1.3.3" | "1.3.4" | "1.3.8" | "1.3.5" | "1.3.6" | "1.3.7" | "1.3.9" | "1.4.0" | "1.4.2" | "1.4.1" | "1.4.3" | "1.4.4" | "1.4.8" | "1.4.5" | "1.4.6" | "1.4.7" | "1.4.9" | "1.8.0" | "1.8.2" | "1.8.1" | "1.8.3" | "1.8.4" | "1.8.8" | "1.8.5" | "1.8.6" | "1.8.7" | "1.8.9" | "1.5.0" | "1.5.2" | "1.5.1" | "1.5.3" | "1.5.4" | "1.5.8" | "1.5.5" | "1.5.6" | "1.5.7" | "1.5.9" | "1.6.0" | "1.6.2" | "1.6.1" | "1.6.3" | "1.6.4" | "1.6.8" | "1.6.5" | "1.6.6" | "1.6.7" | "1.6.9" | "1.7.0" | "1.7.2" | "1.7.1" | "1.7.3" | "1.7.4" | "1.7.8" | "1.7.5" | "1.7.6" | "1.7.7" | "1.7.9" | "1.9.0" | "1.9.2" | "1.9.1" | "1.9.3" | "1.9.4" | "1.9.8" | "1.9.5" | "1.9.6" | "1.9.7" | "1.9.9" | "3.0.0" | "3.0.2" | "3.0.1" | "3.0.3" | "3.0.4" | "3.0.8" | "3.0.5" | "3.0.6" | "3.0.7" | "3.0.9" | "3.2.0" | "3.2.2" | "3.2.1" | "3.2.3" | "3.2.4" | "3.2.8" | "3.2.5" | "3.2.6" | "3.2.7" | "3.2.9" | "3.1.0" | "3.1.2" | "3.1.1" | "3.1.3" | "3.1.4" | "3.1.8" | "3.1.5" | "3.1.6" | "3.1.7" | "3.1.9" | "3.3.0" | "3.3.2" | "3.3.1" | "3.3.3" | "3.3.4" | "3.3.8" | "3.3.5" | "3.3.6" | "3.3.7" | "3.3.9" | "3.4.0" | "3.4.2" | "3.4.1" | "3.4.3" | "3.4.4" | "3.4.8" | "3.4.5" | "3.4.6" | "3.4.7" | "3.4.9" | "3.8.0" | "3.8.2" | "3.8.1" | "3.8.3" | "3.8.4" | "3.8.8" | "3.8.5" | "3.8.6" | "3.8.7" | "3.8.9" | "3.5.0" | "3.5.2" | "3.5.1" | "3.5.3" | "3.5.4" | "3.5.8" | "3.5.5" | "3.5.6" | "3.5.7" | "3.5.9" | "3.6.0" | "3.6.2" | "3.6.1" | "3.6.3" | "3.6.4" | "3.6.8" | "3.6.5" | "3.6.6" | "3.6.7" | "3.6.9" | "3.7.0" | "3.7.2" | "3.7.1" | "3.7.3" | "3.7.4" | "3.7.8" | "3.7.5" | "3.7.6" | "3.7.7" | "3.7.9" | "3.9.0" | "3.9.2" | "3.9.1" | "3.9.3" | "3.9.4" | "3.9.8" | "3.9.5" | "3.9.6" | "3.9.7" | "3.9.9" | "4.0.0" | "4.0.2" | "4.0.1" | "4.0.3" | "4.0.4" | "4.0.8" | "4.0.5" | "4.0.6" | "4.0.7" | "4.0.9" | "4.2.0" | "4.2.2" | "4.2.1" | "4.2.3" | "4.2.4" | "4.2.8" | "4.2.5" | "4.2.6" | "4.2.7" | "4.2.9" | "4.1.0" | "4.1.2" | "4.1.1" | "4.1.3" | "4.1.4" | "4.1.8" | "4.1.5" | "4.1.6" | "4.1.7" | "4.1.9" | "4.3.0" | "4.3.2" | "4.3.1" | "4.3.3" | "4.3.4" | "4.3.8" | "4.3.5" | "4.3.6" | "4.3.7" | "4.3.9" | "4.4.0" | "4.4.2" | "4.4.1" | "4.4.3" | "4.4.4" | "4.4.8" | "4.4.5" | "4.4.6" | "4.4.7" | "4.4.9" | "4.8.0" | "4.8.2" | "4.8.1" | "4.8.3" | "4.8.4" | "4.8.8" | "4.8.5" | "4.8.6" | "4.8.7" | "4.8.9" | "4.5.0" | "4.5.2" | "4.5.1" | "4.5.3" | "4.5.4" | "4.5.8" | "4.5.5" | "4.5.6" | "4.5.7" | "4.5.9" | "4.6.0" | "4.6.2" | "4.6.1" | "4.6.3" | "4.6.4" | "4.6.8" | "4.6.5" | "4.6.6" | "4.6.7" | "4.6.9" | "4.7.0" | "4.7.2" | "4.7.1" | "4.7.3" | "4.7.4" | "4.7.8" | "4.7.5" | "4.7.6" | "4.7.7" | "4.7.9" | "4.9.0" | "4.9.2" | "4.9.1" | "4.9.3" | "4.9.4" | "4.9.8" | "4.9.5" | "4.9.6" | "4.9.7" | "4.9.9" | "8.0.0" | "8.0.2" | "8.0.1" | "8.0.3" | "8.0.4" | "8.0.8" | "8.0.5" | "8.0.6" | "8.0.7" | "8.0.9" | "8.2.0" | "8.2.2" | "8.2.1" | "8.2.3" | "8.2.4" | "8.2.8" | "8.2.5" | "8.2.6" | "8.2.7" | "8.2.9" | "8.1.0" | "8.1.2" | "8.1.1" | "8.1.3" | "8.1.4" | "8.1.8" | "8.1.5" | "8.1.6" | "8.1.7" | "8.1.9" | "8.3.0" | "8.3.2" | "8.3.1" | "8.3.3" | "8.3.4" | "8.3.8" | "8.3.5" | "8.3.6" | "8.3.7" | "8.3.9" | "8.4.0" | "8.4.2" | "8.4.1" | "8.4.3" | "8.4.4" | "8.4.8" | "8.4.5" | "8.4.6" | "8.4.7" | "8.4.9" | "8.8.0" | "8.8.2" | "8.8.1" | "8.8.3" | "8.8.4" | "8.8.8" | "8.8.5" | "8.8.6" | "8.8.7" | "8.8.9" | "8.5.0" | "8.5.2" | "8.5.1" | "8.5.3" | "8.5.4" | "8.5.8" | "8.5.5" | "8.5.6" | "8.5.7" | "8.5.9" | "8.6.0" | "8.6.2" | "8.6.1" | "8.6.3" | "8.6.4" | "8.6.8" | "8.6.5" | "8.6.6" | "8.6.7" | "8.6.9" | "8.7.0" | "8.7.2" | "8.7.1" | "8.7.3" | "8.7.4" | "8.7.8" | "8.7.5" | "8.7.6" | "8.7.7" | "8.7.9" | "8.9.0" | "8.9.2" | "8.9.1" | "8.9.3" | "8.9.4" | "8.9.8" | "8.9.5" | "8.9.6" | "8.9.7" | "8.9.9" | "5.0.0" | "5.0.2" | "5.0.1" | "5.0.3" | "5.0.4" | "5.0.8" | "5.0.5" | "5.0.6" | "5.0.7" | "5.0.9" | "5.2.0" | "5.2.2" | "5.2.1" | "5.2.3" | "5.2.4" | "5.2.8" | "5.2.5" | "5.2.6" | "5.2.7" | "5.2.9" | "5.1.0" | "5.1.2" | "5.1.1" | "5.1.3" | "5.1.4" | "5.1.8" | "5.1.5" | "5.1.6" | "5.1.7" | "5.1.9" | "5.3.0" | "5.3.2" | "5.3.1" | "5.3.3" | "5.3.4" | "5.3.8" | "5.3.5" | "5.3.6" | "5.3.7" | "5.3.9" | "5.4.0" | "5.4.2" | "5.4.1" | "5.4.3" | "5.4.4" | "5.4.8" | "5.4.5" | "5.4.6" | "5.4.7" | "5.4.9" | "5.8.0" | "5.8.2" | "5.8.1" | "5.8.3" | "5.8.4" | "5.8.8" | "5.8.5" | "5.8.6" | "5.8.7" | "5.8.9" | "5.5.0" | "5.5.2" | "5.5.1" | "5.5.3" | "5.5.4" | "5.5.8" | "5.5.5" | "5.5.6" | "5.5.7" | "5.5.9" | "5.6.0" | "5.6.2" | "5.6.1" | "5.6.3" | "5.6.4" | "5.6.8" | "5.6.5" | "5.6.6" | "5.6.7" | "5.6.9" | "5.7.0" | "5.7.2" | "5.7.1" | "5.7.3" | "5.7.4" | "5.7.8" | "5.7.5" | "5.7.6" | "5.7.7" | "5.7.9" | "5.9.0" | "5.9.2" | "5.9.1" | "5.9.3" | "5.9.4" | "5.9.8" | "5.9.5" | "5.9.6" | "5.9.7" | "5.9.9" | "6.0.0" | "6.0.2" | "6.0.1" | "6.0.3" | "6.0.4" | "6.0.8" | "6.0.5" | "6.0.6" | "6.0.7" | "6.0.9" | "6.2.0" | "6.2.2" | "6.2.1" | "6.2.3" | "6.2.4" | "6.2.8" | "6.2.5" | "6.2.6" | "6.2.7" | "6.2.9" | "6.1.0" | "6.1.2" | "6.1.1" | "6.1.3" | "6.1.4" | "6.1.8" | "6.1.5" | "6.1.6" | "6.1.7" | "6.1.9" | "6.3.0" | "6.3.2" | "6.3.1" | "6.3.3" | "6.3.4" | "6.3.8" | "6.3.5" | "6.3.6" | "6.3.7" | "6.3.9" | "6.4.0" | "6.4.2" | "6.4.1" | "6.4.3" | "6.4.4" | "6.4.8" | "6.4.5" | "6.4.6" | "6.4.7" | "6.4.9" | "6.8.0" | "6.8.2" | "6.8.1" | "6.8.3" | "6.8.4" | "6.8.8" | "6.8.5" | "6.8.6" | "6.8.7" | "6.8.9" | "6.5.0" | "6.5.2" | "6.5.1" | "6.5.3" | "6.5.4" | "6.5.8" | "6.5.5" | "6.5.6" | "6.5.7" | "6.5.9" | "6.6.0" | "6.6.2" | "6.6.1" | "6.6.3" | "6.6.4" | "6.6.8" | "6.6.5" | "6.6.6" | "6.6.7" | "6.6.9" | "6.7.0" | "6.7.2" | "6.7.1" | "6.7.3" | "6.7.4" | "6.7.8" | "6.7.5" | "6.7.6" | "6.7.7" | "6.7.9" | "6.9.0" | "6.9.2" | "6.9.1" | "6.9.3" | "6.9.4" | "6.9.8" | "6.9.5" | "6.9.6" | "6.9.7" | "6.9.9" | "7.0.0" | "7.0.2" | "7.0.1" | "7.0.3" | "7.0.4" | "7.0.8" | "7.0.5" | "7.0.6" | "7.0.7" | "7.0.9" | "7.2.0" | "7.2.2" | "7.2.1" | "7.2.3" | "7.2.4" | "7.2.8" | "7.2.5" | "7.2.6" | "7.2.7" | "7.2.9" | "7.1.0" | "7.1.2" | "7.1.1" | "7.1.3" | "7.1.4" | "7.1.8" | "7.1.5" | "7.1.6" | "7.1.7" | "7.1.9" | "7.3.0" | "7.3.2" | "7.3.1" | "7.3.3" | "7.3.4" | "7.3.8" | "7.3.5" | "7.3.6" | "7.3.7" | "7.3.9" | "7.4.0" | "7.4.2" | "7.4.1" | "7.4.3" | "7.4.4" | "7.4.8" | "7.4.5" | "7.4.6" | "7.4.7" | "7.4.9" | "7.8.0" | "7.8.2" | "7.8.1" | "7.8.3" | "7.8.4" | "7.8.8" | "7.8.5" | "7.8.6" | "7.8.7" | "7.8.9" | "7.5.0" | "7.5.2" | "7.5.1" | "7.5.3" | "7.5.4" | "7.5.8" | "7.5.5" | "7.5.6" | "7.5.7" | "7.5.9" | "7.6.0" | "7.6.2" | "7.6.1" | "7.6.3" | "7.6.4" | "7.6.8" | "7.6.5" | "7.6.6" | "7.6.7" | "7.6.9" | "7.7.0" | "7.7.2" | "7.7.1" | "7.7.3" | "7.7.4" | "7.7.8" | "7.7.5" | "7.7.6" | "7.7.7" | "7.7.9" | "7.9.0" | "7.9.2" | "7.9.1" | "7.9.3" | "7.9.4" | "7.9.8" | "7.9.5" | "7.9.6" | "7.9.7" | "7.9.9" | "9.0.0" | "9.0.2" | "9.0.1" | "9.0.3" | "9.0.4" | "9.0.8" | "9.0.5" | "9.0.6" | "9.0.7" | "9.0.9" | "9.2.0" | "9.2.2" | "9.2.1" | "9.2.3" | "9.2.4" | "9.2.8" | "9.2.5" | "9.2.6" | "9.2.7" | "9.2.9" | "9.1.0" | "9.1.2" | "9.1.1" | "9.1.3" | "9.1.4" | "9.1.8" | "9.1.5" | "9.1.6" | "9.1.7" | "9.1.9" | "9.3.0" | "9.3.2" | "9.3.1" | "9.3.3" | "9.3.4" | "9.3.8" | "9.3.5" | "9.3.6" | "9.3.7" | "9.3.9" | "9.4.0" | "9.4.2" | "9.4.1" | "9.4.3" | "9.4.4" | "9.4.8" | "9.4.5" | "9.4.6" | "9.4.7" | "9.4.9" | "9.8.0" | "9.8.2" | "9.8.1" | "9.8.3" | "9.8.4" | "9.8.8" | "9.8.5" | "9.8.6" | "9.8.7" | "9.8.9" | "9.5.0" | "9.5.2" | "9.5.1" | "9.5.3" | "9.5.4" | "9.5.8" | "9.5.5" | "9.5.6" | "9.5.7" | "9.5.9" | "9.6.0" | "9.6.2" | "9.6.1" | "9.6.3" | "9.6.4" | "9.6.8" | "9.6.5" | "9.6.6" | "9.6.7" | "9.6.9" | "9.7.0" | "9.7.2" | "9.7.1" | "9.7.3" | "9.7.4" | "9.7.8" | "9.7.5" | "9.7.6" | "9.7.7" | "9.7.9" | "9.9.0" | "9.9.2" | "9.9.1" | "9.9.3" | "9.9.4" | "9.9.8" | "9.9.5" | "9.9.6" | "9.9.7" | "9.9.9", string>;
}, "strict", z.ZodTypeAny, {
    type: "marking-definition";
    id: `marking-definition--${string}`;
    spec_version: "2.0" | "2.1";
    created: (`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`) & z.BRAND<"StixCreatedTimestamp">;
    created_by_ref: `identity--${string}`;
    x_mitre_attack_spec_version: "0.0.0" | "0.0.2" | "0.0.1" | "0.0.3" | "0.0.4" | "0.0.8" | "0.0.5" | "0.0.6" | "0.0.7" | "0.0.9" | "0.2.0" | "0.2.2" | "0.2.1" | "0.2.3" | "0.2.4" | "0.2.8" | "0.2.5" | "0.2.6" | "0.2.7" | "0.2.9" | "0.1.0" | "0.1.2" | "0.1.1" | "0.1.3" | "0.1.4" | "0.1.8" | "0.1.5" | "0.1.6" | "0.1.7" | "0.1.9" | "0.3.0" | "0.3.2" | "0.3.1" | "0.3.3" | "0.3.4" | "0.3.8" | "0.3.5" | "0.3.6" | "0.3.7" | "0.3.9" | "0.4.0" | "0.4.2" | "0.4.1" | "0.4.3" | "0.4.4" | "0.4.8" | "0.4.5" | "0.4.6" | "0.4.7" | "0.4.9" | "0.8.0" | "0.8.2" | "0.8.1" | "0.8.3" | "0.8.4" | "0.8.8" | "0.8.5" | "0.8.6" | "0.8.7" | "0.8.9" | "0.5.0" | "0.5.2" | "0.5.1" | "0.5.3" | "0.5.4" | "0.5.8" | "0.5.5" | "0.5.6" | "0.5.7" | "0.5.9" | "0.6.0" | "0.6.2" | "0.6.1" | "0.6.3" | "0.6.4" | "0.6.8" | "0.6.5" | "0.6.6" | "0.6.7" | "0.6.9" | "0.7.0" | "0.7.2" | "0.7.1" | "0.7.3" | "0.7.4" | "0.7.8" | "0.7.5" | "0.7.6" | "0.7.7" | "0.7.9" | "0.9.0" | "0.9.2" | "0.9.1" | "0.9.3" | "0.9.4" | "0.9.8" | "0.9.5" | "0.9.6" | "0.9.7" | "0.9.9" | "2.0.0" | "2.0.2" | "2.0.1" | "2.0.3" | "2.0.4" | "2.0.8" | "2.0.5" | "2.0.6" | "2.0.7" | "2.0.9" | "2.2.0" | "2.2.2" | "2.2.1" | "2.2.3" | "2.2.4" | "2.2.8" | "2.2.5" | "2.2.6" | "2.2.7" | "2.2.9" | "2.1.0" | "2.1.2" | "2.1.1" | "2.1.3" | "2.1.4" | "2.1.8" | "2.1.5" | "2.1.6" | "2.1.7" | "2.1.9" | "2.3.0" | "2.3.2" | "2.3.1" | "2.3.3" | "2.3.4" | "2.3.8" | "2.3.5" | "2.3.6" | "2.3.7" | "2.3.9" | "2.4.0" | "2.4.2" | "2.4.1" | "2.4.3" | "2.4.4" | "2.4.8" | "2.4.5" | "2.4.6" | "2.4.7" | "2.4.9" | "2.8.0" | "2.8.2" | "2.8.1" | "2.8.3" | "2.8.4" | "2.8.8" | "2.8.5" | "2.8.6" | "2.8.7" | "2.8.9" | "2.5.0" | "2.5.2" | "2.5.1" | "2.5.3" | "2.5.4" | "2.5.8" | "2.5.5" | "2.5.6" | "2.5.7" | "2.5.9" | "2.6.0" | "2.6.2" | "2.6.1" | "2.6.3" | "2.6.4" | "2.6.8" | "2.6.5" | "2.6.6" | "2.6.7" | "2.6.9" | "2.7.0" | "2.7.2" | "2.7.1" | "2.7.3" | "2.7.4" | "2.7.8" | "2.7.5" | "2.7.6" | "2.7.7" | "2.7.9" | "2.9.0" | "2.9.2" | "2.9.1" | "2.9.3" | "2.9.4" | "2.9.8" | "2.9.5" | "2.9.6" | "2.9.7" | "2.9.9" | "1.0.0" | "1.0.2" | "1.0.1" | "1.0.3" | "1.0.4" | "1.0.8" | "1.0.5" | "1.0.6" | "1.0.7" | "1.0.9" | "1.2.0" | "1.2.2" | "1.2.1" | "1.2.3" | "1.2.4" | "1.2.8" | "1.2.5" | "1.2.6" | "1.2.7" | "1.2.9" | "1.1.0" | "1.1.2" | "1.1.1" | "1.1.3" | "1.1.4" | "1.1.8" | "1.1.5" | "1.1.6" | "1.1.7" | "1.1.9" | "1.3.0" | "1.3.2" | "1.3.1" | "1.3.3" | "1.3.4" | "1.3.8" | "1.3.5" | "1.3.6" | "1.3.7" | "1.3.9" | "1.4.0" | "1.4.2" | "1.4.1" | "1.4.3" | "1.4.4" | "1.4.8" | "1.4.5" | "1.4.6" | "1.4.7" | "1.4.9" | "1.8.0" | "1.8.2" | "1.8.1" | "1.8.3" | "1.8.4" | "1.8.8" | "1.8.5" | "1.8.6" | "1.8.7" | "1.8.9" | "1.5.0" | "1.5.2" | "1.5.1" | "1.5.3" | "1.5.4" | "1.5.8" | "1.5.5" | "1.5.6" | "1.5.7" | "1.5.9" | "1.6.0" | "1.6.2" | "1.6.1" | "1.6.3" | "1.6.4" | "1.6.8" | "1.6.5" | "1.6.6" | "1.6.7" | "1.6.9" | "1.7.0" | "1.7.2" | "1.7.1" | "1.7.3" | "1.7.4" | "1.7.8" | "1.7.5" | "1.7.6" | "1.7.7" | "1.7.9" | "1.9.0" | "1.9.2" | "1.9.1" | "1.9.3" | "1.9.4" | "1.9.8" | "1.9.5" | "1.9.6" | "1.9.7" | "1.9.9" | "3.0.0" | "3.0.2" | "3.0.1" | "3.0.3" | "3.0.4" | "3.0.8" | "3.0.5" | "3.0.6" | "3.0.7" | "3.0.9" | "3.2.0" | "3.2.2" | "3.2.1" | "3.2.3" | "3.2.4" | "3.2.8" | "3.2.5" | "3.2.6" | "3.2.7" | "3.2.9" | "3.1.0" | "3.1.2" | "3.1.1" | "3.1.3" | "3.1.4" | "3.1.8" | "3.1.5" | "3.1.6" | "3.1.7" | "3.1.9" | "3.3.0" | "3.3.2" | "3.3.1" | "3.3.3" | "3.3.4" | "3.3.8" | "3.3.5" | "3.3.6" | "3.3.7" | "3.3.9" | "3.4.0" | "3.4.2" | "3.4.1" | "3.4.3" | "3.4.4" | "3.4.8" | "3.4.5" | "3.4.6" | "3.4.7" | "3.4.9" | "3.8.0" | "3.8.2" | "3.8.1" | "3.8.3" | "3.8.4" | "3.8.8" | "3.8.5" | "3.8.6" | "3.8.7" | "3.8.9" | "3.5.0" | "3.5.2" | "3.5.1" | "3.5.3" | "3.5.4" | "3.5.8" | "3.5.5" | "3.5.6" | "3.5.7" | "3.5.9" | "3.6.0" | "3.6.2" | "3.6.1" | "3.6.3" | "3.6.4" | "3.6.8" | "3.6.5" | "3.6.6" | "3.6.7" | "3.6.9" | "3.7.0" | "3.7.2" | "3.7.1" | "3.7.3" | "3.7.4" | "3.7.8" | "3.7.5" | "3.7.6" | "3.7.7" | "3.7.9" | "3.9.0" | "3.9.2" | "3.9.1" | "3.9.3" | "3.9.4" | "3.9.8" | "3.9.5" | "3.9.6" | "3.9.7" | "3.9.9" | "4.0.0" | "4.0.2" | "4.0.1" | "4.0.3" | "4.0.4" | "4.0.8" | "4.0.5" | "4.0.6" | "4.0.7" | "4.0.9" | "4.2.0" | "4.2.2" | "4.2.1" | "4.2.3" | "4.2.4" | "4.2.8" | "4.2.5" | "4.2.6" | "4.2.7" | "4.2.9" | "4.1.0" | "4.1.2" | "4.1.1" | "4.1.3" | "4.1.4" | "4.1.8" | "4.1.5" | "4.1.6" | "4.1.7" | "4.1.9" | "4.3.0" | "4.3.2" | "4.3.1" | "4.3.3" | "4.3.4" | "4.3.8" | "4.3.5" | "4.3.6" | "4.3.7" | "4.3.9" | "4.4.0" | "4.4.2" | "4.4.1" | "4.4.3" | "4.4.4" | "4.4.8" | "4.4.5" | "4.4.6" | "4.4.7" | "4.4.9" | "4.8.0" | "4.8.2" | "4.8.1" | "4.8.3" | "4.8.4" | "4.8.8" | "4.8.5" | "4.8.6" | "4.8.7" | "4.8.9" | "4.5.0" | "4.5.2" | "4.5.1" | "4.5.3" | "4.5.4" | "4.5.8" | "4.5.5" | "4.5.6" | "4.5.7" | "4.5.9" | "4.6.0" | "4.6.2" | "4.6.1" | "4.6.3" | "4.6.4" | "4.6.8" | "4.6.5" | "4.6.6" | "4.6.7" | "4.6.9" | "4.7.0" | "4.7.2" | "4.7.1" | "4.7.3" | "4.7.4" | "4.7.8" | "4.7.5" | "4.7.6" | "4.7.7" | "4.7.9" | "4.9.0" | "4.9.2" | "4.9.1" | "4.9.3" | "4.9.4" | "4.9.8" | "4.9.5" | "4.9.6" | "4.9.7" | "4.9.9" | "8.0.0" | "8.0.2" | "8.0.1" | "8.0.3" | "8.0.4" | "8.0.8" | "8.0.5" | "8.0.6" | "8.0.7" | "8.0.9" | "8.2.0" | "8.2.2" | "8.2.1" | "8.2.3" | "8.2.4" | "8.2.8" | "8.2.5" | "8.2.6" | "8.2.7" | "8.2.9" | "8.1.0" | "8.1.2" | "8.1.1" | "8.1.3" | "8.1.4" | "8.1.8" | "8.1.5" | "8.1.6" | "8.1.7" | "8.1.9" | "8.3.0" | "8.3.2" | "8.3.1" | "8.3.3" | "8.3.4" | "8.3.8" | "8.3.5" | "8.3.6" | "8.3.7" | "8.3.9" | "8.4.0" | "8.4.2" | "8.4.1" | "8.4.3" | "8.4.4" | "8.4.8" | "8.4.5" | "8.4.6" | "8.4.7" | "8.4.9" | "8.8.0" | "8.8.2" | "8.8.1" | "8.8.3" | "8.8.4" | "8.8.8" | "8.8.5" | "8.8.6" | "8.8.7" | "8.8.9" | "8.5.0" | "8.5.2" | "8.5.1" | "8.5.3" | "8.5.4" | "8.5.8" | "8.5.5" | "8.5.6" | "8.5.7" | "8.5.9" | "8.6.0" | "8.6.2" | "8.6.1" | "8.6.3" | "8.6.4" | "8.6.8" | "8.6.5" | "8.6.6" | "8.6.7" | "8.6.9" | "8.7.0" | "8.7.2" | "8.7.1" | "8.7.3" | "8.7.4" | "8.7.8" | "8.7.5" | "8.7.6" | "8.7.7" | "8.7.9" | "8.9.0" | "8.9.2" | "8.9.1" | "8.9.3" | "8.9.4" | "8.9.8" | "8.9.5" | "8.9.6" | "8.9.7" | "8.9.9" | "5.0.0" | "5.0.2" | "5.0.1" | "5.0.3" | "5.0.4" | "5.0.8" | "5.0.5" | "5.0.6" | "5.0.7" | "5.0.9" | "5.2.0" | "5.2.2" | "5.2.1" | "5.2.3" | "5.2.4" | "5.2.8" | "5.2.5" | "5.2.6" | "5.2.7" | "5.2.9" | "5.1.0" | "5.1.2" | "5.1.1" | "5.1.3" | "5.1.4" | "5.1.8" | "5.1.5" | "5.1.6" | "5.1.7" | "5.1.9" | "5.3.0" | "5.3.2" | "5.3.1" | "5.3.3" | "5.3.4" | "5.3.8" | "5.3.5" | "5.3.6" | "5.3.7" | "5.3.9" | "5.4.0" | "5.4.2" | "5.4.1" | "5.4.3" | "5.4.4" | "5.4.8" | "5.4.5" | "5.4.6" | "5.4.7" | "5.4.9" | "5.8.0" | "5.8.2" | "5.8.1" | "5.8.3" | "5.8.4" | "5.8.8" | "5.8.5" | "5.8.6" | "5.8.7" | "5.8.9" | "5.5.0" | "5.5.2" | "5.5.1" | "5.5.3" | "5.5.4" | "5.5.8" | "5.5.5" | "5.5.6" | "5.5.7" | "5.5.9" | "5.6.0" | "5.6.2" | "5.6.1" | "5.6.3" | "5.6.4" | "5.6.8" | "5.6.5" | "5.6.6" | "5.6.7" | "5.6.9" | "5.7.0" | "5.7.2" | "5.7.1" | "5.7.3" | "5.7.4" | "5.7.8" | "5.7.5" | "5.7.6" | "5.7.7" | "5.7.9" | "5.9.0" | "5.9.2" | "5.9.1" | "5.9.3" | "5.9.4" | "5.9.8" | "5.9.5" | "5.9.6" | "5.9.7" | "5.9.9" | "6.0.0" | "6.0.2" | "6.0.1" | "6.0.3" | "6.0.4" | "6.0.8" | "6.0.5" | "6.0.6" | "6.0.7" | "6.0.9" | "6.2.0" | "6.2.2" | "6.2.1" | "6.2.3" | "6.2.4" | "6.2.8" | "6.2.5" | "6.2.6" | "6.2.7" | "6.2.9" | "6.1.0" | "6.1.2" | "6.1.1" | "6.1.3" | "6.1.4" | "6.1.8" | "6.1.5" | "6.1.6" | "6.1.7" | "6.1.9" | "6.3.0" | "6.3.2" | "6.3.1" | "6.3.3" | "6.3.4" | "6.3.8" | "6.3.5" | "6.3.6" | "6.3.7" | "6.3.9" | "6.4.0" | "6.4.2" | "6.4.1" | "6.4.3" | "6.4.4" | "6.4.8" | "6.4.5" | "6.4.6" | "6.4.7" | "6.4.9" | "6.8.0" | "6.8.2" | "6.8.1" | "6.8.3" | "6.8.4" | "6.8.8" | "6.8.5" | "6.8.6" | "6.8.7" | "6.8.9" | "6.5.0" | "6.5.2" | "6.5.1" | "6.5.3" | "6.5.4" | "6.5.8" | "6.5.5" | "6.5.6" | "6.5.7" | "6.5.9" | "6.6.0" | "6.6.2" | "6.6.1" | "6.6.3" | "6.6.4" | "6.6.8" | "6.6.5" | "6.6.6" | "6.6.7" | "6.6.9" | "6.7.0" | "6.7.2" | "6.7.1" | "6.7.3" | "6.7.4" | "6.7.8" | "6.7.5" | "6.7.6" | "6.7.7" | "6.7.9" | "6.9.0" | "6.9.2" | "6.9.1" | "6.9.3" | "6.9.4" | "6.9.8" | "6.9.5" | "6.9.6" | "6.9.7" | "6.9.9" | "7.0.0" | "7.0.2" | "7.0.1" | "7.0.3" | "7.0.4" | "7.0.8" | "7.0.5" | "7.0.6" | "7.0.7" | "7.0.9" | "7.2.0" | "7.2.2" | "7.2.1" | "7.2.3" | "7.2.4" | "7.2.8" | "7.2.5" | "7.2.6" | "7.2.7" | "7.2.9" | "7.1.0" | "7.1.2" | "7.1.1" | "7.1.3" | "7.1.4" | "7.1.8" | "7.1.5" | "7.1.6" | "7.1.7" | "7.1.9" | "7.3.0" | "7.3.2" | "7.3.1" | "7.3.3" | "7.3.4" | "7.3.8" | "7.3.5" | "7.3.6" | "7.3.7" | "7.3.9" | "7.4.0" | "7.4.2" | "7.4.1" | "7.4.3" | "7.4.4" | "7.4.8" | "7.4.5" | "7.4.6" | "7.4.7" | "7.4.9" | "7.8.0" | "7.8.2" | "7.8.1" | "7.8.3" | "7.8.4" | "7.8.8" | "7.8.5" | "7.8.6" | "7.8.7" | "7.8.9" | "7.5.0" | "7.5.2" | "7.5.1" | "7.5.3" | "7.5.4" | "7.5.8" | "7.5.5" | "7.5.6" | "7.5.7" | "7.5.9" | "7.6.0" | "7.6.2" | "7.6.1" | "7.6.3" | "7.6.4" | "7.6.8" | "7.6.5" | "7.6.6" | "7.6.7" | "7.6.9" | "7.7.0" | "7.7.2" | "7.7.1" | "7.7.3" | "7.7.4" | "7.7.8" | "7.7.5" | "7.7.6" | "7.7.7" | "7.7.9" | "7.9.0" | "7.9.2" | "7.9.1" | "7.9.3" | "7.9.4" | "7.9.8" | "7.9.5" | "7.9.6" | "7.9.7" | "7.9.9" | "9.0.0" | "9.0.2" | "9.0.1" | "9.0.3" | "9.0.4" | "9.0.8" | "9.0.5" | "9.0.6" | "9.0.7" | "9.0.9" | "9.2.0" | "9.2.2" | "9.2.1" | "9.2.3" | "9.2.4" | "9.2.8" | "9.2.5" | "9.2.6" | "9.2.7" | "9.2.9" | "9.1.0" | "9.1.2" | "9.1.1" | "9.1.3" | "9.1.4" | "9.1.8" | "9.1.5" | "9.1.6" | "9.1.7" | "9.1.9" | "9.3.0" | "9.3.2" | "9.3.1" | "9.3.3" | "9.3.4" | "9.3.8" | "9.3.5" | "9.3.6" | "9.3.7" | "9.3.9" | "9.4.0" | "9.4.2" | "9.4.1" | "9.4.3" | "9.4.4" | "9.4.8" | "9.4.5" | "9.4.6" | "9.4.7" | "9.4.9" | "9.8.0" | "9.8.2" | "9.8.1" | "9.8.3" | "9.8.4" | "9.8.8" | "9.8.5" | "9.8.6" | "9.8.7" | "9.8.9" | "9.5.0" | "9.5.2" | "9.5.1" | "9.5.3" | "9.5.4" | "9.5.8" | "9.5.5" | "9.5.6" | "9.5.7" | "9.5.9" | "9.6.0" | "9.6.2" | "9.6.1" | "9.6.3" | "9.6.4" | "9.6.8" | "9.6.5" | "9.6.6" | "9.6.7" | "9.6.9" | "9.7.0" | "9.7.2" | "9.7.1" | "9.7.3" | "9.7.4" | "9.7.8" | "9.7.5" | "9.7.6" | "9.7.7" | "9.7.9" | "9.9.0" | "9.9.2" | "9.9.1" | "9.9.3" | "9.9.4" | "9.9.8" | "9.9.5" | "9.9.6" | "9.9.7" | "9.9.9";
    x_mitre_domains: ("enterprise-attack" | "mobile-attack" | "ics-attack")[];
    definition_type: "tlp" | "statement";
    definition: {
        tlp: string;
    } | {
        statement: string;
    };
    name?: string | undefined;
}, {
    type: "marking-definition";
    id: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    spec_version: "2.0" | "2.1";
    created: `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
    created_by_ref: `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`;
    x_mitre_attack_spec_version: string;
    x_mitre_domains: ("enterprise-attack" | "mobile-attack" | "ics-attack")[];
    definition_type: "tlp" | "statement";
    definition: {
        tlp: string;
    } | {
        statement: string;
    };
    name?: string | undefined;
}>;
export type MarkingDefinition = z.infer<typeof markingDefinitionSchema>;
//# sourceMappingURL=marking-definition.schema.d.ts.map