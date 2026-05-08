import { z } from 'zod/v4';

export type AttackFieldUsage =
  | 'required' // STIX says optional, but ATT&CK always requires it
  | 'unused' // STIX defines it, but ATT&CK never uses it
  | 'inherit' // ATT&CK usage matches STIX specification (default)
  | 'extension'; // ATT&CK-only field (x_mitre_* prefixed), not defined in STIX

export type AttackFieldStatus =
  | 'active' // Field is actively used in ATT&CK
  | 'deprecated' // Field is deprecated in ATT&CK
  | 'inherit'; // ATT&CK status matches STIX specification (default)

export interface AttackMetaFields {
  description: string;
  usage?: AttackFieldUsage;
  status?: AttackFieldStatus;
  examples?: Array<unknown>;
}

// Create a typed registry for ATT&CK metadata
export const attackRegistry = z.registry<AttackMetaFields>();
