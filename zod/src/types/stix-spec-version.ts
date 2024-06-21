import { z } from "zod";

export const StixSpecVersionSchema = z
    .enum(['2.0', '2.1'])
    .default("2.1");
    
export type StixSpecVersion = z.infer<typeof StixSpecVersionSchema>;