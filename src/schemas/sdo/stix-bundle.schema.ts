import { z } from "zod";
import { stixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema } from "../common/stix-identifier";
import { malwareSchema } from "./malware.schema";
import '../../errors';
import { assetSchema } from "./asset.schema";
import { campaignSchema } from "./campaign.schema";
import { dataComponentSchema } from "./data-component.schema";
import { dataSourceSchema } from "./data-source.schema";
import { identitySchema } from "./identity.schema";
import { matrixSchema } from "./matrix.schema";
import { toolSchema } from "./tool.schema";
import { tacticSchema } from "./tactic.schema";
import { techniqueSchema } from "./technique.schema";
import { groupSchema } from "./group.schema";
import { mitigationSchema } from "./mitigation.schema";

const StixObjectSchema: {[key: string]: z.ZodSchema} = {
  "x-mitre-asset": assetSchema,
  "campaign": campaignSchema,
  "x-mitre-data-component": dataComponentSchema,
  "x-mitre-data-source": dataSourceSchema,
  "identity": identitySchema,
  "malware": malwareSchema,
  "x-mitre-matrix": matrixSchema,
  "tool": toolSchema,
  "x-mitre-tactic": tacticSchema,
  // "attack-pattern": techniqueSchema, // uncomment after review
  "intrusion-set": groupSchema,
  "course-of-action": mitigationSchema
};

// Define the schema for a STIX bundle
export const StixBundleSchema = z.object({
  id: createStixIdentifierSchema(stixTypeSchema.enum.bundle),

  type: z.literal(stixTypeSchema.enum.bundle),

  objects: z
    .array(z.any())
    .refine((objects) => {
      let validationErrors: string = "";
      const validationPassed = objects.every((obj: any) => {
        const schema = StixObjectSchema[obj.type];
        if (!schema) {
          validationErrors = `Object of unknown type: ${obj.type}`
          return false; // Not known object type
        }
        try {
          schema.parse(obj);
          return true;
        } catch (e:any) {
          validationErrors = `Validation schema failed for type: ${obj.type}: ${e.errors}`
          return false;
        }
      });
      if (!validationPassed) {
        throw new Error(`One or more objects in the bundle failed validation: ${validationErrors}`);
      }
      return true
    }, {
      message: "One or more objects in the bundle failed validation"
    }),
});

export type StixBundle = z.infer<typeof StixBundleSchema>;