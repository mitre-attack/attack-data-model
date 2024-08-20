import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { createStixIdentifierSchema } from "../common/stix-identifier";
import { MalwareSchema } from "./malware.schema";
import '../../errors';
import { AssetSchema } from "./asset.schema";
import { CampaignSchema } from "./campaign.schema";
import { DataComponentSchema } from "./data-component.schema";
import { DataSourceSchema } from "./data-source.schema";
import { IdentitySchema } from "./identity.schema";
import { MatrixSchema } from "./matrix.schema";
import { ToolSchema } from "./tool.schema";
import { TacticSchema } from "./tactic.schema";
import { TechniqueSchema } from "./technique.schema";
import { GroupSchema } from "./group.schema";
import { MitigationSchema } from "./mitigation.schema";

const StixObjectSchema: {[key: string]: z.ZodSchema} = {
  "x-mitre-asset": AssetSchema,
  "campaign": CampaignSchema,
  "x-mitre-data-component": DataComponentSchema,
  "x-mitre-data-source": DataSourceSchema,
  "identity": IdentitySchema,
  "malware": MalwareSchema,
  "x-mitre-matrix": MatrixSchema,
  "tool": ToolSchema,
  "x-mitre-tactic": TacticSchema,
  "attack-pattern": TechniqueSchema,
  "intrusion-set": GroupSchema,
  "course-of-action": MitigationSchema
};

// Define the schema for a STIX bundle
export const StixBundleSchema = z.object({
  id: createStixIdentifierSchema(StixTypeSchema.enum["stix-bundle"]),

  type: z.literal(StixTypeSchema.enum["stix-bundle"]),

  objects: z
    .array(z.any())
    .refine((objects) => {
      return objects.every((obj: any) => {
        const schema = StixObjectSchema[obj.type];
        if (!schema) {
          return false; // Not known object type
        }
        try {
          schema.parse(obj);
          return true;
        } catch (e) {
          return false;
        }
      });
    }, {
      message: "One or more objects in the bundle failed validation"
    }),
});

export type StixBundle = z.infer<typeof StixBundleSchema>;