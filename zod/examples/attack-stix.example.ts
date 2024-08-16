import { z } from "zod";
import { MalwareSchema } from "../src/schemas/sdo/malware.schema";
import { StixBundleSchema } from "../src/schemas/sdo/stix-bundle.schema";

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
        }
    ],
};

console.log("Example 1 - Valid Stix Bundle:");
console.log(StixBundleSchema.parse(validStix));