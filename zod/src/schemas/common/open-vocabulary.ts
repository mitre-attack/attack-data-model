import { z } from "zod";

export const MalwareTypeOpenVocabulary = z.enum([
    "adware",
    "backdoor",
    "bot",
    "bootkit",
    "ddos",
    "downloader",
    "dropper",
    "exploit-kit",
    "keylogger",
    "ransomware",
    "remote-access-trojan",
    "resource-exploitation",
    "rogue-security-software",
    "rootkit",
    "screen-capture",
    "spyware",
    "trojan",
    "virus",
    "webshell",
    "wiper",
    "worm",
    "unknown"
]);

export const ProcessorArchitecturesOpenVocabulary = z.enum([
    "alpha",
    "arm",
    "ia-64",
    "mips",
    "powerpc",
    "sparc",
    "x86",
    "x86-64"
]);

export const ImplementationLanguagesOpenVocabulary = z.enum([
    "applescript",
    "bash",
    "c",
    "c++",
    "c#",
    "go",
    "java",
    "javascript",
    "lua",
    "objective-c",
    "perl",
    "php",
    "powershell",
    "python",
    "ruby",
    "scala",
    "swift",
    "typescript",
    "visual-basic",
    "x86-32",
    "x86-64"
]);

export const MalwareCapabilitiesOpenVocabulary = z.enum([
    "accesses-remote-machines",
    "anti-debugging",
    "anti-disassembly",
    "anti-emulation",
    "anti-memory-forensics",
    "anti-sandbox",
    "anti-vm",
    "captures-input-peripherals",
    "captures-output-peripherals",
    "captures-system-state-data",
    "cleans-traces-of-infection",
    "commits-fraud",
    "communicates-with-c2",
    "compromises-data-integrity",
    "compromises-data-availability",
    "compromises-system-availability",
    "controls-local-machine",
    "degrades-security-software",
    "degrades-system-updates",
    "determines-c2-server",
    "emails-spam",
    "escalates-privileges",
    "evades-av",
    "exfiltrates-data",
    "fingerprints-host",
    "hides-artifacts",
    "hides-executing-code",
    "infects-files",
    "infects-remote-machines",
    "installs-other-components",
    "persists-after-system-reboot",
    "prevents-artifact-access",
    "prevents-artifact-deletion",
    "probes-network-environment",
    "self-modifies",
    "steals-authentication-credentials",
    "violates-system-operational-integrity"
]);

export const ToolTypesOpenVocabulary = z.enum([
    'denial-of-service',
    'exploitation',
    'information-gathering',
    'network-capture',
    'credential-exploitation',
    'remote-access',
    'vulnerability-scanning',
    'unknown'
]);


export const IdentityClassOpenVocabulary = z.enum([
    "individual",
    "group",
    "system",
    "organization",
    "class",
    "unspecified"
]);

export const SectorsListOpenVocabulary = z.enum([
    "agriculture",
    "aerospace",
    "automotive",
    "communications",
    "construction",
    "defence",
    "education",
    "energy",
    "entertainment",
    "financial-services",
    "government-national",
    "government-regional",
    "government-local",
    "government-public-services",
    "healthcare",
    "hospitality-leisure",
    "infrastructure",
    "insurance",
    "manufacturing",
    "mining",
    "non-profit",
    "pharmaceuticals",
    "retail",
    "technology",
    "telecommunications",
    "transportation",
    "utilities"
]);