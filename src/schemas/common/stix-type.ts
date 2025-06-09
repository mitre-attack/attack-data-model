import { z } from 'zod';

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
  'intrusion-set': 'Group',
  malware: 'Malware',
  tool: 'Tool',
  'marking-definition': 'MarkingDefinition',
  'x-mitre-data-component': 'DataComponent',
  'x-mitre-data-source': 'DataSource',
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
  'intrusion-set',
  'malware',
  'tool',
  'marking-definition',
  'x-mitre-data-component',
  'x-mitre-data-source',
  'x-mitre-tactic',
  'x-mitre-asset',
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
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') {
        const received = typeof ctx.data === 'string' ? ctx.data : String(ctx.data);
        return {
          message: `Invalid STIX type '${received}'. Expected one of the supported STIX types.`,
        };
      }
      return { message: ctx.defaultError };
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
  return z.string().superRefine((val, ctx) => {
    if (val !== stixType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid 'type' property. Expected '${stixType}' for ${objectName} object, but received '${val}'.`,
      });
      return z.NEVER;
    }
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
  // Create a descriptive string of the object types for error messages
  const objectNames = stixTypes.map((type) => stixTypeToTypeName[type]).join(' or ');
  const typeList = stixTypes.map((t) => `'${t}'`).join(' or ');

  return z.string().superRefine((val, ctx) => {
    if (!stixTypes.includes(val as StixType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid 'type' property. Expected ${typeList} for ${objectNames} object, but received '${val}'.`,
      });
      return z.NEVER;
    }
  });
}
