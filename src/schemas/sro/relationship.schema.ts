import { z } from 'zod';
import { stixRelationshipObjectSchema } from '../common/stix-core.js';
import {
  createStixIdentifierSchema,
  descriptionSchema,
  objectMarkingRefsSchema,
  stixIdentifierSchema,
  type StixType,
  stixTypeSchema,
  xMitreAttackSpecVersionSchema,
  xMitreDeprecatedSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitreVersionSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Relationship Types
// (relationship_type)
//
/////////////////////////////////////

// Supported relationship types
const supportedRelationshipTypes = [
  'uses',
  'mitigates',
  'subtechnique-of',
  'detects',
  'attributed-to',
  'targets',
  'revoked-by',
] as const;

export const relationshipTypeSchema = z
  .enum(supportedRelationshipTypes)
  .describe('The name used to identify the type of Relationship.');

export type RelationshipType = z.infer<typeof relationshipTypeSchema>;

// Valid relationship object types
export const validRelationshipObjectTypes = [
  stixTypeSchema.Enum['attack-pattern'],
  stixTypeSchema.Enum['campaign'],
  stixTypeSchema.Enum['course-of-action'],
  stixTypeSchema.Enum['intrusion-set'],
  stixTypeSchema.Enum['malware'],
  stixTypeSchema.Enum['tool'],
  stixTypeSchema.Enum['x-mitre-data-component'],
  stixTypeSchema.Enum['x-mitre-asset'],
];

type RelationshipMap = Record<RelationshipType, { source: StixType[]; target: StixType[] }>;

const relationshipMap: RelationshipMap = {
  uses: {
    source: [
      stixTypeSchema.Enum.malware,
      stixTypeSchema.Enum.tool,
      stixTypeSchema.Enum['intrusion-set'],
      stixTypeSchema.Enum.campaign,
    ],
    target: [
      stixTypeSchema.Enum['attack-pattern'],
      stixTypeSchema.Enum.malware,
      stixTypeSchema.Enum.tool,
    ],
  },
  mitigates: {
    source: [stixTypeSchema.Enum['course-of-action']],
    target: [stixTypeSchema.Enum['attack-pattern']],
  },
  'subtechnique-of': {
    source: [stixTypeSchema.Enum['attack-pattern']],
    target: [stixTypeSchema.Enum['attack-pattern']],
  },
  detects: {
    source: [stixTypeSchema.Enum['x-mitre-data-component']],
    target: [stixTypeSchema.Enum['attack-pattern']],
  },
  'attributed-to': {
    source: [stixTypeSchema.Enum.campaign],
    target: [stixTypeSchema.Enum['intrusion-set']],
  },
  targets: {
    source: [stixTypeSchema.Enum['attack-pattern']],
    target: [stixTypeSchema.Enum['x-mitre-asset']],
  },
  'revoked-by': {
    source: validRelationshipObjectTypes,
    target: validRelationshipObjectTypes,
  },
} as const;

// Invalid "uses" combinations
const invalidUsesRelationships: [StixType, StixType][] = [
  [stixTypeSchema.Enum.malware, stixTypeSchema.Enum.malware],
  [stixTypeSchema.Enum.malware, stixTypeSchema.Enum.tool],
  [stixTypeSchema.Enum.tool, stixTypeSchema.Enum.malware],
  [stixTypeSchema.Enum.tool, stixTypeSchema.Enum.tool],
];

/**
 * Validates a STIX relationship based on source type, relationship type, and target type.
 *
 * @param {StixType} sourceType - The type of the source object in the relationship.
 * @param {RelationshipType} relationshipType - The type of relationship between the source and target.
 * @param {StixType} targetType - The type of the target object in the relationship.
 * @param {function} [errorCollector] - Optional function to collect detailed error information.
 *   If provided, it will be called with a ZodIssue object for each validation error.
 *
 * @returns {boolean} Returns true if the relationship is valid, false otherwise.
 *
 * @example
 * // Validate a relationship without error collection
 * const isValid = isValidRelationship('malware', 'uses', 'attack-pattern');
 *
 * @example
 * // Validate a relationship with error collection
 * let errors = [];
 * const isValid = isValidRelationship('malware', 'uses', 'malware', (issue) => errors.push(issue));
 */
export function isValidRelationship(
  sourceType: StixType,
  relationshipType: RelationshipType,
  targetType: StixType,
  errorCollector?: (issue: z.ZodIssue) => void,
): boolean {
  const mapping = relationshipMap[relationshipType];

  if (!mapping) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid 'relationship_type': ${relationshipType}. Must be one of ${Object.keys(relationshipMap).join(', ')}.`,
        code: z.ZodIssueCode.custom,
        path: ['relationship_type'],
      });
    }
    return false;
  }

  if (!mapping.source.includes(sourceType)) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid source type: ${sourceType} for relationship type: ${relationshipType}. Valid source types are: ${mapping.source.join(', ')}.`,
        code: z.ZodIssueCode.custom,
        path: ['source_ref'],
      });
    }
    return false;
  }

  if (!mapping.target.includes(targetType)) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid target type: ${targetType} for relationship type: ${relationshipType}. Valid target types are: ${mapping.target.join(', ')}.`,
        code: z.ZodIssueCode.custom,
        path: ['target_ref'],
      });
    }
    return false;
  }

  if (
    relationshipType === 'uses' &&
    invalidUsesRelationships.some(([s, t]) => s === sourceType && t === targetType)
  ) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid "uses" relationship: source (${sourceType}) and target (${targetType}) cannot both be "malware" or "tool".`,
        code: z.ZodIssueCode.custom,
        path: ['relationship_type'],
      });
    }
    return false;
  }

  if (relationshipType === 'revoked-by' && sourceType !== targetType) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid "revoked-by" relationship: source (${sourceType}) and target (${targetType}) must be of the same type.`,
        code: z.ZodIssueCode.custom,
        path: ['relationship_type'],
      });
    }
    return false;
  }

  return true;
}

/**
 * Represents a possible STIX relationship combination.
 */
export type RelationshipCombination = {
  sourceType: StixType;
  relationshipType: RelationshipType;
  targetType: StixType;
};

/**
 * Generates all possible combinations of STIX relationships.
 * This includes every combination of source type, relationship type, and target type,
 * regardless of whether the combination is valid according to the STIX specification.
 */
const allRelationships: RelationshipCombination[] = stixTypeSchema.options.flatMap((source) =>
  stixTypeSchema.options.flatMap((target) =>
    relationshipTypeSchema.options.map((relType) => ({
      sourceType: source as StixType,
      relationshipType: relType as RelationshipType,
      targetType: target as StixType,
    })),
  ),
);

/**
 * Filters out invalid relationships from all possible combinations.
 * This array contains only the relationships that are not valid according to the STIX specification.
 * It's useful for testing purposes and for identifying which relationship combinations are not allowed.
 */
export const invalidRelationships: RelationshipCombination[] = allRelationships.filter(
  (rel) => !isValidRelationship(rel.sourceType, rel.relationshipType, rel.targetType),
);

/////////////////////////////////////
//
// Relationship
//
/////////////////////////////////////

export const relationshipSchema = stixRelationshipObjectSchema
  .extend({
    id: createStixIdentifierSchema(RELATIONSHIP_TYPE),

    type: z.literal(RELATIONSHIP_TYPE),

    relationship_type: relationshipTypeSchema,

    description: descriptionSchema.optional(),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    source_ref: stixIdentifierSchema.describe('The ID of the source (from) object.'),

    target_ref: stixIdentifierSchema.describe('The ID of the target (to) object.'),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_attack_spec_version: xMitreAttackSpecVersionSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_version: xMitreVersionSchema,

    x_mitre_deprecated: xMitreDeprecatedSchema.optional(),
  })
  .required({
    created: true,
    id: true,
    modified: true,
    object_marking_refs: true,
    relationship_type: true,
    source_ref: true,
    spec_version: true,
    target_ref: true,
    type: true,
    x_mitre_attack_spec_version: true,
    x_mitre_modified_by_ref: true,
    x_mitre_domains: true,
    x_mitre_version: true,
  })
  .superRefine((schema, ctx) => {
    const { relationship_type, source_ref, target_ref } = schema;

    const [sourceType] = source_ref.split('--') as [StixType];
    const [targetType] = target_ref.split('--') as [StixType];

    isValidRelationship(sourceType, relationship_type, targetType, (issue) => {
      ctx.addIssue(issue);
    });
  });

export type Relationship = z.infer<typeof relationshipSchema>;
