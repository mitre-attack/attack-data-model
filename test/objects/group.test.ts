import {
  Description,
  ExternalReferences,
  Name,
  StixCreatedTimestamp,
  StixModifiedTimestamp,
  StixSpecVersion,
  XMitreAttackSpecVersion,
  XMitreContributors,
  XMitreModifiedByRef,
  XMitreVersion,
  xMitreIdentity,
} from "../../src/schemas/common";
import { Group, groupSchema } from "../../src/schemas/sdo/group.schema";
import { v4 as uuidv4 } from "uuid";

describe("GroupSchema", () => {

  let minimalGroup: Group;

  beforeAll(() => {

    minimalGroup = groupSchema.parse({
      id: `intrusion-set--${uuidv4()}`,
      type: "intrusion-set",
      spec_version: "2.1" as StixSpecVersion,
      x_mitre_attack_spec_version: "2.1.0" as XMitreAttackSpecVersion,
      name: "Test Name" as Name,
      x_mitre_version: "1.0" as XMitreVersion,
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
          description: "Dragos   Allanite Retrieved. 2019/10/27 ",
        },
      ],
    });
  });

  describe("True Positives Tests", () => {
    it("should accept minimal valid object (only required fields)", () => {
      expect(() => groupSchema.parse(minimalGroup)).not.toThrow();
    });

    it("should accept fully populated valid object (required + optional fields)", () => {
      const groupWithOptionalFields: Group = {
        ...minimalGroup,
        description: "This is a test group." as Description,
        created_by_ref: `identity--${uuidv4()}`,
        object_marking_refs: [`marking-definition--${uuidv4()}`],
        x_mitre_modified_by_ref: xMitreIdentity as XMitreModifiedByRef,
        x_mitre_contributors: [
          "Contributor 1",
          "Contributor 2",
        ] as XMitreContributors,
        x_mitre_deprecated: false,
        revoked: false,
        aliases: ["Test Name"],
      };

      expect(() => groupSchema.parse(groupWithOptionalFields)).not.toThrow();
    });
  });

  describe("True Negative Tests", () => {
    describe("type", () => {
      it("should reject invalid values", () => {
        const invalidType = {
          ...minimalGroup,
          type: "invalid-type" as any,
        };
        expect(() => groupSchema.parse(invalidType)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { type, ...groupWithoutType } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutType)).toThrow();
      });
    });

    describe("id", () => {
      it("should reject invalid values", () => {
        const invalidId = {
          ...minimalGroup,
          id: "invalid-id" as any,
        };
        expect(() => groupSchema.parse(invalidId)).toThrow();

        const invalidGroupId = {
          ...minimalGroup,
          id: `attack-pattern--${uuidv4()}` as any,
        };
        expect(() => groupSchema.parse(invalidGroupId)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { id, ...groupWithoutId } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutId)).toThrow();
      });
    });

    describe("spec_version", () => {
      it("should reject invalid values", () => {
        const invalidSpecVersion = {
          ...minimalGroup,
          spec_version: "invalid-spec-version" as any,
        };
        expect(() => groupSchema.parse(invalidSpecVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { spec_version, ...groupWithoutSpecVersion } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutSpecVersion)).toThrow();
      });
    });

    describe("x_mitre_attack_spec_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreAttackSpecVersion = {
          ...minimalGroup,
          x_mitre_attack_spec_version:
            "invalid-x_mitre_attack_spec_version" as any,
        };
        expect(() =>
          groupSchema.parse(invalidXMitreAttackSpecVersion)
        ).toThrow();
      });

      it("should reject omitted required values", () => {
        const {
          x_mitre_attack_spec_version,
          ...groupWithoutXMitreAttackSpecVersion
        } = minimalGroup;
        expect(() =>
          groupSchema.parse(groupWithoutXMitreAttackSpecVersion)
        ).toThrow();
      });
    });

    describe("name", () => {
      it("should reject invalid values", () => {
        const invalidName = {
          ...minimalGroup,
          name: 123 as any,
        };
        expect(() => groupSchema.parse(invalidName)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { name, ...groupWithoutName } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutName)).toThrow();
      });
    });

    describe("x_mitre_version", () => {
      it("should reject invalid values", () => {
        const invalidXMitreVersion: Group = {
          ...minimalGroup,
          x_mitre_version: 123 as any,
        };
        expect(() => groupSchema.parse(invalidXMitreVersion)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_version, ...groupWithoutXMitreVersion } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutXMitreVersion)).toThrow();
      });
    });

    describe("created", () => {
      it("should reject invalid values", () => {
        const invalidCreated: Group = {
          ...minimalGroup,
          created: 123 as any,
        };
        expect(() => groupSchema.parse(invalidCreated)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { created, ...groupWithoutCreated } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutCreated)).toThrow();
      });
    });

    describe("modified", () => {
      it("should reject invalid values", () => {
        const invalidModified: Group = {
          ...minimalGroup,
          modified: 123 as any,
        };
        expect(() => groupSchema.parse(invalidModified)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { modified, ...groupWithoutModified } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutModified)).toThrow();
      });
    });

    describe("x_mitre_domains", () => {
      it("should reject invalid values", () => {
        const invalidGroup: Group = {
          ...minimalGroup,
          x_mitre_domains: "not an array" as any,
        };
        expect(() => groupSchema.parse(invalidGroup)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { x_mitre_domains, ...groupWithoutDomains } = minimalGroup;
        expect(() => groupSchema.parse(groupWithoutDomains)).toThrow();
      });
    });

    describe("external_references", () => {
      it("should reject invalid values", () => {
        const invalidGroup: Group = {
          ...minimalGroup,
          external_references: "not-an-array" as unknown as ExternalReferences,
        };
        expect(() => groupSchema.parse(invalidGroup)).toThrow();
      });

      it("should reject omitted required values", () => {
        const { external_references, ...groupWithoutExternalReferences } =
          minimalGroup;
        expect(() =>
          groupSchema.parse(groupWithoutExternalReferences)
        ).toThrow();
      });
    });

    describe("description", () => {
      it("should reject invalid values", () => {
        const invalidDescription = {
          ...minimalGroup,
          description: 123 as any,
        };
        expect(() => groupSchema.parse(invalidDescription)).toThrow();
      });
    });

    describe("created_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidCreatedByRef = {
          ...minimalGroup,
          created_by_ref: 123 as any,
        };
        expect(() => groupSchema.parse(invalidCreatedByRef)).toThrow();
      });
    });

    describe("object_marking_refs", () => {
      it("should reject invalid values", () => {
        const invalidObjectMarkingRefs = {
          ...minimalGroup,
          object_marking_refs: 123 as any,
        };
        expect(() => groupSchema.parse(invalidObjectMarkingRefs)).toThrow();
      });
    });

    describe("x_mitre_modified_by_ref", () => {
      it("should reject invalid values", () => {
        const invalidXMitreModifiedByRef = {
          ...minimalGroup,
          x_mitre_modified_by_ref: 123 as any,
        };
        expect(() => groupSchema.parse(invalidXMitreModifiedByRef)).toThrow();
      });
    });

    describe("x_mitre_contributors", () => {
      it("should reject invalid values", () => {
        const invalidXMitreContributors = {
          ...minimalGroup,
          x_mitre_contributors: 123 as any,
        };
        expect(() => groupSchema.parse(invalidXMitreContributors)).toThrow();
      });
    });

    describe("x_mitre_deprecated", () => {
      it("should reject invalid values", () => {
        const invalidXMitreDeprecated = {
          ...minimalGroup,
          x_mitre_deprecated: "not a boolean" as any,
        };
        expect(() => groupSchema.parse(invalidXMitreDeprecated)).toThrow();
      });
    });

    describe("revoked", () => {
      it("should reject invalid values", () => {
        const invalidRevoked = {
          ...minimalGroup,
          revoked: "not a boolean" as any,
        };
        expect(() => groupSchema.parse(invalidRevoked)).toThrow();
      });
    });

    describe("aliases", () => {
      it("should reject invalid values", () => {
        const invalidAliases = {
          ...minimalGroup,
          aliases: "not an array" as any,
        };
        expect(() => groupSchema.parse(invalidAliases)).toThrow();
      });
    });

    describe("Schema-Level Tests", () => {
      it("should reject unknown properties", () => {
        const groupWithUnknownProp: Group = {
          ...minimalGroup,
          unknownProp: "test",
        } as Group;
        expect(() => groupSchema.parse(groupWithUnknownProp)).toThrow();
      });
    });
  });

  describe("Edge Cases and Special Scenarios", () => {
    it("should handle case where group name is not the first listed alias", () => {
      const invalidAliases = {
        ...minimalGroup,
        aliases: ["Not alias name"] as any,
      };
      expect(() => groupSchema.parse(invalidAliases)).toThrow();
    });
  });
});
