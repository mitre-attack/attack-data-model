import { createFirstBundleObjectRefinement } from '@/refinements/index.js';
import { z } from 'zod/v4';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  markingDefinitionSchema,
  type MarkingDefinition,
} from '../smo/marking-definition.schema.js';
import { relationshipSchema, type Relationship } from '../sro/relationship.schema.js';
import { type Analytic, analyticSchema } from './analytic.schema.js';
import { type Asset, assetSchema } from './asset.schema.js';
import { type Campaign, campaignSchema } from './campaign.schema.js';
import { type Collection, collectionSchema } from './collection.schema.js';
import { type DataComponent, dataComponentSchema } from './data-component.schema.js';
import { type DataSource, dataSourceSchema } from './data-source.schema.js';
import { type DetectionStrategy, detectionStrategySchema } from './detection-strategy.schema.js';
import { type Group, groupSchema } from './group.schema.js';
import { type Identity, identitySchema } from './identity.schema.js';
import { type Malware, malwareSchema } from './malware.schema.js';
import { type Matrix, matrixSchema } from './matrix.schema.js';
import { type Mitigation, mitigationSchema } from './mitigation.schema.js';
import { type Tactic, tacticSchema } from './tactic.schema.js';
import { type Technique, techniqueSchema } from './technique.schema.js';
import { type Tool, toolSchema } from './tool.schema.js';

export type AttackObject =
  | Malware
  | Asset
  | Campaign
  | Collection
  | DataComponent
  | DataSource
  | Identity
  | Matrix
  | Tool
  | Tactic
  | Technique
  | Group
  | Mitigation
  | DetectionStrategy
  | Analytic
  | Relationship
  | MarkingDefinition;

// Create a schema mapping object to map types to their schemas
const schemaMap = {
  get malware() {
    return malwareSchema;
  },
  get 'x-mitre-asset'() {
    return assetSchema;
  },
  get campaign() {
    return campaignSchema;
  },
  get 'x-mitre-collection'() {
    return collectionSchema;
  },
  get 'x-mitre-data-component'() {
    return dataComponentSchema;
  },
  get 'x-mitre-data-source'() {
    return dataSourceSchema;
  },
  get 'x-mitre-detection-strategy'() {
    return detectionStrategySchema;
  },
  get 'x-mitre-analytic'() {
    return analyticSchema;
  },
  get identity() {
    return identitySchema;
  },
  get 'x-mitre-matrix'() {
    return matrixSchema;
  },
  get tool() {
    return toolSchema;
  },
  get 'x-mitre-tactic'() {
    return tacticSchema;
  },
  get 'attack-pattern'() {
    return techniqueSchema;
  },
  get 'intrusion-set'() {
    return groupSchema;
  },
  get 'course-of-action'() {
    return mitigationSchema;
  },
  get relationship() {
    return relationshipSchema;
  },
  get 'marking-definition'() {
    return markingDefinitionSchema;
  },
};

// IMPORTANT: Casting the 'attackObjectsSchema' to 'z.ZodTypeAny' is critical. Without it, the TypeScript compiler will get overwhelmed and throw the following:
// 'error TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.'

export const attackObjectsSchema: z.ZodTypeAny = z
  .array(
    z
      .object({
        // Basic structure validation to ensure we have a type field
        type: z.string({
          error: (issue) => {
            return issue.code === 'invalid_type'
              ? "Object 'type' must be a string"
              : "The 'type' property is invalid or missing";
          },
        }),
        id: z.string({
          error: (issue) => {
            return issue.code === 'invalid_type'
              ? "Object 'id' must be a string"
              : "The 'id' property is invalid or missing";
          },
        }),
      })
      .loose()
      .check((ctx) => {
        const type = ctx.value.type;

        // Uncomment for debugging
        // console.log(`Validating object of type: ${type}, ID: ${obj.id}`);

        // Get the schema based on the type
        const schema = schemaMap[type as keyof typeof schemaMap];

        if (!schema) {
          ctx.issues.push({
            code: 'custom',
            message: `Unknown STIX type: ${type}`,
            path: ['type'],
            input: ctx.value.type,
          });
          return;
        }

        // Validate the object against the appropriate schema
        // TODO can the following code be cleaned up?
        try {
          schema.parse(ctx.value);
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Forward all validation issues from the schema
            error.issues.forEach((issue) => {
              ctx.issues.push(issue);
            });
          } else {
            // Handle unexpected errors
            ctx.issues.push({
              code: 'custom',
              message: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
              input: ctx.value, // TODO this might be too much information: how can we filter down to just the relevant part?
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

export const stixBundleSchema = z
  .object({
    id: createStixIdValidator('bundle'),
    type: createStixTypeValidator('bundle'),
    objects: z
      .array(
        z.discriminatedUnion('type', [
          collectionSchema,
          analyticSchema,
          assetSchema,
          campaignSchema,
          dataComponentSchema,
          dataSourceSchema,
          detectionStrategySchema,
          groupSchema,
          identitySchema,
          malwareSchema,
          matrixSchema,
          mitigationSchema,
          tacticSchema,
          techniqueSchema,
          toolSchema,
        ]),
      )
      .min(1),
  })
  .meta({
    description:
      'A Bundle is a collection of arbitrary STIX Objects grouped together in a single container. A Bundle does not have any semantic meaning and the objects contained within the Bundle are not considered related by virtue of being in the same Bundle. A STIX Bundle Object is not a STIX Object but makes use of the type and id Common Properties.',
  })
  .strict()
  .check((ctx) => {
    createFirstBundleObjectRefinement()(ctx);
  });

export type StixBundle = z.infer<typeof stixBundleSchema>;
