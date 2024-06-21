import { StixIdentifierImpl } from "../objects/identifier";
import { StixIdentifier } from "../types/stix-identifier";
import { StixSpecVersion } from "../types/stix-spec-version";
import { StixCreatedTimestamp, StixModifiedTimeStamp, StixObject, StixObjectSchema } from "../types/stix-object";
import { StixType } from "../types/stix-type";

export class StixObjectImpl {
  private _stixObject: StixObject;

  constructor(
    id: StixIdentifier,
    type: StixType,
    spec_version: StixSpecVersion,
    created: StixCreatedTimestamp,
    modified: StixModifiedTimeStamp
  ) {
    this._stixObject = {
      id,
      type,
      spec_version,
      created,
      modified
    } as StixObject;
    StixObjectSchema.parse(this._stixObject);
  }

  get id(): StixIdentifier {
    return this._stixObject.id;
  }

  get type(): StixType {
    return this._stixObject.type;
  }

  get spec_version(): StixSpecVersion {
    return this._stixObject.spec_version;
  }

  get created(): StixCreatedTimestamp {
    return this._stixObject.created;
  }

  get modified(): StixModifiedTimeStamp {
    return this._stixObject.modified;
  }

  // You can add setter methods if needed, for example:
  set modified(value: StixModifiedTimeStamp) {
    this._stixObject.modified = value;
    StixObjectSchema.parse(this._stixObject);
  }

  // Add any additional methods that operate on the STIX object
  toJSON(): StixObject {
    return { ...this._stixObject };
  }

  // Example method to update multiple properties at once
  update(updates: Partial<StixObject>): void {
    Object.assign(this._stixObject, updates);
    StixObjectSchema.parse(this._stixObject);
  }
}