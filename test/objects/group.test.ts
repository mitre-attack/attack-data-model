import type {
  Description,
  StixCreatedTimestamp,
  StixModifiedTimestamp,
} from "../../src/schemas/common/index.js";
import { type Group, groupSchema } from "../../src/schemas/sdo/group.schema.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Test suite for validating the Group schema.
 */
describe("GroupSchema", () => {
  let minimalGroup: Group;
  let invalidGroup: Group;

  beforeEach(() => {
    minimalGroup = {
      id: `intrusion-set--${uuidv4()}`,
      type: "intrusion-set",
      spec_version: "2.1",
      x_mitre_attack_spec_version: "2.1.0",
      name: "Test Name",
      x_mitre_version: "1.0",
      created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
      modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
      x_mitre_domains: ["enterprise-attack"],
      external_references: [
        {
          source_name: "mitre-attack",
          external_id: "G1000",
          url: "https://attack.mitre.org/groups/G1000",
        },
        {
          source_name: "Dragos",
          url: "https://dragos.com/resource/allanite/",
          description: "Dragos Allanite Retrieved. 2019/10/27",
        },
      ],
    };
  });

  /**
   * Section for valid input tests
   */
  describe("Valid Inputs", () => {
    it("should accept minimal valid object (only required fields)", () => {
      expect(() => groupSchema.parse(minimalGroup)).not.toThrow();
    });

    it("should accept fully populated valid object (required + optional fields)", () => {
      const groupWithOptionalFields: Group = {
        ...minimalGroup,
        description: "This is a test group." as Description,
        created_by_ref: `identity--${uuidv4()}`,
        object_marking_refs: [`marking-definition--${uuidv4()}`],
        x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
        x_mitre_contributors: ["Contributor 1", "Contributor 2"],
        x_mitre_deprecated: false,
        revoked: false,
        aliases: ["Test Name"],
      };
      expect(() => groupSchema.parse(groupWithOptionalFields)).not.toThrow();
    });
  });

  /**
   * Section for field-specific tests
   */
  describe("Field-Specific Tests", () => {
    const testField = (
      fieldName: keyof Group,
      invalidValue: any,
      isRequired = true  // Add a flag for required fields
    ) => {
      it(`should reject invalid values for ${fieldName}`, () => {
        const invalidObject = { ...minimalGroup, [fieldName]: invalidValue };
        expect(() => groupSchema.parse(invalidObject)).toThrow();
      });

      if (isRequired) {
        it(`should reject omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalGroup;
          expect(() => groupSchema.parse(objectWithoutField)).toThrow();
        });
      } else {
        it(`should accept omission of ${fieldName}`, () => {
          const { [fieldName]: omitted, ...objectWithoutField } = minimalGroup;
          expect(() => groupSchema.parse(objectWithoutField)).not.toThrow();
        });
      }
    };

    describe("type", () => {
      testField("type", "invalid-type");
    });

    describe("id", () => {
      testField("id", "invalid-id");
    });

    describe("spec_version", () => {
      testField("spec_version", "invalid-spec-version");
    });

    describe("x_mitre_attack_spec_version", () => {
      testField("x_mitre_attack_spec_version", "invalid-version");
    });

    describe("name", () => {
      testField("name", 123);
    });

    describe("x_mitre_version", () => {
      testField("x_mitre_version", 123);
    });

    describe("created", () => {
      testField("created", 123);
    });

    describe("modified", () => {
      testField("modified", 123);
    });

    describe("x_mitre_domains", () => {
      testField("x_mitre_domains", "invalid-domain");
    });

    describe("external_references", () => {
      testField("external_references", "not-an-array" as unknown);
    });

    // Optional Fields:
    describe("description", () => {
      testField("description", 123, false);  // false indicates it's optional
    });

    describe("x_mitre_contributors", () => {
      testField("x_mitre_contributors", 123, false);
    });

    describe("x_mitre_modified_by_ref", () => {
      testField("x_mitre_modified_by_ref", 123, false);
    });

    describe("aliases", () => {
      testField("aliases", "not an array", false);
    });

    describe("x_mitre_deprecated", () => {
      testField("x_mitre_deprecated", "not a boolean", false);
    });

    describe("revoked", () => {
      testField("revoked", "not a boolean", false);
    });
  });

  /**
   * Section for schema-level tests
   */
  describe("Schema-Level Tests", () => {
    it("should reject unknown properties", () => {
      const groupWithUnknownProp: Group = {
        ...minimalGroup,
        unknownProp: "unexpected value",
      } as Group;
      expect(() => groupSchema.parse(groupWithUnknownProp)).toThrow();
    });
  });

  /**
   * Section for edge cases and special scenarios
   */
  describe("Edge Cases and Special Scenarios", () => {
    it("should handle case where group name is not the first listed alias", () => {
      const groupWithInvalidAlias = {
        ...minimalGroup,
        aliases: ["Not alias name"],
      } as Group;
      expect(() => groupSchema.parse(groupWithInvalidAlias)).toThrow();
    });
  });
});
