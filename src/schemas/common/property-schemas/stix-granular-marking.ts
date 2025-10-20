import { z } from 'zod';
import { nonEmptyRequiredString, stixListOfString } from './generics.js';
import { stixIdentifierSchema } from './stix-id.js';

/**
 * Schema for validating granular marking objects.
 *
 * Granular markings allow applying different data markings to specific portions of
 * an object, providing fine-grained control over data classification and handling.
 *
 * **Validation Rules:**
 * - Exactly one of `lang` or `marking_ref` must be present (mutually exclusive)
 * - If `lang` is present, `marking_ref` must NOT be present
 * - If `marking_ref` is present, `lang` must NOT be present
 * - `selectors` is always required
 *
 * @example
 * ```typescript
 * // Valid: marking_ref without lang
 * granularMarkingSchema.parse({
 *   marking_ref: 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da',
 *   selectors: ['description', 'x_mitre_detection']
 * });
 *
 * // Valid: lang without marking_ref
 * granularMarkingSchema.parse({
 *   lang: 'en',
 *   selectors: ['name']
 * });
 *
 * // Invalid: both lang and marking_ref present
 * granularMarkingSchema.parse({
 *   lang: 'en',
 *   marking_ref: 'marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da',
 *   selectors: ['description']
 * }); // Error: lang and marking_ref are mutually exclusive
 *
 * // Invalid: neither lang nor marking_ref present
 * granularMarkingSchema.parse({
 *   selectors: ['description']
 * }); // Error: one of lang or marking_ref must be present
 * ```
 */
export const granularMarkingSchema = z
  .object({
    lang: nonEmptyRequiredString // TODO this key should comply with RFC5646 (see meta description)
      .optional()
      .meta({
        description:
          'The lang property identifies the language of the text identified by this marking. The value of the lang property, if present, MUST be an [RFC5646] language code.\
         If the marking_ref property is not present, this property MUST be present.\
         If the marking_ref property is present, this property MUST NOT be present.',
      }),
    marking_ref: stixIdentifierSchema.optional().meta({
      description:
        'The marking_ref property specifies the ID of the marking-definition object that describes the marking.\
         If the lang property is not present, this property MUST be present. If the lang property is present, this property MUST NOT be present.',
    }),
    selectors: stixListOfString // TODO Selectors MUST conform to the syntax defined in 7.2.3.1 Granular Marking Type
      .meta({
        description:
          'The selectors property specifies a list of selectors for content contained within the STIX Object in which this property appears.',
      }),
  })
  .check((ctx) => {
    const { lang, marking_ref } = ctx.value;

    // Exactly one of lang or marking_ref must be present (mutually exclusive)
    const hasLang = lang !== undefined;
    const hasMarkingRef = marking_ref !== undefined;

    if (hasLang && hasMarkingRef) {
      ctx.issues.push({
        path: ['lang'],
        message: 'If the marking_ref property is present, the lang property MUST NOT be present.',
        code: 'custom',
        input: {
          lang: ctx.value.lang,
          marking_ref: ctx.value.marking_ref,
        },
      });
      ctx.issues.push({
        path: ['marking_ref'],
        message: 'If the lang property is present, the marking_ref property MUST NOT be present.',
        code: 'custom',
        input: {
          lang: ctx.value.lang,
          marking_ref: ctx.value.marking_ref,
        },
      });
    } else if (!hasLang && !hasMarkingRef) {
      ctx.issues.push({
        path: ['lang'],
        message: 'If the marking_ref property is not present, the lang property MUST be present.',
        code: 'custom',
        input: {
          lang: ctx.value.lang,
          marking_ref: ctx.value.marking_ref,
        },
      });
      ctx.issues.push({
        path: ['marking_ref'],
        message: 'If the lang property is not present, the marking_ref property MUST be present.',
        code: 'custom',
        input: {
          lang: ctx.value.lang,
          marking_ref: ctx.value.marking_ref,
        },
      });
    }
  })
  .meta({
    description:
      'The `granular-marking` type defines how the `marking-definition` object referenced by the **marking_ref** property or a language specified by the **lang** property applies to a set of content identified by the list of selectors in the selectors property.',
  });

/**
 * Type representing a granular marking object.
 */
export type GranularMarking = z.infer<typeof granularMarkingSchema>;
