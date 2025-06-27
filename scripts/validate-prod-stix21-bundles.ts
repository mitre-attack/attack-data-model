/**
 * STIX Bundle Validation Script
 * -----------------------------
 *
 * This script validates MITRE ATT&CK STIX bundles against our Zod schemas
 * to identify validation issues and schema inconsistencies between our defined
 * schemas and production data.
 *
 * Purpose:
 * - Helps identify validation issues in our schemas
 * - Tests schema compatibility with real-world STIX bundles
 * - Provides detailed error reporting for debugging
 *
 * Behavior:
 * 1. Fetches STIX bundles for all domains (enterprise, mobile, and ics) from the MITRE ATT&CK STIX 2.1 GitHub repository
 * 2. Validates each bundle against our schema definitions
 * 3. Formats and groups validation errors by object
 * 4. Writes detailed error reports to a file for analysis
 * 5. Outputs summary statistics about the validation
 *
 * Usage:
 * ```
 * npm run validate-bundles
 * ```
 *
 * Options:
 * --domain=<domain>  Validate only a specific domain (enterprise, mobile, ics)
 *
 * Outputs:
 * - Console logs with validation summary
 * - A validation-errors-{timestamp}.txt file with detailed error reporting
 *
 * @author MITRE ATT&CK Team
 * @file validate-production-bundles.ts
 */

import axios from 'axios';
import fs from 'fs/promises';
import { z } from 'zod';

import { stixBundleSchema, type StixBundle } from '../src/schemas/sdo/stix-bundle.schema';
import { type AttackDomain, attackDomainSchema } from '../src/schemas/common';

const SUPPORTED_DOMAINS = attackDomainSchema.options;

/**
 * Formats a ZodError into a readable string with context about the failing objects
 */
function formatZodError(error: z.ZodError, bundle: StixBundle): string {
  const formattedErrors: string[] = [];

  // Get bundle ID and friendly name
  const bundleId = bundle.id;
  const collectionObject = bundle.objects[0] as any;
  const bundleFriendlyName = collectionObject?.name || 'Unknown';

  // Group issues by the object they refer to
  const issuesByObject: Record<string, z.ZodIssue[]> = {};

  error.issues.forEach((issue) => {
    // Find the object index from the path if it exists
    const pathSegments = issue.path;
    const objectsIndex = pathSegments.findIndex((segment) => segment === 'objects');

    if (objectsIndex !== -1 && objectsIndex + 1 < pathSegments.length) {
      const objectIndex = pathSegments[objectsIndex + 1];
      if (typeof objectIndex === 'number') {
        const key = `objects.${objectIndex}`;
        if (!issuesByObject[key]) {
          issuesByObject[key] = [];
        }
        issuesByObject[key].push(issue);
      } else {
        // Issues not related to a specific object
        const key = 'general';
        if (!issuesByObject[key]) {
          issuesByObject[key] = [];
        }
        issuesByObject[key].push(issue);
      }
    } else {
      // Bundle-level issues
      const key = 'bundle';
      if (!issuesByObject[key]) {
        issuesByObject[key] = [];
      }
      issuesByObject[key].push(issue);
    }
  });

  // Format bundle-level issues
  if (issuesByObject['bundle']) {
    const bundleIssues = issuesByObject['bundle']
      .map((issue) => `  Path: ${issue.path.join('.')}\n  Error: ${formatError(issue)}`)
      .join('\n\n');

    formattedErrors.push(
      `Bundle-level errors in (${bundleFriendlyName}, ID: ${bundleId}):\n${bundleIssues}`,
    );
  }

  // Format general object array issues
  if (issuesByObject['general']) {
    const generalIssues = issuesByObject['general']
      .map((issue) => `  Path: ${issue.path.join('.')}\n  Error: ${formatError(issue)}`)
      .join('\n\n');

    formattedErrors.push(
      `General object array errors in (${bundleFriendlyName}, ID: ${bundleId}):\n${generalIssues}`,
    );
  }

  // Format object-specific issues
  Object.keys(issuesByObject).forEach((key) => {
    if (key !== 'bundle' && key !== 'general' && key.startsWith('objects.')) {
      const objectIndexStr = key.split('.')[1];
      const objectIndex = parseInt(objectIndexStr);
      const errorObject = bundle.objects[objectIndex];

      if (!errorObject) return;

      // Determine Object Status
      let objectStatus = 'Active';
      if ((errorObject as any).x_mitre_deprecated) {
        objectStatus = 'Deprecated';
      } else if ('revoked' in errorObject && (errorObject as any).revoked) {
        objectStatus = 'Revoked';
      }

      const objectInfo = `Object Index: ${objectIndex}\n  Object ID: ${errorObject.id}\n  Object Type: ${errorObject.type}\n  Object Name: ${(errorObject as any).name || 'N/A'}\n  Object Status: ${objectStatus}`;

      const issues = issuesByObject[key]
        .map((issue) => {
          // Remove the 'objects.X' prefix from the path for cleaner output
          const relativePath = issue.path.slice(issue.path.indexOf(objectIndex) + 1);
          return `  Path: ${relativePath.length ? relativePath.join('.') : '<object root>'}\n  Error: ${formatError(issue)}`;
        })
        .join('\n\n');

      formattedErrors.push(`Error in object:\n  ${objectInfo}\n\n${issues}`);
    }
  });

  return formattedErrors.join('\n\n' + '-'.repeat(80) + '\n\n');
}

/**
 * Enhances the Zod error message to include more helpful context
 */
function formatError(issue: z.ZodIssue): string {
  // For enum validation errors, reformat to include the received value clearly
  if (issue.code === 'invalid_enum_value' && issue.received) {
    return `Invalid enum value. Received '${issue.received}' but expected one of: ${issue.options.map(opt => `'${opt}'`).join(' | ')}`;
  }
  
  // For invalid arguments, include value clearly
  if (issue.code === 'invalid_arguments' && issue.argumentsError) {
    return `Invalid arguments: ${issue.message}`;
  }

  // For custom validation errors that contain 'Expected X, received Y' format
  if (issue.code === 'custom' && issue.message.includes('Expected') && issue.message.includes('received')) {
    return issue.message;
  }
  
  // Handle invalid types more clearly
  if (issue.code === 'invalid_type') {
    return `Invalid type. Expected ${issue.expected}, received ${issue.received}`;
  }
  
  // Return the original message for other types of errors
  return issue.message;
}

/**
 * Fetches a STIX bundle from the MITRE ATT&CK STIX 2.1 GitHub repository
 */
async function fetchStix21Bundle(domain: AttackDomain): Promise<StixBundle> {
  const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master';
  const url = `${GITHUB_BASE_URL}/${domain}/${domain}.json`;

  console.log(`Fetching STIX bundle from: ${url}`);
  try {
    const response = await axios.get<StixBundle>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bundle for domain ${domain}:`, error);
    throw error;
  }
}

/**
 * Validates a STIX bundle and returns validation results
 */
async function validateStix21Bundle(domain: AttackDomain): Promise<{
  domain: AttackDomain;
  bundle: StixBundle;
  isValid: boolean;
  errorCount: number;
  formattedError: string | null;
  error?: z.ZodError;
}> {
  try {
    const bundle = await fetchStix21Bundle(domain);

    try {
      stixBundleSchema.parse(bundle);
      console.log(`✅ ${domain} bundle validation successful!`);

      return {
        domain,
        bundle,
        isValid: true,
        errorCount: 0,
        formattedError: null,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`❌ ${domain} validation failed with ${error.issues.length} errors`);

        // Get a nicely formatted error message
        const formattedError = formatZodError(error, bundle);

        return {
          domain,
          bundle,
          isValid: false,
          errorCount: error.issues.length,
          formattedError,
          error: error,
        };
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Error processing ${domain} bundle:`, error);
    throw error;
  }
}

/**
 * Collects error statistics from a ZodError
 * @returns Structured data about validation errors for analysis
 */
function collectErrorStatistics(
  error: z.ZodError, 
  bundle: StixBundle
): {
  invalidEnumValues: Map<string, {value: string, objectId: string, objectName: string, objectType: string, objectStatus: string}[]>,
  errorsByPath: Map<string, number>,
  errorsByStatus: Record<string, number>,
  errorsByType: Record<string, number>
} {
  const invalidEnumValues = new Map<string, {value: string, objectId: string, objectName: string, objectType: string, objectStatus: string}[]>();
  const errorsByPath = new Map<string, number>();
  const errorsByStatus: Record<string, number> = {
    'Active': 0,
    'Deprecated': 0,
    'Revoked': 0
  };
  const errorsByType: Record<string, number> = {};

  error.issues.forEach((issue) => {
    // Get object information if this is an object-level error
    let objectId = "unknown";
    let objectName = "unknown";
    let objectType = "unknown";
    let objectStatus = "unknown";
    
    const objectsIndex = issue.path.findIndex((segment) => segment === 'objects');
    if (objectsIndex !== -1 && objectsIndex + 1 < issue.path.length) {
      const objectIndex = issue.path[objectsIndex + 1];
      if (typeof objectIndex === 'number' && objectIndex < bundle.objects.length) {
        const errorObject = bundle.objects[objectIndex];
        
        objectId = errorObject.id;
        objectType = errorObject.type;
        objectName = (errorObject as any).name || 'Unnamed';
        
        // Determine object status
        objectStatus = 'Active';
        if ((errorObject as any).x_mitre_deprecated) {
          objectStatus = 'Deprecated';
        } else if ('revoked' in errorObject && (errorObject as any).revoked) {
          objectStatus = 'Revoked';
        }
        
        // Count by status
        errorsByStatus[objectStatus] = (errorsByStatus[objectStatus] || 0) + 1;
        
        // Count by type
        errorsByType[objectType] = (errorsByType[objectType] || 0) + 1;
      }
    }

    // Track invalid enum values with object information
    if (issue.code === 'invalid_enum_value' && issue.received) {
      const pathKey = issue.path.join('.');
      if (!invalidEnumValues.has(pathKey)) {
        invalidEnumValues.set(pathKey, []);
      }
      
      invalidEnumValues.get(pathKey)?.push({
        value: String(issue.received),
        objectId,
        objectName,
        objectType,
        objectStatus
      });
    }

    // Track errors by path
    const pathKey = issue.path.join('.');
    errorsByPath.set(pathKey, (errorsByPath.get(pathKey) || 0) + 1);
  });

  return { invalidEnumValues, errorsByPath, errorsByStatus, errorsByType };
}

/**
 * Format aggregate error statistics for reporting
 */
function formatErrorAggregateReport(
  stats: {
    invalidEnumValues: Map<string, {value: string, objectId: string, objectName: string, objectType: string, objectStatus: string}[]>,
    errorsByPath: Map<string, number>,
    errorsByStatus: Record<string, number>,
    errorsByType: Record<string, number>
  },
  totalErrorCount: number
): string {
  const report: string[] = [];
  
  report.push(`\n=== ERROR AGGREGATION REPORT ===`);
  report.push(`Total validation issues: ${totalErrorCount}\n`);
  
  // Report errors by status
  report.push(`Errors by object status:`);
  for (const [status, count] of Object.entries(stats.errorsByStatus)) {
    const percentage = (count / totalErrorCount * 100).toFixed(1);
    report.push(`  ${status}: ${count} (${percentage}%)`);
  }
  report.push('');
  
  // Report errors by type
  report.push(`Errors by object type:`);
  const sortedTypeEntries = Object.entries(stats.errorsByType)
    .sort(([, countA], [, countB]) => countB - countA);
  
  for (const [type, count] of sortedTypeEntries) {
    const percentage = (count / totalErrorCount * 100).toFixed(1);
    report.push(`  ${type}: ${count} (${percentage}%)`);
  }
  report.push('');
  
  // Report top error paths
  report.push(`Top error paths:`);
  const sortedPathEntries = [...stats.errorsByPath.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  for (const [path, count] of sortedPathEntries) {
    const percentage = (count / totalErrorCount * 100).toFixed(1);
    report.push(`  ${path}: ${count} (${percentage}%)`);
  }
  report.push('');
  
  // Report invalid enum values
  report.push(`Invalid enum values by property:`);
  
  // Group by property first
  const propertiesByEnumValue = new Map<string, {value: string, objects: {id: string, name: string, type: string, status: string}[]}>();
  
  for (const [path, values] of stats.invalidEnumValues.entries()) {
    // Extract the property name from the path
    const pathParts = path.split('.');
    const propertyName = pathParts.slice(2).join('.');
    
    for (const valueInfo of values) {
      const valueKey = `${propertyName}|${valueInfo.value}`;
      
      if (!propertiesByEnumValue.has(valueKey)) {
        propertiesByEnumValue.set(valueKey, {
          value: valueInfo.value,
          objects: []
        });
      }
      
      // Only add this object if it's not already in the list
      const existingObjects = propertiesByEnumValue.get(valueKey)!.objects;
      if (!existingObjects.some(obj => obj.id === valueInfo.objectId)) {
        existingObjects.push({
          id: valueInfo.objectId,
          name: valueInfo.objectName,
          type: valueInfo.objectType,
          status: valueInfo.objectStatus
        });
      }
    }
  }
  
  // Group properties by their name
  const groupedProperties = new Map<string, {value: string, objects: {id: string, name: string, type: string, status: string}[]}[]>();
  
  for (const [key, valueInfo] of propertiesByEnumValue.entries()) {
    const propertyName = key.split('|')[0];
    
    if (!groupedProperties.has(propertyName)) {
      groupedProperties.set(propertyName, []);
    }
    
    groupedProperties.get(propertyName)!.push(valueInfo);
  }
  
  // Output the grouped invalid enum values
  for (const [propertyName, valueInfos] of groupedProperties.entries()) {
    report.push(`  Property: ${propertyName}`);
    
    for (const valueInfo of valueInfos) {
      report.push(`    Invalid value: '${valueInfo.value}'`);
      report.push(`    Found in ${valueInfo.objects.length} objects:`);
      
      // Sort objects by name for more consistent output
      const sortedObjects = [...valueInfo.objects].sort((a, b) => a.name.localeCompare(b.name));
      
      for (const obj of sortedObjects.slice(0, 10)) { // Limit to first 10 objects for brevity
        report.push(`      - ${obj.name} (${obj.id}) [${obj.type}, ${obj.status}]`);
      }
      
      if (sortedObjects.length > 10) {
        report.push(`      ... and ${sortedObjects.length - 10} more objects`);
      }
      
      report.push('');
    }
  }
  
  return report.join('\n');
}

/**
 * Main validation function
 */
async function validateStixBundles() {
  try {
    // Check if a specific domain was requested
    const domainArg = process.argv.find((arg) => arg.startsWith('--domain='));
    const requestedDomains: AttackDomain[] = domainArg
      ? [domainArg.split('=')[1] as AttackDomain]
      : [...SUPPORTED_DOMAINS];

    // Validate the requested domains
    if (requestedDomains.some((domain) => !SUPPORTED_DOMAINS.includes(domain as any))) {
      console.error(
        `Error: Invalid domain. Supported domains are: ${SUPPORTED_DOMAINS.join(', ')}`,
      );
      process.exit(1);
    }

    console.log(`Validating domains: ${requestedDomains.join(', ')}`);

    // Create a timestamp for the error log file
    const timestamp = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, '');
    const errorFilePath = `./validation-errors-${timestamp}.txt`;
    const statsFilePath = `./validation-stats-${timestamp}.txt`;

    // Validate each domain
    const results = await Promise.all(requestedDomains.map((domain) => validateStix21Bundle(domain)));

    // Collect all error messages
    const allErrors: string[] = [];
    let totalErrorCount = 0;
    
    // For collecting aggregate error statistics
    const allInvalidEnumValues = new Map<string, Set<string>>();
    const allErrorsByPath = new Map<string, number>();
    const allErrorsByStatus: Record<string, number> = {
      'Active': 0,
      'Deprecated': 0,
      'Revoked': 0
    };
    const allErrorsByType: Record<string, number> = {};

    // Process validation results
    for (const result of results) {
      if (!result.isValid && result.formattedError) {
        allErrors.push(
          `\n\n${'='.repeat(100)}\n\nDOMAIN: ${result.domain}\n\n${'='.repeat(100)}\n\n`,
        );
        allErrors.push(result.formattedError);
        totalErrorCount += result.errorCount;
        
        // Use the stored error from validation
        if (result.error) {
          // Collect statistics from the domain
          const domainStats = collectErrorStatistics(result.error, result.bundle);
          
          // Merge into overall statistics
          for (const [path, values] of domainStats.invalidEnumValues.entries()) {
            if (!allInvalidEnumValues.has(path)) {
              allInvalidEnumValues.set(path, new Set<string>());
            }
            values.forEach(value => allInvalidEnumValues.get(path)?.add(value));
          }
          
          for (const [path, count] of domainStats.errorsByPath.entries()) {
            allErrorsByPath.set(path, (allErrorsByPath.get(path) || 0) + count);
          }
          
          for (const [status, count] of Object.entries(domainStats.errorsByStatus)) {
            allErrorsByStatus[status] = (allErrorsByStatus[status] || 0) + count;
          }
          
          for (const [type, count] of Object.entries(domainStats.errorsByType)) {
            allErrorsByType[type] = (allErrorsByType[type] || 0) + count;
          }
        }
      }
    }

    // Write errors to file if any exist
    if (allErrors.length > 0) {
      await fs.writeFile(errorFilePath, allErrors.join('\n'));
      console.log(`Full error details written to: ${errorFilePath}`);
      
      // Generate and write aggregate statistics report
      const statsReport = formatErrorAggregateReport(
        { 
          invalidEnumValues: allInvalidEnumValues, 
          errorsByPath: allErrorsByPath,
          errorsByStatus: allErrorsByStatus,
          errorsByType: allErrorsByType
        },
        totalErrorCount
      );
      await fs.writeFile(statsFilePath, statsReport);
      console.log(`Aggregate error statistics written to: ${statsFilePath}`);
      console.log(statsReport); // Also print to console
    }

    // Print summary statistics
    console.log('\n=== Validation Summary ===');
    console.log(`Total domains processed: ${results.length}`);
    console.log(`Total validation issues: ${totalErrorCount}`);

    results.forEach((result) => {
      const bundleSize = result.bundle.objects.length;
      const statusIcon = result.isValid ? '✅' : '❌';

      console.log(`\n${statusIcon} ${result.domain}:`);
      console.log(`  - Objects: ${bundleSize}`);
      console.log(`  - Validation issues: ${result.errorCount}`);

      // Count by type for valid bundles or ones with few errors
      if (result.isValid || result.errorCount < 100) {
        const typeCount: Record<string, number> = {};
        result.bundle.objects.forEach((obj) => {
          typeCount[obj.type] = (typeCount[obj.type] || 0) + 1;
        });

        console.log('\n  Object counts by type:');
        Object.entries(typeCount)
          .sort(([, countA], [, countB]) => countB - countA)
          .forEach(([type, count]) => {
            console.log(`    ${type}: ${count}`);
          });
      }
    });
  } catch (error) {
    console.error('Error validating STIX bundles:', error);
    process.exit(1);
  }
}

// Run the validation
validateStixBundles().catch(console.error);
