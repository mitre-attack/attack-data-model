import { z } from "zod";
import { robustToJSON } from "../../utils";

/**
 * Interface for STIX objects with common methods
 */
export interface IStixObject {
    toString(): string;
    toObject(): any;
    toJSON(options?: { flatten?: string[] }): any;
    [Symbol.toPrimitive](hint: string): string | null;
}

export class Metadata {
    // TODO
}

/**
 * Abstract base class for STIX objects
 */
export abstract class AbstractStixObject implements IStixObject {

    readonly _meta: Metadata;

    private _page: unknown;

    constructor() {
        this._meta = new Metadata();
    }

    abstract toString(): string;

    public get page() {
        return this._page;
    }

    public set page(value) {
        this._page = value;
    }

    public toObject(): any {
        return robustToJSON(this);
    }

    public toJSON(options: { flatten?: string[] } = {}): any {
        return robustToJSON(this, options.flatten);
    }

    public [Symbol.toPrimitive](hint: string): string | null {
        if (hint === 'string' || hint === 'default') {
            return this.toString();
        }
        return null;
    }
}


export abstract class SDO implements IStixObject {

    readonly _meta: Metadata;
    readonly _page: unknown;
    readonly _data: unknown;

    constructor(readonly data: unknown) {
        this._meta = new Metadata();
        this._data = data;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }

    // get<K extends keyof NonNullable<T>>(key: K): NonNullable<T>[K] | undefined {
    //     return this._data ? (this._data as unknown as NonNullable<T>)[key] : undefined;
    // }

    public toObject(): any {
        return robustToJSON(this);
    }

    public toJSON(options: { flatten?: string[] } = {}): any {
        return robustToJSON(this, options.flatten);
    }

    public [Symbol.toPrimitive](hint: string): string | null {
        if (hint === 'string' || hint === 'default') {
            return this.toString();
        }
        return null;
    }
}