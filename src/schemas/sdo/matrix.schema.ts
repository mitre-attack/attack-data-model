import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { stixTypeSchema } from '../common/stix-type.js';
import {
  createStixIdentifierSchema,
  descriptionSchema,
  externalReferencesSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Tactic Refs
// (tactic_refs)
//
/////////////////////////////////////

export const xMitreTacticRefsSchema = z
  .array(createStixIdentifierSchema('x-mitre-tactic'))
  .describe(
    'An ordered list of x-mitre-tactic STIX IDs corresponding to the tactics of the matrix. The order determines the appearance within the matrix.',
  );

export type XMitreTacticRefs = z.infer<typeof xMitreTacticRefsSchema>;

/////////////////////////////////////
//
// MITRE Matrix
//
/////////////////////////////////////

export const matrixSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdentifierSchema('x-mitre-matrix'),

    type: z.literal(stixTypeSchema.enum['x-mitre-matrix']),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    external_references: externalReferencesSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    tactic_refs: xMitreTacticRefsSchema,
  })
  .strict();

export type Matrix = z.infer<typeof matrixSchema>;
