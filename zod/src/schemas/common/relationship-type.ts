import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';
import { StixIdentifierImpl } from '../../classes/stix-identifier.cls';
import { StixTypeSchema } from './stix-type';

const VALUES = [
	"uses",
	"mitigates",
	"subtechnique-of",
	"detects",
	"attributed-to",
	"targets",
	"revoked-by"
] as const;

export const RelationshipTypeSchema = z
	.enum(VALUES)
	.describe("The name used to identify the type of Relationship.")

export type RelationshipType = z.infer<typeof RelationshipTypeSchema>;

// Helper function for getting the type from source and target ref
export const getType = function(ref: string): string {
	const objectIdentifier = new StixIdentifierImpl(ref);
	return objectIdentifier.type;
}

// Helper function for valid relationship source types
export const validSourceTypes = function(relationshipType: string, targetRef: string): string[] {
	const targetType = getType(targetRef);

	/**
	 * CASE: "uses"
	 */
	if (relationshipType == RelationshipTypeSchema.enum.uses) {
		// intrusion-set USES malware or tool
		// campaign USES malware or tool
		if (targetType == StixTypeSchema.enum.malware || targetType == StixTypeSchema.enum.tool) {
			return ["intrusion-set", "campaign"];
		}

		// malware or tool USES attack-pattern
		// intrusion-set USES attack-pattern
		// campaign USES attack-pattern
		else if (targetType == StixTypeSchema.enum['attack-pattern']) {
			return ["malware", "tool", "intrusion-set", "campaign"];
		}
	}

	/**
	 * CASE: "mitigates"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.mitigates) {
		// course-of-action MITIGATES attack-pattern
		if (targetType == StixTypeSchema.enum['attack-pattern']) {
			return ["course-of-action"];
		}
	}

	/**
	 * CASE: "subtechnique-of"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['subtechnique-of']) {
		// attack-pattern SUBTECHNIQUE-OF attack-pattern
		if (targetType == StixTypeSchema.enum['attack-pattern']) {
			return ["attack-pattern"];
		}
	}

	/**
	 * CASE: "detects"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.detects) {
		// x-mitre-data-component DETECTS attack-pattern
		if (targetType == StixTypeSchema.enum['attack-pattern']) {
			return ["x-mitre-data-component"];
		}
	}

	/**
	 * CASE: "attributed-to"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['attributed-to']) {
		// campaign ATTRIBUTED-TO intrusion-set
		if (targetType == StixTypeSchema.enum['intrusion-set']) {
			return ['campaign'];
		}
	}

	/**
	 * CASE: "targets"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.targets) {
		// attack-pattern TARGETS x-mitre-asset
		if (targetType == StixTypeSchema.enum['x-mitre-asset']) {
			return ['attack-pattern'];
		}
	}

	/**
	 * CASE: "revoked-by"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['revoked-by']) {
		// any REVOKED-BY any
		return StixTypeSchema.options;
	}

	// invalid target type or relationship type, return empty set
	return [];
};

// Helper function for valid relationship target types
export const validTargetTypes = function(relationshipType: string, sourceRef: string) {
	const sourceType = getType(sourceRef);

	/**
	 * CASE: "uses"
	 */
	if (relationshipType == RelationshipTypeSchema.enum.uses) {
		// malware or tool USES attack-pattern
		if (sourceType == StixTypeSchema.enum.malware || sourceType == StixTypeSchema.enum.tool) {
			return ["attack-pattern"];
		}

		// intrusion-set USES malware or tool
		// intrusion-set USES attack-pattern
		else if (sourceType == StixTypeSchema.enum['intrusion-set']) {
			return ["malware", "tool", "attack-pattern"]
		}

		// campaign USES malware or tool
		// campaign USES attack-pattern
		else if (sourceType == StixTypeSchema.enum.campaign) {
			return ["malware", "tool", "attack-pattern"]
		}
	}

	/**
	 * CASE: "mitigates"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.mitigates) {
		// course-of-action MITIGATES attack-pattern
		if (sourceType == StixTypeSchema.enum['course-of-action']) {
			return ["attack-pattern"];
		}
	}

	/**
	 * CASE: "subtechnique-of"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['subtechnique-of']) {
		// attack-pattern SUBTECHNIQUE-OF attack-pattern
		if (sourceType == StixTypeSchema.enum['attack-pattern']) {
			return ["attack-pattern"];
		}
	}

	/**
	 * CASE: "detects"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.detects) {
		// x-mitre-data-component DETECTS attack-pattern
		if (sourceType == StixTypeSchema.enum['x-mitre-data-component']) {
			return ["attack-pattern"];
		}
	}

	/**
	 * CASE: "attributed-to"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['attributed-to']) {
		// campaign ATTRIBUTED-TO intrusion-set
		if (sourceType == StixTypeSchema.enum.campaign) {
			return ["intrusion-set"];
		}
	}

	/**
	 * CASE: "targets"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum.targets) {
		// attack-pattern TARGETS x-mitre-asset
		if (sourceType == StixTypeSchema.enum['attack-pattern']) {
			return ["x-mitre-asset"];
		}
	}

	/**
	 * CASE: "revoked-by"
	 */
	else if (relationshipType == RelationshipTypeSchema.enum['revoked-by']) {
		// any REVOKED-BY any
		return StixTypeSchema.options;
	}

	// invalid source type or relationship type, return empty set
	return [];
}