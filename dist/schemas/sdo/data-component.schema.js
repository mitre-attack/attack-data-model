import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import { stixTypeSchema } from '../common/stix-type.js';
import { createStixIdentifierSchema, descriptionSchema, objectMarkingRefsSchema, stixCreatedByRefSchema, xMitreDomainsSchema, xMitreModifiedByRefSchema, } from '../common/index.js';
/////////////////////////////////////
//
// MITRE Data Source Ref
// (x_mitre_data_source_ref)
//
/////////////////////////////////////
export const xMitreDataSourceRefSchema = createStixIdentifierSchema('x-mitre-data-source').describe('STIX ID of the data source this component is a part of.');
/////////////////////////////////////
//
// MITRE Data Component
//
/////////////////////////////////////
export const dataComponentSchema = attackBaseObjectSchema
    .extend({
    id: createStixIdentifierSchema('x-mitre-data-component'),
    type: z.literal(stixTypeSchema.enum['x-mitre-data-component']),
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
//# sourceMappingURL=data-component.schema.js.map