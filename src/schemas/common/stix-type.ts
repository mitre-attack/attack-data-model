import { z } from 'zod/v4';

/**
 * Type mapping for more readable error messages.
 * Maps STIX types to their corresponding readable type names.
 */
export const stixTypeToTypeName: Record<StixType, string> = {
  'attack-pattern': 'Technique',
  bundle: 'StixBundle',
  campaign: 'Campaign',
  'course-of-action': 'Mitigation',
  identity: 'Identity',
  indicator: 'Indicator',
  'intrusion-set': 'Group',
  malware: 'Malware',
  tool: 'Tool',
  'marking-definition': 'MarkingDefinition',
  'x-mitre-analytic': 'Analytic',
  'x-mitre-data-component': 'DataComponent',
  'x-mitre-detection': 'Detection',
  'x-mitre-log-source': 'LogSource',
  'x-mitre-tactic': 'Tactic',
  'x-mitre-asset': 'Asset',
  'x-mitre-matrix': 'Matrix',
  'x-mitre-collection': 'Collection',
  relationship: 'Relationship',

  file: '', // not used in ATT&CK but used in sample_refs for Malware
  artifact: '', // not used in ATT&CK but used in sample_refs for Malware

  // 'observed-data': 'ObservedData',     // not used in ATT&CK
  // 'report': 'Report',                  // not used in ATT&CK
  // 'threat-actor': 'ThreatActor',       // not used in ATT&CK
  // 'vulnerability': 'Vulnerability',    // not used in ATT&CK
};

const supportedStixTypes = [
  'attack-pattern',
  'bundle',
  'campaign',
  'course-of-action',
  'identity',
  'indicator',
  'intrusion-set',
  'malware',
  'tool',
  'marking-definition',
  'x-mitre-analytic',
  'x-mitre-data-component',
  'x-mitre-detection',
  'x-mitre-tactic',
  'x-mitre-asset',
  'x-mitre-log-source',
  'x-mitre-matrix',
  'x-mitre-collection',
  'relationship',

  'file', // not used in ATT&CK but used in sample_refs for Malware
  'artifact', // not used in ATT&CK but used in sample_refs for Malware

  // "indicator",         // not used in ATT&CK
  // "observed-data",     // not used in ATT&CK
  // "report",            // not used in ATT&CK
  // "threat-actor",      // not used in ATT&CK
  // "vulnerability",     // not used in ATT&CK
] as const;

export const stixTypeSchema = z
  .enum(supportedStixTypes, {
    error: (issue) => {
      if (issue.code === 'invalid_value') {
        const received = typeof issue.input === 'string' ? issue.input : String(issue.input);
        return `Invalid STIX type '${received}'. Expected one of the supported STIX types.`;
      }
      // Return undefined to yield control to next error map
      return undefined;
    },
  })
  .describe(
    'The type property identifies the type of STIX Object (SDO, Relationship Object, etc). The value of the type field MUST be one of the types defined by a STIX Object (e.g., indicator).',
  );

export type StixType = z.infer<typeof stixTypeSchema>;

/**
 * Creates a factory function that generates type-specific validators for STIX objects
 *
 * @param expectedType - The STIX type that should be validated against (e.g., 'x-mitre-tactic')
 * @param objectName - The human-readable name of the object type (e.g., 'Tactic')
 * @returns A Zod validator that confirms the type matches the expected value
 *
 * @example
 * // Define type validation in your object schema
 * const tacticSchema = z.object({
 *   type: createTypeValidator('x-mitre-tactic', 'Tactic'),
 *   // other schema properties
 * });
 *
 * // Validate an object with incorrect type
 * tacticSchema.validate({ type: 'invalid-type' });
 * // Throws: "Invalid 'type' property. Expected 'x-mitre-tactic' for Tactic object, but received 'invalid-type'"
 */
export function createStixTypeValidator(stixType: StixType) {
  const objectName = stixTypeToTypeName[stixType];
  return z.literal(stixType).refine((val) => val === stixType, {
    error: (issue) =>
      `Invalid 'type' property. Expected '${stixType}' for ${objectName} object, but received '${issue.input}'.`,
  });
}

/**
 * Creates a type validator for STIX objects that can have multiple valid types
 *
 * @param stixTypes - Array of valid STIX types for this object
 * @returns A configured Zod validator that accepts any of the specified types
 *
 * @example
 * // For an object that can be either malware or tool
 * const malwareToolSchema = attackBaseObjectSchema
 *   .extend({
 *     id: createStixIdentifierSchema(['malware', 'tool']),
 *     type: createMultiStixTypeValidator(['malware', 'tool']),
 *     // other properties...
 *   });
 */
export function createMultiStixTypeValidator(stixTypes: StixType[]) {
  const objectNames = stixTypes.map((type) => stixTypeToTypeName[type]).join(' or ');
  const typeList = stixTypes.map((t) => `'${t}'`).join(' or ');

  const literals = stixTypes.map((type) => z.literal(type));

  return z
    .union(literals as [z.ZodLiteral<StixType>, ...z.ZodLiteral<StixType>[]])
    .refine((val) => stixTypes.includes(val), {
      error: (issue) =>
        `Invalid 'type' property. Expected ${typeList} for ${objectNames} object, but received '${issue.input}'.`,
    });
}
