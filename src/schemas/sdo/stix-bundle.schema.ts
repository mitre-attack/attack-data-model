import { z } from "zod";
import { stixSpecVersionSchema } from "../common";
import { stixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema } from "../common/stix-identifier";
import { Malware, malwareSchema } from "./malware.schema";
import { Asset, assetSchema } from "./asset.schema";
import { Campaign, campaignSchema } from "./campaign.schema";
import { DataComponent, dataComponentSchema } from "./data-component.schema";
import { DataSource, dataSourceSchema } from "./data-source.schema";
import { Identity, identitySchema } from "./identity.schema";
import { Matrix, matrixSchema } from "./matrix.schema";
import { Tool, toolSchema } from "./tool.schema";
import { Tactic, tacticSchema } from "./tactic.schema";
import { Technique, techniqueSchema } from "./technique.schema";
import { Group, groupSchema } from "./group.schema";
import { Mitigation, mitigationSchema } from "./mitigation.schema";
import { Collection, collectionSchema } from "./collection.schema";
import { Relationship, relationshipSchema } from "../sro/relationship.schema"
import { MarkingDefinition, markingDefinitionSchema } from "../smo/marking-definition.schema";

import '../../errors';


const STIX_BUNDLE_TYPE = stixTypeSchema.enum.bundle;

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
  | Relationship
  | MarkingDefinition;

export const attackObjectsSchema = z
  .array(
    z.union([
      malwareSchema,
      assetSchema,
      campaignSchema,
      collectionSchema,
      dataComponentSchema,
      dataSourceSchema,
      identitySchema,
      matrixSchema,
      toolSchema,
      tacticSchema,
      techniqueSchema,
      groupSchema,
      mitigationSchema,
      relationshipSchema,
      markingDefinitionSchema
    ])
).min(1, { message: 'The STIX bundle must contain at least one object.' });

export type AttackObjects = z.infer<typeof attackObjectsSchema>;



/////////////////////////////////////
//
// STIX Bundle
//
/////////////////////////////////////

export const stixBundleSchema = z
  .object({

    id: createStixIdentifierSchema(STIX_BUNDLE_TYPE),

    type: z.literal(STIX_BUNDLE_TYPE),

    spec_version: stixSpecVersionSchema,

    objects: attackObjectsSchema
  })
  .strict()
  .superRefine((schema, ctx) => {

    // Verify that the first object in the bundle is the 'x-mitre-collection' object
    const firstObject = schema.objects[0];

    if (firstObject.type !== "x-mitre-collection") {
      // first object is not a collection object! record an error ...

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The first object in the 'objects' array must be of type 'x-mitre-collection'",
        path: ['objects', 0, 'type']
      });
    }
  });

export type StixBundle = z.infer<typeof stixBundleSchema>;