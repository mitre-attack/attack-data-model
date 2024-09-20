import {
  Description,
  ExternalReferences,
  Name,
  ObjectMarkingRefs,
  StixCreatedTimestamp,
  StixModifiedTimestamp,
  StixSpecVersion,
  XMitreAttackSpecVersion,
  XMitreDomains,
  xMitreIdentity,
  XMitreModifiedByRef,
  XMitreOldAttackId,
  XMitreVersion,
} from "../../src/schemas/common";
import {
  Mitigation,
  mitigationSchema,
} from "../../src/schemas/sdo/mitigation.schema";
import { v4 as uuidv4 } from "uuid";

describe("MitigationSchema", () => {
  let mitigations: any[];
  let minimalMitigation: Mitigation;

  beforeAll(() => {
    mitigations = global.attackData.objectsByType["course-of-action"];

    minimalMitigation = mitigationSchema.parse({
      id: `course-of-action--${uuidv4()}`,
      type: "course-of-action",
      spec_version: "2.1" as StixSpecVersion,
      x_mitre_attack_spec_version: "3.1.0" as XMitreAttackSpecVersion,
      name: "Test Mitigation" as Name,
      x_mitre_version: "1.0" as XMitreVersion,
      description: "Test description" as Description,
      created_by_ref: `identity--${uuidv4()}`,
      created: "2017-06-01T00:00:00.000Z" as StixCreatedTimestamp,
      modified: "2017-06-01T00:00:00.000Z" as StixModifiedTimestamp,
      object_marking_refs: [
        "marking-definition--fa42a846-8d90-4e51-bc29-71d5b4802168",
      ] as ObjectMarkingRefs,
      x_mitre_domains: ["ics-attack"] as XMitreDomains,
      external_references: [
        {
          source_name: "mitre-attack",
          url: "https://attack.mitre.org/mitigations/M0948",
          external_id: "M0000",
        },
      ] as ExternalReferences,
      x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef,
    });
  });

  describe("True Positives Tests", () => {
    it("should accept minimal valid object (only required fields)", () => {
      expect(() => mitigationSchema.parse(minimalMitigation)).not.toThrow();
    });

    it("should accept fully populated valid object (required + optional fields)", () => {
      const mitigationWithOptionalFields: Mitigation = {
        ...minimalMitigation,
        x_mitre_deprecated: false,
        revoked: false,
        labels: [
          "IEC 62443-3-3:2013 - SR 5.4",
          "IEC 62443-4-2:2019 - CR 5.4",
          "NIST SP 800-53 Rev. 5 - SI-3",
        ],
        x_mitre_old_attack_id: "MOB-M1008" as XMitreOldAttackId,
      };

      expect(() =>
        mitigationSchema.parse(mitigationWithOptionalFields)
      ).not.toThrow();
    });
  });

  describe("True Negative Tests", () => {
    describe("type", () => {
      it("should reject invalid values", () => {
        const invalidType = {
          ...minimalMitigation,
          type: "invalid-type" as any,
        };
        expect(() => mitigationSchema.parse(invalidType)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { type, ...mitigationWithoutType } = minimalMitigation;
        expect(() => mitigationSchema.parse(mitigationWithoutType)).toThrow();
      });
    });

    describe("id", () => {
      it("should reject invalid values", () => {
        const invalidId = {
          ...minimalMitigation,
          id: "invalid-id" as any,
        };
        expect(() => mitigationSchema.parse(invalidId)).toThrow();

        const invalidMitigationId = {
          ...minimalMitigation,
          id: `attack-pattern--${uuidv4()}` as any,
        };
        expect(() => mitigationSchema.parse(invalidMitigationId)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { id, ...mitigationWithoutId } = minimalMitigation;
        expect(() => mitigationSchema.parse(mitigationWithoutId)).toThrow();
      });
    });

    describe("spec_version", () => {
      it("should reject invalid values", () => {
        const invalidSpecVersion = {
          ...minimalMitigation,
          spec_version: "invalid-spec-version" as any,
        };
        expect(() => mitigationSchema.parse(invalidSpecVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { spec_version, ...mitigationWithoutSpecVersion } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutSpecVersion)
        ).toThrow();
      });
    });

    describe("x_mitre_attack_spec_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreAttackSpecVersion = {
          ...minimalMitigation,
          x_mitre_attack_spec_version:
            "invalid-x_mitre_attack_spec_version" as any,
        };
        expect(() =>
          mitigationSchema.parse(invalidXMitreAttackSpecVersion)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const {
          x_mitre_attack_spec_version,
          ...mitigationWithoutXMitreAttackSpecVersion
        } = minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutXMitreAttackSpecVersion)
        ).toThrow();
      });
    });

    describe("name", () => {
      it("should reject invalid values", () => {
        const invalidName = {
          ...minimalMitigation,
          name: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidName)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { name, ...mitigationWithoutName } = minimalMitigation;
        expect(() => mitigationSchema.parse(mitigationWithoutName)).toThrow();
      });
    });

    describe("x_mitre_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreVersion: Mitigation = {
          ...minimalMitigation,
          x_mitre_version: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidXMitreVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_version, ...mitigationWithoutXMitreVersion } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutXMitreVersion)
        ).toThrow();
      });
    });

    describe("description", () => {
      it("should reject invalid values", () => {
        const invalidDescription = {
          ...minimalMitigation,
          description: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidDescription)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { description, ...mitigationWithoutDescription } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutDescription)
        ).toThrow();
      });
    });

    describe("created_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidCreatedByRef = {
          ...minimalMitigation,
          created_by_ref: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidCreatedByRef)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created_by_ref, ...mitigationWithoutCreatedByRef } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutCreatedByRef)
        ).toThrow();
      });
    });

    describe("created", () => {
      it("should reject invalid values", () => {
        const invalidCreated: Mitigation = {
          ...minimalMitigation,
          created: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidCreated)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created, ...mitigationWithoutCreated } = minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutCreated)
        ).toThrow();
      });
    });

    describe("modified", () => {
      it("should reject invalid values", () => {
        const invalidModified: Mitigation = {
          ...minimalMitigation,
          modified: 123 as any,
        };
        expect(() => mitigationSchema.parse(invalidModified)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { modified, ...mitigationWithoutModified } = minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutModified)
        ).toThrow();
      });
    });

    describe("object_marking_refs", () => {
      it("should reject invalid values", () => {
        const invalidObjectMarkingRefs = {
          ...minimalMitigation,
          object_marking_refs: 123 as any,
        };
        expect(() =>
          mitigationSchema.parse(invalidObjectMarkingRefs)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { object_marking_refs, ...mitigationWithoutObjectMarkingRefs } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutObjectMarkingRefs)
        ).toThrow();
      });
    });

    describe("x_mitre_domains", () => {
      it("should reject invalid values", () => {
        const invalidXMitreDomains = {
          ...minimalMitigation,
          x_mitre_domains: ["invalid-domain"] as any,
        };
        expect(() => mitigationSchema.parse(invalidXMitreDomains)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_domains, ...mitigationWithoutXMitreDomains } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutXMitreDomains)
        ).toThrow();
      });
    });

    describe("external_references", () => {
      it("should reject invalid values", () => {
        const invalidExternalReferences = {
          ...minimalMitigation,
          external_references: "not-an-array" as unknown as ExternalReferences,
        };
        expect(() =>
          mitigationSchema.parse(invalidExternalReferences)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const { external_references, ...mitigationWithoutExternalReferences } =
          minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutExternalReferences)
        ).toThrow();
      });
    });

    describe("x_mitre_modified_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidXMitreModifiedByRef = {
          ...minimalMitigation,
          x_mitre_modified_by_ref: 123 as any,
        };
        expect(() =>
          mitigationSchema.parse(invalidXMitreModifiedByRef)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const {
          x_mitre_modified_by_ref,
          ...mitigationWithoutXMitreModifiedByRef
        } = minimalMitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithoutXMitreModifiedByRef)
        ).toThrow();
      });
    });

    describe("x_mitre_deprecated", () => {
      it("should reject invalid values", () => {
        const invalidXMitreDeprecated = {
          ...minimalMitigation,
          x_mitre_deprecated: "not a boolean" as any,
        };
        expect(() => mitigationSchema.parse(invalidXMitreDeprecated)).toThrow();
      });
    });

    describe("revoked", () => {
      it("should reject invalid values", () => {
        const invalidRevoked = {
          ...minimalMitigation,
          revoked: "not a boolean" as any,
        };
        expect(() => mitigationSchema.parse(invalidRevoked)).toThrow();
      });
    });

    describe("labels", () => {
      it("should reject invalid values", () => {
        const invalidLabels = {
          ...minimalMitigation,
          labels: "not an array" as any,
        };
        expect(() => mitigationSchema.parse(invalidLabels)).toThrow();
      });
    });

    describe("x_mitre_old_attack_id", () => {
      it("should reject invalid values", () => {
        const invalidXMitreOldAttackId = {
          ...minimalMitigation,
          x_mitre_old_attack_id: 123 as any,
        };
        expect(() =>
          mitigationSchema.parse(invalidXMitreOldAttackId)
        ).toThrow();
      });
    });

    describe("Schema-Level Tests", () => {
      it("should reject unknown properties", () => {
        const mitigationWithUnknownProp: Mitigation = {
          ...minimalMitigation,
          unknownProp: "test",
        } as Mitigation;
        expect(() =>
          mitigationSchema.parse(mitigationWithUnknownProp)
        ).toThrow();
      });
    });
  });

  describe("Edge Cases and Special Scenarios", () => {
    it("should handle special case X", () => {
      // Test any schema-specific special cases
    });
  });

  describe("Validate All Objects", () => {
    it("should validate all objects in the global.attackData", () => {
      mitigations.forEach((mitigation, index) => {
        expect(() => mitigationSchema.parse(mitigation)).not.toThrow();
      });
    });
  });
});
