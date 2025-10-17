/**
 * This module is intended for utility schemas - common schemas that aren't semantically predicated on ATT&CK or STIX
 * These are generalized, common schemas, meant to promote composability through schema re-use
 */

import { z } from 'zod';

/**
 * A Zod schema for validating non-empty, trimmed strings.
 *
 * This schema ensures that:
 * - The input is a string type
 * - Leading and trailing whitespace is removed
 * - At least one non-whitespace character remains after trimming
 *
 * @example
 * ```typescript
 * nonEmptyRequiredString.parse("hello"); // "hello"
 * nonEmptyRequiredString.parse("  hello  "); // "hello"
 * nonEmptyRequiredString.parse(""); // throws error
 * nonEmptyRequiredString.parse("   "); // throws error
 * ```
 */
export const nonEmptyRequiredString = z
  .string()
  .trim()
  .min(1, { error: 'At least one character is required. Whitespace is not permissible.' });

/**
 * Creates a STIX-compliant list schema that enforces non-empty arrays.
 *
 * According to the STIX specification, empty lists are prohibited and must not be used
 * as a substitute for omitting optional properties. Any list that is present must contain
 * at least one value.
 *
 * @param zodSchema - The Zod schema to use for validating individual array elements
 * @returns A Zod array schema that requires at least one element
 *
 * @example
 * ```typescript
 * const numberListSchema = stixListOf(z.number());
 * numberListSchema.parse([1, 2, 3]); // [1, 2, 3]
 * numberListSchema.parse([]); // throws error: "Empty lists are prohibited in STIX..."
 * ```
 */
export const stixListOf = (zodSchema: z.ZodType) => {
  return z
    .array(zodSchema, {
      error: (issue) => (issue.code === 'invalid_type' ? 'Must be an array' : 'Invalid array'),
    })
    .min(1, {
      error:
        'Empty lists are prohibited in STIX and MUST NOT be used as a substitute for omitting the property if it is optional. The list MUST be present and MUST have at least one value.',
    });
};

/**
 * A STIX-compliant list schema for non-empty strings.
 *
 * This is a convenience schema that combines `stixListOf` with `nonEmptyRequiredString`,
 * creating a common pattern used throughout STIX objects for string array properties.
 *
 * @example
 * ```typescript
 * stixListOfString.parse(["foo", "bar"]); // ["foo", "bar"]
 * stixListOfString.parse(["foo", "  bar  "]); // ["foo", "bar"] (trimmed)
 * stixListOfString.parse([]); // throws error
 * stixListOfString.parse(["foo", ""]); // throws error
 * ```
 */
export const stixListOfString = stixListOf(nonEmptyRequiredString);
