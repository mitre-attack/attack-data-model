import { z } from 'zod';
import { StixObjectMixin, StixObjectMixinSchema } from './stix-object-mixin';

const AttackObjectSchema = StixObjectMixinSchema.extend({
  dummy_attribute: z.string().default('dummy'),
});

export type AttackObjectMixin = z.infer<typeof AttackObjectSchema>;

export class AttackObjectMixinImpl implements AttackObjectMixin {
  private _stix: StixObjectMixin;
  dummy_attribute: string;

  constructor(stix: StixObjectMixin, dummy_attribute: string = 'dummy') {
    this._stix = stix;
    this.dummy_attribute = dummy_attribute;
    AttackObjectSchema.parse(this);
  }

  get id() { return this._stix.id; }
  get type() { return this._stix.type; }
  get spec_version() { return this._stix.spec_version; }
  get created() { return this._stix.created; }
  get modified() { return this._stix.modified; }
}