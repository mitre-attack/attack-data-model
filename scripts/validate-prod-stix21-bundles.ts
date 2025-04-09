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
 * 1. Fetches STIX bundles for all domains (enterprise, mobile, and ics) from the MITRE ATT&CK GitHub repository
 * 2. Validates each bundle against our schema definitions
 * 3. Formats and groups validation errors by object
 * 4. Writes detailed error reports to a file for analysis
 * 5. Outputs summary statistics about the validation
 *
 * Usage:
 * ```
 * npm run validate-bundles
 * # or
 * npx ts-node scripts/validate-prod-stix21-bundles.ts
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
import path from 'path';
import { z } from 'zod';

// Import your schema
import { stixBundleSchema, type StixBundle } from '../src/schemas/sdo/stix-bundle.schema';

// Define supported domains
const SUPPORTED_DOMAINS = ['enterprise-attack', 'mobile-attack', 'ics-attack'] as const;
type AttackDomain = (typeof SUPPORTED_DOMAINS)[number];

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
      .map((issue) => `  Path: ${issue.path.join('.')}\n  Error: ${issue.message}`)
      .join('\n\n');

    formattedErrors.push(
      `Bundle-level errors in (${bundleFriendlyName}, ID: ${bundleId}):\n${bundleIssues}`,
    );
  }

  // Format general object array issues
  if (issuesByObject['general']) {
    const generalIssues = issuesByObject['general']
      .map((issue) => `  Path: ${issue.path.join('.')}\n  Error: ${issue.message}`)
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
          return `  Path: ${relativePath.length ? relativePath.join('.') : '<object root>'}\n  Error: ${issue.message}`;
        })
        .join('\n\n');

      formattedErrors.push(`Error in object:\n  ${objectInfo}\n\n${issues}`);
    }
  });

  return formattedErrors.join('\n\n' + '-'.repeat(80) + '\n\n');
}

/**
 * Fetches a STIX bundle from the MITRE ATT&CK GitHub repository
 */
async function fetchStixBundle(domain: AttackDomain): Promise<StixBundle> {
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
async function validateBundle(domain: AttackDomain): Promise<{
  domain: AttackDomain;
  bundle: StixBundle;
  isValid: boolean;
  errorCount: number;
  formattedError: string | null;
}> {
  try {
    const bundle = await fetchStixBundle(domain);

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

    // Validate each domain
    const results = await Promise.all(requestedDomains.map((domain) => validateBundle(domain)));

    // Collect all error messages
    const allErrors: string[] = [];
    let totalErrorCount = 0;

    results.forEach((result) => {
      if (!result.isValid && result.formattedError) {
        allErrors.push(
          `\n\n${'='.repeat(100)}\n\nDOMAIN: ${result.domain}\n\n${'='.repeat(100)}\n\n`,
        );
        allErrors.push(result.formattedError);
        totalErrorCount += result.errorCount;
      }
    });

    // Write errors to file if any exist
    if (allErrors.length > 0) {
      await fs.writeFile(errorFilePath, allErrors.join('\n'));
      console.log(`Full error details written to: ${errorFilePath}`);
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
