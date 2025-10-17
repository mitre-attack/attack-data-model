import { z } from 'zod/v4';
import { stixListOfString } from './generics.js';
import { type StixIdentifier } from './stix-id.js';

/**
 * The official STIX identifier for the MITRE Corporation identity object.
 *
 * This constant represents MITRE's identity in the STIX ecosystem and is used to
 * attribute objects to the MITRE organization.
 */
export const xMitreIdentity: StixIdentifier =
  'identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5' as const;

/**
 * Schema for validating the MITRE identity identifier.
 *
 * Ensures that the value exactly matches MITRE's official STIX identity.
 */
export const xMitreIdentitySchema = z
  .literal(xMitreIdentity)
  .meta({ description: 'STIX Identity for The MITRE Corporation' });

/**
 * Schema for validating modified-by references (`x_mitre_modified_by_ref`).
 *
 * The STIX ID of the MITRE identity object, used to track the identity of the MITRE
 * organization which created the current version of the object. Previous versions may
 * have been created by other individuals or organizations.
 *
 * @example
 * ```typescript
 * xMitreModifiedByRefSchema.parse('identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5'); // Valid
 * xMitreModifiedByRefSchema.parse('identity--other'); // Invalid - must be MITRE identity
 * ```
 */
export const xMitreModifiedByRefSchema = xMitreIdentitySchema.meta({
  description:
    'The STIX ID of the MITRE identity object. Used to track the identity of the MITRE organization, which created the current version of the object. Previous versions of the object may have been created by other individuals or organizations.',
});

/**
 * Type representing a validated MITRE modified-by reference.
 */
export type XMitreModifiedByRef = z.infer<typeof xMitreModifiedByRefSchema>;

/**
 * Schema for validating contributors (`x_mitre_contributors`).
 *
 * An array of names representing people and organizations who have contributed to the
 * ATT&CK object. This property is not found on relationship objects.
 *
 * @example
 * ```typescript
 * xMitreContributorsSchema.parse(['John Doe', 'Acme Security']); // Valid
 * xMitreContributorsSchema.parse([]); // Invalid - at least one contributor required when present
 * ```
 */
export const xMitreContributorsSchema = stixListOfString.meta({
  description:
    'People and organizations who have contributed to the object. Not found on objects of type `relationship`.',
});

/**
 * Type representing a list of contributors.
 */
export type XMitreContributors = z.infer<typeof xMitreContributorsSchema>;
