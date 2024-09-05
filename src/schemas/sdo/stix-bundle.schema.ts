import { z } from "zod";
import { stixSpecVersionSchema } from "../common";
import { stixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema } from "../common/stix-identifier";
import { malwareSchema } from "./malware.schema";
import { assetSchema } from "./asset.schema";
import { campaignSchema } from "./campaign.schema";
import { dataComponentSchema } from "./data-component.schema";
import { dataSourceSchema } from "./data-source.schema";
import { identitySchema } from "./identity.schema";
import { matrixSchema } from "./matrix.schema";
import { toolSchema } from "./tool.schema";
import { tacticSchema } from "./tactic.schema";
import { techniqueSchema } from "./technique.schema";
import { groupSchema } from "./group.schema";
import { mitigationSchema } from "./mitigation.schema";
import { collectionSchema } from "./collection.schema";
import { relationshipSchema } from "../sro/relationship.schema"
import { markingDefinitionSchema } from "../smo/marking-definition.schema";

import '../../errors';


const STIX_BUNDLE_TYPE = stixTypeSchema.enum.bundle;


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

    objects: z
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
      ).min(1, { message: 'The STIX bundle must contain at least one object.' })
  })
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