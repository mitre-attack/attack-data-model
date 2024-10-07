import {
  Description,
  ExternalReferences,
  Name,
  ObjectMarkingRefs,
  StixCreatedByRef,
  StixCreatedTimestamp,
  StixModifiedTimestamp,
  StixSpecVersion,
  XMitreAttackSpecVersion,
  XMitreDomains,
  XMitreModifiedByRef,
  XMitreVersion,
} from "../../src/schemas/common";
import { Matrix, matrixSchema } from "../../src/schemas/sdo/matrix.schema";
import { v4 as uuidv4 } from "uuid";

describe("MatrixSchema", () => {
  let minimalMatrix: Matrix;

  beforeAll(() => {
    minimalMatrix = matrixSchema.parse({
      id: `x-mitre-matrix--${uuidv4()}`,
      type: "x-mitre-matrix",
      spec_version: "2.1" as StixSpecVersion,
      created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
      modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
      x_mitre_attack_spec_version: "2.1.0" as XMitreAttackSpecVersion,
      x_mitre_version: "1.0" as XMitreVersion,
      name: "Test Matrix" as Name,
      object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
      ] as ObjectMarkingRefs,
      x_mitre_domains: ["ics-attack"] as XMitreDomains,
      description:
        "The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base." as Description,
      created_by_ref:
        "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as StixCreatedByRef,
      external_references: [
        {
          source_name: "mitre-attack",
          external_id: "ics-attack",
          url: "https://attack.mitre.org/matrices/ics/",
        },
      ],
      x_mitre_modified_by_ref:
        "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5" as XMitreModifiedByRef,
      tactic_refs: [
        "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
        "x-mitre-tactic--93bf9a8e-b14c-4587-b6d5-9efc7c12eb45",
        "x-mitre-tactic--78f1d2ae-a579-44c4-8fc5-3e1775c73fac",
        "x-mitre-tactic--33752ae7-f875-4f43-bdb6-d8d02d341046",
        "x-mitre-tactic--ddf70682-f3ce-479c-a9a4-7eadf9bfead7",
        "x-mitre-tactic--696af733-728e-49d7-8261-75fdc590f453",
        "x-mitre-tactic--51c25a9e-8615-40c0-8afd-1da578847924",
        "x-mitre-tactic--b2a67b1e-913c-46f6-b219-048a90560bb9",
        "x-mitre-tactic--97c8ff73-bd14-4b6c-ac32-3d91d2c41e3f",
        "x-mitre-tactic--298fe907-7931-4fd2-8131-2814dd493134",
        "x-mitre-tactic--ff048b6c-b872-4218-b68c-3735ebd1f024",
        "x-mitre-tactic--77542f83-70d0-40c2-8a9d-ad2eb8b00279",
      ],
    });
  });

  describe("True Positives Tests", () => {
    it("should accept minimal valid object (only required fields)", () => {
      expect(() => matrixSchema.parse(minimalMatrix)).not.toThrow();
    });

    it("should accept fully populated valid object (required + optional fields)", () => {
      const matrixWithOptionalFields: Matrix = {
        ...minimalMatrix,
        x_mitre_deprecated: false,
        revoked: false,
      };

      expect(() => matrixSchema.parse(matrixWithOptionalFields)).not.toThrow();
    });
  });

  describe("True Negative Tests", () => {
    describe("type", () => {
      it("should reject invalid values", () => {
        const invalidType = {
          ...minimalMatrix,
          type: "invalid-type" as any,
        };
        expect(() => matrixSchema.parse(invalidType)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { type, ...matrixWithoutType } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutType)).toThrow();
      });
    });

    describe("id", () => {
      it("should reject invalid values", () => {
        const invalidId = {
          ...minimalMatrix,
          id: "invalid-id" as any,
        };
        expect(() => matrixSchema.parse(invalidId)).toThrow();

        const invalidMatrixId = {
          ...minimalMatrix,
          id: `attack-pattern--${uuidv4()}` as any,
        };
        expect(() => matrixSchema.parse(invalidMatrixId)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { id, ...matrixWithoutId } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutId)).toThrow();
      });
    });

    describe("spec_version", () => {
      it("should reject invalid values", () => {
        const invalidSpecVersion = {
          ...minimalMatrix,
          spec_version: "invalid-spec-version" as any,
        };
        expect(() => matrixSchema.parse(invalidSpecVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { spec_version, ...matrixWithoutSpecVersion } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutSpecVersion)).toThrow();
      });
    });

    describe("x_mitre_attack_spec_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreAttackSpecVersion = {
          ...minimalMatrix,
          x_mitre_attack_spec_version:
            "invalid-x_mitre_attack_spec_version" as any,
        };
        expect(() =>
          matrixSchema.parse(invalidXMitreAttackSpecVersion)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const {
          x_mitre_attack_spec_version,
          ...matrixWithoutXMitreAttackSpecVersion
        } = minimalMatrix;
        expect(() =>
          matrixSchema.parse(matrixWithoutXMitreAttackSpecVersion)
        ).toThrow();
      });
    });

    describe("name", () => {
      it("should reject invalid values", () => {
        const invalidName = {
          ...minimalMatrix,
          name: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidName)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { name, ...matrixWithoutName } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutName)).toThrow();
      });
    });

    describe("x_mitre_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreVersion = {
          ...minimalMatrix,
          x_mitre_version: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidXMitreVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_version, ...matrixWithoutXMitreVersion } =
          minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutXMitreVersion)).toThrow();
      });
    });

    describe("description", () => {
      it("should reject invalid values", () => {
        const invalidDescription = {
          ...minimalMatrix,
          description: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidDescription)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { description, ...matrixWithoutDescription } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutDescription)).toThrow();
      });
    });

    describe("created_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidCreatedByRef = {
          ...minimalMatrix,
          created_by_ref: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidCreatedByRef)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created_by_ref, ...matrixWithoutCreatedByRef } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutCreatedByRef)).toThrow();
      });
    });

    describe("created", () => {
      it("should reject invalid values", () => {
        const invalidCreated = {
          ...minimalMatrix,
          created: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidCreated)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created, ...matrixWithoutCreated } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutCreated)).toThrow();
      });
    });

    describe("modified", () => {
      it("should reject invalid values", () => {
        const invalidModified = {
          ...minimalMatrix,
          modified: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidModified)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { modified, ...matrixWithoutModified } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutModified)).toThrow();
      });
    });

    describe("object_marking_refs", () => {
      it("should reject invalid values", () => {
        const invalidObjectMarkingRefs = {
          ...minimalMatrix,
          object_marking_refs: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidObjectMarkingRefs)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { object_marking_refs, ...matrixWithoutObjectMarkingRefs } =
          minimalMatrix;
        expect(() =>
          matrixSchema.parse(matrixWithoutObjectMarkingRefs)
        ).toThrow();
      });
    });

    describe("x_mitre_domains", () => {
      it("should reject invalid values", () => {
        const invalidXMitreDomains = {
          ...minimalMatrix,
          x_mitre_domains: ["invalid-domain"] as any,
        };
        expect(() => matrixSchema.parse(invalidXMitreDomains)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_domains, ...matrixWithoutXMitreDomains } =
          minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutXMitreDomains)).toThrow();
      });
    });

    describe("external_references", () => {
      it("should reject invalid values", () => {
        const invalidExternalReferences = {
          ...minimalMatrix,
          external_references: "not-an-array" as unknown as ExternalReferences,
        };
        expect(() => matrixSchema.parse(invalidExternalReferences)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { external_references, ...matrixWithoutExternalReferences } =
          minimalMatrix;
        expect(() =>
          matrixSchema.parse(matrixWithoutExternalReferences)
        ).toThrow();
      });
    });

    describe("x_mitre_modified_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidXMitreModifiedByRef = {
          ...minimalMatrix,
          x_mitre_modified_by_ref: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidXMitreModifiedByRef)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_modified_by_ref, ...matrixWithoutXMitreModifiedByRef } =
          minimalMatrix;
        expect(() =>
          matrixSchema.parse(matrixWithoutXMitreModifiedByRef)
        ).toThrow();
      });
    });

    describe("x_mitre_deprecated", () => {
      it("should reject invalid values", () => {
        const invalidXMitreDeprecated = {
          ...minimalMatrix,
          x_mitre_deprecated: "not a boolean" as any,
        };
        expect(() => matrixSchema.parse(invalidXMitreDeprecated)).toThrow();
      });
    });

    describe("revoked", () => {
      it("should reject invalid values", () => {
        const invalidRevoked = {
          ...minimalMatrix,
          revoked: "not a boolean" as any,
        };
        expect(() => matrixSchema.parse(invalidRevoked)).toThrow();
      });
    });

    describe("tactic_refs", () => {
      it("should reject invalid values", () => {
        const invalidTacticRefs = {
          ...minimalMatrix,
          tactic_refs: 123 as any,
        };
        expect(() => matrixSchema.parse(invalidTacticRefs)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { tactic_refs, ...matrixWithoutTacticRefs } = minimalMatrix;
        expect(() => matrixSchema.parse(matrixWithoutTacticRefs)).toThrow();
      });
    });

    describe("Schema-Level Tests", () => {
      it("should reject unknown properties", () => {
        const matrixWithUnknownProp: Matrix = {
          ...minimalMatrix,
          unknownProp: "test",
        } as Matrix;
        expect(() => matrixSchema.parse(matrixWithUnknownProp)).toThrow();
      });
    });
  });

  describe("Edge Cases and Special Scenarios", () => {
    it("should handle special case X", () => {
      // Test any schema-specific special cases
    });
  });
});
