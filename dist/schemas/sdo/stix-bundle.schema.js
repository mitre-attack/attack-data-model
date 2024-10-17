import { z } from 'zod';
import { stixSpecVersionSchema } from '../common/index.js';
import { stixTypeSchema } from '../common/stix-type.js';
import { createStixIdentifierSchema } from '../common/stix-identifier.js';
import { malwareSchema } from './malware.schema.js';
import { assetSchema } from './asset.schema.js';
import { campaignSchema } from './campaign.schema.js';
import { dataComponentSchema } from './data-component.schema.js';
import { dataSourceSchema } from './data-source.schema.js';
import { identitySchema } from './identity.schema.js';
import { matrixSchema } from './matrix.schema.js';
import { toolSchema } from './tool.schema.js';
import { tacticSchema } from './tactic.schema.js';
import { techniqueSchema } from './technique.schema.js';
import { groupSchema } from './group.schema.js';
import { mitigationSchema } from './mitigation.schema.js';
import { collectionSchema } from './collection.schema.js';
import { relationshipSchema } from '../sro/relationship.schema.js';
import { markingDefinitionSchema, } from '../smo/marking-definition.schema.js';
import '../../errors';
const STIX_BUNDLE_TYPE = stixTypeSchema.enum.bundle;
// IMPORTANT: Casting the 'attackObjectsSchema' to 'z.ZodTypeAny' is critical. Without it, the TypeScript compiler will get overwhelmed and throw the following:
// 'error TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.'
export const attackObjectsSchema = z
    .array(z.union([
    malwareSchema,
    assetSchema,
    campaignSchema,
    collectionSchema,
    dataComponentSchema,
    dataSourceSchema,
    identitySchema,
    matrixSchema,
    toolSchema,
    tacticSchema,
    techniqueSchema,
    groupSchema,
    mitigationSchema,
    relationshipSchema,
    markingDefinitionSchema,
]))
    .min(1, { message: 'The STIX bundle must contain at least one object.' });
/////////////////////////////////////
//
// STIX Bundle
//
/////////////////////////////////////
export const baseStixBundleSchema = z.object({
    id: createStixIdentifierSchema(STIX_BUNDLE_TYPE),
    type: z.literal(STIX_BUNDLE_TYPE),
    spec_version: stixSpecVersionSchema,
    objects: attackObjectsSchema,
});
export const stixBundleSchema = baseStixBundleSchema.strict().superRefine((schema, ctx) => {
    // Verify that the first object in the bundle is the 'x-mitre-collection' object
    const firstObject = schema.objects[0];
    if (firstObject.type !== 'x-mitre-collection') {
        // first object is not a collection object! record an error ...
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The first object in the 'objects' array must be of type 'x-mitre-collection'",
            path: ['objects', 0, 'type'],
        });
    }
});
//# sourceMappingURL=stix-bundle.schema.js.map