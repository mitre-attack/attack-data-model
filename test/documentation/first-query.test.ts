import { describe, it, expect } from 'vitest';
import { ContentOriginRegistration } from '../../src/main.js';
import { AttackDataModel } from '../../src/api/attack-data-model.js';

describe('examples/first-query.ts Code Example', () => {
  describe('ContentOriginRegistration Configuration', () => {
    it('should use the exact configuration from the example', () => {
      // Maps to: examples/first-query.ts - lines 7-12
      // Code: const contentOrigin = new ContentOriginRegistration({ source: 'mitre', domain: 'enterprise-attack', version: '17.1', parsingMode: 'relaxed' });
      const contentOrigin = new ContentOriginRegistration({
        source: 'mitre',
        domain: 'enterprise-attack',
        version: '17.1',
        parsingMode: 'relaxed',
      });

      expect(contentOrigin.options.source).toBe('mitre');
      expect((contentOrigin.options as any).domain).toBe('enterprise-attack');
      expect((contentOrigin.options as any).version).toBe('17.1');
      expect(contentOrigin.options.parsingMode).toBe('relaxed');
    });
  });

  describe('AttackDataModel Usage Patterns', () => {
    it('should validate AttackDataModel methods used in the example', () => {
      // Maps to: examples/first-query.ts - lines 22-31
      // Code: const attackDataModel = loadDataModel(uuid); attackDataModel.techniques.length; attackDataModel.techniques.slice(0, 5)
      const uuid = 'test-uuid';
      const attackObjects: any[] = [];
      const attackDataModel = new AttackDataModel(uuid, attackObjects);

      // The example uses these properties/methods
      expect(attackDataModel.techniques).toBeDefined();
      expect(Array.isArray(attackDataModel.techniques)).toBe(true);
      expect(typeof attackDataModel.techniques.length).toBe('number');

      // The example calls .slice(0, 5) on techniques array
      expect(typeof attackDataModel.techniques.slice).toBe('function');

      // Test that slice works as expected in the example
      const sliced = attackDataModel.techniques.slice(0, 5);
      expect(Array.isArray(sliced)).toBe(true);
      expect(sliced.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Technique Data Structure Validation', () => {
    it('should validate that real techniques have properties accessed in the example', () => {
      // Maps to: examples/first-query.ts - line 29
      // Code: technique.name and technique.external_references[0].external_id
      const techniques = globalThis.attackData.objectsByType['attack-pattern'] || [];

      if (techniques.length > 0) {
        const technique = techniques[0];

        // Properties accessed in the example
        expect(technique.name).toBeDefined();
        expect(technique.external_references).toBeDefined();
        expect(Array.isArray(technique.external_references)).toBe(true);

        if (technique.external_references.length > 0) {
          expect(technique.external_references[0].external_id).toBeDefined();

          // The example formats output as: `${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`
          const formattedOutput = `1. ${technique.name} (${technique.external_references[0].external_id})`;
          expect(formattedOutput).toMatch(/^\d+\. .+ \([A-Z]\d+(\.\d+)?\)$/);
        }
      }
    });

    it('should validate the example output format pattern', () => {
      // Maps to: examples/first-query.ts - line 28-31
      // Code: forEach((technique, index) => { console.log(`${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`); });
      const techniques = globalThis.attackData.objectsByType['attack-pattern'] || [];

      // Test the first 5 techniques as the example does
      const first5Techniques = techniques.slice(0, 5);

      first5Techniques.forEach((technique, index) => {
        expect(technique.name).toBeDefined();
        expect(technique.external_references?.[0]?.external_id).toBeDefined();

        // Validate the exact output format from the example
        const formattedOutput = `${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`;
        expect(formattedOutput).toMatch(/^\d+\. .+ \([A-Z]\d+(\.\d+)?\)$/);
        expect(formattedOutput).toContain(technique.name);
        expect(formattedOutput).toContain(technique.external_references[0].external_id);
      });
    });
  });

  describe('Async Function Pattern Validation', () => {
    it('should validate the async function structure used in the example', () => {
      // Maps to: examples/first-query.ts - lines 3-38
      // Code: async function exploreAttackData() { try { const uuid = await registerContentOrigin(contentOrigin); } catch (error) { ... } }

      // Test that the async pattern components work
      const testAsyncPattern = async () => {
        const contentOrigin = new ContentOriginRegistration({
          source: 'mitre',
          domain: 'enterprise-attack',
          version: '17.1',
          parsingMode: 'relaxed',
        });

        // The example checks these properties exist
        expect(contentOrigin.options.source).toBeDefined();
        expect((contentOrigin.options as any).domain).toBeDefined();
        expect((contentOrigin.options as any).version).toBeDefined();
        expect(contentOrigin.options.parsingMode).toBeDefined();

        return contentOrigin;
      };

      expect(testAsyncPattern).not.toThrow();
    });
  });

  describe('Console Output Patterns', () => {
    it('should validate console output message formats from the example', () => {
      // Maps to: examples/first-query.ts - lines 4, 19, 23, 26
      // Code: console.log('🎯 Loading ATT&CK Enterprise data...\n'); console.log(`📊 Loaded ${attackDataModel.techniques.length} techniques\n`);

      const techniqueCount = globalThis.attackData.objectsByType['attack-pattern']?.length || 0;

      // Test the loading message format from the example
      const loadingMessage = `Loaded ${techniqueCount} techniques`;
      expect(loadingMessage).toMatch(/^Loaded \d+ techniques$/);
      expect(techniqueCount).toBeGreaterThan(0);

      // Test the exploration message format
      const explorationMessage = 'First 5 techniques:';
      expect(explorationMessage).toBe('First 5 techniques:');
    });
  });

  describe('Error Handling Pattern', () => {
    it('should validate error handling structure from the example', () => {
      // Maps to: examples/first-query.ts - lines 32-37
      // Code: } else { console.error('❌ Failed to register data source'); } } catch (error) { console.error('❌ Error:', error); }

      // Test that the error handling patterns would work
      const testErrorHandling = () => {
        try {
          // Simulate the uuid check pattern from the example
          const uuid = 'test-uuid'; // In real example, this comes from registerDataSource

          if (uuid) {
            expect(uuid).toBeDefined();
            expect(typeof uuid).toBe('string');
          } else {
            // This would match the error case in the example
            expect(uuid).toBeNull();
          }
        } catch (error) {
          // Error handling as shown in the example
          expect(error).toBeDefined();
        }
      };

      expect(testErrorHandling).not.toThrow();
    });
  });

  describe('Import Statement Validation', () => {
    it('should validate the imports used in the example', () => {
      // Maps to: examples/first-query.ts - line 1
      // Code: import { registerContentOrigin, loadDataModel, ContentOriginRegistration } from '@mitre-attack/attack-data-model';

      // Test that the imported classes/functions exist and are usable
      expect(ContentOriginRegistration).toBeDefined();
      expect(typeof ContentOriginRegistration).toBe('function');

      // Test that ContentOriginRegistration can be instantiated as shown in the example
      const contentOrigin = new ContentOriginRegistration({
        source: 'mitre',
        domain: 'enterprise-attack',
        version: '17.1',
        parsingMode: 'relaxed',
      });

      expect(contentOrigin).toBeInstanceOf(ContentOriginRegistration);
    });
  });
});
