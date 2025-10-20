import { z } from 'zod/v4';
import { nonEmptyRequiredString } from './generics.js';

/**
 * Schema for validating MITRE object versions (`x_mitre_version`).
 *
 * Validates version strings in 'major.minor' format where both components are integers
 * between 0 and 99. This follows semantic versioning principles but excludes the patch number.
 * The version is incremented by ATT&CK when object content is updated.
 *
 * Note: This property does not apply to relationship objects.
 *
 * @example
 * ```typescript
 * xMitreVersionSchema.parse("1.0"); // "1.0"
 * xMitreVersionSchema.parse("12.5"); // "12.5"
 * xMitreVersionSchema.parse("1.0.0"); // throws error - no patch version allowed
 * xMitreVersionSchema.parse("100.0"); // throws error - major > 99
 * ```
 */
export const xMitreVersionSchema = nonEmptyRequiredString
  .regex(/^(\d{1,2})\.(\d{1,2})$/, "Version must be in format 'M.N' where M and N are 0-99")
  .meta({
    description:
      "Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers between 0 and 99. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
  });

/**
 * Type representing a validated MITRE version string.
 */
export type XMitreVersion = z.infer<typeof xMitreVersionSchema>;

/**
 * Regular expression for validating semantic version strings (MAJOR.MINOR.PATCH).
 */
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

/**
 * Schema for validating ATT&CK spec versions (`x_mitre_attack_spec_version`).
 *
 * Validates semantic version strings in 'MAJOR.MINOR.PATCH' format. This field helps
 * consuming software determine if the data format is supported. If not present on an
 * object, the spec version is assumed to be 2.0.0.
 *
 * Refer to the ATT&CK CHANGELOG for all supported versions.
 *
 * @example
 * ```typescript
 * xMitreAttackSpecVersionSchema.parse("3.0.0"); // "3.0.0"
 * xMitreAttackSpecVersionSchema.parse("2.1.0"); // "2.1.0"
 * xMitreAttackSpecVersionSchema.parse("1.0"); // throws error - must include patch version
 * ```
 */
export const xMitreAttackSpecVersionSchema = nonEmptyRequiredString
  .regex(semverRegex, 'Must be valid semantic version (MAJOR.MINOR.PATCH)')
  .meta({
    description:
      'The version of the ATT&CK spec used by the object. This field helps consuming software determine if the data format is supported. If the field is not present on an object, the spec version will be assumed to be 2.0.0. Refer to the ATT&CK CHANGELOG for all supported versions.',
  });

/**
 * Type representing a validated ATT&CK spec version string.
 */
export type XMitreAttackSpecVersion = z.infer<typeof xMitreAttackSpecVersionSchema>;
