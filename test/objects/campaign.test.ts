import { describe, expect, it } from 'vitest';
import { createSyntheticStixObject } from '../../src/generator';
import type {
    StixTimestamp
} from '../../src/schemas/common/index';
import { type Campaign, campaignSchema } from '../../src/schemas/sdo/campaign.schema';

/**
 * Test suite for validating the Campaign schema.
 */
describe('campaignSchema', () => {
  const minimalCampaign = createSyntheticStixObject('campaign');

  /**
   * Section for valid input tests
   */
  describe('Valid Inputs', () => {
    it('should accept minimal valid object (only required fields)', () => {
      expect(() => campaignSchema.parse(minimalCampaign)).not.toThrow();
    });

    it('should accept fully populated valid object (required + optional ATT&CK fields)', () => {
      const fullCampaign: Campaign = {
        ...minimalCampaign,
        x_mitre_contributors: ['John Doe', 'Jane Smith'],
      };
      expect(() => campaignSchema.parse(fullCampaign)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe('Field-Specific Tests', () => {
    const testField = (
      fieldName: keyof Campaign,
      invalidValue: any,
      isRequired = true, // Flag indicating whether the field is required
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidCampaign = { ...minimalCampaign, [fieldName]: invalidValue };
        expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...campaignWithoutField } = minimalCampaign;
          expect(() => campaignSchema.parse(campaignWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...campaignWithoutField } = minimalCampaign;
          expect(() => campaignSchema.parse(campaignWithoutField)).not.toThrow();
        });
      }
    };

    // Required Fields
    describe('id', () => {
      testField('id', 'invalid-id');
    });

    describe('type', () => {
      testField('type', 'invalid-type');
    });

    describe('description', () => {
      testField('description', 123); // Now marked as required
    });

    describe('external_references', () => {
      testField('external_references', 'not-an-array');
    });

    describe('created_by_ref', () => {
      testField('created_by_ref', 'invalid-created-by-ref');
    });

    describe('object_marking_refs', () => {
      testField('object_marking_refs', ['invalid-object-marking-refs']);
    });

    describe('x_mitre_domains', () => {
      testField('x_mitre_domains', ['invalid-mitre-domains']);
    });

    describe('x_mitre_modified_by_ref', () => {
      testField('x_mitre_modified_by_ref', 'invalid-modified-by-ref');
    });

    describe('aliases', () => {
      testField('aliases', 'not-an-array');
    });

    describe('first_seen', () => {
      testField('first_seen', '2017-05-31' as StixTimestamp);
    });

    describe('last_seen', () => {
      testField('last_seen', '2017-05-31' as StixTimestamp);
    });

    describe('x_mitre_first_seen_citation', () => {
      testField('x_mitre_first_seen_citation', 'invalid-citation');
    });

    describe('x_mitre_last_seen_citation', () => {
      testField('x_mitre_last_seen_citation', 'invalid-citation');
    });

    describe('revoked', () => {
      testField('revoked', 'not-a-boolean');
    });

    describe('x_mitre_deprecated', () => {
      testField('x_mitre_deprecated', 'not-a-boolean', false);
    });

    // Optional Fields
    describe('x_mitre_contributors', () => {
      testField('x_mitre_contributors', 'not-an-array', false); // Optional field
    });
  });

  /**
   * Section for schema-level tests
   */
  describe('Schema-Level Tests', () => {
    it('should reject unknown properties', () => {
      const invalidCampaign: Campaign = {
        ...minimalCampaign,
        unknown_property: true,
      } as Campaign;
      expect(() => campaignSchema.parse(invalidCampaign)).toThrow();
    });
  });

  describe('Schema Refinements', () => {
    it('should reject when first alias does not match object name', () => {
      const invalidCampaign = {
        ...minimalCampaign,
        aliases: ['Operation Interception'],
      };
      expect(() => campaignSchema.parse(invalidCampaign)).toThrow(
        "The first alias must match the object's name",
      );
    });

    it('should reject if citation not found in external references', () => {
      const invalidCampaign = {
        ...minimalCampaign,
        x_mitre_first_seen_citation: '(Citation: Not in External Reference)',
      };
      expect(() => campaignSchema.parse(invalidCampaign)).toThrow(
        'Citation Not in External Reference not found in external_references.',
      );
    });

    it('should reject invalid citation format', () => {
      const invalidCampaign = {
        ...minimalCampaign,
        x_mitre_first_seen_citation: '(Citation: Name1), (Citation: Name2)',
      };
      expect(() => campaignSchema.parse(invalidCampaign)).toThrow(
        "Must be one or more citations in the form '(Citation: [citation name])' without any separators",
      );
    });
  });
});
