import { StixIdentifier, StixIdentifierSchema, StixIdentifierStringSchema } from "../types/stix-identifier";
import { StixType } from "../types/stix-type";

export class StixIdentifierImpl {
    private data: StixIdentifier;

    constructor(input: string | StixIdentifier) {
        if (typeof input === 'string') {
            this.data = StixIdentifierStringSchema.parse(input);
        } else {
            this.data = StixIdentifierSchema.parse(input);
        }
    }

    // Validate a STIX identifier string
    static validate(input: string): boolean {
        return StixIdentifierStringSchema.safeParse(input).success;
    }

    // Deserialize a STIX identifier string to a StixIdentifier object
    static deserialize(input: string): StixIdentifier {
        return StixIdentifierStringSchema.parse(input);
    }

    // Serialize the StixIdentifier object to a string
    serialize(): string {
        return `${this.data.type}--${this.data.uuid}`;
    }

    // Getters
    get type(): StixType {
        return this.data.type;
    }

    get uuid(): string {
        return this.data.uuid;
    }

    // Allow comparison of StixId objects
    equals(other: StixIdentifierImpl): boolean {
        return this.serialize() === other.serialize();
    }
    
    // Implement Symbol.toPrimitive
    [Symbol.toPrimitive](hint: string): string | null {
        if (hint === 'string' || hint === 'default') {
            return this.serialize();
        }
        return null;
    }

    // Override toString method
    toString(): string {
        return this.serialize();
    }
}