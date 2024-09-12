import { stixBundleSchema } from "../../src/schemas/sdo/stix-bundle.schema";

/** ************************************************************************************************* */
// Example 1: Valid Stix Bundle
/** ************************************************************************************************* */

const validStix = {
    type: 'bundle',
    id: 'bundle--66332c9c-c581-44d5-aa06-7a6fe496ae13',
    objects: 
    [
        {
            type: 'malware',
            id: 'malware--2daa14d6-cbf3-4308-bb8e-213c324a08e4',
            spec_version: '2.1',
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: "2017-05-31T21:32:29.203Z",
            modified: "2021-02-09T13:58:23.806Z",
            name: "HAMMERTOSS",
            description: "[HAMMERTOSS](https://attack.mitre.org/software/S0037) is a backdoor that was used by [APT29](https://attack.mitre.org/groups/G0016) in 2015. (Citation: FireEye APT29) (Citation: F-Secure The Dukes)",
            external_references: [
                {
                    source_name: "mitre-attack",
                    url: "https://attack.mitre.org/software/S0037",
                    external_id: "S0037"
                },
                {
                    source_name: "FireEye APT29",
                    description: "FireEye Labs. (2015, July). HAMMERTOSS: Stealthy Tactics Define a Russian Cyber Threat Group. Retrieved September 17, 2015.",
                    url: "https://www2.fireeye.com/rs/848-DID-242/images/rpt-apt29-hammertoss.pdf"
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
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_domains: [
                "enterprise-attack"
            ],
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_platforms: [
                "Windows"
            ],
            is_family: false,
            x_mitre_version: "1.2"
        },
        {
            type: 'identity',
            id: 'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5',
            created: "2017-06-01T00:00:00.000Z",
            modified: "2017-06-01T00:00:00.000Z",
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            identity_class: "organization",
            name: "The MITRE Corporation",
            x_mitre_domains:["enterprise-attack"],
            x_mitre_attack_spec_version: "3.2.0",
	        x_mitre_version: "1.0"
        },
        {
            modified: "2023-10-04T18:05:43.237Z",
            name: "Remote Terminal Unit (RTU)",
            description: "A Remote Terminal Unit (RTU) is a device that typically resides between field devices (e.g., PLCs, IEDs) and control/SCADA servers and supports various communication interfacing and data aggregation functions. RTUs are typically responsible for forwarding commands from the control server and the collection of telemetry, events, and alerts from the field devices. An RTU can be implemented as a dedicated embedded device, as software platform that runs on a hardened/ruggedized computer, or using a custom application program on a PLC.",
            x_mitre_platforms: [
                "Embedded",
                "Windows",
                "Linux"
            ],
            x_mitre_deprecated: false,
            x_mitre_domains: [
                "ics-attack"
            ],
            x_mitre_version: "1.0",
            type: "x-mitre-asset",
            id: "x-mitre-asset--1769c499-55e5-462f-bab2-c39b8cd5ae32",
            created: "2023-09-28T14:44:54.756Z",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            revoked: false,
            external_references: [
                {
                    "source_name": "mitre-attack",
                    "url": "https://attack.mitre.org/assets/A0004",
                    "external_id": "A0004"
                }
            ],
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            x_mitre_attack_spec_version: "3.2.0",
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            spec_version: "2.1"
        },
        {
            type: "campaign",
            id: "campaign--0257b35b-93ef-4a70-80dd-ad5258e6045b",
            spec_version: "2.1",
            x_mitre_attack_spec_version: "3.2.0",
            name: "Operation Dream Job",
            x_mitre_version: "1.2",
            description: "Operation Dream Job was a cyber espionage operation...",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: "2023-03-17T13:37:42.596Z",
            modified: "2024-04-11T00:31:21.576Z",
            object_marking_refs: ["marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"],
            x_mitre_domains: ["enterprise-attack"],
            external_references: [
                {
                    source_name: "mitre-attack",
                    url: "https://attack.mitre.org/campaigns/C0022",
                    external_id: "C0022"
                }
            ],
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_deprecated: false,
            revoked: false,
            aliases: ["Operation Dream Job", "Operation North Star", "Operation Interception"],
            first_seen: "2019-09-01T04:00:00.000Z",
            last_seen: "2020-08-01T04:00:00.000Z",
            x_mitre_first_seen_citation: "(Citation: ESET Lazarus Jun 2020)",
            x_mitre_last_seen_citation: "(Citation: ClearSky Lazarus Aug 2020)"
        },
        {
            modified: "2022-10-20T20:18:06.745Z",
            name: "Network Connection Creation",
            description:
              "Initial construction of a network connection, such as capturing socket information with a source/destination IP and port(s) (ex: Windows EID 5156, Sysmon EID 3, or Zeek conn.log)",
            x_mitre_data_source_ref:
              "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
            x_mitre_version: "1.1",
            type: "x-mitre-data-component",
            id: "x-mitre-data-component--181a9f8c-c780-4f1f-91a8-edb770e904ba",
            created: "2021-10-20T15:05:19.274Z",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            object_marking_refs: [
              "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            spec_version: "2.1",
            x_mitre_domains: ["mobile-attack"],
        },
        {
            tactic_refs: [
              "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
              "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
              "x-mitre-tactic--78f1d2ae-a579-44c4-8fc5-3e1775c73fac",
              "x-mitre-tactic--33752ae7-f875-4f43-bdb6-d8d02d341046",
              "x-mitre-tactic--ddf70682-f3ce-479c-a9a4-7eadf9bfead7",
              "x-mitre-tactic--696af733-728e-49d7-8261-75fdc590f453",
              "x-mitre-tactic--51c25a9e-8615-40c0-8afd-1da578847924",
              "x-mitre-tactic--b2a67b1e-913c-46f6-b219-048a90560bb9",
              "x-mitre-tactic--97c8ff73-bd14-4b6c-ac32-3d91d2c41e3f",
              "x-mitre-tactic--298fe907-7931-4fd2-8131-2814dd493134",
              "x-mitre-tactic--ff048b6c-b872-4218-b68c-3735ebd1f024",
              "x-mitre-tactic--77542f83-70d0-40c2-8a9d-ad2eb8b00279",
            ],
            x_mitre_domains: ["ics-attack"],
            object_marking_refs: [
              "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            created: "2018-10-17T00:14:20.652Z",
            description:
              "The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base.",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            external_references: [
              {
                source_name: "mitre-attack",
                external_id: "ics-attack",
                url: "https://attack.mitre.org/matrices/ics/",
              },
            ],
            id: "x-mitre-matrix--575f48f4-8897-4468-897b-48bb364af6c7",
            modified: "2022-05-24T14:00:00.188Z",
            name: "ATT&CK for ICS",
            type: "x-mitre-matrix",
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_version: "1.0",
            spec_version: "2.1",
        },
        {
            type: 'tool',
            id: 'tool--11f8d7eb-1927-4806-9267-3a11d4d4d6be',
            spec_version: '2.1',
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: "2021-07-30T15:43:17.770Z",
            modified: "2024-04-11T00:06:01.264Z",
            name: "Sliver",
            description: '[Sliver](https://attack.mitre.org/software/S0633) is an open source, cross-platform, red team command and control framework written in Golang.(Citation: Bishop Fox Sliver Framework August 2019)',
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
                "Sliver"
            ],
            x_mitre_deprecated: false,
            x_mitre_domains: [
                "enterprise-attack"
            ],
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_platforms: [
                "Windows",
                "Linux",
                "macOS"
            ],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_version: "1.2"
        },
        {
            id: "x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            name: "Execution",
            description: "The adversary is trying to run malicious code.\n\nExecution consists of techniques that result in adversary-controlled code running on a local or remote system. Techniques that run malicious code are often paired with techniques from all other tactics to achieve broader goals, like exploring a network or stealing data. For example, an adversary might use a remote access tool to run a PowerShell script that does Remote System Discovery. ",
            external_references: [
                {
                    "external_id": "TA0002",
                    "url": "https://attack.mitre.org/tactics/TA0002",
                    "source_name": "mitre-attack"
                }
            ],
            object_marking_refs: [
                "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168"
            ],
            x_mitre_shortname: "execution",
            type: "x-mitre-tactic",
            modified: "2019-07-19T17:42:06.909Z",
            created: "2018-10-17T00:14:20.652Z",
            spec_version: "2.1",
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_domains: [
                "enterprise-attack"
            ],
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            x_mitre_version: "1.0"
        },
        {
            modified: "2024-04-17T16:13:43.697Z",
            name: "TEMP.Veles",
            x_mitre_version: "1.4",
            type: "intrusion-set",
            id: "intrusion-set--9538b1a4-4120-4e2d-bf59-3b11fcab05a4",
            created: "2019-04-16T15:14:38.533Z",
            x_mitre_domains: ["enterprise-attack", "ics-attack"],
            x_mitre_attack_spec_version: "3.2.0",
            spec_version: "2.1",
        },
        {
            type: "course-of-action",
            id: "course-of-action--00d7d21b-69d6-4797-88a2-c86f3fc97651",
            spec_version: "2.1",
            x_mitre_attack_spec_version: "2.1.0",
            name: "Mitigation name",
            x_mitre_version: "1.0",
            description: "Mitigation description",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            created: "2018-10-17T00:14:20.652Z",
            modified: "2019-07-25T11:22:19.139Z",
            object_marking_refs: [
              "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_domains: ["enterprise-attack"],
            external_references: [
              {
                source_name: "mitre-attack",
                url: "https://attack.mitre.org/mitigations/T1174",
                external_id: "T1174",
              },
              {
                url: "https://example.com",
                description: "Example description.",
                source_name: "Example source name",
              },
            ],
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
        },
        {
            modified: "2022-10-20T20:18:06.745Z",
            name: "Network Connection Creation",
            description:
              "Initial construction of a network connection, such as capturing socket information with a source/destination IP and port(s) (ex: Windows EID 5156, Sysmon EID 3, or Zeek conn.log)",
            x_mitre_data_source_ref:
              "x-mitre-data-source--c000cd5c-bbb3-4606-af6f-6c6d9de0bbe3",
            x_mitre_version: "1.1",
            type: "x-mitre-data-component",
            id: "x-mitre-data-component--181a9f8c-c780-4f1f-91a8-edb770e904ba",
            created: "2021-10-20T15:05:19.274Z",
            created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            object_marking_refs: [
              "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
            ],
            x_mitre_attack_spec_version: "2.1.0",
            x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
            spec_version: "2.1",
            x_mitre_domains: ["mobile-attack"],
        }
    ],
};

console.log("Example 1 - Valid Stix Bundle:");
console.log(stixBundleSchema.parse(validStix));