import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { createStixTypeValidator } from '../common/stix-type.js';
import {
  createStixIdValidator,
  descriptionSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// MITRE Data Source Ref
// (x_mitre_data_source_ref)
//
/////////////////////////////////////

export const xMitreDataSourceRefSchema = createStixIdValidator('x-mitre-data-source').describe(
  'STIX ID of the data source this component is a part of.',
);

export type XMitreDataSourceRef = z.infer<typeof xMitreDataSourceRefSchema>;

/////////////////////////////////////
//
// MITRE Data Component
//
/////////////////////////////////////

export const extensibleDataComponentSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-data-component'),

    type: createStixTypeValidator('x-mitre-data-component'),

    description: descriptionSchema,

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_data_source_ref: xMitreDataSourceRefSchema,
  })
  .strict();

// No refinements currently exist on data components, so just export an alias
export const dataComponentSchema = extensibleDataComponentSchema;

export type DataComponent = z.infer<typeof extensibleDataComponentSchema>;
