import { z } from 'zod';
import { StixIdentifierSchema } from './stix-identifier';
import { GenericStixObject } from '../objects/stix-object';

//==============================================================================
// ExternalReference schema
//==============================================================================

const _ExternalReferenceSchema = z.object({
  source_name: z.string(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  external_id: z.string().optional()
});

type _ExternalReference = z.infer<typeof _ExternalReferenceSchema>;

class TrustedExternalReference extends GenericStixObject<_ExternalReference> {
  constructor(data: _ExternalReference) {
    super(data);
  }
}

export const ExternalReferenceSchema = _ExternalReferenceSchema.transform(
  data => new TrustedExternalReference(data)
);

// Public enhanced type
export type ExternalReference = z.infer<typeof ExternalReferenceSchema>;

//==============================================================================
// StixCreatedByRef schema (wrapper around StixIdentifier)
//==============================================================================

export const StixCreatedByRefSchema = StixIdentifierSchema.brand("StixCreatedByRef");

export type StixCreatedByRef = z.infer<typeof StixCreatedByRefSchema>;

//==============================================================================
// StixBoolean schema 
// TODO REMOVE — NOT NECESSARY
//==============================================================================

// const StixBooleanSchema = z.object({
//   value: z.boolean()
// });

// type StixBoolean = z.infer<typeof StixBooleanSchema>;

//==============================================================================
// GranularMarking schema
//==============================================================================


const _GranularMarkingSchema = z.object({
  marking_ref: StixIdentifierSchema,
  selectors: z.array(z.string())
});

type _GranularMarking = z.infer<typeof _GranularMarkingSchema>;

class TrustedGranularMarking extends GenericStixObject<_GranularMarking> {
  constructor(readonly data: _GranularMarking) {
    super(data);
  }
}

export const GranularMarkingSchema = _GranularMarkingSchema.transform(obj => new TrustedGranularMarking(obj));

export type GranularMarking = z.infer<typeof GranularMarkingSchema>;

//==============================================================================
// Extension schema (placeholder)
//==============================================================================

const _ExtensionSchema = z.object({
  extension_type: z.string(),
  extension_properties: z.record(z.unknown())
});

type _Extension = z.infer<typeof _ExtensionSchema>;

export class TrustedExtension extends GenericStixObject<_Extension> {
  constructor(readonly data: _Extension) {
    super(data);
  }
}

export const ExtensionSchema = _ExtensionSchema.transform(obj => new TrustedExtension(obj));

export type Extension = z.infer<typeof ExtensionSchema>;

//==============================================================================
// Extensions schema
//==============================================================================

const _ExtensionsSchema = z.record(
  z.union([ExtensionSchema, z.record(z.unknown())])
).optional();

type _Extensions = z.infer<typeof _ExtensionsSchema>;

class TrustedExtensions extends GenericStixObject<_Extensions> {
  constructor(readonly data: _Extensions) {
    super(data);
  }

  getExtension(key: string): TrustedExtension | undefined {
    return this.data ? <TrustedExtension> this.data[key] : undefined;
  }

  *[Symbol.iterator](): Iterator<[string, TrustedExtension]> {
    if (this.data) {
      for (const [key, value] of Object.entries(this.data)) {
        yield [key, <TrustedExtension> value];
      }
    }
  }

  entries(): [string, TrustedExtension][] {
    return this.data ? Object.entries(this.data) as [string, TrustedExtension][] : [];
  }

  keys(): string[] {
    return this.data ? Object.keys(this.data) : [];
  }

  values(): TrustedExtension[] {
    return this.data ? Object.values(this.data) as TrustedExtension[] : [];
  }
}

export const ExtensionsSchema = _ExtensionsSchema.transform(obj => new TrustedExtensions(obj));

export type Extensions = z.infer<typeof ExtensionsSchema>;