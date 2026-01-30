import { z } from 'zod/v4';
import { createCitationsRefinement, createFirstAliasRefinement } from '../../refinements/index.js';
import { attackBaseDomainObjectSchema } from '../common/index.js';
import {
  aliasesSchema,
  createAttackExternalReferencesSchema,
  createStixIdValidator,
  createStixTypeValidator,
  descriptionSchema,
  stixTimestampSchema,
  xMitreContributorsSchema,
  xMitreDomainsSchema,
  xMitreModifiedByRefSchema,
} from '../common/property-schemas/index.js';

//==============================================================================
//
// Mitre Citations
// (x_mitre_first_seen_citation)
// (x_mitre_last_seen_citation)
//
//==============================================================================

type Citation = `(Citation: ${string})`;

const baseCitationSchema = z.custom<Citation>(
  (value): value is Citation => {
    if (typeof value !== 'string') return false;
    if (!value.startsWith('(') || !value.endsWith(')')) return false;

    // Remove the parentheses and split
    const content = value.slice(1, -1);
    const parts = content.split(':');

    if (parts.length !== 2) return false;
    if (parts[0].trim() !== 'Citation') return false;
    if (parts[1].trim() === '') return false;

    return true;
  },
  {
    message: "Each citation must conform to the pattern '(Citation: [citation name])'",
  },
);

const multipleCitationsSchema = z.custom<string>(
  (value): value is string => {
    if (typeof value !== 'string') return false;

    // Split the string into individual citations
    const citations = value.match(/\(Citation:[^)]+\)/g);

    if (!citations) return false;

    // Check if all parts are valid citations and there's no extra content
    return (
      citations.join('') === value &&
      citations.every((citation) => baseCitationSchema.safeParse(citation).success)
    );
  },
  {
    message:
      "Must be one or more citations in the form '(Citation: [citation name])' without any separators",
  },
);

export const xMitreFirstSeenCitationSchema = multipleCitationsSchema.meta({
  description:
    "One or more citations for when the object was first seen, in the form '(Citation: [citation name])(Citation: [citation name])...', where each `[citation name]` can be found as one of the `source_name` values in the `external_references`.",
});

export const xMitreLastSeenCitationSchema = multipleCitationsSchema.meta({
  description:
    "One or more citations for when the object was last seen, in the form '(Citation: [citation name])(Citation: [citation name])...', where each `[citation name]` can be found as one of the `source_name` values in the `external_references`.",
});

export type XMitreFirstSeenCitation = z.infer<typeof xMitreFirstSeenCitationSchema>;
export type XMitreLastSeenCitation = z.infer<typeof xMitreLastSeenCitationSchema>;

//==============================================================================
//
// ATT&CK Campaign
//
//==============================================================================

export const extensibleCampaignSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('campaign'),

    type: createStixTypeValidator('campaign'),

    description: descriptionSchema,

    external_references: createAttackExternalReferencesSchema('campaign'),

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    aliases: aliasesSchema,

    // Optional in STIX but required in ATT&CK
    first_seen: stixTimestampSchema.meta({
      description: 'The time that this Campaign was first seen.',
    }),

    // Optional in STIX but required in ATT&CK
    last_seen: stixTimestampSchema.meta({
      description: 'The time that this Campaign was last seen.',
    }),

    x_mitre_first_seen_citation: xMitreFirstSeenCitationSchema,

    x_mitre_last_seen_citation: xMitreLastSeenCitationSchema,
  })
  .required({
    created_by_ref: true, // Optional in STIX but required in ATT&CK
    object_marking_refs: true, // Optional in STIX but required in ATT&CK
    revoked: true, // Optional in STIX but required in ATT&CK
  })
  .strict()
  .meta({
    description: `
Campaigns represent sets of adversary activities occurring over a specific time period with shared characteristics and objectives.
They are defined as [campaign](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230925)
objects with additional temporal tracking fields.
    `.trim(),
  });

export const campaignSchema = extensibleCampaignSchema.check((ctx) => {
  createFirstAliasRefinement()(ctx);
  createCitationsRefinement()(ctx);
});

export const campaignPartialSchema = extensibleCampaignSchema.partial().check((ctx) => {
  createFirstAliasRefinement()(ctx);
  createCitationsRefinement()(ctx);
});

export type Campaign = z.infer<typeof campaignSchema>;
export type CampaignPartial = z.infer<typeof campaignPartialSchema>;
