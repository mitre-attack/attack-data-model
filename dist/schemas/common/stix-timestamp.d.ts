import { z } from 'zod';
export declare const stixTimestampSchema: z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>;
export type StixTimestamp = z.infer<typeof stixTimestampSchema>;
export declare const stixCreatedTimestampSchema: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixCreatedTimestamp">;
export type StixCreatedTimestamp = z.infer<typeof stixCreatedTimestampSchema>;
export declare const stixModifiedTimestampSchema: z.ZodBranded<z.ZodType<`${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`, z.ZodTypeDef, `${number}-${number}-${number}T${number}:${number}:${number}Z` | `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`>, "StixModifiedTimestamp">;
export type StixModifiedTimestamp = z.infer<typeof stixModifiedTimestampSchema>;
//# sourceMappingURL=stix-timestamp.d.ts.map