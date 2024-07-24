import { z } from "zod";
import { StixTypeSchema } from "../common/stix-type";
import { AttackCoreSDOSchema } from "../common/core-attack-sdo.schema";
import { createStixIdentifierSchema, StixIdentifierSchema } from "../common/stix-identifier";

import '../../errors';


/**
 * Determine all possible values that can exist on identity_class
 */
export const IdentityClassOV = z.enum(['organization']);


/**
 * Identity Schema
 */
export const IdentitySchema = AttackCoreSDOSchema.extend({

    id: createStixIdentifierSchema(StixTypeSchema.enum.identity),

    type: z.literal(StixTypeSchema.enum.identity),

    object_marking_refs: z
        .array(StixIdentifierSchema)
        .describe("The list of marking-definition objects to be applied to this object."),

    identity_class: IdentityClassOV
        .describe("The type of entity that this Identity describes, e.g., an individual or organization. This is an open vocabulary and the values SHOULD come from the identity-class-ov vocabulary.")
});

// Define the type for Identity
export type Identity = z.infer<typeof IdentitySchema>;