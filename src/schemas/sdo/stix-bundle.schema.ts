import { z } from 'zod/v4';
import { createStixTypeValidator } from '../common/stix-type.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { type Malware, malwareSchema } from './malware.schema.js';
import { type Asset, assetSchema } from './asset.schema.js';
import { type Campaign, campaignSchema } from './campaign.schema.js';
import { type DataComponent, dataComponentSchema } from './data-component.schema.js';
import { type LogSource, logSourceSchema } from './log-source.schema.js';
import { type Identity, identitySchema } from './identity.schema.js';
import { type Matrix, matrixSchema } from './matrix.schema.js';
import { type Tool, toolSchema } from './tool.schema.js';
import { type Tactic, tacticSchema } from './tactic.schema.js';
import { type Technique, techniqueSchema } from './technique.schema.js';
import { type Group, groupSchema } from './group.schema.js';
import { type Mitigation, mitigationSchema } from './mitigation.schema.js';
import { type Collection, collectionSchema } from './collection.schema.js';
import { type Detection, detectionSchema } from './detection.schema.js';
import { type Indicator, indicatorSchema } from './indicator.schema.js';
import { type Relationship, relationshipSchema } from '../sro/relationship.schema.js';
import {
  type MarkingDefinition,
  markingDefinitionSchema,
} from '../smo/marking-definition.schema.js';
import { createFirstBundleObjectRefinement } from '@/refinements/index.js';
import { stixSpecVersionSchema, type StixSpecVersion } from '../common/stix-spec-version.js';

export type AttackObject =
  | Malware
  | Asset
  | Campaign
  | Collection
  | DataComponent
  | LogSource
  | Identity
  | Matrix
  | Tool
  | Tactic
  | Technique
  | Group
  | Mitigation
  | Detection
  | Indicator
  | Relationship
  | MarkingDefinition;

// Create a schema mapping object to map types to their schemas
const schemaMap = {
  malware: malwareSchema,
  'x-mitre-asset': assetSchema,
  campaign: campaignSchema,
  'x-mitre-collection': collectionSchema,
  'x-mitre-data-component': dataComponentSchema,
  'x-mitre-data-source': dataSourceSchema,
  identity: identitySchema,
  'x-mitre-matrix': matrixSchema,
  tool: toolSchema,
  'x-mitre-tactic': tacticSchema,
  'attack-pattern': techniqueSchema,
  'intrusion-set': groupSchema,
  'course-of-action': mitigationSchema,
  relationship: relationshipSchema,
  'marking-definition': markingDefinitionSchema,
};

// IMPORTANT: Casting the 'attackObjectsSchema' to 'z.ZodTypeAny' is critical. Without it, the TypeScript compiler will get overwhelmed and throw the following:
// 'error TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.'

export const attackObjectsSchema: z.ZodTypeAny = z
  .array(
    z
      .object({
        // Basic structure validation to ensure we have a type field
        type: z.string({
          required_error: "Object must have a 'type' property",
          invalid_type_error: "Object 'type' must be a string",
        }),
        id: z.string({
          required_error: "Object must have an 'id' property",
          invalid_type_error: "Object 'id' must be a string",
        }),
      })
      .passthrough()
      .superRefine((obj, ctx) => {
        const type = obj.type;

        // Uncomment for debugging
        // console.log(`Validating object of type: ${type}, ID: ${obj.id}`);

        // Get the schema based on the type
        const schema = schemaMap[type as keyof typeof schemaMap];

        if (!schema) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unknown STIX type: ${type}`,
            path: ['type'],
          });
          return;
        }

        // Validate the object against the appropriate schema
        try {
          schema.parse(obj);
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Forward all validation issues from the schema
            error.issues.forEach((issue) => {
              ctx.addIssue(issue);
            });
          } else {
            // Handle unexpected errors
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
            });
          }
        }
      }),
  )
  .min(1, { message: 'The STIX bundle must contain at least one object.' });

export type AttackObjects = z.infer<typeof attackObjectsSchema>;

/////////////////////////////////////
//
// STIX Bundle
//
/////////////////////////////////////

export const extensibleStixBundleSchema = z
  .object({
    id: createStixIdValidator('bundle'),

    type: createStixTypeValidator('bundle'),

    spec_version: z
      .literal(stixSpecVersionSchema.enum['2.1'] as StixSpecVersion)
      .describe('Only STIX 2.1 specification version is allowed'),

    objects: attackObjectsSchema,
  })
  .strict();

// Create refinement instance
const validateFirstBundleObject = createFirstBundleObjectRefinement();

// Apply the refinement
export const stixBundleSchema = extensibleStixBundleSchema.superRefine((schema, ctx) => {
  validateFirstBundleObject(schema, ctx);
});

// Define the type for StixBundle
export type StixBundle = z.infer<typeof extensibleStixBundleSchema>;
