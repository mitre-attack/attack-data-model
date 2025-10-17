import { z } from 'zod/v4';
import { nameSchema, objectMarkingRefsSchema } from './common-properties.js';
import { nonEmptyRequiredString } from './meta.js';
import { externalReferencesSchema, granularMarkingSchema, stixCreatedByRefSchema } from './misc.js';
import { createStixIdValidator } from './stix-identifier.js';
import { stixSpecVersionSchema } from './stix-spec-version.js';
import { createStixTypeValidator } from './stix-type.js';

//==============================================================================
// Extension Type Enum
//==============================================================================

export const extensionTypeSchema = z.enum([
  'new-sdo',
  'new-sco',
  'new-sro',
  'property-extension',
  'toplevel-property-extension',
]);

//==============================================================================
// Extension schema
//==============================================================================

export const extensionSchema = z
  .object({
    extension_type: extensionTypeSchema,
    // Additional properties depend on extension type - using record for flexibility
  })
  .catchall(z.unknown());

export type Extension = z.infer<typeof extensionSchema>;

//==============================================================================
// Extensions schema
//==============================================================================

export const extensionsSchema = z
  .record(
    nonEmptyRequiredString,
    z.union([extensionSchema, z.record(nonEmptyRequiredString, z.unknown())]),
  )
  .meta({
    description:
      'Specifies any extensions of the object, as a dictionary where keys are extension definition UUIDs',
  });

export type Extensions = z.infer<typeof extensionsSchema>;

//==============================================================================
// Extension Definition Schema
//==============================================================================

// Property name validation for extension properties
const extensionPropertyNameSchema = z
  .string()
  .trim()
  .min(3, 'Extension property names must be at least 3 characters')
  .max(250, 'Extension property names must be no longer than 250 characters')
  .regex(
    /^[a-z0-9_]+$/,
    'Extension property names must only contain lowercase letters, digits, and underscores',
  );

// Extension object type validation
export const extensionObjectTypeSchema = z
  .string()
  .trim()
  .min(3, 'Extension object type must be at least 3 characters')
  .max(250, 'Extension object type must be no longer than 250 characters')
  .regex(
    /^[a-z0-9-]+$/,
    'Extension object type must only contain lowercase letters, digits, and hyphens',
  )
  .refine(
    (value) => !value.includes('--'),
    'Extension object type must not contain consecutive hyphens',
  );

export const extensionDefinitionSchema = z
  .object({
    // Required common properties
    id: createStixIdValidator('extension-definition'),
    type: createStixTypeValidator('extension-definition'),
    spec_version: stixSpecVersionSchema,
    created: z.iso.datetime(),
    modified: z.iso.datetime(),
    created_by_ref: stixCreatedByRefSchema,

    // Optional common properties
    revoked: z.boolean().optional(),
    labels: z.array(nonEmptyRequiredString).min(1).optional(),
    external_references: externalReferencesSchema.optional(),
    object_marking_refs: objectMarkingRefsSchema.optional(),
    granular_markings: z.array(granularMarkingSchema).optional(),

    // Extension definition specific properties
    name: nameSchema,

    description: nonEmptyRequiredString.optional(),

    schema: nonEmptyRequiredString,

    version: nonEmptyRequiredString.regex(
      /^\d+\.\d+\.\d+$/,
      'Version must follow semantic versioning (MAJOR.MINOR.PATCH)',
    ),

    extension_types: z.array(extensionTypeSchema).min(1, 'At least one extension type is required'),

    extension_properties: z.array(extensionPropertyNameSchema).optional(),
  })
  .strict()
  .refine(
    (data) => {
      // If extension_types includes 'toplevel-property-extension', extension_properties should be present
      if (data.extension_types.includes('toplevel-property-extension')) {
        return data.extension_properties && data.extension_properties.length > 0;
      }
      return true;
    },
    {
      message:
        'extension_properties must be provided when extension_types includes toplevel-property-extension',
    },
  )
  .meta({
    description:
      'Extension Definition object allows producers to extend existing STIX objects or create new STIX objects',
  });

export type ExtensionDefinition = z.infer<typeof extensionDefinitionSchema>;
