import { z } from "zod";
import { StixIdentifier, stixIdentifierSchema } from "../schemas/common/stix-identifier";
import { StixType, stixTypeSchema } from "../schemas/common/stix-type";
import { StixProperty, initializeStixProperty } from "./abstract";

const UuidSchema = z.string().uuid();
type UUID = z.infer<typeof UuidSchema>;

export class StixIdentifierImpl {
    private readonly _stix: StixProperty<StixIdentifier>;
    private readonly _type: StixType;
    private readonly _uuid: UUID;
    private _page: Record<string, unknown> = {};

    constructor(data: string | { type: string; uuid: string } | StixIdentifierImpl) {
        // Handle the case where data might be a StixIdentifierImpl instance by calling toString() on it if it's not a string.
        const parsedData = stixIdentifierSchema.parse(typeof data === 'string' ? data : data.toString());
        const [type, uuid] = parsedData.split('--');

        // Use type assertion to inform TypeScript that we trust this type
        this._type = type as StixType;
        this._uuid = uuid;
        this._stix = initializeStixProperty(parsedData);
    }

    public set page(page: Record<string, unknown>) {
        this._page = page;
    }

    public get page(): Record<string, unknown> {
        return this._page;
    }

    public get stix(): StixProperty<StixIdentifier> {
        return this._stix;
    }

    public get type(): z.infer<typeof stixTypeSchema> {
        return this._type;
    }

    public get uuid(): UUID {
        return this._uuid;
    }

    public toString(): string {
        return `${this._type}--${this._uuid}`;
    }

    public toJSON(): { type: string; uuid: string } {
        return { type: this._type, uuid: this._uuid };
        // return { type: this._type, uuid: this._uuid };
    }

    [Symbol.toPrimitive](hint: string): string | number | boolean {
        switch (hint) {
            case 'string':
                return this.toString();
            case 'number':
                // Return a hash of the identifier
                return this._uuid.split('-').reduce((acc, part) => acc + parseInt(part, 16), 0);
            default:
                // For 'default' hint or any other case, return the string representation
                return this.toString();
        }
    }
}