import { SDOSchema, SDO } from "../schemas/common/core-stix-sdo.schema";

export class SDOImpl {
    private readonly _data: SDO;

    constructor(data: SDO) {
        this._data = SDOSchema.parse(data);
        this.initializeGetters();
    }

    private initializeGetters() {
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(this, key, {
                get: () => this._data[key as keyof SDO],
                enumerable: true,
                configurable: false
            });
        });
    }

    public toString(): string {
        return `${this._data.type}--${this._data.id}`;
    }

    public toJSON(): SDO {
        return { ...this._data };
    }

    [Symbol.toPrimitive](hint: string): string | number | boolean {
        switch (hint) {
            case 'string':
                return this.toString();
            case 'number':
                return this._data.id.split('--')[1].split('-').reduce((acc, part) => acc + parseInt(part, 16), 0);
            default:
                return this.toString();
        }
    }

    public static isSDO(obj: unknown): obj is SDOImpl {
        return obj instanceof SDOImpl;
    }

    public static parse(data: unknown): SDOImpl {
        if (typeof data === 'object' && data !== null) {
            return new SDOImpl(data as any);
        }
        throw new Error('Invalid data for SDO');
    }
}

// Add index signature to SDOImpl class to allow property access using string keys
export interface SDOImpl {
    [key: string]: SDO[keyof SDO] | unknown;
}