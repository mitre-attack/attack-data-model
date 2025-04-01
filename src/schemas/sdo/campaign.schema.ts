import { z } from 'zod';
import { attackBaseObjectSchema } from '../common/attack-base-object.js';
import {
  stixTypeSchema,
  stixTimestampSchema,
  stixCreatedByRefSchema,
  descriptionSchema,
  xMitreDomainsSchema,
  createStixIdentifierSchema,
  aliasesSchema,
  externalReferencesSchema,
  xMitreModifiedByRefSchema,
  xMitreContributorsSchema,
  objectMarkingRefsSchema,
} from '../common/index.js';

/////////////////////////////////////
//
// Mitre Citations
// (x_mitre_first_seen_citation)
// (x_mitre_last_seen_citation)
//
/////////////////////////////////////

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

export const xMitreFirstSeenCitationSchema = multipleCitationsSchema.describe(
  "One or more citations for when the object was first seen, in the form '(Citation: [citation name])(Citation: [citation name])...', where each [citation name] can be found as one of the source_name values in the external_references.",
);

export const xMitreLastSeenCitationSchema = multipleCitationsSchema.describe(
  "One or more citations for when the object was last seen, in the form '(Citation: [citation name])(Citation: [citation name])...', where each [citation name] can be found as one of the source_name values in the external_references.",
);

export type XMitreFirstSeenCitation = z.infer<typeof xMitreFirstSeenCitationSchema>;
export type XMitreLastSeenCitation = z.infer<typeof xMitreLastSeenCitationSchema>;

/////////////////////////////////////
//
// ATT&CK Campaign
//
/////////////////////////////////////

export const campaignSchema = attackBaseObjectSchema
  .extend({
    id: createStixIdentifierSchema(stixTypeSchema.enum.campaign),

    type: z.literal(stixTypeSchema.enum.campaign),

    description: descriptionSchema,

    external_references: externalReferencesSchema,

    created_by_ref: stixCreatedByRefSchema,

    // Optional in STIX but required in ATT&CK
    object_marking_refs: objectMarkingRefsSchema,

    x_mitre_domains: xMitreDomainsSchema,

    x_mitre_modified_by_ref: xMitreModifiedByRefSchema,

    x_mitre_contributors: xMitreContributorsSchema.optional(),

    aliases: aliasesSchema.describe(
      "Alternative names used to identify this campaign. The first alias must match the object's name.",
    ),

    // Optional in STIX but required in ATT&CK
    first_seen: stixTimestampSchema.describe('The time that this Campaign was first seen.'),

    // Optional in STIX but required in ATT&CK
    last_seen: stixTimestampSchema.describe('The time that this Campaign was last seen.'),

    x_mitre_first_seen_citation: xMitreFirstSeenCitationSchema,

    x_mitre_last_seen_citation: xMitreLastSeenCitationSchema,
  })
  .required({
    aliases: true,
    created: true,
    created_by_ref: true,
    description: true,
    external_references: true,
    first_seen: true,
    id: true,
    last_seen: true,
    modified: true,
    name: true,
    object_marking_refs: true,
    revoked: true,
    spec_version: true,
    type: true,
    x_mitre_attack_spec_version: true,
    x_mitre_deprecated: true,
    x_mitre_domains: true,
    x_mitre_first_seen_citation: true,
    x_mitre_last_seen_citation: true,
    x_mitre_modified_by_ref: true,
    x_mitre_version: true,
  })
  .strict()
  .superRefine((schema, ctx) => {
    // Destructure relevant properties from the schema
    const {
      aliases,
      external_references,
      x_mitre_first_seen_citation,
      x_mitre_last_seen_citation,
    } = schema;

    //==============================================================================
    // Validate aliases
    //==============================================================================

    // The object's name MUST be listed as the first alias in the aliases field
    if (aliases && aliases.length > 0) {
      if (schema.aliases[0] !== schema.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The first alias must match the object's name.",
          path: ['aliases'],
        });
      }
    }

    //==============================================================================
    // Validate external references
    //==============================================================================

    // Verify the first external reference is an ATT&CK ID
    const attackIdEntry = external_references[0];
    if (!attackIdEntry.external_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ATT&CK ID must be defined in the first external_reference entry.',
        path: ['external_references', 0, 'external_id'],
      });
    } else {
      const idRegex = /C\d{4}$/;
      if (!idRegex.test(attackIdEntry.external_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The first external_reference must match the ATT&CK ID format C####}.`,
          path: ['external_references', 0, 'external_id'],
        });
      }
    }

    //==============================================================================
    // Validate citations (they must appear in external_references)
    //==============================================================================

    // Verify that [citation name] can be found as one of the source_name of one of the external_references

    // Helper function to extract citation names from a citation string
    const extractCitationNames = (citations: string): string[] => {
      const matches = citations.match(/\(Citation: ([^)]+)\)/g);
      return matches ? matches.map((match) => match.slice(10, -1).trim()) : [];
    };

    // Helper function to validate multiple citations
    const validateCitations = (citations: string, path: string[]) => {
      const citationNames = extractCitationNames(citations);

      citationNames.forEach((citationName, index) => {
        const citationExists = external_references.some((ref) => ref.source_name === citationName);

        if (!citationExists) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Citation ${citationName} not found in external_references.`,
            path: [...path, index],
          });
        }
      });

      // Validate the format of the entire citation string
      if (!citations.match(/^(\(Citation: [^)]+\))+$/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Citations must be in the format '(Citation: Name1)(Citation: Name2)...' without any separators.",
          path: path,
        });
      }
    };

    // Validate x_mitre_first_seen_citation
    if (x_mitre_first_seen_citation) {
      validateCitations(x_mitre_first_seen_citation, ['x_mitre_first_seen_citation']);
    }

    // Validate x_mitre_last_seen_citation
    if (x_mitre_last_seen_citation) {
      validateCitations(x_mitre_last_seen_citation, ['x_mitre_last_seen_citation']);
    }
  });

// Define the type for AttackCampaign
export type Campaign = z.infer<typeof campaignSchema>;
