import { z } from 'zod/v4';

/**
 * Schema for validating individual ATT&CK domain values.
 *
 * ATT&CK domains represent different technology environments covered by the framework.
 *
 * @example
 * ```typescript
 * attackDomainSchema.parse('enterprise-attack'); // Valid
 * attackDomainSchema.parse('mobile-attack'); // Valid
 * attackDomainSchema.parse('cloud-attack'); // Invalid - not a valid domain
 * ```
 */
export const attackDomainSchema = z
  .enum(['enterprise-attack', 'mobile-attack', 'ics-attack'])
  .meta({
    description:
      'ATT&CK is organized in a series of “technology domains” - the ecosystem an adversary\
      operates within that provides a set of constraints the adversary must circumvent or take\
      advantage of to accomplish a set of objectives. To date MITRE has defined three technology\
      domains.',
  });

/**
 * Type representing a single ATT&CK domain.
 */
export type AttackDomain = z.infer<typeof attackDomainSchema>;

/**
 * Schema for validating ATT&CK domains (`x_mitre_domains`).
 *
 * An array of technology domains to which the ATT&CK object belongs. At least one
 * domain must be specified.
 *
 * @example
 * ```typescript
 * xMitreDomainsSchema.parse(['enterprise-attack']); // Valid
 * xMitreDomainsSchema.parse(['enterprise-attack', 'mobile-attack']); // Valid
 * xMitreDomainsSchema.parse([]); // Invalid - at least one domain required
 * ```
 */
export const xMitreDomainsSchema = z
  .array(attackDomainSchema)
  .min(1, {
    message: 'At least one MITRE ATT&CK domain must be specified.',
  })
  .meta({
    description: 'The technology domains to which the ATT&CK object belongs.',
  });

/**
 * Type representing a list of ATT&CK domains.
 */
export type XMitreDomains = z.infer<typeof xMitreDomainsSchema>;
