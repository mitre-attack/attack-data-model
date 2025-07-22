import { describe, expect, it } from 'vitest';
import { ZodObject } from 'zod';
import { generatePartialSchema } from '../../src/classes/utils';
import { createSyntheticStixObject } from '../../src/generator';
import { analyticSchema } from '../../src/schemas/sdo/analytic.schema';

describe('Partial Schema Tests', () => {
  describe('Partial Analytic Schema Tests', () => {
    let partialAnalyticSchema: ZodObject;
    it('should create a partial Analytic schema', () => {
      partialAnalyticSchema = generatePartialSchema('x-mitre-analytic', analyticSchema);
      expect(partialAnalyticSchema).toBeInstanceOf(ZodObject);
    });

    it('should validate a partial analytic object', () => {
      const partialValidObject = {'spec_version': '2.1'};
      expect(() => partialAnalyticSchema.parse(partialValidObject)).not.toThrow();
    });

    it('should fail to validate an invalid partial analytic object', () => {
      const partialInvalidObject = {'foo': 'bar'};
      expect(() => partialAnalyticSchema.parse(partialInvalidObject)).toThrow();
    });

    it('should validate a complete analytic object', () => {
      const validObject = createSyntheticStixObject('x-mitre-analytic');
      expect(() => partialAnalyticSchema.parse(validObject)).not.toThrow();
    })
  });
});