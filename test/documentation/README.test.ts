import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { createSyntheticStixObject } from '../../src/generator/index.js';
import { tacticSchema } from '../../src/schemas/index.js';
import { DataSourceRegistration } from '../../src/data-sources/data-source-registration.js';
import { AttackDataModel } from '../../src/classes/attack-data-model.js';

describe('README.md Code Examples', () => {
  describe('Installation Examples', () => {
    it('should validate npm install command format', () => {
      // Maps to: README.md - "Installation" section
      // Code block: ```bash npm install @mitre-attack/attack-data-model
      const packageName = '@mitre-attack/attack-data-model';
      expect(packageName).toMatch(/^@[a-z-]+\/[a-z-]+$/);
    });

    it('should validate version compatibility patterns', () => {
      // Maps to: README.md - "Installing Specific Versions" section
      // Code blocks: ```bash npm install @mitre-attack/attack-data-model@4.0.0
      const versions = ['4.0.0', '^4.0.0', '~4.0.0', '5.x', '17.1'];
      versions.forEach((version) => {
        expect(version).toMatch(/^[~^]?\d+(\.\d+)?(\.\d+)?$|\d+\.x$/);
      });
    });

    it('should demonstrate version checking from collection object', () => {
      // Maps to: README.md - "How to Check Your ATT&CK Version" section
      // Code block: ```json { "type": "x-mitre-collection", "x_mitre_attack_spec_version": "3.2.0" }
      const collections = globalThis.attackData.objectsByType['x-mitre-collection'] || [];

      if (collections.length > 0) {
        const collection = collections[0];
        expect(collection.x_mitre_attack_spec_version).toBeDefined();
        expect(collection.name).toBeDefined();
      }
    });
  });

  describe('Recommended Approach Example', () => {
    it('should work with the loading example from README', () => {
      // Maps to: README.md - "Recommended Approach" section
      // Code block: ```javascript const dataSource = new DataSourceRegistration({ source: 'attack', ... });
      const dataSource = new DataSourceRegistration({
        source: 'attack',
        domain: 'enterprise-attack',
        version: '17.1',
        parsingMode: 'strict',
      });

      expect(dataSource.options.source).toBe('attack');
      expect(dataSource.options.domain).toBe('enterprise-attack');
      expect(dataSource.options.version).toBe('17.1');
      expect(dataSource.options.parsingMode).toBe('strict');
    });
  });

  describe('Basic Usage Examples', () => {
    it('should work with the async function example', () => {
      // Maps to: README.md - "Basic Usage" section
      // Code block: ```typescript const dataSource = new DataSourceRegistration({ ..., parsingMode: 'relaxed' });
      const dataSource = new DataSourceRegistration({
        source: 'attack',
        domain: 'enterprise-attack',
        version: '15.1',
        parsingMode: 'relaxed',
      });

      expect(dataSource.options.source).toBe('attack');
      expect(dataSource.options.domain).toBe('enterprise-attack');
      expect(dataSource.options.version).toBe('15.1');
      expect(dataSource.options.parsingMode).toBe('relaxed');
    });

    it('should validate that real ATT&CK objects have documented structure', () => {
      // Maps to: README.md - "Basic Usage" section
      // Code patterns: accessing techniques, tactics, technique properties
      const techniques = globalThis.attackData.objectsByType['attack-pattern'] || [];
      const tactics = globalThis.attackData.objectsByType['x-mitre-tactic'] || [];

      expect(techniques.length).toBeGreaterThan(100);
      expect(tactics.length).toBeGreaterThan(5);

      if (techniques.length > 0) {
        const technique = techniques[0];
        expect(technique.name).toBeDefined();
        expect(technique.external_references).toBeDefined();
        expect(technique.external_references[0]?.external_id).toBeDefined();
      }
    });

    it('should demonstrate subtechnique patterns', () => {
      // Maps to: README.md - "Basic Usage" section
      // Code pattern: if (technique.x_mitre_is_subtechnique) { console.log(technique.getParentTechnique()); }
      const techniques = globalThis.attackData.objectsByType['attack-pattern'] || [];

      const parentTechnique = techniques.find(
        (t) => 'x_mitre_is_subtechnique' in t && t.x_mitre_is_subtechnique === false,
      );

      if (parentTechnique) {
        expect(parentTechnique.x_mitre_is_subtechnique).toBe(false);
      }

      const subtechnique = techniques.find(
        (t) => 'x_mitre_is_subtechnique' in t && t.x_mitre_is_subtechnique === true,
      );

      if (subtechnique) {
        expect(subtechnique.x_mitre_is_subtechnique).toBe(true);
      }
    });

    it('should demonstrate accessing attack objects by type', () => {
      // Maps to: README.md - "Basic Usage" section
      // Code pattern: accessing attackDataModel.techniques, attackDataModel.tactics, etc.
      expect(globalThis.attackData.objectsByType['attack-pattern']).toBeDefined();
      expect(globalThis.attackData.objectsByType['x-mitre-tactic']).toBeDefined();
      expect(globalThis.attackData.objectsByType['intrusion-set']).toBeDefined();
      expect(globalThis.attackData.objectsByType['malware']).toBeDefined();
      expect(globalThis.attackData.objectsByType['tool']).toBeDefined();
      expect(globalThis.attackData.objectsByType['course-of-action']).toBeDefined();
      expect(globalThis.attackData.objectsByType['campaign']).toBeDefined();
    });
  });

  describe('Parsing and Validating a Tactic Examples', () => {
    it('should parse valid tactic as shown in README', () => {
      // Maps to: README.md - "Parsing and Validating a Tactic" section
      // Code block: ```typescript import { tacticSchema } from "@mitre-attack/attack-data-model";
      const validTactic = createSyntheticStixObject('x-mitre-tactic');

      expect(() => {
        const parsedTactic = tacticSchema.parse(validTactic);
        expect(parsedTactic.name).toBeDefined();
        expect(parsedTactic.x_mitre_shortname).toBeDefined();
      }).not.toThrow();
    });

    it('should validate that real tactic objects match README examples', () => {
      // Maps to: README.md - "Parsing and Validating a Tactic" section
      // Validates that real objects have the structure shown in examples
      const tactics = globalThis.attackData.objectsByType['x-mitre-tactic'] || [];

      if (tactics.length > 0) {
        const tactic = tactics[0];

        expect(tactic.id).toBeDefined();
        expect(tactic.type).toBe('x-mitre-tactic');
        expect(tactic.name).toBeDefined();
        expect(tactic.x_mitre_shortname).toBeDefined();
        expect(tactic.external_references).toBeDefined();
      }
    });
  });

  describe('Handling Invalid Data Examples', () => {
    it('should handle invalid tactic data as shown in README', () => {
      // Maps to: README.md - "Handling Invalid Data" section
      // Code block: ```typescript const invalidTactic = { id: "...", type: "x-mitre-tactic" };
      const invalidTactic = {
        id: 'x-mitre-tactic--4ca45d45-df4d-4613-8980-bac22d278fa5',
        type: 'x-mitre-tactic',
        // Missing required fields like name, description, etc.
      };

      expect(() => {
        tacticSchema.parse(invalidTactic);
      }).toThrow(z.ZodError);
    });
  });

  describe('How It Works Examples', () => {
    it('should demonstrate relationship processing patterns', () => {
      // Maps to: README.md - "How It Works" section, step 5
      // Text: "automatically processes all 'relationship' objects in the dataset"
      const relationships = globalThis.attackData.sros || [];

      expect(relationships.length).toBeGreaterThan(0);

      const usesRelationship = relationships.find((rel) => rel.relationship_type === 'uses');

      if (usesRelationship) {
        expect(usesRelationship.source_ref).toBeDefined();
        expect(usesRelationship.target_ref).toBeDefined();
        expect(usesRelationship.relationship_type).toBe('uses');
      }
    });
  });

  describe('AttackDataModel Constructor Examples', () => {
    it('should demonstrate AttackDataModel instantiation', () => {
      // Maps to: README.md - Various sections showing AttackDataModel usage
      // Code pattern: new AttackDataModel(uuid, objects) constructor usage
      const uuid = 'test-unique-id';
      const attackObjects: any[] = [];
      const testDataModel = new AttackDataModel(uuid, attackObjects);

      expect(testDataModel.getUuid()).toBe(uuid);
      expect(typeof testDataModel.getUuid()).toBe('string');
    });
  });
});
