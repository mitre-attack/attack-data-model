import { beforeEach, describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/utils/index';
import { type Tool, toolSchema } from '../../src/schemas/sdo/tool.schema';

/**
 * Test suite for validating the Tool schema.
 */
describe('ToolSchema', () => {
  const minimalTool = createSyntheticStixObject('tool');

  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => toolSchema.parse(minimalTool)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const objectWithOptionalFields = {
        ...minimalTool,
        x_mitre_platforms: ['Windows'],
        x_mitre_contributors: ['Contributor'],
        x_mitre_aliases: ['Sliver'],
        x_mitre_deprecated: false,
      };
      expect(() => toolSchema.parse(objectWithOptionalFields)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional STIX fields)', () => {
      const objectWithStixOptionalFields = {
        ...minimalTool,
        kill_chain_phases: [
          {
            kill_chain_name: 'mitre-attack',
            phase_name: 'privilege-escalation',
          },
        ],
        aliases: ['Sliver'],
        tool_types: ['remote-access'],
        tool_version: '1.0',
      };
      expect(() => toolSchema.parse(objectWithStixOptionalFields)).not.toThrow();
    });
  });

  /**
   * Field-Specific Tests for validating individual fields
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof Tool,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalTool, [fieldName]: invalidValue };
        expect(() => toolSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalTool;
          expect(() => toolSchema.parse(objectWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalTool;
          expect(() => toolSchema.parse(objectWithoutField)).not.toThrow();
        });
      }
    };

    // Testing required fields
    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', 'invalid-domain');
    });

    describe('description', () => {
      testField('description', 123);
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 'invalid-id');
    });

    // Testing optional fields
    describe('tool_types', () => {
      testField('tool_types', ['invalid-type'], false);
    });

    describe('kill_chain_phases', () => {
      testField('kill_chain_phases', [{ invalid: 'object' }], false);
    });

    describe('tool_version', () => {
      testField('tool_version', 123, false);
    });

    describe('aliases', () => {
      testField('aliases', 'not-an-array', false);
    });

    describe('x_mitre_platforms', () => {
      testField('x_mitre_platforms', ['invalid-platform'], false);
    });

    describe('x_mitre_contributors', () => {
      testField('x_mitre_contributors', 'not-an-array', false);
    });

    describe('x_mitre_aliases', () => {
      testField('x_mitre_aliases', 'not-an-array', false);
    });

    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });

    describe('revoked', () => {
      testField('revoked', 'not-a-boolean', false);
    });
  });

  /**
   * Section for schema refinements
   */
  describe('Schema Refinements', () => {
    let validTool: Tool;

    beforeEach(() => {
      validTool = {
        ...minimalTool,
        x_mitre_domains: ['enterprise-attack'],
        external_references: [
          {
            source_name: 'mitre-attack',
            external_id: 'S0049',
          },
        ],
      };
    });

    describe('External References Validation', () => {
      it('should reject when ATT&CK ID is missing', () => {
        const invalidTool = {
          ...validTool,
          external_references: [{ source_name: 'mitre-attack' }],
        };
        expect(() => toolSchema.parse(invalidTool)).toThrow(/ATT&CK ID must be defined/);
      });

      it('should reject invalid ATT&CK ID format', () => {
        const invalidTool = {
          ...validTool,
          external_references: [{ source_name: 'mitre-attack', external_id: 'S123' }],
        };
        expect(() => toolSchema.parse(invalidTool)).toThrow(
          /must match the ATT&CK ID format S####/,
        );
      });
    });

    describe('x_mitre_aliases Validation', () => {
      it('should reject when first alias does not match object name', () => {
        const invalidTool = {
          ...validTool,
          x_mitre_aliases: ['Not-Sliver'],
        };
        expect(() => toolSchema.parse(invalidTool)).toThrow(
          /The first alias must match the object's name/,
        );
      });
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const objectWithUnknownProp = {
        ...minimalTool,
        unknown_property: 'unexpected value',
      };
      expect(() => toolSchema.parse(objectWithUnknownProp)).toThrow();
    });
  });
});
