import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  createAttackExternalReferencesSchema,
  createOldMitreAttackIdSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  objectMarkingRefsSchema,
  stixCreatedByRefSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// Mitigation (Course of Action) Schema
//
//==============================================================================

export const mitigationSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('course-of-action'),

    type: createStixTypeValidator('course-of-action'),

    description: descriptionSchema.meta({
      description: 'A description that provides more details and context about the Mitigation.',
    }),

    // Optional in STIX but required in ATT&CK
    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    external_references: createAttackExternalReferencesSchema('course-of-action'),

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.min(1).optional(),

    x_mitre_old_attack_id: createOldMitreAttackIdSchema('course-of-action').optional(),
  })
  .strict()
  .meta({
    description: `
Mitigations represent defensive measures or controls that can reduce the effectiveness of adversary techniques.
They are defined as [course-of-action](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230929)
objects and strictly follow the STIX 2.1 specification without additional custom fields.

### ATT&CK ID Collisions (Legacy)

**Historical context:** In ATT&CK versions prior to v5 (July 2019), mitigations maintained 1:1 relationships with techniques and shared identical ATT&CK IDs.
This design was deprecated to support more flexible mitigation-to-technique mappings.

**Current impact:** Legacy 1:1 mitigations may cause ATT&CK ID collisions between mitigations and techniques.
These deprecated objects can be filtered out during queries.
  `.trim(),
  });

export type Mitigation = z.infer<typeof mitigationSchema>;
