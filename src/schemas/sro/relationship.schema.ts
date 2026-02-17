import { z } from 'zod/v4';
import { attackBaseRelationshipObjectSchema } from '../common/index.js';
import {
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  stixIdentifierSchema,
  stixTypeSchema,
  xMitreModifiedByRefSchema,
  type StixIdentifier,
  type StixType,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// Relationship Types
// (relationship_type)
//
//==============================================================================

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
  .meta({ description: 'The name used to identify the type of Relationship.' });

export type RelationshipType = z.infer<typeof relationshipTypeSchema>;

// Valid relationship object types
export const validRelationshipObjectTypes = [
  stixTypeSchema.enum['attack-pattern'],
  stixTypeSchema.enum['campaign'],
  stixTypeSchema.enum['course-of-action'],
  stixTypeSchema.enum['intrusion-set'],
  stixTypeSchema.enum['malware'],
  stixTypeSchema.enum['tool'],
  stixTypeSchema.enum['x-mitre-data-component'],
  stixTypeSchema.enum['x-mitre-asset'],
];

type RelationshipMap = Record<RelationshipType, { source: StixType[]; target: StixType[] }>;

const relationshipMap: RelationshipMap = {
  uses: {
    source: [
      stixTypeSchema.enum.malware,
      stixTypeSchema.enum.tool,
      stixTypeSchema.enum['intrusion-set'],
      stixTypeSchema.enum.campaign,
    ],
    target: [
      stixTypeSchema.enum['attack-pattern'],
      stixTypeSchema.enum.malware,
      stixTypeSchema.enum.tool,
    ],
  },
  mitigates: {
    source: [stixTypeSchema.enum['course-of-action']],
    target: [stixTypeSchema.enum['attack-pattern']],
  },
  'subtechnique-of': {
    source: [stixTypeSchema.enum['attack-pattern']],
    target: [stixTypeSchema.enum['attack-pattern']],
  },
  detects: {
    source: [
      // TODO remove DC --<detects>--> Technique in spec release 4.x
      stixTypeSchema.enum['x-mitre-data-component'],
      stixTypeSchema.enum['x-mitre-detection-strategy'],
    ],
    target: [stixTypeSchema.enum['attack-pattern']],
  },
  'attributed-to': {
    source: [stixTypeSchema.enum.campaign],
    target: [stixTypeSchema.enum['intrusion-set']],
  },
  targets: {
    source: [stixTypeSchema.enum['attack-pattern']],
    target: [stixTypeSchema.enum['x-mitre-asset']],
  },
  'revoked-by': {
    source: validRelationshipObjectTypes,
    target: validRelationshipObjectTypes,
  },
} as const;

// Invalid "uses" combinations
const invalidUsesRelationships: [StixType, StixType][] = [
  [stixTypeSchema.enum.malware, stixTypeSchema.enum.malware],
  [stixTypeSchema.enum.malware, stixTypeSchema.enum.tool],
  [stixTypeSchema.enum.tool, stixTypeSchema.enum.malware],
  [stixTypeSchema.enum.tool, stixTypeSchema.enum.tool],
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
  errorCollector?: (issue: z.core.$ZodIssue) => void,
): boolean {
  const mapping = relationshipMap[relationshipType];

  if (!mapping) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid 'relationship_type': ${relationshipType}. Must be one of ${Object.keys(relationshipMap).join(', ')}.`,
        code: 'custom',
        path: ['relationship_type'],
        input: {
          relationship_type: relationshipType,
          source_type: sourceType,
          target_type: targetType,
        },
      });
    }
    return false;
  }

  if (!mapping.source.includes(sourceType)) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid source type: ${sourceType} for relationship type: ${relationshipType}. Valid source types are: ${mapping.source.join(', ')}.`,
        code: 'custom',
        path: ['source_ref'],
        input: {
          relationship_type: relationshipType,
          source_type: sourceType,
          target_type: targetType,
        },
      });
    }
    return false;
  }

  if (!mapping.target.includes(targetType)) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid target type: ${targetType} for relationship type: ${relationshipType}. Valid target types are: ${mapping.target.join(', ')}.`,
        code: 'custom',
        path: ['target_ref'],
        input: {
          relationship_type: relationshipType,
          source_type: sourceType,
          target_type: targetType,
        },
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
        code: 'custom',
        path: ['relationship_type'],
        input: {
          relationship_type: relationshipType,
          source_type: sourceType,
          target_type: targetType,
        },
      });
    }
    return false;
  }

  if (relationshipType === 'revoked-by' && sourceType !== targetType) {
    if (errorCollector) {
      errorCollector({
        message: `Invalid "revoked-by" relationship: source (${sourceType}) and target (${targetType}) must be of the same type.`,
        code: 'custom',
        path: ['relationship_type'],
        input: {
          relationship_type: relationshipType,
          source_type: sourceType,
          target_type: targetType,
        },
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

/**
 * Creates a refinement function for relationships
 *
 * @returns A refinement function for relationship validation
 */
export function createRelationshipValidationRefinement() {
  return (
    ctx: z.core.ParsePayload<
      | Partial<Relationship>
      | {
          relationship_type: RelationshipType;
          source_ref: StixIdentifier;
          target_ref: StixIdentifier;
        }
    >,
  ): void => {
    // Partial-safe: cannot validate without all required fields
    if (!ctx.value.relationship_type || !ctx.value.source_ref || !ctx.value.target_ref) {
      return;
    }
    const [sourceType] = ctx.value.source_ref.split('--') as [StixType];
    const [targetType] = ctx.value.target_ref.split('--') as [StixType];

    isValidRelationship(sourceType, ctx.value.relationship_type, targetType, (issue) => {
      ctx.issues.push({
        code: 'custom',
        message: issue.message,
        path: issue.path,
        input: issue.input,
      });
    });
  };
}

//==============================================================================
//
// Relationship
//
//==============================================================================

export const relationshipBaseSchema = attackBaseRelationshipObjectSchema
  .extend({
    id: createStixIdValidator('relationship'),

    type: createStixTypeValidator('relationship'),

    relationship_type: relationshipTypeSchema,

    description: descriptionSchema.optional(),

    source_ref: stixIdentifierSchema.meta({ description: 'The ID of the source (from) object.' }),

    target_ref: stixIdentifierSchema.meta({ description: 'The ID of the target (to) object.' }),

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,
  })
  .omit({
    name: true,
    x_mitre_version: true,
  })
  .strict();

export type Relationship = z.infer<typeof relationshipBaseSchema>;
export type RelationshipPartial = Partial<Relationship>;

export const relationshipChecks = (ctx: z.core.ParsePayload<RelationshipPartial>): void => {
  createRelationshipValidationRefinement()(ctx);

  // Check for deprecated pattern (partial-safe: skip if required fields are missing)
  if (!ctx.value.source_ref || !ctx.value.target_ref || !ctx.value.relationship_type) return;
  const [sourceType] = ctx.value.source_ref.split('--') as [StixType];
  if (
    sourceType === 'x-mitre-data-component' &&
    ctx.value.relationship_type === 'detects' &&
    ctx.value.target_ref.startsWith('attack-pattern--')
  ) {
    console.warn(
      'DEPRECATION WARNING: x-mitre-data-component -> detects -> attack-pattern relationships are deprecated',
    );
  }
};

export const relationshipSchema = relationshipBaseSchema.check(relationshipChecks);

export const relationshipPartialSchema = relationshipBaseSchema.partial().check(relationshipChecks);
