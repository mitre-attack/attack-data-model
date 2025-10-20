import { z } from 'zod/v4';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  aliasesSchema,
  createMultiStixTypeValidator,
  descriptionSchema,
  externalReferencesSchema,
  stixCreatedByRefSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
  xMitrePlatformsSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// Software Schema
//
//==============================================================================

export const softwareSchema = attackBaseDomainObjectSchema.extend({
  type: createMultiStixTypeValidator(['malware', 'tool']),

  created_by_ref: stixCreatedByRefSchema.meta({
    description: 'The ID of the Source object that describes who created this object.',
  }),

  description: descriptionSchema,

  external_references: externalReferencesSchema,

  // Malware: Required
  // Tool: Optional
  x_mitre_platforms: xMitrePlatformsSchema.optional(),

  x_mitre_contributors: xMitreContributorsSchema.optional(),

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

export type Software = z.infer<typeof softwareSchema>;
