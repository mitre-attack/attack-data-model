import { z } from "zod";
import { robustToJSON } from "../utils";

/**
 * Interface for STIX objects with common methods
 */
export interface IStixObject {
    toString(): string;
    toObject(): any;
    toJSON(options?: { flatten?: string[] }): any;
    [Symbol.toPrimitive](hint: string): string | null;
}

/**
 * Abstract base class for STIX objects
 */
export abstract class AbstractStixObject implements IStixObject {
    abstract toString(): string;

    toObject(): any {
        return robustToJSON(this);
    }

    toJSON(options: { flatten?: string[] } = {}): any {
        return robustToJSON(this, options.flatten);
    }

    [Symbol.toPrimitive](hint: string): string | null {
        if (hint === 'string' || hint === 'default') {
            return this.toString();
        }
        return null;
    }
}

// export class GenericStixObject<T extends object> extends AbstractStixObject {
//     constructor(readonly data: T) {
//         super();
//     }

//     toString(): string {
//         return JSON.stringify(this.data);
//     }

//     toObject(): T {
//         return { ...this.data };
//     }

//     get<K extends keyof T>(key: K): T[K] {
//         return this.data[key];
//     }
// }

export class GenericStixObject<T> extends AbstractStixObject {
    constructor(readonly data: T) {
        super();
    }

    toString(): string {
        return JSON.stringify(this.data);
    }

    toObject(): T {
        if (this.data === null || this.data === undefined) {
            return this.data;
        }
        if (typeof this.data === 'object') {
            return { ...this.data };
        }
        return this.data;
    }

    get<K extends keyof NonNullable<T>>(key: K): NonNullable<T>[K] | undefined {
        return this.data ? (this.data as NonNullable<T>)[key] : undefined;
    }
}