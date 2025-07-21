import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import {
  descriptionSchema,
  xMitrePlatformsSchema,
  stixCreatedByRefSchema,
  objectMarkingRefsSchema,
  xMitreDomainsSchema,
  aliasesSchema,
  xMitreModifiedByRefSchema,
  externalReferencesSchema,
  createMultiStixTypeValidator,
} from '../common/index.js';

/////////////////////////////////////
//
// Software Schema
//
/////////////////////////////////////

export const extensibleSoftwareSchema = attackBaseDomainObjectSchema.extend({
  type: createMultiStixTypeValidator(['malware', 'tool']),

  created_by_ref: stixCreatedByRefSchema.meta({
    description: 'The ID of the Source object that describes who created this object.',
  }),

  description: descriptionSchema,

  external_references: externalReferencesSchema,

  object_marking_refs: objectMarkingRefsSchema,

  // Malware: Required
  // Tool: Optional
  x_mitre_platforms: xMitrePlatformsSchema.optional(),

  x_mitre_contributors: z.array(z.string()).optional(),

  x_mitre_aliases: aliasesSchema.optional().meta({
    description:
      "Alternative names used to identify this software. The first alias must match the object's name.",
  }),

  x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

  x_mitre_domains: xMitreDomainsSchema,

  // Not used in ATT&CK Malware or Tool but defined in STIX
  aliases: aliasesSchema
    .optional()
    .meta({ description: 'Alternative names used to identify this software.' }),
});

// Alias unless/until software requires at least one refinement
export const softwareSchema = extensibleSoftwareSchema;

// Define the type for Software
export type Software = z.infer<typeof extensibleSoftwareSchema>;
