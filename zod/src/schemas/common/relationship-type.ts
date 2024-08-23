import { z } from 'zod';
import { StixIdentifierImpl } from '../../classes/stix-identifier.cls';
import { stixTypeSchema } from './stix-type';

const VALUES = [
	"uses",
	"mitigates",
	"subtechnique-of",
	"detects",
	"attributed-to",
	"targets",
	"revoked-by"
] as const;

export const relationshipTypeSchema = z
	.enum(VALUES)
	.describe("The name used to identify the type of Relationship.")

export type RelationshipType = z.infer<typeof relationshipTypeSchema>;

interface RelationshipMap {
	[relationshipType: string]: {
		source: string[],
		target: string[]
	}
}

export const relationshipMap: RelationshipMap = {
	"uses": {
		// malware or tool USES attack-pattern
		// intrusion-set USES malware, tool, or attack-pattern
		// campaign USES malware, tool, or attack-pattern
		source: ["malware", "tool", "intrusion-set", "campaign"],
		target: ["attack-pattern", "malware", "tool"]
	},
	"mitigates": {
		// course-of-action MITIGATES attack-pattern
		source: ["course-of-action"],
		target: ["attack-pattern"]
	},
	"subtechnique-of": {
		// attack-pattern SUBTECHNIQUE-OF attack-pattern
		source: ["attack-pattern"],
		target: ["attack-pattern"]
	},
	"detects": {
		// x-mitre-data-component DETECTS attack-pattern
		source: ["x-mitre-data-component"],
		target: ["attack-pattern"]
	},
	"attributed-to": {
		// campaign ATTRIBUTED-TO intrusion-set
		source: ["campaign"],
		target: ["intrusion-set"]
	},
	"targets": {
		// attack-pattern TARGETS x-mitre-asset
		source: ["attack-pattern"],
		target: ["x-mitre-asset"]
	},
	"revoked-by": {
		// any REVOKED-BY any, where source and target are the same type
		source: stixTypeSchema.options,
		target: stixTypeSchema.options
	}
}

// Edge case invalid "uses" combinations
const invalidUsesRelationships = [
	["malware", "malware"],
	["malware", "tool"],
	["tool", "malware"],
	["tool", "tool"]
]

// Helper function to get type from source and target ref
export const getType = function(ref: string): string {
	const objectIdentifier = new StixIdentifierImpl(ref);
	return objectIdentifier.type;
}

// Helper function to validate relationship
export const isValidRelationship = function(relationshipType: string, sourceRef: string, targetRef: string): [boolean, any] {
	const sourceType = getType(sourceRef);
	const targetType = getType(targetRef);

	const mapping = relationshipMap[relationshipType];
	if (!mapping) {
		return [false, {
			message: `Invalid 'relationship_type', must be one of ${Object.keys(relationshipMap)}`,
			path: ["relationship_type"]
		}];
	}

	// Check edge cases for "uses" relationships
	if (relationshipType === relationshipTypeSchema.enum.uses) {
		for (let [invalidSource, invalidTarget] of invalidUsesRelationships) {
			if (sourceType === invalidSource && targetType === invalidTarget) {
				return [false, {
					message: `Invalid "uses" relationship: source and target cannot both be "malware" or "tool"`,
					path: ["relationship_type"]
				}];
			}
		}
	}

	// No issues found with relationship type
	return [true, {}];
}

// Helper function to validate relationship source_ref type
export const isValidSourceType = function(relationshipType: string, sourceRef: string): [boolean, any] {
	const sourceType = getType(sourceRef);

	// Check if source type is valid
	const mapping = relationshipMap[relationshipType];
	if (mapping?.source && !mapping.source.includes(sourceType)) {
		return [false, {
			message: `Invalid source type, must be one of ${mapping.source}`,
			path: ["source_ref"]
		}];
	}
	return [true, {}];
};

// Helper function to validate relationship target_ref type
export const isValidTargetType = function(relationshipType: string, targetRef: string): [boolean, any] {
	const targetType = getType(targetRef);

	// Check if target type is valid
	const mapping = relationshipMap[relationshipType];
	if (mapping?.target && !mapping.target.includes(targetType)) {
		return [false, {
			message: `Invalid target type, must be one of ${mapping.target}`,
			path: ["target_ref"]
		}];
	}
	return [true, {}];
}