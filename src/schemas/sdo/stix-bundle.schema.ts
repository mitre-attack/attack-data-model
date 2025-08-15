import { createFirstBundleObjectRefinement } from '@/refinements/index.js';
import { z } from 'zod/v4';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import { type MarkingDefinition } from '../smo/marking-definition.schema.js';
import { type Relationship } from '../sro/relationship.schema.js';
import { type Analytic, analyticSchema } from './analytic.schema.js';
import { type Asset, assetSchema } from './asset.schema.js';
import { type Campaign, campaignSchema } from './campaign.schema.js';
import { type Collection, collectionSchema } from './collection.schema.js';
import { type DataComponent, dataComponentSchema } from './data-component.schema.js';
import { type DataSource, dataSourceSchema } from './data-source.schema.js';
import { type DetectionStrategy, detectionStrategySchema } from './detection-strategy.schema.js';
import { type Group, groupSchema } from './group.schema.js';
import { type Identity, identitySchema } from './identity.schema.js';
import { type LogSource, logSourceSchema } from './log-source.schema.js';
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
  | (DataSource | LogSource)
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

/////////////////////////////////////
//
// STIX Bundle
//
/////////////////////////////////////

export const stixBundleSchema = z
  .object({
    id: createStixIdValidator('bundle'),
    type: createStixTypeValidator('bundle'),
    // objects: attackObjectsSchema,
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
          logSourceSchema,
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
