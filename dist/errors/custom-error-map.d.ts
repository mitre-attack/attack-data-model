import { z } from 'zod';
/**
 * Custom error map for Zod to handle STIX-specific errors.
 *
 * @param {z.ZodIssue} issue - The Zod issue object containing error details.
 * @param {object} ctx - The context object provided by Zod.
 * @returns {object} An object with a custom error message.
 *
 * This function intercepts Zod's error creation process and provides
 * custom, more informative error messages for STIX type and ID mismatches.
 */
declare const customErrorMap: z.ZodErrorMap;
export { customErrorMap };
//# sourceMappingURL=custom-error-map.d.ts.map