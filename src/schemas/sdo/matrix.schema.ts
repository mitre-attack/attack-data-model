import { z } from 'zod/v4';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  createStixIdValidator,
  descriptionSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Tactic Refs
// (tactic_refs)
//
/////////////////////////////////////

export const xMitreTacticRefsSchema = z.array(createStixIdValidator('x-mitre-tactic')).meta({
  description:
    'An ordered list of x-mitre-tactic STIX IDs corresponding to the tactics of the matrix. The order determines the appearance within the matrix.',
});

export type XMitreTacticRefs = z.infer<typeof xMitreTacticRefsSchema>;

/////////////////////////////////////
//
// MITRE Matrix
//
/////////////////////////////////////

export const matrixSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-matrix'),

    type: createStixTypeValidator('x-mitre-matrix'),

    description: descriptionSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    tactic_refs: xMitreTacticRefsSchema,
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    external_references: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
  })
  .strict();

export type Matrix = z.infer<typeof matrixSchema>;
