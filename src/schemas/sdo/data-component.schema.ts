import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  nonEmptyRequiredString,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// MITRE Data Source Ref
// (x_mitre_data_source_ref)
//
//==============================================================================

export const xMitreDataSourceRefSchema = createStixIdValidator('x-mitre-data-source').meta({
  description: 'STIX ID of the data source this component is a part of.',
});

export type XMitreDataSourceRef = z.infer<typeof xMitreDataSourceRefSchema>;

//==============================================================================
//
// Log Sources
// (x_mitre_log_sources)
//
//==============================================================================

export const xMitreLogSourcesSchema = z
  .array(
    z
      .object({
        name: nonEmptyRequiredString,
        channel: nonEmptyRequiredString,
      })
      .strict(),
  )
  .min(1)
  .refine(
    // Reject duplicate (name, channel) pairs
    // Allow same name with different channels
    // Allow same channel with different names
    (permutations) => {
      const seen = new Set<string>();

      for (const perm of permutations) {
        const key = `${perm.name}|${perm.channel}`;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
      }

      return true;
    },
    {
      message: 'Duplicate log source found: each (name, channel) pair must be unique',
      path: ['x_mitre_log_sources'],
    },
  );

export type XMitreLogSources = z.infer<typeof xMitreLogSourcesSchema>;

//==============================================================================
//
// MITRE Data Component
//
//==============================================================================

export const dataComponentSchema = attackBaseDomainObjectSchema
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

    /**
     * DEPRECATION NOTICE:
     * Data Sources are deprecated and will be removed in a future release
     * Consequently, ``x_mitre_data_source_ref`` has been changed to optional
     * TODO Remove ``x_mitre_data_source_ref`` in the next major release
     */
    x_mitre_data_source_ref: xMitreDataSourceRefSchema.optional(),

    // TODO change to required in spec release 4.x
    x_mitre_log_sources: xMitreLogSourcesSchema.optional(),
  })
  .strict();

export type DataComponent = z.infer<typeof dataComponentSchema>;
