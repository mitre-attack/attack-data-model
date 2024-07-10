import { ZodError } from "zod";
import { ExternalReferenceSchema } from "../src/schemas/common/misc"

const example = {
    "source_name": "ACME Threat Intel",
    "description": "This indicator was reported by ACME Threat Intelligence Team",
    "url": "https://example.com/threat-report-101"
}

const parsedExample = ExternalReferenceSchema.parse(example);

console.log(parsedExample);
// {
//     source_name: 'ACME Threat Intel',
//     description: 'This indicator was reported by ACME Threat Intelligence Team',
//     url: 'https://example.com/threat-report-101'
// }

try {
    const badSourceName = {
        "source_name": 12345,
        "description": "This indicator was reported by ACME Threat Intelligence Team",
        "url": "https://example.com/threat-report-101"
    }
    console.log(ExternalReferenceSchema.parse(badSourceName));
} catch (error) {
    console.log((error as ZodError).message);
    // [
    //   {
    //     "code": "invalid_type",
    //     "expected": "string",
    //     "received": "number",
    //     "path": [
    //       "source_name"
    //     ],
    //     "message": "Source name must be a string."
    //   }
    // ]
    (error as ZodError).errors.forEach(e => console.log(e.message))
    // Source name must be a string.
}

try {
    const badDescription = {
        "source_name": "ACME Threat Intel",
        "description": 12345,
        "url": "https://example.com/threat-report-101"
    }
    console.log(ExternalReferenceSchema.parse(badDescription));
} catch (error) {
    console.log((error as ZodError).message);
    // [
    //   {
    //     "code": "invalid_type",
    //     "expected": "string",
    //     "received": "number",
    //     "path": [
    //       "description"
    //     ],
    //     "message": "Description must be a string."
    //   }
    // ]
    (error as ZodError).errors.forEach(e => console.log(e.message))
    // Description must be a string.
}

try {
    const badUrl = {
        "source_name": "ACME Threat Intel",
        "description": "This indicator was reported by ACME Threat Intelligence Team",
        "url": "https;//example/threat-report-101"
    }
    console.log(ExternalReferenceSchema.parse(badUrl));
} catch (error) {
    (error as ZodError).errors.forEach(e => console.log(e.message))
    // Invalid URL format. Please provide a valid URL.
}