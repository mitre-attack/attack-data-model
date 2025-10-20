import { z } from 'zod';

/**
 * Schema for validating object deprecation status (`x_mitre_deprecated`).
 *
 * A boolean flag indicating whether an ATT&CK object has been deprecated and should
 * no longer be used in new analyses or implementations.
 *
 * @example
 * ```typescript
 * xMitreDeprecatedSchema.parse(true); // Valid
 * xMitreDeprecatedSchema.parse(false); // Valid
 * xMitreDeprecatedSchema.parse("true"); // Invalid - must be boolean
 * ```
 */
export const xMitreDeprecatedSchema = z
  .boolean({
    error: 'x_mitre_deprecated must be a boolean.',
  })
  .meta({ description: 'Indicates whether the object has been deprecated.' });

/**
 * Type representing an object's deprecation status.
 */
export type XMitreDeprecated = z.infer<typeof xMitreDeprecatedSchema>;
