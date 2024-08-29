import { z } from "zod";
import { attackBaseObjectSchema } from "../common/attack-base-object";
import { stixTypeSchema } from "../common/stix-type";
import {
  xMitrePlatformsSchema,
  xMitreDomainsSchema,
  createStixIdentifierSchema,
  descriptionSchema,
  xMitreModifiedByRefSchema,
  xMitreContributorsSchema,
  objectMarkingRefsSchema,
  externalReferencesSchema,
  stixCreatedByRefSchema,
} from "../common";


/////////////////////////////////////
//
// MITRE Collection Layers 
// (x_mitre_collection_layers)
//
/////////////////////////////////////

const supportedMitreCollectionLayers = [
  'Cloud Control Plane',
  'Host',
  'Report',
  'Container',
  'Device',
  'OSINT',
  'Network'
] as const;

export const xMitreCollectionLayersSchema = z
  .array(z.enum(supportedMitreCollectionLayers), {
    invalid_type_error:
      "x_mitre_collection_layers must be an array of supported collection layers.",
  })
  .describe("List of places the data can be collected from.");

export type XMitreCollectionLayers = z.infer<typeof xMitreCollectionLayersSchema>;


/////////////////////////////////////
//
// MITRE Data Source
//
/////////////////////////////////////

export const dataSourceSchema = attackBaseObjectSchema.extend({

  id: createStixIdentifierSchema('x-mitre-data-source'),

  type: z.literal(stixTypeSchema.enum["x-mitre-data-source"]),

  // Optional in STIX but required in ATT&CK
  created_by_ref: stixCreatedByRefSchema,

  description: descriptionSchema,

  // Optional in STIX but required in ATT&CK
  external_references: externalReferencesSchema,

  // Optional in STIX but required in ATT&CK
  object_marking_refs: objectMarkingRefsSchema,

  x_mitre_platforms: xMitrePlatformsSchema
    .optional(),

  x_mitre_domains: xMitreDomainsSchema,

  x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

  x_mitre_contributors: xMitreContributorsSchema
    .optional(),

  x_mitre_collection_layers: xMitreCollectionLayersSchema,
});

// Define the type for DataSource
export type DataSource = z.infer<typeof dataSourceSchema>;
