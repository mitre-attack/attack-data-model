import { StixCreatedByRef } from "../schemas/property-schemas/misc"
import { StixIdentifier } from "../schemas/property-schemas/stix-identifier"
import { StixSpecVersion } from "../schemas/property-schemas/stix-spec-version"
import { StixTimestamp } from "../schemas/property-schemas/stix-timestamp"
import { StixType } from "../schemas/property-schemas/stix-type"
import { SDO } from "../schemas/sdo.schema"

export type StixPropertyType = SDO | StixIdentifier | StixType | StixSpecVersion | StixCreatedByRef | StixTimestamp;

export type StixProperty<T extends StixPropertyType> = {
    stix: T
}

export function initializeStixProperty<T extends StixPropertyType>(stix: T): StixProperty<T> {
    return {
        stix: stix
    }
}