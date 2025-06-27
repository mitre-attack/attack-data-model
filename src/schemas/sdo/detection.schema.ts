import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/common-properties.js';

/////////////////////////////////////
//
// MITRE Detection
//
/////////////////////////////////////

export const detectionSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-detection'),
    type: createStixTypeValidator('x-mitre-detection'),
    // spec_version
    // created
    // modified
    // name
    // created_by_ref --> override as required
    // x_mitre_version
    // x_mitre_attack_spec_version
    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,
    x_mitre_contributors: xMitreContributorsSchema,
    // object_marking_refs --> override as required
    // x_mitre_analytics: xMitreAnalytics[],
    x_mitre_domains: xMitreDomainsSchema,
    // external_references --> override as required
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
    external_references: true,
  })
  .describe(
    'The detection logic and patterns used to identify malicious activities based on the collected data.',
  );

export type Detection = z.infer<typeof detectionSchema>;
