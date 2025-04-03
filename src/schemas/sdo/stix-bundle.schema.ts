import { z } from 'zod';
import { stixSpecVersionSchema } from '../common/index.js';
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

// IMPORTANT: Casting the 'attackObjectsSchema' to 'z.ZodTypeAny' is critical. Without it, the TypeScript compiler will get overwhelmed and throw the following:
// 'error TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.'

export const attackObjectsSchema: z.ZodTypeAny = z
  .array(
    z.union([
      malwareSchema,
      assetSchema,
      campaignSchema,
      collectionSchema,
      dataComponentSchema,
      logSourceSchema,
      identitySchema,
      matrixSchema,
      toolSchema,
      tacticSchema,
      techniqueSchema,
      groupSchema,
      mitigationSchema,
      detectionSchema,
      indicatorSchema,
      relationshipSchema,
      markingDefinitionSchema,
    ]),
  )
  .min(1, { message: 'The STIX bundle must contain at least one object.' });

export type AttackObjects = z.infer<typeof attackObjectsSchema>;

/////////////////////////////////////
//
// STIX Bundle
//
/////////////////////////////////////

export const baseStixBundleSchema = z.object({
  id: createStixIdValidator('bundle'),
  type: createStixTypeValidator('bundle'),
  spec_version: stixSpecVersionSchema,
  objects: attackObjectsSchema,
});

export const stixBundleSchema = baseStixBundleSchema.strict().superRefine((schema, ctx) => {
  // Verify that the first object in the bundle is the 'x-mitre-collection' object
  const firstObject = schema.objects[0];

  if (firstObject.type !== 'x-mitre-collection') {
    // first object is not a collection object! record an error ...

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The first object in the 'objects' array must be of type 'x-mitre-collection'",
      path: ['objects', 0, 'type'],
    });
  }
});

export type StixBundle = z.infer<typeof stixBundleSchema>;
