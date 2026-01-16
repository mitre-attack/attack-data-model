import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  nonEmptyRequiredString,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';
import { validateNoDuplicates } from '../../refinements/index.js';

//==============================================================================
//
// MITRE Log Source
//
//==============================================================================

export const xMitreLogSourcePermutationName = nonEmptyRequiredString;

export const xMitreLogSourceReferenceSchema = z
  .object({
    x_mitre_data_component_ref: createStixIdValidator('x-mitre-data-component'),
    name: nonEmptyRequiredString.meta({
      description:
        "Log source name from the associated data component's `x_mitre_log_sources` array",
    }),
    channel: nonEmptyRequiredString.meta({
      description: "Log source channel from the data component's `x_mitre_log_sources` array",
    }),
  })
  .meta({
    description:
      'The `log_source_reference` object links analytics to specific data components with log source details',
  });

export type LogSourceReference = z.infer<typeof xMitreLogSourceReferenceSchema>;

//==============================================================================
//
// MITRE Log Sources (plural)
//
//==============================================================================

export const xMitreLogSourceReferencesSchema = z
  .array(xMitreLogSourceReferenceSchema)
  .min(1)
  .check((ctx) => {
    // Validate no duplicate log source references using composite key validation
    // Each (x_mitre_data_component_ref, name, channel) tuple must be unique
    validateNoDuplicates(
      [],
      ['x_mitre_data_component_ref', 'name', 'channel'],
      'Duplicate log source reference found: each (x_mitre_data_component_ref, name, channel) tuple must be unique',
    )(ctx);
  })
  .meta({
    description:
      'A list of log source references, which are delineated by a Data Component STIX ID and the (`name`, `channel`) that is being targeted.',
  });

export type LogSourceReferences = z.infer<typeof xMitreLogSourceReferencesSchema>;

//==============================================================================
//
// MITRE Mutable Element
//
//==============================================================================

export const xMitreMutableElementSchema = z
  .object({
    field: nonEmptyRequiredString.meta({
      description: 'Name of the detection field that can be tuned',
    }),
    description: nonEmptyRequiredString.meta({
      description: 'Rationale for tunability and environment-specific considerations',
    }),
  })
  .meta({
    description: 'The `mutable_element` object defines tunable parameters within analytics',
  });

export type MutableElement = z.infer<typeof xMitreMutableElementSchema>;

//==============================================================================
//
// MITRE Mutable Elements (plural)
//
//==============================================================================

export const xMitreMutableElementsSchema = z.array(xMitreMutableElementSchema).min(1).meta({
  description:
    'Environment-specific tuning knobs like TimeWindow, UserContext, or PortRange, so defenders can adapt without changing core behavior.',
});

export type MutableElements = z.infer<typeof xMitreMutableElementsSchema>;

//==============================================================================
//
// MITRE Analytic
//
//==============================================================================

export const analyticSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('x-mitre-analytic'),

    type: createStixTypeValidator('x-mitre-analytic'),

    description: descriptionSchema,

    x_mitre_platforms: xMitrePlatformsSchema
      .max(1)
      .meta({ description: 'Target platform for this Analytic.' }), // 0 or 1

    external_references: createAttackExternalReferencesSchema('x-mitre-analytic'),

    x_mitre_log_source_references: xMitreLogSourceReferencesSchema.optional(),

    x_mitre_mutable_elements: xMitreMutableElementsSchema.optional(),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema.optional(),
  })
  .required({
    created_by_ref: true,
    object_marking_refs: true,
  })
  .strict()
  .meta({
    description: `
Analytics contain platform-specific detection logic and represent the implementation details of a detection strategy.
They are defined as \`x-mitre-analytic\` objects extending the generic
[STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).
    `.trim(),
  });

export type Analytic = z.infer<typeof analyticSchema>;
