import { z } from 'zod';
import { type StixType } from './stix-type.js';
type StixIdentifier = `${StixType}--${string}`;
export declare const stixIdentifierSchema: z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
export declare function createStixIdentifierSchema<T extends StixType>(expectedType: T): z.ZodEffects<z.ZodEffects<z.ZodType<`file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, z.ZodTypeDef, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>, `${T}--${string}`, `file--${string}` | `attack-pattern--${string}` | `bundle--${string}` | `campaign--${string}` | `course-of-action--${string}` | `identity--${string}` | `intrusion-set--${string}` | `malware--${string}` | `tool--${string}` | `marking-definition--${string}` | `x-mitre-data-component--${string}` | `x-mitre-data-source--${string}` | `x-mitre-tactic--${string}` | `x-mitre-asset--${string}` | `x-mitre-matrix--${string}` | `x-mitre-collection--${string}` | `relationship--${string}` | `artifact--${string}`>;
export type { StixIdentifier };
export type TypeSpecificStixIdentifier<T extends StixType> = `${T}--${string}`;
/**
 * Usage examples:
 * Create a schema for a specific StixType:
 *  const tacticIdSchema = createStixTypeIdentifierSchema('x-mitre-tactic');
 *
 * Create a type for a specific StixType:
 *  type TacticId = z.infer<typeof tacticIdSchema>; // Will be "x-mitre-tactic--${string}"
 * or
 *  type TacticId = TypeSpecificStixIdentifier<'x-mitre-tactic'>; // Will be "x-mitre-tactic--${string}"</s>
 */
//# sourceMappingURL=stix-identifier.d.ts.map