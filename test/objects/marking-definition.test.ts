import {
  Name,
  StixCreatedTimestamp,
  StixSpecVersion,
  XMitreAttackSpecVersion,
  XMitreDomains,
} from "../../src/schemas/common";
import {
  MarkingDefinition,
  markingDefinitionSchema,
} from "../../src/schemas/smo/marking-definition.schema";
import { v4 as uuidv4 } from "uuid";

describe("MarkingDefinitionSchema", () => {
  let markingDefinitions: any[];
  let minimalMarkingDefinition: MarkingDefinition;

  beforeAll(() => {
    markingDefinitions = global.attackData.objectsByType["marking-definition"];

    minimalMarkingDefinition = markingDefinitionSchema.parse({
      type: "marking-definition",
      id: `marking-definition--${uuidv4()}`,
      spec_version: "2.1" as StixSpecVersion,
      x_mitre_attack_spec_version: "2.1.0" as XMitreAttackSpecVersion,
      created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
      created_by_ref: `identity--${uuidv4()}`,
      x_mitre_domains: ["enterprise-attack"] as XMitreDomains,
      definition_type: "statement",
      definition: {
        statement: "Test statement",
      },
    });
  });

  describe("True Positives Tests", () => {
    it("should accept minimal valid object (only required fields)", () => {
      expect(() =>
        markingDefinitionSchema.parse(minimalMarkingDefinition)
      ).not.toThrow();
    });

    it("should accept fully populated valid object (required + optional fields)", () => {
      const markingDefinitionWithOptionalFields: MarkingDefinition = {
        ...minimalMarkingDefinition,
        //   "external_references": "Optional",
        //   "object_marking_refs": "Optional",
        //   "granular_markings": "Optional"
        //   "name": "Optional"
        name: "Test Marking Definition" as Name,
      };

      expect(() =>
        markingDefinitionSchema.parse(markingDefinitionWithOptionalFields)
      ).not.toThrow();
    });

    // Add more valid input tests...
  });

  describe("True Negative Tests", () => {
    describe("type", () => {
      it("should reject invalid values", () => {
        const invalidType = {
          ...minimalMarkingDefinition,
          type: "invalid-type" as any,
        };
        expect(() => markingDefinitionSchema.parse(invalidType)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { type, ...markingDefinitionWithoutType } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutType)
        ).toThrow();
      });
    });

    describe("id", () => {
      it("should reject invalid values", () => {
        const invalidId = {
          ...minimalMarkingDefinition,
          id: "invalid-id" as any,
        };
        expect(() => markingDefinitionSchema.parse(invalidId)).toThrow();

        const invalidMarkingDefinitionId = {
          ...minimalMarkingDefinition,
          id: `attack-pattern--${uuidv4()}` as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidMarkingDefinitionId)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { id, ...markingDefinitionWithoutId } = minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutId)
        ).toThrow();
      });
    });

    describe("spec_version", () => {
      it("should reject invalid values", () => {
        const invalidSpecVersion = {
          ...minimalMarkingDefinition,
          spec_version: "invalid-spec-version" as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidSpecVersion)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { spec_version, ...markingDefinitionWithoutSpecVersion } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutSpecVersion)
        ).toThrow();
      });
    });

    describe("x_mitre_attack_spec_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreAttackSpecVersion = {
          ...minimalMarkingDefinition,
          x_mitre_attack_spec_version:
            "invalid-x_mitre_attack_spec_version" as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidXMitreAttackSpecVersion)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const {
          x_mitre_attack_spec_version,
          ...markingDefinitionWithoutXMitreAttackSpecVersion
        } = minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(
            markingDefinitionWithoutXMitreAttackSpecVersion
          )
        ).toThrow();
      });
    });

    describe("created", () => {
      it("should reject invalid values", () => {
        const invalidCreated: MarkingDefinition = {
          ...minimalMarkingDefinition,
          created: 123 as any,
        };
        expect(() => markingDefinitionSchema.parse(invalidCreated)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created, ...markingDefinitionWithoutCreated } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutCreated)
        ).toThrow();
      });
    });

    describe("x_mitre_domains", () => {
      it("should reject invalid values", () => {
        const invalidMarkingDefinition: MarkingDefinition = {
          ...minimalMarkingDefinition,
          x_mitre_domains: "not an array" as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidMarkingDefinition)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_domains, ...markingDefinitionWithoutDomains } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutDomains)
        ).toThrow();
      });
    });

    describe("definition_type", () => {
      it("should reject invalid values", () => {
        const invalidDefinitionType: MarkingDefinition = {
          ...minimalMarkingDefinition,
          definition_type: 123 as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidDefinitionType)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { definition_type, ...markingDefinitionWithoutDefinitionType } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutDefinitionType)
        ).toThrow();
      });
    });

    describe("definition", () => {
      it("should reject invalid values", () => {
        const invalidDefinition: MarkingDefinition = {
          ...minimalMarkingDefinition,
          definition: 123 as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidDefinition)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { definition, ...markingDefinitionWithoutDefinition } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutDefinition)
        ).toThrow();
      });
    });

    describe("created_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidCreatedByRef = {
          ...minimalMarkingDefinition,
          created_by_ref: 123 as any,
        };
        expect(() =>
          markingDefinitionSchema.parse(invalidCreatedByRef)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created_by_ref, ...markingDefinitionWithoutCreatedByRef } =
          minimalMarkingDefinition;
        expect(() =>
          markingDefinitionSchema.parse(markingDefinitionWithoutCreatedByRef)
        ).toThrow();
      });
    });

    describe("name", () => {
      it("should reject invalid values", () => {
        const invalidName = {
          ...minimalMarkingDefinition,
          name: 123 as any,
        };
        expect(() => markingDefinitionSchema.parse(invalidName)).toThrow();
      });
    });

    describe("Schema-Level Tests", () => {
      it("should reject unknown properties", () => {});
      const markingDefinitionWithUnknownProp: MarkingDefinition = {
        ...minimalMarkingDefinition,
        unknownProp: "test",
      } as MarkingDefinition;
      expect(() =>
        markingDefinitionSchema.parse(markingDefinitionWithUnknownProp)
      ).toThrow();
    });
  });

  describe("Edge Cases and Special Scenarios", () => {
    it("should handle special case X", () => {
      // Test any schema-specific special cases
    });

    // Add more edge case tests as needed...
  });

  describe("Validate All Objects", () => {
    it("should validate all objects in the global.attackData", () => {
      markingDefinitions.forEach((markingDefinition, index) => {
        expect(() =>
          markingDefinitionSchema.parse(markingDefinition)
        ).not.toThrow();
      });
    });
  });
});
