import { StixCreatedByRef } from "../schemas/common/misc"
import { StixIdentifier } from "../schemas/common/stix-identifier"
import { StixSpecVersion } from "../schemas/common/stix-spec-version"
import { StixTimestamp } from "../schemas/common/stix-timestamp"
import { StixType } from "../schemas/common/stix-type"
import { SDO } from "../schemas/common/sdo"

export type StixPropertyType = SDO | StixIdentifier | StixType | StixSpecVersion | StixCreatedByRef | StixTimestamp;

export type StixProperty<T extends StixPropertyType> = {
    stix: T
}

export function initializeStixProperty<T extends StixPropertyType>(stix: T): StixProperty<T> {
    return {
        stix: stix
    }
}