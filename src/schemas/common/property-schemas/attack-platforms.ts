import { z } from 'zod';

/**
 * List of all supported ATT&CK platforms.
 *
 * These platforms represent the different technology environments and operating systems
 * that ATT&CK techniques and other objects can apply to.
 */
const supportedMitrePlatforms = [
  'Field Controller/RTU/PLC/IED',
  'Network Devices',
  'Data Historian',
  'Google Workspace',
  'Office Suite',
  'ESXi',
  'Identity Provider',
  'Containers',
  'Azure AD',
  'Engineering Workstation',
  'Control Server',
  'Human-Machine Interface',
  'Windows',
  'Linux',
  'IaaS',
  'None',
  'iOS',
  'PRE',
  'SaaS',
  'Input/Output Server',
  'macOS',
  'Android',
  'Safety Instrumented System/Protection Relay',
  'Embedded',
] as const;

/**
 * Schema for validating a single platform value.
 *
 * Validates that a platform string is one of the supported ATT&CK platforms.
 *
 * @example
 * ```typescript
 * xMitrePlatformSchema.parse('Windows'); // Valid
 * xMitrePlatformSchema.parse('Linux'); // Valid
 * xMitrePlatformSchema.parse('FreeBSD'); // Invalid - not a supported platform
 * ```
 */
export const xMitrePlatformSchema = z
  .enum(supportedMitrePlatforms, {
    error: () => `Platform must be one of: ${supportedMitrePlatforms.join(', ')}`,
  })
  .meta({
    description:
      'A technology environments and/or operating system that ATT&CK techniques are applicable within.',
  });

/**
 * Type representing a single validated platform.
 */
export type XMitrePlatform = z.infer<typeof xMitrePlatformSchema>;

/**
 * Schema for validating platform lists (`x_mitre_platforms`).
 *
 * An array of platforms that apply to the ATT&CK object. Must contain at least one
 * platform, and all platforms must be unique (no duplicates).
 *
 * @example
 * ```typescript
 * xMitrePlatformsSchema.parse(['Windows', 'Linux']); // Valid
 * xMitrePlatformsSchema.parse(['Windows']); // Valid
 * xMitrePlatformsSchema.parse([]); // Invalid - at least one required
 * xMitrePlatformsSchema.parse(['Windows', 'Windows']); // Invalid - duplicates not allowed
 * ```
 */
export const xMitrePlatformsSchema = z
  .array(xMitrePlatformSchema, {
    error: (issue) =>
      issue.code === 'invalid_type'
        ? 'x_mitre_platforms must be an array of strings'
        : 'Invalid platforms array',
  })
  .min(1, 'At least one platform is required')
  .refine((items) => new Set(items).size === items.length, {
    message: 'Platforms must be unique (no duplicates allowed).',
  })
  .meta({ description: 'List of platforms that apply to the object.' });

/**
 * Type representing a list of validated platforms.
 */
export type XMitrePlatforms = z.infer<typeof xMitrePlatformsSchema>;
