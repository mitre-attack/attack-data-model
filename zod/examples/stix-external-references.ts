import { ExternalReferenceSchema } from "../src/types/misc"

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
//     url: 'https://example.com/threat-report-101',
//     toJSON: [Function: toJSON]
// }

console.log(JSON.stringify(parsedExample));
// {"source_name":"ACME Threat Intel","description":"This indicator was reported by ACME Threat Intelligence Team","url":"https://example.com/threat-report-101"}

console.log(String(parsedExample));
// {"source_name":"ACME Threat Intel","description":"This indicator was reported by ACME Threat Intelligence Team","url":"https://example.com/threat-report-101"}

console.log(parsedExample.toString());
// {"source_name":"ACME Threat Intel","description":"This indicator was reported by ACME Threat Intelligence Team","url":"https://example.com/threat-report-101"}

console.log(typeof parsedExample.toString());
// string

console.log(typeof parsedExample);
// object