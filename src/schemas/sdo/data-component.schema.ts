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
  description:
    '**DEPRECATED in v3.3.0. Will be removed in v4.0.0.** STIX ID of the data source this component is a part of.',
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
        name: nonEmptyRequiredString.meta({
          description: 'Log source identifier (e.g., "sysmon", "auditd")',
        }),
        channel: nonEmptyRequiredString.meta({
          description: 'Specific log channel or event type (e.g., "1" for Sysmon Process Creation)',
        }),
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
  )
  .meta({
    description: `
      The \`log_source\` object defines platform-specific collection configurations embedded within data components:

      **Uniqueness constraints:**

      - Each \`(name, channel)\` tuple must be unique within a data component's \`x_mitre_log_sources\` array
      - Log sources are scoped to their containing data component

      **Example:** A data component for 'Process Creation' might contain log sources for:

      - Windows: (name: "sysmon", channel: "1")
      - Linux: (name: "auditd", channel: "SYSCALL")
      - macOS: (name: "unified_logs", channel: "process")
    `.trim(),
  });

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

    x_mitre_data_source_ref: xMitreDataSourceRefSchema.optional(), // TODO remove in attack spec 4.0.0 / adm release 5.x

    // TODO change to required in spec release 4.x
    x_mitre_log_sources: xMitreLogSourcesSchema.optional(),
  })
  .strict()
  .meta({
    description: `
Data components represent specific types of information within a data source that can be used for detection.
They are defined as \`x-mitre-data-component\` objects extending the generic
[STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).
    `.trim(),
  });

export type DataComponent = z.infer<typeof dataComponentSchema>;
