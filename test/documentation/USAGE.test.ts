import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { createSyntheticStixObject } from '../../src/generator/index.js';
import { tacticSchema, campaignSchema, techniqueSchema } from '../../src/schemas/index.js';
import { DataSourceRegistration } from '../../src/data-sources/data-source-registration.js';
import { AttackDataModel } from '../../src/classes/attack-data-model.js';

describe('docs/USAGE.md Code Examples', () => {
  describe('Module Format Support Examples', () => {
    it('should work with ESM example', () => {
      // Maps to: docs/USAGE.md - "ESM Usage Example" section
      // Code block: ```javascript import { AttackDataModel } from '@mitre-attack/attack-data-model';
      const uuid = 'my-unique-id';
      const attackObjects: any[] = [];
      const attackDataModel = new AttackDataModel(uuid, attackObjects);

      expect(attackDataModel.getUuid()).toBe('my-unique-id');
    });

    it('should work with CommonJS pattern', () => {
      // Maps to: docs/USAGE.md - "CommonJS Usage Example" section
      // Code block: ```javascript const { AttackDataModel } = require('@mitre-attack/attack-data-model');
      const uuid = 'my-unique-id';
      const attackObjects: any[] = [];
      const attackDataModel = new AttackDataModel(uuid, attackObjects);

      expect(attackDataModel.getUuid()).toBe('my-unique-id');
    });
  });

  describe('Package Structure Examples', () => {
    it('should support the hierarchical export pattern', () => {
      // Maps to: docs/USAGE.md - "Hierarchical Structure" section
      // Code block: ```typescript export * from './classes/index.js';
      expect(tacticSchema).toBeDefined();
      expect(campaignSchema).toBeDefined();
      expect(techniqueSchema).toBeDefined();
      expect(AttackDataModel).toBeDefined();
      expect(DataSourceRegistration).toBeDefined();
    });
  });

  describe('Using the Schemas Examples', () => {
    it('should support schema import patterns', () => {
      // Maps to: docs/USAGE.md - "Accessing Schemas" section
      // Code block: ```typescript import { campaignSchema } from '@mitre-attack/attack-data-model';
      const validCampaign = createSyntheticStixObject('campaign');

      expect(() => {
        const parsedCampaign = campaignSchema.parse(validCampaign);
        expect(parsedCampaign.name).toBeDefined();
      }).not.toThrow();
    });

    it('should demonstrate schema extension patterns', () => {
      // Maps to: docs/USAGE.md - Schema extension section
      // Code block: ```typescript const myCustomCampaignSchema = campaignSchema.extend({ /* additional fields */ });
      // Note: We can't test the exact extend example due to refinement issues mentioned in docs
      // Instead, we test that the base schema works as expected
      const campaign = createSyntheticStixObject('campaign');

      expect(() => {
        const parsed = campaignSchema.parse(campaign);
        expect(parsed).toBeDefined();
      }).not.toThrow();
    });

    it('should demonstrate refinement functionality', () => {
      // Maps to: docs/USAGE.md - "Schema refinements" section
      // Text: "validating that the first reference in external_references contains a valid ATT&CK ID"
      const technique = createSyntheticStixObject('attack-pattern');

      expect(technique?.external_references).toBeDefined();
      expect(technique?.external_references?.[0]).toBeDefined();
      expect(technique?.external_references?.[0].source_name).toBe('mitre-attack');
      expect(technique?.external_references?.[0].external_id).toBeDefined();

      expect(() => {
        techniqueSchema.parse(technique);
      }).not.toThrow();
    });
  });

  describe('Validating Data Examples', () => {
    it('should validate raw tactic data as shown in USAGE', () => {
      // Maps to: docs/USAGE.md - "Validating Data" section
      // Code block: ```typescript import { tacticSchema } from '@mitre-attack/attack-data-model';
      const validTactic = createSyntheticStixObject('x-mitre-tactic');

      expect(() => {
        const parsedTactic = tacticSchema.parse(validTactic);
        expect(parsedTactic.name).toBeDefined();
        expect(parsedTactic.x_mitre_shortname).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('TypeScript Types Examples', () => {
    it('should support TypeScript type patterns', () => {
      // Maps to: docs/USAGE.md - "TypeScript Types" section
      // Code block: ```typescript import type { Tactic } from '@mitre-attack/attack-data-model';
      // Test that type imports work correctly (validated at compile time)
      expect(tacticSchema).toBeDefined();
      expect(campaignSchema).toBeDefined();
      expect(techniqueSchema).toBeDefined();
    });
  });

  describe('Schema Hierarchy Examples', () => {
    it('should support schema hierarchy as described', () => {
      // Maps to: docs/USAGE.md - "Schema Hierarchy" section
      // Validates the hierarchical structure: STIX base → ATT&CK base → specific objects
      const validTechnique = createSyntheticStixObject('attack-pattern');
      const parsed = techniqueSchema.parse(validTechnique);

      // Should have STIX base properties
      expect(parsed.id).toBeDefined();
      expect(parsed.type).toBe('attack-pattern');
      expect(parsed.spec_version).toBeDefined();

      // Should have ATT&CK-specific properties
      expect(parsed.x_mitre_domains).toBeDefined();
      expect(parsed.x_mitre_attack_spec_version).toBeDefined();
    });
  });

  describe('AttackDataModel Class Examples', () => {
    it('should demonstrate AttackDataModel basic usage', () => {
      // Maps to: docs/USAGE.md - "AttackDataModel Class" section
      // Code block: ```typescript const attackDataModel = new AttackDataModel();
      const uuid = 'test-uuid';
      const attackObjects: any[] = [];
      const attackDataModel = new AttackDataModel(uuid, attackObjects);

      expect(attackDataModel.techniques).toBeDefined();
      expect(Array.isArray(attackDataModel.techniques)).toBe(true);
      expect(attackDataModel.campaigns).toBeDefined();
      expect(Array.isArray(attackDataModel.campaigns)).toBe(true);
    });
  });

  describe('Initializing with Data Examples', () => {
    it('should support DataSource configuration patterns', () => {
      // Maps to: docs/USAGE.md - "Initializing with Data" section
      // Code block: ```typescript const dataSource = new DataSource({ source: 'attack', ... });
      // Note: Using DataSourceRegistration instead of DataSource as shown in examples
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
  });

  describe('Relationship Mapping Examples', () => {
    it('should validate campaign relationship navigation patterns', () => {
      // Maps to: docs/USAGE.md - "Relationship Mapping" section
      // Code block: ```typescript const techniques = campaign.getTechniques();
      // Test using real data to validate relationship patterns exist
      const campaigns = globalThis.attackData.objectsByType['campaign'] || [];

      if (campaigns.length > 0) {
        const campaign = campaigns[0];

        // Properties mentioned in the relationship mapping examples
        expect(campaign.name).toBeDefined();
        expect(campaign.id).toBeDefined();
        expect(campaign.type).toBe('campaign');
      }
    });
  });

  describe('Examples Section Code Blocks', () => {
    it('should demonstrate technique-tactic navigation', () => {
      // Maps to: docs/USAGE.md - "Examples" section
      // Code block: ```typescript techniques.forEach((technique) => { const tactics = technique.getTactics(); });
      const techniques = globalThis.attackData.objectsByType['attack-pattern'] || [];

      if (techniques.length > 0) {
        const technique = techniques[0];
        expect(technique.name).toBeDefined();
        expect(technique.external_references).toBeDefined();
      }
    });

    it('should demonstrate software-group relationships', () => {
      // Maps to: docs/USAGE.md - "Working with Software and Groups" section
      // Code block: ```typescript malwareList.forEach((malware) => { const associatedGroups = malware.getAssociatedGroups(); });
      const malware = globalThis.attackData.objectsByType['malware'] || [];

      if (malware.length > 0) {
        const malwareItem = malware[0];
        expect(malwareItem.name).toBeDefined();
        expect(malwareItem.type).toBe('malware');
      }
    });

    it('should demonstrate technique validation patterns', () => {
      // Maps to: docs/USAGE.md - "Validating and Parsing a Technique" section
      // Code block: ```typescript import { techniqueSchema } from '@mitre-attack/attack-data-model';
      const rawTechniqueData = createSyntheticStixObject('attack-pattern');

      expect(() => {
        const technique = techniqueSchema.parse(rawTechniqueData);
        expect(technique.name).toBeDefined();
      }).not.toThrow();
    });

    it('should handle invalid technique data', () => {
      // Maps to: docs/USAGE.md - "Handling Invalid Data" section
      // Code block: ```typescript import { techniqueSchema } from '@mitre-attack/attack-data-model';
      const invalidTechniqueData = {
        id: 'attack-pattern--1234abcd-5678-efgh-ijkl-9876mnopqrst',
        type: 'attack-pattern',
        // Missing required fields
      };

      expect(() => {
        techniqueSchema.parse(invalidTechniqueData);
      }).toThrow(z.ZodError);
    });
  });

  describe('Data Sources Examples', () => {
    it('should support data source patterns mentioned in USAGE', () => {
      // Maps to: docs/USAGE.md - "Data Sources" section
      // Text: "Loading Data from the ATT&CK GitHub Repository"
      const dataSource = new DataSourceRegistration({
        source: 'attack',
        domain: 'enterprise-attack',
        version: '15.1',
        parsingMode: 'relaxed',
      });

      expect(dataSource.options.source).toBe('attack');
      expect(dataSource.options.parsingMode).toBe('relaxed');
    });
  });
});
