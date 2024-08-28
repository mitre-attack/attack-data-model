import { z } from 'zod';

export function createSchemaWithMethods<T extends z.ZodTypeAny>(schema: T) {
    return schema.transform((data) => ({
        ...data,
        toJSON() {
            const json: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(this)) {
                if (key !== 'toJSON' && key !== 'toString') {
                    if (Array.isArray(value)) {
                        json[key] = value.map(item =>
                            typeof item === 'object' && item !== null && 'toJSON' in item && typeof (item as any).toJSON === 'function'
                                ? (item as any).toJSON()
                                : item
                        );
                    } else if (typeof value === 'object' && value !== null && 'toJSON' in value && typeof (value as any).toJSON === 'function') {
                        json[key] = (value as any).toJSON();
                    } else {
                        json[key] = value;
                    }
                }
            }
            return json;
        },
        toString(this: { toJSON: () => Record<string, unknown> }) {
            return JSON.stringify(this.toJSON());
        }
    }));
}

// Enhanced robustToJSON function with flattening support
export function robustToJSON(obj: any, flatten: string[] = []): any {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map(item => robustToJSON(item, flatten));
    }

    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== 'function' && key !== 'toJSON') {
            if (flatten.includes(key) && typeof value === 'object' && value !== null) {
                // Flatten the object to a string representation
                if ('toString' in value && typeof value.toString === 'function') {
                    result[key] = value.toString();
                } else {
                    // Default flattening behavior if toString is not available
                    result[key] = JSON.stringify(robustToJSON(value));
                }
            } else {
                result[key] = robustToJSON(value, flatten);
            }
        }
    }
    return result;
}