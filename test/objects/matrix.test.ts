import {
  Description,
  StixCreatedTimestamp,
  StixModifiedTimestamp,
} from "../../src/schemas/common";
import { Matrix, matrixSchema } from "../../src/schemas/sdo/matrix.schema";
import { v4 as uuidv4 } from "uuid";

describe("MatrixSchema", () => {
  let minimalMatrix: Matrix;
  let invalidMatrix: Matrix;

  beforeEach(() => {
    minimalMatrix = {
      id: `x-mitre-matrix--${uuidv4()}`,
      type: "x-mitre-matrix",
      spec_version: "2.1",
      created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
      modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
      x_mitre_attack_spec_version: "2.1.0",
      x_mitre_version: "1.0",
      name: "Test Matrix",
      object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
      ],
      x_mitre_domains: ["ics-attack"],
      description:
        "The full ATT&CK for ICS Matrix includes techniques spanning various ICS assets and can be used to navigate through the knowledge base." as Description,
      created_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      external_references: [
        {
          source_name: "mitre-attack",
          external_id: "ics-attack",
          url: "https://attack.mitre.org/matrices/ics/",
        },
      ],
      x_mitre_modified_by_ref: "identity--c78cb6e5-0c4b-4611-8297-d1b8b55e40b5",
      tactic_refs: [
        "x-mitre-tactic--69da72d2-f550-41c5-ab9e-e8255707f28a",
      ],
    };
  });

  describe("Valid Inputs", () => {
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

  describe("Field-Specific Tests", () => {

    describe("type", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, type: "invalid-type" as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { type, ...matrixWithoutType } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutType)).toThrow();
      });
    });

    describe("id", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, id: "invalid-id" as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { id, ...matrixWithoutId } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutId)).toThrow();
      });
    });

    describe("spec_version", () => {
      beforeEach(() => {
        invalidMatrix = {
          ...minimalMatrix,
          spec_version: "invalid-spec-version" as any,
        };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { spec_version, ...matrixWithoutSpecVersion } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutSpecVersion)).toThrow();
      });
    });

    describe("x_mitre_attack_spec_version", () => {
      beforeEach(() => {
        invalidMatrix = {
          ...minimalMatrix,
          x_mitre_attack_spec_version: "invalid-version" as any,
        };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { x_mitre_attack_spec_version, ...matrixWithoutVersion } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutVersion)).toThrow();
      });
    });

    describe("name", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, name: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { name, ...matrixWithoutName } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutName)).toThrow();
      });
    });

    describe("x_mitre_version", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, x_mitre_version: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { x_mitre_version, ...matrixWithoutVersion } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutVersion)).toThrow();
      });
    });

    describe("description", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, description: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { description, ...matrixWithoutDescription } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutDescription)).toThrow();
      });
    });

    describe("created_by_ref", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, created_by_ref: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { created_by_ref, ...matrixWithoutCreatedByRef } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutCreatedByRef)).toThrow();
      });
    });

    describe("created", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, created: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { created, ...matrixWithoutCreated } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutCreated)).toThrow();
      });
    });

    describe("modified", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, modified: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { modified, ...matrixWithoutModified } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutModified)).toThrow();
      });
    });

    describe("object_marking_refs", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, object_marking_refs: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { object_marking_refs, ...matrixWithoutMarkingRefs } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutMarkingRefs)).toThrow();
      });
    });

    describe("x_mitre_domains", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, x_mitre_domains: ["invalid-domain"] as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { x_mitre_domains, ...matrixWithoutDomains } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutDomains)).toThrow();
      });
    });

    describe("external_references", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, external_references: "not-an-array" as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { external_references, ...matrixWithoutExternalReferences } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutExternalReferences)).toThrow();
      });
    });

    describe("x_mitre_modified_by_ref", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, x_mitre_modified_by_ref: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { x_mitre_modified_by_ref, ...matrixWithoutModifiedByRef } = invalidMatrix;
        expect(() => matrixSchema.parse(matrixWithoutModifiedByRef)).toThrow();
      });
    });

    describe("x_mitre_deprecated", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, x_mitre_deprecated: "not a boolean" as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });
    });

    describe("revoked", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, revoked: "not a boolean" as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });
    });

    describe("tactic_refs", () => {
      beforeEach(() => {
        invalidMatrix = { ...minimalMatrix, tactic_refs: 123 as any };
      });

      it("should reject invalid values", () => {
        expect(() => matrixSchema.parse(invalidMatrix)).toThrow();
      });

      it("should reject omittance of required values", () => {
        const { tactic_refs, ...matrixWithoutTacticRefs } = invalidMatrix;
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
});
