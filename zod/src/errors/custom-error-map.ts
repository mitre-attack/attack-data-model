import { z } from 'zod';
import { StixType } from '../schemas/common/stix-type';


/**
 * Mapping of STIX types to their corresponding schema names.
 * This helps in generating more readable error messages by using
 * the schema name instead of the raw STIX type.
 */
const stixTypeToSchemaName: Record<StixType, string> = {
    "attack-pattern": "AttackPattern",
    "campaign": "Campaign",
    "course-of-action": "CourseOfAction",
    "identity": "Identity",
    "indicator": "Indicator",
    "intrusion-set": "IntrusionSet",
    "malware": "Malware",
    "observed-data": "ObservedData",
    "report": "Report",
    "threat-actor": "ThreatActor",
    "tool": "Tool",
    "vulnerability": "Vulnerability",
    "marking-definition": "MarkingDefinition",
    "x-mitre-data-component": "DataComponent",
    "x-mitre-data-source": "DataSource",
    "x-mitre-tactic": "Tactic",
    "x-mitre-asset": "Asset",
    "x-mitre-matrix": "Matrix",
    "x-mitre-collection": "Collection",
};

/**
 * Custom error map for Zod to handle STIX-specific errors.
 * 
 * @param {z.ZodIssue} issue - The Zod issue object containing error details.
 * @param {object} ctx - The context object provided by Zod.
 * @returns {object} An object with a custom error message.
 * 
 * This function intercepts Zod's error creation process and provides
 * custom, more informative error messages for STIX type and ID mismatches.
 */
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    // Handle 'type' property errors
    if (issue.code === z.ZodIssueCode.invalid_literal && issue.path.includes('type')) {
        const expectedType = issue.expected as StixType;
        const schemaName = stixTypeToSchemaName[expectedType] || expectedType;

        return {
            message: `Invalid 'type' property. Expected '${expectedType}' for ${schemaName} object, but received '${issue.received}'.`
        };
    }

    // For all other issues, return the default error message
    return { message: ctx.defaultError };
};

// Set the custom error map
z.setErrorMap(customErrorMap);

export { customErrorMap };