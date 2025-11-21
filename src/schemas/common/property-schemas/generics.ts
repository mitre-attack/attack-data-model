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
 * A STIX-compliant list schema for non-empty strings.
 *
 * This is a convenience schema that combines `z.array` with `nonEmptyRequiredString`,
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
export const stixListOfString = z.array(nonEmptyRequiredString).min(1, {
  error:
    'Empty lists are prohibited in STIX and MUST NOT be used as a substitute for omitting the property if it is optional. The list MUST be present and MUST have at least one value.',
});

/**
 * A utility function that creates a Zod array schema with a uniqueness constraint.
 *
 * This function wraps any Zod schema in an array validator that ensures all items
 * are unique (no duplicate values). Uniqueness is determined by JavaScript's Set
 * equality, which uses SameValueZero comparison.
 *
 * @param schema - The Zod schema type for individual array elements
 * @returns A Zod array schema that validates element uniqueness
 *
 * @example
 * ```typescript
 * const uniqueStrings = uniqueArray(z.string());
 * uniqueStrings.parse(["a", "b", "c"]); // ["a", "b", "c"]
 * uniqueStrings.parse(["a", "b", "a"]); // throws error
 *
 * const uniqueNumbers = uniqueArray(z.number());
 * uniqueNumbers.parse([1, 2, 3]); // [1, 2, 3]
 * uniqueNumbers.parse([1, 2, 2]); // throws error
 * ```
 */
export function uniqueArray<T extends z.ZodType>(schema: T) {
  return z.array(schema).check((ctx) => {
    const seen = new Map<z.infer<T>, number>();
    const duplicates: z.infer<T>[] = [];

    ctx.value.forEach((item, index) => {
      if (seen.has(item)) {
        duplicates.push(item);
      } else {
        seen.set(item, index);
      }
    });

    if (duplicates.length > 0) {
      ctx.issues.push({
        code: 'custom',
        message: `Duplicate values found: ${duplicates.map((d) => JSON.stringify(d)).join(', ')}`,
        // path: [], // not sure how to dynamically determine key name
        input: ctx.value,
      });
    }
  });
}
