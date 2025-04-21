import { z } from 'zod';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  createStixIdValidator,
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
  .array(createStixIdValidator('x-mitre-tactic'))
  .describe(
    'An ordered list of x-mitre-tactic STIX IDs corresponding to the tactics of the matrix. The order determines the appearance within the matrix.',
  );

export type XMitreTacticRefs = z.infer<typeof xMitreTacticRefsSchema>;

/////////////////////////////////////
//
// MITRE Matrix
//
/////////////////////////////////////

export const matrixSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-matrix'),

    type: createStixTypeValidator('x-mitre-matrix'),

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
