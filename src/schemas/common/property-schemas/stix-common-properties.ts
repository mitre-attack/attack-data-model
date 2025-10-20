import { z } from 'zod/v4';
import { nonEmptyRequiredString, stixListOfString } from './generics.js';

/**
 * Schema for validating object descriptions.
 *
 * A non-empty, trimmed string providing descriptive information about a STIX or ATT&CK object.
 *
 * @example
 * ```typescript
 * descriptionSchema.parse("This technique describes..."); // "This technique describes..."
 * descriptionSchema.parse("   "); // throws error
 * ```
 */
export const descriptionSchema = nonEmptyRequiredString
  // .brand<'Description'>()
  .meta({ description: 'A description of the object.' });

/**
 * Type representing a validated object description.
 */
export type Description = z.infer<typeof descriptionSchema>;

/**
 * Schema for validating object names.
 *
 * A non-empty, trimmed string representing the name of a STIX or ATT&CK object.
 *
 * @example
 * ```typescript
 * nameSchema.parse("Attack Pattern"); // "Attack Pattern"
 * nameSchema.parse(""); // throws error
 * ```
 */
export const nameSchema = nonEmptyRequiredString
  // .brand<'Name'>()
  .meta({ description: 'The name of the object.' });

/**
 * Type representing a validated object name.
 */
export type Name = z.infer<typeof nameSchema>;

/**
 * Schema for validating object aliases.
 *
 * An array of alternative names used to identify an object. According to ATT&CK conventions,
 * the first alias in the array must match the object's name property.
 *
 * @example
 * ```typescript
 * aliasesSchema.parse(["APT28", "Fancy Bear", "Sofacy"]); // Valid
 * aliasesSchema.parse([]); // throws error - at least one alias required
 * ```
 */
export const aliasesSchema = stixListOfString.meta({
  description:
    "Alternative names used to identify this object. The first alias must match the object's name.",
});

/**
 * Type representing a list of object aliases.
 */
export type Aliases = z.infer<typeof aliasesSchema>;
