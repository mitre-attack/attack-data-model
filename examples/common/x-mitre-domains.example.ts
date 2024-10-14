import { z } from 'zod';
import { xMitreDomainsSchema } from '../../src/schemas/common/index.js';


const ExampleObjectSchema = z.object({
    x_mitre_domains: xMitreDomainsSchema
});

// Test function for individual arrays
function testArrayCase(testCase: any[]) {
    console.log(`Testing array: ${JSON.stringify(testCase)}`);
    try {
        const result = xMitreDomainsSchema.parse(testCase);
        console.log(`SUCCESS: Parsed ${JSON.stringify(result)}`);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("Validation errors:", error.errors);
        } else {
            console.log("Unexpected error:", error);
        }
    }
    console.log("---");
}

// Test function for objects
function testObjectCase(testCase: any) {
    console.log(`Testing object: ${JSON.stringify(testCase)}`);
    try {
        ExampleObjectSchema.parse(testCase);
        console.log(`SUCCESS: Parsed ${JSON.stringify(testCase)}`);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("Validation errors:", error.errors);
        } else {
            console.log("Unexpected error:", error);
        }
    }
    console.log("---");
}

// Main test function
function runTests() {
    console.log("Testing individual arrays:");
    const arrayCases = [
        ["enterprise-attack"],
        ["foobar"],
        ["enterprise-attack", "mobile-attack"],
        ["enterprise-attack", "foobar"],
        []
    ];
    arrayCases.forEach(testArrayCase);

    console.log("\nTesting objects:");
    const objectCases = [
        { x_mitre_domains: ["enterprise-attack"] },
        { x_mitre_domains: ["foobar"] },
        { x_mitre_domains: ["enterprise-attack", "mobile-attack"] },
        { x_mitre_domains: ["enterprise-attack", "foobar"] },
        { x_mitre_domains: [] },
        {}
    ];
    objectCases.forEach(testObjectCase);
}

// Run the tests
runTests();