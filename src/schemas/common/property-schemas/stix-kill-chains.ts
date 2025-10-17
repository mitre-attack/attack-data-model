import { z } from 'zod';
import { nonEmptyRequiredString } from './generics.js';

/**
 * Schema for validating kill chain names.
 *
 * Kill chain names identify which ATT&CK framework variant the phase belongs to.
 *
 * @example
 * ```typescript
 * killChainNameSchema.parse('mitre-attack'); // Valid - Enterprise ATT&CK
 * killChainNameSchema.parse('mitre-mobile-attack'); // Valid - Mobile ATT&CK
 * killChainNameSchema.parse('lockheed-martin'); // Invalid - not an ATT&CK kill chain
 * ```
 */
export const killChainNameSchema = z.enum([
  'mitre-attack',
  'mitre-mobile-attack',
  'mitre-ics-attack',
]);

/**
 * Schema for validating kill chain phase objects.
 *
 * Represents a specific phase within an ATT&CK kill chain (e.g., "initial-access",
 * "execution"). Phase names should be all lowercase and use hyphens as word separators.
 *
 * @example
 * ```typescript
 * killChainPhaseSchema.parse({
 *   kill_chain_name: 'mitre-attack',
 *   phase_name: 'initial-access'
 * }); // Valid
 *
 * killChainPhaseSchema.parse({
 *   kill_chain_name: 'mitre-attack',
 *   phase_name: 'Initial Access'
 * }); // Invalid - should be lowercase with hyphens
 * ```
 */
export const killChainPhaseSchema = z
  .object({
    phase_name: nonEmptyRequiredString
      .refine(
        (value) => {
          // Check if the value is all lowercase
          const isLowercase = value === value.toLowerCase();

          // Check if the value uses hyphens instead of spaces or underscores
          const usesHyphens = !value.includes(' ') && !value.includes('_');

          return isLowercase && usesHyphens;
        },
        {
          message:
            'Phase name should be all lowercase and use hyphens instead of spaces or underscores.',
        },
      )
      .meta({
        description:
          'The name of the phase in the kill chain. The value of this property SHOULD be all lowercase and SHOULD use hyphens instead of spaces or underscores as word separators.',
      }),

    kill_chain_name: killChainNameSchema,
  })
  .strict();

/**
 * Type representing a kill chain name.
 */
export type KillChainName = z.infer<typeof killChainNameSchema>;

/**
 * Type representing a kill chain phase object.
 */
export type KillChainPhase = z.infer<typeof killChainPhaseSchema>;
