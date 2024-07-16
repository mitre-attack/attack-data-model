import { StixCreatedTimestamp, StixModifiedTimestamp, createStixCreatedTimestamp, createStixModifiedTimestamp } from "../src/schemas/common/core-stix-sdo.schema";
import { MalwareSchema } from "../src/schemas/sdo/malware.schema";
import { ToolSchema } from "../src/schemas/sdo/tool.schema";

const created: StixCreatedTimestamp = createStixCreatedTimestamp('2023-04-06T20:03:00.000Z');
const modified: StixModifiedTimestamp = createStixModifiedTimestamp('2023-04-06T20:03:00.000Z');

const sdoData_malware_all_data = {
    id: 'malware--199463de-d9be-46d6-bb41-07234c1dd5a6',
    type: 'malware',
    description: '[GeminiDuke](https://attack.mitre.org/software/S0049) is malware that was used by [APT29](https://attack.mitre.org/groups/G0016) from 2009 to 2012. (Citation: F-Secure The Dukes)',
    spec_version: '2.1',
    created,
    modified,
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/software/S0049",
            external_id: "S0049"
        },
        {
            source_name: "F-Secure The Dukes",
            description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
            url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
        }
    ],
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    x_mitre_aliases: [
        "GeminiDuke"
    ],
    x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ],
    x_mitre_platforms: [
        "Windows"
    ],
    x_mitre_version: "1.1",
    is_family: false,
    name: "GeminiDuke",
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
};

const sdoMalware = MalwareSchema.parse(sdoData_malware_all_data)

console.log(sdoMalware.id); // 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f'
console.log(sdoMalware.type); // 'indicator'
console.log(sdoMalware.is_family); // false


const sdoData_tool_all_data = {
    id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
    type: 'tool',
    description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
    spec_version: '2.1',
    created,
    created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
    modified,
    x_mitre_aliases: [
        "Sliver"
    ],
    x_mitre_contributors: [
        "Achute Sharma, Keysight",
        "Ayan Saha, Keysight"
    ],
    x_mitre_platforms: [
        "Windows",
        "Linux",
        "macOS"
    ],
    object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
    ],
    external_references: [
        {
            source_name: "mitre-attack",
            url: "https://attack.mitre.org/software/S0049",
            external_id: "S0049"
        },
        {
            source_name: "F-Secure The Dukes",
            description: "F-Secure Labs. (2015, September 17). The Dukes: 7 years of Russian cyberespionage. Retrieved December 10, 2015.",
            url: "https://www.f-secure.com/documents/996508/1030745/dukes_whitepaper.pdf"
        }
    ],
    confidence: 85,
    name: "Sliver",
    x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5"
};

const sdoTool = ToolSchema.parse(sdoData_tool_all_data)

console.log(sdoTool.id); // 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f'
console.log(sdoTool.type); // 'indicator'
console.log(sdoTool.name); // Sliver